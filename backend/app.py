import os
from flask import Flask, request, send_from_directory
from livereload import Server
from classifier import classifyImage
from reverseProxy import proxyRequest

app = Flask(__name__, static_folder="static")
app.debug = True

APP_PORT = 5000
MODE = os.getenv("MODE")
DEV_SERVER_URL = "http://localhost:3000"

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
    # Route through webpack-dev-server if development mode.
    if MODE == "development":
        return proxyRequest(DEV_SERVER_URL, request.path)
    if path != "" and os.path.exists(app.static_folder + '/' + path):
       return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

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

    # Avoid hot reload when image is received.
    server.watch("/uploads/*", ignore=True)

    # Serve app with live reload.
    server.serve(port=APP_PORT)
