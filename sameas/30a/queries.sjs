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
var apis = acre.require("lib/promise/apis");
var freebase = apis.freebase;
var deferred = apis.deferred;
var fh = acre.require("lib/filter/helpers.sjs");
var creator = acre.require("lib/queries/creator.sjs");

function keys(id, lang, limit, filters) {
  lang = lang || i18n.lang;
  limit = limit || 1000;
  var q = {
    id: id,
    name: { // need this for {name} substitution
      lang: "/lang/en", 
      value: null, 
      optional: true
    },
    key: [{
      namespace: {
        id: null,
        unique: null,
        "/base/sameas/web_id/authority": {
          optional: true,
          limit: 1,
          id: null,
          type: "/base/sameas/api_provider",
          name: i18n.mql.text_clause(lang)
        },
        "!/common/uri_template/ns": {
          optional: true,
          limit: 1,
          type: "/common/uri_template",
          template: null
        }
      },
      value: null,
      link: creator.extend({
        timestamp: null
      }),
      limit: limit,
      optional: true
    }]
  };
  apply_filters(q, filters);
  return freebase.mqlread(q, mqlread_options(filters))
    .then(function(env) {
      return keys_result(env.result, lang);
    });
};

function keys_result(result, lang) {
  var keys = []; 
  var encoded_name = null;
  if (result.name) { 
    // for {name} substitution
    encoded_name = acre.form.encode({name: result.name.value}).substring(5);
  }
  result.key.forEach(function(k) {
    var namespace = k.namespace;
    var key = {
      authority: namespace["/base/sameas/web_id/authority"],
      namespace: namespace.id,
      value: k.value,
      unique: namespace.unique, // is namespace unique?
      attribution: h.get_attribution(k.link),
      timestamp: k.link.timestamp
    };
    var template = namespace["!/common/uri_template/ns"];
    template = template && template.template;
    if (template) {
      key.template = template;
      key.url = template.replace(/\{key\}/g, k.value);
      if (encoded_name) {
          key.url = key.url.replace(/\{name\}/g, encoded_name);
      }
    }
    keys.push(key);
  });
  function compare_key(a, b) {
    if (a.namespace === b.namespace) {
      return b.value < a.value;
    }
    return b.namespace < a.namespace;
  };
  keys.sort(function(a, b) {
    if (a.authority && b.authority) {
      if (a.authority.id === b.authority.id) {
        return compare_key(a, b);
      }
      return sort_by_name(a.authority, b.authority, lang);
    }
    else if (a.authority) {
      return -1;
    }
    else if (b.authority) {
      return 1;
    }
    else {
      return compare_key(a, b);
    }
  });
  return keys;
};

/**
 * get specific key in authority/namespace
 */
function key(id, namespace, key, lang) {
  lang = lang || i18n.lang;
  var q = {
    id: id,
    name: { // need this for {name} substitution
      lang: "/lang/en", 
      value: null, 
      optional: true
    },
    key: [{
      namespace: {
        id: namespace,
        unique: null,
        "/base/sameas/web_id/authority": {
          optional: true,
          limit: 1,
          id: null,
          type: "/base/sameas/api_provider",
          name: i18n.mql.text_clause(lang)
        },
        "!/common/uri_template/ns": {
          optional: true,
          limit: 1,
          type: "/common/uri_template",
          template: null
        }
      },
      value: key,
      link: creator.extend({
        timestamp: null
      })
    }]
  };
  return freebase.mqlread(q)
    .then(function(env) {
      return keys_result(env.result, lang);
    });
};

function apply_filters(q, filters) {
  if (!filters) {
    return q;
  }
  // We don't want to filter by authority in MQL since we want to get
  // all authority count.
  // Authority filter will be applied in template when we render
  //apply_authority(q, filters.authority);
  apply_timestamp(q, filters.timestamp);
  apply_creator(q, filters.creator);
};

function apply_authority(q, authority) {
  if (authority) {
    if (!h.isArray(authority)) {
      authority = [authority];
    }
    if (authority.length) {
      q.key[0].namespace["/base/sameas/web_id/authority"]["filter:id|="] = authority;
    }
  }
  return q;
};

function apply_timestamp(q, timestamp) {
  if (timestamp) {
    if (!h.isArray(timestamp)) {
      timestamp = [timestamp];
    }
    var len = timestamp.length;
    if (len === 1) {
      q.key[0].link["filter:timestamp>="] = fh.timestamp(timestamp[0]);
    }
    else if (len === 2) {
      timestamp.sort(function(a,b) {
        return b < a;
      });
      q.key[0].link["filter:timestamp>="] = fh.timestamp(timestamp[0]);
      q.key[0].link["filter:timestamp<"] = fh.timestamp(timestamp[1]);
    }
  }
  return q;
};

function apply_creator(q, creator) {
  if (creator) {
    if (!h.isArray(creator)) {
      creator = [creator];
    }
    if (creator.length) {
      q.key[0].link["filter:creator"] = {
        "id|=": creator
      };
    }
  }
  return q;
};

function mqlread_options(filters) {
  var options = {};
  if (!filters) {
    return options;
  }
  if (filters.as_of_time) {
    options.as_of_time = filters.as_of_time;
  }
  return options;
};


function sort_by_id(a, b) {
  return b.id < a.id;
};

function sort_by_name(a, b, lang) {
  var a_name = i18n.mql.get_text(lang, a.name);
  a_name = a_name && a_name.value || a.id;
  var b_name = i18n.mql.get_text(lang, b.name);
  b_name = b_name && b_name.value || b.id;
  return b_name < a_name;
};

