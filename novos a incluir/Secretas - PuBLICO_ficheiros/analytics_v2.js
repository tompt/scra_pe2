(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-15474788-20', 'publico.pt');
ga('require', 'displayfeatures');
ga('require', 'linkid', 'linkid.js');

function r(f){/in/.test(document.readyState)?setTimeout(r,9,f):f()};
r(function(){
	var tm = Math.random();
	var elemImg = document.createElement('img');
	elemImg.src = "//pt-gmtdmp.mookie1.com/t/v2/learn?tagid=V2_7655&src.rand=" + tm + "&src.id=Publico";
	elemImg.width = 1;
	elemImg.height = 1;
	try{
		document.body.appendChild(elemImg);
	}catch(e){}
	
	var elemImg2 = document.createElement('img');
	elemImg2.src = "//eu-gmtdmp.gd1.mookie1.com/tagr/v1/activity?acid=23&inst=EU&tagid=18229&src.rand=" + tm + "&trb.clientID=195&trb.activityID=18229";
	elemImg2.width = 1;
	elemImg2.height = 1;
	try{
		document.body.appendChild(elemImg2);
	}catch(e){}	
});

(function() {
	var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	g.type='text/javascript'; g.async=true; g.defer=true; g.src='https://a.brpx.io/ub.min.js';g.setAttribute("data-brpx-ub", "");g.setAttribute("data-cookies", "_chartbeat2,publicoUid,PUBLICO_JS");s.parentNode.insertBefore(g,s);
})();