
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
 
 jQuery Tools @VERSION Tooltip - UI essentials

 NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.

 http://flowplayer.org/tools/tooltip/

 Since: November 2008
 Date: @DATE 
*/
(function(c,q){var s=0,o=0;c.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)},_setOption:function(a,d){if(a=="selected")this.options.collapsible&&d==this.options.selected||
this.select(d);else{this.options[a]=d;this._tabify()}},_tabId:function(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+ ++s},_sanitizeSelector:function(a){return a.replace(/:/g,"\\:")},_cookie:function(){var a=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+ ++o);return c.cookie.apply(null,[a].concat(c.makeArray(arguments)))},_ui:function(a,d){return{tab:a,panel:d,index:this.anchors.index(a)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var a=
c(this);a.html(a.data("label.tabs")).removeData("label.tabs")})},_tabify:function(a){function d(m,j){m.css("display","");!c.support.opacity&&j.opacity&&m[0].style.removeAttribute("filter")}var b=this,e=this.options,f=/^#.+/;this.list=this.element.find("ol,ul").eq(0);this.lis=c("li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return c("a",this)[0]});this.panels=c([]);this.anchors.each(function(m,j){var p=c(j).attr("href"),h=p.split("#")[0],r;if(h&&(h===location.toString().split("#")[0]||
(r=c("base")[0])&&h===r.href)){p=j.hash;j.href=p}if(f.test(p))b.panels=b.panels.add(b._sanitizeSelector(p));else if(p!=="#"){c.data(j,"href.tabs",p);c.data(j,"load.tabs",p.replace(/#.*$/,""));p=b._tabId(j);j.href="#"+p;h=c("#"+p);if(!h.length){h=c(e.panelTemplate).attr("id",p).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(b.panels[m-1]||b.list);h.data("destroy.tabs",true)}b.panels=b.panels.add(h)}else e.disabled.push(m)});if(a){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(e.selected===q){location.hash&&this.anchors.each(function(m,j){if(j.hash==location.hash){e.selected=m;return false}});if(typeof e.selected!=="number"&&e.cookie)e.selected=parseInt(b._cookie(),10);if(typeof e.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length)e.selected=
this.lis.index(this.lis.filter(".ui-tabs-selected"));e.selected=e.selected||(this.lis.length?0:-1)}else if(e.selected===null)e.selected=-1;e.selected=e.selected>=0&&this.anchors[e.selected]||e.selected<0?e.selected:0;e.disabled=c.unique(e.disabled.concat(c.map(this.lis.filter(".ui-state-disabled"),function(m){return b.lis.index(m)}))).sort();c.inArray(e.selected,e.disabled)!=-1&&e.disabled.splice(c.inArray(e.selected,e.disabled),1);this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");
if(e.selected>=0&&this.anchors.length){this.panels.eq(e.selected).removeClass("ui-tabs-hide");this.lis.eq(e.selected).addClass("ui-tabs-selected ui-state-active");b.element.queue("tabs",function(){b._trigger("show",null,b._ui(b.anchors[e.selected],b.panels[e.selected]))});this.load(e.selected)}c(window).bind("unload",function(){b.lis.add(b.anchors).unbind(".tabs");b.lis=b.anchors=b.panels=null})}else e.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"));this.element[e.collapsible?"addClass":
"removeClass"]("ui-tabs-collapsible");e.cookie&&this._cookie(e.selected,e.cookie);a=0;for(var g;g=this.lis[a];a++)c(g)[c.inArray(a,e.disabled)!=-1&&!c(g).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");e.cache===false&&this.anchors.removeData("cache.tabs");this.lis.add(this.anchors).unbind(".tabs");if(e.event!=="mouseover"){var k=function(m,j){j.is(":not(.ui-state-disabled)")&&j.addClass("ui-state-"+m)};this.lis.bind("mouseover.tabs",function(){k("hover",c(this))});this.lis.bind("mouseout.tabs",
function(){c(this).removeClass("ui-state-hover")});this.anchors.bind("focus.tabs",function(){k("focus",c(this).closest("li"))});this.anchors.bind("blur.tabs",function(){c(this).closest("li").removeClass("ui-state-focus")})}var i,l;if(e.fx)if(c.isArray(e.fx)){i=e.fx[0];l=e.fx[1]}else i=l=e.fx;var n=l?function(m,j){c(m).closest("li").addClass("ui-tabs-selected ui-state-active");j.hide().removeClass("ui-tabs-hide").animate(l,l.duration||"normal",function(){d(j,l);b._trigger("show",null,b._ui(m,j[0]))})}:
function(m,j){c(m).closest("li").addClass("ui-tabs-selected ui-state-active");j.removeClass("ui-tabs-hide");b._trigger("show",null,b._ui(m,j[0]))},u=i?function(m,j){j.animate(i,i.duration||"normal",function(){b.lis.removeClass("ui-tabs-selected ui-state-active");j.addClass("ui-tabs-hide");d(j,i);b.element.dequeue("tabs")})}:function(m,j){b.lis.removeClass("ui-tabs-selected ui-state-active");j.addClass("ui-tabs-hide");b.element.dequeue("tabs")};this.anchors.bind(e.event+".tabs",function(){var m=this,
j=c(m).closest("li"),p=b.panels.filter(":not(.ui-tabs-hide)"),h=c(b._sanitizeSelector(m.hash));if(j.hasClass("ui-tabs-selected")&&!e.collapsible||j.hasClass("ui-state-disabled")||j.hasClass("ui-state-processing")||b._trigger("select",null,b._ui(this,h[0]))===false){this.blur();return false}e.selected=b.anchors.index(this);b.abort();if(e.collapsible)if(j.hasClass("ui-tabs-selected")){e.selected=-1;e.cookie&&b._cookie(e.selected,e.cookie);b.element.queue("tabs",function(){u(m,p)}).dequeue("tabs");this.blur();
return false}else if(!p.length){e.cookie&&b._cookie(e.selected,e.cookie);b.element.queue("tabs",function(){n(m,h)});b.load(b.anchors.index(this));this.blur();return false}e.cookie&&b._cookie(e.selected,e.cookie);if(h.length){p.length&&b.element.queue("tabs",function(){u(m,p)});b.element.queue("tabs",function(){n(m,h)});b.load(b.anchors.index(this))}else throw"jQuery UI Tabs: Mismatching fragment identifier.";c.browser.msie&&this.blur()});this.anchors.bind("click.tabs",function(){return false})},_getIndex:function(a){if(typeof a==
"string")a=this.anchors.index(this.anchors.filter("[href$="+a+"]"));return a},destroy:function(){var a=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var d=c.data(this,"href.tabs");if(d)this.href=d;var b=c(this).unbind(".tabs");c.each(["href","load","cache"],
function(e,f){b.removeData(f+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){c.data(this,"destroy.tabs")?c(this).remove():c(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")});a.cookie&&this._cookie(null,a.cookie);return this},add:function(a,d,b){if(b===q)b=this.anchors.length;var e=this,f=this.options;d=c(f.tabTemplate.replace(/#\{href\}/g,
a).replace(/#\{label\}/g,d));a=!a.indexOf("#")?a.replace("#",""):this._tabId(c("a",d)[0]);d.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var g=c("#"+a);g.length||(g=c(f.panelTemplate).attr("id",a).data("destroy.tabs",true));g.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(b>=this.lis.length){d.appendTo(this.list);g.appendTo(this.list[0].parentNode)}else{d.insertBefore(this.lis[b]);g.insertBefore(this.panels[b])}f.disabled=c.map(f.disabled,function(k){return k>=
b?++k:k});this._tabify();if(this.anchors.length==1){f.selected=0;d.addClass("ui-tabs-selected ui-state-active");g.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){e._trigger("show",null,e._ui(e.anchors[0],e.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[b],this.panels[b]));return this},remove:function(a){a=this._getIndex(a);var d=this.options,b=this.lis.eq(a).remove(),e=this.panels.eq(a).remove();if(b.hasClass("ui-tabs-selected")&&this.anchors.length>1)this.select(a+
(a+1<this.anchors.length?1:-1));d.disabled=c.map(c.grep(d.disabled,function(f){return f!=a}),function(f){return f>=a?--f:f});this._tabify();this._trigger("remove",null,this._ui(b.find("a")[0],e[0]));return this},enable:function(a){a=this._getIndex(a);var d=this.options;if(c.inArray(a,d.disabled)!=-1){this.lis.eq(a).removeClass("ui-state-disabled");d.disabled=c.grep(d.disabled,function(b){return b!=a});this._trigger("enable",null,this._ui(this.anchors[a],this.panels[a]));return this}},disable:function(a){a=
this._getIndex(a);var d=this.options;if(a!=d.selected){this.lis.eq(a).addClass("ui-state-disabled");d.disabled.push(a);d.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[a],this.panels[a]))}return this},select:function(a){a=this._getIndex(a);if(a==-1)if(this.options.collapsible&&this.options.selected!=-1)a=this.options.selected;else return this;this.anchors.eq(a).trigger(this.options.event+".tabs");return this},load:function(a){a=this._getIndex(a);var d=this,b=this.options,e=this.anchors.eq(a)[0],
f=c.data(e,"load.tabs");this.abort();if(!f||this.element.queue("tabs").length!==0&&c.data(e,"cache.tabs"))this.element.dequeue("tabs");else{this.lis.eq(a).addClass("ui-state-processing");if(b.spinner){var g=c("span",e);g.data("label.tabs",g.html()).html(b.spinner)}this.xhr=c.ajax(c.extend({},b.ajaxOptions,{url:f,success:function(k,i){c(d._sanitizeSelector(e.hash)).html(k);d._cleanup();b.cache&&c.data(e,"cache.tabs",true);d._trigger("load",null,d._ui(d.anchors[a],d.panels[a]));try{b.ajaxOptions.success(k,
i)}catch(l){}},error:function(k,i){d._cleanup();d._trigger("load",null,d._ui(d.anchors[a],d.panels[a]));try{b.ajaxOptions.error(k,i,a,e)}catch(l){}}}));d.element.dequeue("tabs");return this}},abort:function(){this.element.queue([]);this.panels.stop(false,true);this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup();return this},url:function(a,d){this.anchors.eq(a).removeData("cache.tabs").data("load.tabs",d);return this},length:function(){return this.anchors.length}});
c.extend(c.ui.tabs,{version:"1.8.4"});c.extend(c.ui.tabs.prototype,{rotation:null,rotate:function(a,d){var b=this,e=this.options,f=b._rotate||(b._rotate=function(k){clearTimeout(b.rotation);b.rotation=setTimeout(function(){var i=e.selected;b.select(++i<b.anchors.length?i:0)},a);k&&k.stopPropagation()}),g=b._unrotate||(b._unrotate=!d?function(k){k.clientX&&b.rotate(null)}:function(){t=e.selected;f()});if(a){this.element.bind("tabsshow",f);this.anchors.bind(e.event+".tabs",g);f()}else{clearTimeout(b.rotation);
this.element.unbind("tabsshow",f);this.anchors.unbind(e.event+".tabs",g);delete this._rotate;delete this._unrotate}return this}})})(jQuery);
(function(c){c.fn.showRow=function(q,s,o){s=s==="fadeIn"?"fadeIn":"slideDown";var a=this;return this.each(function(){var d=c(this).hide(),b=c("> td, > th",d).wrapInner('<div class="wrapInner" style="display: block;">');b=c(".wrapInner",b).hide();d.show();b[s](o,function(){c(this).each(function(){c(this).replaceWith(c(this).contents())});q&&q.call(a)})})};c.fn.hideRow=function(q,s,o){s=s==="fadeOut"?"fadeOut":"slideUp";var a=this;return this.each(function(){var d=c(this).show(),b=c("> td, > th",d).wrapInner('<div class="wrapInner" style="display: block;">');
c(".wrapInner",b)[s](o,function(){c(this).each(function(){c(this).replaceWith(c(this).contents())});d.hide();q&&q.call(a)})})}})(jQuery);
(function(c){function q(a,d,b){var e=this,f=a.add(this),g=a.find(b.tabs),k=d.jquery?d:a.children(d),i;g.length||(g=a.children());k.length||(k=a.parent().find(d));k.length||(k=c(d));c.extend(this,{click:function(l,n){var u=g.eq(l);if(typeof l=="string"&&l.replace("#","")){u=g.filter("[href*="+l.replace("#","")+"]");l=Math.max(g.index(u),0)}if(b.rotate){var m=g.length-1;if(l<0)return e.click(m,n);if(l>m)return e.click(0,n)}if(!u.length){if(i>=0)return e;l=b.initialIndex;u=g.eq(l)}if(l===i)return e;
n=n||c.Event();n.type="onBeforeClick";f.trigger(n,[l]);if(!n.isDefaultPrevented()){s[b.effect].call(e,l,function(){n.type="onClick";f.trigger(n,[l])});i=l;g.removeClass(b.current);u.addClass(b.current);return e}},getConf:function(){return b},getTabs:function(){return g},getPanes:function(){return k},getCurrentPane:function(){return k.eq(i)},getCurrentTab:function(){return g.eq(i)},getIndex:function(){return i},next:function(){return e.click(i+1)},prev:function(){return e.click(i-1)},destroy:function(){g.unbind(b.event).removeClass(b.current);
k.find("a[href^=#]").unbind("click.T");return e}});c.each("onBeforeClick,onClick".split(","),function(l,n){c.isFunction(b[n])&&c(e).bind(n,b[n]);e[n]=function(u){c(e).bind(n,u);return e}});if(b.history&&c.fn.history){c.tools.history.init(g);b.event="history"}g.each(function(l){c(this).bind(b.event,function(n){e.click(l,n);return n.preventDefault()})});k.find("a[href^=#]").bind("click.T",function(l){e.click(c(this).attr("href"),l)});if(location.hash)e.click(location.hash);else if(b.initialIndex===
0||b.initialIndex>0)e.click(b.initialIndex)}c.tools=c.tools||{version:"@VERSION"};c.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:false,history:false},addEffect:function(a,d){s[a]=d}};var s={"default":function(a,d){this.getPanes().hide().eq(a).show();d.call()},fade:function(a,d){var b=this.getConf(),e=b.fadeOutSpeed,f=this.getPanes();e?f.fadeOut(e):f.hide();f.eq(a).fadeIn(b.fadeInSpeed,d)},slide:function(a,d){this.getPanes().slideUp(200);
this.getPanes().eq(a).slideDown(400,d)},ajax:function(a,d){this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"),d)}},o;c.tools.tabs.addEffect("horizontal",function(a,d){o||(o=this.getPanes().eq(0).width());this.getCurrentPane().animate({width:0},function(){c(this).hide()});this.getPanes().eq(a).animate({width:o},function(){c(this).show();d.call()})});c.fn.tabs=function(a,d){var b=this.data("tabs");if(b){b.destroy();this.removeData("tabs")}if(c.isFunction(d))d={onBeforeClick:d};d=c.extend({},
c.tools.tabs.conf,d);this.each(function(){b=new q(c(this),a,d);c(this).data("tabs",b)});return d.api?b:this}})(jQuery);
(function(c){function q(a,d,b){var e=b.relative?a.position().top:a.offset().top,f=b.relative?a.position().left:a.offset().left,g=b.position[0];e-=d.outerHeight()-b.offset[0];f+=a.outerWidth()+b.offset[1];var k=d.outerHeight()+a.outerHeight();if(g=="center")e+=k/2;if(g=="bottom")e+=k;g=b.position[1];a=d.outerWidth()+a.outerWidth();if(g=="center")f-=a/2;if(g=="left")f-=a;return{top:e,left:f}}function s(a,d){var b=this,e=a.add(b),f,g=0,k=0,i=a.attr("title"),l=o[d.effect],n,u=a.is(":input"),m=u&&a.is(":checkbox, :radio, select, :button, :submit"),
j=a.attr("type"),p=d.events[j]||d.events[u?m?"widget":"input":"def"];if(!l)throw'Nonexistent effect "'+d.effect+'"';p=p.split(/,\s*/);if(p.length!=2)throw"Tooltip: bad events configuration for "+j;a.bind(p[0],function(h){clearTimeout(g);if(d.predelay)k=setTimeout(function(){b.show(h)},d.predelay);else b.show(h)}).bind(p[1],function(h){clearTimeout(k);if(d.delay)g=setTimeout(function(){b.hide(h)},d.delay);else b.hide(h)});if(i&&d.cancelDefault){a.removeAttr("title");a.data("title",i)}c.extend(b,{show:function(h){if(!f){if(i)f=
c(d.layout).addClass(d.tipClass).appendTo(document.body).hide().append(i);else if(d.tip)f=c(d.tip).eq(0);else{f=a.next();f.length||(f=a.parent().next())}if(!f.length)throw"Cannot find tooltip for "+a;}if(b.isShown())return b;f.stop(true,true);var r=q(a,f,d);h=h||c.Event();h.type="onBeforeShow";e.trigger(h,[r]);if(h.isDefaultPrevented())return b;r=q(a,f,d);f.css({position:"absolute",top:r.top,left:r.left});n=true;l[0].call(b,function(){h.type="onShow";n="full";e.trigger(h)});r=d.events.tooltip.split(/,\s*/);
f.bind(r[0],function(){clearTimeout(g);clearTimeout(k)});r[1]&&!a.is("input:not(:checkbox, :radio), textarea")&&f.bind(r[1],function(v){v.relatedTarget!=a[0]&&a.trigger(p[1].split(" ")[0])});return b},hide:function(h){if(!f||!b.isShown())return b;h=h||c.Event();h.type="onBeforeHide";e.trigger(h);if(!h.isDefaultPrevented()){n=false;o[d.effect][1].call(b,function(){h.type="onHide";n=false;e.trigger(h)});return b}},isShown:function(h){return h?n=="full":n},getConf:function(){return d},getTip:function(){return f},
getTrigger:function(){return a}});c.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(h,r){c.isFunction(d[r])&&c(b).bind(r,d[r]);b[r]=function(v){c(b).bind(r,v);return b}})}c.tools=c.tools||{version:"@VERSION"};c.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,position:["top","center"],offset:[0,0],relative:false,cancelDefault:true,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},
layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,d,b){o[a]=[d,b]}};var o={toggle:[function(a){var d=this.getConf(),b=this.getTip();d=d.opacity;d<1&&b.css({opacity:d});b.show();a.call()},function(a){this.getTip().hide();a.call()}],fade:[function(a){var d=this.getConf();this.getTip().fadeTo(d.fadeInSpeed,d.opacity,a)},function(a){this.getTip().fadeOut(this.getConf().fadeOutSpeed,a)}]};c.fn.tooltip=function(a){var d=this.data("tooltip");if(d)return d;a=c.extend(true,{},c.tools.tooltip.conf,a);
if(typeof a.position=="string")a.position=a.position.split(/,?\s/);this.each(function(){d=new s(c(this),a);c(this).data("tooltip",d)});return a.api?d:this}})(jQuery);var global_results={total_tests:0,total_failed:0,total_apps:0},html_id=function(c){return c.replace(/[\/\.]/g,"")},rown=0;$(".summary").each(function(){load_app_summary($(this).attr("app_id"),rown++);global_results.total_apps++});$("#release-all").click(function(){$(".release").each(function(){$(this).click()});return false});
$("#test-all").click(function(){global_results.total_tests=0;global_results.total_failed=0;$(".test").each(function(){$(this).click()});return false});function load_app_summary(c,q){q||(q=0);$("#summary-"+c).load($("#summary-"+c).attr("app_url")+"&rown="+q,[],function(){bind_app_buttons(c)})}
function bind_app_buttons(c){$("#release-"+c).click(function(){app_html_id=$(this).attr("app_html_id");$.ajax({url:$(this).attr("href"),data:{appid:$(this).attr("app_id"),version:$(this).attr("app_version")},type:"POST",dataType:"json",success:function(o){$("#message").html("App "+o.result.appid+" version "+o.result.release+" has been released.");load_app_summary(app_html_id)},beforeSend:function(o){o.setRequestHeader("X-Requested-With","XMLHttpRequest")}});return false});var q=function(o){var a=
html_id(o.app_path),d="<b>"+o.testfiles[0].file+"</b>",b="",e=0,f=0,g="test-passed";for(var k in o.testfiles[0].modules[0].tests){e++;global_results.total_tests++;var i=o.testfiles[0].modules[0].tests[k];b+="<br/><span class='"+(i.failures?"test-failed":"test-passed")+"'>"+i.name+": "+parseInt(parseInt(i.total)-parseInt(i.failures))+"/"+i.total;if(i.failures){g="test-failed";f++;global_results.total_failed++;for(var l in i.log){var n=i.log[l];if(n.result!=true)b+="<br/><i>"+n.message+"</i>"}}b+="</span>"}d+=
"<br/>"+parseInt(e-f)+"/"+e+" passed";$("#messages-"+a).append("<table style='margin-top: 10px;'><tr><td width='60px' class='"+g+"'>"+d+"</td><td width='130px'>"+b+"</td></tr></table>");$("#message").html("Total Tests: "+global_results.total_tests+" Failed: "+global_results.total_failed)},s=function(o){if(o.testfiles.length==0){o=html_id(o.app_path);$("#messages-"+o).append("(no tests)")}else for(var a in o.testfiles){testfile=o.testfiles[a];$.ajax({url:testfile.run_url,data:{output:"json"},type:"GET",
dataType:"jsonp",success:q})}};$("#test-"+c).bind("click",function(){$.ajax({url:$(this).attr("href"),data:{output:"json",mode:"discover"},type:"GET",dataType:"jsonp",success:s});return false})};
