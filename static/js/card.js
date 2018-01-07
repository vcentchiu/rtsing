

function CardHandler() {}
CardHandler.prototype.constructor = CardHandler;

CardHandler.prototype.init = function() {
	this.locks = {};
	this.answerStatus = {};
	
	this.isLocked = function(id) {
		return (this.locks[id] == 1);
	}
	this.isAnswered = function(id) {
		return (this.answerStatus[id] == 1);
	}
	
	// this.loadCards(0);
	console.log(this.locks);
}


CardHandler.prototype.loadCards = function(startCard) {
	var cards = $('#card-container').find('.card');
	this.cards = cards.length;

	for (var i = startCard; i < cards.length; i++) {
		var $card = $(cards[i]);
		var $cardBody = $card.find('.card-body');

		var id = "card-" + i;
		$card.attr("id", id);
		this.answerStatus[id] = 0;
		this.locks[id] = 0;
	};
}

CardHandler.prototype.loadCard = function(data, oncomplete) {
	var self = this;
	self.locks[id] = 0;
	self.answerStatus[id] = 0;

	var question = data.question;
	var answer = data.answer;
	var topics = data.topics;
	var date = data.date;
	var id = data.id;

	var cardDiv = document.createElement("div");
	cardDiv.setAttribute("class", "card");
	cardDiv.setAttribute("id", id);

	var cardTitle = document.createElement("div");
	cardTitle.setAttribute("class", "card-title");
	cardTitle.innerHTML = question + "<div class=\"card-date\">" + date + "</div>";

	var cardBody = document.createElement("div");
	cardBody.setAttribute("class", "card-body");

	var cardAnswer = document.createElement("div");
	cardAnswer.setAttribute("class", "card-answer");
	$(cardAnswer).text("answer");
	cardBody.append(cardAnswer);

	var cardBodyInner = document.createElement("div");
	cardBodyInner.setAttribute("class", "card-body-inner");
	$(cardBodyInner).text(answer);
	cardBody.append(cardBodyInner);

	var cardTags = document.createElement("div");
	cardTags.setAttribute("class", "card-tags");

	for (var index in topics) {
		topic = topics[index];
		var cardTag = document.createElement("div");
		cardTag.setAttribute("class", "card-tag");
		$(cardTag).text(topic);
		cardTags.append(cardTag);
	}

	cardDiv.append(cardTitle);
	cardDiv.append(cardBody);
	cardDiv.append(cardTags);

	$("#card-container").append(cardDiv);
	oncomplete();
}


CardHandler.prototype.getAnswer = function($card) {
	var id = $card.attr('id');
	console.log(this.isLocked(id));
	if (this.isLocked(id)) return;
	this.locks[id] = 1;
	var self = this;

	var $cardBody = $card.find($('.card-body'));
	var $cardBodyText = $cardBody.find('.card-body-inner');
	if (!self.isAnswered(id)) {
		// $cardBody.css("height", "auto");
		$cardBodyText.velocity(
			{ opacity: 1},
			{ duration: 200, 
			easing: "easeInSine" }
		);
		self.answerStatus[id] = 1;
		self.locks[id] = 0;
		console.log(self.locks[id]);

	} else if (self.isAnswered(id)) {
		console.log($cardBody);
		// $cardBody.css("height", "50px");
		$cardBodyText.velocity(
			{ opacity: 0},
			{ duration: 200, 
			easing: "easeInSine" }
		);

		self.answerStatus[id] = 0;
		self.locks[id] = 0;
	}
}

$(function() {
	// getDBCards();
	var cardHandler = new CardHandler();
	cardHandler.init();
	console.log(cardHandler);

	$(".card").mouseenter(function(e) {
		var div = $(this).find($('.card-tags'));
		div.velocity(
			{ opacity: 1 },
			{ duration: 100, 
			  easing: "easeInSine" }
		);
	});
	$(".card").mouseleave(function(e) {
		var div = $(this).find($('.card-tags'));
		div.velocity("reverse");

	});

	$(".card").click(function() {
		cardHandler.getAnswer($(this));
	});



});