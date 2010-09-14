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
(function(b){function m(){if(b.browser.msie){var g=b(document).height(),i=b(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,g-i<20?i:g]}return[b(document).width(),b(document).height()]}function h(g){if(g)return g.call(b.mask)}b.tools=b.tools||{version:"@VERSION"};var d;d=b.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,
onClose:null}};var a,e,c,f,j;b.mask={load:function(g,i){if(c)return this;if(typeof g=="string")g={color:g};g=g||f;f=g=b.extend(b.extend({},d.conf),g);a=b("#"+g.maskId);if(!a.length){a=b("<div/>").attr("id",g.maskId);b("body").append(a)}var n=m();a.css({position:"absolute",top:0,left:0,width:n[0],height:n[1],display:"none",opacity:g.startOpacity,zIndex:g.zIndex});g.color&&a.css("backgroundColor",g.color);if(h(g.onBeforeLoad)===false)return this;g.closeOnEsc&&b(document).bind("keydown.mask",function(l){l.keyCode==
27&&b.mask.close(l)});g.closeOnClick&&a.bind("click.mask",function(l){b.mask.close(l)});b(window).bind("resize.mask",function(){b.mask.fit()});if(i&&i.length){j=i.eq(0).css("zIndex");b.each(i,function(){var l=b(this);/relative|absolute|fixed/i.test(l.css("position"))||l.css("position","relative")});e=i.css({zIndex:Math.max(g.zIndex+1,j=="auto"?0:j)})}a.css({display:"block"}).fadeTo(g.loadSpeed,g.opacity,function(){b.mask.fit();h(g.onLoad)});c=true;return this},close:function(){if(c){if(h(f.onBeforeClose)===
false)return this;a.fadeOut(f.closeSpeed,function(){h(f.onClose);e&&e.css({zIndex:j})});b(document).unbind("keydown.mask");a.unbind("click.mask");b(window).unbind("resize.mask");c=false}return this},fit:function(){if(c){var g=m();a.css({width:g[0],height:g[1]})}},getMask:function(){return a},isLoaded:function(){return c},getConf:function(){return f},getExposed:function(){return e}};b.fn.mask=function(g){b.mask.load(g);return this};b.fn.expose=function(g){b.mask.load(g,this);return this}})(jQuery);
(function(b){function m(a,e){var c=this,f=a.add(c),j=b(window),g,i,n,l=b.tools.expose&&(e.mask||e.expose),r=Math.random().toString().slice(10);if(l){if(typeof l=="string")l={color:l};l.closeOnClick=l.closeOnEsc=false}var s=e.target||a.attr("rel");i=s?b(s):a;if(!i.length)throw"Could not find Overlay: "+s;a&&a.index(i)==-1&&a.click(function(k){c.load(k);return k.preventDefault()});b.extend(c,{load:function(k){if(c.isOpened())return c;var o=d[e.effect];if(!o)throw'Overlay: cannot find effect : "'+e.effect+
'"';e.oneInstance&&b.each(h,function(){this.close(k)});k=k||b.Event();k.type="onBeforeLoad";f.trigger(k);if(k.isDefaultPrevented())return c;n=true;l&&b(i).expose(l);var p=e.top,t=e.left,u=i.outerWidth({margin:true}),v=i.outerHeight({margin:true});if(typeof p=="string")p=p=="center"?Math.max((j.height()-v)/2,0):parseInt(p,10)/100*j.height();if(t=="center")t=Math.max((j.width()-u)/2,0);o[0].call(c,{top:p,left:t},function(){if(n){k.type="onLoad";f.trigger(k)}});l&&e.closeOnClick&&b.mask.getMask().one("click",
c.close);e.closeOnClick&&b(document).bind("click."+r,function(q){b(q.target).parents(i).length||c.close(q)});e.closeOnEsc&&b(document).bind("keydown."+r,function(q){q.keyCode==27&&c.close(q)});return c},close:function(k){if(!c.isOpened())return c;k=k||b.Event();k.type="onBeforeClose";f.trigger(k);if(!k.isDefaultPrevented()){n=false;d[e.effect][1].call(c,function(){k.type="onClose";f.trigger(k)});b(document).unbind("click."+r).unbind("keydown."+r);l&&b.mask.close();return c}},getOverlay:function(){return i},
getTrigger:function(){return a},getClosers:function(){return g},isOpened:function(){return n},getConf:function(){return e}});b.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(k,o){b.isFunction(e[o])&&b(c).bind(o,e[o]);c[o]=function(p){b(c).bind(o,p);return c}});g=i.find(e.close||".close");if(!g.length&&!e.close){g=b('<a class="close"></a>');i.prepend(g)}g.click(function(k){c.close(k)});e.load&&c.load()}b.tools=b.tools||{version:"@VERSION"};b.tools.overlay={addEffect:function(a,
e,c){d[a]=[e,c]},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:"fast",effect:"default",fixed:!b.browser.msie||b.browser.version>6,left:"center",load:false,mask:null,oneInstance:true,speed:"normal",target:null,top:"10%"}};var h=[],d={};b.tools.overlay.addEffect("default",function(a,e){var c=this.getConf(),f=b(window);if(!c.fixed){a.top+=f.scrollTop();a.left+=f.scrollLeft()}a.position=c.fixed?"fixed":"absolute";this.getOverlay().css(a).fadeIn(c.speed,e)},function(a){this.getOverlay().fadeOut(this.getConf().closeSpeed,
a)});b.fn.overlay=function(a){var e=this.data("overlay");if(e)return e;if(b.isFunction(a))a={onBeforeLoad:a};a=b.extend(true,{},b.tools.overlay.conf,a);this.each(function(){e=new m(b(this),a);h.push(e);b(this).data("overlay",e)});return a.api?e:this}})(jQuery);
(function(b,m){var h=m.schema.edit={init_edit_form:function(d){if(d.mode==="add")b("tbody",d.table).append(d.row);else if(d.mode==="edit")d.trigger_row.before(d.row);else throw"Unknown edit type mode: "+d.mode;d.trigger_row.before(d.submit_row);var a=d.event_prefix||"fb.schema.edit.";d.row.bind(a+"submit",function(){console.log(a+"submit");h.submit_edit_form(d)}).bind(a+"cancel",function(){console.log(a+"cancel");h.cancel_edit_form(d)}).bind(a+"error",function(e,c,f){console.log(a+"error",c,f);h.row_error(c,
f);d.row.removeClass("loading")}).bind(a+"success",function(){console.log(a+"success");d.row.removeClass("loading")});b(".button-submit",d.submit_row).click(function(){d.row.trigger(a+"submit")});b(".button-cancel",d.submit_row).click(function(){d.row.trigger(a+"cancel")});typeof d.init_form==="function"&&d.init_form(d);d.row.showRow(function(){b(":text:first",d.row).focus()});d.trigger_row.hide();d.submit_row.show()},cancel_edit_form:function(d){d.row.hideRow(function(){b(this).remove()});h.clear_row_message(d.row);
d.submit_row.remove();d.trigger_row.show();d.trigger.removeClass("editing")},submit_edit_form:function(d){if(!d.row.is(".loading")){document.activeElement&&b(document.activeElement).blur();h.clear_row_message(d.row);typeof d.validate_form==="function"&&d.validate_form(d);if(!h.has_row_message(d.row,"error")){d.row.addClass("loading");typeof d.submit_form==="function"&&d.submit_form(d)}}},ajax_error_handler:function(d,a,e){var c;try{c=JSON.parse(d.responseText);c=c.messages[0].message}catch(f){c=d.responseText}if(a){h.row_error(a,
c);a.removeClass("loading")}else if(e){h.form_error(e,c);e.removeClass("loading")}},row_error:function(d,a){return h.row_message(d,a,"error")},row_message:function(d,a,e){var c=b('<a class="close-msg" href="#">Close</a>').click(function(f){return m.schema.close_message.apply(this,[f,".row-msg:first"])});a=b("<span>").text(a);c=b('<td colspan="5">').append(c).append(a);c=b('<tr class="row-msg">').append(c);e&&c.addClass("row-msg-"+e);d.before(c);c.hide().showRow();a=d.data("row-msg");if(!a){a={};d.data("row-msg",
a)}if(a[e])a[e].push(c);else a[e]=[c];return c},clear_row_message:function(d){var a=d.data("row-msg");if(a){b.each(a,function(e,c){b.each(c,function(f,j){j.remove()})});d.removeData("row-msg")}},has_row_message:function(d,a){var e=d.data("row-msg");if(a)return e&&e[a]&&e[a].length;return e!=null},init_modal_form:function(d){b(document.body).append(d.form.hide());var a=d.event_prefix||"fb.schema.edit.modal.";d.form.bind(a+"submit",function(){console.log(a+"submit");h.submit_modal_form(d)}).bind(a+
"error",function(e,c){console.log(a+"error",c);h.form_error(d.form,c)}).bind(a+"success",function(){console.log(a+"success");d.form.removeClass("loading")});b(".button-submit",d.form).click(function(){d.form.trigger(a+"submit")});typeof d.init_form==="function"&&d.init_form(d);d.form.overlay({close:".button-cancel",closeOnClick:false,load:true,mask:{color:"#000",loadSpeed:200,opacity:0.5}})},submit_modal_form:function(d){if(!d.form.is(".loading")){document.activeElement&&b(document.activeElement).blur();
h.clear_form_message(d.form);typeof d.validate_form==="function"&&d.validate_form(d);if(!h.has_form_message(d.form,"error")){d.form.addClass("loading");typeof d.submit_form==="function"&&d.submit_form(d)}}},form_error:function(d,a){return h.form_message(d,a,"error")},form_message:function(d,a,e){a=b("<div class='form-msg'>").text(a).hide();b(".form-group",d).prepend(a);a.slideDown();var c=d.data("form-msg");if(!c){c={};d.data("form-msg",c)}if(c[e])c[e].push(a);else c[e]=[a];return a},clear_form_message:function(d){var a=
d.data("form-msg");if(a){b.each(a,function(e,c){b.each(c,function(f,j){j.remove()})});d.removeData("form-msg")}},has_form_message:function(d,a){var e=d.data("form-msg");if(a)return e&&e[a]&&e[a].length;return e!=null}}})(jQuery,window.freebase);
(function(b,m){var h=m.schema.edit,d=m.schema.domain.edit={domain_settings_begin:function(a,e){b.ajax({url:acre.request.app_url+"/schema/domain/domain_settings_begin",data:{id:e},dataType:"json",success:function(c){c=b(c.result.html);c={event_prefix:"fb.schema.domain.settings.",ajax:{url:acre.request.app_url+"/schema/domain/domain_settings_submit",data:{id:e}},init_form:d.init_domain_settings_form,validate_form:d.validate_domain_settings_form,submit_form:d.submit_domain_settings_form,form:c};h.init_modal_form(c);
c.form.bind(c.event_prefix+"success",function(f,j){window.location=j.location})}})},init_domain_settings_form:function(a){b(":input:not(textarea)",a.form).keypress(function(e){e.keyCode===13&&!e.isDefaultPrevented()&&a.form.trigger(a.event_prefix+"submit")})},validate_domain_settings_form:function(a){var e=b.trim(b("input[name=name]",a.form).val()),c=b.trim(b("input[name=key]",a.form).val()).toLowerCase();if(e===""||c==="")a.form.trigger(a.event_prefix+"error","Name and Key are required");else/^[a-z][a-z0-9_\-]{3,}$/.test(c)||
a.form.trigger(a.event_prefix+"error","Key must be four or more alphanumeric characters, no spaces and not begin with a number")},submit_domain_settings_form:function(a){var e=b.trim(b(":input[name=name]",a.row).val()),c=b.trim(b("input[name=key]",a.form).val()).toLowerCase();e={name:e,key:c,namespace:b("input[name=namespace]",a.form).val(),description:b("textarea[name=description]",a.form).val()};b.ajax({url:a.ajax.url,type:"POST",dataType:"json",data:b.extend(e,a.ajax.data),success:function(f,j,
g){if(f.code==="/api/status/error")return h.ajax_error_handler(g,null,a.form);a.form.trigger(a.event_prefix+"success",f.result)},error:function(f){h.ajax_error_handler(f,null,a.form)}})},add_type_begin:function(a,e,c){b.ajax({url:acre.request.app_url+"/schema/domain/add_type_begin",data:{id:e,role:c},dataType:"json",success:function(f,j,g){if(f.code==="/api/status/error")return h.ajax_error_handler(g,row);f=b(f.result.html);var i={mode:"add",event_prefix:"fb.schema.domain.add.type.",ajax:{url:acre.request.app_url+
"/schema/domain/add_type_submit"},init_form:d.init_type_form,validate_form:d.validate_type_form,submit_form:d.submit_type_form,table:a.parents("table:first"),trigger:a,trigger_row:a.parents("tr:first"),row:b(".edit-row",f).hide(),submit_row:b(".edit-row-submit",f).hide()};h.init_edit_form(i);i.row.bind("fb.schema.domain.add.type.success",function(){var n=b("thead:first .table-empty-column",i.table);n.length&&n.parents("tr:first").hide().prev("tr").show();b(".button-cancel",i.submit_row).text("Done");
d.init_type_form(i)})},error:function(f){h.ajax_error_handler(f,row)}})},edit_type_begin:function(a,e){b.ajax({url:acre.request.app_url+"/schema/domain/edit_type_begin",data:{id:e},dataType:"json",success:function(c,f,j){if(c.code==="/api/status/error")return h.ajax_error_handler(j,row);c=b(c.result.html);var g={mode:"edit",event_prefix:"fb.schema.domain.edit.type.",ajax:{url:acre.request.app_url+"/schema/domain/edit_type_submit",data:{id:e}},init_form:d.init_type_form,validate_form:d.validate_type_form,
submit_form:d.submit_type_form,table:a.parents("table:first"),trigger:a,trigger_row:a.parents("tr:first"),row:b(".edit-row",c).hide(),submit_row:b(".edit-row-submit",c).hide()};h.init_edit_form(g);g.row.bind("fb.schema.domain.edit.type.success",function(){g.trigger_row.remove();g.row.remove();g.submit_row.remove()})},error:function(c){h.ajax_error_handler(c,row)}})},init_type_form:function(a){var e=b(":input[name=name]",a.row),c=b(":input[name=key]",a.row),f=b(":input[name=description]",a.row);if(a.mode===
"add"){e.val("");c.val("").data("changed",false);f.val("")}else c.data("changed",true);if(!a.row.data("initialized")){c.change(function(){b(this).data("changed",true)});e.change(function(){if(!c.data("changed")){var j=b.trim(e.val()).toLowerCase().replace(/\s+/g,"_");c.val(j)}});b(":input:not(textarea)",a.row).keypress(function(j){if(j.keyCode===13)a.row.trigger(a.event_prefix+"submit");else j.keyCode===27&&a.row.trigger(a.event_prefix+"cancel")});a.row.data("initialized",true)}e.focus()},submit_type_form:function(a){var e=
b.trim(b(":input[name=name]",a.row).val()),c=b.trim(b(":input[name=key]",a.row).val()).toLowerCase();e={domain:b(":input[name=domain]",a.row).val(),name:e,key:c,description:b(":input[name=description]",a.row).val()};if(a.mode==="add")e.role=b(":input[name=role]",a.row).val();b.ajax({url:a.ajax.url,type:"POST",dataType:"json",data:b.extend(e,a.ajax.data),success:function(f,j,g){if(f.code==="/api/status/error")return h.ajax_error_handler(g,a.row);var i=b(f.result.html).addClass("new-row");a.row.before(i);
i.hide();i.showRow(function(){m.schema.init_row_menu(i);b(".edit",i).show()},null,"slow");a.row.trigger(a.event_prefix+"success")},error:function(f){h.ajax_error_handler(f,a.row)}})},validate_type_form:function(a){var e=b.trim(b(":input[name=name]",a.row).val()),c=b.trim(b(":input[name=key]",a.row).val());if(e===""||c==="")a.row.trigger(a.event_prefix+"error",[a.row,"Name and Key are required"])},delete_type_begin:function(a,e){var c=a.parents("tr:first");c.parents("table:first");b.ajax({url:acre.request.app_url+
"/schema/domain/delete_type_submit",data:{id:e,user:m.user.id},type:"POST",dataType:"json",success:function(f,j,g){if(f.code==="/api/status/error")return h.ajax_error_handler(g,c);f=b(f.result.html).addClass("new-row");c.before(f);f.hide();c.remove();f.showRow()},error:function(f){h.ajax_error_handler(f,c)}})},undo_delete_type_begin:function(a,e){var c=a.parents("tr:first");c.parents("table:first");b.ajax({url:acre.request.app_url+"/schema/domain/undo_delete_type_submit",data:{type_info:JSON.stringify(e)},
type:"POST",dataType:"json",success:function(f,j,g){if(f.code==="/api/status/error")return h.ajax_error_handler(g,c);var i=b(f.result.html).addClass("new-row");c.before(i);i.hide();c.remove();i.showRow(function(){m.schema.init_row_menu(i);b(".edit",i).show()},null,"slow")},error:function(f){h.ajax_error_handler(f,c)}})}}})(jQuery,window.freebase);
