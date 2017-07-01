jQuery(document).ready(function(){

    var cookieArray = new Array();

    function listadoCookies() {

        var lasCookies = document.cookie.split(';');

        for (var i = 1 ; i <= lasCookies.length; i++) {
           
            cookieArray.push(lasCookies[i-1]);

        }

        return cookieArray;

    }

    if(jQuery.cookie('accept_cookie') == undefined) {

        jQuery(".coockie_banner").show();

        // Mi código

        listadoCookies();

        var fecha_fin = new Date;
        fecha_fin.setDate(fecha_fin.getDate()-1);

        for (var i = 0; i<cookieArray.length; i++) {

            var nombreCookie = cookieArray[i].split("=")[0];
            var valorCookie = cookieArray[i].split("=")[1];

            // Limpiamos la URL
            // Quitamos el http://www y el http://
            function cleanURL(url) {
                var URLCookie = url;
                var str = URLCookie;
                var n = str.search("http://www");
                if( url == n ) {
                   return URLCookiewww = URLCookie.replace("http://www","");
                } else {
                    return URLCookie = URLCookie.replace("http://","");
                }

            }

            var URLLimpia = cleanURL(document.URL); 

            // console.log(URLCookie);
            // Quitamos lo que hay detrás de /
            
            var MiURL = URLLimpia.split( '/' );        
            MiURL = URLLimpia.replace('www', '');
            var URLAnalitycs = MiURL.split('/');

            if(jQuery('input.agreeCookies').val() == 'true' ) {

                document.cookie = nombreCookie + "=" + valorCookie + ";expires=" + fecha_fin.toGMTString() + ";path=/;";

            }

            window.setInterval(function() { borraAnalitycs() },2000);


            function borraAnalitycs() {

                function borrarCookies(nombre, dominio, path){
                    try {
                        function Conseguir_Cookie( check_nombre ) {
                                var todas_las_cookies = document.cookie.split(';'),
                                    cookie_almacenada = '',
                                    nombre_cookie = '',
                                    valor_cookie = '',
                                    cookie_encontrada = false;
                        
                                for ( i = 0; i < todas_las_cookies.length; i++ ) {
                                    cookie_almacenada = todas_las_cookies[i].split( '=' );
                    
                                    nombre_cookie = cookie_almacenada[0].replace(/^\s+|\s+$/g, '');
                    
                                    if ( nombre_cookie == check_nombre ) {
                                        cookie_encontrada = true;
                                        if ( cookie_almacenada.length > 1 ) {
                                            valor_cookie = unescape( cookie_almacenada[1].replace(/^\s+|\s+$/g, '') );
                                        }
                                        return valor_cookie;
                                        break;
                                    }
                                    cookie_almacenada = null;
                                    nombre_cookie = '';
                                }
                                if ( !cookie_encontrada ) {
                                  return null;
                                }
                            }
                            if (Conseguir_Cookie(nombre)) {
                                var dominio = dominio || document.domain;
                                var path = path || "/";
                                document.cookie = nombre + "=; expires=" + new Date + "; domain=" + dominio + "; path=" + path;
                            }
                    }
                    catch(err) {}    
                };

                if(jQuery('input.agreeAnalitycs').val() == 'true' ) {
                
                    borrarCookies('__utma',URLAnalitycs[0],'/');
                    borrarCookies('__utmz',URLAnalitycs[0],'/');
                    borrarCookies('__utmb',URLAnalitycs[0],'/');
                    borrarCookies('__utmc',URLAnalitycs[0],'/');
                    borrarCookies('_ga',URLAnalitycs[0],'/');

                }

            }

            console.log("Se ha eliminado la cookie: " + nombreCookie + " valor: " + valorCookie);

        }   

    } else {

        jQuery(".coockie_banner").hide();

    }

    jQuery(".coockie_banner button").on('click', function() {

        jQuery.cookie('accept_cookie', 'Si', { expires: 15, path: '/' });

        jQuery(".coockie_banner").hide('slow');

    });

});