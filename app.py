from flask import Flask, jsonify, render_template
import csv, os
import json
import plotly
import plotly.express as px
# import pandas as pd

app = Flask(__name__)

def load_data():
    with open("samples.json") as file:
        data = json.load(file)
    return data

def create_plot_express():
    data = load_data()
    fig = px.bar(
        x=[d["sample_values"] for d in data],
        y=[d["otu_ids"] for d in data]
    )

    return json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

    # serialize the data for plot
    # data = json.dumps(plot_data, cls=plotly.utils.PlotlyJSONEncoder)
    # layout = json.dumps(plot_layout, cls=plotly.utils.PlotlyJSONEncoder)

    # return data, layout

@app.route("/")
def home():
    fig = create_plot_express()
    return render_template("index.html", fig=fig)

# @app.route("/data")
# def data():


if __name__ == "__main__":
    app.run(debug=True)