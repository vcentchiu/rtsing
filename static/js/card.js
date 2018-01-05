

function CardHandler() {}
CardHandler.prototype.constructor = CardHandler;

CardHandler.prototype.init = function() {
	this.locks = {};
	this.answerStatus = {};
	
	var cards = $('#card-container').find('.card');
	this.cards = cards.length;

	for (var i = 0; i < cards.length; i++) {
		var $card = $(cards[i]);
		var $cardBody = $card.find('.card-body');

		var id = "card-" + i;
		$card.attr("id", id);
		this.answerStatus[id] = 0;
		this.locks[id] = 0;
	};

	this.isLocked = function(id) {
		return (this.locks[id] == 1);
	}
	this.isAnswered = function(id) {
		return (this.answerStatus[id] == 1);
	}
	
}

CardHandler.prototype.loadCard = function(cardDict) {
	var id = cardDict[id];
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