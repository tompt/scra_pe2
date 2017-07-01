
s = new AppMeasurement()
s.linkInternalFilters = 'arstechnica.com,advancemags.com,javascript:';
s.server = "";
s.channel = "";
s.pageType = "";
s.currencyCode = "USD";
s.ActionDepthTest = true
s.socAuthVar = 'eVar72';


if (typeof Visitor != 'undefined') {
    s.visitor = Visitor.getInstance("F7093025512D2B690A490D44@AdobeOrg");
    s.contextData.visCheck = s.visitor.getMarketingCloudVisitorID();
} else {
    s.contextData.visCheck = "MCMID not available";
}


/* Make sure s.events exists */
s.events = s.events ? s.events : '';

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace = "condenast";

/* Link Tracking Config */
s.trackDownloadLinks = true;
s.trackExternalLinks = true;
s.trackInlineStats = true;
s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
s.linkLeaveQueryString = false;
s.linkTrackVars = "evar21,evar39,evar40,prop34,events";
s.linkTrackEvents = "event3,event4,event10,event11,event12,event13,event20,event21,event22,event23,event24,event25,event29,event30,event31,event32,event37,event38";

// time parting plugin configuration - US
s._tpDST = {
    2012: '3/11,11/4',
    2013: '3/10,11/3',
    2014: '3/9,11/2',
    2015: '3/8,11/1',
    2016: '3/13,11/6',
    2017: '3/12,11/5',
    2018: '3/11,11/4',
    2019: '3/10,11/3'
}

//Page load time plugin
s_getLoadTime()

/* Plugin Config */
s.usePlugins = true

function s_doPlugins(s) {

    var user = (typeof CN !== 'undefined' && CN.user) ? CN.user : null;

    function isLoggedIn() {
        var bool = (user) ? user.isLoggedIn() : false;
        return (bool) ? 'logged in' : 'not logged in';
    };

    function userID() {
        return (user) ? user.userid() : '';
    };

    s.eVar16 = s.prop16 = isLoggedIn();
    s.eVar52 = s.prop52 = userID();


    if (s.campaign) {
        s.eVar15 = s.eVar20 = 'D=v0';
    }

    s.events = s.apl(s.events, "event2", ",", 2) // page view event

    if (!s.eVar10) {
        s.eVar10 = s.Util.getQueryParam('intcid');
        s.eVar10 = s.getValOnce(s.eVar10, 's_eVar10', 0);
    }

    /* Track search terms */
    if (!s.eVar1) {
        s.eVar1 = s.Util.getQueryParam('q');
      }
    if (s.eVar1) {
        s.events = s.events+=",event1";
    }

  
    /* Visit Depth of 5  and New Visit Begun*/
    if (s.ActionDepthTest) {
        s.pdvalue = s.getActionDepth("s_depth");
        if (s.pdvalue == 5) s.events = s.apl(s.events, 'event26', ',', 2);
        if (s.pdvalue == 1) s.events = s.apl(s.events, 'event28', ',', 2);
        s.ActionDepthTest = false;
    }

    /* Download Event */
    s.d_url = s.downloadLinkHandler(s.linkDownloadFileTypes);
    if (s.d_url) {
        s.events = s.apl(s.events, 'event18', ',', 2);
        s.linkTrackVars = "events";
        s.linkTrackEvents = "event18,";
    }
    
    /*
        //Sets event9 (error) and errored URL on 500 or 404 
    if(_satellite.getVar('Content Type') == 'error'){
        s.events = 'event9';
        s.pageName = s.eVar2 = document.URL
    }

    // Captures onsite keywords in a list variable 
    s.list2 = _satellite.getVar('Onsite Keywords');
        */

    // Engaged Visitors
    var timeTemp = s.getTimeSpent("event82");
    if (timeTemp) {
        s.events = s.apl(s.events, timeTemp, ",", 2);
    }

    /* SocialPlatforms - SocialAnalytics */
    s.socialPlatforms('eVar71');

    s.prop17 = s.eVar17 = s.getVisitNumCustom('m');

    /*Previous Page Name call*/
    s.prop68 = s.eVar68 = s.getPreviousValue(s.pageName, 's_ppn');
    //var ppv = s.getPercentPageViewed(s.pageName);
    //if( ppv && typeof ppv=='object' && ppv[0] == s.prop68 ) { 
    //s.prop58 = s.eVar58 = ppv[1] // % page viewed
    //s.eVar69 = s.prop69 = ppv[2] // initial % viewed
    //  }

    //Page load plugin call
    s.eVar56 = s_getLoadTime();
    s.prop56 = 'D=v56';

    /**get Responsive Web Design Values**/
    s.eVar51 = s.getRwd(true, 750, 980);
    s.prop51 = 'D=v51';

    /* New or repeat visitor designation */
    s.eVar23 = s.getNewRepeat();
    s.prop23 = 'D=v23'

    //Time parting plugin call
    s.eVar11 = s.getTimeParting('s', '-5');
    s.prop11 = 'D=v11'

    /* dedupe the traffic sources reports */
    s.referrer = s.dedupeReferrers();

    /*Detects if referrer is external*/
    s.isReferrer = s.referrer ? s.referrer : document.referrer;
    if (s.isReferrer) {
        s.noQReferrer = s.isReferrer.indexOf('?') > -1 ? s.isReferrer.substring(0, s.isReferrer.indexOf('?')) : s.isReferrer; //removes query params
        s.refArr = s.split(s.noQReferrer, "/");
        s.refSub = s.refArr.length > 1 ? s.refArr[2].toLowerCase() : s.noQReferrer.toLowerCase();
        s.lnkIntFltArray = s.split(s.linkInternalFilters, ',');
        s.lnkIntFltArrLen = s.lnkIntFltArray.length - 1;
        for (s.qI = 0; s.qI <= s.lnkIntFltArrLen; s.qI++) {
            if (s.lnkIntFltArray[s.qI]) {
                s.inFilts = s.refSub.indexOf(s.lnkIntFltArray[s.qI]) == -1 ? false : true; //does referrer contain int. filter?  if so, set true, else set false
                if (s.inFilts)
                    break;
            }
        }

        /* If referrer is external, removes 'www' if present, extracts domain/subdomain and populates eVar39/prop39 and eVar30/prop30 respectively.*/
        if (!s.inFilts) {
            s.refSubArr = s.refSub.split(".");
            if (s.refSubArr.length > 2) {
                if (s.refSubArr[s.refSubArr.length - 2] == "com" || s.refSubArr[s.refSubArr.length - 2] == "co") {
                    s.eVar39 = s.refSubArr[s.refSubArr.length - 3] + '.' + s.refSubArr[s.refSubArr.length - 2] + "." + s.refSubArr[s.refSubArr.length - 1];
                } else {
                    s.eVar39 = s.refSubArr[s.refSubArr.length - 2] + "." + s.refSubArr[s.refSubArr.length - 1];
                }
            } else {
                s.eVar39 = s.refSub;
            }
            s.eVar30 = (s.refSub.substring(0, 4) == "www.") ? s.refSub.substring(4) : s.refSub;
        }
    }
    s.eVar30 = s.getAndPersistValue(s.eVar30, 'v30', 0);
    s.eVar39 = s.getAndPersistValue(s.eVar39, 'v39', 0);
    s.prop39 = s.eVar39 ? 'D=v39' : "";
    s.prop30 = s.eVar30 ? 'D=v30' : "";

    //Instantiate DIL v5.2 code
    var condeDIL = DIL.create({
        partner: "condenast"
    });

    var _scDilObj;
    if (typeof s != 'undefined' && s === Object(s) && typeof s.account != 'undefined' && s.account) {
        _scDilObj = s_gi(s.account);
    } else {
        _scDilObj = s_gi(s_account);
    }


    DIL.modules.siteCatalyst.init(_scDilObj, condeDIL, {
        names: ['pageName', 'channel', 'campaign', 'products', 'events', 'pe', 'referrer', 'server', 'purchaseID', 'zip', 'state'],
        iteratedNames: [{
            name: 'eVar',
            maxIndex: 75
        }, {
            name: 'prop',
            maxIndex: 75
        }, {
            name: 'pev',
            maxIndex: 3
        }, {
            name: 'hier',
            maxIndex: 4
        }]
    });

}
s.doPlugins = s_doPlugins

/*
 * Plugin: socialPlatforms v1.1
 */
s.socialPlatforms = new Function("a", "" + "var s=this,g,K,D,E,F,i;g=s.referrer?s.referrer:document.referrer;g=g." + "toLowerCase();K=s.split(s.socPlatList,'|');for(i=0;i<K.length;i++){" + "D=s.split(K[i],'>');if(g.indexOf(D[0])!=-1){if(a){s[a]=D[1];}}}");

s.socPlatList = "facebook.com>Facebook|twitter.com>Twitter|t.co/>Twitter|youtube.com>Youtube|clipmarks.com>Clipmarks|dailymotion.com>Dailymotion|delicious.com>Delicious|digg.com>Digg|diigo.com>Diigo|flickr.com>Flickr|flixster.com>Flixster|fotolog.com>Fotolog|friendfeed.com>FriendFeed|google.com/buzz>Google Buzz|buzz.googleapis.com>Google Buzz|plus.google.com>Google+|hulu.com>Hulu|identi.ca>identi.ca|ilike.com>iLike|intensedebate.com>IntenseDebate|myspace.com>MySpace|newsgator.com>Newsgator|photobucket.com>Photobucket|plurk.com>Plurk|slideshare.net>SlideShare|smugmug.com>SmugMug|stumbleupon.com>StumbleUpon|tumblr.com>Tumblr|vimeo.com>Vimeo|wordpress.com>WordPress|xanga.com>Xanga|metacafe.com>Metacafe|pinterest.com>Pinterest";


/*
 * Engaged Users Plugin - High Value Audience
 * Added 3/22/2013 as a result of an audit and per discussions with Dan Stubbs and Don Taylor
 */
s.getTimeSpent = function(e1) {
    var s = this;

    if ((typeof s.linkType === undefined || s.linkType != '') || (s.linkType == '' && s.eo == '')) {

        s.linkTrackVars = s.apl(s.linkTrackVars, 'events', ',', 2);
        s.linkTrackEvents = s.apl(s.linkTrackEvents, e1, ',', 2);

        previousTime = s.c_r('timeSpent');
        currentTime = (new Date()).getTime();

        if (s.events && s.events.indexOf(e1 + "=") > -1) {
            var list = s.split(s.events, ",");
            if (list.length > 0) {
                s.events = "";
                for (var i = 0; i < list.length; i++) {
                    if (list[i].indexOf(e1 + "=") == -1)
                        s.events = s.events + list[i] + ",";
                }
                s.events = s.events.substring(0, s.events.length - 1);
            }
        }

        if (previousTime == '') {
            s.c_w('timeSpent', currentTime);
            return e1 + '=0';
        } else {
            var timeDiff = Math.round((currentTime - previousTime) / 1000)
            if (timeDiff > 1800 || timeDiff < 0) {
                s.c_w('timeSpent', currentTime)
                return e1 + '=0';
            } else {
                s.c_w('timeSpent', currentTime);
                return e1 + '=' + timeDiff;
            }
        }
    }
}

/*
 * Plugin Utility: apl v1.2
 */
s.apl = new Function("l", "v", "d", "u", "" + "var s=this,m=0;if(!l)l='';if(u){var i,n,a=l.split(d);for(i=0;i<a.le" + "ngth;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCase(" + ")));}}if(!m)l=l?l+d+v:v;return l");

/*
 * Plugin: getAndPersistValue 0.3 - get a value on every page
 */
s.getAndPersistValue = new Function("v", "c", "e", "" + "var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if(" + "v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
 * Plugin: Visit Depth
 */
s.getActionDepth = new Function("c", "" + "var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);" + "if(!s.c_r(c)){v=1}if(s.c_r(c)){v=s.c_r(c);v++}" + "if(!s.c_w(c,v,t)){s.c_w(c,v,0)}return v;");

/*
 * Plugin: downloadLinkHandler 0.8 - identify and report download links
 */
s.downloadLinkHandler = new Function("p", "e", "" + "var s=this,o=s.p_gh(),h=o.href,n='linkDownloadFileTypes',i,t;if(!h|" + "|(s.linkType&&(h||s.linkName)))return'';i=h.indexOf('?');t=s[n];s[n" + "]=p?p:t;if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return e?o:" + "h;");
s.p_gh = new Function("", "" + "var s=this;if(!s.eo&&!s.lnk)return'';var o=s.eo?s.eo:s.lnk,y=s.ot(o" + "),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o" + "=o.parentElement?o.parentElement:o.parentNode;if(!o)return'';y=s.ot" + "(o);n=s.oid(o);x=o.s_oidt;}}return o?o:'';");

/*
 * Plugin: exitLinkHandler 0.8 - identify and report exit links
 */
s.exitLinkHandler = new Function("p", "e", "" + "var s=this,o=s.p_gh(),h=o.href,n='linkInternalFilters',i,t;if(!h||(" + "s.linkType&&(h||s.linkName)))return'';i=h.indexOf('?');t=s[n];s[n]=" + "p?p:t;h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);if(s.lt(h)==" + "'e')s.linkType='e';else h='';s[n]=t;return e?o:h;");
s.p_gh = new Function("", "" + "var s=this;if(!s.eo&&!s.lnk)return'';var o=s.eo?s.eo:s.lnk,y=s.ot(o" + "),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o" + "=o.parentElement?o.parentElement:o.parentNode;if(!o)return'';y=s.ot" + "(o);n=s.oid(o);x=o.s_oidt;}}return o?o:'';");

/*
 * Plugin: linkHandler 0.8 - identify and report custom links
 */
s.linkHandler = new Function("p", "t", "e", "" + "var s=this,o=s.p_gh(),h=o.href,i,l;t=t?t:'o';if(!h||(s.linkType&&(h" + "||s.linkName)))return'';i=h.indexOf('?');h=s.linkLeaveQueryString||" + "i<0?h:h.substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s" + ".linkName=l=='[['?'':l;s.linkType=t;return e?o:h;}return'';");
s.p_gh = new Function("", "" + "var s=this;if(!s.eo&&!s.lnk)return'';var o=s.eo?s.eo:s.lnk,y=s.ot(o" + "),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o" + "=o.parentElement?o.parentElement:o.parentNode;if(!o)return'';y=s.ot" + "(o);n=s.oid(o);x=o.s_oidt;}}return o?o:'';");
s.p_gn = new Function("t", "h", "" + "var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x=" + "t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}" + "return 0;");

/*
 * Plugin Utility: pt - runs function in f argument against list of
 * variables declared in x (delimited by d), with a as an optional
 * argument to be included in f function call
 */
s.pt = new Function("x", "d", "f", "a", "" + "var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t" + ".substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substri" + "ng(z,x.length);t=z<x.length?t:''}return'';");

/*
 * Plugin: getPreviousValue v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue = new Function("v", "c", "el", "" + "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el" + "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i" + "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)" + ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?" + "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

/*
 * Plugin: dedupeReferrer v1.0 - prevents the duplication of referrers
 */
s.dedupeReferrer = new Function("c", "b", "" + "var s=this,a,g,i,j,k,l,m,n,o;g=s.referrer?s.referrer:document.refer" + "rer;g=g.toLowerCase();if(g){i=g.indexOf('?')>-1?g.indexOf('?'):g.le" + "ngth;j=g.substring(0,i);k=s.linkInternalFilters.toLowerCase();k=s.s" + "plit(k,',');l=k.length;for(m=0;m<l;m++){n=j.indexOf(k[m])>-1?g:'';i" + "f(n)o=n}if(!o){c=c?c:'_dr';b=b?b-1:'1';a=g;a=s.getValOnce(a,c,0);if" + "(a){return a}else{return k[b]}}}");
/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split = new Function("l", "d", "" + "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x" + "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: getValOnce_v1.11
 */
s.getValOnce = new Function("v", "c", "e", "t", "" + "var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000" + "0:86400000,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e" + "==0?0:a);}return v==k?'':v");

/*
 * Monthly Visit Number
 */
s.dimo = new Function("m", "y", "var d=new Date(y,m+1,0); return d.getDate();");
s.endof = new Function("x", "var t = new Date(); t.setHours(0); t.setMinutes(0);" + "t.setSeconds(0); if(x=='m') d=s.dimo(t.getMonth(),t.getFullYear()) - t.getDate() + 1;" + "else if(x=='w') d=7-t.getDay(); else d=1; t.setDate(t.getDate()+d); return t;");
s.getVisitNumCustom = new Function("tp", "" + "var s=this,e=new Date(),cval,cvisit,ct=e.getTime(),c='s_vnum_'+tp,c2='sinvisit_'+tp,eo=s.endof(tp)," + "y=eo.getTime();e.setTime(y);cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn='),str=cval.substring(i+4,cval.length),k;}" + "cvisit=s.c_r(c2);if(cvisit){if(str){e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return str;}" + "else return 'unknown visit number';}" + "else{if(str){str++;k=cval.substring(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return str;}" + "else{s.c_w(c,y+'&vn=1',e);e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return 1;}}");


/*
 * Plugin: getPercentPageViewed v1.74
 */
s.getPercentPageViewed = new Function("n", "" + "var s=this,W=window,EL=W.addEventListener,AE=W.attachEvent,E=['load" + "','unload','scroll','resize','zoom','keyup','mouseup','touchend','o" + "rientationchange','pan'],K='s_ppv',P=K+'l',I=n||s.pageName||documen" + "t.location.href;W.s_Obj=s;if(!W.s_PPVevent){s.s_PPVg=function(n,o){" + "var c=s.c_r(o?P:K)||'',a=c.indexOf(',')>-1?c.split(',',10):[''],i;a" + "[0]=o?unescape(a[0]||''):I;for(i=1;i<9&&(i<a.length||!o);i++)a[i]=a" + "[i]?parseInt(a[i])||0:0;if(a.length>9||!o)a[9]=a[9]&&a[9]!='L'&&a[9" + "]!='LP'&&a[9]!='PL'?'P':a[9];return a};s.c_w(P,s.c_r(K)||'');s.c_w(" + "K,escape(I)+',0,0,0,0,0,0,0,0');W.s_PPVevent=function(e){var W=wind" + "ow,D=document||{},B=D.body,E=D.documentElement||{},S=window.screen|" + "|{},Ho='offsetHeight',Hs='scrollHeight',Ts='scrollTop',Wc='clientWi" + "dth',Hc='clientHeight',M=Math,C=100,J='object',N='number',Z=',',s=W" + ".s_Obj||W.s||0;e=e&&typeof e==J?e.type||'':'';if(!e.indexOf('on'))e" + "=e.substring(2);if(W.s_PPVt&&!e){clearTimeout(s_PPVt);s_PPVt=0}if(s" + "&&typeof s==J&&B&&typeof B==J){var h=M.max(B[Hs]||E[Hs],B[Ho]||E[Ho" + "],B[Hc]||E[Hc]||1),X=W.innerWidth||E[Wc]||B[Wc]||1,Y=W.innerHeight|" + "|E[Hc]||B[Hc]||1,x=S.width||1,y=S.height||1,r=M.round(C*(W.devicePi" + "xelRatio||1))/C,b=(D.pageYOffset||E[Ts]||B[Ts]||0)+Y,p=h>0&&b>0?M.r" + "ound(C*b/h):1,O=W.orientation,o=!isNaN(O)?M.abs(O)%180:Y>X?0:90,a=s" + ".s_PPVg(n),L=(e=='load')||(a[1]<1),t,V=function(u,v,f,n){v=typeof v" + "!=N?u:v;v=f||(u>v)?u:v;return n?v:v>C?C:v<0?0:v};if(new RegExp('(iP" + "od|iPad|iPhone)').exec((window.navigator&&navigator.userAgent)||'')" + "&&o){t=x;x=y;y=t}o=o?'L':'P';a[9]=L||!a[9]?o:a[9].substring(0,1);if" + "(a[9]!='L'&&a[9]!='P')a[9]=o;s.c_w(K,escape(a[0])+Z+V(a[1],p,!L)+Z+" + "V(a[2],p,L)+Z+V(a[3],b,L,1)+Z+X+Z+Y+Z+x+Z+y+Z+r+Z+a[9]+(a[9]==o?'':" + "o))}if(!W.s_PPVt&&e!='unload')W.s_PPVt=setTimeout(W.s_PPVevent,333)" + "};for(var f=W.s_PPVevent,i=0;i<E.length;i++)if(EL)EL(E[i],f,false);" + "else if(AE)AE('on'+E[i],f);f()};var a=s.s_PPVg(n,1);return!argument" + "s.length||n=='-'?a[1]:a");

//Page load plugin definition
function s_getLoadTime() {
    if (!window.s_loadT) {
        var b = new Date().getTime(),
            o = window.performance ? performance.timing : 0,
            a = o ? o.requestStart : window.inHeadTS || 0;
        s_loadT = a ? ((b - a) / 1000).toFixed(1) : ''
    }
    return (s_loadT < 0) ? '' : s_loadT;
}

//getRWD plugin definition
s.getRwd = function(a, c, e) {
    var d;
    var b = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var f = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (a) {
        if (b < c) {
            d = "phone layout";
        } else {
            if (b >= e) {
                d = "desktop layout";
            } else {
                if (b >= c && b < e) {
                    d = "tablet layout";
                }
            }
        }
        d = d + ":" + b + "x" + f;
    } else {
        d = "not rwd page:" + b + "x" + f;
    }
    return d;
};

/*
 * Plugin: getNewRepeat 1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat = new Function("d", "cn", "" + "var s=this,e=new Date(),cval,sval,ct=e.getTime();d=d?d:30;cn=cn?cn:" + "'s_nr';e.setTime(ct+d*24*60*60*1000);cval=s.c_r(cn);if(cval.length=" + "=0){s.c_w(cn,ct+'-New',e);return'New';}sval=s.split(cval,'-');if(ct" + "-sval[0]<30*60*1000&&sval[1]=='New'){s.c_w(cn,ct+'-New',e);return'N" + "ew';}else{s.c_w(cn,ct+'-Repeat',e);return'Repeat';}");

/*
 * Plugin: getTimeParting 3.4
 */
s.getTimeParting = new Function("h", "z", "" + "var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont" + "h()!=0){return'Data Not Available';}else{var H,M,D,U,ds,de,tm,da=['" + "Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturda" + "y'],d=new Date();z=z?z:0;z=parseFloat(z);if(s._tpDST){var dso=s._tp" + "DST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d.getFullYea" + "r());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d>ds&&d<de)" + "{z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime()+(d.getT" + "imezoneOffset()*60000);d=new Date(d+(3600000*z));H=d.getHours();M=d" + ".getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U=' AM';if(H>=12){U=' P" + "M';H=H-12;}if(H==0){H=12;}D=da[D];tm=H+':'+M+U;return(tm+'|'+D);}");

/*
 * Plugin: dedupeReferrer v1.0 - prevents the duplication of referrers
 */

/* dedupe referrers */
s.dedupeReferrers = new Function("c", "b", "" + "var s=this,a,g,i,j,k,l,m,n,o;g=s.referrer?s.referrer:document.refer" + "rer;g=g.toLowerCase();if(g){i=g.indexOf('?')>-1?g.indexOf('?'):g.le" + "ngth;j=g.substring(0,i);k=s.linkInternalFilters.toLowerCase();k=s.s" + "plit(k,',');l=k.length;for(m=0;m<l;m++){n=j.indexOf(k[m])>-1?g:'';i" + "f(n)o=n}if(!o){c=c?c:'_dr';b=b?b-1:'1';a=g;a=s.getValOnce(a,c,0);if" + "(a){return a}else{return k[b]}}}");

s.loadModule("Integrate")
s.Integrate.onLoad = function(s, m) {

}

/*DIL code V5.7*/
"function"!==typeof window.DIL&&(window.DIL=function(a,c){var d=[],b,g;a!==Object(a)&&(a={});var e,h,k,q,p,n,l,D,m,J,K,E;e=a.partner;h=a.containerNSID;k=a.iframeAttachmentDelay;q=!!a.disableDestinationPublishingIframe;p=a.iframeAkamaiHTTPS;n=a.mappings;l=a.uuidCookie;D=!0===a.enableErrorReporting;m=a.visitorService;J=a.declaredId;K=!0===a.removeFinishedScriptsAndCallbacks;E=!0===a.delayAllUntilWindowLoad;var L,M,N,F,C,O,P;L=!0===a.disableScriptAttachment;M=!0===a.disableCORSFiring;N=!0===a.disableDefaultRequest;
F=a.afterResultForDefaultRequest;C=a.dpIframeSrc;O=!0===a.testCORS;P=!0===a.useJSONPOnly;D&&DIL.errorModule.activate();var Q=!0===window._dil_unit_tests;(b=c)&&d.push(b+"");if(!e||"string"!==typeof e)return b="DIL partner is invalid or not specified in initConfig",DIL.errorModule.handleError({name:"error",message:b,filename:"dil.js"}),Error(b);b="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0";if(h||"number"===typeof h)h=parseInt(h,10),!isNaN(h)&&0<=h&&(b="");
b&&(h=0,d.push(b),b="");g=DIL.getDil(e,h);if(g instanceof DIL&&g.api.getPartner()===e&&g.api.getContainerNSID()===h)return g;if(this instanceof DIL)DIL.registerDil(this,e,h);else return new DIL(a,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+e+" and containerNSID = "+h);var y={IS_HTTPS:"https:"===document.location.protocol,POST_MESSAGE_ENABLED:!!window.postMessage,COOKIE_MAX_EXPIRATION_DATE:"Tue, 19 Jan 2038 03:14:07 UTC"},G={stuffed:{}},u={},r={firingQueue:[],
fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},callbackPrefix:"demdexRequestCallback",firstRequestHasFired:!1,useJSONP:!0,abortRequests:!1,num_of_jsonp_responses:0,num_of_jsonp_errors:0,num_of_cors_responses:0,num_of_cors_errors:0,corsErrorSources:[],num_of_img_responses:0,num_of_img_errors:0,toRemove:[],removed:[],readyToRemove:!1,platformParams:{d_nsid:h+"",d_rtbd:"json",d_jsonv:DIL.jsonVersion+"",d_dst:"1"},nonModStatsParams:{d_rtbd:!0,
d_dst:!0,d_cts:!0,d_rs:!0},modStatsParams:null,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:2E3,calledBack:!1,mid:null,noVisitorAPI:!1,instance:null,releaseType:"no VisitorAPI",admsProcessingStarted:!1,process:function(f){try{if(!this.admsProcessingStarted){var s=this,a,x,b,d,c;if("function"===typeof f&&"function"===typeof f.getInstance){if(m===Object(m)&&(a=m.namespace)&&"string"===typeof a)x=f.getInstance(a);else{this.releaseType="no namespace";this.releaseRequests();return}if(x===Object(x)&&"function"===
typeof x.isAllowed&&"function"===typeof x.getMarketingCloudVisitorID){if(!x.isAllowed()){this.releaseType="VisitorAPI not allowed";this.releaseRequests();return}this.instance=x;this.admsProcessingStarted=!0;b=function(f){"VisitorAPI"!==s.releaseType&&(s.mid=f,s.releaseType="VisitorAPI",s.releaseRequests())};Q&&(d=m.server)&&"string"===typeof d&&(x.server=d);c=x.getMarketingCloudVisitorID(b);if("string"===typeof c&&c.length){b(c);return}setTimeout(function(){"VisitorAPI"!==s.releaseType&&(s.releaseType=
"timeout",s.releaseRequests())},this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE);return}this.releaseType="invalid instance"}else this.noVisitorAPI=!0;this.releaseRequests()}}catch(e){this.releaseRequests()}},releaseRequests:function(){this.calledBack=!0;r.registerRequest()},getMarketingCloudVisitorID:function(){return this.instance?this.instance.getMarketingCloudVisitorID():null},getMIDQueryString:function(){var f=v.isPopulatedString,s=this.getMarketingCloudVisitorID();f(this.mid)&&this.mid===s||(this.mid=
s);return f(this.mid)?"d_mid="+this.mid+"&":""}},declaredId:{declaredId:{init:null,request:null},declaredIdCombos:{},setDeclaredId:function(f,s){var a=v.isPopulatedString,x=encodeURIComponent;if(f===Object(f)&&a(s)){var b=f.dpid,d=f.dpuuid,c=null;if(a(b)&&a(d)){c=x(b)+"$"+x(d);if(!0===this.declaredIdCombos[c])return"setDeclaredId: combo exists for type '"+s+"'";this.declaredIdCombos[c]=!0;this.declaredId[s]={dpid:b,dpuuid:d};return"setDeclaredId: succeeded for type '"+s+"'"}}return"setDeclaredId: failed for type '"+
s+"'"},getDeclaredIdQueryString:function(){var f=this.declaredId.request,s=this.declaredId.init,a="";null!==f?a="&d_dpid="+f.dpid+"&d_dpuuid="+f.dpuuid:null!==s&&(a="&d_dpid="+s.dpid+"&d_dpuuid="+s.dpuuid);return a}},registerRequest:function(f){var s=this.firingQueue;f===Object(f)&&s.push(f);this.firing||!s.length||E&&!DIL.windowLoaded||(this.adms.calledBack?(f=s.shift(),f.src=f.src.replace(/demdex.net\/event\?d_nsid=/,"demdex.net/event?"+this.adms.getMIDQueryString()+"d_nsid="),v.isPopulatedString(f.corsPostData)&&
(f.corsPostData=f.corsPostData.replace(/^d_nsid=/,this.adms.getMIDQueryString()+"d_nsid=")),A.fireRequest(f),this.firstRequestHasFired||"script"!==f.tag&&"cors"!==f.tag||(this.firstRequestHasFired=!0)):this.processVisitorAPI())},processVisitorAPI:function(){this.adms.process(window.Visitor)},requestRemoval:function(f){if(!K)return"removeFinishedScriptsAndCallbacks is not boolean true";var s=this.toRemove,a,b;f===Object(f)&&(a=f.script,b=f.callbackName,(a===Object(a)&&"SCRIPT"===a.nodeName||"no script created"===
a)&&"string"===typeof b&&b.length&&s.push(f));if(this.readyToRemove&&s.length){b=s.shift();a=b.script;b=b.callbackName;"no script created"!==a?(f=a.src,a.parentNode.removeChild(a)):f=a;window[b]=null;try{delete window[b]}catch(d){}this.removed.push({scriptSrc:f,callbackName:b});DIL.variables.scriptsRemoved.push(f);DIL.variables.callbacksRemoved.push(b);return this.requestRemoval()}return"requestRemoval() processed"}};g=function(){var f="http://fast.",a="?d_nsid="+h+"#"+encodeURIComponent(document.location.href);
if("string"===typeof C&&C.length)return C+a;y.IS_HTTPS&&(f=!0===p?"https://fast.":"https://");return f+e+".demdex.net/dest4.html"+a};var z={THROTTLE_START:3E4,throttleTimerSet:!1,id:"destination_publishing_iframe_"+e+"_"+h,url:g(),iframe:null,iframeHasLoaded:!1,sendingMessages:!1,messages:[],messagesPosted:[],messageSendingInterval:y.POST_MESSAGE_ENABLED?15:100,jsonProcessed:[],attachIframe:function(){var f=this,a=document.createElement("iframe");a.id=this.id;a.style.cssText="display: none; width: 0; height: 0;";
a.src=this.url;t.addListener(a,"load",function(){f.iframeHasLoaded=!0;f.requestToProcess()});document.body.appendChild(a);this.iframe=a},requestToProcess:function(f,a){var b=this;f&&!v.isEmptyObject(f)&&this.process(f,a);this.iframeHasLoaded&&this.messages.length&&!this.sendingMessages&&(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){b.messageSendingInterval=y.POST_MESSAGE_ENABLED?15:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},process:function(f,
a){var b=encodeURIComponent,d,c,e,g,h,n;a===Object(a)&&(n=t.encodeAndBuildRequest(["",a.dpid||"",a.dpuuid||""],","));if((d=f.dests)&&d instanceof Array&&(c=d.length))for(e=0;e<c;e++)g=d[e],g=[b("dests"),b(g.id||""),b(g.y||""),b(g.c||"")],this.addMessage(g.join("|"));if((d=f.ibs)&&d instanceof Array&&(c=d.length))for(e=0;e<c;e++)g=d[e],g=[b("ibs"),b(g.id||""),b(g.tag||""),t.encodeAndBuildRequest(g.url||[],","),b(g.ttl||""),"",n],this.addMessage(g.join("|"));if((d=f.dpcalls)&&d instanceof Array&&(c=
d.length))for(e=0;e<c;e++)g=d[e],h=g.callback||{},h=[h.obj||"",h.fn||"",h.key||"",h.tag||"",h.url||""],g=[b("dpm"),b(g.id||""),b(g.tag||""),t.encodeAndBuildRequest(g.url||[],","),b(g.ttl||""),t.encodeAndBuildRequest(h,","),n],this.addMessage(g.join("|"));this.jsonProcessed.push(f)},addMessage:function(f){var a=encodeURIComponent,a=D?a("---destpub-debug---"):a("---destpub---");this.messages.push(a+f)},sendMessages:function(){var f=this,a;this.messages.length?(a=this.messages.shift(),DIL.xd.postMessage(a,
this.url,this.iframe.contentWindow),this.messagesPosted.push(a),setTimeout(function(){f.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1}},I={traits:function(f){v.isValidPdata(f)&&(u.sids instanceof Array||(u.sids=[]),t.extendArray(u.sids,f));return this},pixels:function(f){v.isValidPdata(f)&&(u.pdata instanceof Array||(u.pdata=[]),t.extendArray(u.pdata,f));return this},logs:function(f){v.isValidLogdata(f)&&(u.logdata!==Object(u.logdata)&&(u.logdata={}),t.extendObject(u.logdata,
f));return this},customQueryParams:function(f){v.isEmptyObject(f)||t.extendObject(u,f,r.reservedKeys);return this},signals:function(f,a){var b,d=f;if(!v.isEmptyObject(d)){if(a&&"string"===typeof a)for(b in d={},f)f.hasOwnProperty(b)&&(d[a+b]=f[b]);t.extendObject(u,d,r.reservedKeys)}return this},declaredId:function(f){r.declaredId.setDeclaredId(f,"request");return this},result:function(f){"function"===typeof f&&(u.callback=f);return this},afterResult:function(f){"function"===typeof f&&(u.postCallbackFn=
f);return this},useImageRequest:function(){u.useImageRequest=!0;return this},clearData:function(){u={};return this},submit:function(){A.submitRequest(u);u={};return this},getPartner:function(){return e},getContainerNSID:function(){return h},getEventLog:function(){return d},getState:function(){var f={},a={};t.extendObject(f,r,{callbackPrefix:!0,useJSONP:!0,registerRequest:!0});t.extendObject(a,z,{attachIframe:!0,requestToProcess:!0,process:!0,sendMessages:!0});return{pendingRequest:u,otherRequestInfo:f,
destinationPublishingInfo:a}},idSync:function(f){if(f!==Object(f)||"string"!==typeof f.dpid||!f.dpid.length)return"Error: config or config.dpid is empty";if("string"!==typeof f.url||!f.url.length)return"Error: config.url is empty";var a=f.url,b=f.minutesToLive,d=encodeURIComponent,c,a=a.replace(/^https:/,"").replace(/^http:/,"");if("undefined"===typeof b)b=20160;else if(b=parseInt(b,10),isNaN(b)||0>=b)return"Error: config.minutesToLive needs to be a positive number";c=t.encodeAndBuildRequest(["",
f.dpid,f.dpuuid||""],",");f=["ibs",d(f.dpid),"img",d(a),b,"",c];z.addMessage(f.join("|"));r.firstRequestHasFired&&z.requestToProcess();return"Successfully queued"},aamIdSync:function(f){if(f!==Object(f)||"string"!==typeof f.dpuuid||!f.dpuuid.length)return"Error: config or config.dpuuid is empty";f.url="//dpm.demdex.net/ibs:dpid="+f.dpid+"&dpuuid="+f.dpuuid;return this.idSync(f)},passData:function(f){if(v.isEmptyObject(f))return"Error: json is empty or not an object";A.defaultCallback(f);return"json submitted for processing"},
getPlatformParams:function(){return r.platformParams},getEventCallConfigParams:function(){var f=r,a=f.modStatsParams,b=f.platformParams,d;if(!a){a={};for(d in b)b.hasOwnProperty(d)&&!f.nonModStatsParams[d]&&(a[d.replace(/^d_/,"")]=b[d]);f.modStatsParams=a}return a}},A={corsMetadata:function(){var f="none",a=!0;"undefined"!==typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?f="XMLHttpRequest":(new Function("/*@cc_on return /^10/.test(@_jscript_version) @*/"))()?
f="XMLHttpRequest":"undefined"!==typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(a=!1),0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")&&(a=!1));return{corsType:f,corsCookiesEnabled:a}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new window[this.corsMetadata.corsType]},submitRequest:function(f){r.registerRequest(A.createQueuedRequest(f));return!0},createQueuedRequest:function(f){var a=r,b,d=f.callback,c="img",g;if(!v.isEmptyObject(n)){var e,
m,l;for(e in n)n.hasOwnProperty(e)&&(m=n[e],null!=m&&""!==m&&e in f&&!(m in f||m in r.reservedKeys)&&(l=f[e],null!=l&&""!==l&&(f[m]=l)))}v.isValidPdata(f.sids)||(f.sids=[]);v.isValidPdata(f.pdata)||(f.pdata=[]);v.isValidLogdata(f.logdata)||(f.logdata={});f.logdataArray=t.convertObjectToKeyValuePairs(f.logdata,"=",!0);f.logdataArray.push("_ts="+(new Date).getTime());"function"!==typeof d&&(d=this.defaultCallback);a.useJSONP=!0!==f.useImageRequest;a.useJSONP&&(c="script",b=a.callbackPrefix+"_"+h+"_"+
(new Date).getTime());a=this.makeRequestSrcData(f,b);!P&&(g=this.getCORSInstance())&&a.truncated&&(this.corsMetadata.corsCookiesEnabled||a.isDeclaredIdCall)&&(c="cors");return{tag:c,src:a.src,corsSrc:a.corsSrc,internalCallbackName:b,callbackFn:d,postCallbackFn:f.postCallbackFn,useImageRequest:!!f.useImageRequest,requestData:f,corsInstance:g,corsPostData:a.corsPostData,hasCORSError:!1}},defaultCallback:function(f,a){var b,d,c,e,g,h,m,n,w;if((b=f.stuff)&&b instanceof Array&&(d=b.length))for(c=0;c<d;c++)if((e=
b[c])&&e===Object(e)){g=e.cn;h=e.cv;m=e.ttl;if("undefined"===typeof m||""===m)m=Math.floor(t.getMaxCookieExpiresInMinutes()/60/24);n=e.dmn||"."+document.domain.replace(/^www\./,"");w=e.type;g&&(h||"number"===typeof h)&&("var"!==w&&(m=parseInt(m,10))&&!isNaN(m)&&t.setCookie(g,h,1440*m,"/",n,!1),G.stuffed[g]=h)}b=f.uuid;v.isPopulatedString(b)&&!v.isEmptyObject(l)&&(d=l.path,"string"===typeof d&&d.length||(d="/"),c=parseInt(l.days,10),isNaN(c)&&(c=100),t.setCookie(l.name||"aam_did",b,1440*c,d,l.domain||
"."+document.domain.replace(/^www\./,""),!0===l.secure));q||r.abortRequests||z.requestToProcess(f,a)},makeRequestSrcData:function(f,a){f.sids=v.removeEmptyArrayValues(f.sids||[]);f.pdata=v.removeEmptyArrayValues(f.pdata||[]);var b=r,d=b.platformParams,c=t.encodeAndBuildRequest(f.sids,","),g=t.encodeAndBuildRequest(f.pdata,","),m=(f.logdataArray||[]).join("&");delete f.logdataArray;var n=y.IS_HTTPS?"https://":"http://",l=b.declaredId.getDeclaredIdQueryString(),k;k=[];var w,q,p,u;for(w in f)if(!(w in
b.reservedKeys)&&f.hasOwnProperty(w))if(q=f[w],w=encodeURIComponent(w),q instanceof Array)for(p=0,u=q.length;p<u;p++)k.push(w+"="+encodeURIComponent(q[p]));else k.push(w+"="+encodeURIComponent(q));k=k.length?"&"+k.join("&"):"";w=!1;c="d_nsid="+d.d_nsid+l+(c.length?"&d_sid="+c:"")+(g.length?"&d_px="+g:"")+(m.length?"&d_ld="+encodeURIComponent(m):"");d="&d_rtbd="+d.d_rtbd+"&d_jsonv="+d.d_jsonv+"&d_dst="+d.d_dst;n=n+e+".demdex.net/event";g=b=n+"?"+c+(b.useJSONP?d+"&d_cb="+(a||""):"")+k;2048<b.length&&
(b=b.substring(0,b.lastIndexOf("&")),w=!0);return{corsSrc:n+"?"+(O?"testcors=1&d_nsid="+h+"&":"")+"_ts="+(new Date).getTime(),src:b,originalSrc:g,truncated:w,corsPostData:c+d+k,isDeclaredIdCall:""!==l}},fireRequest:function(f){if("img"===f.tag)this.fireImage(f);else{var a=r.declaredId,a=a.declaredId.request||a.declaredId.init||{},a={dpid:a.dpid||"",dpuuid:a.dpuuid||""};"script"===f.tag?this.fireScript(f,a):"cors"===f.tag&&this.fireCORS(f,a)}},fireImage:function(a){var c=r,e,g;c.abortRequests||(c.firing=
!0,e=new Image(0,0),c.sent.push(a),e.onload=function(){c.firing=!1;c.fired.push(a);c.num_of_img_responses++;c.registerRequest()},g=function(e){b="imgAbortOrErrorHandler received the event of type "+e.type;d.push(b);c.abortRequests=!0;c.firing=!1;c.errored.push(a);c.num_of_img_errors++;c.registerRequest()},e.addEventListener?(e.addEventListener("error",g,!1),e.addEventListener("abort",g,!1)):e.attachEvent&&(e.attachEvent("onerror",g),e.attachEvent("onabort",g)),e.src=a.src)},fireScript:function(a,
c){var g=this,h=r,m,n,l=a.src,k=a.postCallbackFn,q="function"===typeof k,p=a.internalCallbackName;h.abortRequests||(h.firing=!0,window[p]=function(g){try{g!==Object(g)&&(g={});var m=a.callbackFn;h.firing=!1;h.fired.push(a);h.num_of_jsonp_responses++;m(g,c);q&&k(g,c)}catch(l){l.message="DIL jsonp callback caught error with message "+l.message;b=l.message;d.push(b);l.filename=l.filename||"dil.js";l.partner=e;DIL.errorModule.handleError(l);try{m({error:l.name+"|"+l.message},c),q&&k({error:l.name+"|"+
l.message},c)}catch(H){}}finally{h.requestRemoval({script:n,callbackName:p}),h.registerRequest()}},L?(h.firing=!1,h.requestRemoval({script:"no script created",callbackName:p})):(n=document.createElement("script"),n.addEventListener&&n.addEventListener("error",function(d){h.requestRemoval({script:n,callbackName:p});b="jsonp script tag error listener received the event of type "+d.type+" with src "+l;g.handleScriptError(b,a)},!1),n.type="text/javascript",n.src=l,m=DIL.variables.scriptNodeList[0],m.parentNode.insertBefore(n,
m)),h.sent.push(a),h.declaredId.declaredId.request=null)},fireCORS:function(a,c){function g(n){var l;try{if(l=JSON.parse(n),l!==Object(l)){h.handleCORSError(a,c,"Response is not JSON");return}}catch(k){h.handleCORSError(a,c,"Error parsing response as JSON");return}try{var H=a.callbackFn;m.firing=!1;m.fired.push(a);m.num_of_cors_responses++;H(l,c);t&&q(l,c)}catch(p){p.message="DIL handleCORSResponse caught error with message "+p.message;b=p.message;d.push(b);p.filename=p.filename||"dil.js";p.partner=
e;DIL.errorModule.handleError(p);try{H({error:p.name+"|"+p.message},c),t&&q({error:p.name+"|"+p.message},c)}catch(r){}}finally{m.registerRequest()}}var h=this,m=r,n=this.corsMetadata.corsType,l=a.corsSrc,k=a.corsInstance,p=a.corsPostData,q=a.postCallbackFn,t="function"===typeof q;if(!m.abortRequests){m.firing=!0;if(M)m.firing=!1;else try{k.open("post",l,!0),"XMLHttpRequest"===n?(k.withCredentials=!0,k.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),k.onreadystatechange=function(){4===
this.readyState&&(200===this.status?g(this.responseText):h.handleCORSError(a,c,"onreadystatechange"))}):"XDomainRequest"===n&&(k.onload=function(){g(this.responseText)}),k.onerror=function(){h.handleCORSError(a,c,"onerror")},k.ontimeout=function(){h.handleCORSError(a,c,"ontimeout")},k.send(p)}catch(u){this.handleCORSError(a,c,"try-catch")}m.sent.push(a);m.declaredId.declaredId.request=null}},handleCORSError:function(a,b,c){a.hasCORSError||(a.hasCORSError=!0,r.num_of_cors_errors++,r.corsErrorSources.push(c),
a.tag="script",this.fireScript(a,b))},handleScriptError:function(a,b){r.num_of_jsonp_errors++;this.handleRequestError(a,b)},handleRequestError:function(a,b){var c=r;d.push(a);c.abortRequests=!0;c.firing=!1;c.errored.push(b);c.registerRequest()}},v={isValidPdata:function(a){return a instanceof Array&&this.removeEmptyArrayValues(a).length?!0:!1},isValidLogdata:function(a){return!this.isEmptyObject(a)},isEmptyObject:function(a){if(a!==Object(a))return!0;for(var b in a)if(a.hasOwnProperty(b))return!1;
return!0},removeEmptyArrayValues:function(a){for(var b=0,c=a.length,d,g=[],b=0;b<c;b++)d=a[b],"undefined"!==typeof d&&null!==d&&""!==d&&g.push(d);return g},isPopulatedString:function(a){return"string"===typeof a&&a.length}},t={addListener:function(){if(document.addEventListener)return function(a,b,c){a.addEventListener(b,function(a){"function"===typeof c&&c(a)},!1)};if(document.attachEvent)return function(a,b,c){a.attachEvent("on"+b,function(a){"function"===typeof c&&c(a)})}}(),convertObjectToKeyValuePairs:function(a,
b,c){var d=[],g,e;b||(b="=");for(g in a)a.hasOwnProperty(g)&&(e=a[g],"undefined"!==typeof e&&null!==e&&""!==e&&d.push(g+b+(c?encodeURIComponent(e):e)));return d},encodeAndBuildRequest:function(a,b){return this.map(a,function(a){return encodeURIComponent(a)}).join(b)},map:function(a,b){if(Array.prototype.map)return a.map(b);if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var g=Array(d),e=0;e<d;e++)e in c&&(g[e]=b.call(b,c[e],
e,c));return g},filter:function(a,b){if(!Array.prototype.filter){if(void 0===a||null===a)throw new TypeError;var c=Object(a),d=c.length>>>0;if("function"!==typeof b)throw new TypeError;for(var g=[],e=0;e<d;e++)if(e in c){var h=c[e];b.call(b,h,e,c)&&g.push(h)}return g}return a.filter(b)},getCookie:function(a){a+="=";var b=document.cookie.split(";"),c,d,e;c=0;for(d=b.length;c<d;c++){for(e=b[c];" "===e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(a))return decodeURIComponent(e.substring(a.length,
e.length))}return null},setCookie:function(a,b,c,d,e,g){var h=new Date;c&&(c*=6E4);document.cookie=a+"="+encodeURIComponent(b)+(c?";expires="+(new Date(h.getTime()+c)).toUTCString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(g?";secure":"")},extendArray:function(a,b){return a instanceof Array&&b instanceof Array?(Array.prototype.push.apply(a,b),!0):!1},extendObject:function(a,b,c){var d;if(a===Object(a)&&b===Object(b)){for(d in b)!b.hasOwnProperty(d)||!v.isEmptyObject(c)&&d in c||(a[d]=b[d]);return!0}return!1},
getMaxCookieExpiresInMinutes:function(){return((new Date(y.COOKIE_MAX_EXPIRATION_DATE)).getTime()-(new Date).getTime())/1E3/60}};"error"===e&&0===h&&t.addListener(window,"load",function(){DIL.windowLoaded=!0});var B=function(){r.registerRequest();S();q||r.abortRequests||z.attachIframe();r.readyToRemove=!0;r.requestRemoval()},S=function(){q||setTimeout(function(){N||r.firstRequestHasFired||r.adms.admsProcessingStarted||r.adms.calledBack||("function"===typeof F?I.afterResult(F).submit():I.submit())},
DIL.constants.TIME_TO_DEFAULT_REQUEST)},R=document;"error"!==e&&(DIL.windowLoaded?B():"complete"!==R.readyState&&"loaded"!==R.readyState?t.addListener(window,"load",B):DIL.isAddedPostWindowLoadWasCalled?t.addListener(window,"load",B):E||(k="number"===typeof k?parseInt(k,10):0,0>k&&(k=0),setTimeout(B,k||DIL.constants.TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT)));r.declaredId.setDeclaredId(J,"init");this.api=I;this.getStuffedVariable=function(a){var b=G.stuffed[a];b||"number"===typeof b||(b=t.getCookie(a))||
"number"===typeof b||(b="");return b};this.validators=v;this.helpers=t;this.constants=y;this.log=d;Q&&(this.pendingRequest=u,this.requestController=r,this.setDestinationPublishingUrl=g,this.destinationPublishing=z,this.requestProcs=A,this.variables=G,this.callWindowLoadFunctions=B)},function(){var a=document,c;null==a.readyState&&a.addEventListener&&(a.readyState="loading",a.addEventListener("DOMContentLoaded",c=function(){a.removeEventListener("DOMContentLoaded",c,!1);a.readyState="complete"},!1))}(),
DIL.extendStaticPropertiesAndMethods=function(a){var c;if(a===Object(a))for(c in a)a.hasOwnProperty(c)&&(this[c]=a[c])},DIL.extendStaticPropertiesAndMethods({version:"5.7",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50,TIME_TO_CATCH_ALL_DP_IFRAME_ATTACHMENT:500},variables:{scriptNodeList:document.getElementsByTagName("script"),scriptsRemoved:[],callbacksRemoved:[]},windowLoaded:!1,dils:{},isAddedPostWindowLoadWasCalled:!1,isAddedPostWindowLoad:function(a){this.isAddedPostWindowLoadWasCalled=
!0;this.windowLoaded="function"===typeof a?!!a():"boolean"===typeof a?a:!0},create:function(a){try{return new DIL(a)}catch(c){return(new Image(0,0)).src="http://error.demdex.net/event?d_nsid=0&d_px=14137&d_ld=name%3Derror%26filename%3Ddil.js%26partner%3Dno_partner%26message%3DError%2520in%2520attempt%2520to%2520create%2520DIL%2520instance%2520with%2520DIL.create()%26_ts%3D"+(new Date).getTime(),Error("Error in attempt to create DIL instance with DIL.create()")}},registerDil:function(a,c,d){c=c+"$"+
d;c in this.dils||(this.dils[c]=a)},getDil:function(a,c){var d;"string"!==typeof a&&(a="");c||(c=0);d=a+"$"+c;return d in this.dils?this.dils[d]:Error("The DIL instance with partner = "+a+" and containerNSID = "+c+" was not found")},dexGetQSVars:function(a,c,d){c=this.getDil(c,d);return c instanceof this?c.getStuffedVariable(a):""},xd:{postMessage:function(a,c,d){var b=1;c&&(window.postMessage?d.postMessage(a,c.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):c&&(d.location=c.replace(/#.*$/,"")+"#"+ +new Date+
b++ +"&"+a))}}}),DIL.errorModule=function(){var a=DIL.create({partner:"error",containerNSID:0,disableDestinationPublishingIframe:!0}),c={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},d=!1;return{activate:function(){d=!0},handleError:function(b){if(!d)return"DIL error module has not been activated";b!==Object(b)&&(b={});var g=b.name?(b.name+"").toLowerCase():
"",e=[];b={name:g,filename:b.filename?b.filename+"":"",partner:b.partner?b.partner+"":"no_partner",site:b.site?b.site+"":document.location.href,message:b.message?b.message+"":""};e.push(g in c?c[g]:c.noerrortypedefined);a.api.pixels(e).logs(b).useImageRequest().submit();return"DIL error report sent"},pixelMap:c}}(),DIL.tools={},DIL.modules={helpers:{handleModuleError:function(a,c,d){var b="";c=c||"Error caught in DIL module/submodule: ";a===Object(a)?b=c+(a.message||"err has no message"):(b=c+"err is not a valid object",
a={});a.message=b;d instanceof DIL&&(a.partner=d.api.getPartner());DIL.errorModule.handleError(a);return this.errorMessage=b}}});
DIL.tools.getSearchReferrer=function(a,c){var d=DIL.getDil("error"),b=DIL.tools.decomposeURI(a||document.referrer),g="",e="",h={queryParam:"q"};return(g=d.helpers.filter([c===Object(c)?c:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}],function(a){return!(!a.hasOwnProperty("hostPattern")||!b.hostname.match(a.hostPattern))}).shift())?{valid:!0,name:b.hostname,keywords:(d.helpers.extendObject(h,g),e=h.queryPattern?
(g=(""+b.search).match(h.queryPattern))?g[1]:"":b.uriParams[h.queryParam],decodeURIComponent(e||"").replace(/\+|%20/g," "))}:{valid:!1,name:"",keywords:""}};
DIL.tools.decomposeURI=function(a){var c=DIL.getDil("error"),d=document.createElement("a");d.href=a||document.referrer;return{hash:d.hash,host:d.host.split(":").shift(),hostname:d.hostname,href:d.href,pathname:d.pathname.replace(/^\//,""),protocol:d.protocol,search:d.search,uriParams:function(a,d){c.helpers.map(d.split("&"),function(c){c=c.split("=");a[c.shift()]=c.shift()});return a}({},d.search.replace(/^(\/|\?)?|\/$/g,""))}};
DIL.tools.getMetaTags=function(){var a={},c=document.getElementsByTagName("meta"),d,b,g,e,h;d=0;for(g=arguments.length;d<g;d++)if(e=arguments[d],null!==e)for(b=0;b<c.length;b++)if(h=c[b],h.name===e){a[e]=h.content;break}return a};
DIL.modules.siteCatalyst={dil:null,handle:DIL.modules.helpers.handleModuleError,init:function(a,c,d,b){try{var g=this,e={name:"DIL Site Catalyst Module Error"},h=function(a){e.message=a;DIL.errorModule.handleError(e);return a};this.options=b===Object(b)?b:{};this.dil=null;if(c instanceof DIL)this.dil=c;else return h("dilInstance is not a valid instance of DIL");e.partner=c.api.getPartner();if(a!==Object(a))return h("siteCatalystReportingSuite is not an object");window.AppMeasurement_Module_DIL=a.m_DIL=
function(a){var b="function"===typeof a.m_i?a.m_i("DIL"):this;if(b!==Object(b))return h("m is not an object");b.trackVars=g.constructTrackVars(d);b.d=0;b.s=a;b._t=function(){var a,b,c=","+this.trackVars+",",d=this.s,e,k=[];e=[];var p={},q=!1;if(d!==Object(d))return h("Error in m._t function: s is not an object");if(this.d){if("function"===typeof d.foreachVar)d.foreachVar(function(a,b){"undefined"!==typeof b&&(p[a]=b,q=!0)},this.trackVars);else{if(!(d.va_t instanceof Array))return h("Error in m._t function: s.va_t is not an array");
if(d.lightProfileID)(a=d.lightTrackVars)&&(a=","+a+","+d.vl_mr+",");else if(d.pe||d.linkType)a=d.linkTrackVars,d.pe&&(b=d.pe.substring(0,1).toUpperCase()+d.pe.substring(1),d[b]&&(a=d[b].trackVars)),a&&(a=","+a+","+d.vl_l+","+d.vl_l2+",");if(a){b=0;for(k=a.split(",");b<k.length;b++)0<=c.indexOf(","+k[b]+",")&&e.push(k[b]);e.length&&(c=","+e.join(",")+",")}e=0;for(b=d.va_t.length;e<b;e++)a=d.va_t[e],0<=c.indexOf(","+a+",")&&"undefined"!==typeof d[a]&&null!==d[a]&&""!==d[a]&&(p[a]=d[a],q=!0)}g.includeContextData(d,
p).store_populated&&(q=!0);q&&this.d.api.signals(p,"c_").submit()}}};a.loadModule("DIL");a.DIL.d=c;return e.message?e.message:"DIL.modules.siteCatalyst.init() completed with no errors"}catch(k){return this.handle(k,"DIL.modules.siteCatalyst.init() caught error with message ",this.dil)}},constructTrackVars:function(a){var c=[],d,b,g,e,h;if(a===Object(a)){d=a.names;if(d instanceof Array&&(g=d.length))for(b=0;b<g;b++)e=d[b],"string"===typeof e&&e.length&&c.push(e);a=a.iteratedNames;if(a instanceof Array&&
(g=a.length))for(b=0;b<g;b++)if(d=a[b],d===Object(d)&&(e=d.name,h=parseInt(d.maxIndex,10),"string"===typeof e&&e.length&&!isNaN(h)&&0<=h))for(d=0;d<=h;d++)c.push(e+d);if(c.length)return c.join(",")}return this.constructTrackVars({names:"pageName channel campaign products events pe pev1 pev2 pev3".split(" "),iteratedNames:[{name:"prop",maxIndex:75},{name:"eVar",maxIndex:250}]})},includeContextData:function(a,c){var d={},b=!1;if(a.contextData===Object(a.contextData)){var g=a.contextData,e=this.options.replaceContextDataPeriodsWith,
h=this.options.filterFromContextVariables,k={},q,p,n,l;"string"===typeof e&&e.length||(e="_");if(h instanceof Array)for(q=0,p=h.length;q<p;q++)n=h[q],this.dil.validators.isPopulatedString(n)&&(k[n]=!0);for(l in g)!g.hasOwnProperty(l)||k[l]||!(h=g[l])&&"number"!==typeof h||(l=("contextData."+l).replace(/\./g,e),c[l]=h,b=!0)}d.store_populated=b;return d}};
DIL.modules.GA={dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,signals:{},hasSignals:!1,handle:DIL.modules.helpers.handleModuleError,init:function(a,c,d){try{this.tv=this.arr=this.dil=null;this.errorMessage="";this.signals={};this.hasSignals=!1;var b={name:"DIL GA Module Error"},g="";c instanceof DIL?(this.dil=c,b.partner=this.dil.api.getPartner()):(g="dilInstance is not a valid instance of DIL",
b.message=g,DIL.errorModule.handleError(b));a instanceof Array&&a.length?this.arr=a:(g="gaArray is not an array or is empty",b.message=g,DIL.errorModule.handleError(b));this.tv=this.constructTrackVars(d);this.errorMessage=g}catch(e){this.handle(e,"DIL.modules.GA.init() caught error with message ",this.dil)}finally{return this}},constructTrackVars:function(a){var c=[],d,b,g,e;if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){g=this.defaultTrackVars;e={};d=0;for(b=g.length;d<b;d++)e[g[d]]=
!0;this.defaultTrackVarsObj=e}else e=this.defaultTrackVarsObj;if(a===Object(a)){a=a.names;if(a instanceof Array&&(b=a.length))for(d=0;d<b;d++)g=a[d],"string"===typeof g&&g.length&&g in e&&c.push(g);if(c.length)return c}return this.defaultTrackVars},constructGAObj:function(a){var c={};a=a instanceof Array?a:this.arr;var d,b,g,e;d=0;for(b=a.length;d<b;d++)g=a[d],g instanceof Array&&g.length&&(g=[],e=a[d],g instanceof Array&&e instanceof Array&&Array.prototype.push.apply(g,e),e=g.shift(),"string"===
typeof e&&e.length&&(c[e]instanceof Array||(c[e]=[]),c[e].push(g)));return c},addToSignals:function(a,c){if("string"!==typeof a||""===a||null==c||""===c)return!1;this.signals[a]instanceof Array||(this.signals[a]=[]);this.signals[a].push(c);return this.hasSignals=!0},constructSignals:function(){var a=this.constructGAObj(),c={_setAccount:function(a){this.addToSignals("c_accountId",a)},_setCustomVar:function(a,b,c){"string"===typeof b&&b.length&&this.addToSignals("c_"+b,c)},_addItem:function(a,b,c,d,
e,g){this.addToSignals("c_itemOrderId",a);this.addToSignals("c_itemSku",b);this.addToSignals("c_itemName",c);this.addToSignals("c_itemCategory",d);this.addToSignals("c_itemPrice",e);this.addToSignals("c_itemQuantity",g)},_addTrans:function(a,b,c,d,e,g,h,k){this.addToSignals("c_transOrderId",a);this.addToSignals("c_transAffiliation",b);this.addToSignals("c_transTotal",c);this.addToSignals("c_transTax",d);this.addToSignals("c_transShipping",e);this.addToSignals("c_transCity",g);this.addToSignals("c_transState",
h);this.addToSignals("c_transCountry",k)},_trackSocial:function(a,b,c,d){this.addToSignals("c_socialNetwork",a);this.addToSignals("c_socialAction",b);this.addToSignals("c_socialTarget",c);this.addToSignals("c_socialPagePath",d)}},d=this.tv,b,g,e,h,k,q;b=0;for(g=d.length;b<g;b++)if(e=d[b],a.hasOwnProperty(e)&&c.hasOwnProperty(e)&&(q=a[e],q instanceof Array))for(h=0,k=q.length;h<k;h++)c[e].apply(this,q[h])},submit:function(){try{if(""!==this.errorMessage)return this.errorMessage;this.constructSignals();
return this.hasSignals?(this.dil.api.signals(this.signals).submit(),"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,"=",!0)+this.dil.log):"No signals present"}catch(a){return this.handle(a,"DIL.modules.GA.submit() caught error with message ",this.dil)}},Stuffer:{LIMIT:5,dil:null,cookieName:null,delimiter:null,errorMessage:"",handle:DIL.modules.helpers.handleModuleError,callback:null,v:function(){return!1},init:function(a,c,d){try{this.callback=this.dil=null,this.errorMessage=
"",a instanceof DIL?(this.dil=a,this.v=this.dil.validators.isPopulatedString,this.cookieName=this.v(c)?c:"aam_ga",this.delimiter=this.v(d)?d:"|"):this.handle({message:"dilInstance is not a valid instance of DIL"},"DIL.modules.GA.Stuffer.init() error: ")}catch(b){this.handle(b,"DIL.modules.GA.Stuffer.init() caught error with message ",this.dil)}finally{return this}},process:function(a){var c,d,b,g,e,h;h=!1;var k=1;if(a===Object(a)&&(c=a.stuff)&&c instanceof Array&&(d=c.length))for(a=0;a<d;a++)if((b=
c[a])&&b===Object(b)&&(g=b.cn,e=b.cv,g===this.cookieName&&this.v(e))){h=!0;break}if(h){c=e.split(this.delimiter);"undefined"===typeof window._gaq&&(window._gaq=[]);b=window._gaq;a=0;for(d=c.length;a<d&&!(h=c[a].split("="),e=h[0],h=h[1],this.v(e)&&this.v(h)&&b.push(["_setCustomVar",k++,e,h,1]),k>this.LIMIT);a++);this.errorMessage=1<k?"No errors - stuffing successful":"No valid values to stuff"}else this.errorMessage="Cookie name and value not found in json";if("function"===typeof this.callback)return this.callback()},
submit:function(){try{var a=this;if(""!==this.errorMessage)return this.errorMessage;this.dil.api.afterResult(function(c){a.process(c)}).submit();return"DIL.modules.GA.Stuffer.submit() successful"}catch(c){return this.handle(c,"DIL.modules.GA.Stuffer.submit() caught error with message ",this.dil)}}}};
DIL.modules.Peer39={aid:"",dil:null,optionals:null,errorMessage:"",calledBack:!1,script:null,scriptsSent:[],returnedData:[],handle:DIL.modules.helpers.handleModuleError,init:function(a,c,d){try{this.dil=null;this.errorMessage="";this.calledBack=!1;this.optionals=d===Object(d)?d:{};d={name:"DIL Peer39 Module Error"};var b=[],g="";this.isSecurePageButNotEnabled(document.location.protocol)&&(g="Module has not been enabled for a secure page",b.push(g),d.message=g,DIL.errorModule.handleError(d));c instanceof
DIL?(this.dil=c,d.partner=this.dil.api.getPartner()):(g="dilInstance is not a valid instance of DIL",b.push(g),d.message=g,DIL.errorModule.handleError(d));"string"===typeof a&&a.length?this.aid=a:(g="aid is not a string or is empty",b.push(g),d.message=g,DIL.errorModule.handleError(d));this.errorMessage=b.join("\n")}catch(e){this.handle(e,"DIL.modules.Peer39.init() caught error with message ",this.dil)}finally{return this}},isSecurePageButNotEnabled:function(a){return"https:"===a&&!0!==this.optionals.enableHTTPS?
!0:!1},constructSignals:function(){var a=this,c=this.constructScript(),d=DIL.variables.scriptNodeList[0];window["afterFinished_"+this.aid]=function(){try{var b=a.processData(p39_KVP_Short("c_p","|").split("|"));b.hasSignals&&a.dil.api.signals(b.signals).submit()}catch(c){}finally{a.calledBack=!0,"function"===typeof a.optionals.afterResult&&a.optionals.afterResult()}};d.parentNode.insertBefore(c,d);this.scriptsSent.push(c);return"Request sent to Peer39"},processData:function(a){var c,d,b,g,e={},h=
!1;this.returnedData.push(a);if(a instanceof Array)for(c=0,d=a.length;c<d;c++)b=a[c].split("="),g=b[0],b=b[1],g&&isFinite(b)&&!isNaN(parseInt(b,10))&&(e[g]instanceof Array||(e[g]=[]),e[g].push(b),h=!0);return{hasSignals:h,signals:e}},constructScript:function(){var a=document.createElement("script"),c=this.optionals,d=c.scriptId,b=c.scriptSrc,c=c.scriptParams;a.id="string"===typeof d&&d.length?d:"peer39ScriptLoader";a.type="text/javascript";"string"===typeof b&&b.length?a.src=b:(a.src=(this.dil.constants.IS_HTTPS?
"https:":"http:")+"//stags.peer39.net/"+this.aid+"/trg_"+this.aid+".js","string"===typeof c&&c.length&&(a.src+="?"+c));return a},submit:function(){try{return""!==this.errorMessage?this.errorMessage:this.constructSignals()}catch(a){return this.handle(a,"DIL.modules.Peer39.submit() caught error with message ",this.dil)}}};
/*Get the in Site Catalyst object instance. This is done by using the s_account variable or similar*/
var _scObj = s_gi(s.account);
/* create instance of DIL*/
var scDil = DIL.create({
    partner : "condenast",
    uuidCookie:{
     name:'aam_uuid',
     days:30
     }
    });

//SC ID sync    
    var sc = false;
    if (typeof condeDIL != 'undefined') {
        sc = condeDIL.helpers.getCookie("s_vi");
    }
    if (sc) {
        sc = sc.split("|")[1].split("[")[0];
        condeDIL.api.aamIdSync({
            dpid: '772',
            dpuuid: sc,
            minutesToLive: 20160
        });
    };

    //Prop 52 ID sync
    var prop = s.prop52;
    if (prop) {
        condeDIL.api.aamIdSync({
            dpid: '544',
            dpuuid: prop,
            minutesToLive: 20160
        });
    };
/*Pass the dil Instance and SC instance to this module*/
DIL.modules.siteCatalyst.init(_scObj, scDil);


/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

 AppMeasurement for JavaScript version: 1.4.1
 Copyright 1996-2013 Adobe, Inc. All Rights Reserved
 More info available at http://www.omniture.com
*/
function AppMeasurement() {
    var s = this;
    s.version = "1.4.1";
    var w = window;
    if (!w.s_c_in) w.s_c_il = [], w.s_c_in = 0;
    s._il = w.s_c_il;
    s._in = w.s_c_in;
    s._il[s._in] = s;
    w.s_c_in++;
    s._c = "s_c";
    var k = w.sb;
    k || (k = null);
    var m = w,
        i, o;
    try {
        i = m.parent;
        for (o = m.location; i && i.location && o && "" + i.location != "" + o && m.location && "" + i.location != "" + m.location && i.location.host == o.host;) m = i, i = m.parent
    } catch (p) {}
    s.eb = function(s) {
        try {
            console.log(s)
        } catch (a) {}
    };
    s.ta = function(s) {
        return "" + parseInt(s) == "" + s
    };
    s.replace = function(s, a, c) {
        if (!s || s.indexOf(a) <
            0) return s;
        return s.split(a).join(c)
    };
    s.escape = function(b) {
        var a, c;
        if (!b) return b;
        b = encodeURIComponent(b);
        for (a = 0; a < 7; a++) c = "+~!*()'".substring(a, a + 1), b.indexOf(c) >= 0 && (b = s.replace(b, c, "%" + c.charCodeAt(0).toString(16).toUpperCase()));
        return b
    };
    s.unescape = function(b) {
        if (!b) return b;
        b = b.indexOf("+") >= 0 ? s.replace(b, "+", " ") : b;
        try {
            return decodeURIComponent(b)
        } catch (a) {}
        return unescape(b)
    };
    s.Va = function() {
        var b = w.location.hostname,
            a = s.fpCookieDomainPeriods,
            c;
        if (!a) a = s.cookieDomainPeriods;
        if (b && !s.cookieDomain &&
            !/^[0-9.]+$/.test(b) && (a = a ? parseInt(a) : 2, a = a > 2 ? a : 2, c = b.lastIndexOf("."), c >= 0)) {
            for (; c >= 0 && a > 1;) c = b.lastIndexOf(".", c - 1), a--;
            s.cookieDomain = c > 0 ? b.substring(c) : b
        }
        return s.cookieDomain
    };
    s.c_r = s.cookieRead = function(b) {
        b = s.escape(b);
        var a = " " + s.d.cookie,
            c = a.indexOf(" " + b + "="),
            e = c < 0 ? c : a.indexOf(";", c);
        b = c < 0 ? "" : s.unescape(a.substring(c + 2 + b.length, e < 0 ? a.length : e));
        return b != "[[B]]" ? b : ""
    };
    s.c_w = s.cookieWrite = function(b, a, c) {
        var e = s.Va(),
            d = s.cookieLifetime,
            f;
        a = "" + a;
        d = d ? ("" + d).toUpperCase() : "";
        c && d != "SESSION" &&
            d != "NONE" && ((f = a != "" ? parseInt(d ? d : 0) : -60) ? (c = new Date, c.setTime(c.getTime() + f * 1E3)) : c == 1 && (c = new Date, f = c.getYear(), c.setYear(f + 5 + (f < 1900 ? 1900 : 0))));
        if (b && d != "NONE") return s.d.cookie = b + "=" + s.escape(a != "" ? a : "[[B]]") + "; path=/;" + (c && d != "SESSION" ? " expires=" + c.toGMTString() + ";" : "") + (e ? " domain=" + e + ";" : ""), s.cookieRead(b) == a;
        return 0
    };
    s.C = [];
    s.B = function(b, a, c) {
        if (s.ma) return 0;
        if (!s.maxDelay) s.maxDelay = 250;
        var e = 0,
            d = (new Date).getTime() + s.maxDelay,
            f = s.d.qb,
            g = ["webkitvisibilitychange", "visibilitychange"];
        if (!f) f = s.d.rb;
        if (f && f == "prerender") {
            if (!s.X) {
                s.X = 1;
                for (c = 0; c < g.length; c++) s.d.addEventListener(g[c], function() {
                    var a = s.d.qb;
                    if (!a) a = s.d.rb;
                    if (a == "visible") s.X = 0, s.delayReady()
                })
            }
            e = 1;
            d = 0
        } else c || s.q("_d") && (e = 1);
        e && (s.C.push({
            m: b,
            a: a,
            t: d
        }), s.X || setTimeout(s.delayReady, s.maxDelay));
        return e
    };
    s.delayReady = function() {
        var b = (new Date).getTime(),
            a = 0,
            c;
        for (s.q("_d") && (a = 1); s.C.length > 0;) {
            c = s.C.shift();
            if (a && !c.t && c.t > b) {
                s.C.unshift(c);
                setTimeout(s.delayReady, parseInt(s.maxDelay / 2));
                break
            }
            s.ma = 1;
            s[c.m].apply(s,
                c.a);
            s.ma = 0
        }
    };
    s.setAccount = s.sa = function(b) {
        var a, c;
        if (!s.B("setAccount", arguments))
            if (s.account = b, s.allAccounts) {
                a = s.allAccounts.concat(b.split(","));
                s.allAccounts = [];
                a.sort();
                for (c = 0; c < a.length; c++)(c == 0 || a[c - 1] != a[c]) && s.allAccounts.push(a[c])
            } else s.allAccounts = b.split(",")
    };
    s.foreachVar = function(b, a) {
        var c, e, d, f, g = "";
        d = e = "";
        if (s.lightProfileID) c = s.H, (g = s.lightTrackVars) && (g = "," + g + "," + s.ba.join(",") + ",");
        else {
            c = s.c;
            if (s.pe || s.linkType)
                if (g = s.linkTrackVars, e = s.linkTrackEvents, s.pe && (d = s.pe.substring(0,
                        1).toUpperCase() + s.pe.substring(1), s[d])) g = s[d].pb, e = s[d].ob;
            g && (g = "," + g + "," + s.z.join(",") + ",");
            e && g && (g += ",events,")
        }
        a && (a = "," + a + ",");
        for (e = 0; e < c.length; e++) d = c[e], (f = s[d]) && (!g || g.indexOf("," + d + ",") >= 0) && (!a || a.indexOf("," + d + ",") >= 0) && b(d, f)
    };
    s.J = function(b, a, c, e, d) {
        var f = "",
            g, j, w, q, i = 0;
        b == "contextData" && (b = "c");
        if (a) {
            for (g in a)
                if (!Object.prototype[g] && (!d || g.substring(0, d.length) == d) && a[g] && (!c || c.indexOf("," + (e ? e + "." : "") + g + ",") >= 0)) {
                    w = !1;
                    if (i)
                        for (j = 0; j < i.length; j++) g.substring(0, i[j].length) ==
                            i[j] && (w = !0);
                    if (!w && (f == "" && (f += "&" + b + "."), j = a[g], d && (g = g.substring(d.length)), g.length > 0))
                        if (w = g.indexOf("."), w > 0) j = g.substring(0, w), w = (d ? d : "") + j + ".", i || (i = []), i.push(w), f += s.J(j, a, c, e, w);
                        else if (typeof j == "boolean" && (j = j ? "true" : "false"), j) {
                        if (e == "retrieveLightData" && d.indexOf(".contextData.") < 0) switch (w = g.substring(0, 4), q = g.substring(4), g) {
                            case "transactionID":
                                g = "xact";
                                break;
                            case "channel":
                                g = "ch";
                                break;
                            case "campaign":
                                g = "v0";
                                break;
                            default:
                                s.ta(q) && (w == "prop" ? g = "c" + q : w == "eVar" ? g = "v" + q : w == "list" ?
                                    g = "l" + q : w == "hier" && (g = "h" + q, j = j.substring(0, 255)))
                        }
                        f += "&" + s.escape(g) + "=" + s.escape(j)
                    }
                }
            f != "" && (f += "&." + b)
        }
        return f
    };
    s.Xa = function() {
        var b = "",
            a, c, e, d, f, g, j, w, i = "",
            k = "",
            m = c = "";
        if (s.lightProfileID) a = s.H, (i = s.lightTrackVars) && (i = "," + i + "," + s.ba.join(",") + ",");
        else {
            a = s.c;
            if (s.pe || s.linkType)
                if (i = s.linkTrackVars, k = s.linkTrackEvents, s.pe && (c = s.pe.substring(0, 1).toUpperCase() + s.pe.substring(1), s[c])) i = s[c].pb, k = s[c].ob;
            i && (i = "," + i + "," + s.z.join(",") + ",");
            k && (k = "," + k + ",", i && (i += ",events,"));
            s.events2 && (m += (m !=
                "" ? "," : "") + s.events2)
        }
        s.AudienceManagement && s.AudienceManagement.isReady() && (b += s.J("d", s.AudienceManagement.getEventCallConfigParams()));
        for (c = 0; c < a.length; c++) {
            d = a[c];
            f = s[d];
            e = d.substring(0, 4);
            g = d.substring(4);
            !f && d == "events" && m && (f = m, m = "");
            if (f && (!i || i.indexOf("," + d + ",") >= 0)) {
                switch (d) {
                    case "supplementalDataID":
                        d = "sdid";
                        break;
                    case "timestamp":
                        d = "ts";
                        break;
                    case "dynamicVariablePrefix":
                        d = "D";
                        break;
                    case "visitorID":
                        d = "vid";
                        break;
                    case "marketingCloudVisitorID":
                        d = "mid";
                        break;
                    case "analyticsVisitorID":
                        d =
                            "aid";
                        break;
                    case "audienceManagerLocationHint":
                        d = "aamlh";
                        break;
                    case "audienceManagerBlob":
                        d = "aamb";
                        break;
                    case "authState":
                        d = "as";
                        break;
                    case "pageURL":
                        d = "g";
                        if (f.length > 255) s.pageURLRest = f.substring(255), f = f.substring(0, 255);
                        break;
                    case "pageURLRest":
                        d = "-g";
                        break;
                    case "referrer":
                        d = "r";
                        break;
                    case "vmk":
                    case "visitorMigrationKey":
                        d = "vmt";
                        break;
                    case "visitorMigrationServer":
                        d = "vmf";
                        s.ssl && s.visitorMigrationServerSecure && (f = "");
                        break;
                    case "visitorMigrationServerSecure":
                        d = "vmf";
                        !s.ssl && s.visitorMigrationServer &&
                            (f = "");
                        break;
                    case "charSet":
                        d = "ce";
                        break;
                    case "visitorNamespace":
                        d = "ns";
                        break;
                    case "cookieDomainPeriods":
                        d = "cdp";
                        break;
                    case "cookieLifetime":
                        d = "cl";
                        break;
                    case "variableProvider":
                        d = "vvp";
                        break;
                    case "currencyCode":
                        d = "cc";
                        break;
                    case "channel":
                        d = "ch";
                        break;
                    case "transactionID":
                        d = "xact";
                        break;
                    case "campaign":
                        d = "v0";
                        break;
                    case "latitude":
                        d = "lat";
                        break;
                    case "longitude":
                        d = "lon";
                        break;
                    case "resolution":
                        d = "s";
                        break;
                    case "colorDepth":
                        d = "c";
                        break;
                    case "javascriptVersion":
                        d = "j";
                        break;
                    case "javaEnabled":
                        d = "v";
                        break;
                    case "cookiesEnabled":
                        d = "k";
                        break;
                    case "browserWidth":
                        d = "bw";
                        break;
                    case "browserHeight":
                        d = "bh";
                        break;
                    case "connectionType":
                        d = "ct";
                        break;
                    case "homepage":
                        d = "hp";
                        break;
                    case "events":
                        m && (f += (f != "" ? "," : "") + m);
                        if (k) {
                            g = f.split(",");
                            f = "";
                            for (e = 0; e < g.length; e++) j = g[e], w = j.indexOf("="), w >= 0 && (j = j.substring(0, w)), w = j.indexOf(":"), w >= 0 && (j = j.substring(0, w)), k.indexOf("," + j + ",") >= 0 && (f += (f ? "," : "") + g[e])
                        }
                        break;
                    case "events2":
                        f = "";
                        break;
                    case "contextData":
                        b += s.J("c", s[d], i, d);
                        f = "";
                        break;
                    case "lightProfileID":
                        d =
                            "mtp";
                        break;
                    case "lightStoreForSeconds":
                        d = "mtss";
                        s.lightProfileID || (f = "");
                        break;
                    case "lightIncrementBy":
                        d = "mti";
                        s.lightProfileID || (f = "");
                        break;
                    case "retrieveLightProfiles":
                        d = "mtsr";
                        break;
                    case "deleteLightProfiles":
                        d = "mtsd";
                        break;
                    case "retrieveLightData":
                        s.retrieveLightProfiles && (b += s.J("mts", s[d], i, d));
                        f = "";
                        break;
                    default:
                        s.ta(g) && (e == "prop" ? d = "c" + g : e == "eVar" ? d = "v" + g : e == "list" ? d = "l" + g : e == "hier" && (d = "h" + g, f = f.substring(0, 255)))
                }
                f && (b += "&" + d + "=" + (d.substring(0, 3) != "pev" ? s.escape(f) : f))
            }
            d == "pev3" && s.g &&
                (b += s.g)
        }
        return b
    };
    s.u = function(s) {
        var a = s.tagName;
        if ("" + s.wb != "undefined" || "" + s.ib != "undefined" && ("" + s.ib).toUpperCase() != "HTML") return "";
        a = a && a.toUpperCase ? a.toUpperCase() : "";
        a == "SHAPE" && (a = "");
        a && ((a == "INPUT" || a == "BUTTON") && s.type && s.type.toUpperCase ? a = s.type.toUpperCase() : !a && s.href && (a = "A"));
        return a
    };
    s.oa = function(s) {
        var a = s.href ? s.href : "",
            c, e, d;
        c = a.indexOf(":");
        e = a.indexOf("?");
        d = a.indexOf("/");
        if (a && (c < 0 || e >= 0 && c > e || d >= 0 && c > d)) e = s.protocol && s.protocol.length > 1 ? s.protocol : l.protocol ? l.protocol :
            "", c = l.pathname.lastIndexOf("/"), a = (e ? e + "//" : "") + (s.host ? s.host : l.host ? l.host : "") + (h.substring(0, 1) != "/" ? l.pathname.substring(0, c < 0 ? 0 : c) + "/" : "") + a;
        return a
    };
    s.D = function(b) {
        var a = s.u(b),
            c, e, d = "",
            f = 0;
        if (a) {
            c = b.protocol;
            e = b.onclick;
            if (b.href && (a == "A" || a == "AREA") && (!e || !c || c.toLowerCase().indexOf("javascript") < 0)) d = s.oa(b);
            else if (e) d = s.replace(s.replace(s.replace(s.replace("" + e, "\r", ""), "\n", ""), "\t", ""), " ", ""), f = 2;
            else if (a == "INPUT" || a == "SUBMIT") {
                if (b.value) d = b.value;
                else if (b.innerText) d = b.innerText;
                else if (b.textContent) d = b.textContent;
                f = 3
            } else if (b.src && a == "IMAGE") d = b.src;
            if (d) return {
                id: d.substring(0, 100),
                type: f
            }
        }
        return 0
    };
    s.tb = function(b) {
        for (var a = s.u(b), c = s.D(b); b && !c && a != "BODY";)
            if (b = b.parentElement ? b.parentElement : b.parentNode) a = s.u(b), c = s.D(b);
        if (!c || a == "BODY") b = 0;
        if (b && (a = b.onclick ? "" + b.onclick : "", a.indexOf(".tl(") >= 0 || a.indexOf(".trackLink(") >= 0)) b = 0;
        return b
    };
    s.hb = function() {
        var b, a, c = s.linkObject,
            e = s.linkType,
            d = s.linkURL,
            f, g;
        s.ca = 1;
        if (!c) s.ca = 0, c = s.clickObject;
        if (c) {
            b = s.u(c);
            for (a =
                s.D(c); c && !a && b != "BODY";)
                if (c = c.parentElement ? c.parentElement : c.parentNode) b = s.u(c), a = s.D(c);
            if (!a || b == "BODY") c = 0;
            if (c) {
                var j = c.onclick ? "" + c.onclick : "";
                if (j.indexOf(".tl(") >= 0 || j.indexOf(".trackLink(") >= 0) c = 0
            }
        } else s.ca = 1;
        !d && c && (d = s.oa(c));
        d && !s.linkLeaveQueryString && (f = d.indexOf("?"), f >= 0 && (d = d.substring(0, f)));
        if (!e && d) {
            var i = 0,
                k = 0,
                m;
            if (s.trackDownloadLinks && s.linkDownloadFileTypes) {
                j = d.toLowerCase();
                f = j.indexOf("?");
                g = j.indexOf("#");
                f >= 0 ? g >= 0 && g < f && (f = g) : f = g;
                f >= 0 && (j = j.substring(0, f));
                f = s.linkDownloadFileTypes.toLowerCase().split(",");
                for (g = 0; g < f.length; g++)(m = f[g]) && j.substring(j.length - (m.length + 1)) == "." + m && (e = "d")
            }
            if (s.trackExternalLinks && !e && (j = d.toLowerCase(), s.ra(j))) {
                if (!s.linkInternalFilters) s.linkInternalFilters = w.location.hostname;
                f = 0;
                s.linkExternalFilters ? (f = s.linkExternalFilters.toLowerCase().split(","), i = 1) : s.linkInternalFilters && (f = s.linkInternalFilters.toLowerCase().split(","));
                if (f) {
                    for (g = 0; g < f.length; g++) m = f[g], j.indexOf(m) >= 0 && (k = 1);
                    k ? i && (e = "e") : i || (e = "e")
                }
            }
        }
        s.linkObject = c;
        s.linkURL = d;
        s.linkType = e;
        if (s.trackClickMap ||
            s.trackInlineStats)
            if (s.g = "", c) {
                e = s.pageName;
                d = 1;
                c = c.sourceIndex;
                if (!e) e = s.pageURL, d = 0;
                if (w.s_objectID) a.id = w.s_objectID, c = a.type = 1;
                if (e && a && a.id && b) s.g = "&pid=" + s.escape(e.substring(0, 255)) + (d ? "&pidt=" + d : "") + "&oid=" + s.escape(a.id.substring(0, 100)) + (a.type ? "&oidt=" + a.type : "") + "&ot=" + b + (c ? "&oi=" + c : "")
            }
    };
    s.Ya = function() {
        var b = s.ca,
            a = s.linkType,
            c = s.linkURL,
            e = s.linkName;
        if (a && (c || e)) a = a.toLowerCase(), a != "d" && a != "e" && (a = "o"), s.pe = "lnk_" + a, s.pev1 = c ? s.escape(c) : "", s.pev2 = e ? s.escape(e) : "", b = 1;
        s.abort && (b =
            0);
        if (s.trackClickMap || s.trackInlineStats) {
            a = {};
            c = 0;
            var d = s.cookieRead("s_sq"),
                f = d ? d.split("&") : 0,
                g, j, w;
            d = 0;
            if (f)
                for (g = 0; g < f.length; g++) j = f[g].split("="), e = s.unescape(j[0]).split(","), j = s.unescape(j[1]), a[j] = e;
            e = s.account.split(",");
            if (b || s.g) {
                b && !s.g && (d = 1);
                for (j in a)
                    if (!Object.prototype[j])
                        for (g = 0; g < e.length; g++) {
                            d && (w = a[j].join(","), w == s.account && (s.g += (j.charAt(0) != "&" ? "&" : "") + j, a[j] = [], c = 1));
                            for (f = 0; f < a[j].length; f++) w = a[j][f], w == e[g] && (d && (s.g += "&u=" + s.escape(w) + (j.charAt(0) != "&" ? "&" : "") + j +
                                "&u=0"), a[j].splice(f, 1), c = 1)
                        }
                b || (c = 1);
                if (c) {
                    d = "";
                    g = 2;
                    !b && s.g && (d = s.escape(e.join(",")) + "=" + s.escape(s.g), g = 1);
                    for (j in a) !Object.prototype[j] && g > 0 && a[j].length > 0 && (d += (d ? "&" : "") + s.escape(a[j].join(",")) + "=" + s.escape(j), g--);
                    s.cookieWrite("s_sq", d)
                }
            }
        }
        return b
    };
    s.Za = function() {
        if (!s.nb) {
            var b = new Date,
                a = m.location,
                c, e, d = e = c = "",
                f = "",
                g = "",
                w = "1.2",
                i = s.cookieWrite("s_cc", "true", 0) ? "Y" : "N",
                k = "",
                n = "";
            if (b.setUTCDate && (w = "1.3", (0).toPrecision && (w = "1.5", b = [], b.forEach))) {
                w = "1.6";
                e = 0;
                c = {};
                try {
                    e = new Iterator(c),
                        e.next && (w = "1.7", b.reduce && (w = "1.8", w.trim && (w = "1.8.1", Date.parse && (w = "1.8.2", Object.create && (w = "1.8.5")))))
                } catch (o) {}
            }
            c = screen.width + "x" + screen.height;
            d = navigator.javaEnabled() ? "Y" : "N";
            e = screen.pixelDepth ? screen.pixelDepth : screen.colorDepth;
            f = s.w.innerWidth ? s.w.innerWidth : s.d.documentElement.offsetWidth;
            g = s.w.innerHeight ? s.w.innerHeight : s.d.documentElement.offsetHeight;
            try {
                s.b.addBehavior("#default#homePage"), k = s.b.ub(a) ? "Y" : "N"
            } catch (p) {}
            try {
                s.b.addBehavior("#default#clientCaps"), n = s.b.connectionType
            } catch (r) {}
            s.resolution =
                c;
            s.colorDepth = e;
            s.javascriptVersion = w;
            s.javaEnabled = d;
            s.cookiesEnabled = i;
            s.browserWidth = f;
            s.browserHeight = g;
            s.connectionType = n;
            s.homepage = k;
            s.nb = 1
        }
    };
    s.I = {};
    s.loadModule = function(b, a) {
        var c = s.I[b];
        if (!c) {
            c = w["AppMeasurement_Module_" + b] ? new w["AppMeasurement_Module_" + b](s) : {};
            s.I[b] = s[b] = c;
            c.Fa = function() {
                return c.Ja
            };
            c.Ka = function(a) {
                if (c.Ja = a) s[b + "_onLoad"] = a, s.B(b + "_onLoad", [s, c], 1) || a(s, c)
            };
            try {
                Object.defineProperty ? Object.defineProperty(c, "onLoad", {
                    get: c.Fa,
                    set: c.Ka
                }) : c._olc = 1
            } catch (e) {
                c._olc =
                    1
            }
        }
        a && (s[b + "_onLoad"] = a, s.B(b + "_onLoad", [s, c], 1) || a(s, c))
    };
    s.q = function(b) {
        var a, c;
        for (a in s.I)
            if (!Object.prototype[a] && (c = s.I[a])) {
                if (c._olc && c.onLoad) c._olc = 0, c.onLoad(s, c);
                if (c[b] && c[b]()) return 1
            }
        return 0
    };
    s.bb = function() {
        var b = Math.floor(Math.random() * 1E13),
            a = s.visitorSampling,
            c = s.visitorSamplingGroup;
        c = "s_vsn_" + (s.visitorNamespace ? s.visitorNamespace : s.account) + (c ? "_" + c : "");
        var e = s.cookieRead(c);
        if (a) {
            e && (e = parseInt(e));
            if (!e) {
                if (!s.cookieWrite(c, b)) return 0;
                e = b
            }
            if (e % 1E4 > v) return 0
        }
        return 1
    };
    s.K = function(b, a) {
        var c, e, d, f, g, w;
        for (c = 0; c < 2; c++) {
            e = c > 0 ? s.ia : s.c;
            for (d = 0; d < e.length; d++)
                if (f = e[d], (g = b[f]) || b["!" + f]) {
                    if (!a && (f == "contextData" || f == "retrieveLightData") && s[f])
                        for (w in s[f]) g[w] || (g[w] = s[f][w]);
                    s[f] = g
                }
        }
    };
    s.Aa = function(b, a) {
        var c, e, d, f;
        for (c = 0; c < 2; c++) {
            e = c > 0 ? s.ia : s.c;
            for (d = 0; d < e.length; d++) f = e[d], b[f] = s[f], !a && !b[f] && (b["!" + f] = 1)
        }
    };
    s.Ua = function(s) {
        var a, c, e, d, f, g = 0,
            w, i = "",
            k = "";
        if (s && s.length > 255 && (a = "" + s, c = a.indexOf("?"), c > 0 && (w = a.substring(c + 1), a = a.substring(0, c), d = a.toLowerCase(),
                e = 0, d.substring(0, 7) == "http://" ? e += 7 : d.substring(0, 8) == "https://" && (e += 8), c = d.indexOf("/", e), c > 0 && (d = d.substring(e, c), f = a.substring(c), a = a.substring(0, c), d.indexOf("google") >= 0 ? g = ",q,ie,start,search_key,word,kw,cd," : d.indexOf("yahoo.co") >= 0 && (g = ",p,ei,"), g && w)))) {
            if ((s = w.split("&")) && s.length > 1) {
                for (e = 0; e < s.length; e++) d = s[e], c = d.indexOf("="), c > 0 && g.indexOf("," + d.substring(0, c) + ",") >= 0 ? i += (i ? "&" : "") + d : k += (k ? "&" : "") + d;
                i && k ? w = i + "&" + k : k = ""
            }
            c = 253 - (w.length - k.length) - a.length;
            s = a + (c > 0 ? f.substring(0, c) :
                "") + "?" + w
        }
        return s
    };
    s.U = !1;
    s.O = !1;
    s.Ia = function(b) {
        s.marketingCloudVisitorID = b;
        s.O = !0;
        s.k()
    };
    s.R = !1;
    s.L = !1;
    s.Ca = function(b) {
        s.analyticsVisitorID = b;
        s.L = !0;
        s.k()
    };
    s.T = !1;
    s.N = !1;
    s.Ea = function(b) {
        s.audienceManagerLocationHint = b;
        s.N = !0;
        s.k()
    };
    s.S = !1;
    s.M = !1;
    s.Da = function(b) {
        s.audienceManagerBlob = b;
        s.M = !0;
        s.k()
    };
    s.isReadyToTrack = function() {
        var b = !0,
            a = s.visitor;
        if (a && a.isAllowed()) {
            if (!s.U && !s.marketingCloudVisitorID && a.getMarketingCloudVisitorID && (s.U = !0, s.marketingCloudVisitorID = a.getMarketingCloudVisitorID([s,
                    s.Ia
                ]), s.marketingCloudVisitorID)) s.O = !0;
            if (!s.R && !s.analyticsVisitorID && a.getAnalyticsVisitorID && (s.R = !0, s.analyticsVisitorID = a.getAnalyticsVisitorID([s, s.Ca]), s.analyticsVisitorID)) s.L = !0;
            if (!s.T && !s.audienceManagerLocationHint && a.getAudienceManagerLocationHint && (s.T = !0, s.audienceManagerLocationHint = a.getAudienceManagerLocationHint([s, s.Ea]), s.audienceManagerLocationHint)) s.N = !0;
            if (!s.S && !s.audienceManagerBlob && a.getAudienceManagerBlob && (s.S = !0, s.audienceManagerBlob = a.getAudienceManagerBlob([s,
                    s.Da
                ]), s.audienceManagerBlob)) s.M = !0;
            if (s.U && !s.O && !s.marketingCloudVisitorID || s.R && !s.L && !s.analyticsVisitorID || s.T && !s.N && !s.audienceManagerLocationHint || s.S && !s.M && !s.audienceManagerBlob) b = !1
        }
        return b
    };
    s.j = k;
    s.l = 0;
    s.callbackWhenReadyToTrack = function(b, a, c) {
        var e;
        e = {};
        e.Oa = b;
        e.Na = a;
        e.La = c;
        if (s.j == k) s.j = [];
        s.j.push(e);
        if (s.l == 0) s.l = setInterval(s.k, 100)
    };
    s.k = function() {
        var b;
        if (s.isReadyToTrack()) {
            if (s.l) clearInterval(s.l), s.l = 0;
            if (s.j != k)
                for (; s.j.length > 0;) b = s.j.shift(), b.Na.apply(b.Oa, b.La)
        }
    };
    s.Ga =
        function(b) {
            var a, c, e = k,
                d = k;
            if (!s.isReadyToTrack()) {
                a = [];
                if (b != k)
                    for (c in e = {}, b) e[c] = b[c];
                d = {};
                s.Aa(d, !0);
                a.push(e);
                a.push(d);
                s.callbackWhenReadyToTrack(s, s.track, a);
                return !0
            }
            return !1
        };
    s.Wa = function() {
        var b = s.cookieRead("s_fid"),
            a = "",
            c = "",
            e;
        e = 8;
        var d = 4;
        if (!b || b.indexOf("-") < 0) {
            for (b = 0; b < 16; b++) e = Math.floor(Math.random() * e), a += "0123456789ABCDEF".substring(e, e + 1), e = Math.floor(Math.random() * d), c += "0123456789ABCDEF".substring(e, e + 1), e = d = 16;
            b = a + "-" + c
        }
        s.cookieWrite("s_fid", b, 1) || (b = 0);
        return b
    };
    s.t = s.track =
        function(b, a) {
            var c, e = new Date,
                d = "s" + Math.floor(e.getTime() / 108E5) % 10 + Math.floor(Math.random() * 1E13),
                f = e.getYear();
            f = "t=" + s.escape(e.getDate() + "/" + e.getMonth() + "/" + (f < 1900 ? f + 1900 : f) + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds() + " " + e.getDay() + " " + e.getTimezoneOffset());
            if (s.visitor) {
                if (s.visitor.getAuthState) s.authState = s.visitor.getAuthState();
                if (!s.supplementalDataID && s.visitor.getSupplementalDataID) s.supplementalDataID = s.visitor.getSupplementalDataID("AppMeasurement:" + s._in, s.expectSupplementalData ?
                    !1 : !0)
            }
            s.q("_s");
            if (!s.B("track", arguments)) {
                if (!s.Ga(b)) {
                    a && s.K(a);
                    b && (c = {}, s.Aa(c, 0), s.K(b));
                    if (s.bb()) {
                        if (!s.analyticsVisitorID && !s.marketingCloudVisitorID) s.fid = s.Wa();
                        s.hb();
                        s.usePlugins && s.doPlugins && s.doPlugins(s);
                        if (s.account) {
                            if (!s.abort) {
                                if (s.trackOffline && !s.timestamp) s.timestamp = Math.floor(e.getTime() / 1E3);
                                e = w.location;
                                if (!s.pageURL) s.pageURL = e.href ? e.href : e;
                                if (!s.referrer && !s.Ba) s.referrer = m.document.referrer, s.Ba = 1;
                                s.referrer = s.Ua(s.referrer);
                                s.q("_g")
                            }
                            if (s.Ya() && !s.abort) s.Za(), f +=
                                s.Xa(), s.gb(d, f), s.q("_t"), s.referrer = ""
                        }
                    }
                    b && s.K(c, 1)
                }
                s.abort = s.supplementalDataID = s.timestamp = s.pageURLRest = s.linkObject = s.clickObject = s.linkURL = s.linkName = s.linkType = w.vb = s.pe = s.pev1 = s.pev2 = s.pev3 = s.g = 0
            }
        };
    s.tl = s.trackLink = function(b, a, c, e, d) {
        s.linkObject = b;
        s.linkType = a;
        s.linkName = c;
        if (d) s.i = b, s.p = d;
        return s.track(e)
    };
    s.trackLight = function(b, a, c, e) {
        s.lightProfileID = b;
        s.lightStoreForSeconds = a;
        s.lightIncrementBy = c;
        return s.track(e)
    };
    s.clearVars = function() {
        var b, a;
        for (b = 0; b < s.c.length; b++)
            if (a = s.c[b],
                a.substring(0, 4) == "prop" || a.substring(0, 4) == "eVar" || a.substring(0, 4) == "hier" || a.substring(0, 4) == "list" || a == "channel" || a == "events" || a == "eventList" || a == "products" || a == "productList" || a == "purchaseID" || a == "transactionID" || a == "state" || a == "zip" || a == "campaign") s[a] = void 0
    };
    s.tagContainerMarker = "";
    s.gb = function(b, a) {
        var c, e = s.trackingServer;
        c = "";
        var d = s.dc,
            f = "sc.",
            w = s.visitorNamespace;
        if (e) {
            if (s.trackingServerSecure && s.ssl) e = s.trackingServerSecure
        } else {
            if (!w) w = s.account, e = w.indexOf(","), e >= 0 && (w = w.substring(0,
                e)), w = w.replace(/[^A-Za-z0-9]/g, "");
            c || (c = "2o7.net");
            d = d ? ("" + d).toLowerCase() : "d1";
            c == "2o7.net" && (d == "d1" ? d = "112" : d == "d2" && (d = "122"), f = "");
            e = w + "." + d + "." + f + c
        }
        c = s.ssl ? "https://" : "http://";
        d = s.AudienceManagement && s.AudienceManagement.isReady();
        c += e + "/b/ss/" + s.account + "/" + (s.mobile ? "5." : "") + (d ? "10" : "1") + "/JS-" + s.version + (s.mb ? "T" : "") + (s.tagContainerMarker ? "-" + s.tagContainerMarker : "") + "/" + b + "?AQB=1&ndh=1&pf=1&" + (d ? "callback=s_c_il[" + s._in + "].AudienceManagement.passData&" : "") + a + "&AQE=1";
        s.Sa(c);
        s.Y()
    };
    s.Sa = function(b) {
        s.e || s.$a();
        s.e.push(b);
        s.aa = s.r();
        s.za()
    };
    s.$a = function() {
        s.e = s.cb();
        if (!s.e) s.e = []
    };
    s.cb = function() {
        var b, a;
        if (s.fa()) {
            try {
                (a = w.localStorage.getItem(s.da())) && (b = w.JSON.parse(a))
            } catch (c) {}
            return b
        }
    };
    s.fa = function() {
        var b = !0;
        if (!s.trackOffline || !s.offlineFilename || !w.localStorage || !w.JSON) b = !1;
        return b
    };
    s.pa = function() {
        var b = 0;
        if (s.e) b = s.e.length;
        s.v && b++;
        return b
    };
    s.Y = function() {
        if (!s.v)
            if (s.qa = k, s.ea) s.aa > s.G && s.xa(s.e), s.ha(500);
            else {
                var b = s.Ma();
                if (b > 0) s.ha(b);
                else if (b = s.na()) s.v =
                    1, s.fb(b), s.jb(b)
            }
    };
    s.ha = function(b) {
        if (!s.qa) b || (b = 0), s.qa = setTimeout(s.Y, b)
    };
    s.Ma = function() {
        var b;
        if (!s.trackOffline || s.offlineThrottleDelay <= 0) return 0;
        b = s.r() - s.wa;
        if (s.offlineThrottleDelay < b) return 0;
        return s.offlineThrottleDelay - b
    };
    s.na = function() {
        if (s.e.length > 0) return s.e.shift()
    };
    s.fb = function(b) {
        if (s.debugTracking) {
            var a = "AppMeasurement Debug: " + b;
            b = b.split("&");
            var c;
            for (c = 0; c < b.length; c++) a += "\n\t" + s.unescape(b[c]);
            s.eb(a)
        }
    };
    s.Ha = function() {
        return s.marketingCloudVisitorID || s.analyticsVisitorID
    };
    s.Q = !1;
    var n;
    try {
        n = JSON.parse('{"x":"y"}')
    } catch (r) {
        n = null
    }
    n && n.x == "y" ? (s.Q = !0, s.P = function(s) {
        return JSON.parse(s)
    }) : w.$ && w.$.parseJSON ? (s.P = function(s) {
        return w.$.parseJSON(s)
    }, s.Q = !0) : s.P = function() {
        return null
    };
    s.jb = function(b) {
        var a, c, e;
        if (s.Ha() && b.length > 2047 && (typeof XMLHttpRequest != "undefined" && (a = new XMLHttpRequest, "withCredentials" in a ? c = 1 : a = 0), !a && typeof XDomainRequest != "undefined" && (a = new XDomainRequest, c = 2), a && s.AudienceManagement && s.AudienceManagement.isReady())) s.Q ? a.ja = !0 : a = 0;
        !a &&
            s.ab && (b = b.substring(0, 2047));
        if (!a && s.d.createElement && s.AudienceManagement && s.AudienceManagement.isReady() && (a = s.d.createElement("SCRIPT")) && "async" in a)(e = (e = s.d.getElementsByTagName("HEAD")) && e[0] ? e[0] : s.d.body) ? (a.type = "text/javascript", a.setAttribute("async", "async"), c = 3) : a = 0;
        if (!a) a = new Image, a.alt = "";
        a.la = function() {
            try {
                if (s.ga) clearTimeout(s.ga), s.ga = 0;
                if (a.timeout) clearTimeout(a.timeout), a.timeout = 0
            } catch (b) {}
        };
        a.onload = a.lb = function() {
            a.la();
            s.Ra();
            s.V();
            s.v = 0;
            s.Y();
            if (a.ja) {
                a.ja = !1;
                try {
                    var b =
                        s.P(a.responseText);
                    AudienceManagement.passData(b)
                } catch (c) {}
            }
        };
        a.onabort = a.onerror = a.Ta = function() {
            a.la();
            (s.trackOffline || s.ea) && s.v && s.e.unshift(s.Qa);
            s.v = 0;
            s.aa > s.G && s.xa(s.e);
            s.V();
            s.ha(500)
        };
        a.onreadystatechange = function() {
            a.readyState == 4 && (a.status == 200 ? a.lb() : a.Ta())
        };
        s.wa = s.r();
        if (c == 1 || c == 2) {
            var d = b.indexOf("?");
            e = b.substring(0, d);
            d = b.substring(d + 1);
            d = d.replace(/&callback=[a-zA-Z0-9_.\[\]]+/, "");
            c == 1 ? (a.open("POST", e, !0), a.send(d)) : c == 2 && (a.open("POST", e), a.send(d))
        } else if (a.src = b, c == 3) {
            if (s.ua) try {
                e.removeChild(s.ua)
            } catch (f) {}
            e.firstChild ?
                e.insertBefore(a, e.firstChild) : e.appendChild(a);
            s.ua = s.Pa
        }
        if (a.abort) s.ga = setTimeout(a.abort, 5E3);
        s.Qa = b;
        s.Pa = w["s_i_" + s.replace(s.account, ",", "_")] = a;
        if (s.useForcedLinkTracking && s.A || s.p) {
            if (!s.forcedLinkTrackingTimeout) s.forcedLinkTrackingTimeout = 250;
            s.W = setTimeout(s.V, s.forcedLinkTrackingTimeout)
        }
    };
    s.Ra = function() {
        if (s.fa() && !(s.va > s.G)) try {
            w.localStorage.removeItem(s.da()), s.va = s.r()
        } catch (b) {}
    };
    s.xa = function(b) {
        if (s.fa()) {
            s.za();
            try {
                w.localStorage.setItem(s.da(), w.JSON.stringify(b)), s.G = s.r()
            } catch (a) {}
        }
    };
    s.za = function() {
        if (s.trackOffline) {
            if (!s.offlineLimit || s.offlineLimit <= 0) s.offlineLimit = 10;
            for (; s.e.length > s.offlineLimit;) s.na()
        }
    };
    s.forceOffline = function() {
        s.ea = !0
    };
    s.forceOnline = function() {
        s.ea = !1
    };
    s.da = function() {
        return s.offlineFilename + "-" + s.visitorNamespace + s.account
    };
    s.r = function() {
        return (new Date).getTime()
    };
    s.ra = function(s) {
        s = s.toLowerCase();
        if (s.indexOf("#") != 0 && s.indexOf("about:") != 0 && s.indexOf("opera:") != 0 && s.indexOf("javascript:") != 0) return !0;
        return !1
    };
    s.setTagContainer = function(b) {
        var a,
            c, e;
        s.mb = b;
        for (a = 0; a < s._il.length; a++)
            if ((c = s._il[a]) && c._c == "s_l" && c.tagContainerName == b) {
                s.K(c);
                if (c.lmq)
                    for (a = 0; a < c.lmq.length; a++) e = c.lmq[a], s.loadModule(e.n);
                if (c.ml)
                    for (e in c.ml)
                        if (s[e])
                            for (a in b = s[e], e = c.ml[e], e)
                                if (!Object.prototype[a] && (typeof e[a] != "function" || ("" + e[a]).indexOf("s_c_il") < 0)) b[a] = e[a];
                if (c.mmq)
                    for (a = 0; a < c.mmq.length; a++) e = c.mmq[a], s[e.m] && (b = s[e.m], b[e.f] && typeof b[e.f] == "function" && (e.a ? b[e.f].apply(b, e.a) : b[e.f].apply(b)));
                if (c.tq)
                    for (a = 0; a < c.tq.length; a++) s.track(c.tq[a]);
                c.s = s;
                break
            }
    };
    s.Util = {
        urlEncode: s.escape,
        urlDecode: s.unescape,
        cookieRead: s.cookieRead,
        cookieWrite: s.cookieWrite,
        getQueryParam: function(b, a, c) {
            var e;
            a || (a = s.pageURL ? s.pageURL : w.location);
            c || (c = "&");
            if (b && a && (a = "" + a, e = a.indexOf("?"), e >= 0 && (a = c + a.substring(e + 1) + c, e = a.indexOf(c + b + "="), e >= 0 && (a = a.substring(e + c.length + b.length + 1), e = a.indexOf(c), e >= 0 && (a = a.substring(0, e)), a.length > 0)))) return s.unescape(a);
            return ""
        }
    };
    s.z = ["supplementalDataID", "timestamp", "dynamicVariablePrefix", "visitorID", "marketingCloudVisitorID",
        "analyticsVisitorID", "audienceManagerLocationHint", "authState", "fid", "vmk", "visitorMigrationKey", "visitorMigrationServer", "visitorMigrationServerSecure", "charSet", "visitorNamespace", "cookieDomainPeriods", "fpCookieDomainPeriods", "cookieLifetime", "pageName", "pageURL", "referrer", "contextData", "currencyCode", "lightProfileID", "lightStoreForSeconds", "lightIncrementBy", "retrieveLightProfiles", "deleteLightProfiles", "retrieveLightData", "pe", "pev1", "pev2", "pev3", "pageURLRest"
    ];
    s.c = s.z.concat(["purchaseID",
        "variableProvider", "channel", "server", "pageType", "transactionID", "campaign", "state", "zip", "events", "events2", "products", "audienceManagerBlob", "tnt"
    ]);
    s.ba = ["timestamp", "charSet", "visitorNamespace", "cookieDomainPeriods", "cookieLifetime", "contextData", "lightProfileID", "lightStoreForSeconds", "lightIncrementBy"];
    s.H = s.ba.slice(0);
    s.ia = ["account", "allAccounts", "debugTracking", "visitor", "trackOffline", "offlineLimit", "offlineThrottleDelay", "offlineFilename", "usePlugins", "doPlugins", "configURL", "visitorSampling",
        "visitorSamplingGroup", "linkObject", "clickObject", "linkURL", "linkName", "linkType", "trackDownloadLinks", "trackExternalLinks", "trackClickMap", "trackInlineStats", "linkLeaveQueryString", "linkTrackVars", "linkTrackEvents", "linkDownloadFileTypes", "linkExternalFilters", "linkInternalFilters", "useForcedLinkTracking", "forcedLinkTrackingTimeout", "trackingServer", "trackingServerSecure", "ssl", "abort", "mobile", "dc", "lightTrackVars", "maxDelay", "expectSupplementalData", "AudienceManagement"
    ];
    for (i = 0; i <= 250; i++) i < 76 &&
        (s.c.push("prop" + i), s.H.push("prop" + i)), s.c.push("eVar" + i), s.H.push("eVar" + i), i < 6 && s.c.push("hier" + i), i < 4 && s.c.push("list" + i);
    i = ["latitude", "longitude", "resolution", "colorDepth", "javascriptVersion", "javaEnabled", "cookiesEnabled", "browserWidth", "browserHeight", "connectionType", "homepage"];
    s.c = s.c.concat(i);
    s.z = s.z.concat(i);
    s.ssl = w.location.protocol.toLowerCase().indexOf("https") >= 0;
    s.charSet = "UTF-8";
    s.contextData = {};
    s.offlineThrottleDelay = 0;
    s.offlineFilename = "AppMeasurement.offline";
    s.wa = 0;
    s.aa = 0;
    s.G = 0;
    s.va = 0;
    s.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";
    s.w = w;
    s.d = w.document;
    try {
        s.ab = navigator.appName == "Microsoft Internet Explorer"
    } catch (t) {}
    s.V = function() {
        if (s.W) w.clearTimeout(s.W), s.W = k;
        s.i && s.A && s.i.dispatchEvent(s.A);
        if (s.p)
            if (typeof s.p == "function") s.p();
            else if (s.i && s.i.href) s.d.location = s.i.href;
        s.i = s.A = s.p = 0
    };
    s.ya = function() {
        s.b = s.d.body;
        if (s.b)
            if (s.o = function(b) {
                    var a, c, e, d, f;
                    if (!(s.d && s.d.getElementById("cppXYctnr") || b && b["s_fe_" + s._in])) {
                        if (s.ka)
                            if (s.useForcedLinkTracking) s.b.removeEventListener("click",
                                s.o, !1);
                            else {
                                s.b.removeEventListener("click", s.o, !0);
                                s.ka = s.useForcedLinkTracking = 0;
                                return
                            } else s.useForcedLinkTracking = 0;
                        s.clickObject = b.srcElement ? b.srcElement : b.target;
                        try {
                            if (s.clickObject && (!s.F || s.F != s.clickObject) && (s.clickObject.tagName || s.clickObject.parentElement || s.clickObject.parentNode)) {
                                var g = s.F = s.clickObject;
                                if (s.Z) clearTimeout(s.Z), s.Z = 0;
                                s.Z = setTimeout(function() {
                                    if (s.F == g) s.F = 0
                                }, 1E4);
                                e = s.pa();
                                s.track();
                                if (e < s.pa() && s.useForcedLinkTracking && b.target) {
                                    for (d = b.target; d && d != s.b && d.tagName.toUpperCase() !=
                                        "A" && d.tagName.toUpperCase() != "AREA";) d = d.parentNode;
                                    if (d && (f = d.href, s.ra(f) || (f = 0), c = d.target, b.target.dispatchEvent && f && (!c || c == "_self" || c == "_top" || c == "_parent" || w.name && c == w.name))) {
                                        try {
                                            a = s.d.createEvent("MouseEvents")
                                        } catch (i) {
                                            a = new w.MouseEvent
                                        }
                                        if (a) {
                                            try {
                                                a.initMouseEvent("click", b.bubbles, b.cancelable, b.view, b.detail, b.screenX, b.screenY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget)
                                            } catch (k) {
                                                a = 0
                                            }
                                            if (a) a["s_fe_" + s._in] = a.s_fe = 1, b.stopPropagation(), b.kb && b.kb(),
                                                b.preventDefault(), s.i = b.target, s.A = a
                                        }
                                    }
                                }
                            } else s.clickObject = 0
                        } catch (m) {
                            s.clickObject = 0
                        }
                    }
                }, s.b && s.b.attachEvent) s.b.attachEvent("onclick", s.o);
            else {
                if (s.b && s.b.addEventListener) {
                    if (navigator && (navigator.userAgent.indexOf("WebKit") >= 0 && s.d.createEvent || navigator.userAgent.indexOf("Firefox/2") >= 0 && w.MouseEvent)) s.ka = 1, s.useForcedLinkTracking = 1, s.b.addEventListener("click", s.o, !0);
                    s.b.addEventListener("click", s.o, !1)
                }
            } else setTimeout(s.ya, 30)
    };
    s.ya()
}

function s_gi(s) {
    if (typeof s == 'undefined') {
        return false;
    }
    var w, k = window.s_c_il,
        m, i, o = s.split(","),
        p, n, r = 0;
    if (k)
        for (m = 0; !r && m < k.length;) {
            w = k[m];
            if (w._c == "s_c" && (w.account || w.oun))
                if (w.account && w.account == s) r = 1;
                else {
                    i = w.account ? w.account : w.oun;
                    i = w.allAccounts ? w.allAccounts : i.split(",");
                    for (p = 0; p < o.length; p++)
                        for (n = 0; n < i.length; n++) o[p] == i[n] && (r = 1)
                }
            m++
        }
    r || (w = new AppMeasurement);
    w.setAccount ? w.setAccount(s) : w.sa && w.sa(s);
    return w
}
AppMeasurement.getInstance = s_gi;
window.s_objectID || (window.s_objectID = 0);

function s_pgicq() {
    var s = window,
        w = s.s_giq,
        k, m, i;
    if (w)
        for (k = 0; k < w.length; k++) m = w[k], i = s_gi(m.oun), i.setAccount(m.un), i.setTagContainer(m.tagContainerName);
    s.s_giq = 0
}
s_pgicq();