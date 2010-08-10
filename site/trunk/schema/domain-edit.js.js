(function($, fb) {

  var de = fb.schema.domain.edit = {

    /**
     * retrieve add_new_type form (ajax).
     */
    add_new_type_begin: function(context, mediator) {
      var table = context.prev("table");
      $.ajax({
        url: acre.request.app_url + "/schema/service/add_new_type_begin",
        data: {id: acre.c.id, mediator: mediator ? 1 : 0},
        dataType: "json",
        success: function(data) {
          // add edit-form after the edit button
          var form = $(data.result.html).hide()
            .data("table", table)
            .data("submitted", []);
          context.after(form);

          de.add_new_type_init(form);

          form
            .bind("fb.schema.domain.edit.add_new_type.submit", function() {
              console.log("fb.schema.domain.edit.add_new_type.submit");
              de.add_new_type_submit(form);
            })
            .bind("fb.schema.domain.edit.add_new_type.cancel", function() {
              console.log("fb.schema.domain.edit.add_new_type.submit");
              de.add_new_type_cancel(form);
            })
            .bind("fb.schema.domain.edit.add_new_type.finish", function() {
              console.log("fb.schema.domain.edit.add_new_type.finish");
              de.add_new_type_finish(form);
            })
            .bind("fb.schema.domain.edit.add_new_type.warning", function(e, row, warning) {
              console.log("fb.schema.domain.edit.add_new_type.warning", row, warning);
              de.add_new_type_row_warning(form, row, warning);
            })
            .bind("fb.schema.domain.edit.add_new_type.error", function(e, row, error) {
              console.log("fb.schema.domain.edit.add_new_type.error", row, error);
              de.add_new_type_row_error(form, row, error);
            })
            .slideDown(function() {
              $(":text:first", this).focus();
            });
        }
      });
    },

    /**
     * init add_new_type form
     */
    add_new_type_init: function(form) {
      // submit handler
      var submit = $(".button-submit", form).click(function() {
        form.trigger("fb.schema.domain.edit.add_new_type.submit");
      });
      form.bind("change", function() {
        fb.enable(submit);
      });
      form.data("button-submit", submit);
      // disable submit button
      fb.disable(submit);

      // cancel handler
      var cancel = $(".button-cancel", form).click(function() {
        form.trigger("fb.schema.domain.edit.add_new_type.cancel");
      });
      form.data("button-cancel", cancel);

      // disable edit-row-template
      fb.disable($(".edit-row-template :input", form));

      // init edit-row
      $(".edit-row:not(.edit-row-template, .edit-row-submit)", form).each(function() {
        de.add_new_type_init_row($(this));
      });
    },

    /**
     * init add_new_type row
     */
    add_new_type_init_row: function(row) {
      var name = $(":input[name=name]", row);
      var key =  $(":input[name=key]", row);
      var description = $(":input[name=description]", row);

      // autofill key
      name
        .change(function() {
          key.data("changed", true);
        })
        .keyup(function() {
          if (!key.data("changed")) {
            var val = $.trim(name.val()).toLowerCase().replace(/\s+/g, '-');
            key.val(val);
          }
        });

      // enter/escape key handler
      $(":text").keyup(function(e) {
        if (e.keyCode === 13) { // enter
          row.trigger("fb.schema.domain.edit.add_new_type.submit");
        }
        else if (e.keyCode === 27) { // escape
          row.trigger("fb.schema.domain.edit.add_new_type.cancel");
        }
      });

      // show another row on description focus if row valid
      description.focus(function() {
        if (! (name.val() === "" || key.val() === "")) {
          // are we the enabled row?
          var template = row.siblings(".edit-row-template");
          if (template.prev(".edit-row")[0] === row[0]) {
            var new_row = template.clone();
            new_row.removeClass("edit-row-template");
            fb.enable($(":input", new_row));
            template.before(new_row);
            de.add_new_type_init_row(new_row);
          }
        }
      });
    },

    add_new_type_cancel: function(form) {
      form.slideUp(function() {
        $(this).remove();
      });
    },

    /**
     * validate rows, if no errors submit
     */
    add_new_type_submit: function(form) {
      if (form.is(".loading")) {
        return;
      }
      if (form.data("button-submit").is(":disabled")) {
        return;
      }
      // remove focus from activeelement
      if (document.activeElement) {
        $(document.activeElement).blur();
      }
      // remove existing row-msg's
      $(".row-msg", form).remove();
      var rows = $(".edit-row:not(.edit-row-template, .edit-row-submit)", form).each(function() {
        de.add_new_type_row_validate($(this));
      });
      // any pre-submit errors?
      if ($(".row-msg-error").length) {
        return;
      }

      form.addClass("loading");
      rows = Array.prototype.slice.call(rows); // make jQuery object into an Array
      de.add_new_type_submit_rows(form, rows);
   },

    add_new_type_finish: function(form) {
      var tbody = form.data("table").find("tbody:first");
      // do we have any new rows?
      var submitted = form.data("submitted");
      $.each(submitted, function(i,n) {
        var row = n[0];
        var data = n[1];
        var new_row = $(data.result.html).addClass("new-row");
        tbody.append(new_row);
        fb.schema.init_row_menu(new_row);
        $(".edit", new_row).show();
        row.remove();
      });
      // clear submitted array
      form.data("submitted",[]);

      // do we have any errors?
      if ($(".row-msg-error", form).length) {
        form.removeClass("loading");
      }
      else {
        form.trigger("fb.schema.domain.edit.add_new_type.cancel");
      }
    },

    add_new_type_submit_rows: function(form, rows /** Array **/) {
      if (!rows.length) {
        form.trigger("fb.schema.domain.edit.add_new_type.finish");
        return;
      }
      var row = $(rows.shift());
      var name = $.trim($(":input[name=name]", row).val());
      var key = $.trim($(":input[name=key]", row).val());
      if (name === "" || key === "") {
        // skip row
        de.add_new_type_submit_rows(form, rows);
        return;
      }
      var typehint = $(":input[name=typehint]", row);
      typehint = typehint.is(":checked") ? typehint.val() : "";

      var data = {
        domain:  $(":input[name=domain]", row).val(),
        name: name,
        key: key,
        typehint: typehint,
        description: $(":input[name=description]", row).val()
      };

      $.ajax({
        url: acre.request.app_url + "/schema/service/add_new_type_submit",
        type: "POST",
        dataType: "json",
        data: data,
        success: function(data) {
          form.data("submitted").push([row, data]);
        },
        error: function(xhr) {
          var msg;
          try {
            msg = JSON.parse(xhr.responseText);
            msg = msg.messages[0].message; // display the first message
          }
          catch(e) {
            msg = xhr.responseText;
          }
          // TODO: make error expandable to see whole error message
          de.add_new_type_row_error(form, row, msg);
        },
        complete: function() {
          // submit next row
          de.add_new_type_submit_rows(form, rows);
        }
      });
    },

    /**
     * validate row
     */
    add_new_type_row_validate: function(row) {
      var name = $(":input[name=name]", row).val();
      var key =  $(":input[name=key]", row).val();
      var description = $(":input[name=description]", row).val();

      if (name === "" && key === "" && description === "") {
        row.trigger("fb.schema.domain.edit.add_new_type.warning", [row, "Empty rows will not be submitted"]);
      }
      else if (name === "" || key === "") {
        row.trigger("fb.schema.domain.edit.add_new_type.error", [row, "Name and Key is required"]);
      }
      // TODO: simple duplicate key check
    },




    /**
     * delete type
     */
    delete_type_begin: function(context, type_id) {
      $.ajax({
        url: acre.request.app_url + "/schema/service/delete_type_begin",
        data: {id: type_id, user: fb.user.id},
        dataType: "json",
        success: function(data) {
          // remove previous edit-form
          var confirm_row = $(data.result.html);
          context.after(confirm_row);
        }
      });

    },





    /**
     * row messages
     */

    add_new_type_row_error: function(form, row, msg) {
      de.add_new_type_row_message(form, row, de.row_message(msg, "error"));
    },

    add_new_type_row_warning: function(form, row, msg) {
      de.add_new_type_row_message(form, row, de.row_message(msg, "warning"));
    },

    add_new_type_row_message: function(form, row, row_msg) {
      // prepend row_msg to row
      row.before(row_msg);
    },

    row_message: function(msg, type) {
      var span = $("<span>").text(msg);
      var row = $('<div class="row-msg">').append(span);
      if (type) {
        row.addClass("row-msg-" + type);
      }
      return row;
    }

  };

})(jQuery, window.freebase);
