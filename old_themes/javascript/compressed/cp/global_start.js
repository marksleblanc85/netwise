/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2015, EllisLab, Inc.
 * @license		http://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 2.0
 * @filesource
 */
!function(e){"use strict";EE.namespace=function(e){var t=e.split("."),i=EE;"EE"===t[0]&&(t=t.slice(1));for(var a=0,o=t.length;o>a;a+=1)"undefined"==typeof i[t[a]]&&(i[t[a]]={}),i=i[t[a]];return i},EE.namespace("EE.cp"),e.ajaxPrefilter(function(t,i,a){var o=EE.CSRF_TOKEN,n=t.type.toUpperCase();_.has(t,"error")||a.error(function(e){_.defer(function(){throw[e.statusText,e.responseText]})}),"POST"==n&&t.crossDomain===!1&&a.setRequestHeader("X-CSRF-TOKEN",o);var s={eexid:function(e){e&&EE.cp.setCsrfToken(e)},"csrf-token":function(e){e&&EE.cp.setCsrfToken(e)},"ee-redirect":function(e){window.location=EE.BASE+"&"+e.replace("//","/")},"ee-broadcast":function(t){EE.cp.broadcastEvents[t](),e(window).trigger("broadcast",t)}},r=e.merge(s,i.eeResponseHeaders||{});a.complete(function(e){t.crossDomain===!1&&_.each(r,function(t,i){var a=e.getResponseHeader("X-"+i);a&&t(a)})})}),EE.grid_cache=[],window.Grid={bind:function(){EE.grid_cache.push(arguments)}},e(document).ready(function(){!1 in document.createElement("input")&&EE.insert_placeholders(),e('a[rel="external"]').click(function(){return window.open(this.href),!1}),EE.importantMessage&&EE.cp.showNoticeBanner(),EE.cp.zebra_tables(),EE.cp.show_hide_sidebar(),EE.cp.display_notices(),EE.cp.cleanUrls(),EE.cp.deprecation_meaning(),EE.cp.notepad.init(),EE.cp.accessory_toggle(),EE.cp.control_panel_search(),e("#quickLinks h4").click(function(){window.location.href=EE.BASE+"&C=myaccount&M=quicklinks"}).add("#notePad").hover(function(){e(".sidebar_hover_desc",this).show()},function(){e(".sidebar_hover_desc",this).hide()}).css("cursor","pointer")}),EE.cp.setCsrfToken=function(t,i){e('input[name="XID"]').val(t),e('input[name="csrf_token"]').val(t),EE.XID=t,EE.CSRF_TOKEN=t,i||e(window).trigger("broadcast.setCsrfToken",t)},e(window).bind("broadcast.setCsrfToken",function(e,t){EE.cp.setCsrfToken(t,!0)});var t=/[&?](S=[A-Za-z0-9]+)/;EE.cp.setBasePath=function(i,a){var i=i.replace(/&amp;/g,"&"),o=i.match(t)||["",""],n=EE.BASE.match(t)||["",""],s=function(e,t){return t?t.replace(n[1],o[1]):void 0};e("a").attr("href",s),e("form").attr("action",s),"function"==typeof window.history.pushState&&window.history.replaceState(null,document.title,window.location.href.replace(n[1],o[1])),EE.BASE=i,a||e(window).trigger("broadcast.setBasePath",i)},e(window).bind("broadcast.setBasePath",function(e,t){EE.cp.setBasePath(t,!0)}),EE.cp.refreshSessionData=function(t,i){i&&EE.cp.setBasePath(i),e.getJSON(EE.BASE+"&C=login&M=refresh_csrf_token",function(e){EE.cp.setBasePath(e.base)})},EE.cp.accessory_toggle=function(){e("#accessoryTabs li a").click(function(t){t.preventDefault();var i=e(this).parent("li"),a=e("#"+this.className);i.hasClass("current")?(a.slideUp("fast"),i.removeClass("current")):(i.siblings().hasClass("current")?(a.show().siblings(":not(#accessoryTabs)").hide(),i.siblings().removeClass("current")):a.slideDown("fast"),i.addClass("current"))})};var i=/(.*?)[?](.*?&)?(D=cp(?:&C=[^&]+(?:&M=[^&]+)?)?)(?:&(.+))?$/,a=/&?[DCM]=/g,o=/^&+/,n=/&+$/,s=/(^|&)S=0(&|$)/;EE.cp.cleanUrl=function(e,t){t=t||e,t=t||"",t=t.toString().replace(/^(\S*?)S=(\S+?)&(\S*?)$/g,"$1$3&S=$2");var r=i.exec(t);if(r){var c=r[3].replace(a,"/"),d=r[2]||"",l=r[4]||"",h=r[1]+"?"+c,u=l.replace(s,"")+"&"+d.replace(s,"");return u=u.replace(o,"").replace(n,""),u&&(h+="&"+u),h.replace(n,"")}},EE.cp.cleanUrls=function(){e("a:not([href^=javascript])").attr("href",EE.cp.cleanUrl),e("form").attr("action",EE.cp.cleanUrl)},EE.cp.showNoticeBanner=function(){var t,i,a,o;t=EE.importantMessage.state,i=e("#ee_important_message"),a=function(){t=!t,document.cookie="exp_home_msg_state="+(t?"open":"closed")},o=function(){e.ee_notice.show_info(function(){e.ee_notice.hide_info(),i.removeClass("closed").show(),a()})},i.find(".msg_open_close").click(function(){i.hide(),o(),a()}),t||o()},EE.cp.notepad=function(){var t,i,a,o,n,s;return{init:function(){var r=e("#notePad");t=e("#notepad_form"),i=e("#notePadTextEdit"),a=e("#notePadControls"),o=e("#notePadText"),n=o.text(),s=i.val(),s&&o.html(s.replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/\n/gi,"<br />")),r.click(EE.cp.notepad.show),a.find("a.cancel").click(EE.cp.notepad.hide),t.submit(EE.cp.notepad.submit),a.find("input.submit").click(EE.cp.notepad.submit),i.autoResize()},submit:function(){s=e.trim(i.val());var r=s.replace(/</gi,"&lt;").replace(/>/gi,"&gt;").replace(/\n/gi,"<br />");return i.attr("readonly","readonly").css("opacity",.5),a.find("#notePadSaveIndicator").show(),e.post(t.attr("action"),{notepad:s},function(){o.html(r||n).show(),i.attr("readonly",!1).css("opacity",1).hide(),a.hide().find("#notePadSaveIndicator").hide()},"json"),!1},show:function(){if(a.is(":visible"))return!1;var e="";o.hide().text()!==n&&(e=o.html().replace(/<br>/gi,"\n").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")),a.show(),i.val(e).show().height(0).focus().trigger("keypress")},hide:function(){return o.show(),i.hide(),a.hide(),!1}}}(),EE.cp.control_panel_search=function(){var t,i=e("#search"),a=i.clone(),o=e("#cp_search_form").find(".searchButton");t=function(){var n=e(this).attr("action"),s={cp_search_keywords:e("#cp_search_keywords").val()};return e.ajax({url:n,data:s,type:"POST",dataType:"html",beforeSend:function(){o.toggle()},success:function(n){o.toggle(),i=i.replaceWith(a),a.html(n),e("#cp_reset_search").click(function(){return a=a.replaceWith(i),e("#cp_search_form").submit(t),e("#cp_search_keywords").select(),!1})}}),!1},e("#cp_search_form").submit(t)},EE.cp.show_hide_sidebar=function(){var t,i={revealSidebarLink:"77%",hideSidebarLink:"100%"},a=e("#mainContent"),o=e("#sidebarContent"),n=a.height(),s=o.height();"n"===EE.CP_SIDEBAR_STATE?(a.css("width","100%"),e("#revealSidebarLink").css("display","block"),e("#hideSidebarLink").hide(),o.show(),s=o.height(),o.hide()):(o.hide(),n=a.height(),o.show()),t=s>n?s:n,e("#revealSidebarLink, #hideSidebarLink").click(function(s){var r=e(this),c=r.siblings("a"),d="revealSidebarLink"===this.id;return e.ajax({type:"POST",dataType:"json",url:EE.BASE+"&C=myaccount&M=update_sidebar_status",data:{show:d},success:function(e){"success"===e.messageType}}),s.isTrigger||e(window).trigger("broadcast.sidebar",d),e("#sideBar").css({position:"absolute","float":"",right:"0"}),r.hide(),c.css("display","block"),o.slideToggle(),a.animate({width:i[this.id],height:d?t:n},function(){a.height(""),e("#sideBar").css({position:"","float":"right"})}),!1}),e(window).bind("broadcast.sidebar",function(t,i){var a=i?"#revealSidebarLink":"#hideSidebarLink";e(a).filter(":visible").trigger("click")})},EE.cp.display_notices=function(){var t=["success","notice","error"];e(".message.js_hide").each(function(){for(var i in t)e(this).hasClass(t[i])&&e.ee_notice(e(this).html(),{type:t[i]})})},EE.insert_placeholders=function(){e('input[type="text"]').each(function(){if(this.placeholder){var t=e(this),i=this.placeholder,a=t.css("color");""==t.val()&&t.data("user_data","n"),t.focus(function(){t.css("color",a),t.val()===i&&(t.val(""),t.data("user_data","y"))}).blur(function(){(""===t.val()||t.val===i)&&(t.val(i).css("color","#888"),t.data("user_data","n"))}).trigger("blur")}})},EE.cp.deprecation_meaning=function(){e(".deprecation_meaning").click(function(t){t.preventDefault();var i=e('<div class="alert">'+EE.developer_log.deprecation_meaning+" </div>");i.dialog({height:300,modal:!0,title:EE.developer_log.dev_log_help,width:460})})},EE.cp.zebra_tables=function(t){t=t||e("table"),t.jquery||(t=e(t)),e(t).find("tr").removeClass("even odd").filter(":even").addClass("even").end().filter(":odd").addClass("odd")},EE.cp.broadcastEvents=function(){var t=1e3,i=18e5,a=27e5,o=3e6,n=e("#idle-modal").dialog({autoOpen:!1,resizable:!1,title:EE.lang.session_idle,modal:!0,closeOnEscape:!1,position:"center",height:"auto",width:354});n.closest(".ui-dialog").find(".ui-dialog-titlebar-close").remove(),n.find("form").on("interact",_.throttle(EE.cp.refreshSessionData,6e5)),n.find("form").on("submit",function(){return e.ajax({type:"POST",url:this.action,data:e(this).serialize(),dataType:"json",success:function(t){return"success"!=t.messageType?void alert(t.message):(r.login(),EE.cp.refreshSessionData(null,t.base),void e(window).trigger("broadcast.idleState","login"))},error:function(e){alert(e.message)}}),!1});var s={hasFocus:!0,modalActive:!1,pingReceived:!1,lastActive:e.now(),lastRefresh:e.now(),setActiveTime:function(){(this.modalActive||!this.modalThresholdReached())&&(this.refreshThresholdReached()&&this.doRefresh(),this.lastActive=e.now())},modalThresholdReached:function(){var t=e.now()-this.lastActive,o=this.hasFocus&&t>i||!this.hasFocus&&t>a;return this.modalActive===!1&&o===!0},refreshThresholdReached:function(){var t=e.now()-this.lastRefresh;return t>o},doRefresh:function(){this.lastRefresh=e.now(),EE.cp.refreshSessionData()},resolve:function(){return EE.hasRememberMe?void(this.refreshThresholdReached()&&this.doRefresh()):(this.modalThresholdReached()?(r.modal(),e(window).trigger("broadcast.idleState","modal"),e.get(EE.BASE+"&C=login&M=lock_cp")):this.hasFocus&&this.pingReceived===!1&&e(window).trigger("broadcast.idleState","active"),void(this.pingReceived=!1))}},r={active:function(){s.setActiveTime()},focus:function(){s.setActiveTime(),s.hasFocus=!0},blur:function(){s.setActiveTime(),s.hasFocus=!1},interact:function(){s.hasFocus&&s.setActiveTime()},modal:function(){s.modalActive||(n.dialog("open"),n.on("dialogbeforeclose",e.proxy(this,"logout")),s.modalActive=!0),s.setActiveTime()},login:function(){n.off("dialogbeforeclose"),n.dialog("close"),n.find(":password").val(""),s.setActiveTime(),s.modalActive=!1},logout:function(){window.location=EE.BASE+"&C=login&M=logout"}},c={_t:null,init:function(){e(window).trigger("broadcast.setBasePath",EE.BASE),e(window).trigger("broadcast.setCsrfToken",EE.CSRF_TOKEN),e(window).trigger("broadcast.idleState","login"),this._bindEvents(),this.track()},_bindEvents:function(){var t=e.proxy(this,"track");e(window).on("broadcast.idleState",function(e,i){switch(i){case"active":s.pingReceived=!0,t(i);break;case"modal":case"login":case"logout":r[i]()}}),e(window).bind("blur",_.partial(t,"blur")),e(window).bind("focus",_.partial(t,"focus"));var i="DOMMouseScroll keydown mousedown mousemove mousewheel touchmove touchstart";e(document).on(i.split(" ").join(".idleState "),_.throttle(_.partial(t,"interact"),500)),e(".logOutButton").click(function(){e(window).trigger("broadcast.idleState","modal")})},track:function(i){clearTimeout(this._t),this._t=setTimeout(e.proxy(this,"track"),t),i&&r[i](),s.resolve()}};return c.init(),r}()}(jQuery);