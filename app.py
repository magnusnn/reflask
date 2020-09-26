from flask import Flask, render_template
import datetime

app = Flask(__name__)

@app.route('/', defaults={'u_path': ''})
@app.route('/<path:u_path>')
def index(u_path):
    return render_template("index.html")

@app.route('/time')
def message():
    current_time = datetime.datetime.now()  
    return str(current_time)

if __name__ == "__main__":
    app.run(debug=True)
