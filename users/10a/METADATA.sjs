var METADATA = {
  "mounts": {
    "site": "//29a.site.www.tags.svn.freebase-site.googlecode.dev"
  }, 
  "app_version": "10", 
  "app_tag": "10a", 
  "app_key": "users"
};

acre.require(METADATA.mounts.site + "/lib/helper/helpers.sjs").extend_metadata(METADATA, "site");
