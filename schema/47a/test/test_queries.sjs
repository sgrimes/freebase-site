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
acre.require('/test/lib').enable(this);

acre.require("lib/test/mock").playback(this, "test/playback_test_queries.json");

var ht = acre.require("test/helpers.sjs");
var q = acre.require("queries");
var mql = acre.require("mql");

var self = this;

test("domains", function() {
  var result;
  q.domains(mql.domains({"id":"/base/slamdunk",key:[]}))
    .then(function(domains) {
       result = domains;
    });
  acre.async.wait_on_results();
  ok(result, "got domain");
  ok(result.length === 1, "got /base/slamdunk domain");
  result = result[0];
  equal(result.id, "/base/slamdunk");
  ht.assert_domain_keys(self, result);
});

test("common_domains", function() {
  var result;
  q.common_domains()
    .then(function(domains) {
      result = domains;
    });
  acre.async.wait_on_results();
  ok(result && result.length, "got commons domains");
  result.forEach(function(domain) {
    ht.assert_domain_keys(self, domain);
  });
});

test("user_domains", function() {
  var result;
  q.user_domains("/user/daepark")
    .then(function(domains) {
      result = domains;
    });
  acre.async.wait_on_results();
  ok(result && result.length, "got user domains");
  var slamdunk_base;
  result.forEach(function(domain) {
    ht.assert_domain_keys(self, domain);
    if (domain.id === "/base/slamdunk") {
      slamdunk_base = domain;
    }
  });
  ok(slamdunk_base, "expected to find /base/slamdunk domain by /user/daepark");
});

test("load_domain", function() {
    var result;
    q.load_domain("/film", "/lang/en")
        .then(function(r) {
            result = r;
        });
    acre.async.wait_on_results();
    ok(result && result.id === "/film", "Got domain");
    ok(!result.types && !result["/common/topic/article"]);
});

test("load_domain types and articles", function() {
    expect(4);
    var result;
    q.load_domain("/film", "/lang/en", {types:true, article:true, types_article:true})
        .then(function(r) {
            result = r;
        });
    acre.async.wait_on_results();
    ok(result && result.id === "/film", "Got domain");
    ok(result["/common/topic/article"]);
    ok(result.types, "Got domain types");
    result.types.every(function(t) {
        if (t.id === "/film/film") {
            ok(t["/common/topic/article"], "Got article for /film/film");
            return false;
        }
        return true;
    });
});

test("load_type", function() {
    var result;
    q.load_type("/film/film", "/lang/en")
        .then(function(r) {
            result = r;
        });
    acre.async.wait_on_results();
    ok(result && result.id === "/film/film", "Got type");
    ok(!result["/common/topic/article"]);
});

test("load_type properties and articles", function() {
    expect(3);
    var result;
    q.load_type("/film/film", "/lang/en", {article:true, properties_article:true})
        .then(function(r) {
            result = r;
        });
    acre.async.wait_on_results();
    ok(result && result.id === "/film/film", "Got type");
    ok(result["/common/topic/article"]);
    result.properties.every(function(p) {
        if (p.id === "/film/film/initial_release_date") {
            ok(p["/freebase/documented_object/tip"], "Got property tip for /film/film/initial_release_date");
            return false;
        }
        return true;
    });
});

test("load_property", function() {
    var result;
    q.load_property("/film/film/initial_release_date", "/lang/en")
        .then(function(r) {
            result = r;
        });
    acre.async.wait_on_results();
    ok(result && result.id === "/film/film/initial_release_date", "Got type");
    ok(!result["/freebase/documented_object/tip"]);
});

test("load_property article", function() {
    var result;
    q.load_property("/film/film/initial_release_date", "/lang/en", {article:true})
        .then(function(r) {
            result = r;
        });
    acre.async.wait_on_results();
    ok(result && result.id === "/film/film/initial_release_date", "Got type");
    ok(result["/freebase/documented_object/tip"]);
});

test("minimal_topic", function() {
    var result;
    q.minimal_topic("/en/google", "/lang/en")
        .then(function(r) {
            result = r;
        });
    acre.async.wait_on_results();
    ok(result && result.id === "/en/google", "Got topic");
    ok(result.name);
    ok(result["/common/topic/article"]);
});

test("minimal_topic_multi", function() {
    expect(6);
    var result;
    q.minimal_topic_multi(["/en/google", "/en/apple_inc"], "/lang/en")
        .then(function(r) {
            result = r;
        });
    acre.async.wait_on_results();

    ["/en/google", "/en/apple_inc"].forEach(function(id) {
        ok(result[id] && result[id].id === id, "Got topic " + id);
        ok(result[id].name);
        ok(result[id]["/common/topic/article"]);
    });
});

acre.test.report();
