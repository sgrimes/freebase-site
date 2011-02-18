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

  fb.kbs = {

    init: function(context) {
      return new kbs(context);
    }

  };

  function kbs(context) {

    // wipe current .kbs.current
    $(".kbs.current", context).removeClass("current");

    var first_domain = $(".domain-section:first", context);
    var last_domain = $(".domain-section:last", context);
    var first_type = $(".type-section:first", context);
    var last_type = $(".type-section:last", context);
    var first_prop = $(".property-section:first", context);
    var last_prop = $(".property-section:last", context);

    //$(".kbs:first", first_domain).addClass("current");

    var get_current = this.get_current = function() {
      return $(".kbs.current:first", context);
    };

    var viewport;

    if (typeof window.innerWidth != 'undefined') {
      viewport = function() {
        return {
          w: window.innerWidth,
          h: window.innerHeight
        };
      };
    }
    else if (typeof document.documentElement != 'undefined' &&
             typeof document.documentElement.clientWidth != 'undefined' &&
             document.documentElement.clientWidth != 0)
    {
      viewport = function() {
        return {
          w: document.documentElement.clientWidth,
          h: document.documentElement.clientHeight
        };
      };
    }
    else {
      viewport = function() {
        return {
          w: document.getElementsByTagName('body')[0].clientWidth,
          h: document.getElementsByTagName('body')[0].clientHeight
        };
      };
    };

    var scroll_to = function(item) {
      var scrollTop = $(document).scrollTop();
      var scrollBottom = $(document).height();
      var viewHeight = viewport().h;
      var viewBottom = scrollTop + viewHeight;
      var offsetTop = item.offset().top;
      var offsetBottom = offsetTop + item.height();

      if (offsetTop < scrollTop) {
        $(document).scrollTop(offsetTop);
      }
      else if (offsetBottom > viewBottom) {
        $(document).scrollTop(offsetTop);
      }
    };

    var set_next = function(current, next, dont_scroll) {
      if (next.length) {
        current.removeClass("current");
        next.addClass("current");
        if (!dont_scroll) {
          scroll_to(next);
        }
      }
    };

    var next_domain = this.next_domain = function(dont_scroll) {
      var current = get_current();
      var next = _next_domain(current).find(".kbs:first");
      set_next(current, next, dont_scroll);
    };

    var _next_domain = this._next_domain = function(current) {
      var current_domain = current.closest(".domain-section");
      if (!current_domain.length || current_domain[0] === last_domain[0]) {
        return first_domain;
      }
      else {
        return current_domain.next(".domain-section");
      }
    };

    var prev_domain = this.prev_domain = function() {
      var current = get_current();
      var prev = _prev_domain(current).find(".kbs:first");
      set_next(current, prev);
    };

    var _prev_domain = this._prev_domain = function(current) {
      var current_domain = current.closest(".domain-section");
      if (current.closest(".property-section").length ||
          current.closest(".type-section").length) {
        return current_domain;
      }
      if (!current_domain.length || current_domain[0] === first_domain[0]) {
        return last_domain;
      }
      else {
        return current_domain.prev(".domain-section");
      }
    };

    var next_type = this.next_type = function() {
      var current = get_current();
      var next = _next_type(current).find(".kbs:first");
      set_next(current, next);
    };

    var _next_type = this._next_type = function(current) {
      var current_domain = current.closest(".domain-section");
      var current_type = current.closest(".type-section");
      var next;
      if (current_type.length) {
        next = current_type.next(".type-section");
      }
      else {
        next = current_domain.find(".type-section:first");
      }
      if (!(next && next.length)) {
        var next_domain = _next_domain(current_domain);
        while (next_domain.get(0) !== current_domain.get(0)) {
          next = next_domain.find(".type-section:first");
          if (next.length) {
            break;
          }
          next_domain = _next_domain(next_domain);
        }
      }
      return next;
    };

    var prev_type = this.prev_type = function() {
      var current = get_current();
      var prev = _prev_type(current).find(".kbs:first");
      set_next(current, prev);
    };

    var _prev_type = this._prev_type = function(current) {
      var current_domain = current.closest(".domain-section");
      var current_type = current.closest(".type-section");
      var current_prop = current.closest(".property-section");
      if (current_prop.length) {
        return current_type;
      }
      var prev;
      if (current_type.length) {
        prev = current_type.prev(".type-section");
      }
      if (!(prev && prev.length)) {
        var prev_domain = _prev_domain(current_domain);
        while (prev_domain.get(0) !== current_domain.get(0)) {
          prev = prev_domain.find(".type-section:last");
          if (prev.length) {
            break;
          }
          prev_domain = _prev_domain(prev_domain);
        }
      }
      return prev;
    };

    var next_prop = this.next_prop = function() {
      var current = get_current();
      var next = _next_prop(current).find(".kbs:first");
      set_next(current, next);
    };

    var _next_prop = this._next_prop = function(current) {
      var current_domain = current.closest(".domain-section");
      var current_type = current.closest(".type-section");
      var current_prop = current.closest(".property-section");
      var next;
      if (current_prop.length) {
        next = current_prop.next(".property-section");
      }
      else if (current_type.length) {
        next = current_type.find(".property-section:first");
      }
      else {
        next = current_domain.find(".property-section:first");
      }
      if (!(next && next.length)) {
        var next_type = _next_type(current);
        while (next_type.get(0) !== current_type.get(0)) {
          next = next_type.find(".property-section:first");
          if (next.length) {
            break;
          }
          if (current_type.get(0) == null) {
            current_type = next_type;
          }
          next_type = _next_type(next_type);
        }
      }
      return next;
    };

    var prev_prop = this.prev_prop = function() {
      var current = get_current();
      var prev = _prev_prop(current).find(".kbs:first");
      set_next(current, prev);
    };

    var _prev_prop = this._prev_prop = function(current) {
      var current_domain = current.closest(".domain-section");
      var current_type = current.closest(".type-section");
      var current_prop = current.closest(".property-section");
      var prev;
      if (current_prop.length) {
        prev = current_prop.prev(".property-section");
      }
      if (!(prev && prev.length)) {
        if (current_type.length) {
          prev_type = _prev_type(current_type);
        }
        else {
          prev_type = _prev_type(current_domain);
        }
        while(prev_type.get(0) !== current_type.get(0)) {
          prev = prev_type.find(".property-section:last");
          if (prev.length) {
            break;
          }
          if (current_type.get(0) == null) {
            current_type = prev_type;
          }
          prev_type = _prev_type(prev_type);
        }
      }
      return prev;
    };

    $(document)
      .unbind(".kbs")
      .bind("keydown.kbs", function(e) {
        var target = e.target;
        if (target == document.body ||
            target == document ||
            target == window ||
            target == $("html")[0]) {
          var keyCode = e.keyCode;
          console.log("keyCode", keyCode);
          if (keyCode === 68) { // d
            if (e.shiftKey) {
              prev_domain();
            }
            else {
              next_domain();
            }
          }
          else if (keyCode === 84) { // t
            if (e.shiftKey) {
              prev_type();
            }
            else {
              next_type();
            }
          }
          else if (keyCode === 80) { // p
            if (e.shiftKey) {
              prev_prop();
            }
            else {
              next_prop();
            }
          }
          else if (keyCode === 74) { // j
//            next_prop();
          }
          else if (keyCode === 75) { // k
//            prev_prop();
          }
        }
      });
  };

})(jQuery, window.freebase);
