import { trackEvents } from './scores.js';

window.onload = function() {
    const eventSelect = document.getElementById('eventSelect');
    eventSelect.addEventListener('change', function() {
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
            name: 'Points vs Score',
            type: 'scatter'
        };

        const highScorePoint = {
            x: [event.highScore],
            y: [Math.round(event.A * Math.pow((event.isTimed ? event.B - event.highScore : event.highScore - event.B), event.C))],
            mode: 'markers',
            name: 'High Score',
            marker: { color: 'red' }
        };

        const data = [trace, highScorePoint];

        const layout = {
            title: 'Points vs Score',
            xaxis: {
                title: 'Score',
                autorange: event.isTimed ? 'reversed' : 'normal'
            },
            yaxis: {
                title: 'Points'
            }
        };

        Plotly.newPlot('plot', data, layout);
    });

    // Trigger the change event to plot the first event by default
    eventSelect.dispatchEvent(new Event('change'));
}
