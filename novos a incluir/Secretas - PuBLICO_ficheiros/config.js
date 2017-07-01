﻿!function (a, b, c) { "use strict"; "undefined" != typeof module && module.exports ? module.exports = c() : "function" == typeof define && define.amd ? define(c) : b[a] = c() }("Fingerprint2", this, function () { "use strict"; var a = !1, b = function (a) { var b = { swfContainerId: "fingerprintjs2", swfPath: "flash/compiled/FontList.swf" }; this.options = this.extend(a, b), this.nativeForEach = Array.prototype.forEach, this.nativeMap = Array.prototype.map }; return b.prototype = { extend: function (a, b) { if (null == a) return b; for (var c in a) null != a[c] && b[c] !== a[c] && (b[c] = a[c]); return b }, log: function (a) { window.console && console.log(a) }, get: function (a) { var b = []; b = this.userAgentKey(b), b = this.languageKey(b), b = this.colorDepthKey(b), b = this.screenResolutionKey(b), b = this.timezoneOffsetKey(b), b = this.sessionStorageKey(b), b = this.localStorageKey(b), b = this.indexedDbKey(b), b = this.addBehaviorKey(b), b = this.openDatabaseKey(b), b = this.cpuClassKey(b), b = this.platformKey(b), b = this.doNotTrackKey(b), b = this.canvasKey(b); var c = this; this.fontsKey(b, function (b) { var d = c.x64hash128(b.join("~~~"), 31); return a(d) }) }, userAgentKey: function (a) { return this.options.excludeUserAgent || a.push(navigator.userAgent), a }, languageKey: function (a) { return this.options.excludeLanguage || a.push(navigator.language), a }, colorDepthKey: function (a) { return this.options.excludeColorDepth || a.push(screen.colorDepth), a }, screenResolutionKey: function (a) { if (!this.options.excludeScreenResolution) { var b = this.getScreenResolution(); "undefined" != typeof b && a.push(b.join("x")) } return a }, getScreenResolution: function () { var a; return a = this.options.detectScreenOrientation ? screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height] : [screen.height, screen.width] }, timezoneOffsetKey: function (a) { return this.options.excludeTimezoneOffset || a.push((new Date).getTimezoneOffset()), a }, sessionStorageKey: function (a) { return !this.options.excludeSessionStorage && this.hasSessionStorage() && a.push("sessionStorageKey"), a }, localStorageKey: function (a) { return !this.options.excludeSessionStorage && this.hasLocalStorage() && a.push("localStorageKey"), a }, indexedDbKey: function (a) { return !this.options.excludeIndexedDB && this.hasIndexedDB() && a.push("indexedDbKey"), a }, addBehaviorKey: function (a) { return document.body && !this.options.excludeAddBehavior && document.body.addBehavior && a.push("addBehaviorKey"), a }, openDatabaseKey: function (a) { return !this.options.excludeOpenDatabase && window.openDatabase && a.push("openDatabase"), a }, cpuClassKey: function (a) { return this.options.excludeCpuClass || a.push(this.getNavigatorCpuClass()), a }, platformKey: function (a) { return this.options.excludePlatform || a.push(this.getNavigatorPlatform()), a }, doNotTrackKey: function (a) { return this.options.excludeDoNotTrack || a.push(this.getDoNotTrack()), a }, canvasKey: function (a) { return !this.options.excludeCanvas && this.isCanvasSupported() && a.push(this.getCanvasFp()), a }, fontsKey: function (b, c) { return this.options.excludeFlashFonts ? (a && this.log("Skipping flash fonts detection per excludeFlashFonts configuration option"), this.options.excludeJsFonts ? (a && this.log("Skipping js fonts detection per excludeJsFonts configuration option"), c(b)) : c(this.jsFontsKey(b))) : this.hasSwfObjectLoaded() ? this.hasMinFlashInstalled() ? "undefined" == typeof this.options.swfPath ? (a && this.log("To use Flash fonts detection, you must pass a valid swfPath option, skipping Flash fonts enumeration"), c(this.jsFontsKey(b))) : this.flashFontsKey(b, c) : (a && this.log("Flash is not installed, skipping Flash fonts enumeration"), c(this.jsFontsKey(b))) : (a && this.log("Swfobject is not detected, Flash fonts enumeration is skipped"), c(this.jsFontsKey(b))) }, flashFontsKey: function (a, b) { this.loadSwfAndDetectFonts(function (c) { a.push(c.join(";")), b(a) }) }, jsFontsKey: function (a) { var b = ["monospace", "sans-serif", "serif"], c = "mmmmmmmmmmlli", d = "72px", e = document.getElementsByTagName("body")[0], f = document.createElement("span"); f.style.fontSize = d, f.innerHTML = c; var g = {}, h = {}; for (var i in b) f.style.fontFamily = b[i], e.appendChild(f), g[b[i]] = f.offsetWidth, h[b[i]] = f.offsetHeight, e.removeChild(f); for (var j = function (a) { var c = !1; for (var d in b) { f.style.fontFamily = a + "," + b[d], e.appendChild(f); var i = f.offsetWidth !== g[b[d]] || f.offsetHeight !== h[b[d]]; e.removeChild(f), c = c || i } return c }, k = ["Arial Black", "Arial Narrow", "Arial Rounded MT Bold", "Arial", "Bookman Old Style", "Bradley Hand ITC", "Century Gothic", "Century", "Comic Sans MS", "Courier New", "Courier", "Cursive", "Fantasy", "Gentium", "Georgia", "Impact", "King", "Lalit", "Lucida Console", "Modena", "Monospace", "Monotype Corsiva", "Papyrus", "Sans-Serif", "Serif", "Tahoma", "TeX", "Times New Roman", "Times", "Trebuchet MS", "Verdana", "Verona"], l = [], m = 0, n = k.length; n > m; m++) j(k[m]) && l.push(k[m]); return a.push(l.join(";")), a }, hasSessionStorage: function () { try { return !!window.sessionStorage } catch (a) { return !0 } }, hasLocalStorage: function () { try { return !!window.localStorage } catch (a) { return !0 } }, hasIndexedDB: function () { return !!window.indexedDB }, getNavigatorCpuClass: function () { return navigator.cpuClass ? "navigatorCpuClass: " + navigator.cpuClass : "navigatorCpuClass: unknown" }, getNavigatorPlatform: function () { return navigator.platform ? "navigatorPlatform: " + navigator.platform : "navigatorPlatform: unknown" }, getDoNotTrack: function () { return navigator.doNotTrack ? "doNotTrack: " + navigator.doNotTrack : "doNotTrack: unknown" }, getCanvasFp: function () { var a = document.createElement("canvas"), b = a.getContext("2d"), c = "Cwm fjordbank glyphs vext quiz, https://www.publico.pt ?"; return b.textBaseline = "top", b.font = "70px 'Arial'", b.textBaseline = "alphabetic", b.fillStyle = "#f60", b.fillRect(125, 1, 62, 20), b.fillStyle = "#069", b.fillText(c, 2, 15), b.fillStyle = "rgba(102, 204, 0, 0.7)", b.fillText(c, 4, 17), a.toDataURL() }, isCanvasSupported: function () { var a = document.createElement("canvas"); return !(!a.getContext || !a.getContext("2d")) }, hasSwfObjectLoaded: function () { return "undefined" != typeof window.swfobject }, hasMinFlashInstalled: function () { return swfobject.hasFlashPlayerVersion("9.0.0") }, addFlashDivNode: function () { var a = document.createElement("div"); a.setAttribute("id", this.options.swfContainerId), document.body.appendChild(a) }, loadSwfAndDetectFonts: function (a) { var b = "___fp_swf_loaded"; window[b] = function (b) { a(b) }; var c = this.options.swfContainerId; this.addFlashDivNode(); var d = { onReady: b }, e = { allowScriptAccess: "always", menu: "false" }; swfobject.embedSWF(this.options.swfPath, c, "1", "1", "9.0.0", !1, d, e, {}) }, each: function (a, b, c) { if (null !== a) if (this.nativeForEach && a.forEach === this.nativeForEach) a.forEach(b, c); else if (a.length === +a.length) { for (var d = 0, e = a.length; e > d; d++) if (b.call(c, a[d], d, a) === {}) return } else for (var f in a) if (a.hasOwnProperty(f) && b.call(c, a[f], f, a) === {}) return }, map: function (a, b, c) { var d = []; return null == a ? d : this.nativeMap && a.map === this.nativeMap ? a.map(b, c) : (this.each(a, function (a, e, f) { d[d.length] = b.call(c, a, e, f) }), d) }, x64Add: function (a, b) { a = [a[0] >>> 16, 65535 & a[0], a[1] >>> 16, 65535 & a[1]], b = [b[0] >>> 16, 65535 & b[0], b[1] >>> 16, 65535 & b[1]]; var c = [0, 0, 0, 0]; return c[3] += a[3] + b[3], c[2] += c[3] >>> 16, c[3] &= 65535, c[2] += a[2] + b[2], c[1] += c[2] >>> 16, c[2] &= 65535, c[1] += a[1] + b[1], c[0] += c[1] >>> 16, c[1] &= 65535, c[0] += a[0] + b[0], c[0] &= 65535, [c[0] << 16 | c[1], c[2] << 16 | c[3]] }, x64Multiply: function (a, b) { a = [a[0] >>> 16, 65535 & a[0], a[1] >>> 16, 65535 & a[1]], b = [b[0] >>> 16, 65535 & b[0], b[1] >>> 16, 65535 & b[1]]; var c = [0, 0, 0, 0]; return c[3] += a[3] * b[3], c[2] += c[3] >>> 16, c[3] &= 65535, c[2] += a[2] * b[3], c[1] += c[2] >>> 16, c[2] &= 65535, c[2] += a[3] * b[2], c[1] += c[2] >>> 16, c[2] &= 65535, c[1] += a[1] * b[3], c[0] += c[1] >>> 16, c[1] &= 65535, c[1] += a[2] * b[2], c[0] += c[1] >>> 16, c[1] &= 65535, c[1] += a[3] * b[1], c[0] += c[1] >>> 16, c[1] &= 65535, c[0] += a[0] * b[3] + a[1] * b[2] + a[2] * b[1] + a[3] * b[0], c[0] &= 65535, [c[0] << 16 | c[1], c[2] << 16 | c[3]] }, x64Rotl: function (a, b) { return b %= 64, 32 === b ? [a[1], a[0]] : 32 > b ? [a[0] << b | a[1] >>> 32 - b, a[1] << b | a[0] >>> 32 - b] : (b -= 32, [a[1] << b | a[0] >>> 32 - b, a[0] << b | a[1] >>> 32 - b]) }, x64LeftShift: function (a, b) { return b %= 64, 0 === b ? a : 32 > b ? [a[0] << b | a[1] >>> 32 - b, a[1] << b] : [a[1] << b - 32, 0] }, x64Xor: function (a, b) { return [a[0] ^ b[0], a[1] ^ b[1]] }, x64Fmix: function (a) { return a = this.x64Xor(a, [0, a[0] >>> 1]), a = this.x64Multiply(a, [4283543511, 3981806797]), a = this.x64Xor(a, [0, a[0] >>> 1]), a = this.x64Multiply(a, [3301882366, 444984403]), a = this.x64Xor(a, [0, a[0] >>> 1]) }, x64hash128: function (a, b) { a = a || "", b = b || 0; for (var c = a.length % 16, d = a.length - c, e = [0, b], f = [0, b], g = [0, 0], h = [0, 0], i = [2277735313, 289559509], j = [1291169091, 658871167], k = 0; d > k; k += 16) g = [255 & a.charCodeAt(k + 4) | (255 & a.charCodeAt(k + 5)) << 8 | (255 & a.charCodeAt(k + 6)) << 16 | (255 & a.charCodeAt(k + 7)) << 24, 255 & a.charCodeAt(k) | (255 & a.charCodeAt(k + 1)) << 8 | (255 & a.charCodeAt(k + 2)) << 16 | (255 & a.charCodeAt(k + 3)) << 24], h = [255 & a.charCodeAt(k + 12) | (255 & a.charCodeAt(k + 13)) << 8 | (255 & a.charCodeAt(k + 14)) << 16 | (255 & a.charCodeAt(k + 15)) << 24, 255 & a.charCodeAt(k + 8) | (255 & a.charCodeAt(k + 9)) << 8 | (255 & a.charCodeAt(k + 10)) << 16 | (255 & a.charCodeAt(k + 11)) << 24], g = this.x64Multiply(g, i), g = this.x64Rotl(g, 31), g = this.x64Multiply(g, j), e = this.x64Xor(e, g), e = this.x64Rotl(e, 27), e = this.x64Add(e, f), e = this.x64Add(this.x64Multiply(e, [0, 5]), [0, 1390208809]), h = this.x64Multiply(h, j), h = this.x64Rotl(h, 33), h = this.x64Multiply(h, i), f = this.x64Xor(f, h), f = this.x64Rotl(f, 31), f = this.x64Add(f, e), f = this.x64Add(this.x64Multiply(f, [0, 5]), [0, 944331445]); switch (g = [0, 0], h = [0, 0], c) { case 15: h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 14)], 48)); case 14: h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 13)], 40)); case 13: h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 12)], 32)); case 12: h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 11)], 24)); case 11: h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 10)], 16)); case 10: h = this.x64Xor(h, this.x64LeftShift([0, a.charCodeAt(k + 9)], 8)); case 9: h = this.x64Xor(h, [0, a.charCodeAt(k + 8)]), h = this.x64Multiply(h, j), h = this.x64Rotl(h, 33), h = this.x64Multiply(h, i), f = this.x64Xor(f, h); case 8: g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 7)], 56)); case 7: g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 6)], 48)); case 6: g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 5)], 40)); case 5: g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 4)], 32)); case 4: g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 3)], 24)); case 3: g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 2)], 16)); case 2: g = this.x64Xor(g, this.x64LeftShift([0, a.charCodeAt(k + 1)], 8)); case 1: g = this.x64Xor(g, [0, a.charCodeAt(k)]), g = this.x64Multiply(g, i), g = this.x64Rotl(g, 31), g = this.x64Multiply(g, j), e = this.x64Xor(e, g) } return e = this.x64Xor(e, [0, a.length]), f = this.x64Xor(f, [0, a.length]), e = this.x64Add(e, f), f = this.x64Add(f, e), e = this.x64Fmix(e), f = this.x64Fmix(f), e = this.x64Add(e, f), f = this.x64Add(f, e), ("00000000" + (e[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (e[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (f[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (f[1] >>> 0).toString(16)).slice(-8) } }, b });
function setCookie(e,t,i,n){var a=new Date;a=new Date(a.getFullYear(),a.getMonth(),a.getDate(),0,0,0,0),null==i||"undefined"==typeof i||isNaN(parseInt(i))?a.setTime(a.getTime()+31536e6):a.setTime(a.getTime()+24*parseInt(i)*60*60*1e3);var o="; expires="+a.toGMTString();return"undefined"==typeof n||null==n?document.cookie=e+"="+t+o+"; domain=.publico.pt;  path=/":document.cookie=e+"="+t+o,t}function getCookie(e){var t=document.cookie,i=t.indexOf(" "+e+"=");if(-1==i&&(i=t.indexOf(e+"=")),-1==i)t=null;else{i=t.indexOf("=",i)+1;var n=t.indexOf(";",i);-1==n&&(n=t.length),t=unescape(t.substring(i,n))}return t}function checkReferrer(){var e=!1,t="";if("undefined"!=typeof document.referrer&&null!=document.referrer&&""!=document.referrer?t=document.referrer:"undefined"!=typeof parent.document.referrer&&null!=parent.document.referrer&&""!=parent.document.referrer&&(t=parent.document.referrer),""!=t){try{t=t.match(/:\/\/(.[^\/]+)/)[1],referrerName=t,t.indexOf("publico.pt")<0&&(e=!0)}catch(i){}if(e){var n=/google\.|bing\.|ask\.|yahoo\.|conduit\.|avg\.|babylon\.|search-results\.|incredimail\.|360\.|aol\./g;if(null!=t.match(n))window.isOrganicSearchReferrer=!0;else{var n=/facebook\./g;null!=t.match(n)&&(window.isFacebookReferrer=!0)}}}return e}function pubID(e){e&&e.UPID?("undefined"==typeof myConfig&&(myConfig=instance),uid=e.UPID,window.userCountry=e.COUNTRY,saveData(uid,window.userCountry),myConfig.GetUserPaywallValues(e.UPID,myConfig.dataId)):_paq.push(["setCustomVariable","8","Error","Invalid data received from id generator"])}function pwCallback(e){e&&e.length>0?myConfig.processPaywallData(e):_paq.push(["setCustomVariable","8","Error","Paywall values are empty"])}function saveData(e,t){setCookie(uIdentifierName,e),"undefined"!=typeof t&&null!==t&&"null"!==t?setCookie(uIdentifierCountry,t):jQuery.ajax({url:"https://s.publico.pt/ip.php",traditional:!0,type:"GET",dataType:"jsonp",jsonpCallback:"geoLocation",timeout:2e3,data:"",success:function(e){},error:function(e,t,i){}});try{window.localStorage&&(localStorage.setItem(uIdentifierName,e),localStorage.setItem(uIdentifierCountry,window.userCountry))}catch(i){if(window.sessionStorage)try{sessionStorage.setItem(uIdentifierName,e)}catch(n){console.log(n)}}}function geoLocation(e){e&&e.country_code&&(userCountry=e.country_code,window.userCountry=userCountry,setCookie(uIdentifierCountry,userCountry),("PT"==e.country_code||"PUBLICO"==e.country_code)&&setCookie("cookiewasinpt",1,30))}function Campain(e){if(e&&e.Campain_id&&"(null)"!=e.Campain_id)trackEvent("CAMPANHA","GET",e.Campain_id),jQuery.ajax({url:"https://static.publico.pt/mkt/campanhas/"+e.Campain_id+".js?201607201100",traditional:!0,cache:!0,type:"GET",dataType:"json",data:"",success:function(t){if(t&&t.id)if(t.id==e.Campain_id){if("undefined"!=typeof jQuery.cookie){var i;t.end_date?i=new Date(1e3*t.end_date):(i=new Date(2015,0,11),i.setHours(23,59,59)),jQuery.cookie.json=!0,jQuery.removeCookie("cpJson",{path:"/",domain:".publico.pt"}),jQuery.cookie("cpJson",t,{expires:i,path:"/",domain:".publico.pt"})}processCampaign(t)}else trackEvent("CAMPANHA","ERROR","Campain Mismatched")},error:function(e,t,i){trackEvent("CAMPANHA","ERROR",i)}});else{var t=jQuery.cookie("cpJson");if("undefined"!=typeof t&&null!==t)processCampaign(t);else{var i={fancy:"https://comunique.publico.pt/2017/03_marco/assinaturas/20170309_CampanhaSegmentacao_Aniversario/build/fancy-SegMenosProp.html",windowH:420,windowW:750,popups:"popup1040_",data:{html:'$.getScript("https://static.publico.pt/mkt/campanhas/20170320/ticker/SegMenosProp_219_1040.js");',type:"javascript",capping:1,periodicity:"daily",cookieCapping:"cpSegMP",cookieCampain:"cpcSegMP"}};processCampaign(i)}}}function processCampaign(result){if(!window.isAssinante&&("string"==typeof result&&(result=jQuery.parseJSON(result)),anonCampaign=result,"undefined"!=typeof result.data&&result.data&&!window.donotopen)){var endDate=new Date(1e3*result.end_date),capping=result.data.capping,periodicity=result.data.periodicity,cookCapping=result.data.cookieCapping,cookCampain=result.data.cookieCampain;if("undefined"!=typeof window.isLayerLoaded&&window.isLayerLoaded===!0&&(stopCampain=!0),"daily"===periodicity&&!stopCampain){var cappingValue=0;if("undefined"!=typeof jQuery.cookie(cookCapping)&&(cappingValue=jQuery.cookie(cookCapping)),cappingValue++,capping>=cappingValue){var date=new Date;if(date.setHours(23,59,59),jQuery.cookie(cookCapping,cappingValue,{expires:date,path:"/",domain:".publico.pt"}),"javascript"===result.data.type)trackEvent("CAMPANHA","SHOW",result.id),eval(result.data.html);else if("sequential"===result.data.type){if("object"==typeof result.data.sequence){var sequenceCookieName=result.data.sequence.cookieSequenceName,iSequenceValue=getCookie(sequenceCookieName),lastSequence="";for(null!==iSequenceValue&&(lastSequence=iSequenceValue),iCount=0;iCount<result.data.sequence.actions.length;iCount++){var iSequence=String(result.data.sequence.actions[iCount].name);if(iSequence!==lastSequence){setCookie(sequenceCookieName,String(iSequence),30,"/"),eval(result.data.sequence.actions[iCount].action),trackEvent("CAMPANHA","SHOW",result.id+"_"+result.data.sequence.actions[iCount].name);break}}}}else if("targetedReads"===result.data.type){if("undefined"==typeof window.itemsReads)return;if("object"==typeof result.data.target)for(iTarget=0;iTarget<result.data.target.reads.length;iTarget++)if(window.itemsReads==result.data.target.reads[iTarget]){if("string"==typeof result.data.target.actions)trackEvent("CAMPANHA","SHOW",result.id),eval(result.data.target.actions);else{var targetCookieName=result.data.target.cookieTargetName,lastSequence="";for("undefined"!=typeof jQuery.cookie(sequenceCookieName)&&(lastSequence=jQuery.cookie(sequenceCookieName)),iCount=0;iCount<result.data.target.actions.length;iCount++){var iSequence=String(result.data.target.actions[iCount].name);if(iSequence!==lastSequence){jQuery.cookie(sequenceCookieName,String(iSequence),{expires:endDate,path:"/",domain:".publico.pt"}),eval(result.data.target.actions[iCount].action),trackEvent("CAMPANHA","SHOW",result.id+"_"+result.data.target.actions[iCount].name);break}}}break}}}}}}function retry(e,t){var i=0,n=50,a=!1,o=window.setInterval(function(){e()&&(window.clearInterval(o),t(a)),i++>n&&(window.clearInterval(o),a=!0,t(a))},10)}function isIE10OrLater(e){var t=e.toLowerCase();if(0===t.indexOf("msie")&&0===t.indexOf("trident"))return!1;var i=/(?:msie|rv:|Edge)[\s|\/]?([\d\.]+)/.exec(t);return i&&parseInt(i[1],10)>=10?!0:!1}function detectPrivateMode(e){var t;if(window.webkitRequestFileSystem)window.webkitRequestFileSystem(window.TEMPORARY,1,function(){t=!1},function(e){console.log(e),t=!0});else if(window.indexedDB&&/Firefox/.test(window.navigator.userAgent)){var i;try{i=window.indexedDB.open("test")}catch(n){t=!0}"undefined"==typeof t&&retry(function(){return"done"===i.readyState?!0:!1},function(e){e||(t=i.result?!1:!0)})}else if(isIE10OrLater(window.navigator.userAgent)){t=!1;try{window.indexedDB||(t=!0)}catch(n){t=!0}}else if(window.localStorage&&/Safari/.test(window.navigator.userAgent)){try{window.localStorage.setItem("test",1)}catch(n){t=!0}"undefined"==typeof t&&(t=!1,window.localStorage.removeItem("test"))}retry(function(){return"undefined"!=typeof t?!0:!1},function(i){e(t)})}"undefined"==typeof _paq&&(_paq=[]);var siteUrl="https://www.publico.pt",uIdentifierName="publicoUid",uIdentifierCountry="publicoCountry",instance=null,anonCampaign=null,stopCampain=!1,registerUserId=null,styleElement=document.createElement("style");styleElement.setAttribute("type","text/css");try{styleElement.innerHTML=".primary{visibility: visible !important;}.entry-body{visibility: visible !important;}.entry-content{visibility: visible !important;}.descriptionArticle{visibility: visible !important;}"}catch(e){try{if(window.attachEvent&&!window.opera)styleElement.styleSheet.cssText=".primary{visibility: visible !important;}.entry-body{visibility: visible !important;}.entry-content{visibility: visible !important;}.descriptionArticle{visibility: visible !important;}";else{var styleText=document.createTextNode(".primary{visibility: visible !important;}.entry-body{visibility: visible !important;}.entry-content{visibility: visible !important;}.descriptionArticle{visibility: visible !important;}");styleElement.appendChild(styleText)}}catch(e){}}document.getElementsByTagName("head")[0].appendChild(styleElement),window.isAssinante=document.cookie.indexOf("JORNAL_PUBLICO_ASSINANTE")>-1,window.isRegister=!1,window.stopExecutions=!1,window.ipPortugues=1,window.maxItemAllowed=0,window.pwSize=30,window.isOrganicSearchReferrer=!1,window.isFacebookReferrer=!1,jQuery.ajax({url:"https://s.publico.pt/ip.php",traditional:!0,type:"GET",dataType:"jsonp",jsonpCallback:"geoLocation",timeout:2e3,data:"",success:function(e){},error:function(e,t,i){}});var uid=getCookie(uIdentifierName),registerCookie=getCookie("PUBLICO_JS");if(null!==registerCookie){var piecesOfString=registerCookie.split("|");window.isRegister=!0,piecesOfString.length>3&&(registerUserId=piecesOfString[3],"00000000-0000-0000-0000-000000000000"===registerUserId&&(registerUserId=null)),piecesOfString.length>4&&(window.maxItemAllowed=parseInt(piecesOfString[4]))}if("undefined"==typeof uid||null===uid||""===uid||uid.length<5)try{window.localStorage&&(uid=localStorage.getItem(uIdentifierName))}catch(e){try{window.sessionStorage&&(uid=sessionStorage.getItem(uIdentifierName))}catch(e){}}window.isValidReferrer=checkReferrer();var AppConfig=function(e,t,i,n,a){this.countForPaywall=e,this.alwaysOpenInPaywall=t,this.dataId=i,this.campaignName="wall",0==window.maxItemAllowed&&(window.maxItemAllowed=n),a>0&&(window.pwSize=a),this.GetUserPaywallValues=function(e,t){null===registerUserId||""===registerUserId||32!==registerUserId.length&&36!==registerUserId.length&&38!==registerUserId.length||(e=registerUserId,uid=e),this.countForPaywall&&!window.isAssinante?(_paq.push(["setCustomVariable","5","Count",1]),_paq.push(["setCustomVariable","1","Reads",99]),_paq.push(["setCustomVariable","2","Hits",99]),_paq.push(["setCustomVariable","3","Limit",99]),jQuery.ajax({url:"https://p.publico.pt/"+e+"/"+t+"/"+window.pwSize+"/"+window.maxItemAllowed,traditional:!0,type:"GET",dataType:"jsonp",jsonpCallback:"pwCallback",timeout:5e3,data:"",success:function(e){},error:function(e,t,i){window.pwErrors="Error: "+i,pwCallback([15,1,1])}})):_paq.push(["setCustomVariable","5","Count",0])},this.processPaywallData=function(e){window.itemsReads=e[0],window.hitsOnWall=e[1],window.isNewItem=e[2],_paq.push(["setCustomVariable","1","Reads",e[0]]),_paq.push(["setCustomVariable","2","Hits",e[1]]),_paq.push(["setCustomVariable","3","Limit",window.maxItemAllowed]),window.hitsOnWall>0?window.isNewItem?window.isFacebookReferrer?(_paq.push(["setCustomVariable","4","Locked",0]),this.finish(!1)):(_paq.push(["setCustomVariable","4","Locked",1]),this.finish(!0)):(_paq.push(["setCustomVariable","4","Locked",0]),_paq.push(["setCustomVariable","6","Nova",0]),this.finish(!1)):(_paq.push(["setCustomVariable","4","Locked",0]),this.finish(!1))},this.finish=function(e){if(e&&!this.alwaysOpenInPaywall){window.stopExecutions=!0;var t=document.createElement("style");t.setAttribute("type","text/css");try{t.innerHTML=".entry-body{display: none !important;}.entry-content{display: none !important;}.descriptionArticle{display: none !important;}#articleBody{display: none !important;}"}catch(i){try{if(window.attachEvent&&!window.opera)t.styleSheet.cssText=".entry-body{display: none !important;}.entry-content{display: none !important;}.descriptionArticle{display: none !important;}#articleBody{display: none !important;}";else{var n=document.createTextNode(".entry-body{display: none !important;}.entry-content{display: none !important;}.descriptionArticle{display: none !important;}#articleBody{display: none !important;}");t.appendChild(n)}}catch(i){}}document.getElementsByTagName("head")[0].appendChild(t),stopCampain=!0,window.isOrganicSearchReferrer?this.OrganicLock():this.fancyLock()}else this.ShowCampainIfExists()},this.fancyLock=function(){jQuery(function(){var e="",t="",i=750,n=480,a=new Date;if(null==anonCampaign){var o=jQuery.cookie("cpJson");"undefined"!=typeof o&&("string"==typeof o&&(o=jQuery.parseJSON(o)),anonCampaign=o,anonCampaign.end_date&&(a=new Date(1e3*anonCampaign.end_date)))}var r=!1;if(null!==window.userCountry&&("GB"===window.userCountry||"AO"===window.userCountry)&&window.maxItemAllowed<20&&null===anonCampaign&&(t="https://www.publico.pt/content/fancys/",n=580,i=790,r=!0),!r){var s=!1;if(null!=anonCampaign&&"undefined"!=typeof anonCampaign.fancy&&a>=new Date&&("string"==typeof anonCampaign.fancy?(e="&Campanha="+anonCampaign.fancy,s=!0):(t=anonCampaign.fancy.url,n=anonCampaign.fancy.h,i=anonCampaign.fancy.w,r=!0)),window.isRegister)if(s){var l=getCookie("showedCampainCookie");null!==l&&""!==l?(r=!1,e="&Campanha=PublicoPaywallRegistados"):setCookie("showedCampainCookie","1",30)}else r=!1,e="&Campanha=PublicoPaywallRegistados";"PT"!=window.userCountry&&"PUBLICO"!==window.userCountry&&window.isOrganicSearchReferrer&&(this.anonCampaign="ESTRANGEIROS_ORGANICO"),r||(e+="&country="+window.userCountry,t=siteUrl+"/session/getcampain/"+myConfig.campaignName+"?hits="+window.hitsOnWall+"&n="+window.itemsReads+e,""!==e&&(i=750,n=480))}if("undefined"!=typeof articlePageNumber&&_paq.push(["setCustomVariable","7","Pagina",articlePageNumber]),jQuery(".entry-content").html(""),jQuery(".entry-options-below").html(""),jQuery("#comments").hide(""),jQuery(".entry-body").html(""),jQuery(".comment-respond").html(""),jQuery(".descriptionArticle").html(""),fbClose=jQuery.fancybox.close,jQuery.fancybox.close=function(){},0==jQuery("#masthead").length)var u=jQuery("#new_header").height();else var p=jQuery("#new_header").height(),u=jQuery("#masthead").height()+p;if("undefined"==typeof hits&&(hits=1),jQuery("#page-wrapper").length>0)var d="#page-wrapper";else var d="body";jQuery.fancybox.open({width:i,height:n,maxWidth:"100%",maxHeight:"100%",padding:0,margin:[u,0,0,0],modal:!0,iframe:{scrolling:window.mobilecheck()?"auto":"no",preload:!1},type:"iframe",href:t,topRatio:.5,beforeLoad:function(){jQuery(document).scrollTop(0),jQuery("#masthead, #network").css({position:"relative",zIndex:"109000"}),jQuery("body").addClass("paywalled fancybox-lock")},scrolling:"no",helpers:{overlay:{showEarly:!0,css:{"background-image":"url(https://static.publico.pt/files/homepage/img/paywall_overlay.png)"},locked:!0}},openEffect:"none",parent:d})})},this.OrganicLock=function(){jQuery(function(){jQuery(".entry-assets").length>0&&jQuery(".entry-assets").remove(),jQuery(".entry-options-below").length>0&&jQuery(".entry-options-below").remove(),jQuery(".more-entries").length>0&&jQuery(".more-entries").remove(),jQuery("#comments").length>0&&jQuery("#comments").remove(),jQuery("#respond-box").length>0&&jQuery("#respond-box").remove(),jQuery(".comment-list").length>0&&jQuery(".comment-list").remove(),jQuery(".comments-list").length>0&&jQuery(".comments-list").remove(),$(".comentario-form").length>0&&jQuery(".comentario-form").remove(),jQuery(".pagination").length>0&&jQuery(".pagination").remove(),jQuery(".twingly").remove(),jQuery(".nav-entries").remove(),$(".grid_2.alpha").length>0&&$(".wrap > .grid_2.alpha").remove(),jQuery(".grid_6").length>0&&(jQuery(".grid_6").removeClass("push_2"),jQuery(".grid_6").addClass("grid_8"),jQuery(".grid_6").addClass("alpha"));var e=null,t="";jQuery(".entry-body").length>0?e=jQuery(".entry-body"):jQuery(".entry-content").length>0&&(e=jQuery(".entry-content")),null!=e&&(t=e.find("p").eq(0).html(),t.length<10&&(t+=e.find("p").eq(1).html()),t.length>520&&(t=t.substring(0,519)+"...")),e.html("");var i=document.createElement("style");i.setAttribute("type","text/css");try{i.innerHTML=".entry-body{display: block !important;}.entry-content{display: block !important;}.descriptionArticle{display: block !important;}#articleBody{display: block !important;}"}catch(n){try{if(window.attachEvent&&!window.opera)i.styleSheet.cssText=".entry-body{display: block !important;}.entry-content{display: block !important;}.descriptionArticle{display: block !important;}#articleBody{display: block !important;}";else{var a=document.createTextNode(".entry-body{display: block !important;}.entry-content{display: block !important;}.descriptionArticle{display: block !important;}#articleBody{display: block !important;}");i.appendChild(a)}}catch(n){}}document.getElementsByTagName("head")[0].appendChild(i),e.append("<p>"+t+"</p>"),"PT"===window.userCountry?(e.append($("#paywall-blocker").show()),trackEvent("PAYWALL","PORTUGAL","ORGANIC_VIEW")):(e.append($("#paywall-blocker-foreign").show()),trackEvent("PAYWALL","ESTRANGEIRO","ORGANIC_VIEW"))})},this.ShowCampainIfExists=function(){jQuery(function(){if(null==anonCampaign){var e=jQuery.cookie("cpJson");"undefined"!=typeof e&&("string"==typeof e&&(e=jQuery.parseJSON(e)),anonCampaign=e)}var t="popup";if(null!=anonCampaign&&"undefined"!=typeof anonCampaign.popups?t=anonCampaign.popups:window.isRegister&&(t="popupRegistados"),window.maxItemAllowed>15&&(window.itemsReads=window.itemsReads-5),12==window.itemsReads||14==window.itemsReads)try{if("undefined"==typeof window.userCountry||""==window.userCountry||"PT"==window.userCountry){var i=t+window.itemsReads+"Notice.js";jQuery.getScript("https://static.publico.pt/mkt/campanhas/popups/"+i)}else{var i="popup"+window.itemsReads+"NoticeE.js";jQuery.getScript("https://static.publico.pt/mkt/campanhas/popups/"+i)}}catch(n){}})},null===uid||""===uid||uid.length<5?jQuery.ajax({url:"https://s.publicoid.com/id.php",traditional:!0,type:"GET",dataType:"jsonp",jsonpCallback:"pubID",timeout:2e3,data:"",success:function(e){},error:function(e,t,i){_paq.push(["setCustomVariable","8","Error","UID url: "+i])}}):(instance=this,this.GetUserPaywallValues(uid,this.dataId),window.isRegister||saveData(uid,window.userCountry)),ga("send","pageview")};jQuery(function(){"undefined"!=typeof xdomain&&xdomain.slaves({"https://tracker.publico.pt":"/Publico.Recomendacao/proxy.html","https://static.publico.pt":"/proxy.html?20141217"});var e=uid;window.isRegister&&(e=getCookie(uIdentifierName)),"undefined"!=typeof e&&null!=e&&""!==e&&jQuery.ajax({url:"https://mkt.publico.pt/get/"+e+"/",traditional:!0,cache:!0,type:"GET",dataType:"jsonp",jsonp:!1,jsonpCallback:"Campain",data:"",success:function(e){},error:function(e,t,i){}})}),detectPrivateMode(function(e){e&&jQuery(function(){trackEvent("INCOGNITO",document.location.href,getCookie("publicoUid"))})});