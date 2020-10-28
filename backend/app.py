import os
from flask import Flask, request, send_from_directory
from requests import get
from livereload import Server, shell
from classifier import classifyImage
from reverseProxy import proxyRequest
from os import getenv

app = Flask(__name__, static_folder="/static/dist")
app.debug = True

# Get mode from environment variables.
# If no env variable passed in, default to prod.
MODE = getenv("MODE")

DEV_SERVER_URL = "http://localhost:3000"
APP_PORT = 5000

# Disable caching.
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
# Enable template auto reload.
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route("/", defaults={"path": "index.html"})
@app.route("/<path:path>")
def getApp(path):
    if MODE == "development":
        return proxyRequest(DEV_SERVER_URL, request.path)
    return send_from_directory("static/dist", "index.html")

# Classification route.
@app.route('/classify', methods=['GET', 'POST'])
def classify():
    if request.method == 'POST':
        if (request.files['image']): 
            file = request.files['image']
    
            result = classifyImage(file)
            
            print("Model classification: " + result)
            
            return result
    return None

if __name__ == "__main__":
    server = Server(app.wsgi_app)

    # Avoid refresh on new image received.
    server.watch("../uploads/*", ignore=True)

    # Serve app with live reload.
    server.serve(port=APP_PORT)
