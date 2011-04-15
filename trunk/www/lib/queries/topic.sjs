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
var i18n = acre.require("i18n/i18n.sjs");
var freebase = acre.require("promise/apis.sjs").freebase;
var deferred = acre.require("promise/deferred.sjs");
var pq = acre.require("propbox/queries.sjs");
var ph = acre.require("propbox/helpers.sjs");

/**
 * Get topic data/structure from Topic API
 */
function topic(id, lang, limit, as_of_time, domains) {
  var params = {
    lang: [lang || "/lang/en"]
  };
  if (params.lang != "/lang/en") {
    params.lang.push("/lang/en");
  }
  params.lang.push("/lang/wp");
  if (limit) {
    params.limit = limit;
  }
  if (as_of_time) {
    params.as_of_time = as_of_time;
  }
  if (domains) {
    params.domains = domains;
  }
  var url = h.fb_api_url("/api/experimental/topic/full", id, params);
  return freebase.fetch(url)
    .then(function(env) {
      return env.result;
    })
    .then(function(result) {
      var props = result && result.properties;
      if (props) {
        var image_props = [];
        var article_props = [];
        for (var prop_id in props) {
          var prop = props[prop_id];
          var ect = prop.expected_type.id;
          if (ect === "/common/image") {
            prop.id = prop_id;
            image_props.push(prop);
          }
          else if (ect === "/common/document") {
            prop.id = prop_id;
            article_props.push(prop);
          }
        }

        var promises = [];


        if (image_props.length) {
          promises.push(get_image_metadata(id, image_props, lang));
        }
        if (article_props.length) {
          promises.push(get_article_metadata(id, article_props, lang));
        }

        return deferred.all(promises)
          .then(function(ps) {
            return result;
          });

      }
      return result;
    });
};

function get_image_metadata(id, image_props, lang) {
  return image_properties(lang)
    .then(function(subprops) {
        return get_metadata(id, image_props, subprops, lang);
    });
};

function image_properties(lang) {
  var promises = [
    pq.prop_structure("/type/object/name", lang),
    pq.prop_structure("/type/object/creator", lang),
    pq.prop_structure("/type/content/uploaded_by", lang),
    pq.prop_structure("/common/image/rights_holder_text_attribution", lang),
    pq.prop_structure("/common/licensed_object/license", lang)
  ];
  return deferred.all(promises);
};


function get_metadata(id, props, subprops, lang) {
  var promises = [];
  props.forEach(function(prop) {
    prop.properties = subprops;
    prop.values.forEach(function(value) {
      promises.push(metadata_query(id, prop, value, lang));
    });
  });

  return deferred.all(promises)
    .then(function() {
      return props;
    });
};

function metadata_query(id, prop, value, lang) {
  return pq.prop_data(id, prop, value.id, lang)
    .then(function(result) {
      result[prop.id].forEach(function(data) {
        prop.properties.forEach(function(subprop) {
           subprop = h.extend({}, subprop);
           subprop.values = [];
           data[subprop.id].forEach(function(subdata) {
             subprop.values.push(ph.minimal_prop_value(subprop, subdata, lang));
           });
           value[subprop.id] = subprop;
        });
      });
    });
};

function get_article_metadata(id, article_props, lang) {
  return article_properties(lang)
    .then(function(subprops) {
      return get_metadata(id, article_props, subprops, lang);
    })
    .then(function(result) {
      // fetch blurbs for each article value
      var blurbs = [];
      article_props.forEach(function(article_prop) {
        article_prop.values.forEach(function(value) {
          blurbs.push(i18n._get_blob.closure(value, "blurb", {maxlength:32}, "text"));
        });
      });
      return deferred.all(blurbs)
        .then(function() {
          return result;
        });
    });
};

function article_properties(lang) {
  var promises = [
    pq.prop_structure("/type/object/creator", lang),
    pq.prop_structure("/type/object/timestamp", lang),
    pq.prop_structure("/common/document/source_uri", lang),
    pq.prop_structure("/common/document/content", lang)
  ];
  return deferred.all(promises);
};
