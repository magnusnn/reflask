import datetime
import os
from flask import Flask, request, render_template
from livereload import Server, shell
from classifier import classifyImage

app = Flask(__name__)
app.debug = True

# Disable caching and
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
# Enable template auto reload.
app.config['TEMPLATES_AUTO_RELOAD'] = True

# Catchall route.
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
        if (request.files['image']): 
            file = request.files['image']
    
            result = classifyImage(file)
            
            print("Model classification: " + result)
            
            return result
    return None

def printMessage():
    print("Detected change in bundle.js")
    return None

if __name__ == "__main__":
    server = Server(app.wsgi_app)
    
    # Serve app with live reload.
    server.serve(port=5000)
