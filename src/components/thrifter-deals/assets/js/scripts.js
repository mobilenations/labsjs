$(function() {
	// Deal Flow Modal
	if(!$('.deal-modal').length){
		$('.deal-flow__deal').fancybox({
			slideClass : 'deal-modal',
			buttons: ['close'],
			type : 'ajax',
			margin: 0,
			autoFocus : false,
			afterLoad : function(instance, current, firstRun) {
				var strip_els = '#header, .region-site-footer, #skip-link, .element-focusable, .region-site-header, .tabs.primary';
				instance.$refs.container.find(strip_els).remove();
				// Chrome ignores pushState title, just update doc title
				document.title = instance.$refs.container.find('title').text();
				history.pushState({}, '', current.src);
			}
		});
	}
	$(window).on('popstate', function (event) {  //pressed back button
		$('.fancybox-close-small').click();
  });
	$('.deal-page__comment-leave').on('click', function(){
		$('.deal-page__comment-form').show();
		$('.deal-page__comment-form textarea').focus();
		return false;
  });
});
