from flask import Flask, request, jsonify
from secret import *
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})
openai.api_key = OPEN_AI_API_KEY

def get_gpt_response(content):
	chat_completion = openai.ChatCompletion.create(
		model="gpt-3.5-turbo", 
		messages=[{"role": "user", "content": content}])
	return chat_completion.choices[0].message.content

def generate_comic_strip(content):
	prompt = f'Convert this news story into a comic strip with 4-5 scene descriptions: {content}. \
		Please keep the information factual.\
		Keep the format in an ordered list. \
		Just provide 1 line descriptions.'

	print("Generating prompt for the provided news article..")
	return get_gpt_response(prompt)

def parse_comic_string_response(comic_strip_response):
	return [x for x in comic_strip_response.split("\n")]

@app.route('/api/post', methods=['POST'])
def post_endpoint():
	data = request.get_json()
	if not data:
		return jsonify({"message": "No input data provided"}), 400
	if 'content' not in data:
		return jsonify({"message": "Missing news content"}), 400

	comic_strip = generate_comic_strip(data['content'])
	comic_strip_response = parse_comic_string_response(comic_strip)

	return jsonify(
		{
			"comic_strip": comic_strip_response,
		}), 201

if __name__ == "__main__":
	app.run(debug=True)
