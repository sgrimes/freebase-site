var METADATA = {
  "mounts": {
    "site": "//30.site.www.branches.svn.freebase-site.googlecode.dev"
  }, 
  "freebase": {
    "write_user": "appeditoruser"
  }, 
  "app_tag": null, 
  "app_version": 37, 
  "app_key": "schema"
};

acre.require(METADATA.mounts.site + "/lib/helper/helpers.sjs").extend_metadata(METADATA, "site");
