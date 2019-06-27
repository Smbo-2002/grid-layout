(function ($) {
	// Default options for plugin
	var defaultOpts = {
		width: 180,
		padding: 20
	}
	
	// Defining the plugin
	$.fn.gridLayout = function (options) {
		var options = $.extend({}, defaultOpts, options);
		
		elementInit(options, this);

		$(window).resize(function(){   
			wrap(options, this);
		});
	};

	// Initializing given element
	function elementInit (options, element) {
		$(element).addClass('grid-layout');
		var viewWidth = $('.grid-layout').width();
		var columns = Math.floor(viewWidth / options.width);
		var currColumn = 1;
		$(element).children().each(function (index, item) {
			var left = 0;
			var top = 0;
			var html = "<img width='"+ options.width +"px' alt='"+ $(item).attr('data-alt') +"' src='"+ $(item).attr('data-url') +"'/>";
			$(item).append(html);
			left = (currColumn-1)*(options.width + options.padding);
			if(currColumn+1 > columns) {
				currColumn = 1;
			} else {
				currColumn++;
			}
			if (index+1>columns) {
				top = parseInt($($(element).children()[index-columns]).css('top').replace('px','')) + parseInt($($(element).children()[index-columns]).css('height').replace('px',''));
			}
			$(item).css("left", left + "px" );
			$(item).css("top", top + options.padding + "px" );
		});
	}

	function wrap (options, element) {
		var viewWidth = $('.grid-layout').width();
		var columns = Math.floor(viewWidth / options.width);
		var currColumn = 1;
		$('.grid-layout').children().each(function (index, item) {
			var left = 0;
			var top = 0;
			left = (currColumn-1)*(options.width + options.padding);
			if(currColumn+1 > columns) {
				currColumn = 1;
			} else {
				currColumn++;
			}
			if (index+1>columns) {
				top = parseInt($($('.grid-layout').children()[index-columns]).css('top').replace('px','')) + parseInt($($('.grid-layout').children()[index-columns]).css('height').replace('px',''));
			}
			$(item).css("left", left + "px" );
			$(item).css("top", top + options.padding + "px" );
		});
	}


} ( jQuery ));