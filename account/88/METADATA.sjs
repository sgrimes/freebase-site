var METADATA = {
  "mounts": {
    "lib": "//115.lib.www.branches.svn.freebase-site.googlecode.dev"
  }, 
  "app_tag": null, 
  "app_version": 88, 
  "app_key": "account"
};

acre.require(METADATA.mounts.lib + "/helper/helpers.sjs").extend_metadata(METADATA, "lib");
