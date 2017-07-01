_satellite.pushAsyncScript(function(event, target, $variables){
  var SparrowLoader=function(t){function e(t,e){var n,a,o;a=!1,n=document.createElement("script"),n.type="text/javascript",n.src=t,n.onload=n.onreadystatechange=function(){a||this.readyState&&"complete"!=this.readyState||(a=!0,e?e():!0)},o=document.getElementsByTagName("script")[0],o.parentNode.insertBefore(n,o)}return e("https://pixel.condenastdigital.com/config/"+t+".config.js",function(){e("https://pixel.condenastdigital.com/sparrow.min.js")}),!0};SparrowLoader("ars-technica")
});
