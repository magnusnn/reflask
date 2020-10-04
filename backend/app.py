from flask import Flask, request, render_template
from livereload import Server
import datetime
import os
from werkzeug.utils import secure_filename

import PIL
import numpy as np
from tensorflow.keras.applications.imagenet_utils import preprocess_input, decode_predictions
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50

model = ResNet50(weights='imagenet')

def classifyImage(path, model):
    original = image.load_img(path, target_size=(224, 224))
    numpy_image = image.img_to_array(original)
    image_batch = np.expand_dims(numpy_image, axis=0)

    processed_image = preprocess_input(image_batch, mode='caffe')
    preds = model.predict(processed_image)
    
    return preds

app = Flask(__name__)
app.debug = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

# Disable caching
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route('/', defaults={'u_path': ''})
@app.route('/<path:u_path>')
def index(u_path):
    return render_template("index.html")

@app.route('/time')
def message():
    current_time = datetime.datetime.now()  
    return str(current_time)

@app.route('/classify', methods=['GET', 'POST'])
def classify():
    if request.method == 'POST':
        file = request.files['image']

        baseFilePath = os.path.dirname(__file__)
        savedFilePath = os.path.join(baseFilePath, 'uploads', secure_filename(file.filename))
        file.save(savedFilePath)

        preds = classifyImage(savedFilePath, model)
        prediction = decode_predictions(preds, top=1)
        result = str(prediction[0][0][1])
        
        print("Model sees: " + result)
        
        return result
    return None

if __name__ == "__main__":
    server = Server(app.wsgi_app)
    server.watch('/static/dist/*.js')
    server.watch('/templates/index.html')
    server.serve()
