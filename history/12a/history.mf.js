
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
 
 jQuery Tools @VERSION Tooltip - UI essentials

 NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.

 http://flowplayer.org/tools/tooltip/

 Since: November 2008
 Date: @DATE 
*/
(function(b){b.factory("collapse_module",{init:function(){var h=this;this.$column=b(this.options.column);this.modules=b(this.options.modules,this.element);this.first_module=this.modules.get(0);this.trigger=b(".trigger:first",this.first_module);this.first_section=b(".module-section",this.first_module);this.other_modules=this.modules.slice(1);this.column_offset=this.$column.css("margin-left");this.set_collapsed(this.options.collapsed);this.trigger.click(function(i){return h.toggle(i)})},set_collapsed:function(h){if(this.toggle_state=
h){this.trigger.addClass("collapsed");this.$column.css("margin-left",0);this.first_section.hide();this.other_modules.hide()}else{this.trigger.removeClass("collapsed");this.$column.css("margin-left",this.column_offset);this.first_section.show();this.other_modules.show()}},toggle:function(){var h=this;if(this.toggle_state){b.localstore("filters_collapsed",0,false);this.trigger.removeClass("collapsed");this.$column.animate({marginLeft:this.column_offset},function(){h.first_section.slideDown(function(){h.modules.removeClass("collapsed")});
h.other_modules.fadeIn()})}else{b.localstore("filters_collapsed",1,false);this.trigger.addClass("collapsed");this.other_modules.fadeOut();this.first_section.slideUp(function(){h.$column.animate({marginLeft:0});h.modules.addClass("collapsed")})}this.toggle_state=!this.toggle_state;this.options.toggle_callback&&this.options.toggle_callback.call(this.trigger,this.toggle_state);return false}});b.extend(true,b.collapse_module,{defaults:{collapsed:!!b.localstore("filters_collapsed"),modules:".module",column:"#main-column"}})})(jQuery);
(function(b,h){function i(e){return!b(e).parents().andSelf().filter(function(){return b.curCSS(this,"visibility")==="hidden"||b.expr.filters.hidden(this)}).length}b.ui=b.ui||{};if(!b.ui.version){b.extend(b.ui,{version:"1.8.10",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,
PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});b.fn.extend({_focus:b.fn.focus,focus:function(e,f){return typeof e==="number"?this.each(function(){var j=this;setTimeout(function(){b(j).focus();f&&f.call(j)},e)}):this._focus.apply(this,arguments)},scrollParent:function(){var e;e=b.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(b.curCSS(this,
"position",1))&&/(auto|scroll)/.test(b.curCSS(this,"overflow",1)+b.curCSS(this,"overflow-y",1)+b.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(b.curCSS(this,"overflow",1)+b.curCSS(this,"overflow-y",1)+b.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!e.length?b(document):e},zIndex:function(e){if(e!==h)return this.css("zIndex",e);if(this.length){e=b(this[0]);for(var f;e.length&&e[0]!==document;){f=e.css("position");
if(f==="absolute"||f==="relative"||f==="fixed"){f=parseInt(e.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}e=e.parent()}}return 0},disableSelection:function(){return this.bind((b.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});b.each(["Width","Height"],function(e,f){function j(p,s,d,a){b.each(l,function(){s-=parseFloat(b.curCSS(p,"padding"+this,true))||0;if(d)s-=parseFloat(b.curCSS(p,
"border"+this+"Width",true))||0;if(a)s-=parseFloat(b.curCSS(p,"margin"+this,true))||0});return s}var l=f==="Width"?["Left","Right"]:["Top","Bottom"],o=f.toLowerCase(),n={innerWidth:b.fn.innerWidth,innerHeight:b.fn.innerHeight,outerWidth:b.fn.outerWidth,outerHeight:b.fn.outerHeight};b.fn["inner"+f]=function(p){if(p===h)return n["inner"+f].call(this);return this.each(function(){b(this).css(o,j(this,p)+"px")})};b.fn["outer"+f]=function(p,s){if(typeof p!=="number")return n["outer"+f].call(this,p);return this.each(function(){b(this).css(o,
j(this,p,true,s)+"px")})}});b.extend(b.expr[":"],{data:function(e,f,j){return!!b.data(e,j[3])},focusable:function(e){var f=e.nodeName.toLowerCase(),j=b.attr(e,"tabindex");if("area"===f){f=e.parentNode;j=f.name;if(!e.href||!j||f.nodeName.toLowerCase()!=="map")return false;e=b("img[usemap=#"+j+"]")[0];return!!e&&i(e)}return(/input|select|textarea|button|object/.test(f)?!e.disabled:"a"==f?e.href||!isNaN(j):!isNaN(j))&&i(e)},tabbable:function(e){var f=b.attr(e,"tabindex");return(isNaN(f)||f>=0)&&b(e).is(":focusable")}});
b(function(){var e=document.body,f=e.appendChild(f=document.createElement("div"));b.extend(f.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});b.support.minHeight=f.offsetHeight===100;b.support.selectstart="onselectstart"in f;e.removeChild(f).style.display="none"});b.extend(b.ui,{plugin:{add:function(e,f,j){e=b.ui[e].prototype;for(var l in j){e.plugins[l]=e.plugins[l]||[];e.plugins[l].push([f,j[l]])}},call:function(e,f,j){if((f=e.plugins[f])&&e.element[0].parentNode)for(var l=0;l<f.length;l++)e.options[f[l][0]]&&
f[l][1].apply(e.element,j)}},contains:function(e,f){return document.compareDocumentPosition?e.compareDocumentPosition(f)&16:e!==f&&e.contains(f)},hasScroll:function(e,f){if(b(e).css("overflow")==="hidden")return false;var j=f&&f==="left"?"scrollLeft":"scrollTop",l=false;if(e[j]>0)return true;e[j]=1;l=e[j]>0;e[j]=0;return l},isOverAxis:function(e,f,j){return e>f&&e<f+j},isOver:function(e,f,j,l,o,n){return b.ui.isOverAxis(e,j,o)&&b.ui.isOverAxis(f,l,n)}})}})(jQuery);
(function(b){b.widget("ui.slider",b.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var h=this,i=this.options;this._mouseSliding=this._keySliding=false;this._animateOff=true;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");i.disabled&&this.element.addClass("ui-slider-disabled ui-disabled");
this.range=b([]);if(i.range){if(i.range===true){this.range=b("<div></div>");if(!i.values)i.values=[this._valueMin(),this._valueMin()];if(i.values.length&&i.values.length!==2)i.values=[i.values[0],i.values[0]]}else this.range=b("<div></div>");this.range.appendTo(this.element).addClass("ui-slider-range");if(i.range==="min"||i.range==="max")this.range.addClass("ui-slider-range-"+i.range);this.range.addClass("ui-widget-header")}b(".ui-slider-handle",this.element).length===0&&b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
if(i.values&&i.values.length)for(;b(".ui-slider-handle",this.element).length<i.values.length;)b("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");this.handles=b(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(e){e.preventDefault()}).hover(function(){i.disabled||b(this).addClass("ui-state-hover")},function(){b(this).removeClass("ui-state-hover")}).focus(function(){if(i.disabled)b(this).blur();
else{b(".ui-slider .ui-state-focus").removeClass("ui-state-focus");b(this).addClass("ui-state-focus")}}).blur(function(){b(this).removeClass("ui-state-focus")});this.handles.each(function(e){b(this).data("index.ui-slider-handle",e)});this.handles.keydown(function(e){var f=true,j=b(this).data("index.ui-slider-handle"),l,o,n;if(!h.options.disabled){switch(e.keyCode){case b.ui.keyCode.HOME:case b.ui.keyCode.END:case b.ui.keyCode.PAGE_UP:case b.ui.keyCode.PAGE_DOWN:case b.ui.keyCode.UP:case b.ui.keyCode.RIGHT:case b.ui.keyCode.DOWN:case b.ui.keyCode.LEFT:f=
false;if(!h._keySliding){h._keySliding=true;b(this).addClass("ui-state-active");l=h._start(e,j);if(l===false)return}break}n=h.options.step;l=h.options.values&&h.options.values.length?(o=h.values(j)):(o=h.value());switch(e.keyCode){case b.ui.keyCode.HOME:o=h._valueMin();break;case b.ui.keyCode.END:o=h._valueMax();break;case b.ui.keyCode.PAGE_UP:o=h._trimAlignValue(l+(h._valueMax()-h._valueMin())/5);break;case b.ui.keyCode.PAGE_DOWN:o=h._trimAlignValue(l-(h._valueMax()-h._valueMin())/5);break;case b.ui.keyCode.UP:case b.ui.keyCode.RIGHT:if(l===
h._valueMax())return;o=h._trimAlignValue(l+n);break;case b.ui.keyCode.DOWN:case b.ui.keyCode.LEFT:if(l===h._valueMin())return;o=h._trimAlignValue(l-n);break}h._slide(e,j,o);return f}}).keyup(function(e){var f=b(this).data("index.ui-slider-handle");if(h._keySliding){h._keySliding=false;h._stop(e,f);h._change(e,f);b(this).removeClass("ui-state-active")}});this._refreshValue();this._animateOff=false},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();return this},_mouseCapture:function(h){var i=this.options,e,f,j,l,o;if(i.disabled)return false;this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();e=this._normValueFromMouse({x:h.pageX,y:h.pageY});f=this._valueMax()-this._valueMin()+1;l=this;this.handles.each(function(n){var p=Math.abs(e-l.values(n));if(f>p){f=p;j=b(this);o=n}});if(i.range===true&&this.values(1)===i.min){o+=1;j=b(this.handles[o])}if(this._start(h,
o)===false)return false;this._mouseSliding=true;l._handleIndex=o;j.addClass("ui-state-active").focus();i=j.offset();this._clickOffset=!b(h.target).parents().andSelf().is(".ui-slider-handle")?{left:0,top:0}:{left:h.pageX-i.left-j.width()/2,top:h.pageY-i.top-j.height()/2-(parseInt(j.css("borderTopWidth"),10)||0)-(parseInt(j.css("borderBottomWidth"),10)||0)+(parseInt(j.css("marginTop"),10)||0)};this.handles.hasClass("ui-state-hover")||this._slide(h,o,e);return this._animateOff=true},_mouseStart:function(){return true},
_mouseDrag:function(h){var i=this._normValueFromMouse({x:h.pageX,y:h.pageY});this._slide(h,this._handleIndex,i);return false},_mouseStop:function(h){this.handles.removeClass("ui-state-active");this._mouseSliding=false;this._stop(h,this._handleIndex);this._change(h,this._handleIndex);this._clickOffset=this._handleIndex=null;return this._animateOff=false},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(h){var i;
if(this.orientation==="horizontal"){i=this.elementSize.width;h=h.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{i=this.elementSize.height;h=h.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}i=h/i;if(i>1)i=1;if(i<0)i=0;if(this.orientation==="vertical")i=1-i;h=this._valueMax()-this._valueMin();return this._trimAlignValue(this._valueMin()+i*h)},_start:function(h,i){var e={handle:this.handles[i],value:this.value()};if(this.options.values&&this.options.values.length){e.value=
this.values(i);e.values=this.values()}return this._trigger("start",h,e)},_slide:function(h,i,e){var f;if(this.options.values&&this.options.values.length){f=this.values(i?0:1);if(this.options.values.length===2&&this.options.range===true&&(i===0&&e>f||i===1&&e<f))e=f;if(e!==this.values(i)){f=this.values();f[i]=e;h=this._trigger("slide",h,{handle:this.handles[i],value:e,values:f});this.values(i?0:1);h!==false&&this.values(i,e,true)}}else if(e!==this.value()){h=this._trigger("slide",h,{handle:this.handles[i],
value:e});h!==false&&this.value(e)}},_stop:function(h,i){var e={handle:this.handles[i],value:this.value()};if(this.options.values&&this.options.values.length){e.value=this.values(i);e.values=this.values()}this._trigger("stop",h,e)},_change:function(h,i){if(!this._keySliding&&!this._mouseSliding){var e={handle:this.handles[i],value:this.value()};if(this.options.values&&this.options.values.length){e.value=this.values(i);e.values=this.values()}this._trigger("change",h,e)}},value:function(h){if(arguments.length){this.options.value=
this._trimAlignValue(h);this._refreshValue();this._change(null,0)}return this._value()},values:function(h,i){var e,f,j;if(arguments.length>1){this.options.values[h]=this._trimAlignValue(i);this._refreshValue();this._change(null,h)}if(arguments.length)if(b.isArray(arguments[0])){e=this.options.values;f=arguments[0];for(j=0;j<e.length;j+=1){e[j]=this._trimAlignValue(f[j]);this._change(null,j)}this._refreshValue()}else return this.options.values&&this.options.values.length?this._values(h):this.value();
else return this._values()},_setOption:function(h,i){var e,f=0;if(b.isArray(this.options.values))f=this.options.values.length;b.Widget.prototype._setOption.apply(this,arguments);switch(h){case "disabled":if(i){this.handles.filter(".ui-state-focus").blur();this.handles.removeClass("ui-state-hover");this.handles.attr("disabled","disabled");this.element.addClass("ui-disabled")}else{this.handles.removeAttr("disabled");this.element.removeClass("ui-disabled")}break;case "orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue();break;case "value":this._animateOff=true;this._refreshValue();this._change(null,0);this._animateOff=false;break;case "values":this._animateOff=true;this._refreshValue();for(e=0;e<f;e+=1)this._change(null,e);this._animateOff=false;break}},_value:function(){var h=this.options.value;return h=this._trimAlignValue(h)},_values:function(h){var i,e;if(arguments.length){i=this.options.values[h];
return i=this._trimAlignValue(i)}else{i=this.options.values.slice();for(e=0;e<i.length;e+=1)i[e]=this._trimAlignValue(i[e]);return i}},_trimAlignValue:function(h){if(h<=this._valueMin())return this._valueMin();if(h>=this._valueMax())return this._valueMax();var i=this.options.step>0?this.options.step:1,e=(h-this._valueMin())%i;alignValue=h-e;if(Math.abs(e)*2>=i)alignValue+=e>0?i:-i;return parseFloat(alignValue.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},
_refreshValue:function(){var h=this.options.range,i=this.options,e=this,f=!this._animateOff?i.animate:false,j,l={},o,n,p,s;if(this.options.values&&this.options.values.length)this.handles.each(function(d){j=(e.values(d)-e._valueMin())/(e._valueMax()-e._valueMin())*100;l[e.orientation==="horizontal"?"left":"bottom"]=j+"%";b(this).stop(1,1)[f?"animate":"css"](l,i.animate);if(e.options.range===true)if(e.orientation==="horizontal"){if(d===0)e.range.stop(1,1)[f?"animate":"css"]({left:j+"%"},i.animate);
if(d===1)e.range[f?"animate":"css"]({width:j-o+"%"},{queue:false,duration:i.animate})}else{if(d===0)e.range.stop(1,1)[f?"animate":"css"]({bottom:j+"%"},i.animate);if(d===1)e.range[f?"animate":"css"]({height:j-o+"%"},{queue:false,duration:i.animate})}o=j});else{n=this.value();p=this._valueMin();s=this._valueMax();j=s!==p?(n-p)/(s-p)*100:0;l[e.orientation==="horizontal"?"left":"bottom"]=j+"%";this.handle.stop(1,1)[f?"animate":"css"](l,i.animate);if(h==="min"&&this.orientation==="horizontal")this.range.stop(1,
1)[f?"animate":"css"]({width:j+"%"},i.animate);if(h==="max"&&this.orientation==="horizontal")this.range[f?"animate":"css"]({width:100-j+"%"},{queue:false,duration:i.animate});if(h==="min"&&this.orientation==="vertical")this.range.stop(1,1)[f?"animate":"css"]({height:j+"%"},i.animate);if(h==="max"&&this.orientation==="vertical")this.range[f?"animate":"css"]({height:100-j+"%"},{queue:false,duration:i.animate})}}});b.extend(b.ui.slider,{version:"1.8.10"})})(jQuery);
(function(b,h){h.filters={init_domain_type_property_filter:function(i){b(":text[name=domain], :text[name=type], :text[name=property]",i).suggest(h.suggest_options.any("/type/domain","/type/type","/type/property")).bind("fb-select",function(e,f){var j=b(this);j.val(f.id);var l=f["n:type"].id;if(l==="/type/domain")j.attr("name","domain");else if(l==="/type/type")j.attr("name","type");else l==="/type/property"&&j.attr("name","property");this.form.submit()})},init_limit_slider_filter:function(i,e,f,j,
l){var o=b(".limit-slider",i),n=b(".current-limit",i),p=b("input[name=limit]",i),s=parseInt(p.val()||e,10);o.slider({value:s,min:f||1,max:j||100,step:l||10,slide:function(d,a){n.css({color:"#f71"});n.text(a.value)},stop:function(d,a){n.css({color:"#333"});p.val(a.value);a.value!=s&&p[0].form.submit()}})}};b(function(){b(".filter-form-trigger").click(function(){var i=b(this).siblings(".filter-form");i.is(":hidden")?i.slideDown(function(){b(":text:first",i).focus()}):i.slideUp()})})})(jQuery,window.freebase);
(function(b){function h(f,j,l){var o=l.relative?f.position().top:f.offset().top,n=l.relative?f.position().left:f.offset().left,p=l.position[0];o-=j.outerHeight()-l.offset[0];n+=f.outerWidth()+l.offset[1];var s=j.outerHeight()+f.outerHeight();if(p=="center")o+=s/2;if(p=="bottom")o+=s;p=l.position[1];f=j.outerWidth()+f.outerWidth();if(p=="center")n-=f/2;if(p=="left")n-=f;return{top:o,left:n}}function i(f,j){var l=this,o=f.add(l),n,p=0,s=0,d=f.attr("title"),a=e[j.effect],c,g=f.is(":input"),k=g&&f.is(":checkbox, :radio, select, :button, :submit"),
m=f.attr("type"),q=j.events[m]||j.events[g?k?"widget":"input":"def"];if(!a)throw'Nonexistent effect "'+j.effect+'"';q=q.split(/,\s*/);if(q.length!=2)throw"Tooltip: bad events configuration for "+m;f.bind(q[0],function(r){clearTimeout(p);if(j.predelay)s=setTimeout(function(){l.show(r)},j.predelay);else l.show(r)}).bind(q[1],function(r){clearTimeout(s);if(j.delay)p=setTimeout(function(){l.hide(r)},j.delay);else l.hide(r)});if(d&&j.cancelDefault){f.removeAttr("title");f.data("title",d)}b.extend(l,{show:function(r){if(!n){if(d)n=
b(j.layout).addClass(j.tipClass).appendTo(document.body).hide().append(d);else if(j.tip)n=b(j.tip).eq(0);else{n=f.next();n.length||(n=f.parent().next())}if(!n.length)throw"Cannot find tooltip for "+f;}if(l.isShown())return l;n.stop(true,true);var t=h(f,n,j);r=r||b.Event();r.type="onBeforeShow";o.trigger(r,[t]);if(r.isDefaultPrevented())return l;t=h(f,n,j);n.css({position:"absolute",top:t.top,left:t.left});c=true;a[0].call(l,function(){r.type="onShow";c="full";o.trigger(r)});t=j.events.tooltip.split(/,\s*/);
n.bind(t[0],function(){clearTimeout(p);clearTimeout(s)});t[1]&&!f.is("input:not(:checkbox, :radio), textarea")&&n.bind(t[1],function(v){v.relatedTarget!=f[0]&&f.trigger(q[1].split(" ")[0])});return l},hide:function(r){if(!n||!l.isShown())return l;r=r||b.Event();r.type="onBeforeHide";o.trigger(r);if(!r.isDefaultPrevented()){c=false;e[j.effect][1].call(l,function(){r.type="onHide";c=false;o.trigger(r)});return l}},isShown:function(r){return r?c=="full":c},getConf:function(){return j},getTip:function(){return n},
getTrigger:function(){return f}});b.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(r,t){b.isFunction(j[t])&&b(l).bind(t,j[t]);l[t]=function(v){b(l).bind(t,v);return l}})}b.tools=b.tools||{version:"@VERSION"};b.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,position:["top","center"],offset:[0,0],relative:false,cancelDefault:true,events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},
layout:"<div/>",tipClass:"tooltip"},addEffect:function(f,j,l){e[f]=[j,l]}};var e={toggle:[function(f){var j=this.getConf(),l=this.getTip();j=j.opacity;j<1&&l.css({opacity:j});l.show();f.call()},function(f){this.getTip().hide();f.call()}],fade:[function(f){var j=this.getConf();this.getTip().fadeTo(j.fadeInSpeed,j.opacity,f)},function(f){this.getTip().fadeOut(this.getConf().fadeOutSpeed,f)}]};b.fn.tooltip=function(f){var j=this.data("tooltip");if(j)return j;f=b.extend(true,{},b.tools.tooltip.conf,f);
if(typeof f.position=="string")f.position=f.position.split(/,?\s/);this.each(function(){j=new i(b(this),f);b(this).data("tooltip",j)});return f.api?j:this}})(jQuery);
jQuery.effects||function(b,h){function i(d){var a;if(d&&d.constructor==Array&&d.length==3)return d;if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(d))return[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10)];if(a=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(d))return[parseFloat(a[1])*2.55,parseFloat(a[2])*2.55,parseFloat(a[3])*2.55];if(a=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(d))return[parseInt(a[1],
16),parseInt(a[2],16),parseInt(a[3],16)];if(a=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(d))return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)];if(/rgba\(0, 0, 0, 0\)/.exec(d))return n.transparent;return n[b.trim(d).toLowerCase()]}function e(){var d=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,a={},c,g;if(d&&d.length&&d[0]&&d[d[0]])for(var k=d.length;k--;){c=d[k];if(typeof d[c]=="string"){g=c.replace(/\-(\w)/g,function(m,q){return q.toUpperCase()});
a[g]=d[c]}}else for(c in d)if(typeof d[c]==="string")a[c]=d[c];return a}function f(d){var a,c;for(a in d){c=d[a];if(c==null||b.isFunction(c)||a in s||/scrollbar/.test(a)||!/color/i.test(a)&&isNaN(parseFloat(c)))delete d[a]}return d}function j(d,a){var c={_:0},g;for(g in a)if(d[g]!=a[g])c[g]=a[g];return c}function l(d,a,c,g){if(typeof d=="object"){g=a;c=null;a=d;d=a.effect}if(b.isFunction(a)){g=a;c=null;a={}}if(typeof a=="number"||b.fx.speeds[a]){g=c;c=a;a={}}if(b.isFunction(c)){g=c;c=null}a=a||{};
c=c||a.duration;c=b.fx.off?0:typeof c=="number"?c:c in b.fx.speeds?b.fx.speeds[c]:b.fx.speeds._default;g=g||a.complete;return[d,a,c,g]}function o(d){if(!d||typeof d==="number"||b.fx.speeds[d])return true;if(typeof d==="string"&&!b.effects[d])return true;return false}b.effects={};b.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(d,a){b.fx.step[a]=function(c){if(!c.colorInit){var g;g=c.elem;var k=a,m;do{m=
b.curCSS(g,k);if(m!=""&&m!="transparent"||b.nodeName(g,"body"))break;k="backgroundColor"}while(g=g.parentNode);g=i(m);c.start=g;c.end=i(c.end);c.colorInit=true}c.elem.style[a]="rgb("+Math.max(Math.min(parseInt(c.pos*(c.end[0]-c.start[0])+c.start[0],10),255),0)+","+Math.max(Math.min(parseInt(c.pos*(c.end[1]-c.start[1])+c.start[1],10),255),0)+","+Math.max(Math.min(parseInt(c.pos*(c.end[2]-c.start[2])+c.start[2],10),255),0)+")"}});var n={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,
0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,
211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},p=["add","remove","toggle"],s={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};b.effects.animateClass=function(d,a,c,
g){if(b.isFunction(c)){g=c;c=null}return this.queue("fx",function(){var k=b(this),m=k.attr("style")||" ",q=f(e.call(this)),r,t=k.attr("className");b.each(p,function(v,u){d[u]&&k[u+"Class"](d[u])});r=f(e.call(this));k.attr("className",t);k.animate(j(q,r),a,c,function(){b.each(p,function(v,u){d[u]&&k[u+"Class"](d[u])});if(typeof k.attr("style")=="object"){k.attr("style").cssText="";k.attr("style").cssText=m}else k.attr("style",m);g&&g.apply(this,arguments)});q=b.queue(this);r=q.splice(q.length-1,1)[0];
q.splice(1,0,r);b.dequeue(this)})};b.fn.extend({_addClass:b.fn.addClass,addClass:function(d,a,c,g){return a?b.effects.animateClass.apply(this,[{add:d},a,c,g]):this._addClass(d)},_removeClass:b.fn.removeClass,removeClass:function(d,a,c,g){return a?b.effects.animateClass.apply(this,[{remove:d},a,c,g]):this._removeClass(d)},_toggleClass:b.fn.toggleClass,toggleClass:function(d,a,c,g,k){return typeof a=="boolean"||a===h?c?b.effects.animateClass.apply(this,[a?{add:d}:{remove:d},c,g,k]):this._toggleClass(d,
a):b.effects.animateClass.apply(this,[{toggle:d},a,c,g])},switchClass:function(d,a,c,g,k){return b.effects.animateClass.apply(this,[{add:a,remove:d},c,g,k])}});b.extend(b.effects,{version:"1.8.10",save:function(d,a){for(var c=0;c<a.length;c++)a[c]!==null&&d.data("ec.storage."+a[c],d[0].style[a[c]])},restore:function(d,a){for(var c=0;c<a.length;c++)a[c]!==null&&d.css(a[c],d.data("ec.storage."+a[c]))},setMode:function(d,a){if(a=="toggle")a=d.is(":hidden")?"show":"hide";return a},getBaseline:function(d,
a){var c,g;switch(d[0]){case "top":c=0;break;case "middle":c=0.5;break;case "bottom":c=1;break;default:c=d[0]/a.height}switch(d[1]){case "left":g=0;break;case "center":g=0.5;break;case "right":g=1;break;default:g=d[1]/a.width}return{x:g,y:c}},createWrapper:function(d){if(d.parent().is(".ui-effects-wrapper"))return d.parent();var a={width:d.outerWidth(true),height:d.outerHeight(true),"float":d.css("float")},c=b("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",
border:"none",margin:0,padding:0});d.wrap(c);c=d.parent();if(d.css("position")=="static"){c.css({position:"relative"});d.css({position:"relative"})}else{b.extend(a,{position:d.css("position"),zIndex:d.css("z-index")});b.each(["top","left","bottom","right"],function(g,k){a[k]=d.css(k);if(isNaN(parseInt(a[k],10)))a[k]="auto"});d.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})}return c.css(a).show()},removeWrapper:function(d){if(d.parent().is(".ui-effects-wrapper"))return d.parent().replaceWith(d);
return d},setTransition:function(d,a,c,g){g=g||{};b.each(a,function(k,m){unit=d.cssUnit(m);if(unit[0]>0)g[m]=unit[0]*c+unit[1]});return g}});b.fn.extend({effect:function(d){var a=l.apply(this,arguments),c={options:a[1],duration:a[2],callback:a[3]};a=c.options.mode;var g=b.effects[d];if(b.fx.off||!g)return a?this[a](c.duration,c.callback):this.each(function(){c.callback&&c.callback.call(this)});return g.call(this,c)},_show:b.fn.show,show:function(d){if(o(d))return this._show.apply(this,arguments);
else{var a=l.apply(this,arguments);a[1].mode="show";return this.effect.apply(this,a)}},_hide:b.fn.hide,hide:function(d){if(o(d))return this._hide.apply(this,arguments);else{var a=l.apply(this,arguments);a[1].mode="hide";return this.effect.apply(this,a)}},__toggle:b.fn.toggle,toggle:function(d){if(o(d)||typeof d==="boolean"||b.isFunction(d))return this.__toggle.apply(this,arguments);else{var a=l.apply(this,arguments);a[1].mode="toggle";return this.effect.apply(this,a)}},cssUnit:function(d){var a=this.css(d),
c=[];b.each(["em","px","%","pt"],function(g,k){if(a.indexOf(k)>0)c=[parseFloat(a),k]});return c}});b.easing.jswing=b.easing.swing;b.extend(b.easing,{def:"easeOutQuad",swing:function(d,a,c,g,k){return b.easing[b.easing.def](d,a,c,g,k)},easeInQuad:function(d,a,c,g,k){return g*(a/=k)*a+c},easeOutQuad:function(d,a,c,g,k){return-g*(a/=k)*(a-2)+c},easeInOutQuad:function(d,a,c,g,k){if((a/=k/2)<1)return g/2*a*a+c;return-g/2*(--a*(a-2)-1)+c},easeInCubic:function(d,a,c,g,k){return g*(a/=k)*a*a+c},easeOutCubic:function(d,
a,c,g,k){return g*((a=a/k-1)*a*a+1)+c},easeInOutCubic:function(d,a,c,g,k){if((a/=k/2)<1)return g/2*a*a*a+c;return g/2*((a-=2)*a*a+2)+c},easeInQuart:function(d,a,c,g,k){return g*(a/=k)*a*a*a+c},easeOutQuart:function(d,a,c,g,k){return-g*((a=a/k-1)*a*a*a-1)+c},easeInOutQuart:function(d,a,c,g,k){if((a/=k/2)<1)return g/2*a*a*a*a+c;return-g/2*((a-=2)*a*a*a-2)+c},easeInQuint:function(d,a,c,g,k){return g*(a/=k)*a*a*a*a+c},easeOutQuint:function(d,a,c,g,k){return g*((a=a/k-1)*a*a*a*a+1)+c},easeInOutQuint:function(d,
a,c,g,k){if((a/=k/2)<1)return g/2*a*a*a*a*a+c;return g/2*((a-=2)*a*a*a*a+2)+c},easeInSine:function(d,a,c,g,k){return-g*Math.cos(a/k*(Math.PI/2))+g+c},easeOutSine:function(d,a,c,g,k){return g*Math.sin(a/k*(Math.PI/2))+c},easeInOutSine:function(d,a,c,g,k){return-g/2*(Math.cos(Math.PI*a/k)-1)+c},easeInExpo:function(d,a,c,g,k){return a==0?c:g*Math.pow(2,10*(a/k-1))+c},easeOutExpo:function(d,a,c,g,k){return a==k?c+g:g*(-Math.pow(2,-10*a/k)+1)+c},easeInOutExpo:function(d,a,c,g,k){if(a==0)return c;if(a==
k)return c+g;if((a/=k/2)<1)return g/2*Math.pow(2,10*(a-1))+c;return g/2*(-Math.pow(2,-10*--a)+2)+c},easeInCirc:function(d,a,c,g,k){return-g*(Math.sqrt(1-(a/=k)*a)-1)+c},easeOutCirc:function(d,a,c,g,k){return g*Math.sqrt(1-(a=a/k-1)*a)+c},easeInOutCirc:function(d,a,c,g,k){if((a/=k/2)<1)return-g/2*(Math.sqrt(1-a*a)-1)+c;return g/2*(Math.sqrt(1-(a-=2)*a)+1)+c},easeInElastic:function(d,a,c,g,k){d=1.70158;var m=0,q=g;if(a==0)return c;if((a/=k)==1)return c+g;m||(m=k*0.3);if(q<Math.abs(g)){q=g;d=m/4}else d=
m/(2*Math.PI)*Math.asin(g/q);return-(q*Math.pow(2,10*(a-=1))*Math.sin((a*k-d)*2*Math.PI/m))+c},easeOutElastic:function(d,a,c,g,k){d=1.70158;var m=0,q=g;if(a==0)return c;if((a/=k)==1)return c+g;m||(m=k*0.3);if(q<Math.abs(g)){q=g;d=m/4}else d=m/(2*Math.PI)*Math.asin(g/q);return q*Math.pow(2,-10*a)*Math.sin((a*k-d)*2*Math.PI/m)+g+c},easeInOutElastic:function(d,a,c,g,k){d=1.70158;var m=0,q=g;if(a==0)return c;if((a/=k/2)==2)return c+g;m||(m=k*0.3*1.5);if(q<Math.abs(g)){q=g;d=m/4}else d=m/(2*Math.PI)*Math.asin(g/
q);if(a<1)return-0.5*q*Math.pow(2,10*(a-=1))*Math.sin((a*k-d)*2*Math.PI/m)+c;return q*Math.pow(2,-10*(a-=1))*Math.sin((a*k-d)*2*Math.PI/m)*0.5+g+c},easeInBack:function(d,a,c,g,k,m){if(m==h)m=1.70158;return g*(a/=k)*a*((m+1)*a-m)+c},easeOutBack:function(d,a,c,g,k,m){if(m==h)m=1.70158;return g*((a=a/k-1)*a*((m+1)*a+m)+1)+c},easeInOutBack:function(d,a,c,g,k,m){if(m==h)m=1.70158;if((a/=k/2)<1)return g/2*a*a*(((m*=1.525)+1)*a-m)+c;return g/2*((a-=2)*a*(((m*=1.525)+1)*a+m)+2)+c},easeInBounce:function(d,
a,c,g,k){return g-b.easing.easeOutBounce(d,k-a,0,g,k)+c},easeOutBounce:function(d,a,c,g,k){return(a/=k)<1/2.75?g*7.5625*a*a+c:a<2/2.75?g*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?g*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:g*(7.5625*(a-=2.625/2.75)*a+0.984375)+c},easeInOutBounce:function(d,a,c,g,k){if(a<k/2)return b.easing.easeInBounce(d,a*2,0,g,k)*0.5+c;return b.easing.easeOutBounce(d,a*2-k,0,g,k)*0.5+g*0.5+c}})}(jQuery);
(function(b){b.effects.highlight=function(h){return this.queue(function(){var i=b(this),e=["backgroundImage","backgroundColor","opacity"],f=b.effects.setMode(i,h.options.mode||"show"),j={backgroundColor:i.css("backgroundColor")};if(f=="hide")j.opacity=0;b.effects.save(i,e);i.show().css({backgroundImage:"none",backgroundColor:h.options.color||"#ffff99"}).animate(j,{queue:false,duration:h.duration,easing:h.options.easing,complete:function(){f=="hide"&&i.hide();b.effects.restore(i,e);f=="show"&&!b.support.opacity&&
this.style.removeAttribute("filter");h.callback&&h.callback.apply(this,arguments);i.dequeue()}})})}})(jQuery);
(function(b,h){var i=h.history={init:function(){b(".column.nav").collapse_module({modules:".module",column:".section"});h.filters.init_domain_type_property_filter(".column.nav");h.filters.init_limit_slider_filter("#limit-slider",100,1,1E3,10);b(":text[name=creator]").suggest(h.suggest_options.any("/type/user")).bind("fb-select",function(e,f){b(this).val(f.id).parents("form:first").submit()})}};b(i.init)})(jQuery,window.freebase);
