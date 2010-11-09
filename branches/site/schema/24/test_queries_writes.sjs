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

acre.require('/test/lib').enable(this);

var mf = acre.require("MANIFEST").mf;
var q = mf.require("queries");
var mql = mf.require("mql");
var ht = mf.require("test", "helpers");


// this test requires user to be logged in
var user = acre.freebase.get_user_info();

test("login required", function() {
  ok(user, "login required");
});

if (!user) {
  acre.test.report();
  acre.exit();
}

var user_domain = user.id + "/default_domain";

test("add_included_types", function() {
  var type = ht.create_type(user_domain);
  try {
    var result;
    q.add_included_types(type.id, ["/people/person", "/film/actor"])
      .then(function(included) {
        result = included;
      });
    acre.async.wait_on_results();
    ok(result);
    result = acre.freebase.mqlread({id: type.id, "/freebase/type_hints/included_types": [{id:null}]}).result;
    result = result["/freebase/type_hints/included_types"];
    ok(result.length === 2);
    var included = {};
    result.forEach(function(type) {
      included[type.id] = true;
    });
    ["/people/person", "/film/actor"].forEach(function(type) {
      ok(included[type], type + " is included");
    });
  }
  finally {
    if (type) ht.delete_type(type);
  }
});

test("delete_included_type", function() {
  var type = ht.create_type(user_domain, {"/freebase/type_hints/included_types": {id: "/people/person"}});
  // make sure of included type
  equal(type["/freebase/type_hints/included_types"].id, "/people/person");

  try {
    var result;
    q.delete_included_type(type.id, "/people/person")
      .then(function(deleted) {
        result = deleted;
      });
    acre.async.wait_on_results();
    ok(result);
    result = acre.freebase.mqlread({id: type.id, "/freebase/type_hints/included_types": null}).result;
    ok(!result["/freebase/type_hints/included_types"]);
  }
  finally {
    if (type) ht.delete_type(type);
  }
});


test("add_instance", function() {
  var type = ht.create_type(user_domain, {"/freebase/type_hints/included_types": [{id: "/common/topic"},{id: "/people/person"}]});
  try {
    var topic = acre.freebase.mqlwrite({id:null, create:"unconditional"}).result;
    ok(topic.id, topic.id);
    var result;
    q.add_instance(topic.id, type.id)
      .then(function(instance) {
        result = instance;
      });
    acre.async.wait_on_results();
    ok(result);
    result = acre.freebase.mqlread({id:topic.id, type:[]}).result;
    var types = {};
    result.type.forEach(function(t) {
      types[t] = true;
    });
    [type.id, "/common/topic", "/people/person"].forEach(function(t) {
      ok(types[t], t);
    });
  }
  finally {
    if (type) ht.delete_type(type);
  }
});

test("delete_instance", function() {
  var topic = acre.freebase.mqlwrite({id:null, type:"/people/person", create:"unconditional"}).result;
  ok(topic.id, topic.id);
  var result;
  q.delete_instance(topic.id, "/people/person")
    .then(function(deleted) {
      result = deleted;
    });
  acre.async.wait_on_results();
  ok(result);
  result = acre.freebase.mqlread({id:topic.id, type:null}).result;
  ok(result.type == null, result.type);
});

test("ensure_namespace", function() {
  var result;
  q.ensure_namespace(user.id)
    .then(function(namespace_id) {
      result = namespace_id;
    });
  acre.async.wait_on_results();
  equal(result, user.id);

  result = null;
  var key = ("test_ensure_namespace_" + ht.random()).toLowerCase();
  var ns = user.id + "/" + key;
  try {
    q.ensure_namespace(ns)
      .then(function(namespace_id) {
        result = namespace_id;
      });
    acre.async.wait_on_results();
    equal(result, ns);
    // ensure same permission as the parent namespace
    var permission1 = acre.freebase.mqlread({id:user.id, permission:null}).result.permission;
    var permission2 = acre.freebase.mqlread({id:result, permission:null}).result.permission;
    equal(permission2, permission1);
  }
  finally {
    if (result) {
      var mid = acre.freebase.mqlread({id:result, mid:null}).result.mid;
      result = acre.freebase.mqlwrite({
        id: mid,
        type: {
          id: "/type/namespace",
          connect: "delete"
        },
        key: {
          namespace: user.id,
          value: key,
          connect: "delete"
        }
      }).result;
      console.log("deleted", result);
    }
  }

});

acre.test.report();

