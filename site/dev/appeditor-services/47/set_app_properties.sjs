/*
*  
*   Set app metadata properties:
*     * name
*     * listed -- whether listed in directory
*     * homepage  -- explicit home page (directory will auto-getnerate for acre apps)
*     * description -- short description (/type/text)
*     * article -- full artilce for app (blob in markdown)
*
*/

var FB = acre.freebase;
var service = acre.require('lib_appeditor_service');


function get_app_properties(appid) {
    var q = {
        "id":          appid,
        "type":        "/freebase/apps/application",
        "name":        null,
        "listed":      null,
        "homepage":    null,
        "description": null,
        "/common/topic/article": {
            "id":       null,
            "content":  null,
            "limit":    1,
            "optional": true
        }
    };
    var appinfo = FB.mqlread(q).result;

    var app = {
      id : appinfo.id,
      name : appinfo.name,
      listed : appinfo.listed,
      homepage : appinfo.homepage,
      description : appinfo.description,
      article : (appinfo['/common/topic/article'] && appinfo['/common/topic/article'].content ? appinfo['/common/topic/article'] : null),
    };

    return app;
}

function set_app_properties(appid, args) {
    appid = service.parse_path(appid).appid;    
    var app = get_app_properties(appid);
    var ret = {
        appid : appid
    };
    
    var do_write = false;
    var write = {
        "id" : appid
    };

    if (args.name !== app.name) {
        var do_write = true;
        write['name'] = {
          "value" : args.name,
          "lang" : "/lang/en",
          "connect" : "update"
        };
        write['/type/domain/owners'] = {
          "name" : {
            "value" : "Owners of " + args.name + " app",
            "lang" : "/lang/en",
            "connect" : "update"
          }
        };
        ret.name = args.name;
    }
    
    if (typeof args.listed !== 'undefined') {
        var listed = null;
        if (args.listed == "1") { listed = true; }
        if (args.listed == "0") { listed = false; }

        if (listed !== app.listed) {
            var do_write = true;
            write['/freebase/apps/application/listed'] = {
              "value" : listed,
              "connect" : "update"
            };
            ret.listed = args.listed;   
        }
    }

    if (typeof args.homepage !== 'undefined') {
        var homepage = app.homepage ? app.homepage : "";
        if (args.homepage !== homepage) {
            var do_write = true;
            write['/freebase/apps/application/homepage'] = {
              "value" : args.homepage,
              "connect" : "update"
            };
            ret.homepage = args.homepage;
        }
    }
    
    if (typeof args.description !== 'undefined') {
        var description = app.description ? app.description : "";
        if (args.description !== description) {
            var do_write = true;
            write['/freebase/apps/application/description'] = {
              "value" : args.description,
              "lang" : "/lang/en",
              "connect" : "update"
            };
            ret.description = args.description;
        }
    }
    
    if (do_write) { FB.mqlwrite(write); }

    if (typeof args.article !== 'undefined') {
        var article = app.article ? FB.get_blob(app.article.id).body : "";
        if (args.article !== article) {
            if (args.article == "") {
              FB.mqlwrite({
                "id" : args.appid,
                "/common/topic/article" : {
                  "id" : app.article.id,
                  "connect" : "delete"
                }
              });
            } else {
              if (!app.article) {
                var docwrite = FB.mqlwrite({
                  id : args.appid,
                  '/common/topic/article' : {
                    create: 'unless_connected',
                    type: [ {id: '/common/document'} ],
                    id: null
                  }
                });
                app.article = {};
                app.article.id = docwrite.result['/common/topic/article'].id;
              }
              FB.upload(args.article, 'text/plain', {document : app.article.id});
            }
            ret.article = true;
        }
    }
    
    return ret;
}

if (acre.current_script == acre.request.script) {
    service.PostService(function() {
        var args = service.parse_request_args(['appid']);
        service.check_user();
            
        return set_app_properties(args.appid, args);
    }, this);
}
