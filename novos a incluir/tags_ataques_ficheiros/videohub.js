(function(){"use strict";var e=window,t="1.36",o={srcHost:window.location.protocol+"//js.sapo.pt",srcPath:"/Projects/VHS/"+t+"/videoHub.html",videosPath:window.location.protocol+"//videos.sapo.pt"},a={crop:"center",tv:2,W:64,H:36},r={origin:window.location.protocol+"//rd3.videos.sapo.pt",address:"/playhtml",defaultFileHost:window.location.protocol+"//rd.videos.sapo.pt/%%RANDNAME%%/mov/%%QUALITY%%",configs:{file:"%%FILEHOST%%",autoStart:true,hideinfo:true,relatedVideos:"none",zoneid:"",hashzoneid:"",parentDomain:"%%PARENTDOMAIN%%",siteId:"%%SITEID%%",pageId:"%%PAGEID%%",formatId:"%%FORMATID%%"}},i={related:window.location.protocol+"//services.sapo.pt/Videos/JSON2/Query/?limit=10&thumbsize=560x420&related=%%RANDNAME%%",popular:window.location.protocol+"//services.sapo.pt/Videos/JSON2/Query/?popular=%%DOMAIN%%&limit=10&thumbsize=560x420",user:window.location.protocol+"//services.sapo.pt/Videos/JSON2/User/%%USER%%?limit=6&thumbsize=560x420"},s=10,d=5;!e.SAPO&&(e.SAPO={});!e.SAPO.VHS_CONF&&(e.SAPO.VHS_CONF={paths:o,player:r,endpoints:i,thumbs:a,fadeTimer:s,partyTimer:d,version:t})})();(function(){"use strict";var e=window,t=document,o=false,a=SAPO.VHS_CONF.paths.srcHost,r=SAPO.VHS_CONF.paths.srcPath,i=SAPO.VHS_CONF.version,s="body {overflow:hidden;}",d="#video-hub-sapo {position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.75);z-index:2000000001;display:none;}"+"#video-hub-sapo .iframe-ctn {position:absolute;top:60px;bottom:4%;left:4%;width:92%;background:#000;z-index:1;box-shadow:0 0 0 1px #444;}"+"#video-hub-sapo .iframe-ctn iframe {width:100%;height:100%;background:none;}"+"#video-hub-sapo-close {position:absolute;top:10px;right:4%;width:40px;height:40px;z-index:2;}"+"#video-hub-sapo-close:before,"+"#video-hub-sapo-close:after {position:absolute;top:50%;left:0;width:100%;height:2px;margin-top:-1px;background:#DDD;content:'';}"+"#video-hub-sapo-close:before {transform:rotate(45deg);-ms-transform:rotate(45deg);-webkit-transform:rotate(45deg);-o-transform:rotate(45deg);-moz-transform:rotate(45deg);}"+"#video-hub-sapo-close:after {transform:rotate(-45deg);-ms-transform:rotate(-45deg);-webkit-transform:rotate(-45deg);-o-transform:rotate(-45deg);-moz-transform:rotate(-45deg);}"+"#video-hub-sapo-close:hover {cursor:pointer;}"+"#video-hub-sapo-close:hover:before,"+"#video-hub-sapo-close:hover:after {background-color:#FFF;}"+"#video-hub-sapo.video-hub-sapo--show {display:block;}"+"#video-hub-sapo.video-hub-sapo--loading #video-hub-sapo-loader {position:absolute;top:50%;left:50%;width:86px;height:86px;margin:-43px 0 0 -43px;z-index:2;border-radius:100%;}"+"#video-hub-sapo.video-hub-sapo--loading #video-hub-sapo-loader:before,"+"#video-hub-sapo.video-hub-sapo--loading #video-hub-sapo-loader:after {position:absolute;border:3px solid rgba(255,255,255,0.5);border-bottom-color:transparent;border-top-color:transparent;border-radius:100%;animation-fill-mode:both;content:'';}"+"#video-hub-sapo.video-hub-sapo--loading #video-hub-sapo-loader:before {top:0;left:0;width:80px;height:80px;animation:loaderrotatelarge 1s 0s ease-in-out infinite;}"+"#video-hub-sapo.video-hub-sapo--loading #video-hub-sapo-loader:after {top:20px;left:20px;width:40px;height:40px;border-color:rgba(255,255,255,0.5) transparent rgba(255,255,255,0.5) transparent;animation:loaderrotatesmall 0.5s 0s ease-in-out infinite;}"+"@-webkit-keyframes loaderrotatesmall {100% {transform:rotate(360deg);}}"+"@-moz-keyframes loaderrotatesmall {100% {transform:rotate(360deg);}}"+"@keyframes loaderrotatesmall {100% {transform:rotate(360deg);}}"+"@-webkit-keyframes loaderrotatelarge {100% {transform:rotate(360deg);}}"+"@-moz-keyframes loaderrotatelarge {100% {transform:rotate(360deg);}}"+"@keyframes loaderrotatelarge {100% {transform:rotate(360deg);}}"+"@media screen and (max-width: 640px) {#video-hub-sapo .iframe-ctn {top:0;left:0;bottom:0;width:100%;padding-top:60px;}}";!e.SAPO&&(e.SAPO={});!e.SAPO.VHS&&(e.SAPO.VHS=function(){if(!("remove"in Element.prototype)){Element.prototype.remove=function(){if(this.parentNode){this.parentNode.removeChild(this)}}}if(!("matches"in Element.prototype)){Element.prototype.matches=Element.prototype.msMatchesSelector}if(!("closest"in Element.prototype)){Element.prototype.closest=function(e){var t=this;while(t){if(t.matches(e)){return t}t=t.parentElement}}}function n(e){return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}function l(){o&&e.console&&console.log&&console.log.apply&&console.log.apply(console,arguments)}function p(){o=!o}function h(e,o){var a=o?o:t;return a.querySelector(e)}function c(e,o){var a=o?o:t;return a.querySelectorAll(e)}function u(t,o,a,r){t.addEventListener?t.addEventListener(o,a,!!r):t.attachEvent&&t.attachEvent("on"+o,function(t){a(t||e.event)});l("added listener for event "+o)}function b(e,t,o){var a;while(a=o.shift())e(t,a)}function v(e,t){if(!t)return;return e.classList?e.classList.contains(t):new RegExp("(^|\\s)"+t+"(\\s|$)").test(e.className)}function f(e,t){if(!t)return;t instanceof Array?b(f,e,t):e.classList?e.classList.add(t):!v(e,t)&&(e.className+=(e.className?" ":"")+t)}function m(e,t){if(!t)return;t instanceof Array?b(m,e,t):e.classList?e.classList.remove(t):(e.className=n(e.className.replace(t,"")),!e.className&&e.removeAttribute("class"))}function g(o,i,n,l,p,c,b,v,m,g,A){var y,S;if(o.length==20){y=o;l=l?l:1}else{y=o}var E=t.createElement("style");E.setAttribute("id","VHS_STYLE");E.insertAdjacentHTML("afterbegin",s);var x=t.createElement("style");x.insertAdjacentHTML("afterbegin",d);if(!h("#video-hub-sapo")){var z=t.createElement("div");z.setAttribute("id","video-hub-sapo");z.setAttribute("class","video-hub-sapo--loading video-hub-sapo--show");var N=t.createElement("div");N.setAttribute("id","video-hub-sapo-close");var O=t.createElement("div");O.setAttribute("id","video-hub-sapo-loader");var C=t.createElement("div");C.setAttribute("class","iframe-ctn");var H=t.createElement("iframe");H.setAttribute("name","vhs-frame");H.setAttribute("webkitallowfullscreen","");H.setAttribute("mozallowfullscreen","");H.setAttribute("allowfullscreen","");H.src=a+r+"?cb="+e.location.protocol+"//"+e.location.host;y&&(H.src+="&randname="+y);p&&(H.src+="&domain="+p);i&&(H.src+="&color="+i);c&&(H.src+="&zoneid="+c);b&&(H.src+="&hashzoneid="+b);l&&(H.src+="&quality="+l);n&&(H.src+="&playlist="+n);v&&(H.src+="&article="+v);m&&(H.src+="&pageId="+m);g&&(H.src+="&siteId="+g);A&&(H.src+="&formatId="+A);H.src+="&parentUrl="+encodeURI(window.location.href);H.setAttribute("frameborder","0");z.appendChild(E);z.appendChild(x);z.appendChild(N);z.appendChild(O);z.appendChild(C);C.appendChild(H);h("body").appendChild(z);u(h("#video-hub-sapo-close"),"touchstart",w,true);u(h("#video-hub-sapo"),"touchstart",w,true);history.pushState({},"vhs","")}else{I({type:"swapColors",color:i?i:null});I({type:"reloadVideo",randname:y?y:"",domain:p?p:e.location.host,zoneid:c?c:"",hashzoneid:b?b:"",quality:l?l:1,article:v?v:"",pageId:m?m:"",siteId:g?g:"",formatId:A?A:"",playlist:n?n:"",parentUrl:encodeURI(window.location.href)});h("#video-hub-sapo").appendChild(E);f(h("#video-hub-sapo"),"video-hub-sapo--show");history.pushState({},"vhs","")}}function A(o,i){if(!o||i&&typeof i!=="object"){return false}var n=i.color,l=i.playlist,p=i.quality,c=i.domain,b=i.zoneid,v=i.hashzoneid,m=i.article,g=i.articleLabel,A=i.pageId,y=i.siteId,S=i.formatId;var E;if(o.length==20){E=o;p=p?p:1}else{E=o}var x=t.createElement("style");x.setAttribute("id","VHS_STYLE");x.insertAdjacentHTML("afterbegin",s);var z=t.createElement("style");z.insertAdjacentHTML("afterbegin",d);if(!h("#video-hub-sapo")){var N=t.createElement("div");N.setAttribute("id","video-hub-sapo");N.setAttribute("class","video-hub-sapo--loading video-hub-sapo--show");var O=t.createElement("div");O.setAttribute("id","video-hub-sapo-close");var C=t.createElement("div");C.setAttribute("id","video-hub-sapo-loader");var H=t.createElement("div");H.setAttribute("class","iframe-ctn");var L=t.createElement("iframe");L.setAttribute("name","vhs-frame");L.setAttribute("webkitallowfullscreen","");L.setAttribute("mozallowfullscreen","");L.setAttribute("allowfullscreen","");L.src=a+r+"?cb="+e.location.protocol+"//"+e.location.host;E&&(L.src+="&randname="+E);c&&(L.src+="&domain="+c);n&&(L.src+="&color="+n);b&&(L.src+="&zoneid="+b);v&&(L.src+="&hashzoneid="+v);p&&(L.src+="&quality="+p);l&&(L.src+="&playlist="+l);m&&(L.src+="&article="+m);g&&(L.src+="&articleLabel="+g);A&&(L.src+="&pageId="+A);y&&(L.src+="&siteId="+y);S&&(L.src+="&formatId="+S);L.src+="&parentUrl="+encodeURI(window.location.href);L.setAttribute("frameborder","0");N.appendChild(x);N.appendChild(z);N.appendChild(O);N.appendChild(C);N.appendChild(H);H.appendChild(L);h("body").appendChild(N);u(h("#video-hub-sapo-close"),"touchstart",w,true);u(h("#video-hub-sapo"),"touchstart",w,true);history.pushState({},"vhs","")}else{I({type:"swapColors",color:n?n:null});I({type:"reloadVideo",randname:E?E:"",domain:c?c:e.location.host,zoneid:b?b:"",hashzoneid:v?v:"",quality:p?p:1,article:m?m:"",articleLabel:g?g:"",pageId:A?A:"",siteId:y?y:"",formatId:S?S:"",playlist:l?l:"",parentUrl:encodeURI(window.location.href)});h("#video-hub-sapo").appendChild(x);f(h("#video-hub-sapo"),"video-hub-sapo--show");history.pushState({},"vhs","")}}function y(e){var t=e.target;if(e.target.id=="video-hub-sapo-close"||e.target.id=="video-hub-sapo"){e.preventDefault();S(true);return}while(t.tagName!="HTML"&&!t.hasAttribute("data-vhs")){t=t.parentElement}if(t.hasAttribute("data-vhs")){e.preventDefault();var o=t.closest("[data-vhs-group]");if(o){var a="",r,i,s=c("[data-vhs]",o);for(var d=0;d<s.length;d++){r=s[d].getAttribute("data-vhs");if(r.length!==20){i=r.split("/");i.length===6&&(r=i[3]);i.length===5&&(r=i[3]);i.length===4&&(r=i[1]);i.length===3&&(r=i[1])}a+=(d>0?"|":"")+r}var n=o.getAttribute("data-vhs-domain"),l=o.getAttribute("data-vhs-zoneid"),p=o.getAttribute("data-vhs-hashzoneid"),h=o.getAttribute("data-vhs-playlist")||a,u=o.getAttribute("data-vhs-color"),b=o.getAttribute("data-vhs-article"),v=o.getAttribute("data-vhs-article-label"),f=o.getAttribute("data-vhs-pageId"),m=o.getAttribute("data-vhs-siteId"),g=o.getAttribute("data-vhs-formatId")}var y=t.getAttribute("data-vhs"),w="",E,I=t.getAttribute("data-vhs-domain")||n,x=t.getAttribute("data-vhs-zoneid")||l,z=t.getAttribute("data-vhs-hashzoneid")||p,N=t.getAttribute("data-vhs-playlist")||h,O=t.getAttribute("data-vhs-color")||u,C=t.getAttribute("data-vhs-article")||b,H=t.getAttribute("data-vhs-article-label")||v,L=t.getAttribute("data-vhs-pageId")||f,k=t.getAttribute("data-vhs-siteId")||m,P=t.getAttribute("data-vhs-formatId")||g;if(y.length===20){w=t.getAttribute("data-vhs-quality")?t.getAttribute("data-vhs-quality"):1}else{E=y.split("/");E.length===6&&(w=E[5]);E.length===5&&(w=1);E.length===4&&(w=E[3]);E.length===3&&(w=1)}var V={color:O,playlist:N,quality:w,domain:I,zoneid:x,hashzoneid:z,article:C,articleLabel:H,pageId:L,siteId:k,formatId:P};A(y,V)}}function w(e){e.preventDefault();e.stopPropagation();S(true)}function S(e){m(h("#video-hub-sapo"),"video-hub-sapo--show");m(h("#video-hub-sapo"),"video-hub-sapo--loading");h("#VHS_STYLE").remove();e&&I({type:"closeHub"})}function E(e){if(e.keyCode===27&&h("#video-hub-sapo")){S(true)}}function I(e){h("#video-hub-sapo iframe").contentWindow.postMessage(JSON.stringify(e),a)}function x(e){if(e.origin==a){var t=e.data;if(typeof t=="string"){t=JSON.parse(t)}l("got message: "+JSON.stringify(t));if(e.origin!==a){return}if(t.type==="closeHub"){S(false)}if(t.type==="closeLoader"){m(h("#video-hub-sapo"),"video-hub-sapo--loading")}if(t.type==="getArticle"){var o=t.randname;c("[data-vhs]").forEach(function(e){if(e.getAttribute("data-vhs").indexOf(o)>=0){var t=e.getAttribute("data-vhs-article")?e.getAttribute("data-vhs-article"):e.closest("[data-vhs-group]").getAttribute("data-vhs-article");var a=e.getAttribute("data-vhs-article-label")?e.getAttribute("data-vhs-article-label"):e.closest("[data-vhs-group]").getAttribute("data-vhs-article-label");I({type:"setArticle",article:t,articleLabel:a})}})}}}u(e,"popstate",function(e){h("#video-hub-sapo")&&S(true)});u(e,"click",y);u(e,"keydown",E);u(e,"message",x);return{debug:p,play:g,version:i}}())})();
