/*
 * Copyright 2010, Google Inc.
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
var h = acre.require("helper/helpers.sjs");
var deferred = acre.require("promise/deferred");
var freebase = acre.require("promise/apis").freebase;

var SCHEMA_KEY_PREFIX = "lib/schema/typeloader.sjs:";

/**
 * Usage:
 *
 * load(type1, type2, type3)
 *   .then(function(schemas) {
 *     var type1_schema = schemas[type1];
 *     ...
 *   });
 *
 **/
function load() {
  return _load.apply(null, arguments)
    .then(function(types) {
      var ect_ids = [];
      var ect_map = {};
      // expand type.properties[].expected_type
      for (var type_id in types) {
        var type = types[type_id];
        type.properties.forEach(function(prop) {
          var ect = prop.expected_type;
          var ects = ect_map[ect.id];
          if (!ects) {
            ects = ect_map[ect.id] = [];
            ect_ids.push(ect.id);
          }
          ects.push(ect);
        });
      }
      if (ect_ids.length) {
        return _load.apply(null, ect_ids)
          .then(function(expected_types) {
            for (var type_id in expected_types) {
              var type = expected_types[type_id];
              var ects = ect_map[type_id];
              ects.forEach(function(ect) {
                h.extend(ect, type);
              });
            }
            return types;
          })
          .then(function(types) {
            // expand type.properties[].expected_type.properties[].expected_type
            var ect_ids = [];
            var ect_map = {};
            for (var type_id in types) {
              types[type_id].properties.forEach(function(prop) {
                prop.expected_type.properties.forEach(function(subprop) {
                  var ect = subprop.expected_type;
                  var ects = ect_map[ect.id];
                  if (!ects) {
                    ects = ect_map[ect.id] = [];
                    ect_ids.push(ect.id);
                  }
                  ects.push(ect);
                });
              });
            }
            if (ect_ids.length) {
              return _load.apply(null, ect_ids)
                .then(function(expected_types) {
                   for (var type_id in expected_types) {
                     var type = expected_types[type_id];
                     // don't include sub-level expected_type properties
                     delete type.properties;
                     var ects = ect_map[type_id];
                     ects.forEach(function(ect) {
                       h.extend(ect, type);
                     });
                   }
                   return types;
                });
            }
            return types;
          });
      }
      return types;
    });
};

function _load() {
  var type_ids = Array.prototype.slice.call(arguments);
  // TODO: assert type_ids.length
  var cached = {};
  var not_cached = [];
  type_ids.forEach(function(type_id) {
    var type = acre.cache.get(cache_key(type_id));
    if (type) {
      cached[type_id] = type;
      type.__CACHED__ = true; // flag to indicate type was cached
    }
    else {
      not_cached.push(type_id);
    }
  });
  var d;
  if (not_cached.length) {
    d = do_mql.apply(null, not_cached)
      .then(function(types) {
        types.forEach(function(type) {
         acre.cache.put(cache_key(type.id), type);
          cached[type.id] = type;
          type.__CACHED__ = false;  // flag to indicate type was NOT cached
        });
        return cached;
      });
  }
  else {
    d = deferred.resolved(cached);
  }
  return d;
};

function cache_key(type_id) {
  return SCHEMA_KEY_PREFIX + type_id;
};

function was_cached(type) {
  return type.__CACHED__ === true;
};

function do_mql(/**, type_id1, type_id2, ..., type_idN **/) {
  var type_ids = Array.prototype.slice.call(arguments);
  var q = [{
    id: null,
    "id|=": type_ids,
    name: [{
      optional: true,
      value: null,
      lang: null
    }],
    type: "/type/type",
    "/freebase/type_hints/enumeration": null,
    "/freebase/type_hints/mediator": null,
    "/freebase/type_hints/included_types": [],
    properties: [{
      optional: true,
      id: null,
      name: [{
        optional: true,
        value: null,
        lang: null
      }],
      type: "/type/property",
      unique: null,
      unit: {
        optional: true,
        id: null,
        type: "/type/unit",
        "/freebase/unit_profile/abbreviation": null
      },
      "/freebase/property_hints/disambiguator": null,
      "/freebase/property_hints/display_none": null,
      master_property: {
        optional: true,
        id: null,
        type: "/type/property"
      },
      reverse_property: {
        optional: true,
        id: null,
        type: "/type/property"
      },
      expected_type: {
        id: null,
        type: "/type/type"
      },
      index: null,
      sort: "index"
    }]
  }];
  return freebase.mqlread(q)
    .then(function(env) {
      return env.result;
    });
};
