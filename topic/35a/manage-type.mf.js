
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
(function(d){function e(){if(d.browser.msie){var h=d(document).height(),l=d(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,h-l<20?l:h]}return[d(document).width(),d(document).height()]}function c(h){if(h)return h.call(d.mask)}d.tools=d.tools||{version:"@VERSION"};var a;a=d.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,
onClose:null}};var b,f,g,i,j;d.mask={load:function(h,l){if(g)return this;if(typeof h=="string")h={color:h};h=h||i;i=h=d.extend(d.extend({},a.conf),h);b=d("#"+h.maskId);if(!b.length){b=d("<div/>").attr("id",h.maskId);d("body").append(b)}var n=e();b.css({position:"absolute",top:0,left:0,width:n[0],height:n[1],display:"none",opacity:h.startOpacity,zIndex:h.zIndex});h.color&&b.css("backgroundColor",h.color);if(c(h.onBeforeLoad)===false)return this;h.closeOnEsc&&d(document).bind("keydown.mask",function(m){m.keyCode==
27&&d.mask.close(m)});h.closeOnClick&&b.bind("click.mask",function(m){d.mask.close(m)});d(window).bind("resize.mask",function(){d.mask.fit()});if(l&&l.length){j=l.eq(0).css("zIndex");d.each(l,function(){var m=d(this);/relative|absolute|fixed/i.test(m.css("position"))||m.css("position","relative")});f=l.css({zIndex:Math.max(h.zIndex+1,j=="auto"?0:j)})}b.css({display:"block"}).fadeTo(h.loadSpeed,h.opacity,function(){d.mask.fit();c(h.onLoad)});g=true;return this},close:function(){if(g){if(c(i.onBeforeClose)===
false)return this;b.fadeOut(i.closeSpeed,function(){c(i.onClose);f&&f.css({zIndex:j})});d(document).unbind("keydown.mask");b.unbind("click.mask");d(window).unbind("resize.mask");g=false}return this},fit:function(){if(g){var h=e();b.css({width:h[0],height:h[1]})}},getMask:function(){return b},isLoaded:function(){return g},getConf:function(){return i},getExposed:function(){return f}};d.fn.mask=function(h){d.mask.load(h);return this};d.fn.expose=function(h){d.mask.load(h,this);return this}})(jQuery);
(function(d){function e(b,f){var g=this,i=b.add(g),j=d(window),h,l,n,m=d.tools.expose&&(f.mask||f.expose),q=Math.random().toString().slice(10);if(m){if(typeof m=="string")m={color:m};m.closeOnClick=m.closeOnEsc=false}var r=f.target||b.attr("rel");l=r?d(r):b;if(!l.length)throw"Could not find Overlay: "+r;b&&b.index(l)==-1&&b.click(function(k){g.load(k);return k.preventDefault()});d.extend(g,{load:function(k){if(g.isOpened())return g;var p=a[f.effect];if(!p)throw'Overlay: cannot find effect : "'+f.effect+
'"';f.oneInstance&&d.each(c,function(){this.close(k)});k=k||d.Event();k.type="onBeforeLoad";i.trigger(k);if(k.isDefaultPrevented())return g;n=true;m&&d(l).expose(m);var o=f.top,t=f.left,u=l.outerWidth({margin:true}),v=l.outerHeight({margin:true});if(typeof o=="string")o=o=="center"?Math.max((j.height()-v)/2,0):parseInt(o,10)/100*j.height();if(t=="center")t=Math.max((j.width()-u)/2,0);p[0].call(g,{top:o,left:t},function(){if(n){k.type="onLoad";i.trigger(k)}});m&&f.closeOnClick&&d.mask.getMask().one("click",
g.close);f.closeOnClick&&d(document).bind("click."+q,function(s){d(s.target).parents(l).length||g.close(s)});f.closeOnEsc&&d(document).bind("keydown."+q,function(s){s.keyCode==27&&g.close(s)});return g},close:function(k){if(!g.isOpened())return g;k=k||d.Event();k.type="onBeforeClose";i.trigger(k);if(!k.isDefaultPrevented()){n=false;a[f.effect][1].call(g,function(){k.type="onClose";i.trigger(k)});d(document).unbind("click."+q).unbind("keydown."+q);m&&d.mask.close();return g}},getOverlay:function(){return l},
getTrigger:function(){return b},getClosers:function(){return h},isOpened:function(){return n},getConf:function(){return f}});d.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(k,p){d.isFunction(f[p])&&d(g).bind(p,f[p]);g[p]=function(o){d(g).bind(p,o);return g}});h=l.find(f.close||".close");if(!h.length&&!f.close){h=d('<a class="close"></a>');l.prepend(h)}h.click(function(k){g.close(k)});f.load&&g.load()}d.tools=d.tools||{version:"@VERSION"};d.tools.overlay={addEffect:function(b,
f,g){a[b]=[f,g]},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:"fast",effect:"default",fixed:!d.browser.msie||d.browser.version>6,left:"center",load:false,mask:null,oneInstance:true,speed:"normal",target:null,top:"10%"}};var c=[],a={};d.tools.overlay.addEffect("default",function(b,f){var g=this.getConf(),i=d(window);if(!g.fixed){b.top+=i.scrollTop();b.left+=i.scrollLeft()}b.position=g.fixed?"fixed":"absolute";this.getOverlay().css(b).fadeIn(g.speed,f)},function(b){this.getOverlay().fadeOut(this.getConf().closeSpeed,
b)});d.fn.overlay=function(b){var f=this.data("overlay");if(f)return f;if(d.isFunction(b))b={onBeforeLoad:b};b=d.extend(true,{},d.tools.overlay.conf,b);this.each(function(){f=new e(d(this),b);c.push(f);d(this).data("overlay",f)});return b.api?f:this}})(jQuery);
(function(d){d.fn.mqlkey=function(c){return this.each(function(){var a=d(this);if(a.is(":text")){var b=a.data("mqlkey");b&&b._destroy();b=new e(this,c);a.data("mqlkey",b)}})};var e=d.mqlkey=function(c,a){this.options=d.extend(true,{},e.defaults,a);this.input=d(c);this.original=this.input.val();this.init()};e.prototype={init:function(){var c=this;this.input.bind("keyup.mqlkey",function(a){c.textchange(a)}).bind(d.browser.msie?"paste.mqlkey":"input.mqlkey",function(a){c.textchange(a)});if(this.options.source){this.source=
d(this.options.source);this.source_generate=true;this.input.bind("change.mqlkey",function(){c.source_generate=false});this.source.bind("change.mqlkey",function(){if(c.source_generate){var a=e.from(c.source.val());c.input.val(a).trigger("keyup")}})}},_destroy:function(){this.input.unbind(".mqlkey");this.source&&this.source.unbind("change.mqlkey")},textchange:function(c){clearTimeout(this.textchange_timeout);var a=this;this.textchange_timeout=setTimeout(function(){a.textchange_delay(c)},200)},textchange_delay:function(){this.input.trigger("textchange");
var c=d.trim(this.input.val());return c===this.original&&c!==""?this.valid(c):e.reserved_word(c)?this.invalid(c,c+" is a reserved word."):e.test(c,this.options.schema)?c.length<this.options.minlen?this.invalid(c):this.options.check_key?this.check_key(c):this.valid(c):this.invalid(c)},check_key:function(c){var a=this;if(this.xhr){this.xhr.abort();this.xhr=null}var b={id:null,key:{namespace:this.options.namespace,value:c}};clearTimeout(this.check_key.timeout);this.check_key.timeout=setTimeout(function(){a.xhr=
a.options.mqlread(b,function(f){return f?a.invalid(c,"Key already exists"):a.valid(c)},function(f){return f?a.invalid(f.responseText()):a.invalid("mqlread error!")})},200)},valid:function(c){this.input.trigger("valid",c)},invalid:function(c,a){if(!a){a=this.options.minlen>1?"Key must be "+this.options.minlen+" or more alphanumeric characters":"Key must be alphanumeric";a+=", lowercase, begin with a letter and not end with a non-alphanumeric character. Underscores are allowed but not consecutively."}this.input.trigger("invalid",
a)}};d.extend(e,{defaults:{minlen:1,check_key:true,namespace:"/",mqlread:function(c,a,b){return e.mqlread(null,c,a,b)},source:null,schema:false},mqlread:function(c,a,b,f){c={url:c||"http://api.freebase.com/api/service/mqlread",data:{query:JSON.stringify({query:a})},dataType:"jsonp",success:function(g){return b(g.result)},error:f};return d.ajax(c)},from:function(c){c=c.toLowerCase();c=c.replace(/[^a-z0-9]/g,"_");c=c.replace(/\_\_+/g,"_");c=c.replace(/[^a-z0-9]+$/,"");c=c.replace(/^[^a-z]+/,"");if(e.reserved_word(c))c=
"x_"+c;return c},reservedwords:"meta typeguid left right datatype scope attribute relationship property link class future update insert delete replace create destroy default sort limit offset optional pagesize cursor index !index for while as in is if else return count function read write select var connect this self super xml sql mql any all macro estimate-count",typeonlywords:"guid id object domain name key type keys value timestamp creator permission namespace unique schema reverse",_reserved_word:null,
reserved_word:function(c){if(!e._reserved_word){e._reserved_word={};d.each([e.reservedwords,e.typeonlywords],function(a,b){d.each(b.split(" "),function(f,g){e._reserved_word[g]=1})})}return e._reserved_word[c]===1},fast:/^[A-Za-z0-9](?:[_-]?[A-Za-z0-9])*$/,slow:/^(?:[A-Za-z0-9]|\$[A-F0-9]{4})(?:[_-]?[A-Za-z0-9]|[_-]?\$[A-F0-9]{4})*$/,schema:/^[a-z](?:_?[a-z0-9])*$/,test:function(c,a){if(a)return e.schema.test(c);return e.fast.test(c)||e.slow.test(c)}})})(jQuery);
(function(d,e){e.require("dojo.date.stamp");e.require("dojo.date.locale");e.require("dojo.number");d.fn.validate_input=function(a){return this.each(function(){var b=d(this);if(b.is(":text")){var f=b.data("$.validate_input");f&&f._destroy();f=new c(this,a);b.data("$.validate_input",f)}})};var c=d.validate_input=function(a,b){var f=this.options=d.extend(true,{},c.defaults,b);if(typeof f.validator!=="function")throw"A validator is required";if(!f.lang)f.lang="/lang/en";f.lang=f.lang==="/lang/en"?["lang/en"]:
[f.lang,"/lang/en"];f.locales=[];d.each(f.lang,function(i,j){f.locales[i]=e.i18n.normalizeLocale(j.split("/").pop())});this.input=d(a);this.init();var g=this;this.input.bind("remove",function(){g._destroy()});return this};c.prototype={init:function(){var a=this;this.input.bind("keyup.validate_input",function(b){a.textchange(b)}).bind(d.browser.msie?"paste.validate_input":"input.validate_input",function(b){a.textchange(b)}).bind("keypress.validate_input",function(b){b.keyCode===13&&a.validate(true)}).bind("blur.validate_input",
function(){a.validate(true)})},_destroy:function(){this.input.unbind(".validate_input")},valid:function(a){this.input.trigger("valid",a)},invalid:function(a,b){this.input.trigger("invalid",b)},empty:function(){this.input.trigger("empty")},textchange:function(){clearTimeout(this.textchange_timeout);var a=this;this.textchange_timeout=setTimeout(function(){a.validate()},200)},validate:function(a){a&&clearTimeout(this.textchange_timeout);a=this.options;var b=d.trim(this.input.val());if(b==="")return this.empty();
try{return this.valid(a.validator(b,a))}catch(f){return this.invalid(b,""+f)}}};d.extend(c,{defaults:{validator:function(a){return{text:a,value:a}}},log:function(){},invalid:function(a,b,f,g){throw new Error("Invalid "+f+(g?": "+g:""));},text:function(a,b){if(a.lengh>4096)return this.invalid(a,b,type,"Text too long");return{text:a,value:a}},topic:function(){return c.defaults.validator},enumerated:function(){return c.defaults.validator},"boolean":function(){return c.defaults.validator},uri:function(a,
b){var f=c.uri.regex;if(!f)f=c.uri.regex=/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
if(f.test(a))return{text:a,value:a};return c.invalid(a,b,"uri")},"int":function(a,b){return c.number.parse(a,b,false)},"float":function(a,b){return c.number.parse(a,b,true)},number:function(a,b,f){return c.number.parse(a,b,f)},datetime:function(a,b){return c.datetime.parse(a,b)},mqlkey:function(a,b){var f=c.mqlkey.regex;if(!f)f=c.mqlkey.regex=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;if(f.test(a))return{text:a,value:a};return c.invalid(a,b,"mqlkey")}});d.extend(c.number,{parse:function(a,b,f){var g=b&&b.locales||
["en"],i,j;i=0;for(j=g.length;i<j;i++){var h=g[i];b=e.number.parse(a,{locale:h});if(!isNaN(b)){a={};if(f){a.value=b;a.text=e.number.format(b,{locale:h})}else{a.value=e.number.round(b,0);a.text=e.number.format(a.value,{locale:h})}return a}}throw c.invalid("number",a);}});d.extend(c.datetime,{formats:["yyyy",["dateFormatItem-y"],"yyyy-MM",["dateFormatItem-yM","dateFormatItem-yMMM"],"yyyy-MM-dd",["dateFormat-short","dateFormat-medium","dateFormat-long"]],parse:function(a,b){if(!e.date.stamp._isoRegExp)e.date.stamp._isoRegExp=
/^(?:(-?\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;var f=e.date.stamp.fromISOString(a);if(f)return{text:a,value:a,date:f};var g=b&&b.locales||["en"],i,j,h,l,n,m;i=0;for(j=g.length;i<j;i++){var q=g[i],r=e.date.locale._getGregorianBundle(q);h=0;for(l=c.datetime.formats.length;h<l;h+=2){var k=c.datetime.formats[h],p=c.datetime.formats[h+1];n=0;for(m=p.length;n<m;n++){var o=r[p[n]];if(o){o=i18n.normalize_pattern(o);try{f=e.date.locale.parse(a,
{datePattern:o,selector:"date",locale:q});return{text:a,value:e.date.locale.format(f,{datePattern:k,selector:"date"}),date:f}}catch(t){}}}}}throw c.invalid("datetime",a);}})})(jQuery,dojo);
(function(d){d.fn.data_input=function(e){return this.each(function(){var c=d(this),a=c.data("$.data_input");a&&a._destroy();a=new d.data_input(this,e);c.data("$.data_input",a)})};d.data_input=function(e,c){this.options=d.extend(true,{},c);this.container=d(e);this.metadata=this.container.metadata();this.input=d(":input",this.container);this.init();var a=this;this.input.bind("remove",function(){a._destroy()})};d.data_input.prototype={init:function(){var e=this,c=this.container,a=this.input,b=this.options;
a.bind("focusin.data_input",function(){e.container.addClass("focus")}).bind("focusout.data_input",function(){e.container.removeClass("focus")}).bind("valid.data_input",function(g,i){function j(){e.container.data("data",h);e.container.removeClass("error").addClass("valid");e.container.trigger("valid")}var h={name:e.input.attr("name")};if(i.id)h.id=i.id;else if(i.create_new){h.create_new=i.create_new;h.lang=e.metadata.lang||b.lang}else{h.value=i.value;if(e.metadata.type==="/type/text")h.lang=e.metadata.lang||
b.lang}i.id&&e.metadata.type&&e.options.incompatible_types?e.options.incompatible_types.check(i.id,e.metadata.type,j,e.options.incompatible_types.inline_suggest_incompatible_callback(e.input,j)):j()}).bind("invalid.data_input",function(){e.container.removeData("data");e.container.removeClass("valid").addClass("error");e.container.trigger("invalid")}).bind("empty.data_input",function(){var g={name:e.input.attr("name")};if(e.metadata&&e.metadata.lang)g.lang=e.metadata.lang;e.container.data("data",g);
e.container.removeClass("valid").removeClass("error");e.container.trigger("empty")}).bind("keypress.data_input",function(g){g.keyCode===13&&!g.isDefaultPrevented()&&e.container.trigger("submit")}).bind("keyup.data_input",function(g){g.keyCode===27&&e.container.trigger("cancel")});if(c.is(".topic")){c=e.metadata.type;var f=null;if(b.suggest_impl)f=b.suggest_impl.instance(c,true,e.metadata&&e.metadata.lang||b.lang);a.validate_topic(f).bind("valid.data_input",function(g,i){e.fb_select(i)}).bind("invalid.data_input",
function(){e.fb_textchange()});if(this.metadata&&this.metadata.id){a.data("data.suggest",this.metadata);this.validate()}}else if(c.is(".text"))a.validate_input({validator:d.validate_input.text});else if(c.is(".datetime"))a.validate_input({validator:d.validate_input.datetime,lang:b.lang});else if(c.is(".enumerated")){a.validate_enumerated().bind("valid.data_input",function(g,i){e.fb_select(i)}).bind("invalid.data_input",function(){e.fb_textchange()});this.metadata&&this.metadata.id&&this.validate()}else if(c.is(".int"))a.validate_input({validator:d.validate_input["int"],
lang:b.lang});else if(c.is(".float"))a.validate_input({validator:d.validate_input["float"],lang:b.lang});else if(c.is(".uri"))a.validate_input({validator:d.validate_input.uri});else if(c.is(".boolean"))a.validate_boolean();else if(c.is(".enumeration"))a.validate_input({validator:d.validate_input.mqlkey});else if(c.is(".rawstring"))a.validate_input({validator:d.validate_input.text});else throw new Error("Invalid data-input: "+c.attr("class"));},_destroy:function(){this.input.unbind(".data_input")},
validate:function(){var e=this.input;d.each(["$.validate_topic","$.validate_input","$.validate_enumerated","$.validate_boolean"],function(c,a){var b=e.data(a);if(b){b.validate(true);return false}})},reset:function(){this.container.removeData("data");if(this.input.is(":text"))this.input.val("");else if(this.input.is("select"))this.input[0].selectedIndex=0;else this.input.is(":radio")&&this.input.each(function(){this.checked=false})},fb_textchange:function(){},fb_select:function(){},ajax_beforeSend:function(e){if(!this.xhr_queue)this.xhr_queue=
[];this.xhr_queue.push(e);this.container.trigger("loading")},ajax_complete:function(e){if(!this.xhr_queue)this.xhr_queue=[];for(var c=0,a=this.xhr_queue.length;c<a;c++)if(e===this.xhr_queue[c]){this.xhr_queue.splice(c,1);break}this.xhr_queue.length===0&&this.container.trigger("loading_complete")}};d.fn.validate_topic=function(e){return this.each(function(){var c=d(this);if(c.is(":text")){var a=c.data("$.validate_topic");a&&a._destroy();a=new d.validate_topic(this,e);c.data("$.validate_topic",a)}})};
d.validate_topic=function(e,c){this.options=d.extend(true,{},c);this.input=d(e);this.init()};d.validate_topic.prototype={init:function(){var e=this;this.input.suggest(this.options).bind("fb-textchange.validate_topic",function(){e.input.val()===""?e.empty():e.invalid()}).bind("fb-select.validate_topic",function(c,a){e.input.val(a.name!=null?a.name:a.id);e.valid(a)}).bind("fb-select-new.validate_topic",function(c,a){e.valid(a)})},invalid:function(){this.input.trigger("invalid")},valid:function(e){if(typeof e===
"string")e={create_new:e};this.input.trigger("valid",e)},empty:function(){this.input.trigger("empty")},_destroy:function(){this.input.unbind(".validate_topic")},validate:function(){if(this.input.val()==="")this.empty();else{var e=this.input.data("data.suggest");e?this.valid(e):this.invalid()}}};d.fn.validate_enumerated=function(e){return this.each(function(){var c=d(this);if(c.is("select")){var a=c.data("$.validate_enumerated");a&&a._destroy();a=new d.validate_enumerated(this,e);c.data("$.validate_enumerated",
a)}})};d.validate_enumerated=function(e,c){this.options=d.extend(true,{},c);this.input=d(e);this.init()};d.validate_enumerated.prototype={init:function(){var e=this;this.input.bind("change.validate_enumerated, keypress.validate_enumerated",function(){this.selectedIndex===0?e.empty():e.valid({text:d(":selected",this).text(),id:this.value})})},invalid:function(){this.input.trigger("invalid")},valid:function(e){this.input.trigger("valid",e);this.input.trigger("fb-select",e)},empty:function(){this.input.trigger("empty")},
_destroy:function(){this.input.unbind(".validate_enumerated")},validate:function(){var e=this.input[0];e.selectedIndex>0?this.valid({text:d(":selected",this.input).text(),id:e.value}):this.empty()}};d.fn.validate_boolean=function(e){var c,a;this.each(function(){var f=d(this);if(f.is(":radio"))if(f.val().toLowerCase()==="true")c=f;else if(f.val().toLowerCase()==="false")a=f});if(c&&a){var b=c.data("$.validate_boolean");b&&b._destroy();b=new d.validate_boolean(c,a,e);c.data("$.validate_boolean",b)}return this};
d.validate_boolean=function(e,c,a){this.options=d.extend(true,{},a);this.tradio=e;this.fradio=c;this.input=this.tradio;this.init()};d.validate_boolean.prototype={init:function(){var e=this;this.tradio.bind("change.validate_boolean",function(){e.validate()})},_destroy:function(){this.input.unbind(".validate_boolean")},valid:function(e){this.input.trigger("valid",e)},empty:function(){this.input.trigger("empty")},validate:function(){if(this.tradio.is(":checked"))this.valid({text:this.tradio.text(),value:true});
else this.fradio.is(":checked")?this.valid({text:this.fradio.text(),value:false}):this.empty()}}})(jQuery);
(function(d,e){var c=window.formlib={init:function(a){var b=a.event_prefix||"form.";a.form.bind(b+"submit",function(){c.submit(a)}).bind(b+"cancel",function(){c.cancel(a)}).bind(b+"error",function(f,g){c.error(a,g);a.form.removeClass("loading")}).bind(b+"success",function(){a.form.removeClass("loading")}).bind(b+"valid",function(){c.enable_submit(a)}).bind(b+"invalid",function(){c.disable_submit(a)});c.init_submit_cancel(a);a.init(a)},submit:function(a){if(!a.form.is(".loading"))if(c.is_submit_enabled(a)){document.activeElement&&
d(document.activeElement).blur();c.clear_message(a);if(a.validate(a)){a.form.addClass("loading");a.submit(a,c.default_submit_ajax_options(a))}}},cancel:function(){},init_inline_add_form:function(a){var b=a.event_prefix||"form.inline_add_form.";a.edit_row.bind(b+"submit",function(){c.submit_inline_add_form(a)}).bind(b+"cancel",function(){c.cancel_inline_add_form(a)}).bind(b+"error",function(f,g){c.error(a,g);a.edit_row.removeClass("loading")}).bind(b+"success",function(){a.edit_row.removeClass("loading")}).bind(b+
"valid",function(){c.enable_submit(a)}).bind(b+"invalid",function(){c.disable_submit(a)});c.init_submit_cancel(a);a.trigger&&a.trigger.parents(".trigger-row:first").hide();a.body.append(a.head_row).append(a.edit_row).append(a.submit_row);a.init(a)},submit_inline_add_form:function(a){if(!a.edit_row.is(".loading"))if(c.is_submit_enabled(a)){document.activeElement&&d(document.activeElement).blur();c.clear_message(a);if(a.validate(a)){a.edit_row.addClass("loading");a.submit(a,c.default_submit_ajax_options(a))}}},
success_inline_add_form:function(a,b){a.head_row.before(b);e.ize(b);a.reset(a);a.edit_row.trigger(a.event_prefix+"success")},cancel_inline_add_form:function(a){a.head_row.remove();a.edit_row.remove();a.submit_row.remove();a.trigger&&a.trigger.parents(".trigger-row:first").show()},init_inline_edit_form:function(a){var b=a.event_prefix||"form.inline_edit_form.";a.edit_row.bind(b+"submit",function(){c.submit_inline_edit_form(a)}).bind(b+"cancel",function(){c.cancel_inline_edit_form(a)}).bind(b+"error",
function(f,g){c.error(a,g);a.edit_row.removeClass("loading")}).bind(b+"success",function(){a.edit_row.removeClass("loading")}).bind(b+"valid",function(){c.enable_submit(a)}).bind(b+"invalid",function(){c.disable_submit(a)});c.init_submit_cancel(a);a.row.hide();a.row.before(a.head_row).before(a.edit_row).before(a.submit_row);a.init(a)},submit_inline_edit_form:function(a){if(!a.edit_row.is(".loading"))if(c.is_submit_enabled(a)){document.activeElement&&d(document.activeElement).blur();c.clear_message(a);
if(a.validate(a)){a.edit_row.addClass("loading");a.submit(a,c.default_submit_ajax_options(a))}}},success_inline_edit_form:function(a,b){a.row.replaceWith(b);a.row=b;e.ize(b);a.edit_row.trigger(a.event_prefix+"cancel")},cancel_inline_edit_form:function(a){a.head_row.remove();a.edit_row.remove();a.submit_row.remove();a.row.show()},success_inline_delete:function(a,b,f){a.hide().addClass("old-row");a.after(b);b.append(a);if(f){a=d('<a href="#">Undo</a>');d(".msg-default",b).next().append(a);a.click(function(){f();
return false})}},success_inline_delete_undo:function(a){var b=d(".old-row",a);a.before(b);b.show().removeClass("old-row");a.remove()},init_modal_form:function(a){d(document.body).append(a.form.hide());var b=a.event_prefix||"form.modal_form.";a.form.bind(b+"submit",function(){c.submit_modal_form(a)}).bind(b+"cancel",function(){c.cancel_modal_form(a)}).bind(b+"error",function(f,g){c.error(a,g);a.form.removeClass("loading")}).bind(b+"success",function(){a.form.removeClass("loading")}).bind(b+"valid",
function(){c.enable_submit(a)}).bind(b+"invalid",function(){c.disable_submit(a)});c.init_submit_cancel(a);a.form.overlay({close:".modal-buttons .cancel",closeOnClick:false,load:true,fixed:false,mask:{color:"#000",loadSpeed:200,opacity:0.5},onLoad:function(){a.overlay=this;a.init(a)}})},submit_modal_form:function(a){if(!a.form.is(".loading"))if(c.is_submit_enabled(a)){document.activeElement&&d(document.activeElement).blur();c.clear_message(a);if(a.validate(a)){a.form.addClass("loading");a.submit(a,
c.default_submit_ajax_options(a))}}},cancel_modal_form:function(a){a.form.data("overlay").close()},init_submit_cancel:function(a){var b=a.form||a.edit_row,f=a.form||a.submit_row,g=a.event_prefix;a=d(".save",f).click(function(){b.trigger(g+"submit")});c.disable(a);d(".cancel",f).click(function(){b.trigger(g+"cancel")});d(":input",b).keypress(function(i){i.keyCode===13&&!i.isDefaultPrevented()&&b.trigger(g+"submit")}).keyup(function(i){i.keyCode===27&&b.trigger(g+"cancel")})},disable:function(a){d(a).attr("disabled",
"disabled").addClass("disabled")},enable:function(a){d(a).removeAttr("disabled").removeClass("disabled")},disable_submit:function(a){c.disable(d(".save",a.form||a.submit_row))},enable_submit:function(a){c.enable(d(".save",a.form||a.submit_row))},is_submit_enabled:function(a){return!d(".save",a.form||a.submit_row).is(":disabled")},init_mqlkey:function(a,b){return a.next(".key-status").removeClass("valid invalid loading").text("").removeAttr("title").end().mqlkey(b).bind("valid",function(){d(this).next(".key-status").removeClass("invalid loading").addClass("valid").text("valid").attr("title",
"Key is available")}).bind("invalid",function(f,g){d(this).next(".key-status").removeClass("valid loading").addClass("invalid").text("invalid").attr("title",g)}).bind("textchange",function(){d(this).next(".key-status").removeClass("valid invalid").text("loading").addClass("loading")})},validate_mqlkey:function(a,b){var f=b.next(".key-status"),g=b.val();if(g===""){b.trigger(a.event_prefix+"error","Key is required");return false}if(g===b.data("mqlkey").original)return true;if(f.is(".invalid")){b.trigger(a.event_prefix+
"error",f.attr("title"));return false}else if(f.is(".loading"))return false;return true},error:function(a,b){c.disable_submit(a);return c.message(a,b,"error")},message:function(a,b,f){var g=a.head_row;if(!g&&a.form)g=d(".row-msg",a.form);if(g&&g.length){g.find(".close-msg").css("visibility","visible").next().find(".msg-default").hide().next().text(b);g.addClass("row-msg");f&&g.addClass("row-msg-"+f)}},clear_message:function(){},default_begin_ajax_options:function(){return c._default_ajax_options("GET")},
default_submit_ajax_options:function(a){var b=c._default_ajax_options("POST");if(a){d.extend(b,a.ajax);d("input[type=hidden]",a.submit_row||a.form).each(function(){b.data[this.name]=this.value})}return b},_default_ajax_options:function(a){return{data:{},dataType:"json",type:a||"GET",success:function(b,f,g){if(!c.check_ajax_success.apply(this,arguments))return this._error.apply(this,[g]);this.onsuccess&&this.onsuccess.apply(this,arguments)},error:function(){c.check_ajax_error.apply(this,arguments);
return this._error.apply(this,arguments)},_error:function(b){if(b.status===401)d(window).trigger("fb.user.unauthorized");else if(this.onerror)this.onerror.apply(this,[b.responseText].concat(Array.prototype.slice.call(arguments)));else{var f={},g=this;d.each(["url","data","dataType","type"],function(i,j){f[j]=g[j]});d.each(["status","statusText","responseText"],function(i,j){f[j]=b[j]});f.responseHeaders=b.getAllResponseHeaders()}}}},check_ajax_success:function(){return c.check_api_response.apply(this,
arguments)},check_ajax_error:function(a){var b=a.responseText;try{b=JSON.stringify(b)}catch(f){}return c.check_api_response.apply(this,[b,a.statusText,a])},check_api_response:function(a,b,f){if(typeof a==="object"){if(a.code!=="/api/status/ok")return false}else if(f.status!==200)return false;return true}}})(jQuery,window.i18n);
(function(d,e,c){e.topic.manage_type={add_type_begin:function(a,b){d.ajax(d.extend(c.default_submit_ajax_options(),{url:e.h.ajax_url("add_type_submit.ajax"),data:{id:e.c.id,type:b,lang:e.h.lang_code(e.lang)},onsuccess:function(f){var g=d(f.result.html).hide();d(".manage-types").after(g);g.fadeIn();if(f=f.result.list){f=d(f);f=d("li",f).hide();d(".topic-type-list ul").prepend(f);f.fadeIn()}a.removeClass("editing").focus().select()}}))},remove_type_begin:function(a,b){d.ajax(d.extend(c.default_submit_ajax_options(),
{url:e.h.ajax_url("remove_type_submit.ajax"),data:{id:e.c.id,type:b,lang:e.h.lang_code(e.lang)},onsuccess:function(f){d(".type-section[data-id="+b.replace(/\//g,"\\/")+"]").fadeOut();var g=a.parent("li");f=d(f.result.html);g.hide().before(f);a.removeClass("editing").focus().select()}}))},undo_remove_type:function(a,b){d.ajax(d.extend(c.default_submit_ajax_options(),{url:e.h.ajax_url("undo_remove_type.ajax"),data:{id:e.c.id,type:b},onsuccess:function(){d(".type-section[data-id="+b.replace(/\//g,"\\/")+
"]").fadeIn();d(a).parents("li.remove-type-result").hide().next("li:hidden").show().end().remove()}}));return false}}})(jQuery,window.freebase,window.formlib);
