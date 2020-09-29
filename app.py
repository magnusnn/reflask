from flask import Flask, render_template
from livereload import Server
import datetime

app = Flask(__name__)
app.debug = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/', defaults={'u_path': ''})
@app.route('/<path:u_path>')
def index(u_path):
    return render_template("index.html")

@app.route('/time')
def message():
    current_time = datetime.datetime.now()  
    return str(current_time)

if __name__ == "__main__":
    server = Server(app.wsgi_app)
    server.serve()
