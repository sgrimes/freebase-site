
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
(function(d){function e(){if(d.browser.msie){var h=d(document).height(),k=d(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,h-k<20?k:h]}return[d(document).width(),d(document).height()]}function b(h){if(h)return h.call(d.mask)}d.tools=d.tools||{version:"@VERSION"};var a;a=d.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,
onClose:null}};var c,f,g,i,l;d.mask={load:function(h,k){if(g)return this;if(typeof h=="string")h={color:h};h=h||i;i=h=d.extend(d.extend({},a.conf),h);c=d("#"+h.maskId);if(!c.length){c=d("<div/>").attr("id",h.maskId);d("body").append(c)}var n=e();c.css({position:"absolute",top:0,left:0,width:n[0],height:n[1],display:"none",opacity:h.startOpacity,zIndex:h.zIndex});h.color&&c.css("backgroundColor",h.color);if(b(h.onBeforeLoad)===false)return this;h.closeOnEsc&&d(document).bind("keydown.mask",function(m){m.keyCode==
27&&d.mask.close(m)});h.closeOnClick&&c.bind("click.mask",function(m){d.mask.close(m)});d(window).bind("resize.mask",function(){d.mask.fit()});if(k&&k.length){l=k.eq(0).css("zIndex");d.each(k,function(){var m=d(this);/relative|absolute|fixed/i.test(m.css("position"))||m.css("position","relative")});f=k.css({zIndex:Math.max(h.zIndex+1,l=="auto"?0:l)})}c.css({display:"block"}).fadeTo(h.loadSpeed,h.opacity,function(){d.mask.fit();b(h.onLoad)});g=true;return this},close:function(){if(g){if(b(i.onBeforeClose)===
false)return this;c.fadeOut(i.closeSpeed,function(){b(i.onClose);f&&f.css({zIndex:l})});d(document).unbind("keydown.mask");c.unbind("click.mask");d(window).unbind("resize.mask");g=false}return this},fit:function(){if(g){var h=e();c.css({width:h[0],height:h[1]})}},getMask:function(){return c},isLoaded:function(){return g},getConf:function(){return i},getExposed:function(){return f}};d.fn.mask=function(h){d.mask.load(h);return this};d.fn.expose=function(h){d.mask.load(h,this);return this}})(jQuery);
(function(d){function e(c,f){var g=this,i=c.add(g),l=d(window),h,k,n,m=d.tools.expose&&(f.mask||f.expose),q=Math.random().toString().slice(10);if(m){if(typeof m=="string")m={color:m};m.closeOnClick=m.closeOnEsc=false}var r=f.target||c.attr("rel");k=r?d(r):c;if(!k.length)throw"Could not find Overlay: "+r;c&&c.index(k)==-1&&c.click(function(j){g.load(j);return j.preventDefault()});d.extend(g,{load:function(j){if(g.isOpened())return g;var p=a[f.effect];if(!p)throw'Overlay: cannot find effect : "'+f.effect+
'"';f.oneInstance&&d.each(b,function(){this.close(j)});j=j||d.Event();j.type="onBeforeLoad";i.trigger(j);if(j.isDefaultPrevented())return g;n=true;m&&d(k).expose(m);var o=f.top,t=f.left,u=k.outerWidth({margin:true}),v=k.outerHeight({margin:true});if(typeof o=="string")o=o=="center"?Math.max((l.height()-v)/2,0):parseInt(o,10)/100*l.height();if(t=="center")t=Math.max((l.width()-u)/2,0);p[0].call(g,{top:o,left:t},function(){if(n){j.type="onLoad";i.trigger(j)}});m&&f.closeOnClick&&d.mask.getMask().one("click",
g.close);f.closeOnClick&&d(document).bind("click."+q,function(s){d(s.target).parents(k).length||g.close(s)});f.closeOnEsc&&d(document).bind("keydown."+q,function(s){s.keyCode==27&&g.close(s)});return g},close:function(j){if(!g.isOpened())return g;j=j||d.Event();j.type="onBeforeClose";i.trigger(j);if(!j.isDefaultPrevented()){n=false;a[f.effect][1].call(g,function(){j.type="onClose";i.trigger(j)});d(document).unbind("click."+q).unbind("keydown."+q);m&&d.mask.close();return g}},getOverlay:function(){return k},
getTrigger:function(){return c},getClosers:function(){return h},isOpened:function(){return n},getConf:function(){return f}});d.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(j,p){d.isFunction(f[p])&&d(g).bind(p,f[p]);g[p]=function(o){d(g).bind(p,o);return g}});h=k.find(f.close||".close");if(!h.length&&!f.close){h=d('<a class="close"></a>');k.prepend(h)}h.click(function(j){g.close(j)});f.load&&g.load()}d.tools=d.tools||{version:"@VERSION"};d.tools.overlay={addEffect:function(c,
f,g){a[c]=[f,g]},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:"fast",effect:"default",fixed:!d.browser.msie||d.browser.version>6,left:"center",load:false,mask:null,oneInstance:true,speed:"normal",target:null,top:"10%"}};var b=[],a={};d.tools.overlay.addEffect("default",function(c,f){var g=this.getConf(),i=d(window);if(!g.fixed){c.top+=i.scrollTop();c.left+=i.scrollLeft()}c.position=g.fixed?"fixed":"absolute";this.getOverlay().css(c).fadeIn(g.speed,f)},function(c){this.getOverlay().fadeOut(this.getConf().closeSpeed,
c)});d.fn.overlay=function(c){var f=this.data("overlay");if(f)return f;if(d.isFunction(c))c={onBeforeLoad:c};c=d.extend(true,{},d.tools.overlay.conf,c);this.each(function(){f=new e(d(this),c);b.push(f);d(this).data("overlay",f)});return c.api?f:this}})(jQuery);
(function(d){d.fn.mqlkey=function(b){return this.each(function(){var a=d(this);if(a.is(":text")){var c=a.data("mqlkey");c&&c._destroy();c=new e(this,b);a.data("mqlkey",c)}})};var e=d.mqlkey=function(b,a){this.options=d.extend(true,{},e.defaults,a);this.options.jsonp=e.use_jsonp(this.options.mqlread_url);this.input=d(b);this.original=this.input.val();this.init()};e.prototype={init:function(){var b=this;this.input.bind("keyup.mqlkey",function(a){b.textchange(a)}).bind(d.browser.msie?"paste.mqlkey":
"input.mqlkey",function(a){b.textchange(a)});if(this.options.source){this.source=d(this.options.source);this.source_generate=true;this.input.bind("change.mqlkey",function(){b.source_generate=false});this.source.bind("change.mqlkey",function(){if(b.source_generate){var a=e.from(b.source.val());b.input.val(a).trigger("keyup")}})}},_destroy:function(){this.input.unbind(".mqlkey");this.source&&this.source.unbind("change.mqlkey")},textchange:function(b){clearTimeout(this.textchange_timeout);var a=this;
this.textchange_timeout=setTimeout(function(){a.textchange_delay(b)},200)},textchange_delay:function(){this.input.trigger("textchange");var b=d.trim(this.input.val());return b===this.original&&b!==""?this.valid(b):e.reserved_word(b)?this.invalid(b,b+" is a reserved word."):e.test(b,this.options.schema)?b.length<this.options.minlen?this.invalid(b):this.options.check_key?this.check_key(b):this.valid(b):this.invalid(b)},check_key:function(b){var a=this;if(this.xhr){this.xhr.abort();this.xhr=null}var c=
{query:'{"query": {"id": null, "key": {"namespace": "'+this.options.namespace+'", "value": "'+b+'"}}}'};clearTimeout(this.check_key.timeout);var f={url:this.options.mqlread_url,data:c,success:function(g){if(g.code==="/api/status/ok")return g.result?a.invalid(b,"Key already exists"):a.valid(b)},error:function(g){if(g)return a.invalid(g.responseText())},dataType:a.options.jsonp?"jsonp":"json"};this.check_key.timeout=setTimeout(function(){a.ac_xhr=d.ajax(f)},200)},valid:function(b){this.input.trigger("valid",
b)},invalid:function(b,a){if(!a){a=this.options.minlen>1?"Key must be "+this.options.minlen+" or more alphanumeric characters":"Key must be alphanumeric";a+=", lowercase, begin with a letter and not end with a non-alphanumeric character. Underscores are allowed but not consecutively."}this.input.trigger("invalid",a)}};d.extend(e,{defaults:{minlen:1,check_key:true,namespace:"/",mqlread_url:"http://api.freebase.com/api/service/mqlread",source:null,schema:false},use_jsonp:function(b){if(!b)return false;
var a=window.location.href;a=a.substr(0,a.length-window.location.pathname.length);if(a===b)return false;return true},from:function(b){b=b.toLowerCase();b=b.replace(/[^a-z0-9]/g,"_");b=b.replace(/\_\_+/g,"_");b=b.replace(/[^a-z0-9]+$/,"");b=b.replace(/^[^a-z]+/,"");if(e.reserved_word(b))b="x_"+b;return b},reservedwords:"meta typeguid left right datatype scope attribute relationship property link class future update insert delete replace create destroy default sort limit offset optional pagesize cursor index !index for while as in is if else return count function read write select var connect this self super xml sql mql any all macro estimate-count",
typeonlywords:"guid id object domain name key type keys value timestamp creator permission namespace unique schema reverse",_reserved_word:null,reserved_word:function(b){if(!e._reserved_word){e._reserved_word={};d.each([e.reservedwords,e.typeonlywords],function(a,c){d.each(c.split(" "),function(f,g){e._reserved_word[g]=1})})}return e._reserved_word[b]===1},fast:/^[A-Za-z0-9](?:[_-]?[A-Za-z0-9])*$/,slow:/^(?:[A-Za-z0-9]|\$[A-F0-9]{4})(?:[_-]?[A-Za-z0-9]|[_-]?\$[A-F0-9]{4})*$/,schema:/^[a-z](?:_?[a-z0-9])*$/,
test:function(b,a){if(a)return e.schema.test(b);return e.fast.test(b)||e.slow.test(b)}})})(jQuery);
(function(d,e){e.require("dojo.date.stamp");e.require("dojo.date.locale");e.require("dojo.number");d.fn.validate_input=function(a){return this.each(function(){var c=d(this);if(c.is(":text")){var f=c.data("$.validate_input");f&&f._destroy();f=new b(this,a);c.data("$.validate_input",f)}})};var b=d.validate_input=function(a,c){var f=this.options=d.extend(true,{},b.defaults,c);if(typeof f.validator!=="function")throw"A validator is required";if(!f.lang)f.lang="/lang/en";f.lang=f.lang==="/lang/en"?["lang/en"]:
[f.lang,"/lang/en"];f.locales=[];d.each(f.lang,function(i,l){f.locales[i]=e.i18n.normalizeLocale(l.split("/").pop())});this.input=d(a);this.init();var g=this;this.input.bind("remove",function(){g._destroy()});return this};b.prototype={init:function(){var a=this;this.input.bind("keyup.validate_input",function(c){a.textchange(c)}).bind(d.browser.msie?"paste.validate_input":"input.validate_input",function(c){a.textchange(c)}).bind("keypress.validate_input",function(c){c.keyCode===13&&a.validate(true)}).bind("blur.validate_input",
function(){a.validate(true)})},_destroy:function(){this.input.unbind(".validate_input")},valid:function(a){this.input.trigger("valid",a)},invalid:function(a,c){this.input.trigger("invalid",c)},empty:function(){this.input.trigger("empty")},textchange:function(){clearTimeout(this.textchange_timeout);var a=this;this.textchange_timeout=setTimeout(function(){a.validate()},200)},validate:function(a){a&&clearTimeout(this.textchange_timeout);a=this.options;var c=d.trim(this.input.val());if(c==="")return this.empty();
try{return this.valid(a.validator(c,a))}catch(f){return this.invalid(c,""+f)}}};d.extend(b,{defaults:{validator:function(a){return{text:a,value:a}}},log:function(){},invalid:function(a,c,f,g){throw new Error("Invalid "+f+(g?": "+g:""));},text:function(a,c){if(a.lengh>4096)return this.invalid(a,c,type,"Text too long");return{text:a,value:a}},topic:function(){return b.defaults.validator},enumerated:function(){return b.defaults.validator},"boolean":function(){return b.defaults.validator},uri:function(a,
c){var f=b.uri.regex;if(!f)f=b.uri.regex=/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
if(f.test(a))return{text:a,value:a};return b.invalid(a,c,"uri")},"int":function(a,c){return b.number.parse(a,c,false)},"float":function(a,c){return b.number.parse(a,c,true)},number:function(a,c,f){return b.number.parse(a,c,f)},datetime:function(a,c){return b.datetime.parse(a,c)},mqlkey:function(a,c){var f=b.mqlkey.regex;if(!f)f=b.mqlkey.regex=/^[A-Za-z0-9][A-Za-z0-9_-]*$/;if(f.test(a))return{text:a,value:a};return b.invalid(a,c,"mqlkey")}});d.extend(b.number,{parse:function(a,c,f){var g=c&&c.locales||
["en"],i,l;i=0;for(l=g.length;i<l;i++){var h=g[i];c=e.number.parse(a,{locale:h});if(!isNaN(c)){a={};if(f){a.value=c;a.text=e.number.format(c,{locale:h})}else{a.value=e.number.round(c,0);a.text=e.number.format(a.value,{locale:h})}return a}}throw b.invalid("number",a);}});d.extend(b.datetime,{formats:["yyyy",["dateFormatItem-y"],"yyyy-MM",["dateFormatItem-yM","dateFormatItem-yMMM"],"yyyy-MM-dd",["dateFormat-short","dateFormat-medium","dateFormat-long"]],parse:function(a,c){if(!e.date.stamp._isoRegExp)e.date.stamp._isoRegExp=
/^(?:(-?\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;var f=e.date.stamp.fromISOString(a);if(f)return{text:a,value:a,date:f};var g=c&&c.locales||["en"],i,l,h,k,n,m;i=0;for(l=g.length;i<l;i++){var q=g[i],r=e.date.locale._getGregorianBundle(q);h=0;for(k=b.datetime.formats.length;h<k;h+=2){var j=b.datetime.formats[h],p=b.datetime.formats[h+1];n=0;for(m=p.length;n<m;n++){var o=r[p[n]];if(o){o=i18n.normalize_pattern(o);try{f=e.date.locale.parse(a,
{datePattern:o,selector:"date",locale:q});return{text:a,value:e.date.locale.format(f,{datePattern:j,selector:"date"}),date:f}}catch(t){}}}}}throw b.invalid("datetime",a);}})})(jQuery,dojo);
(function(d){d.fn.data_input=function(e){return this.each(function(){var b=d(this),a=b.data("$.data_input");a&&a._destroy();a=new d.data_input(this,e);b.data("$.data_input",a)})};d.data_input=function(e,b){this.options=d.extend(true,{},d.data_input.defaults,b);this.container=d(e);this.metadata=this.container.metadata();this.input=d(":input",this.container);this.init();var a=this;this.input.bind("remove",function(){a._destroy()})};d.data_input.prototype={init:function(){var e=this,b=this.container,
a=this.input,c=this.options;a.bind("focusin.data_input",function(){e.container.addClass("focus")}).bind("focusout.data_input",function(){e.container.removeClass("focus")}).bind("valid.data_input",function(f,g){var i={name:e.input.attr("name")};if(g.id)i.id=g.id;else{i.value=g.value;if(e.metadata.type==="/type/text")i.lang=e.metadata.lang||c.lang}e.container.data("data",i);e.container.removeClass("error").addClass("valid");e.container.trigger("valid")}).bind("invalid.data_input",function(){e.container.removeData("data");
e.container.removeClass("valid").addClass("error");e.container.trigger("invalid")}).bind("empty.data_input",function(){var f={name:e.input.attr("name")};if(e.metadata&&e.metadata.lang)f.lang=e.metadata.lang;e.container.data("data",f);e.container.removeClass("valid").removeClass("error");e.container.trigger("empty")}).bind("keypress.data_input",function(f){f.keyCode===13&&!f.isDefaultPrevented()&&e.container.trigger("submit")}).bind("keyup.data_input",function(f){f.keyCode===27&&e.container.trigger("cancel")});
if(b.is(".topic")){b=d.extend(true,{},c.suggest,d.data_input.suggest_options(e.metadata.type));a.validate_topic(b).bind("valid.data_input",function(f,g){e.fb_select(g)}).bind("invalid.data_input",function(){e.fb_textchange()});if(this.metadata&&this.metadata.id){a.data("data.suggest",this.metadata);this.validate()}}else if(b.is(".text"))a.validate_input({validator:d.validate_input.text});else if(b.is(".datetime"))a.validate_input({validator:d.validate_input.datetime,lang:c.lang});else if(b.is(".enumerated")){a.validate_enumerated().bind("valid.data_input",
function(f,g){e.fb_select(g)}).bind("invalid.data_input",function(){e.fb_textchange()});this.metadata&&this.metadata.id&&this.validate()}else if(b.is(".int"))a.validate_input({validator:d.validate_input["int"],lang:c.lang});else if(b.is(".float"))a.validate_input({validator:d.validate_input["float"],lang:c.lang});else if(b.is(".uri"))a.validate_input({validator:d.validate_input.uri});else if(b.is(".boolean"))a.validate_boolean();else if(b.is(".enumeration"))a.validate_input({validator:d.validate_input.mqlkey});
else if(b.is(".rawstring"))a.validate_input({validator:d.validate_input.text});else throw new Error("Invalid data-input: "+b.attr("class"));},_destroy:function(){this.input.unbind(".data_input")},validate:function(){var e=this.input;d.each(["$.validate_topic","$.validate_input","$.validate_enumerated","$.validate_boolean"],function(b,a){var c=e.data(a);if(c){c.validate(true);return false}})},reset:function(){this.container.removeData("data");if(this.input.is(":text"))this.input.val("");else if(this.input.is("select"))this.input[0].selectedIndex=
0;else this.input.is(":radio")&&this.input.each(function(){this.checked=false})},fb_textchange:function(){},fb_select:function(){},ajax_beforeSend:function(e){if(!this.xhr_queue)this.xhr_queue=[];this.xhr_queue.push(e);this.container.trigger("loading")},ajax_complete:function(e){if(!this.xhr_queue)this.xhr_queue=[];for(var b=0,a=this.xhr_queue.length;b<a;b++)if(e===this.xhr_queue[b]){this.xhr_queue.splice(b,1);break}this.xhr_queue.length===0&&this.container.trigger("loading_complete")}};d.extend(d.data_input,
{defaults:{suggest:{service_url:"http://www.freebase.com",service_path:"/private/suggest",flyout_service_url:"http://www.freebase.com",flyout_service_path:"/private/flyout",mqlread_url:"http://api.freebase.com/api/service/mqlread",category:"object",type:"/common/topic"}},is_metaweb_system_type:function(e){return e.indexOf("/type/")===0||e.indexOf("/common/")===0&&e!=="/common/topic"||e.indexOf("/freebase/")===0&&e.indexOf("_profile")===e.length-8},suggest_options:function(e){var b={category:"instance",
type:e,type_strict:d.data_input.is_metaweb_system_type(e)?"any":"should"},a=["any","type:"+e,"without:fus","without:inst"];d.each(["user","domain","type"],function(c,f){if(e==="/freebase/"+f+"_profile"){a.push("type:/type/"+f);return false}});e==="/book/book_subject"&&a.push("type:/base/skosbase/skos_concept");b.filter="("+a.join(" ")+")";return b}});d.fn.validate_topic=function(e){return this.each(function(){var b=d(this);if(b.is(":text")){var a=b.data("$.validate_topic");a&&a._destroy();a=new d.validate_topic(this,
e);b.data("$.validate_topic",a)}})};d.validate_topic=function(e,b){this.options=d.extend(true,{},b);this.input=d(e);this.init()};d.validate_topic.prototype={init:function(){var e=this;this.input.suggest(this.options).bind("fb-textchange.validate_topic",function(){e.input.val()===""?e.empty():e.invalid()}).bind("fb-select.validate_topic",function(b,a){e.input.val(a.name!=null?a.name:a.id);e.valid(a)})},invalid:function(){this.input.trigger("invalid")},valid:function(e){this.input.trigger("valid",e)},
empty:function(){this.input.trigger("empty")},_destroy:function(){this.input.unbind(".validate_topic")},validate:function(){if(this.input.val()==="")this.empty();else{var e=this.input.data("data.suggest");e?this.valid(e):this.invalid()}}};d.fn.validate_enumerated=function(e){return this.each(function(){var b=d(this);if(b.is("select")){var a=b.data("$.validate_enumerated");a&&a._destroy();a=new d.validate_enumerated(this,e);b.data("$.validate_enumerated",a)}})};d.validate_enumerated=function(e,b){this.options=
d.extend(true,{},b);this.input=d(e);this.init()};d.validate_enumerated.prototype={init:function(){var e=this;this.input.bind("change.validate_enumerated, keypress.validate_enumerated",function(){this.selectedIndex===0?e.empty():e.valid({text:d(":selected",this).text(),id:this.value})})},invalid:function(){this.input.trigger("invalid")},valid:function(e){this.input.trigger("valid",e);this.input.trigger("fb-select",e)},empty:function(){this.input.trigger("empty")},_destroy:function(){this.input.unbind(".validate_enumerated")},
validate:function(){var e=this.input[0];e.selectedIndex>0?this.valid({text:d(":selected",this.input).text(),id:e.value}):this.empty()}};d.fn.validate_boolean=function(e){var b,a;this.each(function(){var f=d(this);if(f.is(":radio"))if(f.val().toLowerCase()==="true")b=f;else if(f.val().toLowerCase()==="false")a=f});if(b&&a){var c=b.data("$.validate_boolean");c&&c._destroy();c=new d.validate_boolean(b,a,e);b.data("$.validate_boolean",c)}return this};d.validate_boolean=function(e,b,a){this.options=d.extend(true,
{},a);this.tradio=e;this.fradio=b;this.input=this.tradio;this.init()};d.validate_boolean.prototype={init:function(){var e=this;this.tradio.bind("change.validate_boolean",function(){e.validate()})},_destroy:function(){this.input.unbind(".validate_boolean")},valid:function(e){this.input.trigger("valid",e)},empty:function(){this.input.trigger("empty")},validate:function(){if(this.tradio.is(":checked"))this.valid({text:this.tradio.text(),value:true});else this.fradio.is(":checked")?this.valid({text:this.fradio.text(),
value:false}):this.empty()}}})(jQuery);
(function(d,e){var b=window.formlib={init_inline_add_form:function(a){var c=a.event_prefix||"form.inline_add_form.";a.edit_row.bind(c+"submit",function(){b.submit_inline_add_form(a)}).bind(c+"cancel",function(){b.cancel_inline_add_form(a)}).bind(c+"error",function(f,g){b.error(a,g);a.edit_row.removeClass("loading")}).bind(c+"success",function(){a.edit_row.removeClass("loading")}).bind(c+"valid",function(){b.enable_submit(a)}).bind(c+"invalid",function(){b.disable_submit(a)});b.init_submit_cancel(a);
a.trigger&&a.trigger.parents(".trigger-row:first").hide();a.body.append(a.head_row).append(a.edit_row).append(a.submit_row);a.init(a)},submit_inline_add_form:function(a){if(!a.edit_row.is(".loading"))if(b.is_submit_enabled(a)){document.activeElement&&d(document.activeElement).blur();b.clear_message(a);if(a.validate(a)){a.edit_row.addClass("loading");a.submit(a,b.default_submit_ajax_options(a))}}},success_inline_add_form:function(a,c){a.head_row.before(c);e.ize(c);a.reset(a);a.edit_row.trigger(a.event_prefix+
"success")},cancel_inline_add_form:function(a){a.head_row.remove();a.edit_row.remove();a.submit_row.remove();a.trigger&&a.trigger.parents(".trigger-row:first").show()},init_inline_edit_form:function(a){var c=a.event_prefix||"form.inline_edit_form.";a.edit_row.bind(c+"submit",function(){b.submit_inline_edit_form(a)}).bind(c+"cancel",function(){b.cancel_inline_edit_form(a)}).bind(c+"error",function(f,g){b.error(a,g);a.edit_row.removeClass("loading")}).bind(c+"success",function(){a.edit_row.removeClass("loading")}).bind(c+
"valid",function(){b.enable_submit(a)}).bind(c+"invalid",function(){b.disable_submit(a)});b.init_submit_cancel(a);a.row.hide();a.row.before(a.head_row).before(a.edit_row).before(a.submit_row);a.init(a)},submit_inline_edit_form:function(a){if(!a.edit_row.is(".loading"))if(b.is_submit_enabled(a)){document.activeElement&&d(document.activeElement).blur();b.clear_message(a);if(a.validate(a)){a.edit_row.addClass("loading");a.submit(a,b.default_submit_ajax_options(a))}}},success_inline_edit_form:function(a,
c){a.row.replaceWith(c);a.row=c;e.ize(c);a.edit_row.trigger(a.event_prefix+"cancel")},cancel_inline_edit_form:function(a){a.head_row.remove();a.edit_row.remove();a.submit_row.remove();a.row.show()},success_inline_delete:function(a,c,f){a.hide().addClass("old-row");a.after(c);c.append(a);if(f){a=d('<a href="#">Undo</a>');d(".msg-default",c).next().append(a);a.click(function(){f();return false})}},success_inline_delete_undo:function(a){var c=d(".old-row",a);a.before(c);c.show().removeClass("old-row");
a.remove()},init_modal_form:function(a){d(document.body).append(a.form.hide());var c=a.event_prefix||"form.modal_form.";a.form.bind(c+"submit",function(){b.submit_modal_form(a)}).bind(c+"cancel",function(){b.cancel_modal_form(a)}).bind(c+"error",function(f,g){b.error(a,g);a.form.removeClass("loading")}).bind(c+"success",function(){a.form.removeClass("loading")}).bind(c+"valid",function(){b.enable_submit(a)}).bind(c+"invalid",function(){b.disable_submit(a)});b.init_submit_cancel(a);a.form.overlay({close:".modal-buttons .cancel",
closeOnClick:false,load:true,fixed:false,mask:{color:"#000",loadSpeed:200,opacity:0.5},onLoad:function(){a.overlay=this;a.init(a)}})},submit_modal_form:function(a){if(!a.form.is(".loading"))if(b.is_submit_enabled(a)){document.activeElement&&d(document.activeElement).blur();b.clear_message(a);if(a.validate(a)){a.form.addClass("loading");a.submit(a,b.default_submit_ajax_options(a))}}},cancel_modal_form:function(a){a.form.data("overlay").close()},init_submit_cancel:function(a){var c=a.form||a.edit_row,
f=a.form||a.submit_row,g=a.event_prefix;a=d(".save",f).click(function(){c.trigger(g+"submit")});b.disable(a);d(".cancel",f).click(function(){c.trigger(g+"cancel")});d(":input",c).keypress(function(i){i.keyCode===13&&!i.isDefaultPrevented()&&c.trigger(g+"submit")}).keyup(function(i){i.keyCode===27&&c.trigger(g+"cancel")})},disable:function(a){d(a).attr("disabled","disabled").addClass("disabled")},enable:function(a){d(a).removeAttr("disabled").removeClass("disabled")},disable_submit:function(a){b.disable(d(".save",
a.form||a.submit_row))},enable_submit:function(a){b.enable(d(".save",a.form||a.submit_row))},is_submit_enabled:function(a){return!d(".save",a.form||a.submit_row).is(":disabled")},init_mqlkey:function(a,c){return a.next(".key-status").removeClass("valid invalid loading").text("").removeAttr("title").end().mqlkey(c).bind("valid",function(){d(this).next(".key-status").removeClass("invalid loading").addClass("valid").text("valid").attr("title","Key is available")}).bind("invalid",function(f,g){d(this).next(".key-status").removeClass("valid loading").addClass("invalid").text("invalid").attr("title",
g)}).bind("textchange",function(){d(this).next(".key-status").removeClass("valid invalid").text("loading").addClass("loading")})},validate_mqlkey:function(a,c){var f=c.next(".key-status"),g=c.val();if(g===""){c.trigger(a.event_prefix+"error","Key is required");return false}if(g===c.data("mqlkey").original)return true;if(f.is(".invalid")){c.trigger(a.event_prefix+"error",f.attr("title"));return false}else if(f.is(".loading"))return false;return true},error:function(a,c){b.disable_submit(a);return b.message(a,
c,"error")},message:function(a,c,f){a=a.head_row;a.find(".close-msg").css("visibility","visible").next().find(".msg-default").hide().next().text(c);a.addClass("row-msg");f&&a.addClass("row-msg-"+f)},clear_message:function(){},default_begin_ajax_options:function(){return b._default_ajax_options("GET")},default_submit_ajax_options:function(a){var c=b._default_ajax_options("POST");if(a){d.extend(c,a.ajax);d("input[type=hidden]",a.submit_row||a.form).each(function(){c.data[this.name]=this.value})}return c},
_default_ajax_options:function(a){return{data:{},dataType:"json",type:a||"GET",success:function(c,f,g){if(!b.check_ajax_success.apply(this,arguments))return this._error.apply(this,[g]);this.onsuccess&&this.onsuccess.apply(this,arguments)},error:function(){b.check_ajax_error.apply(this,arguments);return this._error.apply(this,arguments)},_error:function(c){if(c.status===401)d(window).trigger("fb.user.unauthorized");else if(this.onerror)this.onerror.apply(this,[c.responseText].concat(Array.prototype.slice.call(arguments)));
else{var f={},g=this;d.each(["url","data","dataType","type"],function(i,l){f[l]=g[l]});d.each(["status","statusText","responseText"],function(i,l){f[l]=c[l]});f.responseHeaders=c.getAllResponseHeaders();d(window).trigger("fb.user.feedback",f)}}}},check_ajax_success:function(){return b.check_api_response.apply(this,arguments)},check_ajax_error:function(a){var c=a.responseText;try{c=JSON.stringify(c)}catch(f){}return b.check_api_response.apply(this,[c,a.statusText,a])},check_api_response:function(a,
c,f){if(typeof a==="object"){if(a.code!=="/api/status/ok")return false}else if(f.status!==200)return false;return true}}})(jQuery,window.i18n);
(function(d,e,b){e.topic.manage_type={add_type_begin:function(a,c){d.ajax(d.extend(b.default_submit_ajax_options(),{url:e.h.ajax_url("add_type_submit.ajax"),data:{id:e.c.id,type:c,lang:e.lang},onsuccess:function(f){var g=d(f.result.html).hide();d(".manage-types").after(g);g.fadeIn();if(f=f.result.list){f=d(f);f=d("li",f).hide();d(".topic-type-list ul").prepend(f);f.fadeIn()}a.removeClass("editing").focus().select()}}))},remove_type_begin:function(a,c){d.ajax(d.extend(b.default_submit_ajax_options(),
{url:e.h.ajax_url("remove_type_submit.ajax"),data:{id:e.c.id,type:c,lang:e.lang},onsuccess:function(f){d(".type-section[data-id="+c.replace(/\//g,"\\/")+"]").fadeOut();var g=a.parent("li");f=d(f.result.html);g.hide().before(f);a.removeClass("editing").focus().select()}}))},undo_remove_type:function(a,c){d.ajax(d.extend(b.default_submit_ajax_options(),{url:e.h.ajax_url("undo_remove_type.ajax"),data:{id:e.c.id,type:c},onsuccess:function(){d(".type-section[data-id="+c.replace(/\//g,"\\/")+"]").fadeIn();
d(a).parents("li.remove-type-result").hide().next("li:hidden").show().end().remove()}}));return false}}})(jQuery,window.freebase,window.formlib);
