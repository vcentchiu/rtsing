import time 

class Answer():

	def __init__(self, answer, time=time.time()):
		self.text = answer
		self.time = time


	def get_text(self):
		return text

	def get_time(self):
		return self.time 

	@classmethod
	def from_dictionary(self):
		return {
			'answer' : self.answer,
			'time' : self.time,
		}

	def to_dictionary(self):
		return {
			'answer' : self.text,
			'time' : self.time
		}