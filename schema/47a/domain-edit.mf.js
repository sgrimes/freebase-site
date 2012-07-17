
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
(function(c){function h(){if(c.browser.msie){var g=c(document).height(),j=c(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,g-j<20?j:g]}return[c(document).width(),c(document).height()]}function e(g){if(g)return g.call(c.mask)}c.tools=c.tools||{version:"@VERSION"};var b;b=c.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,
onClose:null}};var a,f,d,i,l;c.mask={load:function(g,j){if(d)return this;if(typeof g=="string")g={color:g};g=g||i;i=g=c.extend(c.extend({},b.conf),g);a=c("#"+g.maskId);if(!a.length){a=c("<div/>").attr("id",g.maskId);c("body").append(a)}var n=h();a.css({position:"absolute",top:0,left:0,width:n[0],height:n[1],display:"none",opacity:g.startOpacity,zIndex:g.zIndex});g.color&&a.css("backgroundColor",g.color);if(e(g.onBeforeLoad)===false)return this;g.closeOnEsc&&c(document).bind("keydown.mask",function(m){m.keyCode==
27&&c.mask.close(m)});g.closeOnClick&&a.bind("click.mask",function(m){c.mask.close(m)});c(window).bind("resize.mask",function(){c.mask.fit()});if(j&&j.length){l=j.eq(0).css("zIndex");c.each(j,function(){var m=c(this);/relative|absolute|fixed/i.test(m.css("position"))||m.css("position","relative")});f=j.css({zIndex:Math.max(g.zIndex+1,l=="auto"?0:l)})}a.css({display:"block"}).fadeTo(g.loadSpeed,g.opacity,function(){c.mask.fit();e(g.onLoad)});d=true;return this},close:function(){if(d){if(e(i.onBeforeClose)===
false)return this;a.fadeOut(i.closeSpeed,function(){e(i.onClose);f&&f.css({zIndex:l})});c(document).unbind("keydown.mask");a.unbind("click.mask");c(window).unbind("resize.mask");d=false}return this},fit:function(){if(d){var g=h();a.css({width:g[0],height:g[1]})}},getMask:function(){return a},isLoaded:function(){return d},getConf:function(){return i},getExposed:function(){return f}};c.fn.mask=function(g){c.mask.load(g);return this};c.fn.expose=function(g){c.mask.load(g,this);return this}})(jQuery);
(function(c){function h(a,f){var d=this,i=a.add(d),l=c(window),g,j,n,m=c.tools.expose&&(f.mask||f.expose),r=Math.random().toString().slice(10);if(m){if(typeof m=="string")m={color:m};m.closeOnClick=m.closeOnEsc=false}var s=f.target||a.attr("rel");j=s?c(s):a;if(!j.length)throw"Could not find Overlay: "+s;a&&a.index(j)==-1&&a.click(function(k){d.load(k);return k.preventDefault()});c.extend(d,{load:function(k){if(d.isOpened())return d;var o=b[f.effect];if(!o)throw'Overlay: cannot find effect : "'+f.effect+
'"';f.oneInstance&&c.each(e,function(){this.close(k)});k=k||c.Event();k.type="onBeforeLoad";i.trigger(k);if(k.isDefaultPrevented())return d;n=true;m&&c(j).expose(m);var p=f.top,t=f.left,u=j.outerWidth({margin:true}),v=j.outerHeight({margin:true});if(typeof p=="string")p=p=="center"?Math.max((l.height()-v)/2,0):parseInt(p,10)/100*l.height();if(t=="center")t=Math.max((l.width()-u)/2,0);o[0].call(d,{top:p,left:t},function(){if(n){k.type="onLoad";i.trigger(k)}});m&&f.closeOnClick&&c.mask.getMask().one("click",
d.close);f.closeOnClick&&c(document).bind("click."+r,function(q){c(q.target).parents(j).length||d.close(q)});f.closeOnEsc&&c(document).bind("keydown."+r,function(q){q.keyCode==27&&d.close(q)});return d},close:function(k){if(!d.isOpened())return d;k=k||c.Event();k.type="onBeforeClose";i.trigger(k);if(!k.isDefaultPrevented()){n=false;b[f.effect][1].call(d,function(){k.type="onClose";i.trigger(k)});c(document).unbind("click."+r).unbind("keydown."+r);m&&c.mask.close();return d}},getOverlay:function(){return j},
getTrigger:function(){return a},getClosers:function(){return g},isOpened:function(){return n},getConf:function(){return f}});c.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(k,o){c.isFunction(f[o])&&c(d).bind(o,f[o]);d[o]=function(p){c(d).bind(o,p);return d}});g=j.find(f.close||".close");if(!g.length&&!f.close){g=c('<a class="close"></a>');j.prepend(g)}g.click(function(k){d.close(k)});f.load&&d.load()}c.tools=c.tools||{version:"@VERSION"};c.tools.overlay={addEffect:function(a,
f,d){b[a]=[f,d]},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:"fast",effect:"default",fixed:!c.browser.msie||c.browser.version>6,left:"center",load:false,mask:null,oneInstance:true,speed:"normal",target:null,top:"10%"}};var e=[],b={};c.tools.overlay.addEffect("default",function(a,f){var d=this.getConf(),i=c(window);if(!d.fixed){a.top+=i.scrollTop();a.left+=i.scrollLeft()}a.position=d.fixed?"fixed":"absolute";this.getOverlay().css(a).fadeIn(d.speed,f)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,
a)});c.fn.overlay=function(a){var f=this.data("overlay");if(f)return f;if(c.isFunction(a))a={onBeforeLoad:a};a=c.extend(true,{},c.tools.overlay.conf,a);this.each(function(){f=new h(c(this),a);e.push(f);c(this).data("overlay",f)});return a.api?f:this}})(jQuery);
(function(c){c.fn.mqlkey=function(e){return this.each(function(){var b=c(this);if(b.is(":text")){var a=b.data("mqlkey");a&&a._destroy();a=new h(this,e);b.data("mqlkey",a)}})};var h=c.mqlkey=function(e,b){this.options=c.extend(true,{},h.defaults,b);this.input=c(e);this.original=this.input.val();this.init()};h.prototype={init:function(){var e=this;this.input.bind("keyup.mqlkey",function(b){e.textchange(b)}).bind(c.browser.msie?"paste.mqlkey":"input.mqlkey",function(b){e.textchange(b)});if(this.options.source){this.source=
c(this.options.source);this.source_generate=true;this.input.bind("change.mqlkey",function(){e.source_generate=false});this.source.bind("change.mqlkey",function(){if(e.source_generate){var b=h.from(e.source.val());e.input.val(b).trigger("keyup")}})}},_destroy:function(){this.input.unbind(".mqlkey");this.source&&this.source.unbind("change.mqlkey")},textchange:function(e){clearTimeout(this.textchange_timeout);var b=this;this.textchange_timeout=setTimeout(function(){b.textchange_delay(e)},200)},textchange_delay:function(){this.input.trigger("textchange");
var e=c.trim(this.input.val());return e===this.original&&e!==""?this.valid(e):h.reserved_word(e)?this.invalid(e,e+" is a reserved word."):h.test(e,this.options.schema)?e.length<this.options.minlen?this.invalid(e):this.options.check_key?this.check_key(e):this.valid(e):this.invalid(e)},check_key:function(e){var b=this;if(this.xhr)this.xhr=null;var a={id:null,key:{namespace:this.options.namespace,value:e}};clearTimeout(this.check_key.timeout);this.check_key.timeout=setTimeout(function(){b.xhr=b.options.mqlread(a,
function(f){return f?b.invalid(e,"Key already exists"):b.valid(e)},function(f){return f?b.invalid(f.responseText()):b.invalid("mqlread error!")})},200)},valid:function(e){this.input.trigger("valid",e)},invalid:function(e,b){if(!b){b=this.options.minlen>1?"Key must be "+this.options.minlen+" or more alphanumeric characters":"Key must be alphanumeric";b+=", lowercase, begin with a letter and not end with a non-alphanumeric character. Underscores are allowed but not consecutively."}this.input.trigger("invalid",
b)}};c.extend(h,{defaults:{minlen:1,check_key:true,namespace:"/",mqlread:function(e,b,a){return h.mqlread(null,e,b,a)},source:null,schema:false},mqlread:function(e,b,a,f){e={url:e||"http://api.freebase.com/api/service/mqlread",data:{query:JSON.stringify({query:b})},dataType:"jsonp",success:function(d){return a(d.result)},error:f};return c.ajax(e)},from:function(e){e=e.toLowerCase();e=e.replace(/[^a-z0-9]/g,"_");e=e.replace(/\_\_+/g,"_");e=e.replace(/[^a-z0-9]+$/,"");e=e.replace(/^[^a-z]+/,"");if(h.reserved_word(e))e=
"x_"+e;return e},reservedwords:"meta typeguid left right datatype scope attribute relationship property link class future update insert delete replace create destroy default sort limit offset optional pagesize cursor index !index for while as in is if else return count function read write select var connect this self super xml sql mql any all macro estimate-count",typeonlywords:"guid id object domain name key type keys value timestamp creator permission namespace unique schema reverse",_reserved_word:null,
reserved_word:function(e){if(!h._reserved_word){h._reserved_word={};c.each([h.reservedwords,h.typeonlywords],function(b,a){c.each(a.split(" "),function(f,d){h._reserved_word[d]=1})})}return h._reserved_word[e]===1},fast:/^[A-Za-z0-9](?:[_-]?[A-Za-z0-9])*$/,slow:/^(?:[A-Za-z0-9]|\$[A-F0-9]{4})(?:[_-]?[A-Za-z0-9]|[_-]?\$[A-F0-9]{4})*$/,schema:/^[a-z](?:_?[a-z0-9])*$/,test:function(e,b){if(b)return h.schema.test(e);return h.fast.test(e)||h.slow.test(e)}})})(jQuery);
(function(c,h){c(window).ajaxSend(function(b,a,f){f.type==="POST"&&a.setRequestHeader("x-acre-cache-control","max-age: 3600")});var e=h.schema.edit={init_edit_form:function(b){if(b.mode==="add")c("tbody",b.table).append(b.row);else if(b.mode==="edit")b.trigger_row.before(b.row);else throw"Unknown edit type mode: "+b.mode;b.trigger_row.before(b.submit_row);var a=b.event_prefix||"fb.schema.edit.";b.row.bind(a+"submit",function(){e.submit_edit_form(b)}).bind(a+"cancel",function(){e.cancel_edit_form(b)}).bind(a+
"error",function(f,d,i){e.row_error(d,i);b.row.removeClass("loading")}).bind(a+"success",function(){b.row.removeClass("loading")});c("button.save",b.submit_row).click(function(){b.row.trigger(a+"submit")});c(".button.cancel",b.submit_row).click(function(){b.row.trigger(a+"cancel")});b.row.showRow(function(){typeof b.init_form==="function"&&b.init_form(b)});b.trigger_row.hide();b.submit_row.show()},cancel_edit_form:function(b){b.row.hideRow(function(){c(this).remove()});e.clear_row_message(b.row);
b.submit_row.remove();b.trigger_row.show();b.trigger.removeClass("editing")},submit_edit_form:function(b){if(!b.row.is(".loading")){document.activeElement&&c(document.activeElement).blur();e.clear_row_message(b.row);typeof b.validate_form==="function"&&b.validate_form(b);if(!e.has_row_message(b.row,"error")){b.row.addClass("loading");typeof b.submit_form==="function"&&b.submit_form(b)}}},ajax_error_handler:function(b,a,f){var d;try{d=JSON.parse(b.responseText);if(d.messages&&d.messages.length)d=JSON.stringify(d.messages[0])}catch(i){}if(!d)d=
b.responseText;if(a){e.row_error(a,d);a.removeClass("loading")}else if(f){e.form_error(f,d);f.removeClass("loading")}},row_error:function(b,a){return e.row_message(b,a,"error")},row_message:function(b,a,f){var d=c('<a class="close-msg" href="#">Close</a>').click(function(i){return h.schema.close_message.apply(this,[i,".row-msg:first"])});a=c("<span>").text(a);d=c('<td colspan="5">').append(d).append(a);d=c('<tr class="row-msg">').append(d);f&&d.addClass("row-msg-"+f);b.before(d);d.hide().showRow();
a=b.data("row-msg");if(!a){a={};b.data("row-msg",a)}if(a[f])a[f].push(d);else a[f]=[d];return d},clear_row_message:function(b){var a=b.data("row-msg");if(a){c.each(a,function(f,d){c.each(d,function(i,l){l.remove()})});b.removeData("row-msg")}},has_row_message:function(b,a){var f=b.data("row-msg");if(a)return f&&f[a]&&f[a].length;return f!=null},init_modal_form:function(b){c(document.body).append(b.form.hide());var a=b.event_prefix||"fb.schema.edit.modal.";b.form.bind(a+"submit",function(){e.submit_modal_form(b)}).bind(a+
"error",function(f,d){e.form_error(b.form,d)}).bind(a+"success",function(){b.form.removeClass("loading")});c(".modal-buttons .button.save",b.form).click(function(){b.form.trigger(a+"submit")});b.form.overlay({close:".modal-buttons .button.cancel",closeOnClick:false,load:true,fixed:false,mask:{color:"#000",loadSpeed:200,opacity:0.5},onLoad:function(){typeof b.init_form==="function"&&b.init_form(b)}});h.schema.init_modal_help(b.form)},submit_modal_form:function(b){if(!b.form.is(".loading")){document.activeElement&&
c(document.activeElement).blur();e.clear_form_message(b.form);typeof b.validate_form==="function"&&b.validate_form(b);if(!e.has_form_message(b.form,"error")){b.form.addClass("loading");typeof b.submit_form==="function"&&b.submit_form(b)}}},form_error:function(b,a){return e.form_message(b,a,"error")},form_message:function(b,a,f){a=c("<div class='form-msg'>").text(a).hide();c(".form-group",b).prepend(a);a.slideDown();var d=b.data("form-msg");if(!d){d={};b.data("form-msg",d)}if(d[f])d[f].push(a);else d[f]=
[a];return a},clear_form_message:function(b){var a=b.data("form-msg");if(a){c.each(a,function(f,d){c.each(d,function(i,l){l.remove()})});b.removeData("form-msg")}},has_form_message:function(b,a){var f=b.data("form-msg");if(a)return f&&f[a]&&f[a].length;return f!=null},init_mqlkey:function(b,a){b.mqlkey(a).bind("valid",function(){c(this).next(".key-status").removeClass("invalid").removeClass("loading").addClass("valid").text("valid").attr("title","Key is available")}).bind("invalid",function(f,d){c(this).next(".key-status").removeClass("valid").removeClass("loading").addClass("invalid").text("invalid").attr("title",
d)}).bind("textchange",function(){c(this).next(".key-status").removeClass("invalid").removeClass("valid").addClass("loading")})},validate_mqlkey:function(b,a){var f=b.form||b.row,d=a.next(".key-status"),i=a.val();if(i===""){f.trigger(b.event_prefix+"error","Key is required");return false}if(i===a.data("mqlkey").original)return true;if(d.is(".invalid")){f.trigger(b.event_prefix+"error",d.attr("title"));return false}else if(d.is(".loading"))return false;return true}}})(jQuery,window.freebase);
(function(c,h){var e=h.schema.edit,b=h.schema.domain.edit={add_type_begin:function(a,f,d){c.ajax({url:h.h.ajax_url("add_type_begin.ajax"),data:{id:f,mediator:d,lang:h.lang},dataType:"json",success:function(i,l,g){if(i.code==="/api/status/error")return e.ajax_error_handler(g,row);i=c(i.result.html);var j={mode:"add",event_prefix:"fb.schema.domain.add.type.",ajax:{url:h.h.ajax_url("add_type_submit.ajax")},init_form:b.init_type_form,validate_form:b.validate_type_form,submit_form:b.submit_type_form,table:a.parents("table:first"),
trigger:a,trigger_row:a.parents("tr:first"),row:c(".edit-row",i).hide(),submit_row:c(".edit-row-submit",i).hide()};e.init_edit_form(j);j.row.bind("fb.schema.domain.add.type.success",function(){var n=c("thead:first .table-empty-column",j.table);n.length&&n.parents("tr:first").hide().prev("tr").show();c(".button.cancel",j.submit_row).text("Done");b.init_type_form(j)})},error:function(i){e.ajax_error_handler(i,row)}})},edit_type_begin:function(a,f){c.ajax({url:h.h.ajax_url("edit_type_begin.ajax"),data:{id:f,
lang:h.lang},dataType:"json",success:function(d,i,l){if(d.code==="/api/status/error")return e.ajax_error_handler(l,row);d=c(d.result.html);var g={mode:"edit",event_prefix:"fb.schema.domain.edit.type.",ajax:{url:h.h.ajax_url("edit_type_submit.ajax"),data:{id:f}},init_form:b.init_type_form,validate_form:b.validate_type_form,submit_form:b.submit_type_form,table:a.parents("table:first"),trigger:a,trigger_row:a.parents("tr:first"),row:c(".edit-row",d).hide(),submit_row:c(".edit-row-submit",d).hide()};
e.init_edit_form(g);g.row.bind("fb.schema.domain.edit.type.success",function(){g.trigger_row.remove();g.row.remove();g.submit_row.remove()})},error:function(d){e.ajax_error_handler(d,row)}})},init_type_form:function(a){var f=c("input[name=name]",a.row),d=c("input[name=key]",a.row);if(a.mode==="add"){f.val("");d.val("");c("textarea[name=description]",a.row).val("");c("input[name=enumeration]",a.row).removeAttr("checked")}if(!a.row.data("initialized")){var i=c("input[name=domain]",a.row).val();e.init_mqlkey(d,
{source:f,namespace:i,mqlread:h.mqlread,schema:true});c(":input:not(textarea)",a.row).keypress(function(l){if(l.keyCode===13)a.row.trigger(a.event_prefix+"submit");else l.keyCode===27&&a.row.trigger(a.event_prefix+"cancel")});a.row.data("initialized",true)}f.focus()},submit_type_form:function(a){var f=c("input[name=key]",a.row);if(e.validate_mqlkey(a,f)){f={domain:c("input[name=domain]",a.row).val(),name:c.trim(c("input[name=name]:visible",a.row).val()),key:f.val(),description:c.trim(c("textarea[name=description]:visible",
a.row).val()),mediator:c("input[name=mediator]",a.row).is(":checked")?1:0,enumeration:c("input[name=enumeration]",a.row).is(":checked")?1:0,deprecated:c("input[name=deprecated]",a.row).is(":checked")?1:0,never_assert:c("input[name=never_assert]",a.row).is(":checked")?1:0,lang:h.lang};c.ajax({url:a.ajax.url,type:"POST",dataType:"json",data:c.extend(f,a.ajax.data),success:function(d,i,l){if(d.code==="/api/status/error")return e.ajax_error_handler(l,a.row);var g=c(d.result.html).addClass("new-row");
a.row.before(g);g.hide();g.showRow(function(){h.schema.init_row_menu(g);c(".edit",g).show()},null,"slow");a.row.trigger(a.event_prefix+"success")},error:function(d){e.ajax_error_handler(d,a.row)}})}else a.row.removeClass("loading")},validate_type_form:function(a){c.trim(c("input[name=name]:visible",a.row).val())===""&&a.row.trigger(a.event_prefix+"error","Name is required");var f=c("input[name=key]",a.row);e.validate_mqlkey(a,f)}}})(jQuery,window.freebase);
