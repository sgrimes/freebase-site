if(!("JSON"in window&&window.JSON)){if(!this.JSON)this.JSON={};(function(){function a(h){return h<10?"0"+h:h}function e(h){d.lastIndex=0;return d.test(h)?'"'+h.replace(d,function(k){var l=f[k];return typeof l==="string"?l:"\\u"+("0000"+k.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+h+'"'}function j(h,k){var l,m,p,r,o=c,q,n=k[h];if(n&&typeof n==="object"&&typeof n.toJSON==="function")n=n.toJSON(h);if(typeof i==="function")n=i.call(k,h,n);switch(typeof n){case "string":return e(n);case "number":return isFinite(n)?
String(n):"null";case "boolean":case "null":return String(n);case "object":if(!n)return"null";c+=g;q=[];if(Object.prototype.toString.apply(n)==="[object Array]"){r=n.length;for(l=0;l<r;l+=1)q[l]=j(l,n)||"null";p=q.length===0?"[]":c?"[\n"+c+q.join(",\n"+c)+"\n"+o+"]":"["+q.join(",")+"]";c=o;return p}if(i&&typeof i==="object"){r=i.length;for(l=0;l<r;l+=1){m=i[l];if(typeof m==="string")if(p=j(m,n))q.push(e(m)+(c?": ":":")+p)}}else for(m in n)if(Object.hasOwnProperty.call(n,m))if(p=j(m,n))q.push(e(m)+
(c?": ":":")+p);p=q.length===0?"{}":c?"{\n"+c+q.join(",\n"+c)+"\n"+o+"}":"{"+q.join(",")+"}";c=o;return p}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+a(this.getUTCMonth()+1)+"-"+a(this.getUTCDate())+"T"+a(this.getUTCHours())+":"+a(this.getUTCMinutes())+":"+a(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var b=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
d=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c,g,f={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},i;if(typeof JSON.stringify!=="function")JSON.stringify=function(h,k,l){var m;g=c="";if(typeof l==="number")for(m=0;m<l;m+=1)g+=" ";else if(typeof l==="string")g=l;if((i=k)&&typeof k!=="function"&&(typeof k!=="object"||typeof k.length!=="number"))throw new Error("JSON.stringify");return j("",
{"":h})};if(typeof JSON.parse!=="function")JSON.parse=function(h,k){function l(p,r){var o,q,n=p[r];if(n&&typeof n==="object")for(o in n)if(Object.hasOwnProperty.call(n,o)){q=l(n,o);if(q!==undefined)n[o]=q;else delete n[o]}return k.call(p,r,n)}var m;h=String(h);b.lastIndex=0;if(b.test(h))h=h.replace(b,function(p){return"\\u"+("0000"+p.charCodeAt(0).toString(16)).slice(-4)});if(/^[\],:{}\s]*$/.test(h.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){m=eval("("+h+")");return typeof k==="function"?l({"":m},""):m}throw new SyntaxError("JSON.parse");}})()}
jQuery.cookie=function(a,e,j){if(typeof e!="undefined"){j=j||{};if(e===null){e="";j=$.extend({},j);j.expires=-1}var b="";if(j.expires&&(typeof j.expires=="number"||j.expires.toUTCString)){if(typeof j.expires=="number"){b=new Date;b.setTime(b.getTime()+j.expires*24*60*60*1E3)}else b=j.expires;b="; expires="+b.toUTCString()}var d=j.path?"; path="+j.path:"",c=j.domain?"; domain="+j.domain:"";j=j.secure?"; secure":"";document.cookie=[a,"=",encodeURIComponent(e),b,d,c,j].join("")}else{e=null;if(document.cookie&&
document.cookie!=""){j=document.cookie.split(";");for(b=0;b<j.length;b++){d=jQuery.trim(j[b]);if(d.substring(0,a.length+1)==a+"="){e=decodeURIComponent(d.substring(a.length+1));break}}}return e}};
(function(a){a.extend({localstore:function(e,j,b){var d=document.location.hostname,c=document.location.protocol;if(typeof j!="undefined"){var g=JSON.stringify(j);if(!b&&window.globalStorage)window.globalStorage[d][c+e]=g;else if(j===null){var f={};f.domain=COOKIE_DOMAIN?COOKIE_DOMAIN:fb.get_cookie_domain();a.cookie(e,null,f)}else a.cookie(e,g,a.extend(f,{expires:14,path:"/"}));return j}else{if(!b&&window.globalStorage){if(window.globalStorage[d][c+e])j=window.globalStorage[d][c+e].value}else j=a.cookie(e);
if(j!=null)return JSON.parse(j,null)}return null}})})(jQuery);
(function(a){function e(b,d){this.options=a.extend(true,{},d);this.input=a(b);this.placeholder=this.input.attr("placeholder")||"";this.init()}if(!("placeholder"in document.createElement("input"))){var j=a.fn.val;a.fn.val=function(b){if(b===undefined)if(this.hasClass("placeholder"))return"";return j.apply(this,[b])};e.prototype={init:function(){var b=this,d=this.input.val();if(d===""||d===this.placeholder)this.input.val(this.placeholder).addClass("placeholder");this.input.bind("focus.placeholder",
function(c){return b.focus(c)}).bind("blur.placeholder",function(c){return b.blur(c)});this.input[0].form&&a(this.input[0].form).bind("submit",function(c){return b.submit(c)})},destroy:function(){this.input.unbind(".placeholder");this.input[0].form&&a(this.input[0].form).unbind(".placeholder")},focus:function(){this.input.hasClass("placeholder")&&this.input.val("").removeClass("placeholder")},blur:function(){this.input.val()===""&&this.input.val(this.input.attr("placeholder")).addClass("placeholder")},
submit:function(){this.input.hasClass("placeholder")&&this.input.val("")}};a.fn.placeholder=function(b){return this.each(function(){var d=a(this);d.unbind(".placeholder");if(d.is(":text")||d.is("textarea"))if(d.attr("placeholder")){(d=a.data(this,"placeholder"))&&d.destroy();a.data(this,"placeholder",new e(this,b))}})}}})(jQuery);
(function(a){a.extend({metadata:{defaults:{type:"class",name:"metadata",cre:/({.*})/,single:"metadata"},setType:function(e,j){this.defaults.type=e;this.defaults.name=j},get:function(e,j){var b=a.extend({},this.defaults,j);if(!b.single.length)b.single="metadata";var d=a.data(e,b.single);if(d)return d;d="{}";var c=function(i){if(typeof i!="string")return i;return i=eval("("+i+")")};if(b.type=="html5"){var g={};a(e.attributes).each(function(){var i=this.nodeName;if(i.match(/^data-/))i=i.replace(/^data-/,
"");else return true;g[i]=c(this.nodeValue)})}else{if(b.type=="class"){var f=b.cre.exec(e.className);if(f)d=f[1]}else if(b.type=="elem"){if(!e.getElementsByTagName)return;f=e.getElementsByTagName(b.name);if(f.length)d=a.trim(f[0].innerHTML)}else if(e.getAttribute!=undefined)if(f=e.getAttribute(b.name))d=f;g=c(d.indexOf("{")<0?"{"+d+"}":d)}a.data(e,b.single,g);return g}}});a.fn.metadata=function(e){return a.metadata.get(this[0],e)}})(jQuery);
(function(a,e){function j(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(!a.ui.version){a.extend(a.ui,{version:"1.8.4",plugin:{add:function(b,d,c){b=a.ui[b].prototype;for(var g in c){b.plugins[g]=b.plugins[g]||[];b.plugins[g].push([d,c[g]])}},call:function(b,d,c){if((d=b.plugins[d])&&b.element[0].parentNode)for(var g=0;g<d.length;g++)b.options[d[g][0]]&&d[g][1].apply(b.element,c)}},contains:function(b,
d){return document.compareDocumentPosition?b.compareDocumentPosition(d)&16:b!==d&&b.contains(d)},hasScroll:function(b,d){if(a(b).css("overflow")==="hidden")return false;var c=d&&d==="left"?"scrollLeft":"scrollTop",g=false;if(b[c]>0)return true;b[c]=1;g=b[c]>0;b[c]=0;return g},isOverAxis:function(b,d,c){return b>d&&b<d+c},isOver:function(b,d,c,g,f,i){return a.ui.isOverAxis(b,c,f)&&a.ui.isOverAxis(d,g,i)},keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,
CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});a.fn.extend({_focus:a.fn.focus,focus:function(b,d){return typeof b==="number"?this.each(function(){var c=this;setTimeout(function(){a(c).focus();d&&d.call(c)},b)}):this._focus.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable",
"off").css("MozUserSelect","")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none")},scrollParent:function(){var b;b=a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,
"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(b){if(b!==e)return this.css("zIndex",b);if(this.length){b=a(this[0]);for(var d;b.length&&b[0]!==document;){d=b.css("position");if(d==="absolute"||d==="relative"||d==="fixed"){d=parseInt(b.css("zIndex"));if(!isNaN(d)&&d!=0)return d}b=b.parent()}}return 0}});a.each(["Width","Height"],function(b,d){function c(h,k,l,m){a.each(g,function(){k-=
parseFloat(a.curCSS(h,"padding"+this,true))||0;if(l)k-=parseFloat(a.curCSS(h,"border"+this+"Width",true))||0;if(m)k-=parseFloat(a.curCSS(h,"margin"+this,true))||0});return k}var g=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),i={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(h){if(h===e)return i["inner"+d].call(this);return this.each(function(){a.style(this,f,c(this,h)+"px")})};a.fn["outer"+
d]=function(h,k){if(typeof h!=="number")return i["outer"+d].call(this,h);return this.each(function(){a.style(this,f,c(this,h,true,k)+"px")})}});a.extend(a.expr[":"],{data:function(b,d,c){return!!a.data(b,c[3])},focusable:function(b){var d=b.nodeName.toLowerCase(),c=a.attr(b,"tabindex");if("area"===d){d=b.parentNode;c=d.name;if(!b.href||!c||d.nodeName.toLowerCase()!=="map")return false;b=a("img[usemap=#"+c+"]")[0];return!!b&&j(b)}return(/input|select|textarea|button|object/.test(d)?!b.disabled:"a"==
d?b.href||!isNaN(c):!isNaN(c))&&j(b)},tabbable:function(b){var d=a.attr(b,"tabindex");return(isNaN(d)||d>=0)&&a(b).is(":focusable")}})}})(jQuery);
(function(a,e){var j=a.fn.remove;a.fn.remove=function(b,d){return this.each(function(){if(!d)if(!b||a.filter(b,[this]).length)a("*",this).add([this]).each(function(){a(this).triggerHandler("remove")});return j.call(a(this),b,d)})};a.widget=function(b,d,c){var g=b.split(".")[0],f;b=b.split(".")[1];f=g+"-"+b;if(!c){c=d;d=a.Widget}a.expr[":"][f]=function(i){return!!a.data(i,b)};a[g]=a[g]||{};a[g][b]=function(i,h){arguments.length&&this._createWidget(i,h)};d=new d;d.options=a.extend(true,{},d.options);
a[g][b].prototype=a.extend(true,d,{namespace:g,widgetName:b,widgetEventPrefix:a[g][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},c);a.widget.bridge(b,a[g][b])};a.widget.bridge=function(b,d){a.fn[b]=function(c){var g=typeof c==="string",f=Array.prototype.slice.call(arguments,1),i=this;c=!g&&f.length?a.extend.apply(null,[true,c].concat(f)):c;if(g&&c.substring(0,1)==="_")return i;g?this.each(function(){var h=a.data(this,b),k=h&&a.isFunction(h[c])?h[c].apply(h,f):h;if(k!==h&&k!==e){i=k;return false}}):
this.each(function(){var h=a.data(this,b);if(h){c&&h.option(c);h._init()}else a.data(this,b,new d(c,this))});return i}};a.Widget=function(b,d){arguments.length&&this._createWidget(b,d)};a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(b,d){a.data(d,this.widgetName,this);this.element=a(d);this.options=a.extend(true,{},this.options,a.metadata&&a.metadata.get(d)[this.widgetName],b);var c=this;this.element.bind("remove."+this.widgetName,function(){c.destroy()});
this._create();this._init()},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},widget:function(){return this.element},option:function(b,d){var c=b,g=this;if(arguments.length===0)return a.extend({},g.options);if(typeof b==="string"){if(d===e)return this.options[b];c={};c[b]=d}a.each(c,function(f,
i){g._setOption(f,i)});return g},_setOption:function(b,d){this.options[b]=d;if(b==="disabled")this.widget()[d?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",d);return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(b,d,c){var g=this.options[b];d=a.Event(d);d.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase();c=c||{};if(d.originalEvent){b=
a.event.props.length;for(var f;b;){f=a.event.props[--b];d[f]=d.originalEvent[f]}}this.element.trigger(d,c);return!(a.isFunction(g)&&g.call(this.element[0],d,c)===false||d.isDefaultPrevented())}}})(jQuery);
(function(a){a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.bind("mousedown."+this.widgetName,function(j){return e._mouseDown(j)}).bind("click."+this.widgetName,function(j){if(e._preventClickEvent){e._preventClickEvent=false;j.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)},_mouseDown:function(e){e.originalEvent=e.originalEvent||{};if(!e.originalEvent.mouseHandled){this._mouseStarted&&
this._mouseUp(e);this._mouseDownEvent=e;var j=this,b=e.which==1,d=typeof this.options.cancel=="string"?a(e.target).parents().add(e.target).filter(this.options.cancel).length:false;if(!b||d||!this._mouseCapture(e))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){j.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)){this._mouseStarted=this._mouseStart(e)!==false;if(!this._mouseStarted){e.preventDefault();
return true}}this._mouseMoveDelegate=function(c){return j._mouseMove(c)};this._mouseUpDelegate=function(c){return j._mouseUp(c)};a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);a.browser.safari||e.preventDefault();return e.originalEvent.mouseHandled=true}},_mouseMove:function(e){if(a.browser.msie&&!e.button)return this._mouseUp(e);if(this._mouseStarted){this._mouseDrag(e);return e.preventDefault()}if(this._mouseDistanceMet(e)&&
this._mouseDelayMet(e))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==false)?this._mouseDrag(e):this._mouseUp(e);return!this._mouseStarted},_mouseUp:function(e){a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=e.target==this._mouseDownEvent.target;this._mouseStop(e)}return false},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-
e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
(function(a){a.ui=a.ui||{};var e=/left|center|right/,j=/top|center|bottom/,b=a.fn.position,d=a.fn.offset;a.fn.position=function(c){if(!c||!c.of)return b.apply(this,arguments);c=a.extend({},c);var g=a(c.of),f=(c.collision||"flip").split(" "),i=c.offset?c.offset.split(" "):[0,0],h,k,l;if(c.of.nodeType===9){h=g.width();k=g.height();l={top:0,left:0}}else if(c.of.scrollTo&&c.of.document){h=g.width();k=g.height();l={top:g.scrollTop(),left:g.scrollLeft()}}else if(c.of.preventDefault){c.at="left top";h=k=
0;l={top:c.of.pageY,left:c.of.pageX}}else{h=g.outerWidth();k=g.outerHeight();l=g.offset()}a.each(["my","at"],function(){var m=(c[this]||"").split(" ");if(m.length===1)m=e.test(m[0])?m.concat(["center"]):j.test(m[0])?["center"].concat(m):["center","center"];m[0]=e.test(m[0])?m[0]:"center";m[1]=j.test(m[1])?m[1]:"center";c[this]=m});if(f.length===1)f[1]=f[0];i[0]=parseInt(i[0],10)||0;if(i.length===1)i[1]=i[0];i[1]=parseInt(i[1],10)||0;if(c.at[0]==="right")l.left+=h;else if(c.at[0]==="center")l.left+=
h/2;if(c.at[1]==="bottom")l.top+=k;else if(c.at[1]==="center")l.top+=k/2;l.left+=i[0];l.top+=i[1];return this.each(function(){var m=a(this),p=m.outerWidth(),r=m.outerHeight(),o=a.extend({},l);if(c.my[0]==="right")o.left-=p;else if(c.my[0]==="center")o.left-=p/2;if(c.my[1]==="bottom")o.top-=r;else if(c.my[1]==="center")o.top-=r/2;o.left=parseInt(o.left);o.top=parseInt(o.top);a.each(["left","top"],function(q,n){a.ui.position[f[q]]&&a.ui.position[f[q]][n](o,{targetWidth:h,targetHeight:k,elemWidth:p,
elemHeight:r,offset:i,my:c.my,at:c.at})});a.fn.bgiframe&&m.bgiframe();m.offset(a.extend(o,{using:c.using}))})};a.ui.position={fit:{left:function(c,g){var f=a(window);f=c.left+g.elemWidth-f.width()-f.scrollLeft();c.left=f>0?c.left-f:Math.max(0,c.left)},top:function(c,g){var f=a(window);f=c.top+g.elemHeight-f.height()-f.scrollTop();c.top=f>0?c.top-f:Math.max(0,c.top)}},flip:{left:function(c,g){if(g.at[0]!=="center"){var f=a(window);f=c.left+g.elemWidth-f.width()-f.scrollLeft();var i=g.my[0]==="left"?
-g.elemWidth:g.my[0]==="right"?g.elemWidth:0,h=-2*g.offset[0];c.left+=c.left<0?i+g.targetWidth+h:f>0?i-g.targetWidth+h:0}},top:function(c,g){if(g.at[1]!=="center"){var f=a(window);f=c.top+g.elemHeight-f.height()-f.scrollTop();var i=g.my[1]==="top"?-g.elemHeight:g.my[1]==="bottom"?g.elemHeight:0,h=g.at[1]==="top"?g.targetHeight:-g.targetHeight,k=-2*g.offset[1];c.top+=c.top<0?i+g.targetHeight+k:f>0?i+h+k:0}}}};if(!a.offset.setOffset){a.offset.setOffset=function(c,g){if(/static/.test(a.curCSS(c,"position")))c.style.position=
"relative";var f=a(c),i=f.offset(),h=parseInt(a.curCSS(c,"top",true),10)||0,k=parseInt(a.curCSS(c,"left",true),10)||0;i={top:g.top-i.top+h,left:g.left-i.left+k};"using"in g?g.using.call(c,i):f.css(i)};a.fn.offset=function(c){var g=this[0];if(!g||!g.ownerDocument)return null;if(c)return this.each(function(){a.offset.setOffset(this,c)});return d.call(this)}}})(jQuery);window.freebase=window.fb={mwLWTReloading:false};if(typeof SERVER==="object"&&SERVER.acre)window.fb.acre=SERVER.acre;
(function(a,e){if(a.cookie("mwLWTReloaded"))a.cookie("mwLWTReloaded",null,{path:"/"});else{var j=0,b=0;if(typeof e.acre==="object"&&e.acre&&e.acre.mwLastWriteTime)b=e.acre.mwLastWriteTime||0;if(document.cookie&&document.cookie!="")for(var d=document.cookie.split(";"),c=0,g=d.length;c<g;c++){var f=a.trim(d[c]);if(f.indexOf("mwLastWriteTime=")===0){f=decodeURIComponent(f.substring(16)).split("|");if(f.length)j=f[0]}}d=j?parseInt(j,10):-1;c=b?parseInt(b,10):-1;if(j&&b&&c<d){a.cookie("mwLWTReloaded",
"true",{path:"/"});e.mwLWTReloading=true;window.location.reload(true)}}})(jQuery,window.freebase);
(function(a,e){if(!e.mwLWTReloading){if(!window.console)window.console={log:a.noop,info:a.noop,debug:a.noop,warn:a.noop,error:a.noop};e.dispatch=function(f,i,h,k){if(typeof i!=="function")return false;f=a.event.fix(f||window.event);h||(h=[]);k||(k=this);return i.apply(k,[f].concat(h))};e.get_script=function(f,i){var h=e.get_script.cache,k=h[f];if(k)if(k.state===1)k.callbacks.push(i);else k.state===4&&i();else{k=h[f]={state:0,callbacks:[i]};a.ajax({url:f,dataType:"script",beforeSend:function(){k.state=
1},success:function(){k.state=4;a.each(k.callbacks,function(l,m){m()})},error:function(){k.state=-1}})}};e.get_script.cache={};a(window).bind("fb.user.signedin",function(f,i){console.log("fb.user.signnedin");e.user=i;var h=a("#nav-username a:first");if(h.length){h[0].href+=e.user.id;h.text(e.user.name)}a("#signedin").show()}).bind("fb.user.signedout",function(){console.log("fb.user.signedout");a("#signedout").show()});if(/^https?\:\/\/((www|devel)\.)?(freebase|sandbox\-freebase|branch\.qa\.metaweb|trunk\.qa\.metaweb)\.com(\:\d+)?/.test(e.acre.request.app_url)){var j=
function(f,i){var h=f.indexOf("|"+i+"_");if(h!=-1){h=h+2+i.length;var k=f.indexOf("|",h);if(k!=-1)return decodeURIComponent(f.substr(h,k-h))}return null},b=a.cookie("metaweb-user-info");if(b){var d=j(b,"g"),c=j(b,"u"),g=j(b,"p");g||(g="/user/"+this.name);setTimeout(function(){a(window).trigger("fb.user.signedin",{guid:d,name:c,id:g})},0)}else setTimeout(function(){a(window).trigger("fb.user.signedout")},0)}else a.ajax({url:"/acre/account/user_info",dataType:"json",success:function(f){f&&f.code===
"/api/status/ok"?a(window).trigger("fb.user.signedin",{id:f.id,guid:f.guid,name:f.username}):a(window).trigger("fb.user.signedout")},error:function(){a(window).trigger("fb.user.signedout")}});a(function(){var f=a("#SearchBox .SearchBox-input,#global-search-input"),i=e.acre.freebase.site_host;f.suggest({service_url:i,soft:true,category:"object",parent:"#site-search-box",align:"right",status:null});var h=a("#site-search-label"),k=a("#site-search-box .fbs-pane");f.bind("fb-select",function(l,m){window.location=
i+"/view"+m.id;return false}).bind("fb-pane-show",function(){h.html("<span>Select an item from the list</span>").removeClass("loading")}).bind("fb-textchange",function(){a.trim(f.val())===""?h.html("<span>Start typing to get some suggestions</span>").removeClass("loading"):h.html("<span>Searching...</span>").addClass("loading")}).bind("fb-error",function(){h.html("<span>Sorry, something went wrong. Please try again later</span>").removeClass("loading")}).focus(function(){h.is(":visible")||a("#site-search-label").slideDown("fast")}).blur(function(){!k.is(":visible")&&
h.is(":visible")&&a("#site-search-label").slideUp("fast")});a(".SearchBox-form").submit(function(){return a.trim(a("#global-search-input").val()).length==0?false:true});a("input, textarea").placeholder()});e.disable=function(f){a(f).attr("disabled","disabled").addClass("disabled")};e.enable=function(f){a(f).removeAttr("disabled").removeClass("disabled")};e.lang_select=function(f,i){setTimeout(function(){a(window).trigger("fb.lang.select",i)},0)};e.devbar={div:a("#devbar"),keydown:function(f){if(f.keyCode==
119||f.keyCode==123||f.keyCode==68&&f.shiftKey&&f.ctrlKey)e.devbar.toggle();return true},toggle:function(){if(e.devbar.div.is(":visible")){e.devbar.div.hide();a.localstore("devbar2",false)}else{e.devbar.div.show();e.devbar.div[0].scrollIntoView(true);a.localstore("devbar2",true)}return false},touch:function(){/^https?\:\/\/((www|devel)\.)?(freebase|sandbox\-freebase|branch\.qa\.metaweb|trunk\.qa\.metaweb)\.com(\:\d+)?/.test(e.acre.request.app_url)?a.ajax({url:e.acre.freebase.service_url+"/api/service/touch",
dataType:"jsonp"}):a.ajax({url:"/acre/touch"});return false},txn_ids:[],txn:function(){return e.devbar.view_txn(this.href,e.devbar.txn_ids)},view_txn:function(f,i){if(i&&i.length)window.location=f+"?"+a.param({tid:i},true);return false},ajaxComplete:function(f){if(f&&f.readyState===4)(f=f.getResponseHeader("x-metaweb-tid"))&&e.devbar.txn_ids.push(f)},init:function(){a.localstore("devbar2")?e.devbar.div.show():e.devbar.div.hide();a(document).keydown(e.devbar.keydown);a("#devbar-toggle > a").click(e.devbar.toggle);
a("#devbar-touch > a").click(e.devbar.touch);e.acre.tid&&e.devbar.txn_ids.push(e.acre.tid);a("#devbar-txn > a").click(e.devbar.txn);a.ajaxSetup({complete:e.devbar.ajaxComplete})}};e.devbar.init()}})(jQuery,window.freebase);var global_results={total_tests:0,total_failed:0,total_apps:0},html_id=function(a){return a.replace(/[\/\.]/g,"")};$(".summary").each(function(){load_app_summary($(this).attr("app_id"));global_results.total_apps++});
$("#release-all").click(function(){$(".release").each(function(){$(this).click()});return false});$("#test-all").click(function(){global_results.total_tests=0;global_results.total_failed=0;$(".test").each(function(){$(this).click()});return false});function load_app_summary(a){$("#summary-"+a).load($("#summary-"+a).attr("app_url"),[],function(){bind_app_buttons(a)})}
function bind_app_buttons(a){$("#release-"+a).click(function(){app_html_id=$(this).attr("app_html_id");$.ajax({url:$(this).attr("href"),data:{appid:$(this).attr("app_id"),version:$(this).attr("app_version")},type:"POST",dataType:"json",success:function(b){$("#message").html("App "+b.result.appid+" version "+b.result.release+" has been released.");load_app_summary(app_html_id)},beforeSend:function(b){b.setRequestHeader("X-Requested-With","XMLHttpRequest")}});return false});var e=function(b){var d=
html_id(b.app_path),c="<b>"+b.testfiles[0].file+"</b>",g="",f=0,i=0,h="test-passed";for(var k in b.testfiles[0].modules[0].tests){f++;global_results.total_tests++;var l=b.testfiles[0].modules[0].tests[k];g+="<br/><span class='"+(l.failures?"test-failed":"test-passed")+"'>"+l.name+": "+parseInt(parseInt(l.total)-parseInt(l.failures))+"/"+l.total;if(l.failures){h="test-failed";i++;global_results.total_failed++;for(var m in l.log){var p=l.log[m];if(p.result!=true)g+="<br/><i>"+p.message+"</i>"}}g+="</span>"}c+=
"<br/>"+parseInt(f-i)+"/"+f+" passed";$("#messages-"+d).append("<table style='margin-top: 10px;'><tr><td width='60px' class='"+h+"'>"+c+"</td><td width='130px'>"+g+"</td></tr></table>");$("#message").html("Total Tests: "+global_results.total_tests+" Failed: "+global_results.total_failed)},j=function(b){if(b.testfiles.length==0){b=html_id(b.app_path);$("#messages-"+b).append("(no tests)")}else for(var d in b.testfiles){testfile=b.testfiles[d];$.ajax({url:testfile.run_url,data:{output:"json"},type:"GET",
dataType:"jsonp",success:e})}};$("#test-"+a).bind("click",function(){$.ajax({url:$(this).attr("href"),data:{output:"json",mode:"discover"},type:"GET",dataType:"jsonp",success:j});return false})};
