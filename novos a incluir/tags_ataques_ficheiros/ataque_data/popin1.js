 if (typeof(inDapIF) != 'undefined' && inDapIF) {
   var d = window.parent.document;
    var w = window.parent;
   if (typeof w.SAPO === 'undefined') {
		w.SAPO = {};
	} else {
		w.SAPO = w.SAPO;
	}
  } else if ('undefined' != typeof sas_in_iframe_popout && sas_in_iframe_popout) {
   var d = sas_topmost_iframe().ownerDocument;
   var w = top.window;
    if (typeof w.SAPO === 'undefined') {
		w.SAPO = {};
	} else {
		w.SAPO = w.SAPO;
	}
  } else{
	  var w = window;
	  var d = window.document;
	  if (typeof SAPO === 'undefined') {
	w.SAPO = {};
} else {
	w.SAPO = w.SAPO;
}
	  
  }

/***** GAMBOA STYLE *****/

/*jshint browser:true, eqeqeq:true, undef:true, curly:true, laxbreak:true, forin:false, smarttabs:true */
/*global SAPO:false, s$:false */



if (typeof SAPO === 'undefined') {
    window.SAPO = {};
} else {
    window.SAPO = window.SAPO;
}

/**
 * @class SAPO
 */

/* {{{ SAPO.namespace() */
/**
 * @function {Object} SAPO.namespace Creates the SAPO namespace
 * @param {string} ns - namespace path
 * @return Object with SAPO namespace
 */
SAPO.namespace = function(ns) {

    if (!ns || !ns.length) {
        return null;
    }

    var levels = ns.split(".");
    var nsobj = SAPO;

    // SAPO is implied, so it is ignored if it is included
    for (var i = (levels[0] === "SAPO") ? 1 : 0; i < levels.length; ++i) {
        nsobj[levels[i]] = nsobj[levels[i]] || {};
        nsobj = nsobj[levels[i]];
    }

    return nsobj;
};
/* }}} */

/* {{{ SAPO.verify() */
/**
 * @function {Object} SAPO.verify verifies that a dependency has been loaded.
 *                    Throws exception if not
 * @param {string} ns - namespace path
 * @param {string} minVersion - minimum version, optional
 * @return Object with SAPO namespace
 */
SAPO.verify = function(ns, minVersion) {
    if (!ns) {
        return;
    }

    var levels = ns.split(".");
    var nsobj = SAPO;

    // SAPO is implied, so it is ignored if it is included
    for (var k = levels[0] === 'SAPO' ? 1 : 0, m = levels.length; k < m; k++) {
        nsobj = nsobj[levels[k]];
        if (!nsobj) {
            throw new Error('SAPO.verify: ' + ns + ' not found');
        }
    }

    if (!minVersion) {
        return;
    }

    if (typeof nsobj === 'function') {
        nsobj = nsobj.prototype;
    }

    var lhs = String(nsobj.version).match(/\d+/g) || [0];
    var rhs = String(minVersion).match(/\d+/g) || [0];
    for(k = 0, m = Math.min(lhs.length, rhs.length); k < m; k++) {
        if (lhs[k] < rhs[k]) {
            throw new Error('SAPO.verify: ' + ns+ ' has low version (' + nsobj.version + ' < ' + minVersion + ')');
        }
    }

    if (lhs.length < rhs.length) {
        throw new Error('SAPO.verify: ' + ns+ ' has low version (' + nsobj.version + ' < ' + minVersion + ')');
    }
};
/* }}} */

/* {{{ SAPO.extend() */
/*
SAPO.extend = function(subclass, superclass) {
    var f = function() {};
    f.prototype = superclass.prototype;
    subclass.prototype = new f();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass.prototype;
    if (superclass.prototype.constructor == Object.prototype.constructor) {
        superclass.prototype.constructor = superclass;
    }
};
*/
/* }}} */

/* {{{ SAPO.Class() */
/**
 * @function {Function} ? - This function returns a new Class (function) which
 * will create object instances with the given properties as prototype,
 * supporting hierarchy, using baseClass ad the base class.
 * If properties has a property named abstract which evaluates to true, then
 * the class cannot be instantiated directly, like an abstract class.
 *
 * @param {string}   class name, useful just for debugging.
 * @param baseClass  prototype, super class.
 * @param properties methods and properties of the new class.
 */
SAPO.Class = function(name, baseClass, properties) {
    var derivedFunction = function () {
        if (this.__dont_init) {
            return;
        }

        if (this === window || !this) {
            throw new Error('Call "new ' + name + '(...);"');
        }

        if (derivedFunction['abstract']) {
            throw new Error("Abstract class: don't instantiate");
        }

        if (baseClass) {
            var abstractBackup = baseClass['abstract'];
            if (abstractBackup) {
                baseClass['abstract'] = false;
            }
            baseClass.apply(this, arguments);
            if (abstractBackup) {
                baseClass['abstract'] = abstractBackup;
            }
        }
        if (properties && typeof properties.init === 'function') {
            properties.init.apply(this, arguments);
        }
    };

    derivedFunction.name = derivedFunction.displayName = name;
    derivedFunction['abstract'] = properties['abstract'];

    if (baseClass) {
        // __dont_init used as workaround to prevent double initialization
        baseClass.prototype.__dont_init = 1;
        derivedFunction.prototype = new baseClass();
        delete baseClass.prototype.__dont_init;
    }

    derivedFunction.prototype.toString = function() {
        return '[object '+name+']';
    };

    if (properties) {
        SAPO.extendObj(derivedFunction.prototype, properties);
    }
    return derivedFunction;
};
/* }}} */

/* {{{ SAPO.safeCall() */
/**
 * @function ? Safely calls a callback function. Verifies that
 *             the callback is well defined and traps errors.
 * @param {Object} object to be used as this. If null, the global object is used.
 *             If function, then it's called with window as this.
 * @param {String|Function} listener member function to be called. If string, then
 *             member is looked up.
 */
SAPO.safeCall = function(object, listener) {
    function rethrow(exception){
        setTimeout(function() {
            // Rethrow exception so it'll land in
            // the error console, firebug, whatever.
            if (exception.message) {
                exception.message += '\n'+(exception.stacktrace || exception.stack || '');
            }
            throw exception;
        },1);
    }
    if (object === null) {
        object = window;
    }
    if (typeof listener === 'string' && typeof object[listener] === 'function') {
        try {
            return object[listener].apply(object, [].slice.call(arguments, 2));
        } catch(ex){
            rethrow(ex);
        }
    } else if (typeof listener === 'function') {
        try {
            return listener.apply(object, [].slice.call(arguments, 2));
        } catch(ex){
            rethrow(ex);
        }
    } else if (typeof object === 'function') {
        try {
            return object.apply(window, [].slice.call(arguments, 1));
        } catch(ex){
            rethrow(ex);
        }
    }
};
/* }}} */

/* {{{ s$() */
/**
 * @function {DOMElement|Array} s$ Shortcut for document.getElementById
 * @param {string|Array} element - Receives either an id or an Array of id's
 * @return Either the DOM element for the given id or an array of elements for the given ids
 */
window.s$ = function(element) {
    if (arguments.length > 1) {
        for (var i = 0, elements = [], length = arguments.length; i < length; i++) {
            elements.push(s$(arguments[i]));
        }
        return elements;
    }
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    return element;
};
/* }}} */

/* {{{ Function.bindObj() */
/**
 * @function {Function} bindObj Extends the native Function object.
 * Creates a delegate (callback) that sets the scope to obj.
 * Call directly on any function. <br />Example:
 * <code>this.myFunction.bindObj(this)</code> <br />
 * Will create a function that is automatically scoped to this.
 * @param {Object} obj The object for which the scope is set
 * @param {optional Array} args Overrides arguments for the call.
 * (Defaults to the arguments passed by the caller)
 * @return The new function
 */
Function.prototype.bindObj = function() {

    if (arguments.length < 2 && arguments[0] === undefined) {
        return this;
    }
    var __method = this;
    var args = [];
    for(var i=0, total=arguments.length; i < total; i++) {
        args.push(arguments[i]);
    }
    var object = args.shift();

    var fn = function() {
        return __method.apply(object, args.concat(function(tmpArgs){
                        var args2 = [];
                        for(var j=0, total=tmpArgs.length; j < total; j++) {
                            args2.push(tmpArgs[j]);
                        }
                        return args2;
                    }(arguments)));
    };
    fn.toString = function(){ return String(__method); };
    fn.name = fn.displayName = __method.name;
    return fn;
};
/* }}} */

/* {{{ Function.bindObjEvent() */
/**
 * @function {Function} bindObjEvent Extends the native Function object.
 * Creates a delegate (callback) that sets the scope to obj.
 * Call directly on any function. <br />Example:
 * <code>this.myFunction.bindObjEvent(this)</code> <br />
 * Will create a function that is automatically scoped to this.
 * @param {Object} event The default event
 * @param {Object} obj The object for which the scope is set
 * @param {optional Array} args Overrides arguments for the call.
 * (Defaults to the arguments passed by the caller)
 * @return The new function
 */
Function.prototype.bindObjEvent =  function() {
    var __method = this;
    var args = [];
    for(var i=0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    var object = args.shift();
    return function(event) {
        return __method.apply(object, [event || window.event].concat(args));
    };
};
/* }}} */

/* {{{ Object.extend() **DEPRECATED** */
Object.extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
};
/* }}} */

/* {{{ SAPO.extendObj() */
/**
 * @function {Object} ? Extends a given Object with a given set
 * of properties
 * @param {Object} destination - The original objecty
 * @param {Object} source - The new properties
 * @return The extended object
 */
SAPO.extendObj = function(destination, source) {
    if (source) {
        for (var property in source) {
            if(source.hasOwnProperty(property)){
                destination[property] = source[property];
            }
        }
    }
    return destination;
};
/* }}} */

/* {{{ SAPO.Browser */
/**
 * @class {private} SAPO.Browser
 */
if (typeof SAPO.Browser === 'undefined') {

    SAPO.Browser = {
        /**
         * True if the browser is Internet Explorer
         * @var {boolean} ?
         */
        IE: false,

        /**
         * True if the browser is Gecko based
         * @var {boolean} ?
         */
        GECKO: false,

        /**
         * True if the browser is Opera
         * @var {boolean} ?
         */
        OPERA: false,

        /**
         * True if the browser is Safari
         * @var {boolean} ?
         */
        SAFARI: false,

        /**
         * True if the browser is Konqueror
         * @var {boolean} ?
         */
        KONQUEROR: false,

        /**
         * True if browser is Chrome
         * @var {boolean} ?
         */

        CHROME: false,

        /**
         * The specific browser model
         * @var {string} ?
         */
        model: false,

        /**
         * The browser version
         * @var {string} ?
         */
        version: false,

        /**
         * The user agent string
         * @var {string} ?
         */
        userAgent: false,

        /**
         * @function ? initialization function for the Browser object
         */
        init: function()
        {
            this.detectBrowser();
            this.setDimensions();
            this.setReferrer();
        },

        /**
         * @function ? Stores window dimensions
         */
        setDimensions: function()
        {
            //this.windowWidth=window.innerWidth !== null? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body !== null ? document.body.clientWidth : null;
            //this.windowHeight=window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null? document.body.clientHeight : null;
            var myWidth = 0, myHeight = 0;
            if ( typeof window.innerWidth=== 'number' ) {
                myWidth = window.innerWidth;
                myHeight = window.innerHeight;
            } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
                myWidth = document.documentElement.clientWidth;
                myHeight = document.documentElement.clientHeight;
            } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
            }
            this.windowWidth = myWidth;
            this.windowHeight = myHeight;
        },

        /**
         * @function ? Stores the referrer
         */
        setReferrer: function()
        {
            this.referrer = document.referrer !== undefined? document.referrer.length > 0 ? window.escape(document.referrer) : false : false;
        },

        /**
         * @function ? Detects the browser and stores the found properties
         */
        detectBrowser: function()
        {
            var sAgent = navigator.userAgent;

            this.userAgent = sAgent;

            sAgent = sAgent.toLowerCase();

            if((new RegExp("applewebkit\/")).test(sAgent)) {

                if((new RegExp("chrome\/")).test(sAgent)) {
                    // Chrome
                    this.CHROME = true;
                    this.model = 'chrome';
                    this.version = sAgent.replace(new RegExp("(.*)chrome\/([^\\s]+)(.*)"), "$2");
                    this.cssPrefix = '-webkit-';
                    this.domPrefix = 'Webkit';
                } else {
                    // Safari
                    this.SAFARI = true;
                    this.model = 'safari';
                    this.version = sAgent.replace(new RegExp("(.*)applewebkit\/([^\\s]+)(.*)"), "$2");
                    this.cssPrefix = '-webkit-';
                    this.domPrefix = 'Webkit';
                }
            } else if((new RegExp("opera")).test(sAgent)) {
                // Opera
                this.OPERA = true;
                this.model = 'opera';
                this.version = sAgent.replace(new RegExp("(.*)opera.([^\\s$]+)(.*)"), "$2");
                this.cssPrefix = '-o-';
                this.domPrefix = 'O';
            } else if((new RegExp("konqueror")).test(sAgent)) {
                // Konqueror
                this.KONQUEROR = true;
                this.model = 'konqueror';
                this.version = sAgent.replace(new RegExp("(.*)konqueror\/([^;]+);(.*)"), "$2");
                this.cssPrefix = '-khtml-';
                this.domPrefix = 'Khtml';
            } else if((new RegExp("msie\\ ")).test(sAgent)) {
                // MSIE
                this.IE = true;
                this.model = 'ie';
                this.version = sAgent.replace(new RegExp("(.*)\\smsie\\s([^;]+);(.*)"), "$2");
                this.cssPrefix = '-ms-';
                this.domPrefix = 'ms';
            } else if((new RegExp("gecko")).test(sAgent)) {
                // GECKO
                // Supports only:
                // Camino, Chimera, Epiphany, Minefield (firefox 3), Firefox, Firebird, Phoenix, Galeon,
                // Iceweasel, K-Meleon, SeaMonkey, Netscape, Songbird, Sylera,
                this.GECKO = true;
                var re = new RegExp("(camino|chimera|epiphany|minefield|firefox|firebird|phoenix|galeon|iceweasel|k\\-meleon|seamonkey|netscape|songbird|sylera)");
                if(re.test(sAgent)) {
                    this.model = sAgent.match(re)[1];
                    this.version = sAgent.replace(new RegExp("(.*)"+this.model+"\/([^;\\s$]+)(.*)"), "$2");
                    this.cssPrefix = '-moz-';
                    this.domPrefix = 'Moz';
                } else {
                    // probably is mozilla
                    this.model = 'mozilla';
                    var reVersion = new RegExp("(.*)rv:([^)]+)(.*)");
                    if(reVersion.test(sAgent)) {
                        this.version = sAgent.replace(reVersion, "$2");
                    }
                    this.cssPrefix = '-moz-';
                    this.domPrefix = 'Moz';
                }
            }
        },

        debug: function()
        {
            /*global alert:false */
            var str = "known browsers: (ie, gecko, opera, safari, konqueror) \n";
                str += [this.IE, this.GECKO, this.OPERA, this.SAFARI, this.KONQUEROR] +"\n";
                str += "model -> "+this.model+"\n";
                str += "version -> "+this.version+"\n";
                str += "\n";
                str += "original UA -> "+this.userAgent;

                alert(str);
        }
    };

    SAPO.Browser.init();

}
/* }}} */

/* {{{ SAPO.logReferer() */
SAPO.logReferer = function(classURL) {


    /*
    var thisOptions = {
                s:     (typeof options === 'object' && options.s'    ? options.s     : 'js.sapo.pt',
                swakt: (typeof options === 'object' && options.swakt ? options.swakt : '59a97a5f-0924-3720-a62e-0c44d9ea4f16'
            };
    */

    var thisOptions = SAPO.extendObj({
                s:          'js.sapo.pt',
                swakt:      '59a97a5f-0924-3720-a62e-0c44d9ea4f16',
                pg:         false,  // default will be classURL (arguments[0])
                swasection: false, // default will be classURL (arguments[0])
                swasubsection: '',
                dc:         '',
                ref:        false,
                etype:      'libsapojs-view',
                swav:       '1',
                swauv:      '1',
                bcs:        '1',
                bsr:        '1',
                bul:        '1',
                bje:        '1',
                bfl:        '1',
                debug:      false
            }, arguments[1] || {});

    if (typeof classURL !== 'undefined' && classURL !== null) {

        if (!thisOptions.pg) {
            thisOptions.pg = classURL;
        }
        if (!thisOptions.swasection) {
            thisOptions.swasection = classURL;
        }
        if (!thisOptions.ref) {
            thisOptions.ref = location.href;
        }

        var waURI = 'http://wa.sl.pt/wa.gif?';
        var waURISSL = 'https://ssl.sapo.pt/wa.sl.pt/wa.gif?';

        var aQuery = [
            'pg=' + encodeURIComponent(thisOptions.pg),
            'swasection=' + encodeURIComponent(thisOptions.swasection),
            'swasubsection=' + encodeURIComponent(thisOptions.swasubsection),
            'dc=' +  encodeURIComponent(thisOptions.dc),
            's=' + thisOptions.s,
            'ref=' + encodeURIComponent(thisOptions.ref),
            'swakt=' + thisOptions.swakt,
            'etype=' + encodeURIComponent(thisOptions.etype),
            'swav=' + encodeURIComponent(thisOptions.swav),
            'swauv=' + encodeURIComponent(thisOptions.swauv),
            'bcs=' + encodeURIComponent(thisOptions.bcs),
            'bsr=' + encodeURIComponent(thisOptions.bsr),
            'bul=' + encodeURIComponent(thisOptions.bul),
            'bje=' + encodeURIComponent(thisOptions.bje),
            'bfl=' + encodeURIComponent(thisOptions.bfl),
            ''
            ];

        var waLogURI = ((location.protocol === 'https:') ? waURISSL : waURI);

        var img = new Image();
        img.src = waLogURI+aQuery.join('&');
    }
};

/* }}} */

/* {{{ SAPO.require()
 * param: <object>
 *      object = [
 *          {
 *              uri: 'url to load',  (/relative_sapo_path | http://absolute_url)
 *              check: object to check <optional>
 *              version: object version to check <optional>
 *          }
 *      ]
 *  OR
 *      object = [
 *          <SAPO object 1> / <URI 1 string>,
 *          <SAPO object 2> / <URI 2 string>,
 *          <SAPO object 3> > <URI 3 string>
 *      ]
 *  OR
 *      object = [
 *          [<SAPO object 1>, <optional Version>],
 *          [<SAPO object 2>, <optional Version>],
 *          [<SAPO object 3>, <optional Version>]
 *      ]
 * param: <function> callBack
 */


/* {{{ SAPO._require(uri, callBack) PRIVATE */
SAPO._require = function(uri, callBack)
{
    if(typeof uri !== 'string') {
        return;
    }
    var script = document.createElement('script');
    script.type = 'text/javascript';

    var aHead = document.getElementsByTagName('HEAD');
    if(aHead.length > 0) {
        aHead[0].appendChild(script);
    }

    if(document.addEventListener) {
        script.onload = function(e) {
            if(typeof callBack !== 'undefined') {
                callBack();
            }
        };
    } else {
        script.onreadystatechange = function(e) {
            if(this.readyState === 'loaded') {
                if(typeof callBack !== 'undefined') {
                    callBack();
                }
            }
        };
    }
    script.src = uri;
};
/* }}} */

/**
 * @function ? Loads a list of given modules and executes a callback when the modules are ready
 * @param {Array|String} reqArray - Array of modules (url's, namespaces) to be loaded. If only one module is being loaded, a string can be used
 * @param {Function} callBack - callback to be executed after the modules are loaded
 * @param {Boolean} async - If true, executes the callback immediately, not waiting for the modules to be loaded
 */
SAPO.require = function(reqArray, callBack/*, async = false */)
{
    var objectsToCheck = [];
    var uriToAdd = [];

    /* {{{ _isSAPOObject() */
    // checks if a string is a SAPO namespace
    var _isSAPOObject = function(param) {
        if (typeof param === 'string') {
            if (/^SAPO\./.test(param)) {
                return true;
            }
        }
        return false;
    };
    /*}}} */

    /* {{{ _isObjectUri() */
    // checks if a given var is an object and contains an uri
    var _isObjectUri = function(param) {
        if (typeof param === 'object' && param.constructor === Object) {
            if (typeof param.uri === 'string') {
                return true;
            }
        }
        return false;
    };
    /* }}} */

    /* {{{ _isObjectArray() */
    var _isObjectArray = function(param) {
        if (typeof param === 'object' && param.constructor === Array) {
            return true;
        }
        return false;
    };
    /* }}} */

    /* {{{ _parseSAPOObject() */
     // parses a SAPO namespace definition into a url
    var _parseSAPOObject = function(param) {
        var aSAPO = param.split('.');
        var sapoURI = aSAPO.join('/');
        return 'http://js.sapo.pt/'+sapoURI+'/';
    };
    /* }}} */

    /* {{{ _parseObjectUri() */
    var _parseObjectUri = function(param){
        return param.uri;
    };
    /* }}} */

    /* {{{ _objectExists(objStr) */
    var _objectExists = function(objStr, ver) {
        if (typeof objStr !== 'undefined') {
            var aStrObj = objStr.split('.');
            var objParent = window;
            for (var k=0, aStrObjLength = aStrObj.length; k < aStrObjLength; k++) {
                if (typeof objParent[aStrObj[k]] !== 'undefined') {
                    objParent = objParent[aStrObj[k]];
                } else {
                    return false;
                }
            }

            if (typeof ver !== 'undefined' && ver !== null) {
                if (typeof objParent.version !== 'undefined'){
                    if (objParent.version === ver) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            }
            return true;
        }
    };
    /* }}} */

    /* {{{ requestRecursive() */
    var requestRecursive = function()
    {
        if (uriToAdd.length > 1) {
            SAPO._require(uriToAdd[0], requestRecursive);
            uriToAdd.splice(0,1);
        } else if (uriToAdd.length === 1) {
            if (typeof callBack !== 'undefined') {
                SAPO._require(uriToAdd[0], callBack);
            } else {
                SAPO._require(uriToAdd[0]);
            }
            uriToAdd.splice(0,1);
        } else if (uriToAdd.length === 0){
            if (typeof callBack !== 'undefined') {
                callBack();
            }
        }

    };
    /* }}} */

    if (typeof reqArray !== 'undefined') {
        var cur = false;
        var curURI = false;

        if (typeof reqArray === 'string') {
            if (_isSAPOObject(reqArray)) {
                if (!_objectExists(reqArray)) {
                    uriToAdd.push(_parseSAPOObject(reqArray));
                }
            } else {
                uriToAdd.push(reqArray);
            }
        } else {
            for(var i=0, reqArrayLength=reqArray.length; i < reqArrayLength; i++) {
                cur = reqArray[i];
                if(_isSAPOObject(cur)) {
                    if(!_objectExists(cur)) {
                        objectsToCheck.push(cur);
                        uriToAdd.push(_parseSAPOObject(cur));
                    }
                } else if(_isObjectArray(cur)) {
                    if(cur.length > 0) {
                        if(_isSAPOObject(cur[0])) {
                            if(!_objectExists(cur[0])) {
                                if(cur.length === 2) {
                                    uriToAdd.push(_parseSAPOObject(cur[0])+cur[1]+'/');
                                } else {
                                    uriToAdd.push(_parseSAPOObject(cur[0]));
                                }
                            }
                        }
                    }
                } else {
                    if (typeof cur === 'string') {
                        uriToAdd.push(cur);
                    } else {
                        if (_isObjectUri(cur)) {
                            if (typeof cur.check === 'string') {
                                if (typeof cur.version === 'string') {
                                    if (!_objectExists(cur.check, cur.version)) {
                                        uriToAdd.push(_parseObjectUri(cur));
                                    }
                                } else {
                                    if(!_objectExists(cur.check)) {
                                        uriToAdd.push(_parseObjectUri(cur));
                                    }
                                }
                            } else {
                                uriToAdd.push(_parseObjectUri(cur));
                            }
                        }
                    }
                }
            }
        }

        if (arguments.length === 3) {
            if (typeof arguments[2] === 'boolean') {
                if (arguments[2] === true) {
                    for(var l=0, uriToAddLength=uriToAdd.length; l < uriToAddLength; l++) {
                        SAPO._require(uriToAdd[l]);
                    }
                    if (typeof callBack !== 'undefined') {
                        callBack();
                    }
                    return;
                }
            }
            requestRecursive();
        } else {
            requestRecursive();
        }

    }

};


/* }}} */





/*jshint browser:true, eqeqeq:true, undef:true, curly:true, laxbreak:true, forin:true, smarttabs:true */
/*global SAPO:false, s$:false */



/**
 * @namespace SAPO.Dom.Loaded
 */

(function() {
    /* Support for the DOMContentLoaded event is based on work by Dan Webb,
        Matthias Miller, Dean Edwards and John Resig. */

    SAPO.namespace('Dom');

    var timer, fired = false,

        _fireEvent = function(eventName, memo) {
            var event, element = document;
            if (element === document && document.createEvent && !element.dispatchEvent) {
                element = document.documentElement;
            }
            if(document.createEvent) {
                event = document.createEvent("HTMLEvents");
                event.initEvent('dataavailable', true, true);
            } else {
                event = document.createEventObject();
                event.eventType = 'ondataavailable';
            }
            event.eventName = eventName;
            event.memo = memo || {};

            if(document.createEvent) {
                element.dispatchEvent(event);
            } else {
                element.fireEvent(event.eventType, event);
            }

        };


    function fireContentLoadedEvent() {
        if (fired) {
            return;
        }
        if (timer) {
            window.clearInterval(timer);
        }
        _fireEvent("dom:loaded");
        fired = true;
    }

    if (document.addEventListener) {
        if (navigator.userAgent.indexOf('AppleWebKit/') > -1) {
            timer = window.setInterval(function() {
                if (/loaded|complete/.test(document.readyState)) {
                    fireContentLoadedEvent();
                }
            }, 0);

            window.addEventListener("load", fireContentLoadedEvent, false);

        } else {
            document.addEventListener("DOMContentLoaded", fireContentLoadedEvent, false);
        }

    } else {
        document.write("<script id=\"SAPO__onDOMContentLoaded\" defer src=//:><\/script>");
        document.getElementById("SAPO__onDOMContentLoaded").onreadystatechange = function() {
            if (this.readyState === "complete") {
                this.onreadystatechange = null;
                fireContentLoadedEvent();
            }
        };
    }

    (function() {
        var has = false;
        var aScripts = document.getElementsByTagName('script');
        for(var x=0, tX=aScripts.length; x < tX; x++) {
            var src = aScripts[x].src || null;
            if(src && src.indexOf('SAPO/Dom/Loaded') > -1 && src.indexOf('Loaded/0.1') == -1) {
                has = true;
                var sSrc = src;
            }
        }

        if(has) {
            SAPO.logReferer('http://js.sapo.pt/SAPO/Dom/Loaded/', {etype:'libsapojs-dev', pg: sSrc+"####"});
        }
    })();

})();


/*global SAPO:true, s$:true, window:true */
SAPO.namespace('Dom');

/**
 * @namespace SAPO.Dom.Event
 *
 */
SAPO.Dom.Event = {

    KEY_BACKSPACE: 8,
    KEY_TAB:       9,
    KEY_RETURN:   13,
    KEY_ESC:      27,
    KEY_LEFT:     37,
    KEY_UP:       38,
    KEY_RIGHT:    39,
    KEY_DOWN:     40,
    KEY_DELETE:   46,
    KEY_HOME:     36,
    KEY_END:      35,
    KEY_PAGEUP:   33,
    KEY_PAGEDOWN: 34,
    KEY_INSERT:   45,


    /**
     * @function {Node} ? - Returns the target of the event object
     * @param {Object} ev - event object
     * @return The target
     */
    element: function(ev)
    {
        var node = ev.target ||
            // IE stuff
            (ev.type == 'mouseout'   && ev.fromElement) ||
            (ev.type == 'mouseleave' && ev.fromElement) ||
            (ev.type == 'mouseover'  && ev.toElement) ||
            (ev.type == 'mouseenter' && ev.toElement) ||
            ev.srcElement ||
            null;
        return node && (node.nodeType == 3 || node.nodeType == 4) ? node.parentNode : node;
    },

    /**
     * @function {Node} ? - Returns the related target of the event object
     * @param {Object} ev - event object
     * @return The related target
     */
    relatedTarget: function(ev){
        var node = ev.relatedTarget ||
            // IE stuff
            (ev.type == 'mouseout'   && ev.toElement) ||
            (ev.type == 'mouseleave' && ev.toElement) ||
            (ev.type == 'mouseover'  && ev.fromElement) ||
            (ev.type == 'mouseenter' && ev.fromElement) ||
            null;
        return node && (node.nodeType == 3 || node.nodeType == 4) ? node.parentNode : node;
    },

    /**
     * @function {DOMElement} ?
     * @param {Object} ev - event object
     * @param {String} elmTagName - tag name to find
     * @param {Boolean} force - force the return of the wanted type of tag,
     * or false otherwise
     * @return the first element which matches given tag name or the
     * document element if the wanted tag is not found
     */
    findElement: function(ev, elmTagName, force)
    {
        var node = this.element(ev);
        while(true) {
            if(node.nodeName.toLowerCase() === elmTagName.toLowerCase()) {
                return node;
            } else {
                node = node.parentNode;
                if(!node) {
                    if(force) {
                        return false;
                    }
                    return document;
                }
                if(!node.parentNode){
                    if(force){ return false; }
                    return document;
                }
            }
        }
    },


    /**
     * @function ? Dispatch an event to element
     * @param {DOMElement|String} element - element id or element
     * @param {String} eventName - event name
     * @param {Object} memo - metadata for the event
     */
    fire: function(element, eventName, memo)
    {
        element = s$(element);
        var ev, nativeEvents;
        if(document.createEvent){
            nativeEvents = {
                "DOMActivate": true, "DOMFocusIn": true, "DOMFocusOut": true,
                "focus": true, "focusin": true, "focusout": true,
                "blur": true, "load": true, "unload": true, "abort": true,
                "error": true, "select": true, "change": true, "submit": true,
                "reset": true, "resize": true, "scroll": true,
                "click": true, "dblclick": true, "mousedown": true,
                "mouseenter": true, "mouseleave": true, "mousemove": true, "mouseover": true,
                "mouseout": true, "mouseup": true, "mousewheel": true, "wheel": true,
                "textInput": true, "keydown": true, "keypress": true, "keyup": true,
                "compositionstart": true, "compositionupdate": true, "compositionend": true,
                "DOMSubtreeModified": true, "DOMNodeInserted": true, "DOMNodeRemoved": true,
                "DOMNodeInsertedIntoDocument": true, "DOMNodeRemovedFromDocument": true,
                "DOMAttrModified": true, "DOMCharacterDataModified": true,
                "DOMAttributeNameChanged": true, "DOMElementNameChanged": true,
                "hashchange": true
            };
        } else {
            nativeEvents = {
                "onabort": true, "onactivate": true, "onafterprint": true, "onafterupdate": true,
                "onbeforeactivate": true, "onbeforecopy": true, "onbeforecut": true,
                "onbeforedeactivate": true, "onbeforeeditfocus": true, "onbeforepaste": true,
                "onbeforeprint": true, "onbeforeunload": true, "onbeforeupdate": true, "onblur": true,
                "onbounce": true, "oncellchange": true, "onchange": true, "onclick": true,
                "oncontextmenu": true, "oncontrolselect": true, "oncopy": true, "oncut": true,
                "ondataavailable": true, "ondatasetchanged": true, "ondatasetcomplete": true,
                "ondblclick": true, "ondeactivate": true, "ondrag": true, "ondragend": true,
                "ondragenter": true, "ondragleave": true, "ondragover": true, "ondragstart": true,
                "ondrop": true, "onerror": true, "onerrorupdate": true,
                "onfilterchange": true, "onfinish": true, "onfocus": true, "onfocusin": true,
                "onfocusout": true, "onhashchange": true, "onhelp": true, "onkeydown": true,
                "onkeypress": true, "onkeyup": true, "onlayoutcomplete": true,
                "onload": true, "onlosecapture": true, "onmessage": true, "onmousedown": true,
                "onmouseenter": true, "onmouseleave": true, "onmousemove": true, "onmouseout": true,
                "onmouseover": true, "onmouseup": true, "onmousewheel": true, "onmove": true,
                "onmoveend": true, "onmovestart": true, "onoffline": true, "ononline": true,
                "onpage": true, "onpaste": true, "onprogress": true, "onpropertychange": true,
                "onreadystatechange": true, "onreset": true, "onresize": true,
                "onresizeend": true, "onresizestart": true, "onrowenter": true, "onrowexit": true,
                "onrowsdelete": true, "onrowsinserted": true, "onscroll": true, "onselect": true,
                "onselectionchange": true, "onselectstart": true, "onstart": true,
                "onstop": true, "onstorage": true, "onstoragecommit": true, "onsubmit": true,
                "ontimeout": true, "onunload": true
            };
        }


        if(element !== null){
            if (element == document && document.createEvent && !element.dispatchEvent) {
                element = document.documentElement;
            }

            if (document.createEvent) {
                ev = document.createEvent("HTMLEvents");
                if(typeof nativeEvents[eventName] === "undefined"){
                    ev.initEvent("dataavailable", true, true);
                } else {
                    ev.initEvent(eventName, true, true);
                }

            } else {
                ev = document.createEventObject();
                if(typeof nativeEvents["on"+eventName] === "undefined"){
                    ev.eventType = "ondataavailable";
                } else {
                    ev.eventType = "on"+eventName;
                }
            }

            ev.eventName = eventName;
            ev.memo = memo || { };

            try {
                if (document.createEvent) {
                    element.dispatchEvent(ev);
                } else if(element.fireEvent){
                    element.fireEvent(ev.eventType, ev);
                } else {
                    return;
                }
            } catch(ex) {}

            return ev;
        }
    },

    /**
     * @function ? Attach an event to element
     * @param {DOMElement|String} element - element id or element
     * @param {String} eventName - event name
     * @param {Function} callBack - Receives event object as a
     * parameter. If you're manually firing custom events, check the
     * eventName property of the event object to make sure you're handling
     * the right event.
     */
    observe: function(element, eventName, callBack)
    {
        element = s$(element);
        if(element !== null) {
            if(eventName.indexOf(':') != -1 ||
                (eventName == "hashchange" && element.attachEvent && !window.onhashchange)
                ) {

                /**
                 *
                 * prevent that each custom event fire without any test
                 * This prevents that if you have multiple custom events
                 * on dataavailable to trigger the callback event if it
                 * is a different custom event
                 *
                 */
                var argCallback = callBack;
                callBack = function(ev, eventName, cb){

                  //tests if it is our event and if not
                  //check if it is IE and our dom:loaded was overrided (IE only supports one ondatavailable)
                  //- fix /opera also supports attachEvent and was firing two events
                  if(ev.eventName === eventName || (SAPO.Browser.IE && eventName == 'dom:loaded')){
                    //fix for FF since it loses the event in case of using a second binObjEvent
                    if(window.addEventListener){
                      window.event = ev;
                    }
                    cb();
                  }

                }.bindObjEvent(this, eventName, argCallback);

                eventName = 'dataavailable';
            }






            if(element.addEventListener) {
                element.addEventListener(eventName, callBack, false);
            } else {
                element.attachEvent('on' + eventName, callBack);
            }
        }
    },

    /**
     * @function ? Remove an event attached to an element
     * @param {DOMElement|String} element - element id or element
     * @param {String} eventName - event name
     * @param {Function} callBack - callback function
     */
    stopObserving: function(element, eventName, callBack)
    {
        element = s$(element);

        if(element !== null) {
            if(element.removeEventListener) {
                element.removeEventListener(eventName, callBack, false);
            } else {
                element.detachEvent('on' + eventName, callBack);
            }
        }
    },

    /**
     * @function ? stops event propagation and bubbling
     * @param {Object} event - event handle
     */
    stop: function(event)
    {
        if(event.cancelBubble !== null) {
            event.cancelBubble = true;
        }
        if(event.stopPropagation) {
            event.stopPropagation();
        }
        if(event.preventDefault) {
            event.preventDefault();
        }
        if(window.attachEvent) {
            event.returnValue = false;
        }
        if(event.cancel !== null) {
            event.cancel = true;
        }
    },

    /**
     * @function ? stops event default behaviour
     * @param {Object} event - event handle
     */
    stopDefault: function(event)
    {       
        if(event.preventDefault) {
            event.preventDefault();
        }
        if(window.attachEvent) {
            event.returnValue = false;
        }
        if(event.cancel !== null) {
            event.cancel = true;
        }
    },

    /**
     * @function {Object} ?
     * @param {Object} ev - event object
     * @return an object with the mouse X and Y position
     */
    pointer: function(ev)
    {
        return {
                x: ev.pageX || (ev.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)),
                y: ev.pageY || (ev.clientY + (document.documentElement.scrollTop || document.body.scrollTop))
        };
    },

    /**
     * @function {Number} ?
     * @param {Object} ev - event object
     * @return mouse X position
     */
    pointerX: function(ev)
    {
        return this.pointer(ev).x;
    },

    /**
     * @function {Number} ?
     * @param {Object} ev - event object
     * @return mouse Y position
     */
    pointerY: function(ev)
    {
        return this.pointer(ev).y;
    },

    /**
     * @function {Boolean} ?
     * @param {Object} ev - event object
     * @return True if there is a left click on the event
     */
    isLeftClick: function(ev) {
        if (window.addEventListener) {
            if(ev.button === 0){
                return true;
            }
            else if(ev.type.substring(0,5) == 'touch' && ev.button == null){
                return true;
            }
        }
        else {
            if(ev.button === 1){ return true; }
        }
        return false;
    },

    /**
     * @function {Boolean} ?
     * @param {Object} ev - event object
     * @return True if there is a right click on the event
     */
    isRightClick: function(ev) {
        if(ev.button === 2){ return true; }
        return false;
    },

    /**
     * @function {Boolean} ?
     * @param {Object} ev - event object
     * @return True if there is a middle click on the event
     */
    isMiddleClick: function(ev) {
        if (window.addEventListener) {
            if(ev.button === 1){ return true; }
        }
        else {
            if(ev.button === 4){ return true; }
        }
        return false;
    },

    /**
     * Work in Progress.
     * Used in SAPO.Component.MaskedInput
     * @function {String} ?
     * @param {KeyboardEvent}       event           - keyboard event
     * @param {optional Boolean}    changeCasing    - if true uppercases, if false lowercases, otherwise keeps casing
     * @return character representation of pressed key combination
     */
    getCharFromKeyboardEvent: function(event, changeCasing) {
        var k = event.keyCode;
        var c = String.fromCharCode(k);

        var shiftOn = event.shiftKey;
        if (k >= 65 && k <= 90) {   // A-Z
            if (typeof changeCasing === 'boolean') {
                shiftOn = changeCasing;
            }
            return (shiftOn) ? c : c.toLowerCase();
        }
        else if (k >= 96 && k <= 105) { // numpad digits
            return String.fromCharCode( 48 + (k-96) );
        }
        switch (k) {
            case 109:   case 189:   return '-';
            case 107:   case 187:   return '+';
        }
        return c;
    },

    debug: function(){}
};



/*jshint browser:true, eqeqeq:true, undef:true, curly:true, laxbreak:true, boss:true */
/*global SAPO:false, s$:false */



SAPO.namespace('Dom');

/**
 * @namespace SAPO.Dom.Element
 */
SAPO.Dom.Element = {

    /**
     * @function {DOMElement|Array} ? Shortcut for document.getElementById
     *
     * @param {string|Array} elm - Receives either an id or an Array of id's
     *
     * @return Either the DOM element for the given id or an array of elements for the given ids
     */
    get: function(elm) {
        if(typeof elm !== 'undefined') {
            if(typeof elm === 'string') {
                return document.getElementById(elm);
            }
            return elm;
        }
        return null;
    },

    /**
     * @function {DOMElement} ? Creates a DOM element
     * @param {String} tag - tag name
     * @param {Object} properties - object with properties to be set on the element
     */
    create: function(tag, properties) {
        var el = document.createElement(tag);
        SAPO.extendObj(el, properties);
        return el;
    },

    /**
     * @function ? Scrolls to an element
     * @param {DOMElement|String} elm - Element where to scroll
     */
    scrollTo: function(elm) {
        elm = this.get(elm);
        if(elm) {
            if (elm.scrollIntoView) {
                return elm.scrollIntoView();
            }

            var elmOffset = {},
                elmTop = 0, elmLeft = 0;

            do {
                elmTop += elm.offsetTop || 0;
                elmLeft += elm.offsetLeft || 0;

                elm = elm.offsetParent;
            } while(elm);

            elmOffset = {x: elmLeft, y: elmTop};

            window.scrollTo(elmOffset.x, elmOffset.y);
        }
    },

    /**
     * @function {Number} ? Gets the top cumulative offset for an element
     * @param {DOMElement|String} elm - target element
     * @return Offset from the target element to the top of the document
     */
    offsetTop: function(elm) {
        elm = this.get(elm);

        var offset = elm.offsetTop;

        while(elm.offsetParent){
            if(elm.offsetParent.tagName.toLowerCase() !== "body"){
                elm = elm.offsetParent;
                offset += elm.offsetTop;
            } else {
                break;
            }
        }

        return offset;
    },

    /**
     * @function {Number} ? Gets the left cumulative offset for an element
     * @param {DOMElement|String} elm - target element
     * @return Offset from the target element to the left of the document
     */
    offsetLeft: function(elm) {
        elm = this.get(elm);

        var offset = elm.offsetLeft;

        while(elm.offsetParent){
            if(elm.offsetParent.tagName.toLowerCase() !== "body"){
                elm = elm.offsetParent;
                offset += elm.offsetLeft;
            } else {
                break;
            }
        }

        return offset;
    },

    /**
    * @function {Array} ? gets the element offset relative to its closest positioned ancestor
    * @param {DOMElement|String} elm - target element
    * @return Array with the element offsetleft and offsettop relative to the closest positioned ancestor
    */
    positionedOffset: function(element) {
        var valueTop = 0, valueLeft = 0;
        element = this.get(element);
        do {
            valueTop  += element.offsetTop  || 0;
            valueLeft += element.offsetLeft || 0;
            element = element.offsetParent;
            if (element) {
                if (element.tagName.toLowerCase() === 'body') { break;  }

                var value = element.style.position;
                if (!value && element.currentStyle) {
                    value = element.currentStyle.position;
                }
                if ((!value || value === 'auto') && typeof getComputedStyle !== 'undefined') {
                    var css = getComputedStyle(element, null);
                    value = css ? css.position : null;
                }
                if (value === 'relative' || value === 'absolute') { break;  }
            }
        } while (element);
        return [valueLeft, valueTop];
    },

    /**
     * @function {Array} ? Gets the cumulative offset for an element
     * @param {DOMElement|String} elm - target element
     * @return Array with offset from the target element to the top/left of the document
     */
    offset: function(elm) {
        return [
            this.offsetLeft(elm),
            this.offsetTop(elm)
        ];
    },

    /**
     * @function {Array} ? Gets the scroll of the element
     * @param {optional DOMElement|String} elm - target element or document.body
     */
    scroll: function(elm) {
        elm = elm ? s$(elm) : document.body;
        return [
            ( ( !window.pageXOffset ) ? elm.scrollLeft : window.pageXOffset ),
            ( ( !window.pageYOffset ) ? elm.scrollTop : window.pageYOffset )
        ];
    },

    _getPropPx: function(cs, prop) {
        var n, c;
        var val = cs.getPropertyValue ? cs.getPropertyValue(prop) : cs[prop];
        if (!val) { n = 0; }
        else {
            c = val.indexOf('px');
            if (c === -1) { n = 0; }
            else {
                n = parseInt(val, 10);
            }
        }

        //console.log([prop, ' "', val, '" ', n].join(''));

        return n;
    },

    /**
     * @function {Number[2]} ? returns the top left position of the element on the page
     * @param {String|DOMElement} el
     */
    offset2: function(el) {
        el = s$(el);
        var bProp = ['border-left-width', 'border-top-width'];
        var res = [0, 0];
        var dRes, bRes, parent, cs;
        var getPropPx = SAPO.Dom.Element._getPropPx;

        do {
            cs = window.getComputedStyle ? window.getComputedStyle(el, null) : el.currentStyle;
            dRes = [el.offsetLeft | 0, el.offsetTop | 0];
            bRes = [getPropPx(cs, bProp[0]), getPropPx(cs, bProp[1])];
            //console.log([el, dRes.join(','), bRes.join(',')]);
            if (SAPO.Browser.OPERA) {   // apparently Opera does need border width correction
                res[0] += dRes[0];
                res[1] += dRes[1];
            }
            else {
                res[0] += dRes[0] + bRes[0];
                res[1] += dRes[1] + bRes[1];
            }
            parent = el.offsetParent;
            //console.log(parent);
        } while (el = parent);

        bRes = [getPropPx(cs, bProp[0]), getPropPx(cs, bProp[1])];

        if (SAPO.Browser.OPERA) {
        }
        else if (SAPO.Browser.GECKO) {
            res[0] += bRes[0];
            res[1] += bRes[1];
        }
        else {
            res[0] -= bRes[0];
            res[1] -= bRes[1];
        }
        return res;
    },

    /**
     * @function {Boolean} ? Verifies the existence of an attribute
     * @param {Object} elm - target element
     * @param {String} attr - attribute name
     * @return Boolean based on existance of attribute
     */
    hasAttribute: function(elm, attr){
        return elm.hasAttribute ? elm.hasAttribute(attr) : !!elm.getAttribute(attr);
    },
    /**
     * @function ? Inserts a element immediately after a target element
     * @param {DOMElement} newElm - element to be inserted
     * @param {DOMElement|String} targetElm - key element
     */
    insertAfter: function(newElm,targetElm) {
        if (targetElm = this.get(targetElm)) {
            targetElm.parentNode.insertBefore(newElm, targetElm.nextSibling);
        }
    },

    /**
     * @function ? Inserts a element at the top of the childNodes of a target element
     * @param {DOMElement} newElm - element to be inserted
     * @param {DOMElement|String} targetElm - key element
     */
    insertTop: function(newElm,targetElm) {
        if (targetElm = this.get(targetElm)) {
            targetElm.insertBefore(newElm, targetElm.firstChild);
        }
    },

    /**
     * @function ? Retreives textContent from node
     * @param {DOMNode} node from which to retreive text from.
     *                  Can be any node type.
     * @return {String} the text
     */
    textContent: function(node){
        node = s$(node);
        var text;

        switch(node && node.nodeType) {
        case 9: /*DOCUMENT_NODE*/
            // IE quirks mode does not have documentElement
            return this.textContent(node.documentElement || node.body && node.body.parentNode || node.body);

        case 1: /*ELEMENT_NODE*/
            text = node.innerText;
            if (typeof text !== 'undefined') {
                return text;
            }
            /* falls through */

        case 11: /*DOCUMENT_FRAGMENT_NODE*/
            text = node.textContent;
            if (typeof text !== 'undefined') {
                return text;
            }

            if (node.firstChild === node.lastChild) {
                // Common case: 0 or 1 children
                return this.textContent(node.firstChild);
            }

            text = [];
            for (var k = 0, child, cs = node.childNodes, m = cs.length; k < m, child = cs[k]; k++) {
                text.push(this.textContent(child));
            }
            return text.join('');

        case 3: /*TEXT_NODE*/
        case 4: /*CDATA_SECTION_NODE*/
            return node.nodeValue;
        }
        return '';
    },

    /**
     * @function ? Removes all nodes children and adds the text
     * @param {DOMNode} node from which to retreive text from.
     *                  Can be any node type.
     * @return {String} the text
     */
    setTextContent: function(node, text){
        node = s$(node);
        switch(node && node.nodeType)
        {
        case 1: /*ELEMENT_NODE*/
            if ('innerText' in node) {
                node.innerText = text;
                break;
            }
            /* fallthrough */

        case 11: /*DOCUMENT_FRAGMENT_NODE*/
            if ('textContent' in node) {
                node.textContent = text;
                break;
            }
            /* fallthrough */

        case 9: /*DOCUMENT_NODE*/
            while(node.firstChild) {
                node.removeChild(node.firstChild);
            }
            if (text !== '') {
                var doc = node.ownerDocument || node;
                node.appendChild(doc.createTextNode(text));
            }
            break;

        case 3: /*TEXT_NODE*/
        case 4: /*CDATA_SECTION_NODE*/
            node.nodeValue = text;
            break;
        }
    },

    /**
     * @function ? Tells if element is a clickable link
     * @param {DOMNode} node to check if it's link
     * @return {Boolean}
     */
    isLink: function(element){
        var b = element && element.nodeType === 1 && ((/^a|area$/i).test(element.tagName) ||
            element.hasAttributeNS && element.hasAttributeNS('http://www.w3.org/1999/xlink','href'));
        return !!b;
    },

    /**
     * @function ? Tells if ancestor is ancestor of node
     * @param {DOMNode} ancestor node
     * @param {DOMNode} descendant node
     * @return {Boolean}
     */
    isAncestorOf: function(ancestor, node){
        if (!node || !ancestor) {
            return false;
        }
        if (node.compareDocumentPosition) {
            return (ancestor.compareDocumentPosition(node) & 0x10) !== 0;/*Node.DOCUMENT_POSITION_CONTAINED_BY*/
        }
        while (node = node.parentNode){
            if (node === ancestor){
                return true;
            }
        }
        return false;
    },

    /**
     * @function ? Tells if descendant is descendant of node
     * @param {DOMNode} node the ancestor
     * @param {DOMNode} descendant the descendant
     * @return {Boolean} true if 'descendant' is descendant of 'node'
     */
    descendantOf: function(node, descendant){
        return node !== descendant && this.isAncestorOf(node, descendant);
    },

    /**
     * @function ? Get first child in document order of node type 1
     * @param {DOMNode} parent node
     * @return {DOMNode} the element child
     */
    firstElementChild: function(elm){
        if(!elm) {
            return null;
        }
        if ('firstElementChild' in elm) {
            return elm.firstElementChild;
        }
        var child = elm.firstChild;
        while(child && child.nodeType !== 1) {
            child = child.nextSibling;
        }
        return child;
    },

    /**
     * @function ? Get last child in document order of node type 1
     * @param {DOMNode} parent node
     * @return {DOMNode} the element child
     */
    lastElementChild: function(elm){
        if(!elm) {
            return null;
        }
        if ('lastElementChild' in elm) {
            return elm.lastElementChild;
        }
        var child = elm.lastChild;
        while(child && child.nodeType !== 1) {
            child = child.previousSibling;
        }
        return child;
    },


    /**
     * @function ? Get the first element sibling after the node
     * @param {DOMNode}         current node
     * @return {DOMNode|Null}   the first element sibling after node or null if none is found
     */
    nextElementSibling: function(node){
        var sibling = null;

        if(!node){ return sibling; }

        if("nextElementSibling" in node){
            return node.nextElementSibling;
        } else {
            sibling = node.nextSibling;

            // 1 === Node.ELEMENT_NODE
            while(sibling && sibling.nodeType !== 1){
                sibling = sibling.nextSibling;
            }

            return sibling;
        }
    },

    /**
     * @function ? Get the first element sibling before the node
     * @param {DOMNode}         current node
     * @return {DOMNode|Null}   the first element sibling before node or null if none is found
     */
    previousElementSibling: function(node){
        var sibling = null;

        if(!node){ return sibling; }

        if("previousElementSibling" in node){
            return node.previousElementSibling;
        } else {
            sibling = node.previousSibling;

            // 1 === Node.ELEMENT_NODE
            while(sibling && sibling.nodeType !== 1){
                sibling = sibling.previousSibling;
            }

            return sibling;
        }
    },

    /**
     * @function ?
     * @param {DOMElement|string} element target DOM element or target ID
     * @return {Number} element width
     */
    elementWidth: function(element) {
        if(typeof element === "string") {
            element = document.getElementById(element);
        }
        return element.offsetWidth;
    },

    /**
     * @function ?
     * @param {DOMElement|string} element target DOM element or target ID
     * @return {Number} element height
     */
    elementHeight: function(element) {
        if(typeof element === "string") {
            element = document.getElementById(element);
        }
        return element.offsetHeight;
    },

    /**
     * @function ?
     * @param {DOMElement|string} element target DOM element or target ID
     * @return {Number} element left position
     */
    elementLeft: function(element) {
        if(typeof element === "string") {
            element = document.getElementById(element);
        }
        return element.offsetLeft;
    },

    /**
     * @function ?
     * @param {DOMElement|string} element target DOM element or target ID
     * @return {Number} element top position
     */
    elementTop: function(element) {
        if(typeof element === "string") {
            element = document.getElementById(element);
        }
        return element.offsetTop;
    },

    /**
     * @function ? {Number}
     * @param {element} element target element
     * @return {Array} array with element's width and height
     */
    elementDimensions: function(element) {
        if(typeof element === "string") {
            element = document.getElementById(element);
        }
        return Array(element.offsetWidth, element.offsetHeight);
    },

    /**
     * @function ?
     * @param {DOMElement} element to be position cloned
     * @param {DOMElement} element to get the cloned position
     * @return {DOMElement} the element with positionClone
     */
    clonePosition: function(cloneTo, cloneFrom){
        cloneTo.style.top = this.offsetTop(cloneFrom) + 'px';
        cloneTo.style.left = this.offsetLeft(cloneFrom) + 'px';

        return cloneTo;
    },

    /**
     * Slices off a piece of text at the end of the element and adds the ellipsis
     * so all text fits in the element.
     * @param element   which text is to add the ellipsis
     * @param ellipsis  Optional. String to append to the chopped text.
     */
    ellipsizeText: function(element, ellipsis){
        if (element = s$(element)){
            while (element && element.scrollHeight > (element.offsetHeight + 8)) {
                element.textContent = element.textContent.replace(/(\s+\S+)\s*$/, replace || '\u2026');
            }
        }
    },

    /**
     * @function {HtmlElement|false} ? searches up the DOM tree for an element of specified class name
     * @param {HtmlElement} element
     * @param {String}      className
     */
    findUpwardsByClass: function(element, className) {
        var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
        while (true) {
            if (typeof(element.className) !== 'undefined' && re.test(element.className)) {
                return element;
            }
            else {
                element = element.parentNode;
                if (!element || element.nodeType !== 1) {
                    return false;
                }
            }
        }
    },


    /**
     * @function {HtmlElement|false} ? searches up the DOM tree for an element of specified class name
     * @param {HtmlElement} element
     * @param {String}      className
     */
    findUpwardsByTag: function(element, tag) {
        while (true) {
            if (element && element.nodeName.toUpperCase() === tag.toUpperCase()) {
                return element;
            } else {
                element = element.parentNode;
                if (!element || element.nodeType !== 1) {
                    return false;
                }
            }
        }
    },


    /**
     * @function {HtmlElement|false} ? searches up the DOM tree for an element of specified id
     * @param {HtmlElement} element
     * @param {String}      id
     */
    findUpwardsById: function(element, id) {
        while (true) {
            if (typeof(element.id) !== 'undefined' && element.id === id) {
                return element;
            } else {
                element = element.parentNode;
                if (!element || element.nodeType !== 1) {
                    return false;
                }
            }
        }
    },


    /**
     * @function {String} ? returns trimmed text content of descendants
     * @param {DOMElement}          el          - element being seeked
     * @param {optional Boolean}    removeIt    - whether to remove the found text nodes or not
     * @return text found
     */
    getChildrenText: function(el, removeIt) {
        var node,
            j,
            part,
            nodes = el.childNodes,
            jLen = nodes.length,
            text = '';

        if (!el) {
            return text;
        }

        for (j = 0; j < jLen; ++j) {
            node = nodes[j];
            if (!node) {    continue;   }
            if (node.nodeType === 3) {  // TEXT NODE
                part = this._trimString( String(node.data) );
                if (part.length > 0) {
                    text += part;
                    if (removeIt) { el.removeChild(node);   }
                }
                else {  el.removeChild(node);   }
            }
        }

        return text;
    },

    /**
     * Used by getChildrenText
     * @function {private String} ? string trim implementation
     * @param {String} text
     */
    _trimString: function(text) {
        return (String.prototype.trim) ? text.trim() : text.replace(/^\s*/, '').replace(/\s*$/, '');
    },


    /**
     * @function {Array} ? possible values
     * @param {DomElement|String} select element
     */
    getSelectValues: function (select) {
        var selectEl = s$(select);
        var values = [];
        for (var i = 0; i < selectEl.options.length; ++i) {
            values.push( selectEl.options[i].value );
        }
        return values;
    },


    /* used by fills */
    _normalizeData: function(data) {
        var d, data2 = [];
        for (var i = 0, f = data.length; i < f; ++i) {
            d = data[i];

            if (!(d instanceof Array)) {    // if not array, wraps primitive twice:     val -> [val, val]
                d = [d, d];
            }
            else if (d.length === 1) {      // if 1 element array:                      [val] -> [val, val]
                d.push(d[0]);
            }
            data2.push(d);
        }
        return data2;
    },


    /**
     * @function ? fills select element with choices
     * @param {DomElement|String}           container       select element which will get filled
     * @param {Number[]|String[]|Array[]}   data            data which will populate the component
     * @param {optional Boolean}            skipEmpty       true to skip empty option
     * @param {optional String|Number}      defaultValue    primitive value to select at beginning
     */
    fillSelect: function(container, data, skipEmpty, defaultValue) {
        var containerEl = s$(container);
        if (!containerEl) {   return; }

        containerEl.innerHTML = '';
        var d, optionEl;

        if (!skipEmpty) {
            // add initial empty option
            optionEl = document.createElement('option');
            optionEl.setAttribute('value', '');
            containerEl.appendChild(optionEl);
        }

        data = SAPO.Dom.Element._normalizeData(data);

        for (var i = 0, f = data.length; i < f; ++i) {
            d = data[i];

            optionEl = document.createElement('option');
            optionEl.setAttribute('value', d[0]);
            if (d.length > 2) {
                optionEl.setAttribute('extra', d[2]);
            }
            optionEl.appendChild( document.createTextNode(d[1]) );

            if (d[0] === defaultValue) {
                optionEl.setAttribute('selected', 'selected');
            }

            containerEl.appendChild(optionEl);
        }
    },


    /**
     * @function ? select element on steroids - allows the creation of new values
     * @param {DomElement|String} ctn select element which will get filled
     * @param {Object} opts
     * @... {Number[]|String[]|Array[]}             data                data which will populate the component
     * @... {optional Boolean}                      skipEmpty           if true empty option is not created (defaults to false)
     * @... {optional String}                       emptyLabel          label to display on empty option
     * @... {optional String}                       createLabel         label to display on create option
     * @... {optional String}                       optionsGroupLabel   text to display on group surrounding value options
     * @... {optional String}                       defaultValue        option to select initially
     * @... {optional Function(selEl, addOptFn)}    onCreate            callback that gets called once user selects the create option
     */
    fillSelect2: function(ctn, opts) {
        ctn = s$(ctn);
        ctn.innerHTML = '';

        var defs = {
            skipEmpty:              false,
            skipCreate:             false,
            emptyLabel:             'none',
            createLabel:            'create',
            optionsGroupLabel:      'groups',
            emptyOptionsGroupLabel: 'none exist',
            defaultValue:           ''
        };
        if (!opts) {      throw 'param opts is a requirement!';   }
        if (!opts.data) { throw 'opts.data is a requirement!';    }
        opts = SAPO.extendObj(defs, opts);

        var optionEl, optGroupEl, d;

        var optGroupValuesEl = document.createElement('optgroup');
        optGroupValuesEl.setAttribute('label', opts.optionsGroupLabel);

        opts.data = SAPO.Dom.Element._normalizeData(opts.data);

        if (!opts.skipCreate) {
            opts.data.unshift(['$create$', opts.createLabel]);
        }

        if (!opts.skipEmpty) {
            opts.data.unshift(['', opts.emptyLabel]);
        }

        for (var i = 0, f = opts.data.length; i < f; ++i) {
            d = opts.data[i];

            optionEl = document.createElement('option');
            optionEl.setAttribute('value', d[0]);
            optionEl.appendChild( document.createTextNode(d[1]) );

            if (d[0] === opts.defaultValue) {   optionEl.setAttribute('selected', 'selected');  }

            if (d[0] === '' || d[0] === '$create$') {
                ctn.appendChild(optionEl);
            }
            else {
                optGroupValuesEl.appendChild(optionEl);
            }
        }

        var lastValIsNotOption = function(data) {
            var lastVal = data[data.length-1][0];
            return (lastVal === '' || lastVal === '$create$');
        };

        if (lastValIsNotOption(opts.data)) {
            optionEl = document.createElement('option');
            optionEl.setAttribute('value', '$dummy$');
            optionEl.setAttribute('disabled', 'disabled');
            optionEl.appendChild(   document.createTextNode(opts.emptyOptionsGroupLabel)    );
            optGroupValuesEl.appendChild(optionEl);
        }

        ctn.appendChild(optGroupValuesEl);

        var addOption = function(v, l) {
            var optionEl = ctn.options[ctn.options.length - 1];
            if (optionEl.getAttribute('disabled')) {
                optionEl.parentNode.removeChild(optionEl);
            }

            // create it
            optionEl = document.createElement('option');
            optionEl.setAttribute('value', v);
            optionEl.appendChild(   document.createTextNode(l)  );
            optGroupValuesEl.appendChild(optionEl);

            // select it
            ctn.options[ctn.options.length - 1].setAttribute('selected', true);
        };

        if (!opts.skipCreate) {
            ctn.onchange = function() {
                if ((ctn.value === '$create$') && (typeof opts.onCreate === 'function')) {  opts.onCreate(ctn, addOption);  }
            };
        }
    },


    /**
     * @function {DomElement} ? creates set of radio buttons, returns wrapper
     * @param {DomElement|String}           insertAfterEl   element which will precede the input elements
     * @param {String}                      name            name to give to the form field ([] is added if not as suffix already)
     * @param {Number[]|String[]|Array[]}   data            data which will populate the component
     * @param {optional Boolean}            skipEmpty       true to skip empty option
     * @param {optional String|Number}      defaultValue    primitive value to select at beginning
     * @param {optional String}             splitEl         name of element to add after each input element (example: 'br')
     */
    fillRadios: function(insertAfterEl, name, data, skipEmpty, defaultValue, splitEl) {
        var afterEl = s$(insertAfterEl);
        afterEl = afterEl.nextSibling;
        while (afterEl && afterEl.nodeType !== 1) {
            afterEl = afterEl.nextSibling;
        }
        var containerEl = document.createElement('span');
        if (afterEl) {  afterEl.parentNode.insertBefore(containerEl, afterEl);  }
        else {          s$(insertAfterEl).appendChild(containerEl);             }

        data = SAPO.Dom.Element._normalizeData(data);

        if (name.substring(name.length - 1) !== ']') {
            name += '[]';
        }

        var d, inputEl;

        if (!skipEmpty) {
            // add initial empty option
            inputEl = document.createElement('input');
            inputEl.setAttribute('type', 'radio');
            inputEl.setAttribute('name', name);
            inputEl.setAttribute('value', '');
            containerEl.appendChild(inputEl);
            if (splitEl) {  containerEl.appendChild( document.createElement(splitEl) ); }
        }

        for (var i = 0; i < data.length; ++i) {
            d = data[i];

            inputEl = document.createElement('input');
            inputEl.setAttribute('type', 'radio');
            inputEl.setAttribute('name', name);
            inputEl.setAttribute('value', d[0]);
            containerEl.appendChild(inputEl);
            containerEl.appendChild( document.createTextNode(d[1]) );
            if (splitEl) {  containerEl.appendChild( document.createElement(splitEl) ); }

            if (d[0] === defaultValue) {
                inputEl.checked = true;
            }
        }

        return containerEl;
    },


    /**
     * @function {DomElement} ? creates set of checkbox buttons, returns wrapper
     * @param {DomElement|String}           insertAfterEl   element which will precede the input elements
     * @param {String}                      name            name to give to the form field ([] is added if not as suffix already)
     * @param {Number[]|String[]|Array[]}   data            data which will populate the component
     * @param {optional Boolean}            skipEmpty       true to skip empty option
     * @param {optional String|Number}      defaultValue    primitive value to select at beginning
     * @param {optional String}             splitEl         name of element to add after each input element (example: 'br')
     */
    fillChecks: function(insertAfterEl, name, data, defaultValue, splitEl) {
        var afterEl = s$(insertAfterEl);
        afterEl = afterEl.nextSibling;
        while (afterEl && afterEl.nodeType !== 1) {
            afterEl = afterEl.nextSibling;
        }
        var containerEl = document.createElement('span');
        if (afterEl) {  afterEl.parentNode.insertBefore(containerEl, afterEl);  }
        else {          s$(insertAfterEl).appendChild(containerEl);             }

        data = SAPO.Dom.Element._normalizeData(data);

        if (name.substring(name.length - 1) !== ']') {
            name += '[]';
        }

        var d, inputEl;

        for (var i = 0; i < data.length; ++i) {
            d = data[i];

            inputEl = document.createElement('input');
            inputEl.setAttribute('type', 'checkbox');
            inputEl.setAttribute('name', name);
            inputEl.setAttribute('value', d[0]);
            containerEl.appendChild(inputEl);
            containerEl.appendChild( document.createTextNode(d[1]) );
            if (splitEl) {  containerEl.appendChild( document.createElement(splitEl) ); }

            if (d[0] === defaultValue) {
                inputEl.checked = true;
            }
        }

        return containerEl;
    },


    /**
     * @function ? returns index of element from parent, -1 if not child of parent...
     * @param {DOMElement}  parentEl    Element to parse
     * @param {DOMElement}  childEl     Child Element to look for
     */
    parentIndexOf: function(parentEl, childEl) {
        var node, idx = 0;
        for (var i = 0, f = parentEl.childNodes.length; i < f; ++i) {
            node = parentEl.childNodes[i];
            if (node.nodeType === 1) {  // ELEMENT
                if (node === childEl) { return idx; }
                ++idx;
            }
        }
        return -1;
    },


    /*
     * @function {public} ? returns an array of elements, of the next siblings
     * @param {String|DomElement} elm element
     * @return {Array} Array of elements
    */
    nextSiblings: function(elm) {
        if(typeof(elm) === "string") {
            elm = document.getElementById(elm);
        }
        if(typeof(elm) === 'object' && elm !== null && elm.nodeType && elm.nodeType === 1) {
            var elements    = [],
                siblings    = elm.parentNode.children,
                index       = SAPO.Dom.Element.parentIndexOf(elm.parentNode, elm);

            for(var i = ++index, len = siblings.length; i<len; i++) {
                elements.push(siblings[i]);
            }

            return elements;
        }
        return [];
    },


    /*
     * @function {public} ? returns an array of elements, of the previous siblings
     * @param {String|DomElement} elm element
     * @return {Array} Array of elements
    */
    previousSiblings: function(elm) {
        if(typeof(elm) === "string") {
            elm = document.getElementById(elm);
        }
        if(typeof(elm) === 'object' && elm !== null && elm.nodeType && elm.nodeType === 1) {
            var elements    = [],
                siblings    = elm.parentNode.children,
                index       = SAPO.Dom.Element.parentIndexOf(elm.parentNode, elm);

            for(var i = 0, len = index; i<len; i++) {
                elements.push(siblings[i]);
            }

            return elements;
        }
        return [];
    },


    /*
     * @function {public} ? returns an array of elements, of the siblings
     * @param {String|DomElement} elm element
     * @return {Array} Array of elements
    */
    siblings: function(elm) {
        if(typeof(elm) === "string") {
            elm = document.getElementById(elm);
        }
        if(typeof(elm) === 'object' && elm !== null && elm.nodeType && elm.nodeType === 1) {
            var elements   = [],
                siblings   = elm.parentNode.children;

            for(var i = 0, len = siblings.length; i<len; i++) {
                if(elm !== siblings[i]) {
                    elements.push(siblings[i]);
                }
            }

            return elements;
        }
        return [];
    },

    /**
     * @function ? fallback to elem.childElementCount
     * @param {String|DomElement} elm element
     */
    childElementCount: function(elm) {
        elm = s$(elm);
        if ('childElementCount' in elm) {
            return elm.childElementCount;
        }
        if (!elm) { return 0; }
        return this.siblings(elm).length + 1;
    },

    /*
     * @function {public} ? parses and appends an html string to a container, not destroying it's content
     * @param {String|DomElement} elm element
     * @param {String} html html string
     * @return {Array} Array of elements
    */
    appendHTML: function(elm, html){
        var temp = document.createElement('div');
        temp.innerHTML = html;
        var tempChildren = temp.children;
        for (var i = 0; i < tempChildren.length; i++){
            elm.appendChild(tempChildren[i]);
        }
    },

    /*
     * @function {public} ? parses and prepends an html string to a container, not destroying it's content
     * @param {String|DomElement} elm element
     * @param {String} html html string
     * @return {Array} Array of elements
    */
    prependHTML: function(elm, html){
        var temp = document.createElement('div');
        temp.innerHTML = html;
        var first = elm.firstChild;
        var tempChildren = temp.children;
        for (var i = tempChildren.length - 1; i >= 0; i--){
            elm.insertBefore(tempChildren[i], first);
            first = elm.firstChild;
        }
    },

    /*
     * @function {public} ? pass an html string and receive a documentFragment with the corresponding elements
     * @param  {String} html            html string
     * @return {DocumentFragment}       DocumentFragment containing all of the elements from the html string
     */
    htmlToFragment: function(html){
        if(typeof document.createRange === 'function' && typeof Range.prototype.createContextualFragment === 'function'){
            this.htmlToFragment = function(html){
                var range;

                if(typeof html !== 'string'){ return document.createDocumentFragment(); }

                range = document.createRange();

                // set the context to document.body (firefox does this already, webkit doesn't)
                range.selectNode(document.body);

                return range.createContextualFragment(html);
            };
        } else {
            this.htmlToFragment = function(html){
                var fragment = document.createDocumentFragment(),
                    tempElement,
                    current;

                if(typeof html !== 'string'){ return fragment; }

                tempElement = document.createElement('div');
                tempElement.innerHTML = html;

                // append child removes elements from the original parent
                while(current = tempElement.firstChild){ // intentional assignment
                    fragment.appendChild(current);
                }

                return fragment;
            };
        }

        return this.htmlToFragment.call(this, html);
    }
};




(function(window, undefined) {

    'use strict';

    SAPO.namespace('Dom');

    if (SAPO.Dom.Css) { return; } // Dom.Css has internal state regarding loaded CSS files. this prevents replacing the module.

    /**
     * @namespace SAPO.Dom.Css
     * requires if IE                            {@link SAPO.Dom.Event}
     * requires if method changeFontSize is used {@link SAPO.Dom.Selector}
     */
    SAPO.Dom.Css = {
        /**
         * @function ? adds or removes a class to the given element according to addRemState
         * @param {DOMElement|string}   elm         - DOM element or element id
         * @param {string}              className   - class name
         * @param {boolean}             addRemState - which method to apply
         */
        addRemoveClassName: function(elm, className, addRemState) {
            if (addRemState) {
                return SAPO.Dom.Css.addClassName(elm, className);
            }
            SAPO.Dom.Css.removeClassName(elm, className);
        },

        /**
         * @function ? add a class to a given element
         * @param {DOMElement|String} elm - DOM element or element id
         * @param {String} class name
         */
        addClassName: function(elm, className) {
            elm = s$(elm);
            if (elm && className) {
                if (typeof elm.classList !== "undefined"){
                    elm.classList.add(className);
                }
                else if (!this.hasClassName(elm, className)) {
                    elm.className += (elm.className ? ' ' : '') + className;
                }
            }
        },

        /**
         * @function ? removes a class from a given element
         * @param {DOMElement|String} elm - DOM element or element id
         * @param {String} class name
         */
        removeClassName: function(elm, className) {
            elm = s$(elm);
            if (elm && className) {
                if (typeof elm.classList !== "undefined"){
                    elm.classList.remove(className);
                } else {
                    if (typeof elm.className === "undefined") {
                        return false;
                    }
                    var elmClassName = elm.className,
                        re = new RegExp("(^|\\s+)" + className + "(\\s+|$)");
                    elmClassName = elmClassName.replace(re, ' ');
                    elmClassName = elmClassName.replace(/^\s+/, '').replace(/\s+$/, '');

                    elm.className = elmClassName;
                }
            }
        },

        /**
         * @function ? Adds or removes a class name. Utility function, saves many if/elses.
         * @param {DOMElement|String} elm - DOM element or element id
         * @param {String} class name
         * @param {Boolean} true to add, false to remove
         */
        setClassName: function(elm, className, add) {
            if (add) {
                SAPO.Dom.Css.addClassName(elm, className);
            }
            else {
                SAPO.Dom.Css.removeClassName(elm, className);
            }
        },

        /**
         * @function {Boolean} ?
         * @param {DOMElement|String} elm - DOM element or element id
         * @param {String} class name
         * @return true if a given class is applied to a given element
         */
        hasClassName: function(elm, className) {
            elm = s$(elm);
            if (elm && className) {
                if (typeof elm.classList !== "undefined"){
                    return elm.classList.contains(className);
                }
                else {
                    if (typeof elm.className === "undefined") {
                        return false;
                    }
                    var elmClassName = elm.className;

                    if (typeof elmClassName.length === "undefined") {
                        return false;
                    }

                    if (elmClassName.length > 0) {
                        if (elmClassName === className) {
                            return true;
                        }
                        else {
                            var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
                            if (re.test(elmClassName)) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        },

        /**
         * Add and removes the class from the element with a timeout, so it blinks
         * @param {DOMElement|String} elm - DOM element or element id
         * @param {String} className - class name
         * @param {Boolean} timeout - timeout in ms between adding and removing, default 100 ms
         * @param {Boolean} negate - is true, class is removed then added
         */
        blinkClass: function(element, className, timeout, negate){
            element = s$(element);
            SAPO.Dom.Css.setClassName(element, className, !negate);
            setTimeout(function(){
                SAPO.Dom.Css.setClassName(element, className, negate);
            }, Number(timeout) | 100);
        },

        /**
         * Add or remove a class name from a given element
         * @param {DOMElement|String} elm - DOM element or element id
         * @param {String} className - class name
         * @param {Boolean} forceAdd - forces the addition of the class if it doesn't exists
         */
        toggleClassName: function(elm, className, forceAdd) {
            if (elm && className){
                if (typeof elm.classList !== "undefined"){
                    elm = s$(elm);
                    if (elm !== null){
                        elm.classList.toggle(className);
                    }
                    return true;
                }
            }

            if (typeof forceAdd !== 'undefined') {
                if (forceAdd === true) {
                    this.addClassName(elm, className);
                }
                else if (forceAdd === false) {
                    this.removeClassName(elm, className);
                }
            } else {
                if (this.hasClassName(elm, className)) {
                    this.removeClassName(elm, className);
                }
                else {
                    this.addClassName(elm, className);
                }
            }
        },

        /**
         * @function ? sets the opacity of given client a given element
         * @param {DOMElement|String} elm - DOM element or element id
         * @param {Number} value - allows 0 to 1(default mode decimal) or percentage (warning using 0 or 1 will reset to default mode)
         */
        setOpacity: function(elm, value) {
            elm = s$(elm);
            if (elm !== null){
                var val = 1;

                if (!isNaN(Number(value))){
                    if      (value <= 0) {   val = 0;           }
                    else if (value <= 1) {   val = value;       }
                    else if (value <= 100) { val = value / 100; }
                    else {                   val = 1;           }
                }

                if (typeof elm.style.opacity !== 'undefined') {
                    elm.style.opacity = val;
                }
                else {
                    elm.style.filter = "alpha(opacity:"+(val*100|0)+")";
                }
            }
        },

        /**
         * {String} Converts a css property name to a string in
         *          camelcase to be used with CSSStyleDeclaration.
         * @param {String} str - String to convert
         * @return Converted string
         */
        _camelCase: function(str) {
            return str ? str.replace(/-(\w)/g, function (_, $1){
                return $1.toUpperCase();
            }) : str;
        },


        /**
         * @function {String} ? Gets the value for an element's style attribute
         * @param {DOMElement|String} elm - DOM element or element id
         * @param {String} style - Which css attribute to fetch
         * @return Style value
         */
         getStyle: function(elm, style) {
             elm = s$(elm);
             if (elm !== null) {
                 style = style === 'float' ? 'cssFloat': SAPO.Dom.Css._camelCase(style);

                 var value = elm.style[style];

                 if (window.getComputedStyle && (!value || value === 'auto')) {
                     var css = getComputedStyle(elm, null);

                     value = css ? css[style] : null;
                 }
                 else if (!value && elm.currentStyle) {
                      value = elm.currentStyle[style];
                      if (value === 'auto' && (style === 'width' || style === 'height')) {
                        value = elm["offset" + style.charAt(0).toUpperCase() + style.slice(1)] + "px";
                      }
                 }

                 if (style === 'opacity') {
                     return value ? parseFloat(value, 10) : 1.0;
                 }
                 else if (style === 'borderTopWidth'   || style === 'borderBottomWidth' ||
                          style === 'borderRightWidth' || style === 'borderLeftWidth'       ) {
                      if      (value === 'thin') {      return '1px';   }
                      else if (value === 'medium') {    return '3px';   }
                      else if (value === 'thick') {     return '5px';   }
                 }

                 return value === 'auto' ? null : value;
             }
         },


        /**
         * @function ? Sets the value for an element's style attribute
         * @param {DOMElement|String} elm - DOM element or element id
         * @param {String} style - Which css attribute to set
         */
        setStyle: function(elm, style) {
            elm = s$(elm);
            if (elm !== null) {
                if (typeof style === 'string') {
                    elm.style.cssText += '; '+style;

                    if (style.indexOf('opacity') !== -1) {
                        this.setOpacity(elm, style.match(/opacity:\s*(\d?\.?\d*)/)[1]);
                    }
                }
                else {
                    for (var prop in style) {
                        if (style.hasOwnProperty(prop)){
                            if (prop === 'opacity') {
                                this.setOpacity(elm, style[prop]);
                            }
                            else {
                                if (prop === 'float' || prop === 'cssFloat') {
                                    if (typeof elm.style.styleFloat === 'undefined') {
                                        elm.style.cssFloat = style[prop];
                                    }
                                    else {
                                        elm.style.styleFloat = style[prop];
                                    }
                                } else {
                                    elm.style[prop] = style[prop];
                                }
                            }
                        }
                    }
                }
            }
        },


        /**
         * @function ? Makes an element visible
         * @param {DOMElement|String} elm - DOM element or element id
         * @param {String} forceDisplayProperty - Css display property to apply on show
         */
        show: function(elm, forceDisplayProperty) {
            elm = s$(elm);
            if (elm !== null) {
                elm.style.display = (forceDisplayProperty) ? forceDisplayProperty : '';
            }
        },

        /**
         * @function ? Hides an element
         * @param {DOMElement|String} elm - DOM element or element id
         */
        hide: function(elm) {
            elm = s$(elm);
            if (elm !== null) {
                elm.style.display = 'none';
            }
        },

        /**
         * @function ? shows or hides according to param show
         * @param {DOMElement|String} elm - DOM element or element id
         * @param {boolean} show
         */
        showHide: function(elm, show) {
            elm = s$(elm);
            if (elm) {
                elm.style.display = show ? '' : 'none';
            }
        },

        /**
         * @function ? Shows or hides an element depending on current state
         * @param {DOMElement|String} elm - DOM element or element id
         * @param {Boolean} forceShow - Forces showing if element is hidden
         */
        toggle: function(elm, forceShow) {
            elm = s$(elm);
            if (elm !== null) {
                if (typeof forceShow !== 'undefined') {
                    if (forceShow === true) {
                        this.show(elm);
                    } else {
                        this.hide(elm);
                    }
                }
                else {
                    if (elm.style.display === 'none') {
                        this.show(elm);
                    }
                    else {
                        this.hide(elm);
                    }
                }
            }
        },

        _getRefTag: function(head){
            if (head.firstElementChild) {
                return head.firstElementChild;
            }

            for (var child = head.firstChild; child; child = child.nextSibling){
                if (child.nodeType === 1){
                    return child;
                }
            }
            return null;
        },

        /**
         * @function ? Adds css style tags to the head section of a page
         * @param {String} selector - The css selector for the rule
         * @param {String} style - The content of the style rule
         * @param {Object} options - Options for the tag
         *      @... {String} type - file type
         *      @... {Boolean} force - if true, style tag will be appended to
         *      end of head
         */
        appendStyleTag: function(selector, style, options){
            options = SAPO.extendObj({
                type: 'text/css',
                force: false
            }, options || {});

            var styles = document.getElementsByTagName("style"),
                oldStyle = false, setStyle = true, i, l;

            for (i=0, l=styles.length; i<l; i++) {
                oldStyle = styles[i].innerHTML;
                if (oldStyle.indexOf(selector) >= 0) {
                    setStyle = false;
                }
            }

            if (setStyle) {
                var defStyle = document.createElement("style"),
                    head = document.getElementsByTagName("head")[0],
                    refTag = false, styleStr = '';

                defStyle.type  = options.type;

                styleStr += selector +" {";
                styleStr += style;
                styleStr += "} ";

                if (typeof defStyle.styleSheet !== "undefined") {
                    defStyle.styleSheet.cssText = styleStr;
                } else {
                    defStyle.appendChild(document.createTextNode(styleStr));
                }

                if (options.force){
                    head.appendChild(defStyle);
                } else {
                    refTag = this._getRefTag(head);
                    if (refTag){
                        head.insertBefore(defStyle, refTag);
                    }
                }
            }
        },

        /**
         * @function ? Adds a link tag for a stylesheet to the head section of a page
         * @param {String} path - File path
         * @param {Object} options - Options for the tag
         *      @... {String} media - media type
         *      @... {String} type - file type
         *      @... {Boolean} force - if true, tag will be appended to end of head
         */
        appendStylesheet: function(path, options){
            options = SAPO.extendObj({
                media: 'screen',
                type: 'text/css',
                force: false
            }, options || {});

            var refTag,
                style = document.createElement("link"),
                head = document.getElementsByTagName("head")[0];

            style.media = options.media;
            style.type = options.type;
            style.href = path;
            style.rel = "Stylesheet";

            if (options.force){
                head.appendChild(style);
            }
            else {
                refTag = this._getRefTag(head);
                if (refTag){
                    head.insertBefore(style, refTag);
                }
            }
        },

        /**
         * Works similarly to appendStylesheet but:
         *   a) supports all browsers;
         *   b) supports optional callback which gets invoked once the CSS has been applied
         *
         * @function ? loads CSS via LINK element inclusion in HEAD (skips append if already there)
         * @param {String}                      cssURI      URI of the CSS to load, if empty ignores and just calls back directly
         * @param {optional Function(cssURI)}   callback    optional callback which will be called once the CSS is loaded
         */
        _loadingCSSFiles: {},
        _loadedCSSFiles:  {},
        appendStylesheetCb: function(url, callback) {
            if (!url) { return callback(url); }

            if (SAPO.Dom.Css._loadedCSSFiles[url]) { return callback(url); }

            var cbs = SAPO.Dom.Css._loadingCSSFiles[url];
            if (cbs) { return cbs.push(callback); }

            SAPO.Dom.Css._loadingCSSFiles[url] = [callback];

            var linkEl = document.createElement('link');
            linkEl.type = 'text/css';
            linkEl.rel  = 'stylesheet';
            linkEl.href = url;

            var headEl = document.getElementsByTagName('head')[0];
            headEl.appendChild(linkEl);

            var imgEl = document.createElement('img');
            imgEl.onerror = function() {
                var url = this;
                SAPO.Dom.Css._loadedCSSFiles[url] = true;
                var callbacks = SAPO.Dom.Css._loadingCSSFiles[url];
                for (var i = 0, f = callbacks.length; i < f; ++i) {
                    callbacks[i](url);
                }
                delete SAPO.Dom.Css._loadingCSSFiles[url];
            }.bindObj(url);
            imgEl.src = url;
        },

        /**
         * @function {String} ? converts decimal to hexadecimal values, for use with colors
         * @param {String} dec - Either a single decimal value , an rgb(r, g, b) string
         * or an Object with r, g and b properties
         * @return Hexadecimal value
         */
        decToHex: function(dec) {
            var normalizeTo2 = function(val) {
                if (val.length === 1) {
                    val = '0' + val;
                }
                val = val.toUpperCase();
                return val;
            };

            if (typeof dec === 'object') {
                var rDec = normalizeTo2(parseInt(dec.r, 10).toString(16));
                var gDec = normalizeTo2(parseInt(dec.g, 10).toString(16));
                var bDec = normalizeTo2(parseInt(dec.b, 10).toString(16));
                return rDec+gDec+bDec;
            }
            else {
                dec += '';
                var rgb = dec.match(/\((\d+),\s?(\d+),\s?(\d+)\)/);
                if (rgb !== null) {
                    return  normalizeTo2(parseInt(rgb[1], 10).toString(16)) +
                            normalizeTo2(parseInt(rgb[2], 10).toString(16)) +
                            normalizeTo2(parseInt(rgb[3], 10).toString(16));
                }
                else {
                    return normalizeTo2(parseInt(dec, 10).toString(16));
                }
            }
        },

        /**
         * @function {Number} ? converts hexadecimal values to decimal, for use with colors
         * @param {String} hex - hexadecimal value with 6, 3, 2 or 1 characters
         * @return Object with properties r, g, b if length of number is >= 3 or
         *         decimal value instead.
         */
        hexToDec: function(hex){
            if (hex.indexOf('#') === 0) {
                hex = hex.substr(1);
            }
            if (hex.length === 6) { // will return object RGB
                return {
                    r: parseInt(hex.substr(0,2), 16),
                    g: parseInt(hex.substr(2,2), 16),
                    b: parseInt(hex.substr(4,2), 16)
                };
            }
            else if (hex.length === 3) { // will return object RGB
                return {
                    r: parseInt(hex.charAt(0) + hex.charAt(0), 16),
                    g: parseInt(hex.charAt(1) + hex.charAt(1), 16),
                    b: parseInt(hex.charAt(2) + hex.charAt(2), 16)
                };
            }
            else if (hex.length <= 2) { // will return int
                return parseInt(hex, 16);
            }
        },

        /**
         * @function ? use this to obtain the value of a CSS property (searched from loaded CSS documents)
         * @param {String}  selector - a CSS rule. must be an exact match
         * @param {String}  property - a CSS property
         * @return  {String}    value of the found property, or null if it wasn't matched
         */
        getPropertyFromStylesheet: function(selector, property) {
            var rule = SAPO.Dom.Css.getRuleFromStylesheet(selector);
            if (rule) {
                return rule.style[property];
            }
            return null;
        },

        getPropertyFromStylesheet2: function(selector, property) {
            var rules = SAPO.Dom.Css.getRulesFromStylesheet(selector);
            var res;
            rules.forEach(function(rule) {
                var x = rule.style[property];
                if (x !== null && x !== undefined) { return x; }
            });
            return null;
        },

        getRuleFromStylesheet: function(selector) {
            var sheet, rules, ri, rf, rule;
            var s = document.styleSheets;
            if (!s) { return null; }

            for (var si = 0, sf = document.styleSheets.length; si < sf; ++si) {
                sheet = document.styleSheets[si];
                rules = sheet.rules ? sheet.rules : sheet.cssRules;
                if (!rules) { return null; }

                for (ri = 0, rf = rules.length; ri < rf; ++ri) {
                    rule = rules[ri];
                    if (!rule.selectorText) { continue; }
                    if (rule.selectorText === selector) {
                        return rule;
                    }
                }
            }

            return null;
        },

        getRulesFromStylesheet: function(selector) {
            var res = [];
            var sheet, rules, ri, rf, rule;
            var s = document.styleSheets;
            if (!s) { return res; }

            for (var si = 0, sf = document.styleSheets.length; si < sf; ++si) {
                sheet = document.styleSheets[si];
                rules = sheet.rules ? sheet.rules : sheet.cssRules;
                if (!rules) { return null; }

                for (ri = 0, rf = rules.length; ri < rf; ++ri) {
                    rule = rules[ri];
                    if (!rule.selectorText) { continue; }
                    if (rule.selectorText === selector) {
                        res.push(rule);
                    }
                }
            }

            return res;
        },

        getPropertiesFromRule: function(selector) {
            var rule = this.getRuleFromStylesheet(selector);
            var props = {};
            var prop, i, f;

            /*if (typeof rule.style.length === 'snumber') {
                for (i = 0, f = rule.style.length; i < f; ++i) {
                    prop = this._camelCase( rule.style[i]   );
                    props[prop] = rule.style[prop];
                }
            }
            else {  // HANDLES IE 8, FIREFOX RULE JOINING... */
                rule = rule.style.cssText;
                var parts = rule.split(';');
                var steps, val, pre, pos;
                for (i = 0, f = parts.length; i < f; ++i) {
                    if (parts[i].charAt(0) === ' ') {   parts[i] = parts[i].substring(1);   }
                    steps = parts[i].split(':');
                    prop = this._camelCase( steps[0].toLowerCase()  );
                    val = steps[1];
                    if (val) {
                        val = val.substring(1);

                        if (prop === 'padding' || prop === 'margin' || prop === 'borderWidth') {

                            if (prop === 'borderWidth') {   pre = 'border'; pos = 'Width';  }
                            else {                          pre = prop;     pos = '';       }

                            if (val.indexOf(' ') !== -1) {
                                val = val.split(' ');
                                props[pre + 'Top'   + pos]  = val[0];
                                props[pre + 'Bottom'+ pos]  = val[0];
                                props[pre + 'Left'  + pos]  = val[1];
                                props[pre + 'Right' + pos]  = val[1];
                            }
                            else {
                                props[pre + 'Top'   + pos]  = val;
                                props[pre + 'Bottom'+ pos]  = val;
                                props[pre + 'Left'  + pos]  = val;
                                props[pre + 'Right' + pos]  = val;
                            }
                        }
                        else if (prop === 'borderRadius') {
                            if (val.indexOf(' ') !== -1) {
                                val = val.split(' ');
                                props.borderTopLeftRadius       = val[0];
                                props.borderBottomRightRadius   = val[0];
                                props.borderTopRightRadius      = val[1];
                                props.borderBottomLeftRadius    = val[1];
                            }
                            else {
                                props.borderTopLeftRadius       = val;
                                props.borderTopRightRadius      = val;
                                props.borderBottomLeftRadius    = val;
                                props.borderBottomRightRadius   = val;
                            }
                        }
                        else {
                            props[prop] = val;
                        }
                    }
                }
            //}
            //console.log(props);

            return props;
        },

        /**
         * @function ? changes the font size of the elements which match the given CSS rule
         * For this function to work, the CSS file must be in the same domain than the host page, otherwise JS can't access it.
         * @param {String}           selector  CSS selector rule
         * @param {Number}           delta     number of pixels to change on font-size
         * @param {optional String}  op        supported operations are '+' and '*'. defaults to '+'
         * @param {optional Number}  minVal    if result gets smaller than minVal, change does not occurr
         * @param {optional Number}  maxVal    if result gets bigger  than maxVal, change does not occurr
         */
        changeFontSize: function(selector, delta, op, minVal, maxVal) {
            var e;
            if      (typeof selector !== 'string') { e = '1st argument must be a CSS selector rule.'; }
            else if (typeof delta    !== 'number') { e = '2nd argument must be a number.'; }
            else if (op !== undefined && op !== '+' && op !== '*') { e = '3rd argument must be one of "+", "*".'; }
            else if (minVal !== undefined && (typeof minVal !== 'number' || minVal <= 0)) { e = '4th argument must be a positive number.'; }
            else if (maxVal !== undefined && (typeof maxVal !== 'number' || maxVal < maxVal)) { e = '5th argument must be a positive number greater than minValue.'; }
            if (e) { throw new TypeError(e); }

            //var val, el, els = document.querySelectorAll(selector);
            var val, el, els = SAPO.Dom.Selector.select(selector);
            //els = Array.prototype.slice.call(els);
            if (minVal === undefined) { minVal = 1; }
            op = (op === '*') ? function(a,b){return a*b;} : function(a,b){return a+b;};
            for (var i = 0, f = els.length; i < f; ++i) {
                el = els[i];
                val = parseFloat( SAPO.Dom.Css.getStyle(el, 'fontSize'));
                val = op(val, delta);
                if (val < minVal) { continue; }
                if (typeof maxVal === 'number' && val > maxVal) { continue; }
                el.style.fontSize = val + 'px';
            }
        }

    };

})(window);




/*jshint browser:true, eqeqeq:true, undef:true, curly:true, laxbreak:true, forin:true, smarttabs:true */
/*global SAPO:false, s$:false */



SAPO.namespace('Utility');

/**
 * @namespace SAPO.Utility.Dimensions
 *
 * @version 1.1
 */
SAPO.Utility.Dimensions = {


    /**
     * @function ?
     * @return {int} page width
     */
    pageWidth: function() {
        var xScroll;

        if (window.innerWidth && window.scrollMaxX) {
            xScroll = window.innerWidth + window.scrollMaxX;
        } else if (document.body.scrollWidth > document.body.offsetWidth){
            xScroll = document.body.scrollWidth;
        } else {
            xScroll = document.body.offsetWidth;
        }

        var windowWidth;

        if (window.self.innerWidth) {
            if(document.documentElement.clientWidth){
                windowWidth = document.documentElement.clientWidth;
            } else {
                windowWidth = window.self.innerWidth;
            }
        } else if (document.documentElement && document.documentElement.clientWidth) {
            windowWidth = document.documentElement.clientWidth;
        } else if (document.body) {
            windowWidth = document.body.clientWidth;
        }

        if(xScroll < windowWidth){
            return xScroll;
        } else {
            return windowWidth;
        }
    },

    /**
     * @function ?
     * @return {int} page height
     */
    pageHeight: function() {
        var yScroll;

        if (window.innerHeight && window.scrollMaxY) {
            yScroll = window.innerHeight + window.scrollMaxY;
        } else if (document.body.scrollHeight > document.body.offsetHeight){
            yScroll = document.body.scrollHeight;
        } else {
            yScroll = document.body.offsetHeight;
        }

        var windowHeight;

        if (window.self.innerHeight) {
            windowHeight = window.self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) {
            windowHeight = document.documentElement.clientHeight;
        } else if (document.body) {
            windowHeight = document.body.clientHeight;
        }

        if(yScroll < windowHeight){
            return windowHeight;
        } else {
            return yScroll;
        }
    },

   /**
     * @function ?
     * @return {int} viewport width
     */
    viewportWidth: function() {
        if(typeof window.innerWidth !== "undefined") {
            return window.innerWidth;
        }
        if (document.documentElement && typeof document.documentElement.offsetWidth !== "undefined") {
            return document.documentElement.offsetWidth;
        }
    },

    /**
     * @function ?
     * @return {int} viewport height
     */
    viewportHeight: function() {
        if (typeof window.innerHeight !== "undefined") {
            return window.innerHeight;
        }
        if (document.documentElement && typeof document.documentElement.offsetHeight !== "undefined") {
            return document.documentElement.offsetHeight;
        }
    },

    /**
     * @function ?
     * @return {int} scroll width
     */
    scrollWidth: function() {
        if (typeof window.self.pageXOffset !== 'undefined') {
            return window.self.pageXOffset;
        }
        if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.scrollLeft !== 'undefined') {
            return document.documentElement.scrollLeft;
        }
        return document.body.scrollLeft;
    },

    /**
     * @function ?
     * @return {int} scroll height
     */
    scrollHeight: function() {
        if (typeof window.self.pageYOffset !== 'undefined') {
            return window.self.pageYOffset;
        }
        if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.scrollTop !== 'undefined') {
            return document.documentElement.scrollTop;
        }
        return document.body.scrollTop;
    }
};


/*global SAPO:true, window:true*/
SAPO.namespace('Effects');


/**
 * @class SAPO.Effects.Core
 */

/*
 * Licensed under the terms of the MIT license.
 * Based on work by Thomas Fuchs from emile.js and scripty2
 */
(function() {
    var _easing = {
        linear: function(pos) {
            return pos;
        },

        reverse: function(pos) {
            return 1 - pos;
        },

        sinusoidal: function(pos) {
            return ( - Math.cos(pos * Math.PI) / 2) + 0.5;
        },

        longerSinusoidal: function(pos) {
            return ( - Math.cos(pos * 0.9) / 2) + 0.5;
        },

        //  The given transition is mirrored. Defaults to sinusoidal
        mirror: function(pos, transition) {
            var gt = SAPO.Effects.Core.getTransition;
            if (typeof transition !== "function") {
                transition = gt(transition) || gt("sinusoidal");
            }
            if (pos < 0.5) {return transition(pos * 2);}
            else {return transition(1 - (pos - 0.5) * 2);}
        },

        //  Effect flickers along a sine wave.
        flicker: function(pos) {
            pos = pos + (Math.random() - 0.5) / 5;
            return _easing.sinusoidal(pos < 0 ? 0: pos > 1 ? 1: pos);
        },

        //  Effect wobbles increasingly fast between start and end positions.
        wobble: function(pos) {
            return ( - Math.cos(pos * Math.PI * (9 * pos)) / 2) + 0.5;
        },

        //  Effect pulses along a sinusoidal transition.
        pulse: function(pos, pulses) {
            return ( - Math.cos((pos * ((pulses || 5) - 0.5) * 2) * Math.PI) / 2) + 0.5;
        },

        //  Effect blinks on and off.
        blink: function(pos, blinks) {
            return Math.round(pos * (blinks || 5)) % 2;
        },

        //  Alters the effect timing to a "spring".
        spring: function(pos) {
            return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp( - pos * 6));
        },

        // Based on Easing Equations (c) 2003 Robert Penner, all rights reserved.
        // This work is subject to the terms in http://www.robertpenner.com/easing_terms_of_use.html
        // Adapted for script.aculo.us by
        // Brian Crescimanno <brian.crescimanno@gmail.com>
        // Ken Snyder <kendsnyder@gmail.com)
        // Adapted for LibSAPO.js by Tiago Rodrigues <tiago.c.rodrigues@co.sapo.pt>
        /*!
         *  TERMS OF USE - EASING EQUATIONS
         *  Open source under the BSD License.
         *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
         */

        easeInQuad: function(pos) {
            return Math.pow(pos, 2);
        },

        easeOutQuad: function(pos) {
            return - (Math.pow((pos - 1), 2) - 1);
        },

        easeInOutQuad: function(pos) {
            if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos, 2);}
            return - 0.5 * ((pos -= 2) * pos - 2);
        },

        easeInCubic: function(pos) {
            return Math.pow(pos, 3);
        },

        easeOutCubic: function(pos) {
            return (Math.pow((pos - 1), 3) + 1);
        },

        easeInOutCubic: function(pos) {
            if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos, 3);}
            return 0.5 * (Math.pow((pos - 2), 3) + 2);
        },

        easeInQuart: function(pos) {
            return Math.pow(pos, 4);
        },

        easeOutQuart: function(pos) {
            return - (Math.pow((pos - 1), 4) - 1);
        },

        easeInOutQuart: function(pos) {
            if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos, 4);}
            return - 0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
        },

        easeInQuint: function(pos) {
            return Math.pow(pos, 5);
        },

        easeOutQuint: function(pos) {
            return (Math.pow((pos - 1), 5) + 1);
        },

        easeInOutQuint: function(pos) {
            if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos, 5);}
            return 0.5 * (Math.pow((pos - 2), 5) + 2);
        },

        easeInSine: function(pos) {
            return - Math.cos(pos * (Math.PI / 2)) + 1;
        },

        easeOutSine: function(pos) {
            return Math.sin(pos * (Math.PI / 2));
        },

        easeInOutSine: function(pos) {
            return ( - 0.5 * (Math.cos(Math.PI * pos) - 1));
        },

        easeInExpo: function(pos) {
            return (pos === 0) ? 0: Math.pow(2, 10 * (pos - 1));
        },

        easeOutExpo: function(pos) {
            return (pos == 1) ? 1: -Math.pow(2, -10 * pos) + 1;
        },

        easeInOutExpo: function(pos) {
            if (pos === 0) {return 0;}
            if (pos == 1) {return 1;}
            if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(2, 10 * (pos - 1));}
            return 0.5 * ( - Math.pow(2, -10 * --pos) + 2);
        },

        easeInCirc: function(pos) {
            return - (Math.sqrt(1 - (pos * pos)) - 1);
        },

        easeOutCirc: function(pos) {
            return Math.sqrt(1 - Math.pow((pos - 1), 2));
        },

        easeInOutCirc: function(pos) {
            if ((pos /= 0.5) < 1) {return - 0.5 * (Math.sqrt(1 - pos * pos) - 1);}
            return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
        },

        easeOutBounce: function(pos) {
            if ((pos) < (1 / 2.75)) {
                return (7.5625 * pos * pos);
            } else if (pos < (2 / 2.75)) {
                return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
            } else if (pos < (2.5 / 2.75)) {
                return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
            } else {
                return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
            }
        },

        easeInBack: function(pos) {
            var s = 1.70158;
            return (pos) * pos * ((s + 1) * pos - s);
        },

        easeOutBack: function(pos) {
            var s = 1.70158;
            return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
        },

        easeInOutBack: function(pos) {
            var s = 1.70158;
            if ((pos /= 0.5) < 1) {return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));}
            return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
        },

        elastic: function(pos) {
            return - 1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
        },

        swingFromTo: function(pos) {
            var s = 1.70158;
            return ((pos /= 0.5) < 1) ? 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) :
            0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
        },

        swingFrom: function(pos) {
            var s = 1.70158;
            return pos * pos * ((s + 1) * pos - s);
        },

        swingTo: function(pos) {
            var s = 1.70158;
            return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
        },

        bounce: function(pos) {
            if (pos < (1 / 2.75)) {
                return (7.5625 * pos * pos);
            } else if (pos < (2 / 2.75)) {
                return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
            } else if (pos < (2.5 / 2.75)) {
                return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
            } else {
                return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
            }
        },

        bouncePast: function(pos) {
            if (pos < (1 / 2.75)) {
                return (7.5625 * pos * pos);
            } else if (pos < (2 / 2.75)) {
                return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
            } else if (pos < (2.5 / 2.75)) {
                return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
            } else {
                return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
            }
        },

        easeFromTo: function(pos) {
            if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos, 4);}
            return - 0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
        },

        easeFrom: function(pos) {
            return Math.pow(pos, 4);
        },

        easeTo: function(pos) {
            return Math.pow(pos, 0.25);
        }
    };


    /*!
     *    Copyright (c) 2006 Apple Computer, Inc. All rights reserved.
     *
     *    Redistribution and use in source and binary forms, with or without
     *    modification, are permitted provided that the following conditions are met:
     *
     *    1. Redistributions of source code must retain the above copyright notice,
     *    this list of conditions and the following disclaimer.
     *
     *    2. Redistributions in binary form must reproduce the above copyright notice,
     *    this list of conditions and the following disclaimer in the documentation
     *    and/or other materials provided with the distribution.
     *
     *    3. Neither the name of the copyright holder(s) nor the names of any
     *    contributors may be used to endorse or promote products derived from
     *    this software without specific prior written permission.
     *
     *    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
     *    "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
     *    THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
     *    ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
     *    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     *    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
     *    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
     *    ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
     *    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
     *    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */
    // port of webkit cubic bezier handling by http://www.netzgesta.de/dev/
    function CubicBezierAtTime(t,p1x,p1y,p2x,p2y,duration) {
        var ax=0,bx=0,cx=0,ay=0,by=0,cy=0;
        function sampleCurveX(t) {return ((ax*t+bx)*t+cx)*t;}
        function sampleCurveY(t) {return ((ay*t+by)*t+cy)*t;}
        function sampleCurveDerivativeX(t) {return (3.0*ax*t+2.0*bx)*t+cx;}
        function solveEpsilon(duration) {return 1.0/(200.0*duration);}
        function fabs(n) {if(n>=0) {return n;}else {return 0-n;}}
        function solveCurveX(x,epsilon) {
            var t0,t1,t2,x2,d2,i;
            for(t2=x, i=0; i<8; i++) {
                x2=sampleCurveX(t2)-x;
                if(fabs(x2)<epsilon) {return t2;}
                d2=sampleCurveDerivativeX(t2);
                if(fabs(d2)<1e-6) {break;} t2=t2-x2/d2;
            }
            t0=0.0; t1=1.0; t2=x;
            if(t2<t0) {return t0;} if(t2>t1) {return t1;}
            while(t0<t1) {
                x2=sampleCurveX(t2);
                if(fabs(x2-x)<epsilon) {return t2;}
                if(x>x2) {t0=t2;} else {t1=t2;}
                t2=(t1-t0)*0.5+t0;
            }
            return t2; // Failure.
        }
        function solve(x,epsilon) {return sampleCurveY(solveCurveX(x,epsilon));}
        cx=3.0*p1x; bx=3.0*(p2x-p1x)-cx; ax=1.0-cx-bx; cy=3.0*p1y; by=3.0*(p2y-p1y)-cy; ay=1.0-cy-by;
        return solve(t, solveEpsilon(duration));
    }

    /**
     *    Generates a transition easing function that is compatible
     *    with WebKit's CSS transitions `-webkit-transition-timing-function`
     *    CSS property.
     *
     *    The W3C has more information about
     *    <a href="http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag">
     *    CSS3 transition timing functions</a>.
    **/
    function cubicBezierTransition(x1, y1, x2, y2){
        return (function(pos){
            return CubicBezierAtTime(pos,x1,y1,x2,y2,1);
        });
    }

    _easing = SAPO.extendObj({
        webkitEase: cubicBezierTransition(0.25, 0.1, 0.25, 1.0),
        webkitLinear: cubicBezierTransition(0.0, 0.0, 1.0, 1.0),
        webkitEaseIn: cubicBezierTransition(0.42, 0.0, 1.0, 1.0),
        webkitEaseOut: cubicBezierTransition(0.0, 0.0, 0.58, 1.0),
        webkitEaseInOut: cubicBezierTransition(0.42, 0.0, 0.58, 1.0)
    }, _easing);

    /**
     * @function {Function} ? Returns a easing function
     * @param {String} easing - name of the easing function
     */
    function getEasing(easing) {
        if (typeof easing !== "undefined" && easing in _easing) {
            return _easing[easing];
        }
        return _easing.linear;
    }


    function getStyle(el){
        return window.getComputedStyle ? window.getComputedStyle(el, null) : el.currentStyle;
    }

    // prefix for storing custom properties on elements
    var __prefix = "SAPOEffects"+parseInt(Math.random()*10000, 10);

    /**
     * @function ? set the value of a custom property on a given DOM element
     * @param {Object} el - target element
     * @param {String} prop - property name
     * @param {String} val - property value
     */
    function setCustomProp(el, prop, val){
        // if our custom property doesn't exist, create it and store the val
        if(typeof el[__prefix] == "undefined"){
            el[__prefix] = prop+":"+val+";";
        } else {
            // if our custom property already exists with no val, store it
            if(el[__prefix].search(prop+":") < 0){
                el[__prefix] += prop+":"+val+";";
            }
        }
        // don't store if it's already there
    }

    /**
     * @function {String} ? get the value of a custom property from a DOM element
     * @param {Object} el - target element
     * @param {String} prop - property name
     * @param {Boolean} keep - if false, deletes the property from the element
     * @return value of a given property
     */
    function getCustomProp(el, prop, keep){
        var val = false;
        if(typeof el[__prefix] != "undefined"){
            // regexp for property store
            var re = new RegExp(prop+"\\:([\\w|\\d]+);", "g");
            var vals = re.exec(el[__prefix]);
            if(vals !== null){
                // if the property exists, return it
                val = vals[1];

                if(keep) {return val;}
                // remove it from the stored properties
                el[__prefix] = el[__prefix].replace(re, "");

                // if no more properties exist, delete our custom property
                if(el[__prefix] === ""){
                    try{
                        delete el[__prefix];
                    } catch(e){
                        el[__prefix] = '';
                    }
                }
            }
        }
        return val;
    }

    /**
     * @function {String} ? Checks for the existence of CSS transition support
     * @return Proprietary CSS prefix for the current browser. False if transitions are not supported.
     */
    function getTransitionProperties() {
        if(typeof document.body.style.webkitTransition !== "undefined"){
              return {
                  pre: '-webkit-transition',
                  ev: 'webkitTransitionEnd'
              };
        }

        if(typeof document.body.style.mozTransition !== "undefined"){
              return {
                  pre: '-moz-transition',
                  ev: 'transitionend'
              };
        }

        /* FIXME setting transitions through javascript is currently buggy
        if(typeof document.body.style.OTransition !== "undefined"){
              return {
                  pre: '-o-transition',
                  ev: 'oTransitionEnd'
              };
        }
        */

        return false;
    }

    /**
     * @function {String} ? Interpolates target and source values based on time position
     * @param {Number} source - source value
     * @param {Number} target - target value
     * @param {Number} pos - current time position
     * @return Interpolated value
     */
    function interpolate(source, target, pos) {
        return (source + (target - source) * pos).toFixed(3);
    }

    /**
     * @function ? Fire the animation
     * @param {Function} cb - callback to execute at each animation
     * cycle. Receives position in time (float value from 0 to 1) as a parameter
     * @param {Number} dur - animation duration in milliseconds
     * @param {Number} from - source value
     * @param {Number} to - target value
     * @param {Function} before - callback executed before the animation
     * @param {Function} after - callback executed after the animation
     * @param {Function} easing - easing function or function name
     */
    function animate(cb, dur, from, to, before, after, easing) {
        var start = +new Date(),
        finish = start + dur,
        val = from;

        easing = easing || _easing.sinusoidal;
        if (easing in _easing) {
            easing = _easing[easing];
        }

        if (before) {
            before();
        }

        var interval = setInterval(function() {
            var time = +new Date(),
            pos = time > finish ? 1: (time - start) / dur;

            val = interpolate(parseFloat(val, 10), to, easing(pos));
            cb(val);

            if (time > finish) {
                clearInterval(interval);
                if (after) {
                    after();
                }
            }
        }, 10);
    }



    /**
     *  @function {Array} each
     *  runs a functions trou each of the elements of an array
     *  @param {Array} arr
     *  @param {Function} callBack - the function recieves as arguments value, index and array
     *
     **/
    function each(arr, callBack) {
        /*if(arr.forEach) {
              arr.forEach(callBack);
              return;
        }*/
        var arrhash = arr.slice(0);
        var total = arrhash.length;
        var iterations = Math.floor(total / 8);
        var leftover = total % 8;
        var i = 0;
        if (leftover > 0) {
            //Duff's device pattern
            do {
                callBack(arrhash[i++], i - 1, arr);
            }
            while (--leftover > 0);
        }
        if (iterations === 0){return arr;}
        do {
            callBack(arrhash[i++], i - 1, arr);
            callBack(arrhash[i++], i - 1, arr);
            callBack(arrhash[i++], i - 1, arr);
            callBack(arrhash[i++], i - 1, arr);
            callBack(arrhash[i++], i - 1, arr);
            callBack(arrhash[i++], i - 1, arr);
            callBack(arrhash[i++], i - 1, arr);
            callBack(arrhash[i++], i - 1, arr);
        }
        while (--iterations > 0);

        return arr;
    }

    /**
     * @function ? - runs an array of effects in parallel
     * @param {Array} arrEffects
     * @param {Object} options
     *
     */
    function parallel(arrEffects, options) {
        var runEffects = function(value, key, arr) {
            if (options && (options.after && typeof(options.after) == "function" && (key == arr.length - 1))) {
                if (value.options.after) {
                    var func = value.options.after;
                    value.options.after = function() {
                        func();
                        options.after();
                    };
                } else {
                    value.options.after = options.after;
                }
            }

            // fallback TODO removeme
            if (typeof(value) != "function") {
                SAPO.Effects.Core.emile(value.element, value.style, value.options);
            }
        };

        if (!options || (!options.delay || options.delay === 0)) {
            each(arrEffects, runEffects);
        } else {
            setTimeout(function() {
                each(arrEffects, runEffects);
            },
            options.delay);
        }

    }


    /**
     * @constructor SAPO.Effects.Core.?
     */
    SAPO.Effects.Core = {
        interpolate: interpolate,
        animate: animate,
        parallel: parallel,
        getEasing: getEasing,
        getTransitionProperties: getTransitionProperties,
        getStyle: getStyle,
        getCustomProp: getCustomProp,
        setCustomProp: setCustomProp
    };

    /* starting emile.js

        don't use ! only present for backward compatibility.
    */
    (function(emile, container){
      var parseEl = document.createElement('div'),
        props = ('backgroundColor borderBottomColor borderBottomWidth borderLeftColor borderLeftWidth '+
        'borderRightColor borderRightWidth borderSpacing borderTopColor borderTopWidth bottom color fontSize '+
        'fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop maxHeight '+
        'maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft '+
        'paddingRight paddingTop right textIndent top width wordSpacing zIndex').split(' ');

      function s(str, p, c){ return str.substr(p,c||1); }
      function color(source,target,pos){
        var i = 2, j, c, tmp, v = [], r = [];
        while(j=3,c=arguments[i-1],i--)
            if(s(c,0)=='r') { c = c.match(/\d+/g); while(j--) v.push(~~c[j]); } else {
              if(c.length==4) c='#'+s(c,1)+s(c,1)+s(c,2)+s(c,2)+s(c,3)+s(c,3);
              while(j--) v.push(parseInt(s(c,1+j*2,2), 16)); }
        while(j--) { tmp = ~~(v[j+3]+(v[j]-v[j+3])*pos); r.push(tmp<0?0:tmp>255?255:tmp); }
        return 'rgb('+r.join(',')+')';

      }

      function parse(prop){
        var p = parseFloat(prop), q = prop.replace(/^[\-\d\.]+/,'');
        return isNaN(p) ? { v: q, f: color, u: ''} : { v: p, f: interpolate, u: q };
      }

      function normalize(style){
        var css, rules = {}, i = props.length, v;
        parseEl.innerHTML = '<div style="'+style+'"></div>';
        css = parseEl.childNodes[0].style;
        while(i--) if(v = css[props[i]]) rules[props[i]] = parse(v);
        return rules;
      }

      container[emile] = function(el, style, opts){
        el = typeof el == 'string' ? document.getElementById(el) : el;
        opts = opts || {};
        var target = normalize(style), comp = el.currentStyle ? el.currentStyle : getComputedStyle(el, null),
            prop, current = {}, start = +new Date, dur = opts.duration||200, finish = start+dur, interval,
            easing = opts.easing || _easing.sinusoidal;
        for(prop in target) current[prop] = parse(comp[prop]);
        interval = setInterval(function(){
            var time = +new Date, pos = time>finish ? 1 : (time-start)/dur;
            for(prop in target)
              el.style[prop] = target[prop].f(current[prop].v,target[prop].v,easing(pos)) + target[prop].u;
            if(time>finish) { clearInterval(interval); opts.after && opts.after(); }
        },10);
      }
    })('emile', SAPO.Effects.Core);
})();




/*global SAPO:true, s$:true, window:true */
SAPO.namespace('Effects');

/**
 * @class SAPO.Effects.Fade
 *
 * <p><strong>requires</strong> {@link SAPO.Effects.Core}</p>
 */
(function(){

var Core = SAPO.Effects.Core;

function setOpacity(el, val){
    if(!window.addEventListener){
        el.style.filter = "alpha(opacity:"+ val +")";
    } else {
        el.style.opacity = val;
    }
}

/**
 * @constructor SAPO.Effects.Fade.?
 */
SAPO.Effects.Fade = {
    /**
     * @function ? Transitions a given element from one opacity value to another
     * @param {Object} el - target element
     * @param {Object} options - animation options
     *     @... {Number} from - initial opacity value (between 0 and 1)
     *     @... {Number} to - final opacity value (between 0 and 1)
     *     @... {Number} dur - duration in milliseconds
     *     @... {Function} after - Callback executed when the animation is finished
     */
    fromTo: function(el, options){
        var o = SAPO.extendObj({
            dur: 500,
            after: false
        }, options);
        var from = o.from, to = o.to, dur = o.dur, after = o.after;

        var transition = Core.getTransitionProperties();
        el = s$(el);

        var show = (to === 1.0) ? true:false;

        // normalize values for IE
        if(!window.addEventListener){
            from = from * 100;
            to = to * 100;
        }

        var _after = function(){
            // make sure it's not visible and not occupying space when we're hiding it
            if(to === 0){
                el.style.display = "none";
                if(!transition){
                    setOpacity(el, 0);
                }
            }

            // make sure it's visible if we're showing it
            if(show && !transition) {
                setOpacity(el, to);
            }

            // user defined callback
            if(after){
                after();
            }
            if(transition){
                el.removeEventListener(transition.ev, _after, false);
            }
        };

        var style = window.getComputedStyle ? window.getComputedStyle(el, null) : el.currentStyle;

        // we'll hide this element, so let's store it's display status
        if(to === 0){
            Core.setCustomProp(el, "olddisplay", style.display);
        }

        // if we're showing an element
        if(to > 0){
            // set the initial opacity (hidden)
            if(!transition && from === 0){
                setOpacity(el, 0);
            }

            // restore the display property before we animate the opacity
            var olddisplay = Core.getCustomProp(el, "olddisplay");
            if(olddisplay){
                el.style.display = olddisplay;
            } else {
                // make sure we have a display property set if it wasn't stored
                if(style.display && style.display !== "none"){
                    el.style.display = style.display;
                } else {
                    el.style.display = "block";
                }
            }
        }

        // activate the animation
        if(transition){
            el.style.opacity = from;
            setTimeout(function(){
                var d = parseFloat(dur/1000, 10);
                el.style[transition.pre] = "opacity "+ d +"s ease-in";
                el.style.opacity = to;
                el.addEventListener(transition.ev, _after, false);
            }, 0);
        } else {
            Core.animate(function(val){
                setOpacity(el, val);
            }, dur, from, to, false, _after, 'webkitEaseIn');
        }
    },

    /**
     * @function ? Shows a given element with a fadein effect
     * @param {Object} el - target element
     * @param {Object} options - animation options
     *     @... {Number} dur - duration in milliseconds
     *     @... {Function} after - Callback executed when the animation is finished
     */
    show: function(el, options){
        this.fromTo(el, SAPO.extendObj({
            from: 0,
            to: 1.0
        }, options));
    },

    /**
     * @function ? Hides a given element with a fadeout effect
     * @param {Object} el - target element
     * @param {Object} options - animation options
     *     @... {Number} dur - duration in milliseconds
     *     @... {Function} after - Callback executed when the animation is finished
     */
    hide: function(el, options){
        this.fromTo(el, SAPO.extendObj({
            from: 1.0,
            to: 0
        }, options));
    }
};
}());






/*global SAPO:true, s$:true */
SAPO.namespace('Component');
 var _w = window.top;
    var _d = document;
    try { _d = _w.document; } catch (e) {}
/**
 * @class SAPO.Component.FixedLayer
 *
 *
 * <p><strong>requires</strong> {@link SAPO.Dom.Event}</p>
 * <p><strong>requires</strong> {@link SAPO.Dom.Element}</p>
 * <p><strong>requires</strong> {@link SAPO.Dom.Css}</p>
 * <p><strong>requires</strong> {@link SAPO.Utility.Dimensions}</p>
 * <p><strong>requires</strong> {@link SAPO.Effects.Fade}</p>
 */
(function(){

var Event = SAPO.Dom.Event,
    Element = SAPO.Dom.Element,
    Css = SAPO.Dom.Css,
    Dimensions = SAPO.Utility.Dimensions,
    Fade = SAPO.Effects.Fade,
    isIE6 = false;

if(SAPO.Browser.IE && SAPO.Browser.version == "6.0"){
    isIE6 = true;
}

/**
 * @constructor SAPO.Component.FixedLayer.?
 *
 * @param {Object} options - options for the element
 *     @... {String} cssURI - url for the css stylesheet
 *     @... {String} closeLabel - content for the close button
 *     @... {Function} contentCallback - callback that should return the content for the layer
 *     @... {Boolean} cacheContent - if true, caches the content after the first time the callback is called
 *     @... {Boolean} keepClosed - keeps the layer closed after it's closed for the first time
 *     @... {Number} width - width for the layer
 *     @... {Number} height - height for the layer
 *     @... {Object} position - Object with 4 possible keys: top, left, right and bottom, each with number values. Defines the position of the layer.
 *     @... {Number} showAfterPosition - Percentage value. The layer is shown after X percent of the page has been scrolled
 *     @... {Number} showAfterElement - The layer is shown after the scroll has passed by this element
 *     @... {Number} showEachSeconds - Shows the layer each X seconds
 *     @... {Boolean} showAtStart - if true, shows the layer as soon as the instance is created
 *     @... {Number} hideAfter - hides the layer after X seconds have passed
 *     @... {Number} fadeDuration - Duration for the hideAfter fadeout in milliseconds
 *     @... {String} special - name of special case custom made
 *
 */
SAPO.Component.FixedLayer = function(options){
    this.init(options);
};

SAPO.Component.FixedLayer.version = '0.1';

SAPO.Component.FixedLayer.prototype = {
    _active: false, // current state

    init: function(options){
        this._options = SAPO.extendObj({
            cssURI: 'https://js.sapo.pt/Assets/Images/FixedLayer/style.css',
            closeLabel: 'X',
            contentCallback: false,
            cacheContent: false,
            keepClosed: false,
            /*/width: 300,*/
            /*height: 150, */
            showAfterPosition: '50',
            showAfterElement: false,
            showEachSeconds: false,
            showAtStart: false,
            hideAfter: false,
            fadeDuration: 500,
            startOpacity: 0.5,
            special: false,
            specialOpts: {}
        }, options || {});

        // set position separately
        this._options.position = SAPO.extendObj({
            top: false,
            left: false,
            bottom: 10,
            right: 10
        }, options.position);

        var o = this._options;

        this._forceShow = false;

        if(this._options.cssURI){
            Css.appendStylesheet(o.cssURI);
        }

        var layer = _d.createElement('div');
        layer.className = 'SAPOFixedLayer';
        layer.style.width = o.width + 'px';
        layer.style.height = o.height + 'px';
        layer.style.zIndex = 1000000;
        if(isIE6){
            layer.style.position = "absolute";
        } else {
            layer.style.position = "fixed";
        }
        layer.style.display = "block";

        // close handle
        var close = _d.createElement('a');
        close.innerHTML = o.closeLabel;
        close.className = 'close';
        close.style.cursor = 'pointer';
        this._hideOnScrollEventHandler = this._hideOnScrollEvent.bindObjEvent(this);
        Event.observe(close, 'click', function(ev) {
            Event.stop(ev);
            if(this._options.keepClosed){
                if(this._showInt){
                    clearInterval(this._showInt);
                }
                Event.stopObserving(_w, 'scroll', this._hideOnScrollEventHandler);
            }
            this._hideLayer(true);
        }.bindObjEvent(this));
        this._close = close;
        layer.appendChild(close);

        var content = _d.createElement('div');
        layer.appendChild(content);
        this._content = content;

        // define when the layer should be shown
        if(o.special){
            //check if special is defined

            switch(o.special){
                case 'desporto':
                    var specialOpts = SAPO.extendObj({
                        'element' : false,
                        'scrollAfter' : 50
                    },o.specialOpts);

                    this._handleSpecialDesporto(specialOpts);
                    break;
                default:
                    return;
            }
        } else if(o.showAfterElement){
            // show after scrolling past a certain element
            this._hideOnScroll(Element.offsetTop(o.showAfterElement));
        } else if(o.showEachSeconds){
            // show each X seconds
            var that = this, timeout = o.showEachSeconds * 1000;
            this._showInt = setInterval(function() {
                that._showLayer(true);
                setTimeout(function() {
                    that._hideLayer(true);
                }, timeout * 0.75); // hide when % of timeout has passed
            }, timeout);
        } else if(o.showAfterPosition){
            // show after a percentage of the page height
            this._hideOnScroll(
                (Dimensions.pageHeight() * (o.showAfterPosition * 0.01)) - (Dimensions.viewportHeight() / 2)
            );
        }

        // hide the layer and inject it on the dom
        Css.setOpacity(layer, 0);
        this._layer = layer;

        this._setPosition();

        _d.body.appendChild(layer);

        if(o.showAtStart || this._forceShow){
            this._showLayer(true);
        }
    },

    /**
     * sets the position of the layer
     */
    _setPosition: function() {
        var position = this._options.position;
        for(var p in position){
            if(position.hasOwnProperty(p) && position[p] !== false){
                this._layer.style[p] = position[p] + 'px';
            }
        }
    },

    /**
     * sets an event which shows the layer after a certain position or shows it before it
     * @param {Number} triggerPos - position after which the change should be triggered
     */
    _hideOnScroll: function(triggerPos) {
        this._triggerPos = triggerPos;
        this._fadingArea = Dimensions.pageHeight() - triggerPos;
        Event.observe(_w, 'scroll', this._hideOnScrollEventHandler);
    },


    _hideOnScrollEvent: function(ev) {
        var scrollHeight = Dimensions.scrollHeight(_w),
            triggerPos = this._triggerPos,
            o = this._options,
            layer = this._layer;

        if(scrollHeight > triggerPos){
            // if layer isn't active, loads content
            this._showLayer(false);

            // calculate opacity based on active scrollable area
            var opacity = o.startOpacity + (
            (
                (
                    scrollHeight + Dimensions.viewportHeight()
                ) - triggerPos
            ) / this._fadingArea);


            if(isIE6){
                clearTimeout(this._ieTimeout);
                this._ieTimeout = setTimeout(function() {
                    Css.setOpacity(layer, opacity > 1 ? 1 : opacity);
                }, 100);
            } else {
                Css.setOpacity(layer, opacity > 1 ? 1 : opacity);
            }

        } else if(scrollHeight < triggerPos){
            this._hideLayer(false);

            if(isIE6){
                clearTimeout(this._ieTimeout);
                this._ieTimeout = setTimeout(function() {
                    Css.setOpacity(layer, 0);
                }, 500);
            } else {
                Css.setOpacity(layer, 0);
            }
        }
    },

    /**
     * shows the layer
     */
    _showLayer: function(fade){
        var o = this._options;

        if(!this._active){
            this._active = true;
            this._layer.style.display = "block";
            this._content.innerHTML = o.contentCallback();
        }

        if(fade){
            Fade.show(this._layer, { dur: o.fadeDuration });
        }

        if(o.hideAfter){
            clearTimeout(this._hideAfterTimeout);
            this._hideAfterTimeout = setTimeout(this._hideLayer.bindObj(this, true), o.hideAfter * 1000);
        }
    },

    /**
     * hides the layer
     */
    _hideLayer: function(fade){
        var o = this._options;

        // deactivate layer, unless we want to cache it
        if(!o.cacheContent){
            this._active = false;
        }

        if(fade){
            Fade.hide(this._layer, { dur: this._options.fadeDuration });
        }
    },

    /**
     * @function ? handles the special behaviour for desporto.sapo.pt
     */
    _handleSpecialDesporto: function(opt){
        var offsetTop = Element.offsetTop(opt.element), viewportHeight = SAPO.Utility.Dimensions.viewportHeight();

        if(viewportHeight < offsetTop){
            this._hideOnScroll(offsetTop-viewportHeight);
        } else if(SAPO.Utility.Dimensions.pageHeight() < viewportHeight+opt.scrollAfter){
            this._forceShow = true;
        } else {
            this._hideOnScroll(opt.scrollAfter);
        }
    },

    /**
     * @function ? Destroys the layer and associated events
     */
    destroy: function() {
        Event.stopObserving(_w, 'scroll', this._hideOnScroll.bindObjEvent(this));
        this._layer.parentNode.removeChild(this._layer);
    }
};
}());



/***** GAMBOA STYLE *****/


                
if (typeof SAPO == 'undefined') { SAPO = {}; }
                
SAPO.pub =  {
                
	util: {
    	loadImageWithCacheBusting: function (url) { 
           (new Image()).src = url+'&cb='+(Math.round(Math.random()*1000))*1230;
		}
  }
}
                



                var SAPOpub_PopIn = new SAPO.Component.FixedLayer({
                    contentCallback: function() {
                        return '<iframe id="pubSAPO_'+SAPOpub_PopIn_id.config.pubSAPO_id+'" src="//pub.web.sapo.io/static/js/pub/popin/v2/popin5.html?title='+SAPOpub_PopIn_id.config.titleText+'&logo='+SAPOpub_PopIn_id.config.logo+'&main='+SAPOpub_PopIn_id.config.mainText+'&img='+SAPOpub_PopIn_id.config.img+'&id='+SAPOpub_PopIn_id.config.pubSAPO_id+'&click='+encodeURIComponent(SAPOpub_PopIn_id.events.click)+'" width="100%" height="100%" style="border: 0 !important;padding: 0 !important;margin: 0 !important;" ></iframe>';
                    },
                  
                    showAfterPosition: 40,
                    //width:328,
                    //height:90,
                    startOpacity: 0.8,
                    keepClosed: true
   
                });
                
                
                
                

/* css alterar */

var head_SAPOpub_popin 	= _d.getElementsByTagName('head')[0], 

	style_SAPOpub_popin = _d.createElement('style'), 

	rules_SAPOpub_popin = _d.createTextNode('#to_holder { display: none; }');

var set_SAPOpub_popin = 'div.SAPOFixedLayer{border:0px solid #DCDCDC;background:#fff; right:0; height: 106px;padding:0px;text-align:left;-moz-box-shadow:0px 0px 5px rgba(0,0,0,0.3);-webkit-box-shadow:0px 0px 5px rgba(0,0,0,0.3);font-family:"Trebuchet MS",Helvetica,sans-serif}'
+'@media screen and (max-width:370px){	div.SAPOFixedLayer { margin: 0 10px 0 10px; width: 94%!important; max-width: 419px; height: 112px!important;   left: 0; bottom: 0; right: 0;}}'
+'@media screen and (max-width:456px){	div.SAPOFixedLayer a.close {     font-size: 1.4em!important;} }'
+'@media screen and (min-width:371px){	div.SAPOFixedLayer { margin: 0 10px 0 10px;max-width: 419px;width: 95%;}}'
+'div.SAPOFixedLayer span{text-align: right;font-size: .85em;color: #4a4a4a;display: block;padding: 4px 10px; margin-top: 41px!important;border-bottom:#4a9b17 3px solid;}'
+'div.SAPOFixedLayer div div{height:80px;overflow:hidden;}'
+'div.SAPOFixedLayer img{animation-duration: 4s;transform: scale(1.2);-moz-transform: scale(1.2);-webkit-transform: scale(1.2);-o-transform: scale(1.2);-ms-transform: scale(1.2);-ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=1.1, M12=0, M21=0, M22=1.1, SizingMethod="auto expand")";filter: progid:DXImageTransform.Microsoft.Matrix(M11=1.1, M12=0, M21=0, M22=1.1, SizingMethod="auto expand"); }'
+'div.SAPOFixedLayer img:hover{transform: scale(1.2);-moz-transform: scale(1.2);-webkit-transform: scale(1.2);-o-transform: scale(1.2);-ms-transform: scale(1.2);-ms-filter: "progid:DXImageTransform.Microsoft.Matrix(M11=1.1, M12=0, M21=0, M22=1.1, SizingMethod="auto expand")";filter: progid:DXImageTransform.Microsoft.Matrix(M11=1.1, M12=0, M21=0, M22=1.1, SizingMethod="auto expand"); }'
+'div.SAPOFixedLayer img{float:left; border:0px solid #DCDCDC;padding:0px;margin:0 10px 0 0;background-position:center;transition: all 1s ease;-moz-transition: all 1s ease;-webkit-transition: all 1s ease;-o-transition: all 1s ease;}'
+'div.SAPOFixedLayer a {text-decoration:none;}'
+'div.SAPOFixedLayer a:hover.text {text-decoration:none;}'
+'div.SAPOFixedLayer a:hover{text-decoration:underline;}'
+'div.SAPOFixedLayer a.title{color:#4a4a4a;font-size:1.7em;display:block;font-weight:bold;line-height:1.6em;padding-top: 5px;}'
+'div.SAPOFixedLayer a.text{color:#878787;font-size:1.2em;line-height:1.25em}'
+'div.SAPOFixedLayer a.close{border: medium none;border-radius: 1em;box-sizing: content-box;color: rgba(0, 0, 0, 1);font: bold 0.8em Arial,Helvetica,sans-serif;height: 0.75em;position: absolute;right: 5px;text-overflow: clip;top: 5px; width: 0.75em; background-position:center;transition: all 1s ease;-moz-transition: all 1s ease;-webkit-transition: all 1s ease;-o-transition: all 1s ease;}'
+'div.SAPOFixedLayer a.close:hover {color: #999999; text-decoration:none;}'
+'div.SAPOFixedLayer  div {overflow: visible !important;box-sizing:content-box !important;-webkit-box-sizing:content-box !important;-moz-box-sizing:content-box !important;}'
+'div.SAPOFixedLayer #fl_pub_place { height: 82px!important;}';
		

	
	var	style_SAPOpub_popin 		= _d.createElement('style'); 
		style_SAPOpub_popin.type 	= 'text/css';
		style_SAPOpub_popin.media 	= 'all';
		
	var	rules_SAPOpub_popin 		= _d.createTextNode(set_SAPOpub_popin);
		

	

	
		if(style_SAPOpub_popin.styleSheet) {
		
			style_SAPOpub_popin.styleSheet.cssText = rules_SAPOpub_popin.nodeValue;
		
		} else {
		
			style_SAPOpub_popin.appendChild(rules_SAPOpub_popin);
		}
		
		head_SAPOpub_popin.appendChild(style_SAPOpub_popin);

/*** set style SAPO PUB PopIn ***/
