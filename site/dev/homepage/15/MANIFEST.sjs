
var MF = {
  "apps": {
      "core": "//13.core.site.freebase.dev",
      "template": "//13.template.site.freebase.dev",
      "promise": "//13.promise.site.freebase.dev",
      "flot": "//13.flot.site.freebase.dev",
      
      "libraries": "//2.libraries.apps.freebase.dev"
  },
  "stylesheet": {
    "homepage.mf.css": [
      ["template", "freebase.mf.css"],
      "homepage.less"
    ]
  },
  "javascript": {
    "homepage.mf.js": [
      ["template", "freebase.mf.js"],
      ["flot", "flot.core.mf.js"],
      "jquery.tinysort.js",
      "jquery.tools.tabs.min.js",
      "homepage.js"
    ]
  }
};

acre.require(MF.apps.core + "/MANIFEST").init(MF, this);
