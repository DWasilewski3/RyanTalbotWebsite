//Keep jumps and pole vault in cm fo rpoint calculations
var trackEvents = [
    {title: '100m', A: 25.4347, B: 18, C: 1.81, isTimed: true, day1: true, highScore: 10.6, points: 952, worldRecord: 9.58, WRpoints: 1202, step: 0.1},
    {title: 'Long Jump', A: 0.14354, B: 220, C: 1.4, isTimed: false, day1: true, highScore: 706, points: 788, worldRecord: 8.95, WRpoints: 1312, step: 0.2},
    {title: 'Shot Put', A: 51.39, B: 1.5, C: 1.05, isTimed: false, day1: true, highScore: 15.14, points: 798, worldRecord: 23.56, WRpoints: 1323, step: 0.5},
    {title: 'High Jump', A: 0.8465, B: 75, C: 1.42, isTimed: false, day1: true, highScore: 191, points: 723, worldRecord: 2.45, WRpoints: 1244, step: 0.03},
    {title: '400m', A: 1.53775, B: 82, C: 1.81, isTimed: true, day1: true, highScore: 47.52, points: 933, worldRecord: 43.03, WRpoints: 1164, step: 0.5},
    {title: '110m Hurdles', A: 5.74352, B: 28.5, C: 1.92, isTimed: true, day1: false, highScore: 14.74, points: 885, worldRecord: 12.80, WRpoints: 1135, step: 0.1},
    {title: 'Discus', A: 12.91, B: 4, C: 1.1, isTimed: false, day1: false, highScore: 50.90, points: 884, worldRecord: 74.08, WRpoints: 1383, step: 1},
    {title: 'Pole Vault', A: 0.2797, B: 100, C: 1.35, isTimed: false, day1: false, highScore: 520, points: 972, worldRecord: 6.23, WRpoints: 1308, step: 0.1},
    {title: 'Javelin', A: 10.14, B: 7, C: 1.08, isTimed: false, day1: false, highScore: 58.18, points: 710, worldRecord: 98.48, WRpoints: 1331, step: 1},
    {title: '1500m', A: 0.03768, B: 480, C: 1.85, isTimed: true, day1: false, highScore: 273.51, points: 676, worldRecord: 206.00, WRpoints: 1218, step: 1},
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


        var sessionStart = Date.now(); // Initialize sessionStart when the user loads the website

        var events = [
            {title: '11/23', description: 'Ryan placed 3rd at the Pan-American Games hosted in Chile. This was his first competition representing the United States of America', symbol: 'fas fa-medal', date: 2023, color: '#cd7f32', image: 'src/images/timeline/panam-tv.png'},
            {title: '5/22', description: 'Ryan won the decathlon event at the Big Ten conference championship and set a new Michigan State University decathlon record of 8064', symbol: 'fas fa-medal', date: 2022, color: 'gold', image: 'src/images/timeline/big-ten-first-place.png'},
            {title: '2/19', description: 'Ryan broke his own pole vault record for the last time in high school and won the indoor state meet with a height of 16ft 0in. This record still remains unbroken today', symbol: 'fas fa-medal', date: 2019, color: 'gold', image: 'src/images/timeline/hs-pr.png'},
            {title: '12/18', description: 'Ryan committed to the Michigan State University track and field team', symbol: 'fas fa-graduation-cap', date: 2018, color: 'darkgreen', image: 'src/images/timeline/commitment.png'},
            {title: '4/16', description: 'Ryan set the Forest Hils Central High School record for pole vault at 13ft 2in', symbol: 'fas fa-walking', date: 2016, color: 'green', image: 'src/images/timeline/hs-outdoor-pr.png'},
            {title: '5/24', description: 'Ryan won his second gold medal in the outdoor decathlon as a capstone to the 2024 regular season. Two weeks later he placed 8th at the US Olympic Trials', symbol: 'fas fa-medal', date: 2024, color: 'gold', image: 'src/images/timeline/B1G-High-Jump.png'},
            {title: '1/25', description: 'Ryan Started his official coaching career at Grand Valley State University as an assistant coach for High Jump, Long Jump, Heptathlon, and Decathlon.', symbol: 'fas fa-anchor', date: 2025, color: 'blue', image: 'src/images/timeline/gvsu-coaching.jpg'},
        ];
        var currentYear = new Date().getFullYear();
        var currentTimelineIndex = 0;

        function updateContent(image, description) {
            document.getElementById('image').src = image;
            document.getElementById('text').innerText = description;
        }

        function addEvent(event) {
            var timeline = document.getElementById('timeline');
            var eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.style.right = ((currentYear - event.date) / (currentYear - 2015) * 100) + '%';
            eventElement.innerHTML = '<i class="' + event.symbol + '" style="color: ' + event.color + '; font-size: 30px; cursor: pointer;" onclick="updateContent(\'' + event.image + '\', \'' + event.description + '\')"></i><p>' + event.title + '</p>';
            timeline.appendChild(eventElement);
        }

        function autoUpdateTimeline() {
            updateContent(events[currentTimelineIndex].image, events[currentTimelineIndex].description);
            currentTimelineIndex = (currentTimelineIndex + 1) % events.length; // Move to the next event, loop back to the first event after the last one
        }

        function showSubpage(pageId) {
            var subpages = document.getElementsByClassName('subpage');
            for (var i = 0; i < subpages.length; i++) {
                subpages[i].classList.remove('active');
            }
            document.getElementById(pageId).classList.add('active');

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth' 
              });

            var buttons = document.getElementsByTagName('button');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('selected');
            }
            document.querySelector(`button[onclick="showSubpage('${pageId}')"]`).classList.add('selected');
            if(pageId === 'Decathlon'){
                createEventRows();
                setSameHeight();
            }
        }

        function calculateTrackEventScore(score, event) {
            return event.isTimed ? Math.round(event.A * Math.pow((event.B - score), event.C)) : Math.round(event.A * Math.pow((score - event.B), event.C));
        }

        var trackEventsElement = document.getElementById('events');
        function addTrackEvent(trackEvent, index) {
            var trackEventElement = document.createElement('li');
            trackEventElement.className = "no-bullet";
            trackEventElement.id = 'trackEvent-' + index;
            trackEventElement.textContent = '';
            trackEventsElement.appendChild(trackEventElement);
        }

        var sortedTrackEvents = trackEvents.slice().sort((a, b) => a.highScore - b.highScore);
        var timedEvents = sortedTrackEvents.filter(event => event.isTimed);
        var addedEvents = [];
        var combinedHighScore = 999;
        var combined = true;
        function updateTimerAndTrackEvents() {

            // Update timer 
            var timerElement = document.getElementById('session-length');
            var textbox = document.getElementById('events');
            var sessionLength = Math.floor((Date.now() - sessionStart) / 1000);
            var seconds = sessionLength % 60;
            var minutes = Math.floor(sessionLength / 60);

            timerElement.textContent = String('You\'ve been here for ' + (minutes > 0 ? minutes + ' minute' + (minutes > 1 ? 's ' : ' ') + (seconds > 0 ? ' and ' + seconds + ' seconds' : '') : seconds + ' second' + (seconds  > 1 ? 's' : '')));

            // Check track events
            timedEvents.forEach((event, index) => {

                // Check event condition
                if (sessionLength > event.highScore && !addedEvents.includes(event)) {
                    var eventListStr = '';
                    addedEvents.push(event);
                    combinedHighScore = addedEvents.reduce((total, currentEvent) => total + currentEvent.highScore, 0);
                    combined = false;

                    if (addedEvents.length === 1) eventListStr = addedEvents[0].title;
                    else if (addedEvents.length === 2) eventListStr = addedEvents.map(e => e.title).join(' and ');
                    else eventListStr = addedEvents.slice(0, -1).map(e => e.title).join(', ') + ', and ' + addedEvents.slice(-1)[0].title;

                    textbox.textContent = 'You have been on this site longer than it takes Ryan to run the ' + eventListStr;
                } 
                if (sessionLength > combinedHighScore && addedEvents.length > 1 && !combined) {
                    document.getElementById('events').textContent += ' combined';
                    combined = true;
                }
            });
        }

        function timeToSeconds(timeString) {
            var parts = timeString.split(/[:.]/);
            var minutes = parseInt(parts[0], 10);
            var seconds = parseInt(parts[1], 10);
            var milliseconds = parts[2] ? parseInt(parts[2], 10) : 0;
        
            return minutes * 60 + seconds + milliseconds / 1000;
        }
    
        // Function to update points and units for an event
        function updateEventPoints(index) {
            var scoreInput = document.getElementById('deacthlon-score-' + index);
            var score = index ===  9 ? timeToSeconds(scoreInput.value) : parseFloat(scoreInput.value);
            var event = trackEvents[index];
            updateUnits(index, score); // Update units based on score
            if(score < 100 && (index === 1 || index === 3 || index === 7)) score *= 100; //convert m to cm for jumps
            var points = calculateTrackEventScore(score, event);
            var pointsElement = document.getElementById('deacthlon-points-' + index);
            pointsElement.textContent = Math.floor(points); // Display rounded points
            updateTotalScore(); // Update the total score after changing points
            drawLines(scoreInput, points, trackEvents[index].points, trackEvents[index].WRpoints);
        }
    
        // Function to update units based on score
        function updateUnits(index, score) {
            var unitsElement = document.getElementById('deacthlon-units-' + index);
            var event = trackEvents[index];
            if (!event.isTimed) {
                unitsElement.textContent = score < 100 ? 'Meters' : 'Centimeters';
            }
        }
    
        // Function to calculate and update the total score
        function updateTotalScore() {
            var totalScore = 0;
            trackEvents.forEach(function(event, index) {
            // Get the actual number value of the points
            var points = document.getElementById('deacthlon-points-' + index).textContent;
            var numericPoints = parseFloat(points);
            totalScore += numericPoints;
            });
            scoreText = document.getElementById('deacthlon-total-score');
            scoreText.textContent = totalScore;
            drawLines(scoreText, totalScore, 8321, 9126);
        }
    
        // Function to create event rows
        function createEventRows() {
            var eventsContainer = document.getElementById('deacthlon-events-container');
            trackEvents.forEach(function(event, index) {
            var eventRow = document.createElement('div');
            eventRow.classList.add('deacthlon-event-row');
            if (event.title === '1500m'){
                var initialUnitsText = 'Min:Sec';
                eventRow.innerHTML = `
                <div class="deacthlon-event-title">${event.title}</div>
                <input type="text" class="deacthlon-input" id="deacthlon-score-${index}" oninput=updateEventPoints(${index}); pattern = "\\d+(:\\d{2}(:\\d{2}|\\.\\d{2})?|\\.\\d{2}(\\.\\d{2})?)?" placeholder="Score">
                <div class="deacthlon-event-units" id="deacthlon-units-${index}">${initialUnitsText}</div>
                <div class="deacthlon-event-points" id="deacthlon-points-${index}">${event.points}</div>
                `;
            } else {
                var initialUnitsText = event.isTimed ? 'Seconds' : 'm or cm'; // Set initial units text based on isTimed
                eventRow.innerHTML = `
                <div class="deacthlon-event-title">${event.title}</div>
                <input type="text" class="deacthlon-input" id="deacthlon-score-${index}" oninput=updateEventPoints(${index}); pattern="\\d+(\\.\\d*)?" placeholder="Score">
                <div class="deacthlon-event-units" id="deacthlon-units-${index}">${initialUnitsText}</div>
                <div class="deacthlon-event-points" id="deacthlon-points-${index}">${event.points}</div>
                `;
            }
            eventsContainer.appendChild(eventRow);
            });
        }

        function setSameHeight() {
            var leftColumn = document.getElementById('deacthlon-events-container');
            var otherDiv = document.getElementById('deacthlon-visual-container');
            var leftColumnHeight = leftColumn.offsetHeight; // Get the height of the left-column div
            otherDiv.style.height = leftColumnHeight + 'px'; // Set the height of the other div to match
        }
        
        function getUserScore(eventIndex) {
            var scoreInput = document.getElementById('deacthlon-score-' + eventIndex);
            return parseFloat(scoreInput.value); 
        }

        function drawLines(inputElement, value1, value2, value3) {
        // 'inputElement' is the HTML element of the input box

        // Get the bounding rectangle of the input element
        const rect = inputElement.getBoundingClientRect();

        // Use the top property of the bounding rectangle as the height
        // Add window.scrollY to account for any scrolling
        const inputHeight = rect.top + window.scrollY;

        // Find the maximum score to set the longest line's length
        const maxScore = Math.max(value1, value2, value3);

        // Calculate the relative lengths of the lines
        const length1 = (value1 / maxScore) * 100;
        const length2 = (value2 / maxScore) * 100;
        const length3 = (value3 / maxScore) * 100;

        // Get the container where the lines will be drawn
        const visualization = document.getElementById('deacthlon-visual-container');

        // Create a container for the lines at the specified height
        const lineContainer = document.createElement('div');
        lineContainer.style.position = 'absolute';
        lineContainer.style.top = inputHeight + 'px'; // Set the top position to the input box's height
        lineContainer.style.width = '80%'; // Set the width to half of the screen
        lineContainer.style.left = '10%' //padding
        lineContainer.style.height = '20px'; // Height of the line

        // Function to create a line with gradient and hover effect
        function createLine(length, color) {
            const line = document.createElement('div');
            line.style.width = length + '%';
            line.style.height = '100%';
            line.style.backgroundColor = color;
            line.style.position = 'absolute';
            line.style.borderRadius = '10px'; // Rounded edges
            line.style.backgroundImage = 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.5))'; // Gradient effect

            // Create a span element for the score value
            const scoreValue = document.createElement('span');
            scoreValue.textContent = length.toFixed(1) + '%'; // Display the percentage value
            scoreValue.style.position = 'absolute';
            scoreValue.style.left = '100%'; 
            scoreValue.style.marginLeft = '5px';
            scoreValue.style.visibility = 'hidden'; // Hide by default
            line.appendChild(scoreValue);

            // Add hover effect to show score value
            line.addEventListener('mouseenter', function() {
            scoreValue.style.visibility = 'visible';
            });
            line.addEventListener('mouseleave', function() {
            scoreValue.style.visibility = 'hidden';
            });

            return line;
        }

        // Create and append lines to the container
        if(length1 >= length2 && length1 >= length3){
            lineContainer.appendChild(createLine(length1, 'red'));
            if(length2 >= length3){
                lineContainer.appendChild(createLine(length2, 'green'));
                lineContainer.appendChild(createLine(length3, 'blue'));
            } else {
                lineContainer.appendChild(createLine(length3, 'blue'));
                lineContainer.appendChild(createLine(length2, 'green'));
            }
        } else if(length2 >= length1 && length2 >= length3){
            lineContainer.appendChild(createLine(length2, 'green'));
            if (length1 >= length3){
                lineContainer.appendChild(createLine(length1, 'red'));
                lineContainer.appendChild(createLine(length3, 'blue'));
            } else {
                lineContainer.appendChild(createLine(length3, 'blue'));
                lineContainer.appendChild(createLine(length1, 'red'));
            }
        } else {
            lineContainer.appendChild(createLine(length3, 'blue'));
            if(length1 >= length2){
                lineContainer.appendChild(createLine(length1, 'red'));
                lineContainer.appendChild(createLine(length2, 'green'));
            } else {
                lineContainer.appendChild(createLine(length2, 'green'));
                lineContainer.appendChild(createLine(length1, 'red'));
            }
        }

        // Append the container to the visualization area
        visualization.appendChild(lineContainer);
        }

        function autoExpand(element) {
            element.style.height = 'inherit';
            var computed = window.getComputedStyle(element);
            var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                         + parseInt(computed.getPropertyValue('padding-top'), 10)
                         + element.scrollHeight
                         + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                         + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

            element.style.height = height + 'px';
        };

        function animateHighScores(highScore, element) {
            let startTimestamp = null;
            const duration = 3000; // Duration in milliseconds
          
            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              element.textContent = (progress * highScore).toFixed(2);
              if (progress >= 1) {
                element.textContent = trackEvents[element.getAttribute('data-index')].text;
              } else {
                window.requestAnimationFrame(step);
              }
            };
          
            window.requestAnimationFrame(step);
          }
          
          // Intersection Observer to trigger the animation
          const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const element = entry.target;
                const index = element.getAttribute('data-index');
                animateHighScores(trackEvents[index].highScore, element);
                observer.unobserve(element); // Stop observing after animation
              }
            });
          }, { threshold: 0.5 }); // Trigger when 50% of the element is visible
          
          // Set up the observer for each highscore element
          document.addEventListener('DOMContentLoaded', () => {
            const statisticsSection = document.querySelector('.statistics-section');
            trackEvents.forEach((event, index) => {
              const trackEventElement = document.createElement('div');
              trackEventElement.classList.add('track-event');
              trackEventElement.innerHTML = `
                <h3>${event.title}</h3>
                <div id="highScore-${index}" class="highScore-animate" data-index="${index}">0</div>
              `;
              statisticsSection.appendChild(trackEventElement);
              observer.observe(document.getElementById(`highScore-${index}`));
            });
          });
          
        autoUpdateTimeline();
        setInterval(autoUpdateTimeline, 10000);
        events.forEach(addEvent);
        timedEvents.forEach(addTrackEvent);
        setInterval(updateTimerAndTrackEvents, 1000);
        updateContent(events[events.length - 1].image, events[events.length - 1].description);
        document.getElementById('currentYear').innerText = currentYear;