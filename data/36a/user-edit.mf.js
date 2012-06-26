
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
(function(d){function f(){if(d.browser.msie){var i=d(document).height(),l=d(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,i-l<20?l:i]}return[d(document).width(),d(document).height()]}function e(i){if(i)return i.call(d.mask)}d.tools=d.tools||{version:"@VERSION"};var c;c=d.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,
onClose:null}};var a,b,g,h,j;d.mask={load:function(i,l){if(g)return this;if(typeof i=="string")i={color:i};i=i||h;h=i=d.extend(d.extend({},c.conf),i);a=d("#"+i.maskId);if(!a.length){a=d("<div/>").attr("id",i.maskId);d("body").append(a)}var n=f();a.css({position:"absolute",top:0,left:0,width:n[0],height:n[1],display:"none",opacity:i.startOpacity,zIndex:i.zIndex});i.color&&a.css("backgroundColor",i.color);if(e(i.onBeforeLoad)===false)return this;i.closeOnEsc&&d(document).bind("keydown.mask",function(m){m.keyCode==
27&&d.mask.close(m)});i.closeOnClick&&a.bind("click.mask",function(m){d.mask.close(m)});d(window).bind("resize.mask",function(){d.mask.fit()});if(l&&l.length){j=l.eq(0).css("zIndex");d.each(l,function(){var m=d(this);/relative|absolute|fixed/i.test(m.css("position"))||m.css("position","relative")});b=l.css({zIndex:Math.max(i.zIndex+1,j=="auto"?0:j)})}a.css({display:"block"}).fadeTo(i.loadSpeed,i.opacity,function(){d.mask.fit();e(i.onLoad)});g=true;return this},close:function(){if(g){if(e(h.onBeforeClose)===
false)return this;a.fadeOut(h.closeSpeed,function(){e(h.onClose);b&&b.css({zIndex:j})});d(document).unbind("keydown.mask");a.unbind("click.mask");d(window).unbind("resize.mask");g=false}return this},fit:function(){if(g){var i=f();a.css({width:i[0],height:i[1]})}},getMask:function(){return a},isLoaded:function(){return g},getConf:function(){return h},getExposed:function(){return b}};d.fn.mask=function(i){d.mask.load(i);return this};d.fn.expose=function(i){d.mask.load(i,this);return this}})(jQuery);
(function(d){function f(a,b){var g=this,h=a.add(g),j=d(window),i,l,n,m=d.tools.expose&&(b.mask||b.expose),q=Math.random().toString().slice(10);if(m){if(typeof m=="string")m={color:m};m.closeOnClick=m.closeOnEsc=false}var r=b.target||a.attr("rel");l=r?d(r):a;if(!l.length)throw"Could not find Overlay: "+r;a&&a.index(l)==-1&&a.click(function(k){g.load(k);return k.preventDefault()});d.extend(g,{load:function(k){if(g.isOpened())return g;var p=c[b.effect];if(!p)throw'Overlay: cannot find effect : "'+b.effect+
'"';b.oneInstance&&d.each(e,function(){this.close(k)});k=k||d.Event();k.type="onBeforeLoad";h.trigger(k);if(k.isDefaultPrevented())return g;n=true;m&&d(l).expose(m);var o=b.top,t=b.left,u=l.outerWidth({margin:true}),v=l.outerHeight({margin:true});if(typeof o=="string")o=o=="center"?Math.max((j.height()-v)/2,0):parseInt(o,10)/100*j.height();if(t=="center")t=Math.max((j.width()-u)/2,0);p[0].call(g,{top:o,left:t},function(){if(n){k.type="onLoad";h.trigger(k)}});m&&b.closeOnClick&&d.mask.getMask().one("click",
g.close);b.closeOnClick&&d(document).bind("click."+q,function(s){d(s.target).parents(l).length||g.close(s)});b.closeOnEsc&&d(document).bind("keydown."+q,function(s){s.keyCode==27&&g.close(s)});return g},close:function(k){if(!g.isOpened())return g;k=k||d.Event();k.type="onBeforeClose";h.trigger(k);if(!k.isDefaultPrevented()){n=false;c[b.effect][1].call(g,function(){k.type="onClose";h.trigger(k)});d(document).unbind("click."+q).unbind("keydown."+q);m&&d.mask.close();return g}},getOverlay:function(){return l},
getTrigger:function(){return a},getClosers:function(){return i},isOpened:function(){return n},getConf:function(){return b}});d.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(k,p){d.isFunction(b[p])&&d(g).bind(p,b[p]);g[p]=function(o){d(g).bind(p,o);return g}});i=l.find(b.close||".close");if(!i.length&&!b.close){i=d('<a class="close"></a>');l.prepend(i)}i.click(function(k){g.close(k)});b.load&&g.load()}d.tools=d.tools||{version:"@VERSION"};d.tools.overlay={addEffect:function(a,
b,g){c[a]=[b,g]},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:"fast",effect:"default",fixed:!d.browser.msie||d.browser.version>6,left:"center",load:false,mask:null,oneInstance:true,speed:"normal",target:null,top:"10%"}};var e=[],c={};d.tools.overlay.addEffect("default",function(a,b){var g=this.getConf(),h=d(window);if(!g.fixed){a.top+=h.scrollTop();a.left+=h.scrollLeft()}a.position=g.fixed?"fixed":"absolute";this.getOverlay().css(a).fadeIn(g.speed,b)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,
a)});d.fn.overlay=function(a){var b=this.data("overlay");if(b)return b;if(d.isFunction(a))a={onBeforeLoad:a};a=d.extend(true,{},d.tools.overlay.conf,a);this.each(function(){b=new f(d(this),a);e.push(b);d(this).data("overlay",b)});return a.api?b:this}})(jQuery);
(function(d){d.fn.mqlkey=function(e){return this.each(function(){var c=d(this);if(c.is(":text")){var a=c.data("mqlkey");a&&a._destroy();a=new f(this,e);c.data("mqlkey",a)}})};var f=d.mqlkey=function(e,c){this.options=d.extend(true,{},f.defaults,c);this.input=d(e);this.original=this.input.val();this.init()};f.prototype={init:function(){var e=this;this.input.bind("keyup.mqlkey",function(c){e.textchange(c)}).bind(d.browser.msie?"paste.mqlkey":"input.mqlkey",function(c){e.textchange(c)});if(this.options.source){this.source=
d(this.options.source);this.source_generate=true;this.input.bind("change.mqlkey",function(){e.source_generate=false});this.source.bind("change.mqlkey",function(){if(e.source_generate){var c=f.from(e.source.val());e.input.val(c).trigger("keyup")}})}},_destroy:function(){this.input.unbind(".mqlkey");this.source&&this.source.unbind("change.mqlkey")},textchange:function(e){clearTimeout(this.textchange_timeout);var c=this;this.textchange_timeout=setTimeout(function(){c.textchange_delay(e)},200)},textchange_delay:function(){this.input.trigger("textchange");
var e=d.trim(this.input.val());return e===this.original&&e!==""?this.valid(e):f.reserved_word(e)?this.invalid(e,e+" is a reserved word."):f.test(e,this.options.schema)?e.length<this.options.minlen?this.invalid(e):this.options.check_key?this.check_key(e):this.valid(e):this.invalid(e)},check_key:function(e){var c=this;if(this.xhr){this.xhr.abort();this.xhr=null}var a={id:null,key:{namespace:this.options.namespace,value:e}};clearTimeout(this.check_key.timeout);this.check_key.timeout=setTimeout(function(){c.xhr=
c.options.mqlread(a,function(b){return b?c.invalid(e,"Key already exists"):c.valid(e)},function(b){return b?c.invalid(b.responseText()):c.invalid("mqlread error!")})},200)},valid:function(e){this.input.trigger("valid",e)},invalid:function(e,c){if(!c){c=this.options.minlen>1?"Key must be "+this.options.minlen+" or more alphanumeric characters":"Key must be alphanumeric";c+=", lowercase, begin with a letter and not end with a non-alphanumeric character. Underscores are allowed but not consecutively."}this.input.trigger("invalid",
c)}};d.extend(f,{defaults:{minlen:1,check_key:true,namespace:"/",mqlread:function(e,c,a){return f.mqlread(null,e,c,a)},source:null,schema:false},mqlread:function(e,c,a,b){e={url:e||"http://api.freebase.com/api/service/mqlread",data:{query:JSON.stringify({query:c})},dataType:"jsonp",success:function(g){return a(g.result)},error:b};return d.ajax(e)},from:function(e){e=e.toLowerCase();e=e.replace(/[^a-z0-9]/g,"_");e=e.replace(/\_\_+/g,"_");e=e.replace(/[^a-z0-9]+$/,"");e=e.replace(/^[^a-z]+/,"");if(f.reserved_word(e))e=
"x_"+e;return e},reservedwords:"meta typeguid left right datatype scope attribute relationship property link class future update insert delete replace create destroy default sort limit offset optional pagesize cursor index !index for while as in is if else return count function read write select var connect this self super xml sql mql any all macro estimate-count",typeonlywords:"guid id object domain name key type keys value timestamp creator permission namespace unique schema reverse",_reserved_word:null,
reserved_word:function(e){if(!f._reserved_word){f._reserved_word={};d.each([f.reservedwords,f.typeonlywords],function(c,a){d.each(a.split(" "),function(b,g){f._reserved_word[g]=1})})}return f._reserved_word[e]===1},fast:/^[A-Za-z0-9](?:[_-]?[A-Za-z0-9])*$/,slow:/^(?:[A-Za-z0-9]|\$[A-F0-9]{4})(?:[_-]?[A-Za-z0-9]|[_-]?\$[A-F0-9]{4})*$/,schema:/^[a-z](?:_?[a-z0-9])*$/,test:function(e,c){if(c)return f.schema.test(e);return f.fast.test(e)||f.slow.test(e)}})})(jQuery);
(function(d,f){f.require("dojo.date.stamp");f.require("dojo.date.locale");f.require("dojo.number");d.fn.validate_input=function(c){return this.each(function(){var a=d(this);if(a.is(":text")){var b=a.data("$.validate_input");b&&b._destroy();b=new e(this,c);a.data("$.validate_input",b)}})};var e=d.validate_input=function(c,a){var b=this.options=d.extend(true,{},e.defaults,a);if(typeof b.validator!=="function")throw"A validator is required";if(!b.lang)b.lang="/lang/en";b.lang=b.lang==="/lang/en"?["lang/en"]:
[b.lang,"/lang/en"];b.locales=[];d.each(b.lang,function(h,j){b.locales[h]=f.i18n.normalizeLocale(j.split("/").pop())});this.input=d(c);this.init();var g=this;this.input.bind("remove",function(){g._destroy()});return this};e.prototype={init:function(){var c=this;this.input.bind("keyup.validate_input",function(a){c.textchange(a)}).bind(d.browser.msie?"paste.validate_input":"input.validate_input",function(a){c.textchange(a)}).bind("keypress.validate_input",function(a){a.keyCode===13&&c.validate(true)}).bind("blur.validate_input",
function(){c.validate(true)})},_destroy:function(){this.input.unbind(".validate_input")},valid:function(c){this.input.trigger("valid",c)},invalid:function(c,a){this.input.trigger("invalid",a)},empty:function(){this.input.trigger("empty")},textchange:function(){clearTimeout(this.textchange_timeout);var c=this;this.textchange_timeout=setTimeout(function(){c.validate()},200)},validate:function(c){c&&clearTimeout(this.textchange_timeout);c=this.options;var a=d.trim(this.input.val());if(a==="")return this.empty();
try{return this.valid(c.validator(a,c))}catch(b){return this.invalid(a,""+b)}}};d.extend(e,{defaults:{validator:function(c){return{text:c,value:c}}},log:function(){},invalid:function(c,a,b,g){throw new Error("Invalid "+b+(g?": "+g:""));},text:function(c,a){if(c.lengh>4096)return this.invalid(c,a,type,"Text too long");return{text:c,value:c}},topic:function(){return e.defaults.validator},enumerated:function(){return e.defaults.validator},"boolean":function(){return e.defaults.validator},uri:function(c,
a){var b=e.uri.regex;if(!b)b=e.uri.regex=/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
if(b.test(c))return{text:c,value:c};return e.invalid(c,a,"uri")},"int":function(c,a){return e.number.parse(c,a,false)},"float":function(c,a){return e.number.parse(c,a,true)},number:function(c,a,b){return e.number.parse(c,a,b)},datetime:function(c,a){return e.datetime.parse(c,a)},mqlkey:function(c,a){var b=e.mqlkey.regex;if(!b)b=e.mqlkey.regex=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;if(b.test(c))return{text:c,value:c};return e.invalid(c,a,"mqlkey")}});d.extend(e.number,{parse:function(c,a,b){var g=a&&a.locales||
["en"],h,j;h=0;for(j=g.length;h<j;h++){var i=g[h];a=f.number.parse(c,{locale:i});if(!isNaN(a)){c={};if(b){c.value=a;c.text=f.number.format(a,{locale:i})}else{c.value=f.number.round(a,0);c.text=f.number.format(c.value,{locale:i})}return c}}throw e.invalid("number",c);}});d.extend(e.datetime,{formats:["yyyy",["dateFormatItem-y"],"yyyy-MM",["dateFormatItem-yM","dateFormatItem-yMMM"],"yyyy-MM-dd",["dateFormat-short","dateFormat-medium","dateFormat-long"]],parse:function(c,a){if(!f.date.stamp._isoRegExp)f.date.stamp._isoRegExp=
/^(?:(-?\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;var b=f.date.stamp.fromISOString(c);if(b)return{text:c,value:c,date:b};var g=a&&a.locales||["en"],h,j,i,l,n,m;h=0;for(j=g.length;h<j;h++){var q=g[h],r=f.date.locale._getGregorianBundle(q);i=0;for(l=e.datetime.formats.length;i<l;i+=2){var k=e.datetime.formats[i],p=e.datetime.formats[i+1];n=0;for(m=p.length;n<m;n++){var o=r[p[n]];if(o){o=i18n.normalize_pattern(o);try{b=f.date.locale.parse(c,
{datePattern:o,selector:"date",locale:q});return{text:c,value:f.date.locale.format(b,{datePattern:k,selector:"date"}),date:b}}catch(t){}}}}}throw e.invalid("datetime",c);}})})(jQuery,dojo);
(function(d){d.fn.data_input=function(f){return this.each(function(){var e=d(this),c=e.data("$.data_input");c&&c._destroy();c=new d.data_input(this,f);e.data("$.data_input",c)})};d.data_input=function(f,e){this.options=d.extend(true,{},e);this.container=d(f);this.metadata=this.container.metadata();this.input=d(":input",this.container);this.init();var c=this;this.input.bind("remove",function(){c._destroy()})};d.data_input.prototype={init:function(){var f=this,e=this.container,c=this.input,a=this.options;
c.bind("focusin.data_input",function(){f.container.addClass("focus")}).bind("focusout.data_input",function(){f.container.removeClass("focus")}).bind("valid.data_input",function(g,h){g.stopPropagation();var j={name:f.input.attr("name")};if(h.id)j.id=h.id;else if(h.create_new){j.create_new=h.create_new;j.lang=f.metadata.lang||a.lang}else{j.value=h.value;if(f.metadata.type==="/type/text")j.lang=f.metadata.lang||a.lang;else if(f.metadata.type==="/type/key")j.namespace=h.namespace}f.container.data("data",
j);f.container.removeClass("error").addClass("valid");f.container.trigger("valid")}).bind("invalid.data_input",function(g){g.stopPropagation();f.container.removeData("data");f.container.removeClass("valid").addClass("error");f.container.trigger("invalid")}).bind("empty.data_input",function(g){g.stopPropagation();g={name:f.input.attr("name")};if(f.metadata&&f.metadata.lang)g.lang=f.metadata.lang;f.container.data("data",g);f.container.removeClass("valid").removeClass("error");f.container.trigger("empty")}).bind("keypress.data_input",
function(g){g.keyCode===13&&!g.isDefaultPrevented()&&f.container.trigger("submit")}).bind("keyup.data_input",function(g){g.keyCode===27&&f.container.trigger("cancel")});if(e.is(".topic")){e=f.metadata.type;var b=null;if(a.suggest_impl)b=a.suggest_impl.instance(e,true,f.metadata&&f.metadata.lang||a.lang);c.validate_topic(d.extend({incompatible_types:f.options.incompatible_types,expected_type:e},b)).bind("valid.data_input",function(g,h){f.fb_select(h)}).bind("invalid.data_input",function(){f.fb_textchange()});
if(this.metadata&&this.metadata.id){c.data("data.suggest",this.metadata);this.validate()}}else if(e.is(".text"))c.validate_input({validator:d.validate_input.text});else if(e.is(".datetime"))c.validate_input({validator:d.validate_input.datetime,lang:a.lang});else if(e.is(".enumerated")){c.validate_enumerated().bind("valid.data_input",function(g,h){f.fb_select(h)}).bind("invalid.data_input",function(){f.fb_textchange()});this.metadata&&this.metadata.id&&this.validate()}else if(e.is(".int"))c.validate_input({validator:d.validate_input["int"],
lang:a.lang});else if(e.is(".float"))c.validate_input({validator:d.validate_input["float"],lang:a.lang});else if(e.is(".uri"))c.validate_input({validator:d.validate_input.uri});else if(e.is(".boolean"))c.validate_boolean();else if(e.is(".enumeration"))c.validate_input({validator:d.validate_input.mqlkey});else if(e.is(".key"))c.validate_key(a,this.metadata);else if(e.is(".rawstring"))c.validate_input({validator:d.validate_input.text});else throw new Error("Invalid data-input: "+e.attr("class"));},
_destroy:function(){this.input.unbind(".data_input")},validate:function(){var f=this.input;d.each(["$.validate_topic","$.validate_input","$.validate_enumerated","$.validate_boolean","$.validate_key"],function(e,c){var a=f.data(c);if(a){a.validate(true);return false}})},reset:function(){this.container.removeData("data");if(this.input.is(":text"))this.input.val("");else if(this.input.is("select"))this.input[0].selectedIndex=0;else this.input.is(":radio")&&this.input.each(function(){this.checked=false})},
fb_textchange:function(){},fb_select:function(){},ajax_beforeSend:function(f){if(!this.xhr_queue)this.xhr_queue=[];this.xhr_queue.push(f);this.container.trigger("loading")},ajax_complete:function(f){if(!this.xhr_queue)this.xhr_queue=[];for(var e=0,c=this.xhr_queue.length;e<c;e++)if(f===this.xhr_queue[e]){this.xhr_queue.splice(e,1);break}this.xhr_queue.length===0&&this.container.trigger("loading_complete")}};d.fn.validate_topic=function(f){return this.each(function(){var e=d(this);if(e.is(":text")){var c=
e.data("$.validate_topic");c&&c._destroy();c=new d.validate_topic(this,f);e.data("$.validate_topic",c)}})};d.validate_topic=function(f,e){this.options=d.extend(true,{},e);this.input=d(f);this.init()};d.validate_topic.prototype={init:function(){var f=this;this.input.suggest(this.options).bind("fb-textchange.validate_topic",function(){f.input.val()===""?f.empty():f.invalid()}).bind("fb-select.validate_topic",function(e,c){f.input.val(c.name!=null?c.name:c.id);f.incompatible_types_check(c)}).bind("fb-select-new.validate_topic",
function(e,c){f.valid(c)})},incompatible_types_check:function(f){var e=this;e.options.incompatible_types&&e.options.expected_type?e.options.incompatible_types.check(f.id,e.options.expected_type,{compatible:function(){e.valid(f)},incompatible:e.options.incompatible_types.inline_suggest_incompatible_callback(e.input,{onConfirm:function(){e.valid(f)}})}):this.valid(f)},invalid:function(){this.input.trigger("invalid")},valid:function(f){if(typeof f==="string")f={create_new:f};this.input.trigger("valid",
f)},empty:function(){this.input.trigger("empty")},_destroy:function(){this.input.unbind(".validate_topic")},validate:function(){if(this.input.val()==="")this.empty();else{var f=this.input.data("data.suggest");f?this.valid(f):this.invalid()}}};d.fn.validate_enumerated=function(f){return this.each(function(){var e=d(this);if(e.is("select")){var c=e.data("$.validate_enumerated");c&&c._destroy();c=new d.validate_enumerated(this,f);e.data("$.validate_enumerated",c)}})};d.validate_enumerated=function(f,
e){this.options=d.extend(true,{},e);this.input=d(f);this.init()};d.validate_enumerated.prototype={init:function(){var f=this;this.input.bind("change.validate_enumerated, keypress.validate_enumerated",function(){this.selectedIndex===0?f.empty():f.valid({text:d(":selected",this).text(),id:this.value})})},invalid:function(){this.input.trigger("invalid")},valid:function(f){this.input.trigger("valid",f);this.input.trigger("fb-select",f)},empty:function(){this.input.trigger("empty")},_destroy:function(){this.input.unbind(".validate_enumerated")},
validate:function(){var f=this.input[0];f.selectedIndex>0?this.valid({text:d(":selected",this.input).text(),id:f.value}):this.empty()}};d.fn.validate_boolean=function(f){var e,c;this.each(function(){var b=d(this);if(b.is(":radio"))if(b.val().toLowerCase()==="true")e=b;else if(b.val().toLowerCase()==="false")c=b});if(e&&c){var a=e.data("$.validate_boolean");a&&a._destroy();a=new d.validate_boolean(e,c,f);e.data("$.validate_boolean",a)}else throw"$.fn.validate_boolean requires two radios: true and false";
return this};d.validate_boolean=function(f,e,c){this.options=d.extend(true,{},c);this.tradio=f;this.fradio=e;this.input=this.tradio;this.init()};d.validate_boolean.prototype={init:function(){var f=this;this.tradio.bind("change.validate_boolean",function(){f.validate()})},_destroy:function(){this.input.unbind(".validate_boolean")},valid:function(f){this.input.trigger("valid",f)},empty:function(){this.input.trigger("empty")},validate:function(){if(this.tradio.is(":checked"))this.valid({text:this.tradio.text(),
value:true});else this.fradio.is(":checked")?this.valid({text:this.fradio.text(),value:false}):this.empty()}};d.fn.validate_key=function(f,e){var c,a;this.each(function(){var g=d(this);if(g.is(":text"))if(g.is(".key-namespace"))c=g;else if(g.is(".key-value"))a=g});if(c&&a){var b=a.data("$.validate_key");b&&b._destroy();b=new d.validate_key(c,a,f);c.data("$.validate_key",b);if(e&&e.namespace&&e.value){c.data("data.suggest",{id:e.namespace});a.val(e.value)}}else throw"$.fn.validate_key requires two inputs: namespace and value";
return this};d.validate_key=function(f,e,c){this.options=d.extend(true,{},c);this.key_namespace_input=f;this.key_value_input=e;this.input=this.key_namespace_input;this.init()};d.validate_key.prototype={init:function(){var f=this,e=null;if(this.options.suggest_impl)e=this.key_value_input.attr("name")!="/type/namespace/keys"?this.options.suggest_impl.instance("/type/namespace"):d.extend({},fb.suggest_options.service_defaults);this.key_namespace_input.suggest(e).bind("fb-textchange.validate_key",function(){f.validate()}).bind("fb-select.validate_key",
function(c,a){f.key_namespace_input.val(a.name||a.id);f.validate()});this.key_value_input.validate_input({validator:d.validate_input.mqlkey}).bind("valid",function(c){c.stopPropagation();f.validate()}).bind("invalid",function(c){c.stopPropagation();f.validate()}).bind("empty",function(c){c.stopPropagation();f.validate()})},_destroy:function(){this.key_namespace_input.unbind(".validate_key");this.key_value_input.unbind()},invalid:function(){this.input.trigger("invalid")},valid:function(f){this.input.trigger("valid",
f)},empty:function(){this.input.trigger("empty")},validate:function(){if(this.is_valid_key_namespace()&&this.is_valid_key_value())this.valid({namespace:this.key_namespace_input.data("data.suggest").id,value:this.key_value_input.val(),text:this.key_value_input.val()});else this.key_namespace_input.val()===""&&this.key_value_input.val()===""?this.empty():this.invalid()},is_valid_key_namespace:function(){return this.key_namespace_input.data("data.suggest")!=null},is_valid_key_value:function(){try{d.validate_input.mqlkey(this.key_value_input.val());
return true}catch(f){return false}}}})(jQuery);
(function(d,f,e){var c=window.formlib={status:e,init:function(a){var b=a.event_prefix||"form.";a.form.bind(b+"submit",function(){c.submit(a)}).bind(b+"cancel",function(){c.cancel(a)}).bind(b+"error",function(g,h){a.form.removeClass("loading");c.disable_submit(a);e.error(h,true)}).bind(b+"success",function(){a.form.removeClass("loading")}).bind(b+"valid",function(){c.enable_submit(a)}).bind(b+"invalid",function(){c.disable_submit(a)});c.init_submit_cancel(a);a.init(a)},submit:function(a){if(!a.form.is(".loading"))if(c.is_submit_enabled(a)){document.activeElement&&
d(document.activeElement).blur();if(a.validate(a)){a.form.addClass("loading");a.submit(a,c.default_submit_ajax_options(a))}}},cancel:function(){},init_inline_add_form:function(a){var b=a.event_prefix||"form.inline_add_form.";a.edit_row.bind(b+"submit",function(){c.submit_inline_add_form(a)}).bind(b+"cancel",function(){c.cancel_inline_add_form(a)}).bind(b+"error",function(g,h){a.edit_row.removeClass("loading");c.disable_submit(a);e.error(h,true)}).bind(b+"success",function(){a.edit_row.removeClass("loading")}).bind(b+
"valid",function(){c.enable_submit(a)}).bind(b+"invalid",function(){c.disable_submit(a)});c.init_submit_cancel(a);a.trigger&&a.trigger.parents(".trigger-row:first").hide();a.body.append(a.edit_row).append(a.submit_row);a.init(a)},submit_inline_add_form:function(a){if(!a.edit_row.is(".loading"))if(c.is_submit_enabled(a)){document.activeElement&&d(document.activeElement).blur();if(a.validate(a)){a.edit_row.addClass("loading");a.submit(a,c.default_submit_ajax_options(a))}}},success_inline_add_form:function(a,
b){a.edit_row.before(b);f.ize(b);a.reset(a);a.edit_row.trigger(a.event_prefix+"success")},cancel_inline_add_form:function(a){a.edit_row.remove();a.submit_row.remove();a.trigger&&a.trigger.parents(".trigger-row:first").show()},init_inline_edit_form:function(a){var b=a.event_prefix||"form.inline_edit_form.";a.edit_row.bind(b+"submit",function(){c.submit_inline_edit_form(a)}).bind(b+"cancel",function(){c.cancel_inline_edit_form(a)}).bind(b+"error",function(g,h){a.edit_row.removeClass("loading");c.disable_submit(a);
e.error(h,true)}).bind(b+"success",function(){a.edit_row.removeClass("loading")}).bind(b+"valid",function(){c.enable_submit(a)}).bind(b+"invalid",function(){c.disable_submit(a)});c.init_submit_cancel(a);a.row.hide();a.row.before(a.edit_row).before(a.submit_row);a.init(a)},submit_inline_edit_form:function(a){if(!a.edit_row.is(".loading"))if(c.is_submit_enabled(a)){document.activeElement&&d(document.activeElement).blur();if(a.validate(a)){a.edit_row.addClass("loading");a.submit(a,c.default_submit_ajax_options(a))}}},
success_inline_edit_form:function(a,b){a.row.replaceWith(b);a.row=b;f.ize(b);a.edit_row.trigger(a.event_prefix+"cancel")},cancel_inline_edit_form:function(a){a.edit_row.remove();a.submit_row.remove();a.row.show()},success_inline_delete:function(a,b,g){a.hide().addClass("old-row");a.after(b);b.append(a);if(g){a=d('<a href="#">Undo</a>');d(".msg-default",b).next().append(a);a.click(function(){g();return false})}},success_inline_delete_undo:function(a){var b=d(".old-row",a);a.before(b);b.show().removeClass("old-row");
a.remove()},init_modal_form:function(a){d(document.body).append(a.form.hide());var b=a.event_prefix||"form.modal_form.";a.form.bind(b+"submit",function(){c.submit_modal_form(a)}).bind(b+"cancel",function(){c.cancel_modal_form(a)}).bind(b+"error",function(g,h){a.form.removeClass("loading");c.disable_submit(a);e.error(h,true)}).bind(b+"success",function(){a.form.removeClass("loading")}).bind(b+"valid",function(){c.enable_submit(a)}).bind(b+"invalid",function(){c.disable_submit(a)});c.init_submit_cancel(a);
a.form.data("overlay")&&a.form.removeData("overlay");a.form.overlay({close:".modal-buttons .cancel",closeOnClick:false,load:true,fixed:false,mask:{color:"#000",loadSpeed:200,opacity:0.5},onLoad:function(){a.overlay=this;a.init(a)}})},submit_modal_form:function(a){if(!a.form.is(".loading"))if(c.is_submit_enabled(a)){document.activeElement&&d(document.activeElement).blur();if(a.validate(a)){a.form.addClass("loading");a.submit(a,c.default_submit_ajax_options(a))}}},cancel_modal_form:function(a){a.form.data("overlay").close();
a.form.next("#exposeMask").hide()},init_submit_cancel:function(a){var b=a.form||a.edit_row,g=a.form||a.submit_row,h=a.event_prefix;a=d(".save",g).click(function(){b.trigger(h+"submit")});c.disable(a);d(".cancel",g).click(function(){b.trigger(h+"cancel")});d(":input",b).keyup(function(j){j.keyCode===27&&b.trigger(h+"cancel")})},disable:function(a){d(a).attr("disabled","disabled").addClass("disabled")},enable:function(a){d(a).removeAttr("disabled").removeClass("disabled")},disable_submit:function(a){c.disable(d(".save",
a.form||a.submit_row))},enable_submit:function(a){c.enable(d(".save",a.form||a.submit_row))},is_submit_enabled:function(a){return!d(".save",a.form||a.submit_row).is(":disabled")},init_mqlkey:function(a,b){return a.next(".key-status").removeClass("valid invalid loading").text("").removeAttr("title").end().mqlkey(b).bind("valid",function(){d(this).next(".key-status").removeClass("invalid loading").addClass("valid").text("valid").attr("title","Key is available")}).bind("invalid",function(g,h){d(this).next(".key-status").removeClass("valid loading").addClass("invalid").text("invalid").attr("title",
h)}).bind("textchange",function(){d(this).next(".key-status").removeClass("valid invalid").text("loading").addClass("loading")})},validate_mqlkey:function(a,b){var g=b.next(".key-status"),h=b.val();if(h===""){b.trigger(a.event_prefix+"error","Key is required");return false}if(h===b.data("mqlkey").original)return true;if(g.is(".invalid")){b.trigger(a.event_prefix+"error",g.attr("title"));return false}else if(g.is(".loading"))return false;return true},default_begin_ajax_options:function(){return d.extend(c._default_ajax_options("GET"),
{beforeSend:function(){e.doing("Loading...")},complete:function(){this.formlib_error||e.clear()}})},default_submit_ajax_options:function(a){a=a||{};var b=d.extend(c._default_ajax_options("POST"),a.ajax,{beforeSend:function(){this.formlib_options=a;e.doing("Saving...");d.isFunction(a.beforeSend)&&a.beforeSend.apply(this,arguments)},complete:function(){this.formlib_error||e.clear();d.isFunction(a.complete)&&a.complete.apply(this,arguments)}}),g=a.submit_row||a.form;g&&d("input[type=hidden]",g).each(function(){b.data[this.name]=
this.value});return b},_default_ajax_options:function(a){return{data:{},dataType:"json",type:a||"GET",success:function(b,g,h){if(!c.check_ajax_success(b,g,h))return this._error(h);d.isFunction(this.onsuccess)&&this.onsuccess(b,g,h)},error:function(b){return this._error(b)},_error:function(b){if(b.status===401){e.info("Authorizing...");d(window).trigger("fb.user.unauthorized")}else{console.error(b.responseText);this.formlib_error=true;var g=c.get_error_message(b.responseText);if(d.isFunction(this.onerror))this.onerror(g,
b);else{b=null;if(this.formlib_options)if(this.formlib_options.form){this.formlib_options.form.trigger(this.formlib_options.event_prefix+"cancel");b=this.formlib_options.form}else b=this.formlib_options.edit_row;b?b.trigger(this.formlib_options.event_prefix+"error",g):e.error(g,true)}}}}},check_ajax_success:function(a,b,g){return c.check_api_response(a,b,g)},check_api_response:function(a,b,g){if(d.isPlainObject(a)){if(a.code!=="/api/status/ok")return false}else if(g.status!==200)return false;return true},
get_error_message:function(a){var b=null;try{var g=JSON.parse(a);if(g&&d.isArray(g.messages)&&g.messages.length)b=g.messages[0].message}catch(h){}b||(b=a);return b}}})(jQuery,window.i18n,window.freebase.status);
(function(d,f,e,c){f.schema=f.schema||{};d.extend(f.schema,{create_domain_begin:function(){var a=d.extend(e.default_begin_ajax_options(),{url:f.h.ajax_url("lib/schema/create_domain_begin.ajax"),data:{lang:f.lang},onsuccess:function(b){b=d(b.result.html);b={event_prefix:"fb.schema.create_domain.",init:f.schema.create_domain_init,validate:f.schema.create_domain_validate,submit:f.schema.create_domain_submit,ajax:{url:f.h.ajax_url("lib/schema/create_domain_submit.ajax")},form:b};e.init_modal_form(b)}});
d.ajax(a)},create_domain_init:function(a){f.schema.init_modal_help(a.form);var b=d("input[name=name]",a.form).change(f.schema.create_domain_validate).focus(),g=d("input[name=key]",a.form).change(f.schema.create_domain_validate);e.init_mqlkey(g,{mqlread:f.mqlread,namespace:"/base",check_key:true,source:b,schema:true,minlen:5});g.bind("valid",f.schema.create_domain_validate).bind("invalid",f.schema.create_domain_validate);d(":input:not(textarea)",a.form).keypress(function(h){h.keyCode===13&&!h.isDefaultPrevented()&&
a.form.trigger(form.event_prefix+"submit")})},create_domain_validate:function(a){if(d.trim(d("input[name=name]",a.form).val())===""){a.form.trigger(a.event_prefix+"error","Name is required");e.disable_submit(a);return false}var b=d("input[name=key]",a.form);if(e.validate_mqlkey(a,b)){e.enable_submit(a);return true}else{e.disable_submit(a);return false}},create_domain_submit:function(a,b){var g=d("input[name=name]",a.form),h=d("input[name=key]",a.form),j=d("textarea[name=description]",a.form);d.extend(b.data,
{name:g.val(),key:h.val(),description:j.val()});d.ajax(d.extend(b,{onsuccess:function(i){window.location=i.result.location}}))},delete_domain_begin:function(a){a=d.extend(e.default_begin_ajax_options(),{url:f.h.ajax_url("lib/schema/delete_domain_begin.ajax"),data:{id:a,lang:f.lang},onsuccess:function(b){b=d(b.result.html);b={event_prefix:"fb.schema.delete_domain.",init:f.schema.delete_domain_init,validate:f.schema.delete_domain_validate,submit:f.schema.delete_domain_submit,ajax:{url:f.h.ajax_url("lib/schema/delete_domain_submit.ajax")},
form:b};e.init_modal_form(b)}});d.ajax(a)},delete_domain_init:function(a){d("input[name=force]",a.form).length&&e.enable_submit(a)},delete_domain_validate:function(a){return d("input[name=force]",a.form).length},delete_domain_submit:function(a,b){d.ajax(d.extend(b,{onsuccess:function(g){window.location=g.result.location}}))},delete_type_begin:function(a){a=d.extend(e.default_begin_ajax_options(),{url:f.h.ajax_url("lib/schema/delete_type_begin.ajax"),data:{id:a,lang:f.lang},onsuccess:function(b){b=
d(b.result.html);b={event_prefix:"fb.schema.delete_type.",init:f.schema.delete_type_init,validate:f.schema.delete_type_validate,submit:f.schema.delete_type_submit,ajax:{url:f.h.ajax_url("lib/schema/delete_type_submit.ajax")},form:b};e.init_modal_form(b)}});d.ajax(a)},delete_type_init:function(a){d("input[name=force]",a.form).length&&e.enable_submit(a);c.ize(a.form)},delete_type_validate:function(a){return d("input[name=force]",a.form).length},delete_type_submit:function(a,b){d.ajax(d.extend(b,{onsuccess:function(g){window.location=
g.result.location}}))},delete_property_begin:function(a){a=d.extend(e.default_begin_ajax_options(),{url:f.h.ajax_url("lib/schema/delete_property_begin.ajax"),data:{id:a,lang:f.lang},onsuccess:function(b){b=d(b.result.html);b={event_prefix:"fb.schema.delete_property.",init:f.schema.delete_property_init,validate:f.schema.delete_property_validate,submit:f.schema.delete_property_submit,ajax:{url:f.h.ajax_url("lib/schema/delete_property_submit.ajax")},form:b};e.init_modal_form(b)}});d.ajax(a)},delete_property_init:function(a){d("input[name=force]",
a.form).length&&e.enable_submit(a);c.ize(a.form)},delete_property_validate:function(a){return d("input[name=force]",a.form).length},delete_property_submit:function(a,b){d.ajax(d.extend(b,{onsuccess:function(g){window.location=g.result.location}}))},init_modal_help:function(a){d(".modal-help-toggle",a).click(function(){var b=d(this),g=b.parents().find(".modal-help"),h=b.parents().find(".modal-content");if(g.is(":hidden")){g.height(h.height()-5).slideDown();b.html("[ - ] Hide Help")}else{g.slideUp();
b.html("[ + ] Show Help")}})}})})(jQuery,window.freebase,window.formlib,window.i18n);
