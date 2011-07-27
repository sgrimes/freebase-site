// site repository trunk and tags paths.
var codebase = ".www.trunk.svn.freebase-site.googlecode.dev";
var tags_codebase = ".www.tags.svn.freebase-site.googlecode.dev";

// freebase-site trunk lib
var site = "//site.www.trunk.svn.freebase-site.googlecode.dev";

var environment_rules = {

    // Override labels. All labels point to trunk by default.
    "labels" : {
        "site": site
    },

    // Override prefix.
    "prefix" : [
        // Test routing rules to test non-user facing apps (core libraries, etc.)
        {prefix:"/test_lib_appeditor-services",  app:"lib", script:"appeditor-services/test"},
        {prefix:"/test_lib_filter",         app:"lib", script:"filter/test"},
        {prefix:"/test_lib_handlers",       app:"lib", script:"handlers/test"},
        {prefix:"/test_lib_helper",         app:"lib", script:"helper/test"},
        {prefix:"/test_lib_i18n",           app:"lib", script:"i18n/test"},
        {prefix:"/test_lib_permission",     app:"lib", script:"permission/test"},
        {prefix:"/test_lib_promise",        app:"lib", script:"promise/test"},
        {prefix:"/test_lib_propbox",        app:"lib", script:"propbox/test"},
        {prefix:"/test_lib_queries",        app:"lib", script:"queries/test"},
        {prefix:"/test_lib_routing",        app:"lib", script:"routing/test"},
        {prefix:"/test_lib_suggest",        app:"lib", script:"suggest/test"},
        {prefix:"/test_lib_template",       app:"lib", script:"template/test"},
        {prefix:"/test_lib_test",           app:"lib", script:"test/test"},
        {prefix:"/test_lib_validator",      app:"lib", script:"validator/test"},
        {prefix:"/test_site_queries",       app:"site", script:"queries/test"},
        {prefix:"/test_inspect",            app:"triples", script:"test"},
        {prefix:"/test_schema",             app:"schema", script:"test"},
        {prefix:"/test_topic",              app:"topic", script:"test"},
        {prefix:"/test_data",               app:"data", script:"test"},

        // sample app
        {prefix:"/sample",             app:"sample"}
    ]
};

acre.require(site + "/router.sjs").route(environment_rules, this);
