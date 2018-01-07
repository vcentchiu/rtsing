var cardHandler;

function hideQuestionModal() {
	$("#addQuestion").modal('hide');
}

function addQuestion() {
	var question = $("#questionString").val();
	var answer = $("#answerString").val();
	var topics = $("#tags").tagsinput('items');
	$.ajax({
		type : "POST",
		url : "/api/question/add",
		contentType: "application/json",
		data : JSON.stringify({
			'question' : question,
			'answer' : answer,
			'topics' : topics,
		}),
		dataType: 'json',
		success : hideQuestionModal,
		error : hideQuestionModal,
	});
}

function highlightNavigation(event) {
	var topic = event.currentTarget.innerHTML;
	$("#card-container").empty();
	getCards(topic, 0, 10);
}

function mouseEnterTopic(event) {
	$(this).css("background-color", "white");
}

function mouseLeaveTopic(event) {
	$(this).css("background-color", "#ebebeb");
}

function appendCards(cards) {
	for (var cardIndex in cards) {
		var card = cards[cardIndex];
		var answer = card.answer;
		var topics = card.topics;
		var question = card.question;
		var time = card.created_at;
		var date = new Date(0);
		date.setUTCSeconds(parseInt(time));
		var month = date.getMonth() + 1;
		var year = date.getYear() + 1900;
		var dateString = month + "/" + date.getDate() + "/" + year;
		var id = card._id
		cardHandler.loadCard({"id": id, "question": question, "answer": answer, "topics": topics, "date": dateString});
	}
	loadLatex();
}

function getCards(topic, start, end) {
	$.ajax({
		url : "/api/question/get",
		method : "GET",
		data : {
			'topic' : topic,
			'start' : start,
			'end' : end,
		},
		success : appendCards,
		error : function() {
			console.log("There was an error!")
		}
	});
}

function loadLatexCompiler() {
	MathJax.Hub.Config({
     tex2jax: {
       inlineMath: [['$','$'], ['\\(','\\)']],
      },
      showProcessingMessages: false,
    });   
}

function questionLatexParser(item) {
	document.getElementById('questionLatex').innerHTML = document.getElementById("questionString").value;
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"questionLatex"]);
}

function answerLatexParser(item) {
	document.getElementById('answerLatex').innerHTML = document.getElementById("answerString").value;
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"answerLatex"]);
}

function loadLatex() {
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"questionLatex"]);
	MathJax.Hub.Queue(["Typeset",MathJax.Hub,"answerLatex"]);
}

function init() {
	cardHandler = new CardHandler();
	cardHandler.init();	

	$("#topics li").on('click', highlightNavigation);
	$("#topics li").hover(mouseEnterTopic, mouseLeaveTopic);
	getCards(-1, 0, 10);
	$("#qsubmit").on('click', addQuestion);
	loadLatexCompiler();
}

$(document).ready(init());
