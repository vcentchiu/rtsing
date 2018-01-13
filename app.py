from flask import Flask, render_template, request, jsonify
from db import mongo
from question import Question
from answer import Answer
from bson import json_util, ObjectId
import json 

app = Flask(__name__)

error_msg = {"success" : 0}

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

@app.route("/")
def index():
	return render_template("index.html")


@app.route("/api/room/create", methods=["POST"])
def create_room():
	return

@app.route("/api/room/join")
def join_room():
	return

@app.route("/api/question/add", methods=["POST"])
def add_question():
	try:
		req_data = request.get_json()
		question_str = req_data["question"]
		answer_str = req_data["answer"]
		topic_list = req_data["topics"]
		q = Question(question_str, Answer(answer_str), topic_list)
		result = mongo.add_question(q)
		if result == -1:
			return jsonify(error_msg)
		return jsonify({"id": str(result), "success" : 1})
	except Exception as e:
		print(e)
		return jsonify(error_msg)

@app.route("/api/question/get")
def get_questions():
	try:
		topic = request.args.get("topic")
		start = request.args.get("start") or 0
		end = request.args.get("end") or 10
		start = int(start)
		end = int(end)
		if end < start:
			return jsonify(error_msg)
		questions = mongo.get_questions(topic, start=start, end=end)
		if questions == -1:
			return jsonify(error_msg)
		return jsonify(json.loads(JSONEncoder().encode(questions)))
	except Exception as e:
		print(e)
		return jsonify(error_msg)

@app.route("/api/question/edit")
def edit_question():
	_id = request.args.get("id")
	new_answer = request.args.get("answer")
	if mongo.update_question_answer(_id, answer):
		return jsonify({"success" : 1})
	return jsonify(error_msg)


if __name__ == "__main__":
	app.run(debug=True)
