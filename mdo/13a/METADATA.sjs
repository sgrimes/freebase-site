var METADATA = {
  "mounts": {
    "site": "//31a.site.www.tags.svn.freebase-site.googlecode.dev"
  }, 
  "app_version": "13", 
  "app_tag": "13a", 
  "app_key": "mdo"
};

acre.require(METADATA.mounts.site + "/lib/helper/helpers.sjs").extend_metadata(METADATA, "site");
