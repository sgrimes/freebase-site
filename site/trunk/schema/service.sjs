
var mf = acre.require("MANIFEST").MF;
var h = mf.require("core", "helpers");
var edit = mf.require("editcomponents");
var ServiceError = mf.require("core", "service").lib.ServiceError;
var create_type = mf.require("queries", "create_type").create_type;
var delete_type = mf.require("queries", "delete_type").delete_type;
var queries = mf.require("queries");
var t = mf.require("templates");

var api = {
  get_type_properties: function(args) {
    return queries.type_properties(args.id)
      .then(function(props) {
        return {
          html: acre.markup.stringify(t.native_properties(props, args.id))
        };
      });
  },

  get_incoming_from_commons: function(args) {
    return queries.incoming_from_commons(args.id, args.exclude_domain)
      .then(function(props) {
        return {
          html: acre.markup.stringify(t.incoming_props_tbody(props))
        };
      });
  },

  get_incoming_from_bases: function(args) {
    return queries.incoming_from_bases(args.id, args.exclude_domain)
      .then(function(props) {
        return {
          html: acre.markup.stringify(t.incoming_props_tbody(props))
        };
      });
  },

  add_new_type_begin: function(args) {
    return {
      html: acre.markup.stringify(edit.add_new_type_form(args.id, args.mediator == 1))
    };
  },

  add_new_type_submit: function(args) {
    var create_type_options = h.extend({}, args, {mqlkey_quote:true});

    return create_type(create_type_options)
      .then(function(result) {
        var created = {name:args.name, id: result.id, properties: 0, instance_count: 0, blurb: args.description};
        if (args.typehint === "mediator") {
          created.mediator = created["/freebase/type_hints/mediator"] = true;
        }
        else if (args.typehint === "enumeration") {
          created.enumeration = created["/freebase/type_hints/enumeration"] = true;
        }
        return {
          html: acre.markup.stringify(t.domain_type_row(created))
        };
      });
  },

  delete_type_begin: function(args) {
    // delete_type dry_run so we know what we are deleting
    return delete_type(args.id, args.user, true)
      .then(function([type_info, result]) {
        return {
          html: acre.markup.stringify(edit.delete_type_form(type_info))
        };
      });
  }
};

// required args and authorization
api.get_type_properties.args = ["id"]; // type id

api.get_incoming_from_commons.args = ["id"]; // type id, exclude_domain (ptional)

api.get_incoming_from_bases.args = ["id"]; // type id, exclude_domain (ptional)

api.add_new_type_begin.args = ["id"]; // domain id, mediator (optional)
api.add_new_type_begin.auth = true;

api.add_new_type_submit.args = ["domain", "name", "key", "typehint", "description"];
api.add_new_type_submit.auth = true;

api.delete_type_begin.args = ["id", "user"]; // type id, user id
api.delete_type_begin.auth = true;

function main(scope) {
  if (h.is_client()) {
    acre.response.set_cache_policy('fast');
  }
  var service = mf.require("core", "service");
  service.main(scope, api);
};

if (acre.current_script == acre.request.script) {
  main(this);
}
