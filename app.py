from flask import Flask, jsonify, render_template
from flask_cors import CORS
import os, json

app = Flask(__name__)
CORS(app)

console.log("Good morning, World!")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/data")
def data():
    with open(os.path.join("samples.json")) as file:
        data = json.load(file)
    return data

console.log("Good night, World!")

if __name__ == "__main__":
    app.run(debug=True)