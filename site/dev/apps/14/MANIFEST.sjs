var MF = {
  "apps": {
      "core": "//14.core.site.freebase.dev",
      "template": "//14.template.site.freebase.dev",
      "promise": "//14.promise.site.freebase.dev",
      "domain": "//14.domain.site.freebase.dev",
      "schema": "//14.schema.site.freebase.dev",
      "jquerytools": "//14.jquerytools.site.freebase.dev",

      // external apps
      "libraries" : "//release.libraries.apps.freebase.dev",
      "jquery" : "//release.jquery.libs.freebase.dev",
      "service" : "//release.service.libs.freebase.dev"
  },
  "stylesheet": {
    "apps.mf.css": [
      ["template", "freebase.mf.css"],
      ["template", "freebase.table.less"],
      ["schema", "schema.less"],
      "apps.less"
    ],
    "article.mf.css" : [
      "article.css"
    ]
  },
  "javascript": {
    "apps.mf.js": [
      ["template", "freebase.mf.js"],
      ["jquerytools", "tabs.js"],
      ["jquery", "jquery.form.js"],
      "apps.js"
    ]
  },
  "featured" : [
    "/user/namesbc/tippify",
    "/user/stefanomazzocchi/typewriter",
    "/user/jh/fmdb",
    "/user/jdouglas/schemas",
    "/user/sprocketonline/familytree",
    "/user/pak21/kevinbacon",
    "/user/tmorris/untyped",
    "/user/pak21/splitter",
    "/user/narphorium/jeopardy",
    "/user/skud/experthub",
    "/user/stefanomazzocchi/genderizer",
    "/user/stefanomazzocchi/geographer2",
    "/user/vtalwar/little-sister",
    "/user/stefanomazzocchi/ids",
    "/user/jamie/wordnet-app",
    "/user/stefanomazzocchi/translate"
  ],
  "games" : [
    "/user/stefanomazzocchi/typewriter",
    "/user/stefanomazzocchi/geographer2",
    "/user/stefanomazzocchi/genderizer",
    "/user/stefanomazzocchi/detypewriter",
    "/user/stefanomazzocchi/dater"
  ]
};
if (/^https?\:\/\/devel\.(freebase|sandbox\-freebase|branch\.qa\.metaweb|trunk\.qa\.metaweb)\.com(\:\d+)?/.test(acre.request.app_url)) {
  MF.apps.core = "//core.site.freebase.dev";
}
acre.require(MF.apps.core + "/MANIFEST").init(MF, this, {"image_base_url": "http://freebaselibs.com/static/freebase_site/apps/324ce644fc22415cec6fcbfcb61c693b", "static_base_url": "http://freebaselibs.com/static/freebase_site/apps/324ce644fc22415cec6fcbfcb61c693b"});
