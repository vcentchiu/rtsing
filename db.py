from pymongo import MongoClient
from bson import ObjectId
import os

DATABASE_URI = os.environ.get("MONGODB_URI") or "mongodb://kunal:vincent@ds239387.mlab.com:39387/heroku_tzjvsx26"
DATABASE_NAME = os.environ.get("DB_NAME") or "heroku_tzjvsx26"

class MongoDB():

	def __init__(self):
		self.client = MongoClient(DATABASE_URI)
		self.database = self.client['heroku_tzjvsx26']

	def add_question(self, question):
		try:
			to_dictionary = question.to_dictionary()
			collection = self.database['question']
			inserted_id = collection.insert_one(to_dictionary).inserted_id
			return inserted_id
		except Exception as e:
			print(e)
			return -1

	def get_questions(self, topic, start=0, end=10):
		try:
			collection = self.database['question']
			if topic == "-1" or topic == None:
				start = min(start, collection.count())
				return list(collection.find({}).skip(start).limit(end - start))
			else:
				criteria = {"topics" : {"$in" : [topic]}}
				start = min(start, collection.find(criteria).count())
				return list(collection.find(criteria).skip(start).limit(end - start))
		except Exception as e:
			print(e)
			return -1

	def update_question_answer(self, id, answer):
		try:
			collection = self.database['question']
			question = collection.find_one({"_id" : ObjectId(id)})
			q = Question.from_dictionary(question)
			q.update_answer(answer)
			return True
		except:
			return False


mongo = MongoDB()