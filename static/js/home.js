function highlightNavigation(event) {
	console.log(event);
}

function mouseEnterTopic(event) {
	$(this).css("background-color", "white");
}

function mouseLeaveTopic(event) {
	$(this).css("background-color", "#ebebeb");
}

$(document).ready(function() {
	$("#topics li").on('click', highlightNavigation);
	$("#topics li").hover(mouseEnterTopic, mouseLeaveTopic);
});