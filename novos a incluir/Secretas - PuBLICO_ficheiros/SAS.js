
if(typeof SAPO==='undefined'){window.SAPO={};}else{window.SAPO=window.SAPO;}
SAPO.namespace=function(ns){if(!ns||!ns.length){return null;}
var levels=ns.split(".");var nsobj=SAPO;for(var i=(levels[0]==="SAPO")?1:0;i<levels.length;++i){nsobj[levels[i]]=nsobj[levels[i]]||{};nsobj=nsobj[levels[i]];}
return nsobj;};SAPO.verify=function(ns,minVersion){if(!ns){return;}
var levels=ns.split(".");var nsobj=SAPO;for(var k=levels[0]==='SAPO'?1:0,m=levels.length;k<m;k++){nsobj=nsobj[levels[k]];if(!nsobj){throw new Error('SAPO.verify: '+ns+' not found');}}
if(!minVersion){return;}
if(typeof nsobj==='function'){nsobj=nsobj.prototype;}
var lhs=String(nsobj.version).match(/\d+/g)||[0];var rhs=String(minVersion).match(/\d+/g)||[0];for(k=0,m=Math.min(lhs.length,rhs.length);k<m;k++){if(lhs[k]<rhs[k]){throw new Error('SAPO.verify: '+ns+' has low version ('+nsobj.version+' < '+minVersion+')');}}
if(lhs.length<rhs.length){throw new Error('SAPO.verify: '+ns+' has low version ('+nsobj.version+' < '+minVersion+')');}};SAPO.Class=function(name,baseClass,properties){var derivedFunction=function(){if(this.__dont_init){return;}
if(this===window||!this){throw new Error('Call "new '+name+'(...);"');}
if(derivedFunction['abstract']){throw new Error("Abstract class: don't instantiate");}
if(baseClass){var abstractBackup=baseClass['abstract'];if(abstractBackup){baseClass['abstract']=false;}
baseClass.apply(this,arguments);if(abstractBackup){baseClass['abstract']=abstractBackup;}}
if(properties&&typeof properties.init==='function'){properties.init.apply(this,arguments);}};derivedFunction.name=derivedFunction.displayName=name;derivedFunction['abstract']=properties['abstract'];if(baseClass){baseClass.prototype.__dont_init=1;derivedFunction.prototype=new baseClass();delete baseClass.prototype.__dont_init;}
derivedFunction.prototype.toString=function(){return'[object '+name+']';};if(properties){SAPO.extendObj(derivedFunction.prototype,properties);}
return derivedFunction;};SAPO.safeCall=function(object,listener){function rethrow(exception){setTimeout(function(){if(exception.message){exception.message+='\n'+(exception.stacktrace||exception.stack||'');}
throw exception;},1);}
if(object===null){object=window;}
if(typeof listener==='string'&&typeof object[listener]==='function'){try{return object[listener].apply(object,[].slice.call(arguments,2));}catch(ex){rethrow(ex);}}else if(typeof listener==='function'){try{return listener.apply(object,[].slice.call(arguments,2));}catch(ex){rethrow(ex);}}else if(typeof object==='function'){try{return object.apply(window,[].slice.call(arguments,1));}catch(ex){rethrow(ex);}}};window.s$=function(element){if(arguments.length>1){for(var i=0,elements=[],length=arguments.length;i<length;i++){elements.push(s$(arguments[i]));}
return elements;}
if(typeof element==='string'){element=document.getElementById(element);}
return element;};Function.prototype.bindObj=function(){if(arguments.length<2&&arguments[0]===undefined){return this;}
var __method=this;var args=[];for(var i=0,total=arguments.length;i<total;i++){args.push(arguments[i]);}
var object=args.shift();var fn=function(){return __method.apply(object,args.concat(function(tmpArgs){var args2=[];for(var j=0,total=tmpArgs.length;j<total;j++){args2.push(tmpArgs[j]);}
return args2;}(arguments)));};fn.toString=function(){return String(__method);};fn.name=fn.displayName=__method.name;return fn;};Function.prototype.bindObjEvent=function(){var __method=this;var args=[];for(var i=0;i<arguments.length;i++){args.push(arguments[i]);}
var object=args.shift();return function(event){return __method.apply(object,[event||window.event].concat(args));};};Object.extend=function(destination,source){for(var property in source){destination[property]=source[property];}
return destination;};SAPO.extendObj=function(destination,source){if(source){for(var property in source){if(source.hasOwnProperty(property)){destination[property]=source[property];}}}
return destination;};if(typeof SAPO.Browser==='undefined'){SAPO.Browser={IE:false,GECKO:false,OPERA:false,SAFARI:false,KONQUEROR:false,CHROME:false,model:false,version:false,userAgent:false,init:function()
{this.detectBrowser();this.setDimensions();this.setReferrer();},setDimensions:function()
{var myWidth=0,myHeight=0;if(typeof window.innerWidth==='number'){myWidth=window.innerWidth;myHeight=window.innerHeight;}else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){myWidth=document.documentElement.clientWidth;myHeight=document.documentElement.clientHeight;}else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){myWidth=document.body.clientWidth;myHeight=document.body.clientHeight;}
this.windowWidth=myWidth;this.windowHeight=myHeight;},setReferrer:function()
{this.referrer=document.referrer!==undefined?document.referrer.length>0?window.escape(document.referrer):false:false;},detectBrowser:function()
{var sAgent=navigator.userAgent;this.userAgent=sAgent;sAgent=sAgent.toLowerCase();if((new RegExp("applewebkit\/")).test(sAgent)){if((new RegExp("chrome\/")).test(sAgent)){this.CHROME=true;this.model='chrome';this.version=sAgent.replace(new RegExp("(.*)chrome\/([^\\s]+)(.*)"),"$2");this.cssPrefix='-webkit-';this.domPrefix='Webkit';}else{this.SAFARI=true;this.model='safari';this.version=sAgent.replace(new RegExp("(.*)applewebkit\/([^\\s]+)(.*)"),"$2");this.cssPrefix='-webkit-';this.domPrefix='Webkit';}}else if((new RegExp("opera")).test(sAgent)){this.OPERA=true;this.model='opera';this.version=sAgent.replace(new RegExp("(.*)opera.([^\\s$]+)(.*)"),"$2");this.cssPrefix='-o-';this.domPrefix='O';}else if((new RegExp("konqueror")).test(sAgent)){this.KONQUEROR=true;this.model='konqueror';this.version=sAgent.replace(new RegExp("(.*)konqueror\/([^;]+);(.*)"),"$2");this.cssPrefix='-khtml-';this.domPrefix='Khtml';}else if((new RegExp("msie\\ ")).test(sAgent)){this.IE=true;this.model='ie';this.version=sAgent.replace(new RegExp("(.*)\\smsie\\s([^;]+);(.*)"),"$2");this.cssPrefix='-ms-';this.domPrefix='ms';}else if((new RegExp("gecko")).test(sAgent)){this.GECKO=true;var re=new RegExp("(camino|chimera|epiphany|minefield|firefox|firebird|phoenix|galeon|iceweasel|k\\-meleon|seamonkey|netscape|songbird|sylera)");if(re.test(sAgent)){this.model=sAgent.match(re)[1];this.version=sAgent.replace(new RegExp("(.*)"+this.model+"\/([^;\\s$]+)(.*)"),"$2");this.cssPrefix='-moz-';this.domPrefix='Moz';}else{this.model='mozilla';var reVersion=new RegExp("(.*)rv:([^)]+)(.*)");if(reVersion.test(sAgent)){this.version=sAgent.replace(reVersion,"$2");}
this.cssPrefix='-moz-';this.domPrefix='Moz';}}},debug:function()
{var str="known browsers: (ie, gecko, opera, safari, konqueror) \n";str+=[this.IE,this.GECKO,this.OPERA,this.SAFARI,this.KONQUEROR]+"\n";str+="model -> "+this.model+"\n";str+="version -> "+this.version+"\n";str+="\n";str+="original UA -> "+this.userAgent;alert(str);}};SAPO.Browser.init();}
SAPO.logReferer=function(classURL){var thisOptions=SAPO.extendObj({s:'js.sapo.pt',swakt:'59a97a5f-0924-3720-a62e-0c44d9ea4f16',pg:false,swasection:false,swasubsection:'',dc:'',ref:false,etype:'libsapojs-view',swav:'1',swauv:'1',bcs:'1',bsr:'1',bul:'1',bje:'1',bfl:'1',debug:false},arguments[1]||{});if(typeof classURL!=='undefined'&&classURL!==null){if(!thisOptions.pg){thisOptions.pg=classURL;}
if(!thisOptions.swasection){thisOptions.swasection=classURL;}
if(!thisOptions.ref){thisOptions.ref=location.href;}
var waURI='http://wa.sl.pt/wa.gif?';var waURISSL='https://ssl.sapo.pt/wa.sl.pt/wa.gif?';var aQuery=['pg='+encodeURIComponent(thisOptions.pg),'swasection='+encodeURIComponent(thisOptions.swasection),'swasubsection='+encodeURIComponent(thisOptions.swasubsection),'dc='+encodeURIComponent(thisOptions.dc),'s='+thisOptions.s,'ref='+encodeURIComponent(thisOptions.ref),'swakt='+thisOptions.swakt,'etype='+encodeURIComponent(thisOptions.etype),'swav='+encodeURIComponent(thisOptions.swav),'swauv='+encodeURIComponent(thisOptions.swauv),'bcs='+encodeURIComponent(thisOptions.bcs),'bsr='+encodeURIComponent(thisOptions.bsr),'bul='+encodeURIComponent(thisOptions.bul),'bje='+encodeURIComponent(thisOptions.bje),'bfl='+encodeURIComponent(thisOptions.bfl),''];var waLogURI=((location.protocol==='https:')?waURISSL:waURI);var img=new Image();img.src=waLogURI+aQuery.join('&');}};SAPO._require=function(uri,callBack)
{if(typeof uri!=='string'){return;}
var script=document.createElement('script');script.type='text/javascript';var aHead=document.getElementsByTagName('HEAD');if(aHead.length>0){aHead[0].appendChild(script);}
if(document.addEventListener){script.onload=function(e){if(typeof callBack!=='undefined'){callBack();}};}else{script.onreadystatechange=function(e){if(this.readyState==='loaded'){if(typeof callBack!=='undefined'){callBack();}}};}
script.src=uri;};SAPO.require=function(reqArray,callBack)
{var objectsToCheck=[];var uriToAdd=[];var _isSAPOObject=function(param){if(typeof param==='string'){if(/^SAPO\./.test(param)){return true;}}
return false;};var _isObjectUri=function(param){if(typeof param==='object'&&param.constructor===Object){if(typeof param.uri==='string'){return true;}}
return false;};var _isObjectArray=function(param){if(typeof param==='object'&&param.constructor===Array){return true;}
return false;};var _parseSAPOObject=function(param){var aSAPO=param.split('.');var sapoURI=aSAPO.join('/');return'http://js.sapo.pt/'+sapoURI+'/';};var _parseObjectUri=function(param){return param.uri;};var _objectExists=function(objStr,ver){if(typeof objStr!=='undefined'){var aStrObj=objStr.split('.');var objParent=window;for(var k=0,aStrObjLength=aStrObj.length;k<aStrObjLength;k++){if(typeof objParent[aStrObj[k]]!=='undefined'){objParent=objParent[aStrObj[k]];}else{return false;}}
if(typeof ver!=='undefined'&&ver!==null){if(typeof objParent.version!=='undefined'){if(objParent.version===ver){return true;}else{return false;}}else{return true;}}
return true;}};var requestRecursive=function()
{if(uriToAdd.length>1){SAPO._require(uriToAdd[0],requestRecursive);uriToAdd.splice(0,1);}else if(uriToAdd.length===1){if(typeof callBack!=='undefined'){SAPO._require(uriToAdd[0],callBack);}else{SAPO._require(uriToAdd[0]);}
uriToAdd.splice(0,1);}else if(uriToAdd.length===0){if(typeof callBack!=='undefined'){callBack();}}};if(typeof reqArray!=='undefined'){var cur=false;var curURI=false;if(typeof reqArray==='string'){if(_isSAPOObject(reqArray)){if(!_objectExists(reqArray)){uriToAdd.push(_parseSAPOObject(reqArray));}}else{uriToAdd.push(reqArray);}}else{for(var i=0,reqArrayLength=reqArray.length;i<reqArrayLength;i++){cur=reqArray[i];if(_isSAPOObject(cur)){if(!_objectExists(cur)){objectsToCheck.push(cur);uriToAdd.push(_parseSAPOObject(cur));}}else if(_isObjectArray(cur)){if(cur.length>0){if(_isSAPOObject(cur[0])){if(!_objectExists(cur[0])){if(cur.length===2){uriToAdd.push(_parseSAPOObject(cur[0])+cur[1]+'/');}else{uriToAdd.push(_parseSAPOObject(cur[0]));}}}}}else{if(typeof cur==='string'){uriToAdd.push(cur);}else{if(_isObjectUri(cur)){if(typeof cur.check==='string'){if(typeof cur.version==='string'){if(!_objectExists(cur.check,cur.version)){uriToAdd.push(_parseObjectUri(cur));}}else{if(!_objectExists(cur.check)){uriToAdd.push(_parseObjectUri(cur));}}}else{uriToAdd.push(_parseObjectUri(cur));}}}}}}
if(arguments.length===3){if(typeof arguments[2]==='boolean'){if(arguments[2]===true){for(var l=0,uriToAddLength=uriToAdd.length;l<uriToAddLength;l++){SAPO._require(uriToAdd[l]);}
if(typeof callBack!=='undefined'){callBack();}
return;}}
requestRecursive();}else{requestRecursive();}}};
if(!SAPO.Widget||typeof(SAPO.Widget)=='undefined'){SAPO.namespace('Widget');}
SAPO.Widget.Adwords=function(options)
{if(SAPO.Exception&&typeof(SAPO.Exception)!='undefined'){this.exception=new SAPO.Exception('SAPO::Widget.Adwords');}else{this.exception=false;}
if(options!='undefined'){this.init(options);}else{this.init({});}};SAPO.Widget.Adwords.version='0.1';SAPO.Widget.Adwords.prototype={init:function(options)
{this.options={};},printSAS:function(saw){saw=SAPO.extendObj({debug:0,affiliate_id:0,site_id:0,position_id:0,cluster_id:666,ad_height:90,ad_width:728,ad_format:"728x90_as",ad_type:"text",c:5,q:'',color_border:"336699",color_bg:"FFCC00",color_link:"0000FF",color_text:"000000",color_url:"008000",defer:false,lambda:false,sid:'',medium:0,keywords:''},saw||{});if(saw.lambda&&!(saw.defer)){saw.lambda(saw);}
saw.sid='sas_'+(Math.random()*100000).toFixed(0);document.write('<iframe id="'+saw.sid+'" width="'+saw.ad_width+'" scrolling="no" height="'+saw.ad_height+'" frameborder="'+(saw.debug==0?0:1)+'" allowtransparency="true" hspace="0" vspace="0" marginheight="0" marginwidth="0" src="'+(saw.defer?'':this.getSawURL(saw))+'" name="saw_frame"></iframe>');if(saw.defer){setTimeout(function(){setTimeout(function(){saw.lambda(saw);document.getElementById(saw.sid).src=ads.getSawURL(saw);},0);},0);}},getSawURL:function(saw){var var_checks=['affiliate_id','site_id','position_id','cluster_id','ad_height','ad_width','ad_format','ad_type','c','q','color_border','color_bg','color_link','color_text','color_url','debug','keywords','medium','lambda'];var info=new Array();info.browser=SAPO.Browser.model;info.bversion=SAPO.Browser.version;info.width=SAPO.Browser.windowWidth;info.height=SAPO.Browser.windowHeight;info.referrer=SAPO.Browser.referrer;var rp=sas_getQueryString(info.browser.referrer);info.keywords=rp.q?rp.q:false;for(var i=0;i<var_checks.length;i++){var val=eval('try{if(saw.'+var_checks[i]+'!==undefined){saw.'+var_checks[i]+';}}catch(e){false;}');if(val!==false){info[var_checks[i]]=val;}}
var saw_url_args=new Array();for(var key in info){if(typeof(info[key])==='string'||typeof(info[key])==='number'){saw_url_args.push(key+'='+info[key]);}}
if(location.protocol=='https:'){return'https://adw.sapo.pt/search.html?'+saw_url_args.join('&');}else{return'http://adw.sapo.pt/search.html?'+saw_url_args.join('&');}}};

function sas_currentScriptElement () {
    var aScripts = document.getElementsByTagName('script'); 
    if(aScripts.length > 0) {
        return aScripts[(aScripts.length - 1)];
    } else {
        return false; 
    }
}

function sas_getQueryString(url)
{   if(!url){return {};};
    var aParams = {};
    if(url.match(/\?(.+)/i)) {
        var queryStr = url.replace(/^(.*)\?([^\#]+)(\#(.*))?/g, "$2");
        if(queryStr.length > 0) {
            var aQueryStr = queryStr.split(/[;&]/); 
            for(var i=0; i < aQueryStr.length; i++) {
                var pairVar = aQueryStr[i].split('=');
                aParams[decodeURIComponent(pairVar[0])] = (typeof(pairVar[1]) != 'undefined' && pairVar[1]) ? decodeURIComponent(pairVar[1]) : false;
            }
        }
    }
    return aParams;
}

var options = sas_getQueryString(sas_currentScriptElement().src);
ads=new SAPO.Widget.Adwords;
var sas_checks=['sas_affiliate_id','sas_site_id','sas_position_id','sas_cluster','sas_ad_height','sas_ad_width', 'sas_ad_format','sas_ad_type','sas_c','sas_color_border','sas_color_bg','sas_color_link','sas_color_text','sas_color_url','sas_debug','sas_keywords', 'sas_medium'];
for(var i=0;i<sas_checks.length;i++) {
  var val=eval('try{if('+sas_checks[i]+'!==undefined){'+sas_checks[i]+';}}catch(e){false;}');
  if(val!==false) {
    options[sas_checks[i].substr(4)]=val;
    }
  }
ads.printSAS(options);
