function closeLogin() {
	$("#loginContainer").velocity(
		{ 	
			height: 0,
			opacity: 0
		},
		{
			duration: 500,
			easing: "easing"
		}
	);
	$("#loginContainer").empty();
}

$(function() {
	$('#createButton').click(function() {
		var val = $('#createRoom').val();
		var username = $("#username").val();
		if (val && username) {
			closeLogin();
		}
	});
	$('#joinButton').click(function() {
		var val = $('#joinRoom').val();
		var username = $("#username").val();
		if (val && username) {
			closeLogin();
		}

	});
});