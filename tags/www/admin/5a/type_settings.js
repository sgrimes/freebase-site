/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function($, fb) {

  $.extend(fb.nav_ajax, {
    begin: function(nav) {
      var url = nav.href.split("/");
      url.pop();
      url.push("type_settings_begin.ajax");
      $.ajax({
        url: url.join("/"),
        data: {id: fb.c.id},
        dataType: "json",
        success: function(data, status, xhr) {
          var form = $(data.result.html);
          fb.nav_ajax.init(form);
        },
        error: function(xhr) {
          // TODO: handle ajax error
          console.error(xhr);
        }
      });
    },

    init: function(form) {
      $(document.body).append(form.hide());
      form.overlay({
        close: ".modal-buttons .button-cancel",
        closeOnClick: false,
        load: true,
        mask: {
          color: '#000',
          loadSpeed: 200,
          opacity: 0.5
        },
        onLoad: function() {
          fb.nav_ajax.init_form(form);
        }
      });
    },

    init_form: function(form) {

    }
  });


})(jQuery, window.freebase);
