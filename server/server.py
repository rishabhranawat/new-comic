from flask import Flask, request, jsonify, send_file
import openai
from flask_cors import CORS
import os
import io
import warnings
from PIL import Image
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
import threading
import uuid
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# app settings
app = Flask(__name__)
CORS(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

# model/open ai/stability ai settings
OPEN_AI_CHAT_MODEL = 'gpt-3.5-turbo'
STABILITY_AI_IMAGE_GEN_MODEL = 'stable-diffusion-xl-1024-v1-0'
openai.api_key = os.getenv('OPEN_AI_API_KEY')
os.environ['STABILITY_HOST'] = 'grpc.stability.ai:443'
os.environ['STABILITY_KEY'] = os.getenv('STABILITY_AI_API_KEY')
COMIC_IMAGES_BASE_DIR = '../../server/'

# stability generation
stability_api = client.StabilityInference(
    key=os.environ['STABILITY_KEY'], # API Key reference.
    verbose=True, # Print debug messages.
    engine=STABILITY_AI_IMAGE_GEN_MODEL, # Set the engine to use for generation.
    # Check out the following link for a list of available engines: https://platform.stability.ai/docs/features/api-parameters#engine
)

def get_image_path(unique_id, scene_num):
	return str(unique_id)+'_'+str(scene_num)+ ".png"

############################GPT##################################
def get_gpt_response(content):
	chat_completion = openai.ChatCompletion.create(
		model=OPEN_AI_CHAT_MODEL, 
		messages=[{"role": "user", "content": content}])
	return chat_completion.choices[0].message.content

def generate_comic_strip(content):
	prompt = f'Convert this news story into a comic strip with exactly 5 scene descriptions: {content}. \
		Please keep the information factual.\
		Keep the format in an ordered list. \
		Just provide 1 line descriptions.'

	print("Generating prompt for the provided news article..")
	return get_gpt_response(prompt)

def parse_comic_string_response(comic_strip_response):
	return [x for x in comic_strip_response.split("\n")]

############################STABILITY##################################
def generate_comic_strip_for_single_prompt(comic_scene_prompt, scene_num, request_unique_id):
	print(f'Comic Book prompt...{comic_scene_prompt}')
	# Set up our initial generation parameters.
	answers = stability_api.generate(
			prompt=f'{comic_scene_prompt}',
			style_preset='comic-book',
			seed=4253978046,
			steps=50,
			cfg_scale=7.0,
			width=1024, # Generation width, defaults to 512 if not included.
			height=1024, # Generation height, defaults to 512 if not included.
			samples=1, # Number of images to generate, defaults to 1 if not included.
	)

	for resp in answers:
			print(f'We generated a response...')
			for artifact in resp.artifacts:
					if artifact.finish_reason == generation.FILTER:
							warnings.warn(
									"Your request activated the API's safety filters and could not be processed."
									"Please modify the prompt and try again.")
					if artifact.type == generation.ARTIFACT_IMAGE:
							img = Image.open(io.BytesIO(artifact.binary))
							img.save(get_image_path(request_unique_id, scene_num)) # Save our generated images with their seed number as the filename. 

def generate_all_comic_scenes(comic_strip_response, request_unique_id):
		threads = []

		for scene_num, description in enumerate(comic_strip_response):
				print(scene_num)
				thread = threading.Thread(target=generate_comic_strip_for_single_prompt, 
					args=(description,scene_num, request_unique_id))
				threads.append(thread)
				thread.start()

		for thread in threads:
				thread.join()
		return [COMIC_IMAGES_BASE_DIR+get_image_path(request_unique_id, scene_num) for scene_num in range(len(comic_strip_response))]


@app.route('/', methods=['GET'])
def root_endpoint():
    return jsonify(
        {
            "message": "Welcome to the Comic Generator API!",
            "endpoints": {
                "post_comic": "/api/generate-comic-strip"
            }
        }), 200

@app.route('/server/<image_id>_<int:image_number>.png', methods=['GET'])
def serve_image(image_id, image_number):
    # Constructing the image path using the relative directory
    relative_path = f"../../server/{image_id}_{image_number}.png"
    # Converting the relative path to an absolute path
    image_path = os.path.abspath(os.path.join(os.getcwd(), relative_path))
    return send_file(image_path, mimetype='image/png')

@app.route('/api/generate-comic-strip', methods=['POST'])
def post_endpoint():
	request_unique_id = str(uuid.uuid4())
	data = request.get_json()
	if not data:
		return jsonify({"message": "No input data provided"}), 400
	if 'content' not in data:
		return jsonify({"message": "Missing news content"}), 400

	comic_strip = generate_comic_strip(data['content'])
	comic_strip_response = parse_comic_string_response(comic_strip)

	image_paths = generate_all_comic_scenes(comic_strip_response, request_unique_id)

	return jsonify(
		{
			"comicStrip": comic_strip_response,
			"imagePaths": image_paths
		}), 201

if __name__ == "__main__":
	app.run(debug=True)
