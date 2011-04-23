
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
 
 jQuery Tools @VERSION Tabs- The basics of UI design.

 NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.

 http://flowplayer.org/tools/tabs/

 Since: November 2008
 Date: @DATE 
*/
(function(a){function p(d,c,e){var f=this,l=d.add(this),i=d.find(e.tabs),m=c.jquery?c:d.children(c),u;i.length||(i=d.children());m.length||(m=d.parent().find(c));m.length||(m=a(c));a.extend(this,{click:function(j,k){var t=i.eq(j);if(typeof j=="string"&&j.replace("#","")){j=j.replace(/([\"\#\$\%\&\'\(\)\*\+\,\.\/\:\;\<\=\>\?\@\[\\\]\^\`\{\|\}\~])/g,"\\$1");t=i.filter("[href*="+j.replace("#","")+"]");j=Math.max(i.index(t),0)}if(e.rotate){var o=i.length-1;if(j<0)return f.click(o,k);if(j>o)return f.click(0,
k)}if(!t.length){if(u>=0)return f;j=e.initialIndex;t=i.eq(j)}if(j===u)return f;k=k||a.Event();k.type="onBeforeClick";l.trigger(k,[j]);if(!k.isDefaultPrevented()){b[e.effect].call(f,j,function(){k.type="onClick";l.trigger(k,[j])});u=j;i.removeClass(e.current);t.addClass(e.current);return f}},getConf:function(){return e},getTabs:function(){return i},getPanes:function(){return m},getCurrentPane:function(){return m.eq(u)},getCurrentTab:function(){return i.eq(u)},getIndex:function(){return u},next:function(){return f.click(u+
1)},prev:function(){return f.click(u-1)},destroy:function(){i.unbind(e.event).removeClass(e.current);m.find("a[href^=#]").unbind("click.T");return f}});a.each("onBeforeClick,onClick".split(","),function(j,k){a.isFunction(e[k])&&a(f).bind(k,e[k]);f[k]=function(t){a(f).bind(k,t);return f}});if(e.history&&a.fn.history){a.tools.history.init(i);e.event="history"}i.each(function(j){a(this).bind(e.event,function(k){f.click(j,k);return k.preventDefault()})});m.find("a[href^=#]").bind("click.T",function(j){f.click(a(this).attr("href"),
j)});if(location.hash)f.click(location.hash);else if(e.initialIndex===0||e.initialIndex>0)f.click(e.initialIndex)}a.tools=a.tools||{version:"@VERSION"};a.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:false,history:false},addEffect:function(d,c){b[d]=c}};var b={"default":function(d,c){this.getPanes().hide().eq(d).show();c.call()},fade:function(d,c){var e=this.getConf(),f=e.fadeOutSpeed,l=this.getPanes();f?l.fadeOut(f):
l.hide();l.eq(d).fadeIn(e.fadeInSpeed,c)},slide:function(d,c){this.getPanes().slideUp(200);this.getPanes().eq(d).slideDown(400,c)},ajax:function(d,c){this.getPanes().eq(0).load(this.getTabs().eq(d).attr("href"),c)}},h;a.tools.tabs.addEffect("horizontal",function(d,c){h||(h=this.getPanes().eq(0).width());this.getCurrentPane().animate({width:0},function(){a(this).hide()});this.getPanes().eq(d).animate({width:h},function(){a(this).show();c.call()})});a.fn.tabs=function(d,c){var e=this.data("tabs");if(e){e.destroy();
this.removeData("tabs")}if(a.isFunction(c))c={onBeforeClick:c};c=a.extend({},a.tools.tabs.conf,c);this.each(function(){e=new p(a(this),d,c);a(this).data("tabs",e)});return c.api?e:this}})(jQuery);
(function(a){function p(){if(a.fn.ajaxSubmit.debug){var b="[jquery.form] "+Array.prototype.join.call(arguments,"");if(window.console&&window.console.log)window.console.log(b);else window.opera&&window.opera.postError&&window.opera.postError(b)}}a.fn.ajaxSubmit=function(b){function h(){function j(){var r=i.attr("target"),q=i.attr("action");o.setAttribute("target",w);o.getAttribute("method")!="POST"&&o.setAttribute("method","POST");o.getAttribute("action")!=g.url&&o.setAttribute("action",g.url);g.skipEncodingOverride||
i.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});g.timeout&&setTimeout(function(){F=true;k()},g.timeout);var x=[];try{if(g.extraData)for(var y in g.extraData)x.push(a('<input type="hidden" name="'+y+'" value="'+g.extraData[y]+'" />').appendTo(o)[0]);v.appendTo("body");v.data("form-plugin-onload",k);o.submit()}finally{o.setAttribute("action",q);r?o.setAttribute("target",r):i.removeAttr("target");a(x).remove()}}function k(){if(!G){v.removeData("form-plugin-onload");var r=true;
try{if(F)throw"timeout";s=z.contentWindow?z.contentWindow.document:z.contentDocument?z.contentDocument:z.document;var q=g.dataType=="xml"||s.XMLDocument||a.isXMLDoc(s);p("isXml="+q);if(!q&&window.opera&&(s.body==null||s.body.innerHTML==""))if(--J){p("requeing onLoad callback, DOM not available");setTimeout(k,250);return}G=true;n.responseText=s.documentElement?s.documentElement.innerHTML:null;n.responseXML=s.XMLDocument?s.XMLDocument:s;n.getResponseHeader=function(K){return{"content-type":g.dataType}[K]};
var x=/(json|script)/.test(g.dataType);if(x||g.textarea){var y=s.getElementsByTagName("textarea")[0];if(y)n.responseText=y.value;else if(x){var H=s.getElementsByTagName("pre")[0];if(H)n.responseText=H.innerHTML}}else if(g.dataType=="xml"&&!n.responseXML&&n.responseText!=null)n.responseXML=t(n.responseText);I=a.httpData(n,g.dataType)}catch(D){p("error caught:",D);r=false;n.error=D;a.handleError(g,n,"error",D)}if(r){g.success.call(g.context,I,"success",n);A&&a.event.trigger("ajaxSuccess",[n,g])}A&&
a.event.trigger("ajaxComplete",[n,g]);A&&!--a.active&&a.event.trigger("ajaxStop");if(g.complete)g.complete.call(g.context,n,r?"success":"error");setTimeout(function(){v.removeData("form-plugin-onload");v.remove();n.responseXML=null},100)}}function t(r,q){if(window.ActiveXObject){q=new ActiveXObject("Microsoft.XMLDOM");q.async="false";q.loadXML(r)}else q=(new DOMParser).parseFromString(r,"text/xml");return q&&q.documentElement&&q.documentElement.tagName!="parsererror"?q:null}var o=i[0];if(a(":input[name=submit],:input[id=submit]",
o).length)alert('Error: Form elements must not have name or id of "submit".');else{var g=a.extend(true,{},a.ajaxSettings,b);g.context=g.context||g;var w="jqFormIO"+(new Date).getTime(),E="_"+w;window[E]=function(){var r=v.data("form-plugin-onload");if(r){r();window[E]=undefined;try{delete window[E]}catch(q){}}};var v=a('<iframe id="'+w+'" name="'+w+'" src="'+g.iframeSrc+'" onload="window[\'_\'+this.id]()" />'),z=v[0];v.css({position:"absolute",top:"-1000px",left:"-1000px"});var n={aborted:0,responseText:null,
responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(){this.aborted=1;v.attr("src",g.iframeSrc)}},A=g.global;A&&!a.active++&&a.event.trigger("ajaxStart");A&&a.event.trigger("ajaxSend",[n,g]);if(g.beforeSend&&g.beforeSend.call(g.context,n,g)===false)g.global&&a.active--;else if(!n.aborted){var G=false,F=0,B=o.clk;if(B){var C=B.name;if(C&&!B.disabled){g.extraData=g.extraData||{};g.extraData[C]=B.value;
if(B.type=="image"){g.extraData[C+".x"]=o.clk_x;g.extraData[C+".y"]=o.clk_y}}}g.forceSync?j():setTimeout(j,10);var I,s,J=50}}}if(!this.length){p("ajaxSubmit: skipping submit process - no element selected");return this}if(typeof b=="function")b={success:b};var d=a.trim(this.attr("action"));if(d)d=(d.match(/^([^#]+)/)||[])[1];d=d||window.location.href||"";b=a.extend(true,{url:d,type:this.attr("method")||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},b);d=
{};this.trigger("form-pre-serialize",[this,b,d]);if(d.veto){p("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this}if(b.beforeSerialize&&b.beforeSerialize(this,b)===false){p("ajaxSubmit: submit aborted via beforeSerialize callback");return this}var c,e,f=this.formToArray(b.semantic);if(b.data){b.extraData=b.data;for(c in b.data)if(b.data[c]instanceof Array)for(var l in b.data[c])f.push({name:c,value:b.data[c][l]});else{e=b.data[c];e=a.isFunction(e)?e():e;f.push({name:c,value:e})}}if(b.beforeSubmit&&
b.beforeSubmit(f,this,b)===false){p("ajaxSubmit: submit aborted via beforeSubmit callback");return this}this.trigger("form-submit-validate",[f,this,b,d]);if(d.veto){p("ajaxSubmit: submit vetoed via form-submit-validate trigger");return this}c=a.param(f);if(b.type.toUpperCase()=="GET"){b.url+=(b.url.indexOf("?")>=0?"&":"?")+c;b.data=null}else b.data=c;var i=this,m=[];b.resetForm&&m.push(function(){i.resetForm()});b.clearForm&&m.push(function(){i.clearForm()});if(!b.dataType&&b.target){var u=b.success||
function(){};m.push(function(j){var k=b.replaceTarget?"replaceWith":"html";a(b.target)[k](j).each(u,arguments)})}else b.success&&m.push(b.success);b.success=function(j,k,t){for(var o=b.context||b,g=0,w=m.length;g<w;g++)m[g].apply(o,[j,k,t||i,i])};c=a("input:file",this).length>0;l=i.attr("enctype")=="multipart/form-data"||i.attr("encoding")=="multipart/form-data";if(b.iframe!==false&&(c||b.iframe||l))b.closeKeepAlive?a.get(b.closeKeepAlive,h):h();else a.ajax(b);this.trigger("form-submit-notify",[this,
b]);return this};a.fn.ajaxForm=function(b){if(this.length===0){var h={s:this.selector,c:this.context};if(!a.isReady&&h.s){p("DOM not ready, queuing ajaxForm");a(function(){a(h.s,h.c).ajaxForm(b)});return this}p("terminating; zero elements found by selector"+(a.isReady?"":" (DOM not ready)"));return this}return this.ajaxFormUnbind().bind("submit.form-plugin",function(d){if(!d.isDefaultPrevented()){d.preventDefault();a(this).ajaxSubmit(b)}}).bind("click.form-plugin",function(d){var c=d.target,e=a(c);
if(!e.is(":submit,input:image")){c=e.closest(":submit");if(c.length==0)return;c=c[0]}var f=this;f.clk=c;if(c.type=="image")if(d.offsetX!=undefined){f.clk_x=d.offsetX;f.clk_y=d.offsetY}else if(typeof a.fn.offset=="function"){e=e.offset();f.clk_x=d.pageX-e.left;f.clk_y=d.pageY-e.top}else{f.clk_x=d.pageX-c.offsetLeft;f.clk_y=d.pageY-c.offsetTop}setTimeout(function(){f.clk=f.clk_x=f.clk_y=null},100)})};a.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")};a.fn.formToArray=
function(b){var h=[];if(this.length===0)return h;var d=this[0],c=b?d.getElementsByTagName("*"):d.elements;if(!c)return h;var e,f,l,i;e=0;for(max=c.length;e<max;e++){f=c[e];if(l=f.name)if(b&&d.clk&&f.type=="image"){if(!f.disabled&&d.clk==f){h.push({name:l,value:a(f).val()});h.push({name:l+".x",value:d.clk_x},{name:l+".y",value:d.clk_y})}}else if((i=a.fieldValue(f,true))&&i.constructor==Array){f=0;for(jmax=i.length;f<jmax;f++)h.push({name:l,value:i[f]})}else i!==null&&typeof i!="undefined"&&h.push({name:l,
value:i})}if(!b&&d.clk){b=a(d.clk);c=b[0];if((l=c.name)&&!c.disabled&&c.type=="image"){h.push({name:l,value:b.val()});h.push({name:l+".x",value:d.clk_x},{name:l+".y",value:d.clk_y})}}return h};a.fn.formSerialize=function(b){return a.param(this.formToArray(b))};a.fn.fieldSerialize=function(b){var h=[];this.each(function(){var d=this.name;if(d){var c=a.fieldValue(this,b);if(c&&c.constructor==Array)for(var e=0,f=c.length;e<f;e++)h.push({name:d,value:c[e]});else c!==null&&typeof c!="undefined"&&h.push({name:this.name,
value:c})}});return a.param(h)};a.fn.fieldValue=function(b){for(var h=[],d=0,c=this.length;d<c;d++){var e=a.fieldValue(this[d],b);e===null||typeof e=="undefined"||e.constructor==Array&&!e.length||(e.constructor==Array?a.merge(h,e):h.push(e))}return h};a.fieldValue=function(b,h){var d=b.name,c=b.type,e=b.tagName.toLowerCase();if(h===undefined)h=true;if(h&&(!d||b.disabled||c=="reset"||c=="button"||(c=="checkbox"||c=="radio")&&!b.checked||(c=="submit"||c=="image")&&b.form&&b.form.clk!=b||e=="select"&&
b.selectedIndex==-1))return null;if(e=="select"){var f=b.selectedIndex;if(f<0)return null;d=[];e=b.options;var l=(c=c=="select-one")?f+1:e.length;for(f=c?f:0;f<l;f++){var i=e[f];if(i.selected){var m=i.value;m||(m=i.attributes&&i.attributes.value&&!i.attributes.value.specified?i.text:i.value);if(c)return m;d.push(m)}}return d}return a(b).val()};a.fn.clearForm=function(){return this.each(function(){a("input,select,textarea",this).clearFields()})};a.fn.clearFields=a.fn.clearInputs=function(){return this.each(function(){var b=
this.type,h=this.tagName.toLowerCase();if(b=="text"||b=="password"||h=="textarea")this.value="";else if(b=="checkbox"||b=="radio")this.checked=false;else if(h=="select")this.selectedIndex=-1})};a.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||typeof this.reset=="object"&&!this.reset.nodeType)this.reset()})};a.fn.enable=function(b){if(b===undefined)b=true;return this.each(function(){this.disabled=!b})};a.fn.selected=function(b){if(b===undefined)b=true;return this.each(function(){var h=
this.type;if(h=="checkbox"||h=="radio")this.checked=b;else if(this.tagName.toLowerCase()=="option"){h=a(this).parent("select");b&&h[0]&&h[0].type=="select-one"&&h.find("option").selected(false);this.selected=b}})}})(jQuery);
$(function(){$("#apps-search > .section-tabset").tabs("#apps-search > .search-box");$("#user-search-input").closest("form").submit(function(){return false});$("#user-search-input").suggest({type:"/type/user"}).bind("fb-select",function(a,p){location.href=bp+p.id}).focus(function(){this.select()});$("#create-link").click(function(){$.post(bp+"/post/submit/create_app",null,function(a){window.location=bp+"/admin"+a.result},"json");return false});$("#edit-props").ajaxForm({dataType:"json",success:function(a){if(a.code==
"/api/status/ok")window.location.href=bp+a.result.appid;else alert("Error updating listing")}});$("#icon_form").ajaxForm({dataType:"json",beforeSubmit:function(a,p,b){b.url+="?appid="+app.id+"&name="+$("#icon_file").val()},success:function(a){if(a.code==="/api/status/ok"){app.icon=a.result;$("#icon_name").text(a.result.name);$("#icon_delete").text("delete");$("#icon_file").val("")}else if(a.messages&&a.messages[0]&&a.messages[0].message){console.log(a);alert(a.messages[0].message)}else alert("Error uploading")}});
$("#icon_file").change(function(){$("#icon_upload_error").text("");$("#icon_form").submit()});$("#icon_delete").click(function(){$.post(bp+"/post/submit/delete_icon",{appid:app.id,iconid:app.icon.id},function(){$("#icon_name").text("No icon");$("#icon_delete").text("")},"json");return false})});
