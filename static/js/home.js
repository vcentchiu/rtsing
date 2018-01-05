function addQuestion() {

}

function highlightNavigation(event) {
	console.log(event);
}

function mouseEnterTopic(event) {
	$(this).css("background-color", "white");
}

function mouseLeaveTopic(event) {
	$(this).css("background-color", "#ebebeb");
}

function init() {
	$("#topics li").on('click', highlightNavigation);
	$("#topics li").hover(mouseEnterTopic, mouseLeaveTopic);
}

$(document).ready(init());