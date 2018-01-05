import time

class Question:

	def __init__(self, question, answer, topics=[]):
		self.question = question
		self.answer = answer
		self.topics = topics
		self.created_at = time.time()

	def push_to_db(self, client):
		pass

	def to_dictionary(self):
		return {
			'question' : self.question,
			'answer' : self.answer,
			'topics' : self.topics,
			'created_at' : self.created_at,
		}
