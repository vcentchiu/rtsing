from pymongo import MongoClient

client = MongoClient("mongodb://kunal:vincent@ds239387.mlab.com:39387/heroku_tzjvsx26")
database = client["heroku_tzjvsx26"]
collection = database["question"]
print(collection.delete_many({}).deleted_count)
