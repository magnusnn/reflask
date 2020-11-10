import os
import logging
from flask import Flask, request, send_from_directory
from classifier import classifyImage
from reverseProxy import proxyRequest

MODE = os.getenv('FLASK_ENV')
DEV_SERVER_URL = 'http://localhost:3000'

logging.getLogger('werkzeug').disabled = True
app = Flask(__name__, static_folder='static')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    # Route through webpack-dev-server if development mode.
    if MODE == 'development':
        return proxyRequest(DEV_SERVER_URL, request.path)
    if path and os.path.exists(app.static_folder + '/' + path):
       return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/classify', methods=['GET', 'POST'])
def classify():
    if request.method == 'POST':
        if (request.files['image']): 
            file = request.files['image']
    
            result = classifyImage(file)
 
            print('Model classification: ' + result)
            
            return result
    return None
