import time
from answer import Answer

class Question:

	def __init__(self, question, answer, topics=[], history=[], time=time.time()):
		self.question = question
		self.answer = answer
		self.topics = topics
		self.created_at = time
		self.history = history

	def update_answer(self, answer, time=time.time()):
		new_answer = Answer(answer)
		old_answer = self.answer
		self.history.insert(0, old_answer.to_dictionary())
		self.answer = new_answer
		return self

	def push_to_db(self, client):
		pass

	def to_dictionary(self):
		return {
			'question' : self.question,
			'answer' : self.answer.to_dictionary(),
			'topics' : self.topics,
			'created_at' : self.created_at,
			'history' : self.history,
		}

	@classmethod
	def from_dictionary(data):
		question = data['question']
		answer = Answer.from_dictionary(data['answer'])
		topics = data['topics']
		history = data['history']
		time = data['created_at']
		return Question(question, answer, topics, history, time)
