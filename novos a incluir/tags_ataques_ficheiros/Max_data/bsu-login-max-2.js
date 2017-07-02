!function(){var t=function(){this._init()};t.prototype={_init:function(){this._loginHost="https://login.sapo.pt",window.location.href.indexOf("login.staging.sapo.pt")>-1?this._loginHost="https://login.staging.sapo.pt":this._loginHost="https://login.sapo.pt",this._isLoggedIn=!1,this._socket=null,this._parentHost=null,this._parentURL=null,this._optLoginURL=null,this._optLogoutURL=null,this._container=null,this._notificationsContainerElm=null,this._userActionsElm=null,this._logoutElm=null,this._loginElm=null,this._lastDocumentHeight=0,this._setVars(),null!==this._parentHost&&(this._initPostMessage(),this._setElms(),this._initEvents())},_setVars:function(){var t=this._getQueryString();"undefined"!=typeof t.ref&&(this._parentHost=t.ref),"undefined"!=typeof t.source&&(this._parentURL=t.source),"undefined"!=typeof t.login&&t.login&&(this._optLoginURL=t.login,/^https?\:\/\//.test(this._optLoginURL)||(this._optLoginURL=this._parentHost+"/"+this._optLoginURL)),"undefined"!=typeof t.logout&&t.logout&&(this._optLogoutURL=t.logout,/^https?\:\/\//.test(this._optLogoutURL)||(this._optLogoutURL=this._parentHost+"/"+this._optLogoutURL))},_initPostMessage:function(){var t=this;window.postMessage&&(window.addEventListener?window.addEventListener("message",function(i){t._onPostMessageFromClient(i.data)},!1):window.attachEvent&&window.attachEvent("onmessage",function(i){t._onPostMessageFromClient(i.data)},!1),this._socket=window.parent,this._socket.postMessage("ready_login_max",this._parentHost))},_setElms:function(){this._notificationsContainerElm=document.getElementById("notifications-container"),this._notificationListElm=document.getElementById("notification-list"),this._userActionsElm=document.getElementById("user-actions"),this._logoutElm=document.getElementById("bsu-v2-logout"),this._loginElm=document.getElementById("bsu-v2-login")},_initEvents:function(){if(null!==this._userActionsElm){this._isLoggedIn=!0;var t=this;this._addEvent(this._notificationsContainerElm,"click",function(i){var e=i.target||i.srcElement||null;if(e=!e||3!==e.nodeType&&4!==e.nodeType?e:e.parentNode){var n=t._findUpByClass(e,"dismiss");n&&t._prevEventDefault(i);var s=t._findUpByClass(e,"notification-ctn");s&&s.parentNode.removeChild(s),t._notifyParentWithDimensions()}}),this._optLogoutURL?this._logoutElm.setAttribute("href",this._optLogoutURL):this._logoutElm.setAttribute("href",this._loginHost+"/Logout.do?to="+encodeURIComponent(this._parentURL)),this._logoutElm.setAttribute("target","_top")}else null!==this._loginElm&&(this._isLoggedIn=!1,this._optLoginURL?this._loginElm.setAttribute("href",this._optLoginURL):this._loginElm.setAttribute("href",this._loginHost+"/Login.do?to="+encodeURIComponent(this._parentURL)),this._loginElm.setAttribute("target","_top"))},_onPostMessageFromClient:function(t){"give_me_dimensions"===t&&this._notifyParentWithDimensions()},_notifyParentWithDimensions:function(){if(this._isLoggedIn&&this._socket){var t=this._notificationListElm.offsetHeight||0,i=this._userActionsElm.offsetHeight||300,e=t+i;(e<this._lastDocumentHeight-5||e>this._lastDocumentHeight+5)&&(this._lastDocumentHeight=e,this._socket.postMessage("resize_login_max|height="+e,this._parentHost))}},_addEvent:function(t,i,e){t&&i&&e&&(t.addEventListener?t.addEventListener(i,e,!1):t.attachEvent&&t.attachEvent("on"+i,e))},_prevEventDefault:function(t){t&&(t.preventDefault&&t.preventDefault(),window.attachEvent&&(t.returnValue=!1),null!==t.cancel&&(t.cancel=!0))},_findUpByClass:function(t,i){for(;t&&1===t.nodeType;){if(this._hasClassName(t,i))return t;t=t.parentNode}return!1},_getQueryString:function(){var t=window.location.href,i={};if(t.match(/\?(.+)/i)){var e=t.replace(/^(.*)\?([^\#]+)(\#(.*))?/g,"$2");if(e.length>0)for(var n=e.split(/[;&]/),s=0;s<n.length;s++){var o=n[s].split("=");i[decodeURIComponent(o[0])]="undefined"!=typeof o[1]&&o[1]?decodeURIComponent(o[1]):!1}}return i},_checkMobile:function(){this._isMobile=!1,this._isMobileIOS=!1,this._isMobileAndroid=!1,this._isMobileWinPhone=!1,navigator.userAgent.match(/iPhone|iPad|iPod/i)?(this._isMobile=!0,this._isMobileIOS=!0):navigator.userAgent.match(/Android/i)?(this._isMobile=!0,this._isMobileAndroid=!0):navigator.userAgent.match(/IEMobile/i)&&(this._isMobile=!0,this._isMobileWinPhone=!0)},_checkHasTouch:function(){return"ontouchstart"in window?!0:!1},_addTouchClassToContainer:function(){this._checkHasTouch()||this._addClassName(this._container,"bsu-v2-no-touch")},_addClassName:function(t,i){if(!t||!i)return null;i=(""+i).split(/[, ]+/);for(var e=0,n=i.length;n>e;e++)i[e].replace(/^\s+|\s+$/g,"")&&("undefined"!=typeof t.classList?t.classList.add(i[e]):this._hasClassName(t,i[e])||(t.className+=(t.className?" ":"")+i[e]))},_removeClassName:function(t,i){if(!t||!i)return null;i=(""+i).split(/[, ]+/);var e=0,n=i.length;if("undefined"!=typeof t.classList)for(;n>e;e++)t.classList.remove(i[e]);else{for(var s,o=t.className||"";n>e;e++)s=new RegExp("(^|\\s+)"+i[e]+"(\\s+|$)"),o=o.replace(s," ");t.className=o.replace(/^\s+/,"").replace(/\s+$/,"")}},_hasClassName:function(t,i,e){i=(""+i).split(/[, ]+/);for(var n,s,o=0,a=i.length;a>o;o++){if("undefined"!=typeof t.classList)n=t.classList.contains(i[o]);else{var l=t.className;l===i[o]?n=!0:(s=new RegExp("(^|\\s)"+i[o]+"(\\s|$)"),n=s.test(l))}if(n&&!e)return!0;if(!n&&e)return!1}return e?!0:!1},_debug:function(){}},new t}();