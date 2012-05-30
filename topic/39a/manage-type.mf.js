
/*
 * Copyright 2012, Google Inc.
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
(function(c){function f(){if(c.browser.msie){var i=c(document).height(),l=c(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,i-l<20?l:i]}return[c(document).width(),c(document).height()]}function e(i){if(i)return i.call(c.mask)}c.tools=c.tools||{version:"@VERSION"};var b;b=c.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,
onClose:null}};var a,d,g,h,j;c.mask={load:function(i,l){if(g)return this;if(typeof i=="string")i={color:i};i=i||h;h=i=c.extend(c.extend({},b.conf),i);a=c("#"+i.maskId);if(!a.length){a=c("<div/>").attr("id",i.maskId);c("body").append(a)}var n=f();a.css({position:"absolute",top:0,left:0,width:n[0],height:n[1],display:"none",opacity:i.startOpacity,zIndex:i.zIndex});i.color&&a.css("backgroundColor",i.color);if(e(i.onBeforeLoad)===false)return this;i.closeOnEsc&&c(document).bind("keydown.mask",function(m){m.keyCode==
27&&c.mask.close(m)});i.closeOnClick&&a.bind("click.mask",function(m){c.mask.close(m)});c(window).bind("resize.mask",function(){c.mask.fit()});if(l&&l.length){j=l.eq(0).css("zIndex");c.each(l,function(){var m=c(this);/relative|absolute|fixed/i.test(m.css("position"))||m.css("position","relative")});d=l.css({zIndex:Math.max(i.zIndex+1,j=="auto"?0:j)})}a.css({display:"block"}).fadeTo(i.loadSpeed,i.opacity,function(){c.mask.fit();e(i.onLoad)});g=true;return this},close:function(){if(g){if(e(h.onBeforeClose)===
false)return this;a.fadeOut(h.closeSpeed,function(){e(h.onClose);d&&d.css({zIndex:j})});c(document).unbind("keydown.mask");a.unbind("click.mask");c(window).unbind("resize.mask");g=false}return this},fit:function(){if(g){var i=f();a.css({width:i[0],height:i[1]})}},getMask:function(){return a},isLoaded:function(){return g},getConf:function(){return h},getExposed:function(){return d}};c.fn.mask=function(i){c.mask.load(i);return this};c.fn.expose=function(i){c.mask.load(i,this);return this}})(jQuery);
(function(c){function f(a,d){var g=this,h=a.add(g),j=c(window),i,l,n,m=c.tools.expose&&(d.mask||d.expose),q=Math.random().toString().slice(10);if(m){if(typeof m=="string")m={color:m};m.closeOnClick=m.closeOnEsc=false}var r=d.target||a.attr("rel");l=r?c(r):a;if(!l.length)throw"Could not find Overlay: "+r;a&&a.index(l)==-1&&a.click(function(k){g.load(k);return k.preventDefault()});c.extend(g,{load:function(k){if(g.isOpened())return g;var p=b[d.effect];if(!p)throw'Overlay: cannot find effect : "'+d.effect+
'"';d.oneInstance&&c.each(e,function(){this.close(k)});k=k||c.Event();k.type="onBeforeLoad";h.trigger(k);if(k.isDefaultPrevented())return g;n=true;m&&c(l).expose(m);var o=d.top,t=d.left,u=l.outerWidth({margin:true}),v=l.outerHeight({margin:true});if(typeof o=="string")o=o=="center"?Math.max((j.height()-v)/2,0):parseInt(o,10)/100*j.height();if(t=="center")t=Math.max((j.width()-u)/2,0);p[0].call(g,{top:o,left:t},function(){if(n){k.type="onLoad";h.trigger(k)}});m&&d.closeOnClick&&c.mask.getMask().one("click",
g.close);d.closeOnClick&&c(document).bind("click."+q,function(s){c(s.target).parents(l).length||g.close(s)});d.closeOnEsc&&c(document).bind("keydown."+q,function(s){s.keyCode==27&&g.close(s)});return g},close:function(k){if(!g.isOpened())return g;k=k||c.Event();k.type="onBeforeClose";h.trigger(k);if(!k.isDefaultPrevented()){n=false;b[d.effect][1].call(g,function(){k.type="onClose";h.trigger(k)});c(document).unbind("click."+q).unbind("keydown."+q);m&&c.mask.close();return g}},getOverlay:function(){return l},
getTrigger:function(){return a},getClosers:function(){return i},isOpened:function(){return n},getConf:function(){return d}});c.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(k,p){c.isFunction(d[p])&&c(g).bind(p,d[p]);g[p]=function(o){c(g).bind(p,o);return g}});i=l.find(d.close||".close");if(!i.length&&!d.close){i=c('<a class="close"></a>');l.prepend(i)}i.click(function(k){g.close(k)});d.load&&g.load()}c.tools=c.tools||{version:"@VERSION"};c.tools.overlay={addEffect:function(a,
d,g){b[a]=[d,g]},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:"fast",effect:"default",fixed:!c.browser.msie||c.browser.version>6,left:"center",load:false,mask:null,oneInstance:true,speed:"normal",target:null,top:"10%"}};var e=[],b={};c.tools.overlay.addEffect("default",function(a,d){var g=this.getConf(),h=c(window);if(!g.fixed){a.top+=h.scrollTop();a.left+=h.scrollLeft()}a.position=g.fixed?"fixed":"absolute";this.getOverlay().css(a).fadeIn(g.speed,d)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,
a)});c.fn.overlay=function(a){var d=this.data("overlay");if(d)return d;if(c.isFunction(a))a={onBeforeLoad:a};a=c.extend(true,{},c.tools.overlay.conf,a);this.each(function(){d=new f(c(this),a);e.push(d);c(this).data("overlay",d)});return a.api?d:this}})(jQuery);
(function(c){c.fn.mqlkey=function(e){return this.each(function(){var b=c(this);if(b.is(":text")){var a=b.data("mqlkey");a&&a._destroy();a=new f(this,e);b.data("mqlkey",a)}})};var f=c.mqlkey=function(e,b){this.options=c.extend(true,{},f.defaults,b);this.input=c(e);this.original=this.input.val();this.init()};f.prototype={init:function(){var e=this;this.input.bind("keyup.mqlkey",function(b){e.textchange(b)}).bind(c.browser.msie?"paste.mqlkey":"input.mqlkey",function(b){e.textchange(b)});if(this.options.source){this.source=
c(this.options.source);this.source_generate=true;this.input.bind("change.mqlkey",function(){e.source_generate=false});this.source.bind("change.mqlkey",function(){if(e.source_generate){var b=f.from(e.source.val());e.input.val(b).trigger("keyup")}})}},_destroy:function(){this.input.unbind(".mqlkey");this.source&&this.source.unbind("change.mqlkey")},textchange:function(e){clearTimeout(this.textchange_timeout);var b=this;this.textchange_timeout=setTimeout(function(){b.textchange_delay(e)},200)},textchange_delay:function(){this.input.trigger("textchange");
var e=c.trim(this.input.val());return e===this.original&&e!==""?this.valid(e):f.reserved_word(e)?this.invalid(e,e+" is a reserved word."):f.test(e,this.options.schema)?e.length<this.options.minlen?this.invalid(e):this.options.check_key?this.check_key(e):this.valid(e):this.invalid(e)},check_key:function(e){var b=this;if(this.xhr){this.xhr.abort();this.xhr=null}var a={id:null,key:{namespace:this.options.namespace,value:e}};clearTimeout(this.check_key.timeout);this.check_key.timeout=setTimeout(function(){b.xhr=
b.options.mqlread(a,function(d){return d?b.invalid(e,"Key already exists"):b.valid(e)},function(d){return d?b.invalid(d.responseText()):b.invalid("mqlread error!")})},200)},valid:function(e){this.input.trigger("valid",e)},invalid:function(e,b){if(!b){b=this.options.minlen>1?"Key must be "+this.options.minlen+" or more alphanumeric characters":"Key must be alphanumeric";b+=", lowercase, begin with a letter and not end with a non-alphanumeric character. Underscores are allowed but not consecutively."}this.input.trigger("invalid",
b)}};c.extend(f,{defaults:{minlen:1,check_key:true,namespace:"/",mqlread:function(e,b,a){return f.mqlread(null,e,b,a)},source:null,schema:false},mqlread:function(e,b,a,d){e={url:e||"http://api.freebase.com/api/service/mqlread",data:{query:JSON.stringify({query:b})},dataType:"jsonp",success:function(g){return a(g.result)},error:d};return c.ajax(e)},from:function(e){e=e.toLowerCase();e=e.replace(/[^a-z0-9]/g,"_");e=e.replace(/\_\_+/g,"_");e=e.replace(/[^a-z0-9]+$/,"");e=e.replace(/^[^a-z]+/,"");if(f.reserved_word(e))e=
"x_"+e;return e},reservedwords:"meta typeguid left right datatype scope attribute relationship property link class future update insert delete replace create destroy default sort limit offset optional pagesize cursor index !index for while as in is if else return count function read write select var connect this self super xml sql mql any all macro estimate-count",typeonlywords:"guid id object domain name key type keys value timestamp creator permission namespace unique schema reverse",_reserved_word:null,
reserved_word:function(e){if(!f._reserved_word){f._reserved_word={};c.each([f.reservedwords,f.typeonlywords],function(b,a){c.each(a.split(" "),function(d,g){f._reserved_word[g]=1})})}return f._reserved_word[e]===1},fast:/^[A-Za-z0-9](?:[_-]?[A-Za-z0-9])*$/,slow:/^(?:[A-Za-z0-9]|\$[A-F0-9]{4})(?:[_-]?[A-Za-z0-9]|[_-]?\$[A-F0-9]{4})*$/,schema:/^[a-z](?:_?[a-z0-9])*$/,test:function(e,b){if(b)return f.schema.test(e);return f.fast.test(e)||f.slow.test(e)}})})(jQuery);
(function(c,f){f.require("dojo.date.stamp");f.require("dojo.date.locale");f.require("dojo.number");c.fn.validate_input=function(b){return this.each(function(){var a=c(this);if(a.is(":text")){var d=a.data("$.validate_input");d&&d._destroy();d=new e(this,b);a.data("$.validate_input",d)}})};var e=c.validate_input=function(b,a){var d=this.options=c.extend(true,{},e.defaults,a);if(typeof d.validator!=="function")throw"A validator is required";if(!d.lang)d.lang="/lang/en";d.lang=d.lang==="/lang/en"?["lang/en"]:
[d.lang,"/lang/en"];d.locales=[];c.each(d.lang,function(h,j){d.locales[h]=f.i18n.normalizeLocale(j.split("/").pop())});this.input=c(b);this.init();var g=this;this.input.bind("remove",function(){g._destroy()});return this};e.prototype={init:function(){var b=this;this.input.bind("keyup.validate_input",function(a){b.textchange(a)}).bind(c.browser.msie?"paste.validate_input":"input.validate_input",function(a){b.textchange(a)}).bind("keypress.validate_input",function(a){a.keyCode===13&&b.validate(true)}).bind("blur.validate_input",
function(){b.validate(true)})},_destroy:function(){this.input.unbind(".validate_input")},valid:function(b){this.input.trigger("valid",b)},invalid:function(b,a){this.input.trigger("invalid",a)},empty:function(){this.input.trigger("empty")},textchange:function(){clearTimeout(this.textchange_timeout);var b=this;this.textchange_timeout=setTimeout(function(){b.validate()},200)},validate:function(b){b&&clearTimeout(this.textchange_timeout);b=this.options;var a=c.trim(this.input.val());if(a==="")return this.empty();
try{return this.valid(b.validator(a,b))}catch(d){return this.invalid(a,""+d)}}};c.extend(e,{defaults:{validator:function(b){return{text:b,value:b}}},log:function(){},invalid:function(b,a,d,g){throw new Error("Invalid "+d+(g?": "+g:""));},text:function(b,a){if(b.lengh>4096)return this.invalid(b,a,type,"Text too long");return{text:b,value:b}},topic:function(){return e.defaults.validator},enumerated:function(){return e.defaults.validator},"boolean":function(){return e.defaults.validator},uri:function(b,
a){var d=e.uri.regex;if(!d)d=e.uri.regex=/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
if(d.test(b))return{text:b,value:b};return e.invalid(b,a,"uri")},"int":function(b,a){return e.number.parse(b,a,false)},"float":function(b,a){return e.number.parse(b,a,true)},number:function(b,a,d){return e.number.parse(b,a,d)},datetime:function(b,a){return e.datetime.parse(b,a)},mqlkey:function(b,a){var d=e.mqlkey.regex;if(!d)d=e.mqlkey.regex=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;if(d.test(b))return{text:b,value:b};return e.invalid(b,a,"mqlkey")}});c.extend(e.number,{parse:function(b,a,d){var g=a&&a.locales||
["en"],h,j;h=0;for(j=g.length;h<j;h++){var i=g[h];a=f.number.parse(b,{locale:i});if(!isNaN(a)){b={};if(d){b.value=a;b.text=f.number.format(a,{locale:i})}else{b.value=f.number.round(a,0);b.text=f.number.format(b.value,{locale:i})}return b}}throw e.invalid("number",b);}});c.extend(e.datetime,{formats:["yyyy",["dateFormatItem-y"],"yyyy-MM",["dateFormatItem-yM","dateFormatItem-yMMM"],"yyyy-MM-dd",["dateFormat-short","dateFormat-medium","dateFormat-long"]],parse:function(b,a){if(!f.date.stamp._isoRegExp)f.date.stamp._isoRegExp=
/^(?:(-?\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;var d=f.date.stamp.fromISOString(b);if(d)return{text:b,value:b,date:d};var g=a&&a.locales||["en"],h,j,i,l,n,m;h=0;for(j=g.length;h<j;h++){var q=g[h],r=f.date.locale._getGregorianBundle(q);i=0;for(l=e.datetime.formats.length;i<l;i+=2){var k=e.datetime.formats[i],p=e.datetime.formats[i+1];n=0;for(m=p.length;n<m;n++){var o=r[p[n]];if(o){o=i18n.normalize_pattern(o);try{d=f.date.locale.parse(b,
{datePattern:o,selector:"date",locale:q});return{text:b,value:f.date.locale.format(d,{datePattern:k,selector:"date"}),date:d}}catch(t){}}}}}throw e.invalid("datetime",b);}})})(jQuery,dojo);
(function(c){c.fn.data_input=function(f){return this.each(function(){var e=c(this),b=e.data("$.data_input");b&&b._destroy();b=new c.data_input(this,f);e.data("$.data_input",b)})};c.data_input=function(f,e){this.options=c.extend(true,{},e);this.container=c(f);this.metadata=this.container.metadata();this.input=c(":input",this.container);this.init();var b=this;this.input.bind("remove",function(){b._destroy()})};c.data_input.prototype={init:function(){var f=this,e=this.container,b=this.input,a=this.options;
b.bind("focusin.data_input",function(){f.container.addClass("focus")}).bind("focusout.data_input",function(){f.container.removeClass("focus")}).bind("valid.data_input",function(g,h){function j(){f.container.data("data",i);f.container.removeClass("error").addClass("valid");f.container.trigger("valid")}var i={name:f.input.attr("name")};if(h.id)i.id=h.id;else if(h.create_new){i.create_new=h.create_new;i.lang=f.metadata.lang||a.lang}else{i.value=h.value;if(f.metadata.type==="/type/text")i.lang=f.metadata.lang||
a.lang;else if(f.metadata.type==="/type/key")i.namespace=h.namespace}h.id&&f.metadata.type&&f.options.incompatible_types?f.options.incompatible_types.check(h.id,f.metadata.type,{compatible:j,incompatible:f.options.incompatible_types.inline_suggest_incompatible_callback(f.input,{onConfirm:j})}):j()}).bind("invalid.data_input",function(){f.container.removeData("data");f.container.removeClass("valid").addClass("error");f.container.trigger("invalid")}).bind("empty.data_input",function(){var g={name:f.input.attr("name")};
if(f.metadata&&f.metadata.lang)g.lang=f.metadata.lang;f.container.data("data",g);f.container.removeClass("valid").removeClass("error");f.container.trigger("empty")}).bind("keypress.data_input",function(g){g.keyCode===13&&!g.isDefaultPrevented()&&f.container.trigger("submit")}).bind("keyup.data_input",function(g){g.keyCode===27&&f.container.trigger("cancel")});if(e.is(".topic")){e=f.metadata.type;var d=null;if(a.suggest_impl)d=a.suggest_impl.instance(e,true,f.metadata&&f.metadata.lang||a.lang);b.validate_topic(d).bind("valid.data_input",
function(g,h){f.fb_select(h)}).bind("invalid.data_input",function(){f.fb_textchange()});if(this.metadata&&this.metadata.id){b.data("data.suggest",this.metadata);this.validate()}}else if(e.is(".text"))b.validate_input({validator:c.validate_input.text});else if(e.is(".datetime"))b.validate_input({validator:c.validate_input.datetime,lang:a.lang});else if(e.is(".enumerated")){b.validate_enumerated().bind("valid.data_input",function(g,h){f.fb_select(h)}).bind("invalid.data_input",function(){f.fb_textchange()});
this.metadata&&this.metadata.id&&this.validate()}else if(e.is(".int"))b.validate_input({validator:c.validate_input["int"],lang:a.lang});else if(e.is(".float"))b.validate_input({validator:c.validate_input["float"],lang:a.lang});else if(e.is(".uri"))b.validate_input({validator:c.validate_input.uri});else if(e.is(".boolean"))b.validate_boolean();else if(e.is(".enumeration"))b.validate_input({validator:c.validate_input.mqlkey});else if(e.is(".key"))b.validate_key(a,this.metadata);else if(e.is(".rawstring"))b.validate_input({validator:c.validate_input.text});
else throw new Error("Invalid data-input: "+e.attr("class"));},_destroy:function(){this.input.unbind(".data_input")},validate:function(){var f=this.input;c.each(["$.validate_topic","$.validate_input","$.validate_enumerated","$.validate_boolean","$.validate_key"],function(e,b){var a=f.data(b);if(a){a.validate(true);return false}})},reset:function(){this.container.removeData("data");if(this.input.is(":text"))this.input.val("");else if(this.input.is("select"))this.input[0].selectedIndex=0;else this.input.is(":radio")&&
this.input.each(function(){this.checked=false})},fb_textchange:function(){},fb_select:function(){},ajax_beforeSend:function(f){if(!this.xhr_queue)this.xhr_queue=[];this.xhr_queue.push(f);this.container.trigger("loading")},ajax_complete:function(f){if(!this.xhr_queue)this.xhr_queue=[];for(var e=0,b=this.xhr_queue.length;e<b;e++)if(f===this.xhr_queue[e]){this.xhr_queue.splice(e,1);break}this.xhr_queue.length===0&&this.container.trigger("loading_complete")}};c.fn.validate_topic=function(f){return this.each(function(){var e=
c(this);if(e.is(":text")){var b=e.data("$.validate_topic");b&&b._destroy();b=new c.validate_topic(this,f);e.data("$.validate_topic",b)}})};c.validate_topic=function(f,e){this.options=c.extend(true,{},e);this.input=c(f);this.init()};c.validate_topic.prototype={init:function(){var f=this;this.input.suggest(this.options).bind("fb-textchange.validate_topic",function(){f.input.val()===""?f.empty():f.invalid()}).bind("fb-select.validate_topic",function(e,b){f.input.val(b.name!=null?b.name:b.id);f.valid(b)}).bind("fb-select-new.validate_topic",
function(e,b){f.valid(b)})},invalid:function(){this.input.trigger("invalid")},valid:function(f){if(typeof f==="string")f={create_new:f};this.input.trigger("valid",f)},empty:function(){this.input.trigger("empty")},_destroy:function(){this.input.unbind(".validate_topic")},validate:function(){if(this.input.val()==="")this.empty();else{var f=this.input.data("data.suggest");f?this.valid(f):this.invalid()}}};c.fn.validate_enumerated=function(f){return this.each(function(){var e=c(this);if(e.is("select")){var b=
e.data("$.validate_enumerated");b&&b._destroy();b=new c.validate_enumerated(this,f);e.data("$.validate_enumerated",b)}})};c.validate_enumerated=function(f,e){this.options=c.extend(true,{},e);this.input=c(f);this.init()};c.validate_enumerated.prototype={init:function(){var f=this;this.input.bind("change.validate_enumerated, keypress.validate_enumerated",function(){this.selectedIndex===0?f.empty():f.valid({text:c(":selected",this).text(),id:this.value})})},invalid:function(){this.input.trigger("invalid")},
valid:function(f){this.input.trigger("valid",f);this.input.trigger("fb-select",f)},empty:function(){this.input.trigger("empty")},_destroy:function(){this.input.unbind(".validate_enumerated")},validate:function(){var f=this.input[0];f.selectedIndex>0?this.valid({text:c(":selected",this.input).text(),id:f.value}):this.empty()}};c.fn.validate_boolean=function(f){var e,b;this.each(function(){var d=c(this);if(d.is(":radio"))if(d.val().toLowerCase()==="true")e=d;else if(d.val().toLowerCase()==="false")b=
d});if(e&&b){var a=e.data("$.validate_boolean");a&&a._destroy();a=new c.validate_boolean(e,b,f);e.data("$.validate_boolean",a)}else throw"$.fn.validate_boolean requires two radios: true and false";return this};c.validate_boolean=function(f,e,b){this.options=c.extend(true,{},b);this.tradio=f;this.fradio=e;this.input=this.tradio;this.init()};c.validate_boolean.prototype={init:function(){var f=this;this.tradio.bind("change.validate_boolean",function(){f.validate()})},_destroy:function(){this.input.unbind(".validate_boolean")},
valid:function(f){this.input.trigger("valid",f)},empty:function(){this.input.trigger("empty")},validate:function(){if(this.tradio.is(":checked"))this.valid({text:this.tradio.text(),value:true});else this.fradio.is(":checked")?this.valid({text:this.fradio.text(),value:false}):this.empty()}};c.fn.validate_key=function(f,e){var b,a;this.each(function(){var g=c(this);if(g.is(":text"))if(g.is(".key-namespace"))b=g;else if(g.is(".key-value"))a=g});if(b&&a){var d=a.data("$.validate_key");d&&d._destroy();
d=new c.validate_key(b,a,f);b.data("$.validate_key",d);if(e&&e.namespace&&e.value){b.data("data.suggest",{id:e.namespace});a.val(e.value)}}else throw"$.fn.validate_key requires two inputs: namespace and value";return this};c.validate_key=function(f,e,b){this.options=c.extend(true,{},b);this.key_namespace_input=f;this.key_value_input=e;this.input=this.key_namespace_input;this.init()};c.validate_key.prototype={init:function(){var f=this,e=null;if(this.options.suggest_impl)e=this.key_value_input.attr("name")===
"/type/namespace/keys"?this.options.suggest_impl.all("without:fus"):this.options.suggest_impl.instance("/type/namespace");this.key_namespace_input.suggest(e).bind("fb-textchange.validate_key",function(){f.validate()}).bind("fb-select.validate_key",function(b,a){f.key_namespace_input.val(a.name||a.id);f.validate()});this.key_value_input.validate_input({validator:c.validate_input.mqlkey}).bind("valid",function(b){b.stopPropagation();f.validate()}).bind("invalid",function(b){b.stopPropagation();f.validate()}).bind("empty",
function(b){b.stopPropagation();f.validate()})},_destroy:function(){this.key_namespace_input.unbind(".validate_key");this.key_value_input.unbind()},invalid:function(){this.input.trigger("invalid")},valid:function(f){this.input.trigger("valid",f)},empty:function(){this.input.trigger("empty")},validate:function(){if(this.is_valid_key_namespace()&&this.is_valid_key_value())this.valid({namespace:this.key_namespace_input.data("data.suggest").id,value:this.key_value_input.val(),text:this.key_value_input.val()});
else this.key_namespace_input.val()===""&&this.key_value_input.val()===""?this.empty():this.invalid()},is_valid_key_namespace:function(){return this.key_namespace_input.data("data.suggest")!=null},is_valid_key_value:function(){try{c.validate_input.mqlkey(this.key_value_input.val());return true}catch(f){return false}}}})(jQuery);
(function(c,f,e){var b=window.formlib={init:function(a){var d=a.event_prefix||"form.";a.form.bind(d+"submit",function(){b.submit(a)}).bind(d+"cancel",function(){b.cancel(a)}).bind(d+"error",function(g,h){b.error(a,h);a.form.removeClass("loading")}).bind(d+"success",function(){a.form.removeClass("loading")}).bind(d+"valid",function(){b.enable_submit(a)}).bind(d+"invalid",function(){b.disable_submit(a)});b.init_submit_cancel(a);a.init(a)},submit:function(a){if(!a.form.is(".loading"))if(b.is_submit_enabled(a)){document.activeElement&&
c(document.activeElement).blur();b.clear_message(a);if(a.validate(a)){a.form.addClass("loading");a.submit(a,b.default_submit_ajax_options(a))}}},cancel:function(){},init_inline_add_form:function(a){var d=a.event_prefix||"form.inline_add_form.";a.edit_row.bind(d+"submit",function(){b.submit_inline_add_form(a)}).bind(d+"cancel",function(){b.cancel_inline_add_form(a)}).bind(d+"error",function(g,h){b.error(a,h);a.edit_row.removeClass("loading")}).bind(d+"success",function(){a.edit_row.removeClass("loading")}).bind(d+
"valid",function(){b.enable_submit(a)}).bind(d+"invalid",function(){b.disable_submit(a)});b.init_submit_cancel(a);a.trigger&&a.trigger.parents(".trigger-row:first").hide();a.body.append(a.head_row).append(a.edit_row).append(a.submit_row);a.init(a)},submit_inline_add_form:function(a){if(!a.edit_row.is(".loading"))if(b.is_submit_enabled(a)){document.activeElement&&c(document.activeElement).blur();b.clear_message(a);if(a.validate(a)){a.edit_row.addClass("loading");a.submit(a,b.default_submit_ajax_options(a))}}},
success_inline_add_form:function(a,d){a.head_row.before(d);f.ize(d);a.reset(a);a.edit_row.trigger(a.event_prefix+"success")},cancel_inline_add_form:function(a){a.head_row.remove();a.edit_row.remove();a.submit_row.remove();a.trigger&&a.trigger.parents(".trigger-row:first").show()},init_inline_edit_form:function(a){var d=a.event_prefix||"form.inline_edit_form.";a.edit_row.bind(d+"submit",function(){b.submit_inline_edit_form(a)}).bind(d+"cancel",function(){b.cancel_inline_edit_form(a)}).bind(d+"error",
function(g,h){b.error(a,h);a.edit_row.removeClass("loading")}).bind(d+"success",function(){a.edit_row.removeClass("loading")}).bind(d+"valid",function(){b.enable_submit(a)}).bind(d+"invalid",function(){b.disable_submit(a)});b.init_submit_cancel(a);a.row.hide();a.row.before(a.head_row).before(a.edit_row).before(a.submit_row);a.init(a)},submit_inline_edit_form:function(a){if(!a.edit_row.is(".loading"))if(b.is_submit_enabled(a)){document.activeElement&&c(document.activeElement).blur();b.clear_message(a);
if(a.validate(a)){a.edit_row.addClass("loading");a.submit(a,b.default_submit_ajax_options(a))}}},success_inline_edit_form:function(a,d){a.row.replaceWith(d);a.row=d;f.ize(d);a.edit_row.trigger(a.event_prefix+"cancel")},cancel_inline_edit_form:function(a){a.head_row.remove();a.edit_row.remove();a.submit_row.remove();a.row.show()},success_inline_delete:function(a,d,g){a.hide().addClass("old-row");a.after(d);d.append(a);if(g){a=c('<a href="#">Undo</a>');c(".msg-default",d).next().append(a);a.click(function(){g();
return false})}},success_inline_delete_undo:function(a){var d=c(".old-row",a);a.before(d);d.show().removeClass("old-row");a.remove()},init_modal_form:function(a){c(document.body).append(a.form.hide());var d=a.event_prefix||"form.modal_form.";a.form.bind(d+"submit",function(){b.submit_modal_form(a)}).bind(d+"cancel",function(){b.cancel_modal_form(a)}).bind(d+"error",function(g,h){b.error(a,h);a.form.removeClass("loading")}).bind(d+"success",function(){a.form.removeClass("loading")}).bind(d+"valid",
function(){b.enable_submit(a)}).bind(d+"invalid",function(){b.disable_submit(a)});b.init_submit_cancel(a);a.form.overlay({close:".modal-buttons .cancel",closeOnClick:false,load:true,fixed:false,mask:{color:"#000",loadSpeed:200,opacity:0.5},onLoad:function(){a.overlay=this;a.init(a)}})},submit_modal_form:function(a){if(!a.form.is(".loading"))if(b.is_submit_enabled(a)){document.activeElement&&c(document.activeElement).blur();b.clear_message(a);if(a.validate(a)){a.form.addClass("loading");a.submit(a,
b.default_submit_ajax_options(a))}}},cancel_modal_form:function(a){a.form.data("overlay").close()},init_submit_cancel:function(a){var d=a.form||a.edit_row,g=a.form||a.submit_row,h=a.event_prefix;a=c(".save",g).click(function(){d.trigger(h+"submit")});b.disable(a);c(".cancel",g).click(function(){d.trigger(h+"cancel")});c(":input",d).keypress(function(j){j.keyCode===13&&!j.isDefaultPrevented()&&d.trigger(h+"submit")}).keyup(function(j){j.keyCode===27&&d.trigger(h+"cancel")})},disable:function(a){c(a).attr("disabled",
"disabled").addClass("disabled")},enable:function(a){c(a).removeAttr("disabled").removeClass("disabled")},disable_submit:function(a){b.disable(c(".save",a.form||a.submit_row))},enable_submit:function(a){b.enable(c(".save",a.form||a.submit_row))},is_submit_enabled:function(a){return!c(".save",a.form||a.submit_row).is(":disabled")},init_mqlkey:function(a,d){return a.next(".key-status").removeClass("valid invalid loading").text("").removeAttr("title").end().mqlkey(d).bind("valid",function(){c(this).next(".key-status").removeClass("invalid loading").addClass("valid").text("valid").attr("title",
"Key is available")}).bind("invalid",function(g,h){c(this).next(".key-status").removeClass("valid loading").addClass("invalid").text("invalid").attr("title",h)}).bind("textchange",function(){c(this).next(".key-status").removeClass("valid invalid").text("loading").addClass("loading")})},validate_mqlkey:function(a,d){var g=d.next(".key-status"),h=d.val();if(h===""){d.trigger(a.event_prefix+"error","Key is required");return false}if(h===d.data("mqlkey").original)return true;if(g.is(".invalid")){d.trigger(a.event_prefix+
"error",g.attr("title"));return false}else if(g.is(".loading"))return false;return true},error:function(a,d){b.disable_submit(a);return b.message(a,d,"error")},message:function(a,d,g){var h=a.head_row;if(!h&&a.form)h=c(".row-msg",a.form);if(h&&h.length){h.find(".close-msg").css("visibility","visible").next().find(".msg-default").hide().next().text(d);h.addClass("row-msg");g&&h.addClass("row-msg-"+g)}},clear_message:function(){},default_begin_ajax_options:function(){return b._default_ajax_options("GET")},
default_submit_ajax_options:function(a){a=a||{};var d=c.extend(b._default_ajax_options("POST"),a.ajax,{beforeSend:function(){e.doing("Saving...");a.beforeSend&&a.beforeSend.apply(null,arguments)},complete:function(){e.clear();a.complete&&a.complete.apply(null,arguments)}}),g=a.submit_row||a.form;g&&c("input[type=hidden]",g).each(function(){d.data[this.name]=this.value});return d},_default_ajax_options:function(a){return{data:{},dataType:"json",type:a||"GET",success:function(d,g,h){if(!b.check_ajax_success.apply(this,
arguments))return this._error.apply(this,[h]);this.onsuccess&&this.onsuccess.apply(this,arguments)},error:function(){b.check_ajax_error.apply(this,arguments);return this._error.apply(this,arguments)},_error:function(d){if(d.status===401)c(window).trigger("fb.user.unauthorized");else if(this.onerror)this.onerror.apply(this,[d.responseText].concat(Array.prototype.slice.call(arguments)));else{var g={},h=this;c.each(["url","data","dataType","type"],function(j,i){g[i]=h[i]});c.each(["status","statusText",
"responseText"],function(j,i){g[i]=d[i]});g.responseHeaders=d.getAllResponseHeaders()}}}},check_ajax_success:function(){return b.check_api_response.apply(this,arguments)},check_ajax_error:function(a){var d=a.responseText;try{d=JSON.stringify(d)}catch(g){}return b.check_api_response.apply(this,[d,a.statusText,a])},check_api_response:function(a,d,g){if(typeof a==="object"){if(a.code!=="/api/status/ok")return false}else if(g.status!==200)return false;return true}}})(jQuery,window.i18n,window.freebase.status);
(function(c,f,e,b){f.topic.manage_type={add_type_begin:function(a,d){c.ajax(c.extend(e.default_submit_ajax_options(),{url:f.h.ajax_url("add_type_submit.ajax"),data:{id:f.c.id,type:d,lang:f.h.lang_code(f.lang)},onsuccess:function(g){var h=c(g.result.html).hide();c(".manage-types").after(h);h.fadeIn(function(){b.init_menus(h,true);i18n.ize(h)});if(g=g.result.list){g=c(g);g=c("li",g).hide();c(".topic-type-list ul").prepend(g);g.fadeIn()}a.removeClass("editing").focus().select()}}))},remove_type_begin:function(a,
d){c.ajax(c.extend(e.default_submit_ajax_options(),{url:f.h.ajax_url("remove_type_submit.ajax"),data:{id:f.c.id,type:d,lang:f.h.lang_code(f.lang)},onsuccess:function(g){c(".type-section[data-id="+d.replace(/\//g,"\\/")+"]").fadeOut();var h=a.parent("li");g=c(g.result.html);h.hide().before(g);a.removeClass("editing").focus().select()}}))},undo_remove_type:function(a,d){c.ajax(c.extend(e.default_submit_ajax_options(),{url:f.h.ajax_url("undo_remove_type.ajax"),data:{id:f.c.id,type:d},onsuccess:function(){c(".type-section[data-id="+
d.replace(/\//g,"\\/")+"]").fadeIn();c(a).parents("li.remove-type-result").hide().next("li:hidden").show().end().remove()}}));return false}}})(jQuery,window.freebase,window.formlib,window.propbox,window.i18n);
