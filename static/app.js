console.log("Good Morning, World!")

let subjectID = 940
let info = d3.select("#sample-metadata")


function init_build() {
    d3.json("samples.json").then(
        data => {
            populate_charts(data, subjectID)
            let choose_subject = d3.select("#selDataset")
            let names = data.names
            names.forEach((name) => {
                choose_subject.append("option").attr("value", name).text(name)
            })
            return ""
        })
    }

function populate_charts(data, subject_num) {
    let samples = data.samples
        samples.forEach((subject) => {
            if (subject.id === subject_num.toString()) {
                console.log(subject)
                let subject_array = []
                for (var i = 0; i < subject.otu_labels.length; i++) {
                    subject_array.push({
                        "otu_labels": subject.otu_labels[i],
                        "otu_ids": subject.otu_ids[i],
                        "sample_values": subject.sample_values[i],
                    })
                }
                subject_sorted = _.orderBy(subject_array, "sample_values", "desc").slice(0, 10)
                subject_sorted_reverse = _.reverse(subject_sorted)

                let trace1 = {
                    x: subject_sorted_reverse.map(d => d.sample_values),
                    y: subject_sorted_reverse.map(d => d.otu_ids),
                    text: subject_sorted_reverse.map(d => d.otu_labels),
                    hovertemplate: "Species: %{text}",
                    hoverlabel: {namelength: 0},
                    type: "bar",
                    orientation: "h"
                }
                let plotData = [trace1]
                let plotLayout = {
                    title: "Microbial Species Counts",
                    yaxis: {
                        type: "category",
                    }
                }
                Plotly.newPlot("bar", plotData, plotLayout)

                let trace2 = {
                    x: subject_array.map(d => d.otu_ids),
                    y: subject_array.map(d => d.sample_values),
                    mode: "markers",
                    marker: {
                        size: subject_array.map(d => d.sample_values),
                        color: subject_array.map(d => d.otu_ids),
                        cmin: Math.min(...subject_array.map(d => d.otu_ids)),
                        cmax: Math.max(...subject_array.map(d => d.otu_ids)),
                        colorscale: "Viridis",
                    },
                    text: subject_array.map(d => d.otu_labels),
                    hovertemplate: "Species: %{text}",
                    hoverlabel: {namelength: 0},
                }
                let plotData2 = [trace2]
                let plotLayout2 = {
                    title: "Microbial Diversity",
                }
                Plotly.newPlot("bubble", plotData2, plotLayout2)
            }
        })
        let metadata = data.metadata
        metadata.forEach((subject) => {
            if (subject.id === parseInt(subject_num)) {
                console.log(subject)
                info.append("p").text(`ID: ${subject.id}`)
                info.append("p").text(`Ethnicity: ${subject.ethnicity}`)
                info.append("p").text(`Gender: ${subject.gender}`)
                info.append("p").text(`Age: ${subject.age}`)
                info.append("p").text(`Location: ${subject.location.split("/")[0]}, ${subject.location.split("/")[1]}`)
                if (subject.bbtype === "I") {
                    info.append("p").text(`Bellybutton Type: "Innie"`)
                } else if (subject.bbtype === "O") {
                    info.append("p").text(`Bellybutton Type: "Outie"`)
                } else {
                    info.append("p").text(`Bellybutton Type: ${subject.bbtype}`)
                }
                info.append("p").text(`Wash Frequency: ${subject.wfreq}x/week`)

                let plotData3 = [{
                    domain: { x: [0, 1], y: [0, 1] },
                    value: subject.wfreq,
                    title: { text: "Belly Button Washing Frequency (x/wk)" },
                    type: "indicator",
                    mode: "gauge+number+delta",
                    gauge: { 
                        axis: { 
                            range: [null, 10],
                            nticks: 10,
                        },
                        shape: "angular" 
                    },
                }]
                Plotly.newPlot("gauge", plotData3)
            }
        })
    return ""
}

function clear_all() {
    d3.select("#bar").html("")
    d3.select("#bubble").html("")
    d3.select("#sample-metadata").html("")
    d3.select("#gauge").html("")
}

init_build()

d3.select("#selDataset")
    .on("change", function() {
        let choice = d3.select(this).property("value")
        console.log(choice)
        clear_all()
        d3.json("samples.json").then(
        data => {
            populate_charts(data, choice)
        })
    })

console.log("Good Night, World!")
