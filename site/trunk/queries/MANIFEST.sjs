var MF = {
  "apps" : {
    "core": "//15.core.site.freebase.dev",
    "promise": "//14.promise.site.freebase.dev",
    "validator": "//validator.site.freebase.dev"
  }
};

if (/^https?\:\/\/devel\.(freebase|sandbox\-freebase|branch\.qa\.metaweb|trunk\.qa\.metaweb)\.com(\:\d+)?/.test(acre.request.app_url)) {
  MF.apps.core = "//core.site.freebase.dev";
}
acre.require(MF.apps.core + "/MANIFEST").init(MF, this);
