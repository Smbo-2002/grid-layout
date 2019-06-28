(function ($) {
	// Default options for plugin
	var defaultOpts = {
		width: 180,
		padding: 20
	}
	
	// Defining the plugin
	$.fn.gridLayout = function (options) {

		// Merging all options
		var options = $.extend({}, defaultOpts, options);
		
		// Initializing the document
		elementInit(options, this);

		var that = this;

		// This code allows us to fix the positions when all the images are loaded
		var images = $(this).find('img'),
			len = images.length,
			counter = 0;

		$.each(images, function (index, img) {
			$(img).on('load', checkLoaded);
			$(img).on('error', function () {
				len--;
			});
		});		

		function checkLoaded(status) {
			counter++;
			if ( counter === len ) {
				wrap(options, that);
			}
		}

		// Change positions when the window is resized
		$(window).resize(function(){
			wrap(options, that);
		});

		// Open modal when clicked on image
		$(this).children().each(function (index, item) {
			$(item).click(function () {
				var modal = "<div class='grid-modal'></div>";
				$('body').append(modal);
				$($(item).children()[0]).clone().appendTo( ".grid-modal" );
				$(".grid-modal").click(function () {
					$(".grid-modal").remove();
				})
			}) 
		})
	};

	// Initializing given element
	function elementInit (options, element) {
		var ul = $(element);
		var li = ul.children();

		ul.addClass('grid-layout');

		li.each(function (index, item) {

			var tag = "<img width='"+ options.width +"px' alt='"+ $(item).attr('data-alt') +"' src='"+ $(item).attr('data-url') +"'/>";

			$(item).append(tag);

		});
		
		wrap(options, element);
	}

	// Function, repsponsibe for repositioning the images on the web page
	function wrap (options, element) {
		var ul = $(element);
		var li = ul.children();

		var viewWidth = ul.width();
		var columns = Math.floor(viewWidth / (options.width + options.padding));
		columns = columns < 1 ? 1 : columns;
		var currColumn = 0;
		var ulHeight = 0;

		li.each(function (index, item) {
			var left = 0;
			var top = 0;
			var tempHeight;
			var topLi = $(li[index-columns]);
			left = (currColumn)*(options.width + options.padding);
			
			top = index + 1 > columns 
				? parseInt(topLi.css('top')) + parseInt(topLi.css('height')) + options.padding
				: top;

			tempHeight = top + parseInt($(item).css('height')) + options.padding;

			ulHeight = ulHeight > tempHeight ?  ulHeight : tempHeight;

			currColumn =  ++currColumn % columns;
			
			$(item).css("left", left + "px" );
			$(item).css("top", top + "px");
			
		});
		$(element).css("height", ulHeight);
	}
} ( jQuery ));