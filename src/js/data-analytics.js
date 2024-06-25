var trackEvents = [
    {title: '100m', A: 25.4347, B: 18, C: 1.81, isTimed: true, day1: true, highScore: 10.6, points: 952, worldRecord: 10.55, WRpoints: 963, step: 0.1},
    {title: 'Long Jump', A: 0.14354, B: 220, C: 1.4, isTimed: false, day1: true, highScore: 706, points: 788, worldRecord: 7.80, WRpoints: 1010, step: 0.2},
    {title: 'Shot Put', A: 51.39, B: 1.5, C: 1.05, isTimed: false, day1: true, highScore: 15.14, points: 798, worldRecord: 16.00, WRpoints: 851, step: 0.5},
    {title: 'High Jump', A: 0.8465, B: 75, C: 1.42, isTimed: false, day1: true, highScore: 191, points: 723, worldRecord: 2.05, WRpoints: 850, step: 0.03},
    {title: '400m', A: 1.53775, B: 82, C: 1.81, isTimed: true, day1: true, highScore: 47.52, points: 933, worldRecord: 48.42, WRpoints: 889, step: 0.5},
    {title: '110m Hurdles', A: 5.74352, B: 28.5, C: 1.92, isTimed: true, day1: false, highScore: 14.74, points: 885, worldRecord: 13.75, WRpoints: 1007, step: 0.1},
    {title: 'Discus', A: 12.91, B: 4, C: 1.1, isTimed: false, day1: false, highScore: 50.66, points: 884, worldRecord: 50.54, WRpoints: 882, step: 1},
    {title: 'Pole Vault', A: 0.2797, B: 100, C: 1.35, isTimed: false, day1: false, highScore: 520, points: 972, worldRecord: 5.45, WRpoints: 1051, step: 0.1},
    {title: 'Javelin', A: 10.14, B: 7, C: 1.08, isTimed: false, day1: false, highScore: 58.18, points: 710, worldRecord: 71.90, WRpoints: 918, step: 1},
    {title: '1500m', A: 0.03768, B: 480, C: 1.85, isTimed: true, day1: false, highScore: 280.73, points: 676, worldRecord: 276.11, WRpoints: 705, step: 1},
].map(event => {
    if (event.title === '1500m') {
        event.text = Math.floor(event.highScore / 60) + ":" + Math.floor(event.highScore % 60) + ":" + Math.floor((event.highScore % 1) * 100) + " Minutes";
    } else if (event.isTimed) {
        event.text = event.highScore.toFixed(2) + " Seconds";
    } else {
        if (event.title === "Long Jump" || event.title === "High Jump" || event.title === "Pole Vault") event.text = (event.highScore / 100).toFixed(2) + " Meters";
        else event.text = (event.highScore).toFixed(2) + " Meters";
    }
    return event;
});

var slider = document.getElementById("slider");
var output = document.getElementById("sliderValue");
var numSteps = 1;
function handleSliderInput() {
    const eventSelect = document.getElementById('eventSelect');
    const i = eventSelect.value;
    const event = trackEvents[i];
    output.innerHTML = "Step = " + Math.round(slider.value * event.step * 10) / 10 + (event.isTimed ? " seconds" : " cm");
    numSteps = slider.value;
    updatePlot(); 
}
slider.oninput = handleSliderInput;

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
    var scoreFormula = String(event.A +" * ( " + (event.isTimed ? String(event.B) + " - time(seconds)" : "Distance(cm) - " + String(event.B)) + ")^" + String(event.C));
    document.getElementById('score-text').innerText = "High Score Points: " + highScorePoint.y + "\nHigh Score + Step Points: " + stepScorePoint.y + "\nImprovement: " + (stepScorePoint.y - highScorePoint.y) + " = " + (Math.round((stepScorePoint.y - highScorePoint.y)/highScorePoint.y * 10000)/100) + "%" + "\nScore formula for " + event.title + ": " + scoreFormula;
}

window.onload = function() {
    const eventSelect = document.getElementById('eventSelect');
    eventSelect.addEventListener('change', updatePlot); 
    handleSliderInput();
    eventSelect.dispatchEvent(new Event('change'));
}
