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

var h = acre.require("core/helpers");

// return actual handler from custom handler registration function
var handler = function() {
  return {
    'to_js': function(script) {

      function css_resource_url(url, use_acre_url) {
        if (url.indexOf("static://") === 0) {
          return quoted_css_url(h.freebase_resource_url(url.substring(9)));
        }
        return quoted_css_url(url);
      };

      function quoted_css_url(url) {
        if (url.indexOf('"') !== 0 && url.indexOf("'") !== 0) {
          url = '"'+url+'"';
        }
        return 'url('+url+')';
      };

      function css_preprocessor(str) {
        var buf = [],
            m,
            url_regex = /url\s*\(\s*([^\)]+)\s*\)/gi,
            scheme_regex = /^\w+\:\/\//;

        str.split(/[\n\r\f]/).forEach(function(l) {
          buf.push(l.replace(url_regex, function(m, group) {
            var url = group.replace(/^\s+|\s+$/g, "");

            if (url.indexOf("http://") == 0 || url.indexOf("https://") === 0) {
              return quoted_css_url(url);
            } else if (scheme_regex.test(url)) {
              return css_resource_url(url);
            } else {
              var path = script.scope.acre.resolve(url);
              return quoted_css_url(h.static_url(path));
            }
          }));
        });
        return buf.join("\n");
      };
      
      var res = script.get_content();
      res.body = css_preprocessor(res.body);
      return "var module = ("+JSON.stringify(res)+");";
    },
    'to_module': function(compiled_js, script) {
      return compiled_js.module;
    },
    'to_http_response': function(module, script) {
      module.headers['content-type'] = 'text/css';
      return module;      
    }
  }
};
