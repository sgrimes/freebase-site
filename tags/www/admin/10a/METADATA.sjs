var METADATA = {
  "mounts": {
    "lib": "//23b.lib.www.tags.svn.freebase-site.googlecode.dev"
  }, 
  "app_version": 10, 
  "app_tag": "10a", 
  "app_key": "admin"
};

acre.require(METADATA.mounts.lib + "/loader.sjs").extend_metadata(METADATA);