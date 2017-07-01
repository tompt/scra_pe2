/*
 * File: base.activation.js
 * Description: Contains several functions used on the site
 * 
 * DOM Manipulations:
 * - adds classes for :first-child/:last-child [support for older browsers]
 * - email address obfuscation
 * - default form field value swap
 * 
 * Activates:
 * - superfish dropdown menus
 * - cycle plugin [auto-rotating banners, multi-page CTA modules]
 * - tabs
 * - accordions
 * - table sort
 * - chosen select menus
 * 
 * Processes:
 * - form validation
 * - modifications to link default behavior [rel=external, rel=modal, rel=popup]
 * - support functions [popup,redirects, etc.]
*/
jQuery(document).ready(function($) {

	$window=$(window);
	$link=$("#to-top");
	$link.click(function(){
		$("html, body").animate({scrollTop:0},"slow");
	});
	$window.scroll(function(){
		if($window.scrollTop()<=0){
			$link.fadeOut("fast");
		}else{
			$link.fadeIn("fast");
		}
	});
	//CAROUSEL
	$('#home-carousel').carousel({interval:'6000'});//

	//NAV
	//nav init
	//defaults :: sensitivity:7,interval:100, timeout:0
	$("nav li").has("ul").hoverIntent({
		over: navOver,
		out: navOut,
		selector: 'ul'
	});
	//org
	//$("nav .mega").removeClass("mega");
	//$("nav li").has("ul").hover(function(){
	//	$(this).addClass("current").children("ul").fadeIn();
	//}, function() {
	//	$(this).removeClass("current").children("ul").stop(true, true).css("display", "none");
	//});
	//nav over
	function navOver(){
		$(this).addClass("current").children("ul").animate({"height":'auto'},400);
	};
	function navOut(){
		$(this).removeClass("current").children("ul").stop(true, true).animate({"height":0},200);
	};
	//nav out
	//HIGHLIGHT ACTIVE
	if( typeof cfrequest !== 'undefined' && cfrequest.current_url_array != null ){
		try {
			var url_array = $.parseJSON('[' + cfrequest.current_url_array + ']');
		} catch(error){
			var url_array = false;
		};
		if ( typeof( url_array ) == 'object' ){
			//console.log( 'url_array' + url_array );
			var url_match = '/free-tools/';
			$( url_array ).each(
				function(index, value){
					$(".nav-main [href='" + value + "']").closest("li").addClass("current");
					$(".nav-main [href='" + value + "']").closest(".parent").addClass("selected");
					$(".subnav [href='" + value + "']").closest(".parent").addClass("selected");
					try {
						var segment_first = value.toString().split( '/' );
						if ( segment_first[0] === "register" ) {
							$(".nav-main [href='" + url_match + "']").closest("li").addClass("current");
							$(".nav-main [href='" + url_match + "']").closest(".parent").addClass("selected");
							$(".subnav [href='" + url_match + "']").closest(".parent").addClass("selected");
						};
					} catch(error) {};
				}
			);
		}
	}
	$(".subnav-collapse a").click(function(){
		$(this).parents(".subnav").find('.submenubtn span').text($(this).text());
		$(this).parents(".subnav").find('.submenubtn span').val($(this).text());
	});

	$("a.email").nospam();

	//ul to select dropdown
	$('ul.select-dropdown').each(function(){
		var list=$(this),classes=$(this).attr("class"),
		select=$(document.createElement('select')).insertBefore($(this).hide()).addClass(classes);
		$('>li a', this).each(function(){
			var target=$(this).attr('rel'),
			option=$(document.createElement('option'))
			.appendTo(select)
			.val(this.href)
			.html($(this).html())
			.click(function(){
				if (target==='external'){
					window.open($(this).val());
				}
				else{
					window.location.href=$(this).val();
				}
			});
			list.remove();
		});
		$(".select-dropdown").change(function(){
			//location.href=$(this).val();
			var val = $(this).find('option:selected').val();
			location.href=val;
		});
	});
	//jump menu
	$(".jumpmenu").change(function() {
		var val = $(this).find('option:selected').val();
		location.href=val;
	});
	$("select").uniform();

	//tabs activation
	$(".tabs-ajax").tabs({
		beforeLoad: function( event, ui ) {
			if ( ui.tab.data( "loaded" ) ) {
				event.preventDefault();
				return;
			} else {
				$(".preloader").show();
			}
			ui.jqXHR.error(function() {
				ui.panel.html(
					"This information could not be loaded. We&rsquo;ll try to fix this as soon as possible. " +
					"Apologies for any inconvenience."
				);
				$(".preloader").hide();
			});
			ui.jqXHR.success(function() {
				ui.tab.data( "loaded", true );
				$(".preloader").hide();
			});
		}
	});
	$(".tabs").tabs();

	//if hash tag exists open accordion & scroll to position
	if ( $(".accordion.ajax") || $(".accordion.collapsed") || $(".accordion") ) {
		var hashValue = location.hash,
			target = hashValue.replace('#','');
		var targetOffset = 0;
		var twtarget = $('a[name="'+target+'"]');
		if (twtarget != 'undefined' && twtarget.offset() != null && target != '') {
			var targetOffset = twtarget.offset().top;
			$("body").animate({
				scrollTop: targetOffset
			}, 400, function () {
				location.hash = "#" + target;
				twtarget.click();
			});
		}
	}
	//
	/*accordion activations*/
	var icons = {
		header: "fa icon-chevron-down",
		activeHeader: "fa icon-chevron-up color-orange"
	};
	$(".accordion").accordion({
		heightStyle: "content",
		collapsible: false,
		icons: icons,
		active: 0
	});
	$(".accordion.collapsed").accordion({
		heightStyle: "content",
		collapsible: true,
		icons: icons,
		active: false
	});
	//$(".accordion.ajax").accordion({
	//	heightStyle: "content",
	//	collapsible: false,
	//	icons: icons,
	//	active: true
	//});
	if ( $(".table-sort") && typeof stupidtable == 'function') { 

		//table sorter
		var table = $(".table-sort").stupidtable({
			"date": function (a, b) {
				var date_from_string = function (str) {
					var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
					var pattern = "^([a-zA-Z]{3})\\s*(\\d{1,2}),\\s*(\\d{4})$";
					var re = new RegExp(pattern);
					var DateParts = re.exec(str).slice(1);
					var Year = DateParts[2];
					var Month = $.inArray(DateParts[0].toLowerCase(), months);
					var Day = DateParts[1];
					return new Date(Year, Month, Day);
				};
				aDate = date_from_string(a);
				bDate = date_from_string(b);
				return aDate - bDate;
			}
		});
	
		table.bind('beforetablesort', function (event, data) {
			// data.column - the index of the column sorted after a click
			// data.direction - the sorting direction (either asc or desc)
			$("#table-msg").text("Sorting index " + data.column)
		});
	
		table.bind('aftertablesort', function (event, data) {
			var th = $(this).find("th");
			th.find(".arrow").remove();
			var arrow = data.direction === "asc" ? " fa fa-sort-asc" : " fa fa-sort-desc";//&uarr; fa fa-sort-asc \f0de; //&darr; fa fa-sort-desc \f0dd; 
			th.eq(data.column).append('<span class="arrow text-small ' + arrow +'">&nbsp;</span>');
		});
		$(".table-sort .init-sort").click();
	}
	//external links
	$("a[rel*=external]").on('click', function (e) {
		e.preventDefault();
		var url = $(this).attr("href");
		window.open( url );
	});

	//dynamic modal content
	$('[data-toggle="modal"]').on('click', function(e) {
		e.preventDefault();
		var url = $(this).attr('href');
		if ( ! url.indexOf('#') == 0 ) {
			//var l = Ladda.create(this);

			var modal, modalDialog, modalContent;
			modal = $('<div class="modal fade" />');
			modalDialog = $('<div class="modal-dialog" />');
			modalContent = $('<div class="modal-content" />');
	 
			modal.modal('hide')
				.append(modalDialog)
				.on('hidden.bs.modal', function(){ $(this).remove(); })
				.appendTo('body');
	 
			modalDialog.append(modalContent);
	 
			//l.start();
	 
			$.get(url, function(data) {
				modalContent.html(data);
				modal.modal('show');
				//l.stop();
			});
		}
	});
	//analytics tracking for 'universal' GA code
	//$('.btn').on('click', function() {
	//	ga('send', 'event', 'button', 'click', 'nav-buttons');
	//});
});
//twitter function
function addlinks( data ) {
	//Add link to all http:// links within tweets
	data = data.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
		return '<a href="' + url + '" >' + url + '</a>';
	});
	
	//Add link to @usernames used within tweets
	data = data.replace(/\B@([_a-z0-9]+)/ig, function( reply ) {
		return '<a href="http://twitter.com/' + reply.substring(1) + '" style="font-weight:lighter;" >' + reply.charAt(0) + reply.substring(1) + '</a>';
	});
	return data;
}

function relative_time( time_value ) {
	var values = time_value.split(" ");
	time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
	var parsed_date = Date.parse( time_value );
	var relative_to = ( arguments.length > 1 ) ? arguments[1] : new Date();
	var delta = parseInt( ( relative_to.getTime() - parsed_date ) / 1000 );
	var shortdate = time_value.substr( 4, 2 ) + " " + time_value.substr( 0, 3 );
	delta = delta + ( relative_to.getTimezoneOffset() * 60 );

	if ( delta < 60 ) {
		return '1m';
	} else if ( delta < 120 ) {
		return '1m';
	} else if ( delta < ( 60 * 60 ) ) {
		return ( parseInt( delta / 60 ) ).toString() + 'm';
	} else if ( delta < ( 120 * 60 ) ) {
		return '1h';
	} else if ( delta < ( 24 * 60 * 60 ) ) {
		return ( parseInt( delta / 3600) ).toString() + 'h';
	} else if ( delta < ( 48 * 60 * 60 ) ) {
		//return '1 day';
		return shortdate;
	} else {
		return shortdate;
	}
}
