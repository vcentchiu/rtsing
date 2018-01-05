import requests
header = {
	"Content-Type" : "application/json"
}
"""print(requests.post("http://127.0.0.1:5000/api/question/add", headers=header, json={
		"question" : "hello",
		"answer" : "hi",
		"topics" : ["probability", "statistics"]
	}).text)"""

print(requests.get("http://127.0.0.1:5000/api/question/get?topic=probability").text)