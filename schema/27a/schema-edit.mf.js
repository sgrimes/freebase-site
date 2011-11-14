
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
 *
 * Additional Licenses for Third Party components can be found here:
 * http://wiki.freebase.com/wiki/Freebase_Site_License
 *
 */
/*
 
 jQuery Tools @VERSION / Expose - Dim the lights

 NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.

 http://flowplayer.org/tools/toolbox/expose.html

 Since: Mar 2010
 Date: @DATE 
 
 jQuery Tools @VERSION Overlay - Overlay base. Extend it.

 NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.

 http://flowplayer.org/tools/overlay/

 Since: March 2008
 Date: @DATE 
*/
(function(c){function h(){if(c.browser.msie){var g=c(document).height(),k=c(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,g-k<20?k:g]}return[c(document).width(),c(document).height()]}function e(g){if(g)return g.call(c.mask)}c.tools=c.tools||{version:"@VERSION"};var a;a=c.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,
onClose:null}};var b,f,d,i,m;c.mask={load:function(g,k){if(d)return this;if(typeof g=="string")g={color:g};g=g||i;i=g=c.extend(c.extend({},a.conf),g);b=c("#"+g.maskId);if(!b.length){b=c("<div/>").attr("id",g.maskId);c("body").append(b)}var o=h();b.css({position:"absolute",top:0,left:0,width:o[0],height:o[1],display:"none",opacity:g.startOpacity,zIndex:g.zIndex});g.color&&b.css("backgroundColor",g.color);if(e(g.onBeforeLoad)===false)return this;g.closeOnEsc&&c(document).bind("keydown.mask",function(l){l.keyCode==
27&&c.mask.close(l)});g.closeOnClick&&b.bind("click.mask",function(l){c.mask.close(l)});c(window).bind("resize.mask",function(){c.mask.fit()});if(k&&k.length){m=k.eq(0).css("zIndex");c.each(k,function(){var l=c(this);/relative|absolute|fixed/i.test(l.css("position"))||l.css("position","relative")});f=k.css({zIndex:Math.max(g.zIndex+1,m=="auto"?0:m)})}b.css({display:"block"}).fadeTo(g.loadSpeed,g.opacity,function(){c.mask.fit();e(g.onLoad)});d=true;return this},close:function(){if(d){if(e(i.onBeforeClose)===
false)return this;b.fadeOut(i.closeSpeed,function(){e(i.onClose);f&&f.css({zIndex:m})});c(document).unbind("keydown.mask");b.unbind("click.mask");c(window).unbind("resize.mask");d=false}return this},fit:function(){if(d){var g=h();b.css({width:g[0],height:g[1]})}},getMask:function(){return b},isLoaded:function(){return d},getConf:function(){return i},getExposed:function(){return f}};c.fn.mask=function(g){c.mask.load(g);return this};c.fn.expose=function(g){c.mask.load(g,this);return this}})(jQuery);
(function(c){function h(b,f){var d=this,i=b.add(d),m=c(window),g,k,o,l=c.tools.expose&&(f.mask||f.expose),r=Math.random().toString().slice(10);if(l){if(typeof l=="string")l={color:l};l.closeOnClick=l.closeOnEsc=false}var s=f.target||b.attr("rel");k=s?c(s):b;if(!k.length)throw"Could not find Overlay: "+s;b&&b.index(k)==-1&&b.click(function(j){d.load(j);return j.preventDefault()});c.extend(d,{load:function(j){if(d.isOpened())return d;var n=a[f.effect];if(!n)throw'Overlay: cannot find effect : "'+f.effect+
'"';f.oneInstance&&c.each(e,function(){this.close(j)});j=j||c.Event();j.type="onBeforeLoad";i.trigger(j);if(j.isDefaultPrevented())return d;o=true;l&&c(k).expose(l);var p=f.top,t=f.left,u=k.outerWidth({margin:true}),v=k.outerHeight({margin:true});if(typeof p=="string")p=p=="center"?Math.max((m.height()-v)/2,0):parseInt(p,10)/100*m.height();if(t=="center")t=Math.max((m.width()-u)/2,0);n[0].call(d,{top:p,left:t},function(){if(o){j.type="onLoad";i.trigger(j)}});l&&f.closeOnClick&&c.mask.getMask().one("click",
d.close);f.closeOnClick&&c(document).bind("click."+r,function(q){c(q.target).parents(k).length||d.close(q)});f.closeOnEsc&&c(document).bind("keydown."+r,function(q){q.keyCode==27&&d.close(q)});return d},close:function(j){if(!d.isOpened())return d;j=j||c.Event();j.type="onBeforeClose";i.trigger(j);if(!j.isDefaultPrevented()){o=false;a[f.effect][1].call(d,function(){j.type="onClose";i.trigger(j)});c(document).unbind("click."+r).unbind("keydown."+r);l&&c.mask.close();return d}},getOverlay:function(){return k},
getTrigger:function(){return b},getClosers:function(){return g},isOpened:function(){return o},getConf:function(){return f}});c.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(j,n){c.isFunction(f[n])&&c(d).bind(n,f[n]);d[n]=function(p){c(d).bind(n,p);return d}});g=k.find(f.close||".close");if(!g.length&&!f.close){g=c('<a class="close"></a>');k.prepend(g)}g.click(function(j){d.close(j)});f.load&&d.load()}c.tools=c.tools||{version:"@VERSION"};c.tools.overlay={addEffect:function(b,
f,d){a[b]=[f,d]},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:"fast",effect:"default",fixed:!c.browser.msie||c.browser.version>6,left:"center",load:false,mask:null,oneInstance:true,speed:"normal",target:null,top:"10%"}};var e=[],a={};c.tools.overlay.addEffect("default",function(b,f){var d=this.getConf(),i=c(window);if(!d.fixed){b.top+=i.scrollTop();b.left+=i.scrollLeft()}b.position=d.fixed?"fixed":"absolute";this.getOverlay().css(b).fadeIn(d.speed,f)},function(b){this.getOverlay().fadeOut(this.getConf().closeSpeed,
b)});c.fn.overlay=function(b){var f=this.data("overlay");if(f)return f;if(c.isFunction(b))b={onBeforeLoad:b};b=c.extend(true,{},c.tools.overlay.conf,b);this.each(function(){f=new h(c(this),b);e.push(f);c(this).data("overlay",f)});return b.api?f:this}})(jQuery);
(function(c){c.fn.mqlkey=function(e){return this.each(function(){var a=c(this);if(a.is(":text")){var b=a.data("mqlkey");b&&b._destroy();b=new h(this,e);a.data("mqlkey",b)}})};var h=c.mqlkey=function(e,a){this.options=c.extend(true,{},h.defaults,a);this.options.jsonp=h.use_jsonp(this.options.mqlread_url);this.input=c(e);this.original=this.input.val();this.init()};h.prototype={init:function(){var e=this;this.input.bind("keyup.mqlkey",function(a){e.textchange(a)}).bind(c.browser.msie?"paste.mqlkey":
"input.mqlkey",function(a){e.textchange(a)});if(this.options.source){this.source=c(this.options.source);this.source_generate=true;this.input.bind("change.mqlkey",function(){e.source_generate=false});this.source.bind("change.mqlkey",function(){if(e.source_generate){var a=h.from(e.source.val());e.input.val(a).trigger("keyup")}})}},_destroy:function(){this.input.unbind(".mqlkey");this.source&&this.source.unbind("change.mqlkey")},textchange:function(e){clearTimeout(this.textchange_timeout);var a=this;
this.textchange_timeout=setTimeout(function(){a.textchange_delay(e)},200)},textchange_delay:function(){this.input.trigger("textchange");var e=c.trim(this.input.val());return e===this.original&&e!==""?this.valid(e):h.reserved_word(e)?this.invalid(e,e+" is a reserved word."):h.test(e,this.options.schema)?e.length<this.options.minlen?this.invalid(e):this.options.check_key?this.check_key(e):this.valid(e):this.invalid(e)},check_key:function(e){var a=this;if(this.xhr){this.xhr.abort();this.xhr=null}var b=
{query:'{"query": {"id": null, "key": {"namespace": "'+this.options.namespace+'", "value": "'+e+'"}}}'};clearTimeout(this.check_key.timeout);var f={url:this.options.mqlread_url,data:b,success:function(d){if(d.code==="/api/status/ok")return d.result?a.invalid(e,"Key already exists"):a.valid(e)},error:function(d){if(d)return a.invalid(d.responseText())},dataType:a.options.jsonp?"jsonp":"json"};this.check_key.timeout=setTimeout(function(){a.ac_xhr=c.ajax(f)},200)},valid:function(e){this.input.trigger("valid",
e)},invalid:function(e,a){if(!a){a=this.options.minlen>1?"Key must be "+this.options.minlen+" or more alphanumeric characters":"Key must be alphanumeric";a+=", lowercase, begin with a letter and not end with a non-alphanumeric character. Underscores are allowed but not consecutively."}this.input.trigger("invalid",a)}};c.extend(h,{defaults:{minlen:1,check_key:true,namespace:"/",mqlread_url:"http://api.freebase.com/api/service/mqlread",source:null,schema:false},use_jsonp:function(e){if(!e)return false;
var a=window.location.href;a=a.substr(0,a.length-window.location.pathname.length);if(a===e)return false;return true},from:function(e){e=e.toLowerCase();e=e.replace(/[^a-z0-9]/g,"_");e=e.replace(/\_\_+/g,"_");e=e.replace(/[^a-z0-9]+$/,"");e=e.replace(/^[^a-z]+/,"");if(h.reserved_word(e))e="x_"+e;return e},reservedwords:"meta typeguid left right datatype scope attribute relationship property link class future update insert delete replace create destroy default sort limit offset optional pagesize cursor index !index for while as in is if else return count function read write select var connect this self super xml sql mql any all macro estimate-count",
typeonlywords:"guid id object domain name key type keys value timestamp creator permission namespace unique schema reverse",_reserved_word:null,reserved_word:function(e){if(!h._reserved_word){h._reserved_word={};c.each([h.reservedwords,h.typeonlywords],function(a,b){c.each(b.split(" "),function(f,d){h._reserved_word[d]=1})})}return h._reserved_word[e]===1},fast:/^[A-Za-z0-9](?:[_-]?[A-Za-z0-9])*$/,slow:/^(?:[A-Za-z0-9]|\$[A-F0-9]{4})(?:[_-]?[A-Za-z0-9]|[_-]?\$[A-F0-9]{4})*$/,schema:/^[a-z](?:_?[a-z0-9])*$/,
test:function(e,a){if(a)return h.schema.test(e);return h.fast.test(e)||h.slow.test(e)}})})(jQuery);
(function(c,h){c(window).ajaxSend(function(a,b,f){f.type==="POST"&&b.setRequestHeader("x-acre-cache-control","max-age: 3600")});var e=h.schema.edit={init_edit_form:function(a){if(a.mode==="add")c("tbody",a.table).append(a.row);else if(a.mode==="edit")a.trigger_row.before(a.row);else throw"Unknown edit type mode: "+a.mode;a.trigger_row.before(a.submit_row);var b=a.event_prefix||"fb.schema.edit.";a.row.bind(b+"submit",function(){e.submit_edit_form(a)}).bind(b+"cancel",function(){e.cancel_edit_form(a)}).bind(b+
"error",function(f,d,i){e.row_error(d,i);a.row.removeClass("loading")}).bind(b+"success",function(){a.row.removeClass("loading")});c("button.save",a.submit_row).click(function(){a.row.trigger(b+"submit")});c(".button.cancel",a.submit_row).click(function(){a.row.trigger(b+"cancel")});a.row.showRow(function(){typeof a.init_form==="function"&&a.init_form(a)});a.trigger_row.hide();a.submit_row.show();c(window).bind("fb.edit.lang.select",function(f,d){e.toggle_lang(a.row,d)})},cancel_edit_form:function(a){a.row.hideRow(function(){c(this).remove()});
e.clear_row_message(a.row);a.submit_row.remove();a.trigger_row.show();a.trigger.removeClass("editing")},submit_edit_form:function(a){if(!a.row.is(".loading")){document.activeElement&&c(document.activeElement).blur();e.clear_row_message(a.row);typeof a.validate_form==="function"&&a.validate_form(a);if(!e.has_row_message(a.row,"error")){a.row.addClass("loading");typeof a.submit_form==="function"&&a.submit_form(a)}}},ajax_error_handler:function(a,b,f){var d;try{d=JSON.parse(a.responseText);if(d.messages&&
d.messages.length)d=JSON.stringify(d.messages[0])}catch(i){}if(!d)d=a.responseText;if(b){e.row_error(b,d);b.removeClass("loading")}else if(f){e.form_error(f,d);f.removeClass("loading")}},row_error:function(a,b){return e.row_message(a,b,"error")},row_message:function(a,b,f){var d=c('<a class="close-msg" href="#">Close</a>').click(function(i){return h.schema.close_message.apply(this,[i,".row-msg:first"])});b=c("<span>").text(b);d=c('<td colspan="5">').append(d).append(b);d=c('<tr class="row-msg">').append(d);
f&&d.addClass("row-msg-"+f);a.before(d);d.hide().showRow();b=a.data("row-msg");if(!b){b={};a.data("row-msg",b)}if(b[f])b[f].push(d);else b[f]=[d];return d},clear_row_message:function(a){var b=a.data("row-msg");if(b){c.each(b,function(f,d){c.each(d,function(i,m){m.remove()})});a.removeData("row-msg")}},has_row_message:function(a,b){var f=a.data("row-msg");if(b)return f&&f[b]&&f[b].length;return f!=null},init_modal_form:function(a){c(document.body).append(a.form.hide());var b=a.event_prefix||"fb.schema.edit.modal.";
a.form.bind(b+"submit",function(){e.submit_modal_form(a)}).bind(b+"error",function(f,d){e.form_error(a.form,d)}).bind(b+"success",function(){a.form.removeClass("loading")});c(".modal-buttons .button.save",a.form).click(function(){a.form.trigger(b+"submit")});a.form.overlay({close:".modal-buttons .button.cancel",closeOnClick:false,load:true,mask:{color:"#000",loadSpeed:200,opacity:0.5},onLoad:function(){typeof a.init_form==="function"&&a.init_form(a)}});h.schema.init_modal_help(a.form);c(window).bind("fb.edit.lang.select",
function(f,d){e.toggle_lang(a.form,d)})},submit_modal_form:function(a){if(!a.form.is(".loading")){document.activeElement&&c(document.activeElement).blur();e.clear_form_message(a.form);typeof a.validate_form==="function"&&a.validate_form(a);if(!e.has_form_message(a.form,"error")){a.form.addClass("loading");typeof a.submit_form==="function"&&a.submit_form(a)}}},form_error:function(a,b){return e.form_message(a,b,"error")},form_message:function(a,b,f){b=c("<div class='form-msg'>").text(b).hide();c(".form-group",
a).prepend(b);b.slideDown();var d=a.data("form-msg");if(!d){d={};a.data("form-msg",d)}if(d[f])d[f].push(b);else d[f]=[b];return b},clear_form_message:function(a){var b=a.data("form-msg");if(b){c.each(b,function(f,d){c.each(d,function(i,m){m.remove()})});a.removeData("form-msg")}},has_form_message:function(a,b){var f=a.data("form-msg");if(b)return f&&f[b]&&f[b].length;return f!=null},toggle_lang:function(a,b){c("[lang]",a).each(function(){var f=c(this);c(this).attr("lang")===b?f.show().focus().blur():
f.hide()})},init_mqlkey:function(a,b){a.mqlkey(b).bind("valid",function(){c(this).next(".key-status").removeClass("invalid").removeClass("loading").addClass("valid").text("valid").attr("title","Key is available")}).bind("invalid",function(f,d){c(this).next(".key-status").removeClass("valid").removeClass("loading").addClass("invalid").text("invalid").attr("title",d)}).bind("textchange",function(){c(this).next(".key-status").removeClass("invalid").removeClass("valid").addClass("loading")})},validate_mqlkey:function(a,
b){var f=a.form||a.row,d=b.next(".key-status"),i=b.val();if(i===""){f.trigger(a.event_prefix+"error","Key is required");return false}if(i===b.data("mqlkey").original)return true;if(d.is(".invalid")){f.trigger(a.event_prefix+"error",d.attr("title"));return false}else if(d.is(".loading"))return false;return true}}})(jQuery,window.freebase);
