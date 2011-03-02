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
;(function($, fb) {

  /**
   * Required libs
   * date.js
   * isodate.js
   */
  (function() {
     fix_datejs();
  })();

  $.fn.validate_input = function (options) {
    return this.each(function() {
      var $this = $(this);
      if (!$this.is(":text")) {
        return;
      }
      var inst = $this.data("$.validate_input");
      if (inst) {
        inst._destroy();
      }
      inst = new vi(this, options);
      $this.data("$.validate_input", inst);
    });
  };
  var vi = $.validate_input = function(input, options) {
    this.options = $.extend(true, {}, vi.defaults, options);
    if (typeof this.options.validator !== "function") {
      throw ("A validator is required");
    }
    this.input = $(input);
    this.original = this.input.val(); // original value
    this.value = null;                // validated value
    this.init();
    var self = this;
    this.input.bind("remove", function() {
      self._destroy();
    });
    return this;
  };
  vi.prototype = {
    init: function() {
      var self = this;
      this.input
        .bind("keyup.vi", function(e) {
          self.textchange(e);
        })
        .bind($.browser.msie ? "paste.vi" : "input.vi", function(e) {
          self.textchange(e);
        });
    },
    _destroy: function() {
      this.input.unbind(".vi");
    },
    valid: function(data) {
      this.input.trigger("valid", data);
    },
    invalid: function(val, msg) {
      this.value = null;
      this.input.trigger("invalid", msg);
    },
    textchange: function(e) {
      clearTimeout(this.textchange_timeout);
      var self = this;
      this.textchange_timeout = setTimeout(function() {
        self.textchange_delay();
      }, 200);
    },
    textchange_delay: function() {
      var val = $.trim(this.input.val());
      var o = this.options;
      if (val === "") {
        if (o.allow_empty === true) {
          return this.valid({text:"", value:""});
        }
        else if (o.allow_empty === false) {
          return this.invalid("", "");
        }
      }
      try {
        var data = o.validator(val);
        return this.valid(data);
      }
      catch(ex) {
        return this.invalid(val, "" + ex);
      }
    }
  };
  $.extend(vi, {
    defaults: {
      allow_empty: null,
      validator: function(v) {
        // default validator just echo value
        return {text:v, value:v};
      }
    },

    rdatetime_quotes: /[\'\"]/g,
    rdatetime_daynames: new RegExp(Date.CultureInfo.dayNames.join("|"), "gi"),

    datetime_parts: (function() {
      var seen = {};
      var parts = ["\\d+"];
      var digit = /^\d+$/;

      $.each([Date.CultureInfo.monthNames, Date.CultureInfo.abbreviatedMonthNames], function(i, ms) {
        $.each(ms, function(j, m) {
          if (digit.test(m)) {
            return false;  // don't need to continue
          }
          m = m.toLowerCase();
          if (!seen[m]) {
            if (i === 1) {
              // for month abbreviations, we don't substring match
              m = m + "(?!\\w)";
            }
            parts.push(m);
            seen[m] = 1;
          }
        });
      });
      var rparts = new RegExp(parts.join("|"), "gi");
      return function(val) {
        var parts = [];
        val = val.replace(vi.rdatetime_daynames, function(m) {
          return "";
        });
        val.replace(rparts, function(m) {
          parts.push(m);
        });
        return parts;
      };
    })(),

    datetime_formats: (function() {
      var f = [
        "M-yyyy", "y", "yyyy-MM",
        "MM-yyyy", "y", "yyyy-MM",
        "yyyy-M", "y", "yyyy-MM",
        "yyyy-MM", "y", "yyyy-MM",

        "yyyy-M-d", "D", "yyyy-MM-dd",
        "yyyy-M-dd", "D", "yyyy-MM-dd",
        "yyyy-MM-d", "D", "yyyy-MM-dd",
        "yyyy-MM-dd", "D", "yyyy-MM-dd"
      ];
      if (Date.CultureInfo.dateElementOrder === "mdy") {
        f = f.concat([
          "M-d-yyyy", "D", "yyyy-MM-dd",
          "MM-dd-yyy", "D", "yyyy-MM-dd",
          "MM-d-yyyy", "D", "yyyy-MM-dd",
          "M-dd-yyyy", "D", "yyyy-MM-dd"
        ]);
      }
      else if (Date.CultureInfo.dateElementOrder === "dmy") {
        f = f.concat([
          "d-MM-yyyy", "D", "yyyy-MM-dd",
          "dd-MM-yyyy", "D", "yyyy-MM-dd",
          "d-M-yyyy", "D", "yyyy-MM-dd",
          "dd-M-yyyy", "D", "yyyy-MM-dd"
        ]);
      }
      var digit = /^\d+$/;
      if (!digit.test(Date.CultureInfo.abbreviatedMonthNames[0])) {
        f = f.concat([
          "MMM-yyyy", "y", "yyyy-MM",
          "yyyy-MMM", "y", "yyyy-MM",
          "d-MMM-yyyy", "D", "yyyy-MM-dd",
          "dd-MMM-yyyy", "D", "yyyy-MM-dd",
          "MMM-d-yyyy", "D", "yyyy-MM-dd",
          "MMM-dd-yyyy", "D", "yyyy-MM-dd",
          "yyyy-MMM-d", "D", "yyyy-MM-dd",
          "yyyy-MMM-dd", "D", "yyyy-MM-dd",
          "yyyy-d-MMM", "D", "yyyy-MM-dd",
          "yyyy-dd-MMM", "D", "yyyy-MM-dd"
        ]);
      }
      if (!digit.test(Date.CultureInfo.monthNames[0])) {
        f = f.concat([
          "MMMM-yyyy", "y", "yyyy-MM",
          "yyyy-MMMM", "y", "yyyy-MM",
          "d-MMMM-yyyy", "D", "yyyy-MM-dd",
          "dd-MMMM-yyyy", "D", "yyyy-MM-dd",
          "MMMM-d-yyyy", "D", "yyyy-MM-dd",
          "MMMM-dd-yyyy", "D", "yyyy-MM-dd",
          "yyyy-MMMM-d", "D", "yyyy-MM-dd",
          "yyyy-MMMM-dd", "D", "yyyy-MM-dd",
          "yyyy-d-MMMM", "D", "yyyy-MM-dd",
          "yyyy-dd-MMMM", "D", "yyyy-MM-dd"
        ]);
      }
      return f;
    })(),

    datetime: function(val) {
      var date;

      // just get the date parts
      var datepart = vi.datetime_parts(val).join("-");

      for (var i=0,l=vi.datetime_formats.length; i<l; i+=3) {
        var input_format = vi.datetime_formats[i];
        var text_format = vi.datetime_formats[i+1];
        var value_format = vi.datetime_formats[i+2];
        try {
          date = Date.parseExact(datepart, input_format);
        }
        catch (ex) {
          // ignore
        }
        if (date) {
          return {
            text: date.toString(text_format),
            value: date.toString(value_format)
          };
        }
      };

      // try isodate
      try {
        date = fb.date_from_iso(val);
      }
      catch(ex) {
        // ignore
      };
      if (date) {
        console.log("iso", val, date);
        return {
          text: val,
          value: val
        };
      }

      // try default Date.parse
      try {
        date = Date.parse(val);
        if (date) {
          return {
            text: date.toString("D"),
            value: date.toString("yyyy-MM-dd")
          };
        }
      }
      catch (ex) {
        // ignore
      }

      throw "Unrecoginzed datetime: " + val;
    }

  });

  function fix_datejs() {
    var locale = Date.CultureInfo.name;
    switch (locale) {
      case "es-ES":
      case "es-MX":
      case "pt-BR":
      case "pt-PT":
        // TODO: overwrite formatPatterns that use "de" - can't use 'd' in format
        break;
    };
  };

})(jQuery, window.freebase);
