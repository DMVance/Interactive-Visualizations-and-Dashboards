from flask import Flask, jsonify, render_template
from flask_cors import CORS
import csv, os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/data")
def data():
    placeholder

if __name__ == "__main__":
    app.run(debug=True)