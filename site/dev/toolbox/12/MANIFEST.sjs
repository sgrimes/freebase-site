
var MF = {
  "apps" : {
    "core": "//11.core.site.freebase.dev",
    "promise": "//11.promise.site.freebase.dev",
    "template": "//11.template.site.freebase.dev",

    // external apps
    "appeditor" : "//appeditor.apps.freebase.dev"
  }
};

if (/^https?\:\/\/devel\.(freebase|sandbox\-freebase|branch\.qa\.metaweb|trunk\.qa\.metaweb)\.com(\:\d+)?/.test(acre.request.app_url)) {
  MF.apps.core = "//core.site.freebase.dev";
}
acre.require(MF.apps.core + "/MANIFEST").init(MF, this, {"image_base_url": "http://freebaselibs.com/static/freebase_site/toolbox/a4a9743023df04a089b0a33831bc6a73", "static_base_url": "http://freebaselibs.com/static/freebase_site/toolbox/a4a9743023df04a089b0a33831bc6a73"});
