(function ($) {
	// Default options for plugin
	var defaultOpts = {
		width: 360,
		padding: 15
	}
	
	// Defining the plugin
	$.fn.gridLayout = function (options) {
		var options = $.extend({}, defaultOpts, options);
		
		elementInit(options, this);
	};

	// Initializing given element
	function elementInit (options, element) {
		$(element).addClass('grid-layout');
		$(element).children().each(function (index, item) {
			var html = "<img width='"+ options.width +"px' alt='"+ $(item).attr('data-alt') +"' src='"+ $(item).attr('data-url') +"' />"
			$(item).append(html)
		});
	}


} ( jQuery ));