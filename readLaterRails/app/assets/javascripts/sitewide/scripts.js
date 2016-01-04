$(document).on('ready page:load', function() {	

	// Fade out readed links
	$('#content-wrapper').on("click", 'a.link', function() {
		var link_id = $(this).attr('id');
		$(this).parents('.link-wrapper').fadeOut("slow");
		markAsRead(link_id);
	});

	// Fade out deleted links
	$('#content-wrapper').on("click", '.delete-button', function() {
		$(this).parents('.link-wrapper').fadeOut("slow");
	});

	// Toogle menu
	$(".sidebar-nav").mouseover(function() {
		$("#wrapper").removeClass("toggled");
	}).mouseout(function() {
    	$("#wrapper").addClass("toggled");
    });

    //$(".sidebar-nav").clickfunction() {
    //	if($("#wrapper").hasClass("toggled")) {
    //		$("#wrapper").removeClass("toggled");
    //	} else {
    //		$("#wrapper").addClass("toggled");
    //	};
    //});

	// Menu colors on hover
	$("li").mouseover(function() {
		$(this).css("background-color","#3a3a3a");
		$(this).css("border-bottom","solid 1px #000");	
	}).mouseout(function() {
		if($(this).hasClass("user")) {
			$(this).css("background-color","#2a2a2a");
			$(this).css("border-bottom","solid 1px transparent");
		} else {
	    	$(this).css("background-color","transparent");
	    	$(this).css("border-bottom","solid 1px transparent");
    	}
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