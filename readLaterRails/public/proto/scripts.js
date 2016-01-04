$(document).on('ready page:load', function() {	

	//$('#content-wrapper').on("click", '.delete-button', function() {
	//	$(this).parents('.link-container').fadeOut("slow");
	//});
	

	$("#menu-toggle").click(function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
	});

	//$('#content-wrapper').on("click", '.link', function() {
	//	var link_id = $(this).attr('id');
	//	$(this).parents('.link-container').fadeOut("slow");
	//	markAsRead(link_id);
	//});

	$("li").mouseover(function() {
		$(this).css("background-color","#2a2a2a");
		$(this).css("border-bottom","solid 2px #337ab6");
		$(this).css("padding-bottom","6px");
	}).mouseout(function() {
    	$(this).css("background-color","transparent");
    	$(this).css("border-bottom","solid 0px transparent");
    	$(this).css("padding-bottom","8px");
    });

});

function markAsRead(link_id) {
	$.ajax({
		type: "PATCH",
		url: '/links/' + link_id,
		dataType: "json",
		data: {
			link: {
				read: true
			}
		}
	});
}