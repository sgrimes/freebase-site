var METADATA = {
  "mounts": {
    "site": "//26b.site.www.tags.svn.freebase-site.googlecode.dev"
  }, 
  "app_tag": "8a", 
  "app_version": "8", 
  "extensions": {
    "mf.css": {
      "media_type": "text/css", 
      "handler": "css_manifest"
    }, 
    "mf.js": {
      "media_type": "text/javascript", 
      "handler": "js_manifest"
    }, 
    "omf.css": {
      "media_type": "text/css", 
      "handler": "css_manifest"
    }, 
    "omf.js": {
      "media_type": "text/javascript", 
      "handler": "js_manifest"
    }
  }, 
  "app_key": "mdo"
};

acre.require(METADATA.mounts.site + "/lib/helper/helpers.sjs").extend_metadata(METADATA, "site");
