
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
(function(b){function i(){if(b.browser.msie){var g=b(document).height(),k=b(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,g-k<20?k:g]}return[b(document).width(),b(document).height()]}function f(g){if(g)return g.call(b.mask)}b.tools=b.tools||{version:"@VERSION"};var c;c=b.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,
onClose:null}};var a,e,d,h,j;b.mask={load:function(g,k){if(d)return this;if(typeof g=="string")g={color:g};g=g||h;h=g=b.extend(b.extend({},c.conf),g);a=b("#"+g.maskId);if(!a.length){a=b("<div/>").attr("id",g.maskId);b("body").append(a)}var n=i();a.css({position:"absolute",top:0,left:0,width:n[0],height:n[1],display:"none",opacity:g.startOpacity,zIndex:g.zIndex});g.color&&a.css("backgroundColor",g.color);if(f(g.onBeforeLoad)===false)return this;g.closeOnEsc&&b(document).bind("keydown.mask",function(m){m.keyCode==
27&&b.mask.close(m)});g.closeOnClick&&a.bind("click.mask",function(m){b.mask.close(m)});b(window).bind("resize.mask",function(){b.mask.fit()});if(k&&k.length){j=k.eq(0).css("zIndex");b.each(k,function(){var m=b(this);/relative|absolute|fixed/i.test(m.css("position"))||m.css("position","relative")});e=k.css({zIndex:Math.max(g.zIndex+1,j=="auto"?0:j)})}a.css({display:"block"}).fadeTo(g.loadSpeed,g.opacity,function(){b.mask.fit();f(g.onLoad)});d=true;return this},close:function(){if(d){if(f(h.onBeforeClose)===
false)return this;a.fadeOut(h.closeSpeed,function(){f(h.onClose);e&&e.css({zIndex:j})});b(document).unbind("keydown.mask");a.unbind("click.mask");b(window).unbind("resize.mask");d=false}return this},fit:function(){if(d){var g=i();a.css({width:g[0],height:g[1]})}},getMask:function(){return a},isLoaded:function(){return d},getConf:function(){return h},getExposed:function(){return e}};b.fn.mask=function(g){b.mask.load(g);return this};b.fn.expose=function(g){b.mask.load(g,this);return this}})(jQuery);
(function(b){function i(a,e){var d=this,h=a.add(d),j=b(window),g,k,n,m=b.tools.expose&&(e.mask||e.expose),o=Math.random().toString().slice(10);if(m){if(typeof m=="string")m={color:m};m.closeOnClick=m.closeOnEsc=false}var s=e.target||a.attr("rel");k=s?b(s):a;if(!k.length)throw"Could not find Overlay: "+s;a&&a.index(k)==-1&&a.click(function(l){d.load(l);return l.preventDefault()});b.extend(d,{load:function(l){if(d.isOpened())return d;var p=c[e.effect];if(!p)throw'Overlay: cannot find effect : "'+e.effect+
'"';e.oneInstance&&b.each(f,function(){this.close(l)});l=l||b.Event();l.type="onBeforeLoad";h.trigger(l);if(l.isDefaultPrevented())return d;n=true;m&&b(k).expose(m);var q=e.top,t=e.left,u=k.outerWidth({margin:true}),v=k.outerHeight({margin:true});if(typeof q=="string")q=q=="center"?Math.max((j.height()-v)/2,0):parseInt(q,10)/100*j.height();if(t=="center")t=Math.max((j.width()-u)/2,0);p[0].call(d,{top:q,left:t},function(){if(n){l.type="onLoad";h.trigger(l)}});m&&e.closeOnClick&&b.mask.getMask().one("click",
d.close);e.closeOnClick&&b(document).bind("click."+o,function(r){b(r.target).parents(k).length||d.close(r)});e.closeOnEsc&&b(document).bind("keydown."+o,function(r){r.keyCode==27&&d.close(r)});return d},close:function(l){if(!d.isOpened())return d;l=l||b.Event();l.type="onBeforeClose";h.trigger(l);if(!l.isDefaultPrevented()){n=false;c[e.effect][1].call(d,function(){l.type="onClose";h.trigger(l)});b(document).unbind("click."+o).unbind("keydown."+o);m&&b.mask.close();return d}},getOverlay:function(){return k},
getTrigger:function(){return a},getClosers:function(){return g},isOpened:function(){return n},getConf:function(){return e}});b.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(l,p){b.isFunction(e[p])&&b(d).bind(p,e[p]);d[p]=function(q){b(d).bind(p,q);return d}});g=k.find(e.close||".close");if(!g.length&&!e.close){g=b('<a class="close"></a>');k.prepend(g)}g.click(function(l){d.close(l)});e.load&&d.load()}b.tools=b.tools||{version:"@VERSION"};b.tools.overlay={addEffect:function(a,
e,d){c[a]=[e,d]},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:"fast",effect:"default",fixed:!b.browser.msie||b.browser.version>6,left:"center",load:false,mask:null,oneInstance:true,speed:"normal",target:null,top:"10%"}};var f=[],c={};b.tools.overlay.addEffect("default",function(a,e){var d=this.getConf(),h=b(window);if(!d.fixed){a.top+=h.scrollTop();a.left+=h.scrollLeft()}a.position=d.fixed?"fixed":"absolute";this.getOverlay().css(a).fadeIn(d.speed,e)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,
a)});b.fn.overlay=function(a){var e=this.data("overlay");if(e)return e;if(b.isFunction(a))a={onBeforeLoad:a};a=b.extend(true,{},b.tools.overlay.conf,a);this.each(function(){e=new i(b(this),a);f.push(e);b(this).data("overlay",e)});return a.api?e:this}})(jQuery);
(function(b){b.fn.mqlkey=function(f){return this.each(function(){var c=b(this);if(c.is(":text")){var a=c.data("mqlkey");a&&a._destroy();a=new i(this,f);c.data("mqlkey",a)}})};var i=b.mqlkey=function(f,c){this.options=b.extend(true,{},i.defaults,c);this.input=b(f);this.original=this.input.val();this.init()};i.prototype={init:function(){var f=this;this.input.bind("keyup.mqlkey",function(c){f.textchange(c)}).bind(b.browser.msie?"paste.mqlkey":"input.mqlkey",function(c){f.textchange(c)});if(this.options.source){this.source=
b(this.options.source);this.source_generate=true;this.input.bind("change.mqlkey",function(){f.source_generate=false});this.source.bind("change.mqlkey",function(){if(f.source_generate){var c=i.from(f.source.val());f.input.val(c).trigger("keyup")}})}},_destroy:function(){this.input.unbind(".mqlkey");this.source&&this.source.unbind("change.mqlkey")},textchange:function(f){clearTimeout(this.textchange_timeout);var c=this;this.textchange_timeout=setTimeout(function(){c.textchange_delay(f)},200)},textchange_delay:function(){this.input.trigger("textchange");
var f=b.trim(this.input.val());return f===this.original&&f!==""?this.valid(f):i.reserved_word(f)?this.invalid(f,f+" is a reserved word."):i.test(f,this.options.schema)?f.length<this.options.minlen?this.invalid(f):this.options.check_key?this.check_key(f):this.valid(f):this.invalid(f)},check_key:function(f){var c=this;if(this.xhr){this.xhr.abort();this.xhr=null}var a={id:null,key:{namespace:this.options.namespace,value:f}};clearTimeout(this.check_key.timeout);this.check_key.timeout=setTimeout(function(){c.xhr=
c.options.mqlread(a,function(e){return e?c.invalid(f,"Key already exists"):c.valid(f)},function(e){return e?c.invalid(e.responseText()):c.invalid("mqlread error!")})},200)},valid:function(f){this.input.trigger("valid",f)},invalid:function(f,c){if(!c){c=this.options.minlen>1?"Key must be "+this.options.minlen+" or more alphanumeric characters":"Key must be alphanumeric";c+=", lowercase, begin with a letter and not end with a non-alphanumeric character. Underscores are allowed but not consecutively."}this.input.trigger("invalid",
c)}};b.extend(i,{defaults:{minlen:1,check_key:true,namespace:"/",mqlread:function(f,c,a){return i.mqlread(null,f,c,a)},source:null,schema:false},mqlread:function(f,c,a,e){f={url:f||"http://api.freebase.com/api/service/mqlread",data:{query:JSON.stringify({query:c})},dataType:"jsonp",success:function(d){return a(d.result)},error:e};return b.ajax(f)},from:function(f){f=f.toLowerCase();f=f.replace(/[^a-z0-9]/g,"_");f=f.replace(/\_\_+/g,"_");f=f.replace(/[^a-z0-9]+$/,"");f=f.replace(/^[^a-z]+/,"");if(i.reserved_word(f))f=
"x_"+f;return f},reservedwords:"meta typeguid left right datatype scope attribute relationship property link class future update insert delete replace create destroy default sort limit offset optional pagesize cursor index !index for while as in is if else return count function read write select var connect this self super xml sql mql any all macro estimate-count",typeonlywords:"guid id object domain name key type keys value timestamp creator permission namespace unique schema reverse",_reserved_word:null,
reserved_word:function(f){if(!i._reserved_word){i._reserved_word={};b.each([i.reservedwords,i.typeonlywords],function(c,a){b.each(a.split(" "),function(e,d){i._reserved_word[d]=1})})}return i._reserved_word[f]===1},fast:/^[A-Za-z0-9](?:[_-]?[A-Za-z0-9])*$/,slow:/^(?:[A-Za-z0-9]|\$[A-F0-9]{4})(?:[_-]?[A-Za-z0-9]|[_-]?\$[A-F0-9]{4})*$/,schema:/^[a-z](?:_?[a-z0-9])*$/,test:function(f,c){if(c)return i.schema.test(f);return i.fast.test(f)||i.slow.test(f)}})})(jQuery);
(function(b,i){b(window).ajaxSend(function(c,a,e){e.type==="POST"&&a.setRequestHeader("x-acre-cache-control","max-age: 3600")});var f=i.schema.edit={init_edit_form:function(c){if(c.mode==="add")b("tbody",c.table).append(c.row);else if(c.mode==="edit")c.trigger_row.before(c.row);else throw"Unknown edit type mode: "+c.mode;c.trigger_row.before(c.submit_row);var a=c.event_prefix||"fb.schema.edit.";c.row.bind(a+"submit",function(){f.submit_edit_form(c)}).bind(a+"cancel",function(){f.cancel_edit_form(c)}).bind(a+
"error",function(e,d,h){f.row_error(d,h);c.row.removeClass("loading")}).bind(a+"success",function(){c.row.removeClass("loading")});b("button.save",c.submit_row).click(function(){c.row.trigger(a+"submit")});b(".button.cancel",c.submit_row).click(function(){c.row.trigger(a+"cancel")});c.row.showRow(function(){typeof c.init_form==="function"&&c.init_form(c)});c.trigger_row.hide();c.submit_row.show();b(window).bind("fb.edit.lang.select",function(e,d){f.toggle_lang(c.row,d)})},cancel_edit_form:function(c){c.row.hideRow(function(){b(this).remove()});
f.clear_row_message(c.row);c.submit_row.remove();c.trigger_row.show();c.trigger.removeClass("editing")},submit_edit_form:function(c){if(!c.row.is(".loading")){document.activeElement&&b(document.activeElement).blur();f.clear_row_message(c.row);typeof c.validate_form==="function"&&c.validate_form(c);if(!f.has_row_message(c.row,"error")){c.row.addClass("loading");typeof c.submit_form==="function"&&c.submit_form(c)}}},ajax_error_handler:function(c,a,e){var d;try{d=JSON.parse(c.responseText);if(d.messages&&
d.messages.length)d=JSON.stringify(d.messages[0])}catch(h){}if(!d)d=c.responseText;if(a){f.row_error(a,d);a.removeClass("loading")}else if(e){f.form_error(e,d);e.removeClass("loading")}},row_error:function(c,a){return f.row_message(c,a,"error")},row_message:function(c,a,e){var d=b('<a class="close-msg" href="#">Close</a>').click(function(h){return i.schema.close_message.apply(this,[h,".row-msg:first"])});a=b("<span>").text(a);d=b('<td colspan="5">').append(d).append(a);d=b('<tr class="row-msg">').append(d);
e&&d.addClass("row-msg-"+e);c.before(d);d.hide().showRow();a=c.data("row-msg");if(!a){a={};c.data("row-msg",a)}if(a[e])a[e].push(d);else a[e]=[d];return d},clear_row_message:function(c){var a=c.data("row-msg");if(a){b.each(a,function(e,d){b.each(d,function(h,j){j.remove()})});c.removeData("row-msg")}},has_row_message:function(c,a){var e=c.data("row-msg");if(a)return e&&e[a]&&e[a].length;return e!=null},init_modal_form:function(c){b(document.body).append(c.form.hide());var a=c.event_prefix||"fb.schema.edit.modal.";
c.form.bind(a+"submit",function(){f.submit_modal_form(c)}).bind(a+"error",function(e,d){f.form_error(c.form,d)}).bind(a+"success",function(){c.form.removeClass("loading")});b(".modal-buttons .button.save",c.form).click(function(){c.form.trigger(a+"submit")});c.form.overlay({close:".modal-buttons .button.cancel",closeOnClick:false,load:true,fixed:false,mask:{color:"#000",loadSpeed:200,opacity:0.5},onLoad:function(){typeof c.init_form==="function"&&c.init_form(c)}});i.schema.init_modal_help(c.form);
b(window).bind("fb.edit.lang.select",function(e,d){f.toggle_lang(c.form,d)})},submit_modal_form:function(c){if(!c.form.is(".loading")){document.activeElement&&b(document.activeElement).blur();f.clear_form_message(c.form);typeof c.validate_form==="function"&&c.validate_form(c);if(!f.has_form_message(c.form,"error")){c.form.addClass("loading");typeof c.submit_form==="function"&&c.submit_form(c)}}},form_error:function(c,a){return f.form_message(c,a,"error")},form_message:function(c,a,e){a=b("<div class='form-msg'>").text(a).hide();
b(".form-group",c).prepend(a);a.slideDown();var d=c.data("form-msg");if(!d){d={};c.data("form-msg",d)}if(d[e])d[e].push(a);else d[e]=[a];return a},clear_form_message:function(c){var a=c.data("form-msg");if(a){b.each(a,function(e,d){b.each(d,function(h,j){j.remove()})});c.removeData("form-msg")}},has_form_message:function(c,a){var e=c.data("form-msg");if(a)return e&&e[a]&&e[a].length;return e!=null},toggle_lang:function(c,a){b("[lang]",c).each(function(){var e=b(this);b(this).attr("lang")===a?e.show().focus().blur():
e.hide()})},init_mqlkey:function(c,a){c.mqlkey(a).bind("valid",function(){b(this).next(".key-status").removeClass("invalid").removeClass("loading").addClass("valid").text("valid").attr("title","Key is available")}).bind("invalid",function(e,d){b(this).next(".key-status").removeClass("valid").removeClass("loading").addClass("invalid").text("invalid").attr("title",d)}).bind("textchange",function(){b(this).next(".key-status").removeClass("invalid").removeClass("valid").addClass("loading")})},validate_mqlkey:function(c,
a){var e=c.form||c.row,d=a.next(".key-status"),h=a.val();if(h===""){e.trigger(c.event_prefix+"error","Key is required");return false}if(h===a.data("mqlkey").original)return true;if(d.is(".invalid")){e.trigger(c.event_prefix+"error",d.attr("title"));return false}else if(d.is(".loading"))return false;return true}}})(jQuery,window.freebase);
(function(b,i){var f=i.schema.edit,c=i.schema.domain.edit={domain_settings_begin:function(a,e){b.ajax({url:i.h.ajax_url("domain_settings_begin.ajax"),data:{id:e,lang:i.lang},dataType:"json",success:function(d){d=b(d.result.html);d={event_prefix:"fb.schema.domain.settings.",ajax:{url:i.h.ajax_url("domain_settings_submit.ajax"),data:{id:e}},init_form:c.init_domain_settings_form,validate_form:c.validate_domain_settings_form,submit_form:c.submit_domain_settings_form,form:d};f.init_modal_form(d);d.form.bind(d.event_prefix+
"success",function(h,j){window.location=j.location})}})},init_domain_settings_form:function(a){var e=b("input[name=name]",a.form),d=b("input[name=key]",a.form),h=b("input[name=namespace]",a.form).val();f.init_mqlkey(d,{minlen:5,source:e,namespace:h,mqlread:i.mqlread,schema:true});b(":input:not(textarea)",a.form).keypress(function(j){j.keyCode===13&&!j.isDefaultPrevented()&&a.form.trigger(a.event_prefix+"submit")});b(".button.delete",a.form).click(function(){var j=b(this).parent().siblings().find(".modal-content"),
g=b(".modal-buttons",a.form).animate({opacity:0},500),k=b(".modal-help",j).height(j.height()).slideDown(),n=b(".button.cancel",j).click(function(){g.animate({opacity:1},500);k.slideUp()});b(".button.save",j).click(function(){if(!a.form.is(".loading")){a.form.addClass("loading");var m={id:a.ajax.data.id,user:i.user.id};b.ajax({url:i.h.ajax_url("delete_domain_submit.ajax"),type:"POST",dataType:"json",data:m,success:function(o,s,l){if(o.code==="/api/status/error")return f.ajax_error_handler(l,null,a.form);
a.form.trigger(a.event_prefix+"success",o.result)},error:function(o){f.ajax_error_handler(o,null,a.form);n.click()}})}})})},validate_domain_settings_form:function(a){b.trim(b("input[name=name]:visible",a.form).val())===""&&a.form.trigger(a.event_prefix+"error","Name is required");var e=b("input[name=key]",a.form);f.validate_mqlkey(a,e)},submit_domain_settings_form:function(a){var e=b("input[name=key]",a.form);if(f.validate_mqlkey(a,e)){e={name:b.trim(b("input[name=name]:visible",a.row).val()),key:e.val(),
namespace:b("input[name=namespace]",a.form).val(),description:b.trim(b("textarea[name=description]:visible",a.form).val()),lang:b("select[name=lang]",a.form).val()};b.ajax({url:a.ajax.url,type:"POST",dataType:"json",data:b.extend(e,a.ajax.data),success:function(d,h,j){if(d.code==="/api/status/error")return f.ajax_error_handler(j,null,a.form);a.form.trigger(a.event_prefix+"success",d.result)},error:function(d){f.ajax_error_handler(d,null,a.form)}})}else a.form.removeClass("loading")},add_type_begin:function(a,
e,d){b.ajax({url:i.h.ajax_url("add_type_begin.ajax"),data:{id:e,mediator:d,lang:i.lang},dataType:"json",success:function(h,j,g){if(h.code==="/api/status/error")return f.ajax_error_handler(g,row);h=b(h.result.html);var k={mode:"add",event_prefix:"fb.schema.domain.add.type.",ajax:{url:i.h.ajax_url("add_type_submit.ajax")},init_form:c.init_type_form,validate_form:c.validate_type_form,submit_form:c.submit_type_form,table:a.parents("table:first"),trigger:a,trigger_row:a.parents("tr:first"),row:b(".edit-row",
h).hide(),submit_row:b(".edit-row-submit",h).hide()};f.init_edit_form(k);k.row.bind("fb.schema.domain.add.type.success",function(){var n=b("thead:first .table-empty-column",k.table);n.length&&n.parents("tr:first").hide().prev("tr").show();b(".button.cancel",k.submit_row).text("Done");c.init_type_form(k)})},error:function(h){f.ajax_error_handler(h,row)}})},edit_type_begin:function(a,e){b.ajax({url:i.h.ajax_url("edit_type_begin.ajax"),data:{id:e,lang:i.lang},dataType:"json",success:function(d,h,j){if(d.code===
"/api/status/error")return f.ajax_error_handler(j,row);d=b(d.result.html);var g={mode:"edit",event_prefix:"fb.schema.domain.edit.type.",ajax:{url:i.h.ajax_url("edit_type_submit.ajax"),data:{id:e}},init_form:c.init_type_form,validate_form:c.validate_type_form,submit_form:c.submit_type_form,table:a.parents("table:first"),trigger:a,trigger_row:a.parents("tr:first"),row:b(".edit-row",d).hide(),submit_row:b(".edit-row-submit",d).hide()};f.init_edit_form(g);g.row.bind("fb.schema.domain.edit.type.success",
function(){g.trigger_row.remove();g.row.remove();g.submit_row.remove()})},error:function(d){f.ajax_error_handler(d,row)}})},init_type_form:function(a){var e=b("input[name=name]",a.row),d=b("input[name=key]",a.row);if(a.mode==="add"){e.val("");d.val("");b("textarea[name=description]",a.row).val("");b("input[name=enumeration]",a.row).removeAttr("checked")}if(!a.row.data("initialized")){var h=b("input[name=domain]",a.row).val();f.init_mqlkey(d,{source:e,namespace:h,mqlread:i.mqlread,schema:true});b(":input:not(textarea)",
a.row).keypress(function(j){if(j.keyCode===13)a.row.trigger(a.event_prefix+"submit");else j.keyCode===27&&a.row.trigger(a.event_prefix+"cancel")});a.row.data("initialized",true)}e.focus()},submit_type_form:function(a){var e=b("input[name=key]",a.row);if(f.validate_mqlkey(a,e)){e={domain:b("input[name=domain]",a.row).val(),name:b.trim(b("input[name=name]:visible",a.row).val()),key:e.val(),description:b.trim(b("textarea[name=description]:visible",a.row).val()),mediator:b("input[name=mediator]",a.row).is(":checked")?
1:0,enumeration:b("input[name=enumeration]",a.row).is(":checked")?1:0,lang:b("select[name=lang]",a.submit_row).val()};b.ajax({url:a.ajax.url,type:"POST",dataType:"json",data:b.extend(e,a.ajax.data),success:function(d,h,j){if(d.code==="/api/status/error")return f.ajax_error_handler(j,a.row);var g=b(d.result.html).addClass("new-row");a.row.before(g);g.hide();g.showRow(function(){i.schema.init_row_menu(g);b(".edit",g).show()},null,"slow");a.row.trigger(a.event_prefix+"success")},error:function(d){f.ajax_error_handler(d,
a.row)}})}else a.row.removeClass("loading")},validate_type_form:function(a){b.trim(b("input[name=name]:visible",a.row).val())===""&&a.row.trigger(a.event_prefix+"error","Name is required");var e=b("input[name=key]",a.row);f.validate_mqlkey(a,e)},delete_type_begin:function(a,e){var d=a.parents("tr:first");d.parents("table:first");b.ajax({url:i.h.ajax_url("delete_type_submit.ajax"),data:{id:e,user:i.user.id,lang:i.lang},type:"POST",dataType:"json",success:function(h,j,g){if(h.code==="/api/status/error")return f.ajax_error_handler(g,
d);h=b(h.result.html).addClass("new-row");d.before(h);h.hide();d.remove();h.showRow()},error:function(h){f.ajax_error_handler(h,d)}})},undo_delete_type_begin:function(a,e){var d=a.parents("tr:first");d.parents("table:first");b.ajax({url:i.h.ajax_url("undo_delete_type_submit.ajax"),data:{type_info:JSON.stringify(e),lang:i.lang},type:"POST",dataType:"json",success:function(h,j,g){if(h.code==="/api/status/error")return f.ajax_error_handler(g,d);var k=b(h.result.html).addClass("new-row");d.before(k);
k.hide();d.remove();k.showRow(function(){i.schema.init_row_menu(k);b(".edit",k).show()},null,"slow")},error:function(h){f.ajax_error_handler(h,d)}})}}})(jQuery,window.freebase);
