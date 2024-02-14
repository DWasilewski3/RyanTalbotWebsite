import { trackEvents } from './scores.js';

var slider = document.getElementById("slider");
var output = document.getElementById("sliderValue");
var numSteps = 1;
slider.oninput = function() {
    const eventSelect = document.getElementById('eventSelect');
    const i = eventSelect.value;
    const event = trackEvents[i];
    output.innerHTML = "Step = " + Math.round(this.value * event.step * 10) / 10 + (event.isTimed ? " seconds" : " cm");
    numSteps = this.value;
    updatePlot(); 
}

function updatePlot() {
    const eventSelect = document.getElementById('eventSelect');
    const i = eventSelect.value;
    const event = trackEvents[i];
    let scores;
    if (event.isTimed) {
        scores = Array.from({length: 100}, (_, i) => 1.5 * event.highScore - i * event.highScore / 100);
    } else {
        scores = Array.from({length: 100}, (_, i) => i * 1.5 * event.highScore / 100);
    }

    let points = scores.map(score => {
        if (event.isTimed) {
            return Math.round(event.A * Math.pow((event.B - score), event.C));
        } else {
            return Math.round(event.A * Math.pow((score - event.B), event.C));
        }
    });

    const trace = {
        x: scores,
        y: points,
        mode: 'lines',
        name: 'Event Score Slope',
        type: 'scatter'
    };

    const highScorePoint = {
        x: [event.highScore],
        y: [Math.round(event.A * Math.pow((event.isTimed ? event.B - event.highScore : event.highScore - event.B), event.C))],
        mode: 'markers',
        name: 'High Score: ' + event.highScore,
        marker: { color: 'red' }
    };

    const stepScorePoint = {
        x: event.isTimed ? [event.highScore - event.step * numSteps] : [event.highScore + event.step * numSteps],
        y: [Math.round(event.A * Math.pow((event.isTimed ? event.B - (event.highScore - event.step * numSteps) : (event.highScore + event.step * numSteps) - event.B), event.C))],
        mode: 'markers',
        name: 'Step Score: ' + Math.round(100 * (event.isTimed ? [event.highScore - event.step * numSteps] : [event.highScore + event.step * numSteps])) / 100,
        marker: { color: 'green' }
    };

    const data = [trace, highScorePoint, stepScorePoint];

    const layout = {
        title: event.title + " Results",
        xaxis: {
            title: 'Event Result',
            range: event.isTimed ? [0, event.B] : [event.B, 1.5 * event.highScore],
            autorange: event.isTimed ? 'reversed' : 'normal'
        },
        yaxis: {
            title: 'Number of Points'
        }
    };

    Plotly.newPlot('plot', data, layout);
    document.getElementById('score-text').innerText = "High Score Points: " + highScorePoint.y + "\nHigh Score + Step Points: " + stepScorePoint.y + "\nImprovement: " + (stepScorePoint.y - highScorePoint.y) + " = " + (Math.round((stepScorePoint.y - highScorePoint.y)/highScorePoint.y * 10000)/100) + "%";
}

window.onload = function() {
    const eventSelect = document.getElementById('eventSelect');
    eventSelect.addEventListener('change', updatePlot); 

    eventSelect.dispatchEvent(new Event('change'));
}
