var METADATA = {
  "mounts": {
    "libraries": "//2.libraries.apps.freebase.dev", 
    "service": "//service", 
    "lib": "//80.lib.www.branches.svn.freebase-site.googlecode.dev"
  }, 
  "app_tag": null, 
  "app_version": 55, 
  "app_key": "apps"
};

acre.require(METADATA.mounts.lib + "/helper/helpers.sjs").extend_metadata(METADATA, "lib");
