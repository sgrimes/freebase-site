var mf = JSON.parse(acre.require("CONFIG.json").body);
acre.require(mf.apps.core + "/MANIFEST").init(mf, this, {"image_base_url": "http://freebaselibs.com/static/freebase_site/schema/04873eace346765955b486f4d10b4d05", "static_base_url": "http://freebaselibs.com/static/freebase_site/schema/04873eace346765955b486f4d10b4d05"});