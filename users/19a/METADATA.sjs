var METADATA = {
  "mounts": {
    "site": "//38a.site.www.tags.svn.freebase-site.googlecode.dev"
  }, 
  "app_version": "19", 
  "app_tag": "19a", 
  "app_key": "users"
};

acre.require(METADATA.mounts.site + "/lib/helper/helpers.sjs").extend_metadata(METADATA, "site");
