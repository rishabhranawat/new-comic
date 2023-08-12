from flask import Flask, request, jsonify
from apikey import apikey 
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})
openai.api_key = apikey

def get_gpt_response(content):
	chat_completion = openai.ChatCompletion.create(
		model="gpt-3.5-turbo", 
		messages=[{"role": "user", "content": content}])
	return chat_completion.choices[0].message.content

def get_matched_content_with_labels(form, context):
	prompt = f'Consider this form: {form} and this context: {context}. Extract the rows in context that match the label (literally or semantically) in form. Only output the rows and remove the submit button.'
	return get_gpt_response(prompt)

def fill_form(form, context):
	matched_context_rows = get_matched_content_with_labels(form, context)
	prompt = f'Fill form: {form} with the information in context: {matched_context_rows}. Only output the html code without the \\n character.'
	return get_gpt_response(prompt)

@app.route('/api/post', methods=['POST'])
def post_endpoint():
	data = request.get_json()
	if not data:
		return jsonify({"message": "No input data provided"}), 400
	if 'context' not in data or 'form' not in data:
		return jsonify({"message": "Missing 'context' or 'form' in request data"}), 400

	context = data['context']
	form = data['form']

	return jsonify(
		{
			"context": data["context"],
		}), 201

if __name__ == "__main__":
	app.run(debug=True)
