var mf = acre.require("MANIFEST").MF;
var deferred = mf.require("promise", "deferred");
var freebase = mf.require("promise", "apis").freebase;
var create_article = mf.require("create_article");
var qh = mf.require("helpers");
var validators = mf.require("validator", "validators");

/**
 * Update an existing type values (name, key, description, role, etc.)
 *
 * @param o:Object (required) - options specifying the updated values.
 */
function update_type(options) {
  var o;
  try {
    o = {
      // required
      domain: validators.MqlId(options.domain, {required:true}).to_js(),
      id: validators.MqlId(options.id, {required:true}).to_js(),

      // optional
      name: validators.String(options.name, {if_empty:null}).to_js(),
      key: validators.String(options.key, {if_empty:null}).to_js(),
      description: validators.String(options.description, {if_empty:null}).to_js(),
      role: validators.OneOf(options.role, {oneof:["mediator", "cvt", "enumeration"], if_empty:null}).to_js(),
      lang: validators.MqlId(options.lang, {if_empty:"/lang/en"}).to_js(),

      // if TRUE, acre.freebase.mqlkey_quote key. Default is FALSE
      mqlkey_quote: validators.StringBool(options.mqlkey_quote, {if_empty:false}).to_js(),

      // if TRUE, name, key, description, role is deleted if empty. Default is FALSE
      empty_delete: validators.StringBool(options.empty_delete, {if_empty:false}).to_js()
    };
  }
  catch(e if e instanceof validators.Invalid) {
    return deferred.rejected(e);
  }
  if (o.mqlkey_quote) {
    o.key = acre.freebase.mqlkey_quote(o.key);
  }

  var q = {
    id: o.id,
    guid: null,
    type: "/type/type",
    key: {namespace:o.domain, value:null, optional:true},
    name: {value:null, lang:o.lang, optional:true},
    "/freebase/type_hints/role": {optional: true, id: null},
    "/freebase/type_hints/mediator": null,
    "/freebase/type_hints/enumeration": null,
    "/common/topic/article": qh.article_clause(true)
  };
  return freebase.mqlread(q)
    .then(function(env) {
      return env.result || {};
    })
    .then(function(old) {
      if (o.key === null) {
        if (old.key && o.empty_delete) {
          return freebase.mqlwrite({guid:old.guid, id:null, key:{namespace:o.domain, value:old.key.value, connect:"delete"}})
            .then(function(env) {
              // old id may no longer be valid since we deleted the key
              old.id = env.result.id;
              return old;
            });
        }
      }
      else if (old.key.value !== o.key) {
        // delete old key
        return freebase.mqlwrite({guid:old.guid, key:{namespace:o.domain, value:old.key.value, connect:"delete"}})
          .then(function(env) {
            // insert new key
            return freebase.mqlwrite({guid:old.guid, id:null, key:{namespace:o.domain, value:o.key, connect:"insert"}})
              .then(function(env) {
                // id may have changed
                old.id = env.result.id;
                return old;
              });
          });
      }
      return old;
    })
    .then(function(old) {
      var update = {
        guid: old.guid,
        type: "/type/type"
      };
      if (o.name === null) {
        if (old.name && o.empty_delete) {
          update.name = {value:old.name.value, lang:old.name.lang, connect:"delete"};
        }
      }
      else {
        update.name = {value:o.name, lang:o.lang, connect:"update"};
      }

      var old_role = qh.get_type_role(old);

      if (o.role === null) {
        if (o.empty_delete) {
          if (old_role === "mediator" || old_role === "cvt") {
            if (old["/freebase/type_hints/mediator"]) {
              update["/freebase/type_hints/mediator"] = {value: true, connect: "delete"};
            }
            if (old["/freebase/type_hints/role"]) {
              update["/freebase/type_hints/role"] = {id:old["/freebase/type_hints/role"].id, connect: "delete"};
            }
            update["/freebase/type_hints/included_types"] = {id: "/common/topic", connect: "insert"};
          }
          else if (old_role === "enumeration") {
            if (old["/freebase/type_hints/enumeration"]) {
              update["/freebase/type_hints/enumeration"] = {value: true, connect: "delete"};
            }
            if (old["/freebase/type_hints/role"]) {
              update["/freebase/type_hints/role"] = {id:old["/freebase/type_hints/role"].id, connect: "delete"};
            }
          }
        }
      }
      else if (o.role === "mediator") {
        update["/freebase/type_hints/mediator"] = {value: true, connect: "update"};
        update["/freebase/type_hints/role"] = {id:"/freebase/type_role/mediator", connect: "update"};
        // remove old enumeration flag
        update["/freebase/type_hints/enumeration"] = {value:true, connect:"delete"};
        // remove /common/topic as included type
        update["/freebase/type_hints/included_types"] = {id: "/common/topic", connect: "delete"};
      }
      else if (o.role === "cvt") {
        update["/freebase/type_hints/mediator"] = {value: true, connect: "update"};
        update["/freebase/type_hints/role"] = {id:"/freebase/type_role/cvt", connect: "update"};
        // remove old enumeration flag
        update["/freebase/type_hints/enumeration"] = {value:true, connect:"delete"};
        // remove /common/topic as included type
        update["/freebase/type_hints/included_types"] = {id: "/common/topic", connect: "delete"};
      }
      else if (o.role === "enumeration") {
        update["/freebase/type_hints/enumeration"] = {value: true, connect: "update"};
        update["/freebase/type_hints/role"] = {id:"/freebase/type_role/enumeration", connect: "update"};
        // remove old mediator flag
        update["/freebase/type_hints/mediator"] = {value:true, connect:"delete"};
        // insert /common/topic as included type
        update["/freebase/type_hints/included_types"] = {id: "/common/topic", connect: "insert"};
      }

      var d = old;
      var keys = ["name", "/freebase/type_hints/mediator", "/freebase/type_hints/enumeration", "/freebase/type_hints/role"];
      for (var i=0,l=keys.length; i<l; i++) {
        if (keys[i] in update) {
          d = freebase.mqlwrite(update)
            .then(function(env) {
              return old;
            });
          break;
        }
      }
      return d;
    })
    .then(function(old) {
      var article = old["/common/topic/article"].length ? old["/common/topic/article"][0].id : null;
      if (o.description === null) {
        if (article && o.empty_delete) {
          return freebase.mqlwrite({id:old.id, "/common/topic/article":{id:article, connect:"delete"}})
            .then(function() {
              return old.id;
            });
        }
      }
      else if (article) {
        return freebase.upload(o.description, "text/html", {document:article})
          .then(function(uploaded) {
              return old.id;
          });
      }
      else if (o.description) {
        // create a new article with domain permission
        return create_article.create_article(o.description, "text/html", {use_permission_of:o.domain, topic:old.id})
          .then(function() {
            return old.id;
          });
      }
      return old.id;
    });
};

