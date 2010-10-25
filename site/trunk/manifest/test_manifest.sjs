acre.require('/test/lib').enable(this);

var lib = acre.require("MANIFEST");
var scope = this;

test("require_args", function() {
  var mf = new lib.Manifest(scope);
  deepEqual(mf.require_args("bar"), {app:null,file:"bar",local:true});
  deepEqual(mf.require_args("foo", "bar"), {app:"foo",file:"bar",local:false});
  deepEqual(mf.require_args("foo", "bar", "baz"), {app:"foo",file:"bar",local:false});
  deepEqual(mf.require_args(null, "bar"), {app:null,file:"bar",local:true});
  deepEqual(mf.require_args("foo", null), {app:null,file:"foo",local:true});
  var ex = "bad require args";
  try { mf.require_args(); ok(false, "expected " + ex); } catch(e) { equal(e, ex); }
  try { mf.require_args(null); ok(false, "expected " + ex); } catch(e) { equal(e, ex); }
  try { mf.require_args(null, null); ok(false, "expected " + ex); } catch(e) { equal(e, ex); }
});

test("css_preprocessor", function() {
  var mf = new lib.Manifest(scope, {
    apps: {
      "manifest": "//manifest.site.freebase.dev"
    }
  });

  var tests = [
    ["background: url(manifest, freebase-logo.png) no-repeat", "background: url(" + mf.img_src("manifest", "freebase-logo.png") + ") no-repeat"],
    ["background: url(icon-chiclet.png)", "background: url(" + mf.img_src("icon-chiclet.png") + ")"],
    ["background: url(http://www.freebase.com/logo.png)", "background: url(http://www.freebase.com/logo.png)"],
    ["background: url(static:///logo.png)", "background: url(static:///logo.png)"]
  ];

  tests.forEach(function(t) {
    equals(mf.css_preprocessor(t[0]), t[1]);
  });
});

test("css_src", function() {
  var mf = new lib.Manifest(scope, {
    apps: {
      "manifest": "//manifest.site.freebase.dev",
      "hello": "//4.app.world.hello.dev"
    },
    stylesheet: {
      "foo.mf.css": [
        ["hello", "external.css"],
        "local.css"
      ]
    }
  });
  equals(mf.css_src("foo.mf.css"), mf.static_base_url + "/foo.mf.css");
});

test("js_src", function() {
  var mf = new lib.Manifest(scope, {
    apps: {
      "manifest": "//manifest.site.freebase.dev",
      "hello": "//4.app.world.hello.dev"
    },
    javascript: {
      "foo.mf.js": [
        ["hello", "external.js"],
        "local.js"
      ]
    }
  });
  equals(mf.js_src("foo.mf.js"), mf.static_base_url + "/foo.mf.js");
});

test("img_src", function() {
  var mf = new lib.Manifest(scope, {
    apps: {
      "manifest": "//manifest.site.freebase.dev",
      "hello": "//5.app.world.hello.dev"
    }
  });

  var ext_mf = mf.require("manifest", "MANIFEST").mf;

  var tests = [
    [
      ["local.png"],
      mf.image_base_url + "/local.png"
    ],
    [
      ["manifest", "freebase-logo-production.png"],
      ext_mf.image_base_url + "/freebase-logo-production.png"
    ]
  ];

  tests.forEach(function(t) {
    equals(mf.img_src.apply(mf, t[0]), t[1]);
  });
});

test("config", function() {
  var mf = new lib.Manifest(scope, {
    apps: {
      "manifest": "//manifest.site.freebase.dev",
      "hello": "//7.app.world.hello.dev"
    }
  });
  equals(mf.static_base_url, mf.get_app_base_url() +  "/MANIFEST");

  ok(mf.apps);
  equals(mf.apps["hello"], "//7.app.world.hello.dev");
  ok(mf.javascript);
  ok(mf.stylesheet);

  mf = new lib.Manifest(scope, {
    apps: {
      "manifest": "//manifest.site.freebase.dev",
      "hello": "//7.app.world.hello.dev"
    },
    static_base_url:'foo',
    image_base_url: 'bar'
  });
  equals(mf.static_base_url, 'foo');
  equals(mf.image_base_url, 'bar');
});


test("extend config apps", function() {
  var manifest_config = JSON.parse(acre.get_source("CONFIG.json"));
  var mf = new lib.Manifest(scope, {
    "apps": {
      // overwrite service in base manifest CONFIG.json
      "service": "//app.world.hello.dev"
    }
  });
  equals(mf.apps.service, "//app.world.hello.dev");
});

acre.test.report();

