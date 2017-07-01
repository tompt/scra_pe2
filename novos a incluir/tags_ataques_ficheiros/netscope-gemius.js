// np_gemius script
// last revision: 20130129 (JA)
if (typeof pp_gemius_notify == 'undefined') {

	function pp_gemius_notify(url)
	{	
		if (typeof np_gemius_tag_container != 'undefined') {
			np_gemius_tag_container.add_tag(url); }
	}
}

if (typeof np_gemius_tag_container == 'undefined') {

	function np_gemius_tag(identifier, tag)
	{
		this.identifier = identifier;
		this.tag = tag;
	}

	np_gemius_tag_container = 
	{
		init: function()
			{
				try
				{
					this.v = [];
					this.date = new Date();

					var tag_container = document.getElementById('nptagcontainer');
					if(tag_container == null)
					{
						tag_container= document.createElement("div");
						tag_container.id = "nptagcontainer";
						tag_container.title = "empty";
						tag_container.setAttribute("style", "display:none");
						document.body.appendChild(tag_container);
					}
				}
				catch(ex) {}
			},
		add_tag: function (url)
			{	
				try
				{
					if(url)
					{
						var tag_container = document.getElementById('nptagcontainer');
						if(tag_container)
						{
							var identifier;
							var extra;
							var params = url.substring(url.indexOf("?")+ 1).split("&");
							for(var i=0; i< params.length; i++) {
								if(params[i].indexOf("id=") == 0)
									identifier = params[i].substring(3);
								else if(params[i].indexOf("extra=") == 0)
									extra = params[i].substring(6);
							}
						
							if(identifier)
							{
								var my_tag = "id=" + identifier;
								if(extra)
									my_tag += "&extra=" + extra;
								this.v.push(new np_gemius_tag(identifier, my_tag));
								var div= document.createElement("div");
								div.title = my_tag;
								div.setAttribute("style", "display:none");
								tag_container.appendChild(div);
								tag_container.setAttribute("title", (new Date()).getTime());
							}
						}
					}
				}
				catch(ex) {}
			},
		get_tag: function(identifier)
			{
				try
				{
					for(var i=0; i<this.v.length; i++)
					{
						if(this.v[i].identifier == identifier)
							return this.v[i];
					}
				}
				catch(ex) {}
				return null;
			},
		begin_track: function begin_track(identifier, node)
		{
			try
			{
				if(identifier)
				{
					var tag = this.get_tag(identifier);
					if(tag)
					{
						if(node)
						{
							var div = document.createElement("div");
							div.setAttribute("id", "npdivtrack" + this.date.getTime());
							div.setAttribute("class", tag.tag);
							node.appendChild(div); 
							tag.div = div;
							return div;
						}
						else
							document.write("<div id='npdivtrack" + this.date.getTime() +"' class='" + tag.tag + "'>");
					}
				}
			}
			catch(ex) {}
			return null;
		},
		end_track: function (identifier)
		{
			try
			{
				if(identifier)
				{
					var tag = this.get_tag(identifier);
					if(tag)
					{
						if(tag.div == null)
							document.write('</div>');
					}
				}
			}
			catch(ex) {}
		}
	}
	np_gemius_tag_container.init();
}

( function(d,t) { var ex; try { var gt=d.createElement(t),s=d.getElementsByTagName(t)[0],l='http'+((location.protocol=='https:')?'s':''); gt.async='true'; gt.src=l+'://gapt.hit.gemius.pl/xlgemius.js'; s.parentNode.insertBefore(gt,s);} catch (ex){}}(document,'script'));
