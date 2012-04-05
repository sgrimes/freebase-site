/*
 * Copyright 2012, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var h = acre.require("lib/helper/helpers.sjs");
var i18n = acre.require("lib/i18n/i18n.sjs");
var schema_helpers = acre.require("helpers.sjs");
var mql = acre.require("mql.sjs");
var article = acre.require("lib/queries/article.sjs");
var apis = acre.require("lib/promise/apis");
var freebase = apis.freebase;
var deferred = apis.deferred;
var typeloader = acre.require("lib/schema/typeloader.sjs");
var proploader = acre.require("lib/schema/proploader.sjs");

/**
 * Get all "commons" domains. Domains with a key in "/".
 */
function common_domains() {
  return domains(mql.domains());
};

/**
 * Get all domains created by user_id.
 */
function user_domains(user_id) {
  return domains(mql.domains({optional: true, creator: user_id, key: []}));
};

/**
 * Do domains query and for each domain, get instance counts (activity bdb).
 */
function domains(q) {
  return freebase.mqlread(q)
    .then(function(envelope) {
      return envelope.result || [];
    })
    .then(function(domains) {
      var summary_guids = [];
      domains.forEach(function(d) {
        var summary_guid = "summary_/guid/" + d.guid.substring(1);
        summary_guids.push(summary_guid);
      });
      summary_guids.sort();
      var promises = [];
      // we request allotments of 30 summary guids since the url may be too long
      for (var i=0,l=summary_guids.length; i<l; i+=30) {
        var slice = summary_guids.slice(i, i+30);
        promises.push(freebase.get_static("activity", slice));
      }
      return deferred.all(promises)
        .then(function(results) {
          var activities = {};
          results.forEach(function(result) {
            h.extend(activities, result);
          });
          return activities;
        })
        .then(function(activities) {
          domains.forEach(function(domain) {
            var activity = activities["summary_/guid/" + domain.guid.substring(1)];
            domain.instance_count = activity && activity.total && activity.total.t || 0;
          });
          return domains;
        });
    })
    .then(function(domains) {
      return domains.sort(schema_helpers.sort_by_id);
    });
};

function modified_domains(days, changes) {
  var q = mql.modified_domains(days);
  return freebase.mqlread(q)
    .then(function(env) {
      return env.result || [];
    })
    .then(function(domains) {
      return domains.map(function(d) {
        var domain = {
          id: d.id,
          name: d.name,
          users: []
        };
        var user_map = {};
        d.types.forEach(function(t) {
          t.properties.forEach(function(p) {
            //var timestamp = acre.freebase.date_from_iso(p.key.link.timestamp);
            var timestamp = p.key.link.timestamp;
            var user = p.key.link.creator;
            if (user_map[user.id]) {
              user = user_map[user.id];
            } else {
              user_map[user.id] = user;
              user.changes = [];
            }
            user.changes.push({
              property: {
                id: p.id,
                name: p.name
              },
              type: {
                id: t.id,
                name: t.name
              },
              timestamp: timestamp
            });
          });
        });
        for (var user_id in user_map) {
          domain.users.push(user_map[user_id]);
        }
        domain.users.forEach(function(user) {
          user.changes = user.changes.sort(function(a, b) {
            return b.timestamp < a.timestamp;
          }).slice(0, changes);
        });
        domain.users = domain.users.sort(function(a, b) {
          return b.changes[0].timestamp < a.changes[0].timestamp;
        });
        return domain;
      });
    });
};

/**
 * domain query and optionally get article, types and their
 * activity and articles.
 */
function load_domain(id, lang, options) {
    options = options || {};
    var promises = {};
    var q = {
        id: id,
        guid: null, // activity bdb uses guids
        name: i18n.mql.text_clause(lang),
        type: "/type/domain"
    };
    if (options.types) {
        // get all types
        q.types = [{          
            optional: true,
            id: null,
            type: "/type/type"
        }];
    }
    promises.domain = freebase.mqlread(q)
        .then(function(env) {
            return env.result;
        });
    if (options.article) {
        // get domain article
        promises.article = article.get_article(id, null, null, lang)
            .then(function(r) {
                return r[id];
            });
    }
    return deferred.all(promises)
        .then(function(r) {
            var domain = r.domain;
            // domain key/namespace generated from the domain id
            var ns_key = h.id_key(id, true);
            domain.key = {
                namespace: ns_key[0],
                value: ns_key[1]
            };
            if (options.article) {
                domain["/common/topic/article"] = r.article;
            }
            if (options.types) {
                var type_ids = domain.types.map(function(t) {
                    return t.id;
                });
                if (type_ids.length) {
                    promises = {
                        types: typeloader.loads(type_ids, lang)
                    };
                    if (options.types_instance_count) {
                        // load activity for each type
                        promises.types_instance_count = 
                            freebase
                                .get_static("activity", "summary_/guid/" + domain.guid.slice(1))
                                .then(function(activity) {
                                    if (activity && activity.types) {
                                        domain.types.forEach(function(t) {
                                            t.instance_count = activity.types[t.id] || 0;
                                        });
                                    }
                                });
                    }
                    if (options.types_article) {
                        promises.types_article = article.get_article(type_ids, null, null, lang);
                    }
                    return deferred.all(promises)
                        .then(function(r) {
                            domain.types.forEach(function(t) {
                                t = h.extend(t, r.types[t.id]);
                                if (r.types_article) {
                                    t["/common/topic/article"] = r.types_article[t.id] || [];
                                }
                            });
                            return domain;
                        });
                }
            }
            return domain;
        });
};

/**
 * Use typeloader to load the type and optionally
 * it's article, instance_count, properties' articles.
 */
function load_type(type_id, lang, options) {
    options = options || {};
    var promises = {
        type: typeloader.load(type_id, lang)
    };
    if (options.article) {
        promises.article = article.get_article(type_id, null, null, lang)
            .then(function(r) {
                return r[type_id];
            });
    }
    return deferred.all(promises)
        .then(function(r) {
            var type = r.type;
            // type key/namespace generated from the type id
            var ns_key = h.id_key(type_id, true);
            type.key = {
                namespace: ns_key[0],
                value: ns_key[1]
            };
            if (options.article) {
                type["/common/topic/article"] = r.article;
            }
            var promises = {};                  
            if (options.instance_count) {
                promises.instance_count = 
                    freebase
                        .get_static("activity", "summary_/guid/" + type.guid.slice(1))
                        .then(function(activity) {
                            if (activity) {
                                type.instance_count = activity.properties["/type/object/type"] || 0;
                            }
                            else {
                                type.instance_count = 0;
                            }
                        });           
            }
            if (options.properties_article) {
                var pids = type.properties.map(function(p) {
                    return p.id;
                });
                if (pids.length) {
                    promises.properties_article = freebase.mqlread([{
                        id: null,
                        "id|=": pids,
                        "/freebase/documented_object/tip": i18n.mql.text_clause(lang)
                    }])
                    .then(function(env) {
                        var tips = {};
                        env.result.forEach(function(p) {
                            tips[p.id] = p["/freebase/documented_object/tip"];
                        });
                        type.properties.forEach(function(p) {
                            p["/freebase/documented_object/tip"] = tips[p.id];
                        });
                    });
                }
            }
            return deferred.all(promises) 
                .then(function() {
                    return type;
                });
        });
};


function load_property(prop_id, lang, options) {
    options = options || {};
    var promises = {
        prop: proploader.load(prop_id, lang)
    };
    if (options.article) {
        var q = {id: prop_id,
            "/freebase/documented_object/tip": i18n.mql.text_clause(lang)
        };
        promises.article = freebase.mqlread(q)
        .then(function(env) {
            return env.result["/freebase/documented_object/tip"];
        });
    }
    return deferred.all(promises) 
        .then(function(r) {
            var prop = r.prop;
            // property key/namespace generated from the prop id
            var ns_key = h.id_key(prop_id, true);
            prop.key = {
                namespace: ns_key[0],
                value: ns_key[1]
            };
            if (options.article) {
                prop["/freebase/documented_object/tip"] = r.article;
            }
            return prop;
        });
};


/**
 * Minimal topic query to get name and description
 */
function minimal_topic(id, lang) {
    return minimal_topic_multi([id], lang)
        .then(function(r) {
            return r[id];
        });
};

function minimal_topic_multi(ids, lang) {
    // TODO: assert ids is an Array.length > 0
    return freebase.get_topic_multi(ids, {
        lang: h.lang_code(lang || "/lang/en"),
        filter: ["/type/object/name", "/common/topic/article"]
    })
    .then(function(r) {
        var topics = {};
        if (r) {
            r.forEach(function(env) {
                var topic = {
                    id: env.id
                };
                if (env.result && env.result.property) {
                    if (env.result.property["/type/object/name"]) {
                        topic.name = env.result.property["/type/object/name"].values.map(function(v) {
                            return {
                                value: v.value,
                                lang: h.lang_id(v.lang)
                            };
                        });
                    }
                    if (env.result.property["/common/topic/article"]) {
                        topic["/common/topic/article"] = 
                            env.result.property["/common/topic/article"].values.map(function(v) {
                                return article.article_value(v);
                            });
                    }
                }
                topics[env.id] = topic;
            });
        };
        return topics;
    });
};


/**
 * Simple type instance query if anything is an instance of a type.
 */
function type_used(type_id) {
  var q = {
    id: type_id,
    type: "/type/type",
    instance: {optional:true, id: null, limit: 1}
  };
  return freebase.mqlread(q)
    .then(function(env) {
      return env.result.instance !== null;
    });
};


/**
 * Query to determine if a property is being "used".
 * A property is determined as being "used" if there is 1 or more
 * /type/link instances with a master_property or reverse_property of the property id.
 */
function property_used(prop_id) {
  var promises = [];
  var master_query = {
    source: null,
    target: null,
    target_value: null,
    type: "/type/link",
    master_property: prop_id,
    limit: 1
  };
  promises.push(freebase.mqlread(master_query)
    .then(function(env) {
      return env.result;
    }));

  var reverse_query = {
    source: null,
    target: null,
    target_value: null,
    type: "/type/link",
    master_property: {reverse_property: prop_id},
    limit: 1
  };
  promises.push(freebase.mqlread(reverse_query)
    .then(function(env) {
      return env.result;
    }));

  return deferred.all(promises)
    .then(function(results) {
      for (var i=0,l=results.length; i<l; i++) {
        if (results[i] != null) {
          return true;
        }
      }
      return false;
    });
};


//
// Incoming property queries from
// 1. a given domain
// 2. commons
// 3. everything else except commons (and optionally a given domain)
//


function incoming_from_domain(type_id, domain_id, count) {
  var q = incoming.query({expected_type:type_id});
  h.extend(q[0].schema, {domain: domain_id});
  if (count) {
    // just get counts
    q = q[0];
    h.extend(q, {"return": "count"});
    return freebase.mqlread(q)
      .then(function(env) {
        return env.result;
      });
  }
  return incoming(q);
};

function incoming_from_commons(type_id, exclude_domain_id, count) {
  var q = incoming.query({expected_type:type_id});
  var domain_clause = {
    domain: {
      key: {namespace: "/", limit: 0}
    }
  };
  if (exclude_domain_id) {
    domain_clause["forbid:domain"] = {
      optional: "forbidden",
      id: exclude_domain_id,
      limit: 0
    };
  }
  h.extend(q[0].schema, domain_clause);
  if (count) {
    // just get counts
    q = q[0];
    h.extend(q, {"return": "count"});
    return freebase.mqlread(q)
      .then(function(env) {
        return env.result;
      });
  }
  return incoming(q);
};

function incoming_from_bases(type_id, exclude_domain_id, count) {
  var q = incoming.query({expected_type:type_id});
  var domain_clause = {
    domain: {
      key: {
        "forbid:namespace": {optional: "forbidden", id: "/"},
        limit: 0
      }
    }
  };
  if (exclude_domain_id) {
    domain_clause["forbid:domain"] = {
      optional: "forbidden",
      id: exclude_domain_id,
      limit: 0
    };
  }
  h.extend(q[0].schema, domain_clause);

  if (count) {
    // just get counts
    q = q[0];
    h.extend(q, {"return": "count"});
    return freebase.mqlread(q)
      .then(function(env) {
        return env.result;
      });
  }
  return incoming(q);
};

function incoming(q) {
  return freebase.mqlread(q)
    .then(function(env) {
      return env.result;
    });
};
incoming.query = function(options) {
  return [h.extend({
    optional: true,
    id: null,
    name: i18n.mql.query.name(),
    type: "/type/property",
    expected_type: null,
    schema: {
      id: null,
      name: i18n.mql.query.name(),
      type: "/type/type",
      "/freebase/type_hints/mediator": null,
      "/freebase/type_hints/enumeration": null
    },
    master_property: {
      optional: true,
      id: null,
      name: i18n.mql.query.name(),
      type: "/type/property",
      schema: {id: null, name: i18n.mql.query.name()}
    },
    reverse_property: {
      optional: true,
      id: null,
      name: i18n.mql.query.name(),
      type: "/type/property",
      schema: {id: null, name: i18n.mql.query.name()}
    }
  }, options)];
};

/**
 * Get all included types of a type
 */
function included_types(id, lang) {
    return typeloader.load(id, lang)
        .then(function(type) {
            var inc_types = type["/freebase/type_hints/included_types"];
            if (inc_types.length) {
                return typeloader.loads(inc_types, lang)
                    .then(function(r) {
                        return inc_types.map(function(t) {
                            return r[t];
                        });                        
                    });
            }
            return [];
        });
};


//
//
// Write queries should go under here
//
//

/**
 * Add types (included_types) to the /freebase/type_hints/included_types list of type (id).
 */
function add_included_types(id, included_types) {
  var q = {
    id: id,
    "/freebase/type_hints/included_types": []
  };
  included_types.forEach(function(type_id) {
    q["/freebase/type_hints/included_types"].push({id: type_id, connect: "insert"});
  });
  return freebase.mqlwrite(q)
    .then(function(env) {
      // invalidate type schema
      typeloader.invalidate(id);
      return env.result["/freebase/type_hints/included_types"];
    });
};

/**
 * Delete an included type from type (id).
 */
function delete_included_type(id, included_type) {
  var q = {
    id: id,
    "/freebase/type_hints/included_types": {
      id: included_type,
      connect: "delete"
    }
  };
  return freebase.mqlwrite(q)
    .then(function(env) {
      // invalidate type schema
      typeloader.invalidate(id);
      return env.result["/freebase/type_hints/included_types"];
    });
};

/**
 * Add a topic as an instance of a type AND its included types
 */
function add_instance(id, type) {
  return included_types(type)
    .then(function(inc_types) {
      var types = [{id:t.id, connect:"insert"} for each (t in inc_types)];
      types.push({id:type, connect:"insert"});
      var q = {
        id: id,
        type: types
      };
      return freebase.mqlwrite(q)
        .then(function(env) {
          return env.result;
        });
    });
};

/**
 * Remove a topic as an instance of a type.
 */
function delete_instance(id, type) {
  var q = {
    id: id,
    type: {
      id: type,
      connect: "delete"
    }
  };
  return freebase.mqlwrite(q)
    .then(function(env) {
      return env.result;
    });
};

/**
 * Ensure the namespace specifed by id exists. If not, create within the namespace, implicitly specified by id.
 * For example if id is /foo/bar/baz, the new namespace would be created under /foo/bar.
 */
function ensure_namespace(id) {
  var q = {
    id: id,
    type: "/type/namespace"
  };
  return freebase.mqlread(q)
    .then(function(env) {
      return env.result;
    })
    .then(function(namespace) {
      if (namespace) {
        return namespace.id;
      }
      else {
        var parts = id.split("/");
        var key = parts.pop();
        namespace = parts.join("/");
        var q = {
          id: null,
          type: "/type/namespace",
          key: {
            namespace: namespace,
            value: key
          },
          create: "unless_exists"
        };
        return freebase.mqlwrite(q, {use_permission_of: namespace})
          .then(function(env) {
            return env.result.id;
          });
      }
    });
};
