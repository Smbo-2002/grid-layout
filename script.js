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
		var imgs = document.images,
			len = imgs.length,
			counter = 0;

		[].forEach.call( imgs, function( img ) {
			img.addEventListener( 'load', incrementCounter, false );
		} );

		function incrementCounter() {
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
		$(element).addClass('grid-layout');
		var viewWidth = $('.grid-layout').width();
		var columns = Math.floor(viewWidth / (options.width + options.padding));
		var currColumn = 1;
		var heights = [];
		$(element).children().each(function (index, item) {
			var left = 0;
			var top = 0;
			var html = "<img width='"+ options.width +"px' alt='"+ $(item).attr('data-alt') +"' src='"+ $(item).attr('data-url') +"'/>";
			$(item).append(html);
			
			left = (currColumn-1)*(options.width + options.padding);
			if (index+1>columns) {
				top = parseInt($($(element).children()[index-columns]).css('top').replace('px','')) + parseInt($($(element).children()[index-columns]).css('height').replace('px',''));
			}
			heights[currColumn-1] = top + parseInt($(item).css('height').replace('px',''));
			if(currColumn+1 > columns) {
				currColumn = 1;
			} else {
				currColumn++;
			}
			$(item).css("left", left + "px" );
			$(item).css("top", top + options.padding + "px");
			
		});
		heights.sort(function(a, b){return b-a});
		$(element).css("height", heights[0]);
	}


	// Function, repsponsibe for repositioning the images on the web page
	function wrap (options, element) {
		var viewWidth = $('.grid-layout').width();
		var columns = Math.floor(viewWidth / (options.width + options.padding));
		var currColumn = 1;
		var heights = [];
		$(element).children().each(function (index, item) {
			var left = 0;
			var top = 0;
			left = (currColumn-1)*(options.width + options.padding);
			if (index+1>columns) {
				top = parseInt($($(element).children()[index-columns]).css('top').replace('px','')) + parseInt($($(element).children()[index-columns]).css('height').replace('px',''));
			}
			heights[currColumn-1] = top + parseInt($(item).css('height').replace('px',''));
			if(currColumn+1 > columns) {
				currColumn = 1;
			} else {
				currColumn++;
			}
			$(item).css("left", left + "px" );
			$(item).css("top", top + options.padding + "px" );
		});
		heights.sort(function(a, b){return b-a});
		$(element).css("height", heights[0]);
	}


} ( jQuery ));