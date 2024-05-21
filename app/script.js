const topicTimer = 'kuggen/experiment/robots/timer';
const topicQuestion = 'kuggen/experiment/robots/question';

let timeInterval;
let startTime;
let participantId;
let trialNumber = 0;

function showWelcomePage() {
    // console.log('showWelcomePage');
    stopTimer();

    document.getElementById('welcome').style.display = 'block';
    document.getElementById('waiting').style.display = 'none';
    document.getElementById('back-button').style.display = 'none';

    // For debugging
    // document.getElementById('timer').style.display = 'none';

    document.getElementById('question').style.display = 'none';
    localStorage.removeItem('participantId');
    clearInterval(timeInterval);
}

function startExperiment() {
    // console.log('startExperiment');
    participantId = document.getElementById('participant-id').value;

    // TODO: Maybe add more checks depending on how the participant ID is generated
    if (participantId.trim() !== '' && !isNaN(participantId)) {
        console.log(`Start Experiment for participant: ${participantId}`);

        localStorage.setItem('participantId', participantId);
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('waiting').style.display = 'block';
        document.getElementById('back-button').style.display = 'block';

        // For debugging
        // document.getElementById('timer').style.display = 'block';

        connectToMQTT();
    } else {
        alert('Please enter a valid participant ID');
    }
}

function getTrialNumber() {
    fetch(`http://localhost:5000/get_trial_number?participant_id=${participantId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            trialNumber = Number(data.trial);
            trialNumber += 1;
            console.log('Trial Number:', trialNumber);
        }).catch((error) => {
            console.error('Error:', error);
        });
}

function startTimer() {
    // Get trial number from the server
    getTrialNumber();

    startTime = Date.now();
    const originalText = "Waiting for the next question";

    timeInterval = setInterval(() => {

        let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        if (elapsedTime % 4 === 0) {
            document.getElementById('waiting-text').innerText = originalText;
        }
        else {
            let stream = document.getElementById('waiting-text').innerText;
            stream += '.';
            document.getElementById('waiting-text').innerText = stream;
        }

        // For debugging
        // const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        // document.getElementById('timer-text').innerText = `Timer: ${elapsedTime}s`;
        // console.log(`Timer: ${elapsedTime}s`);
    }, 1000);
}

function stopTimer() {
    clearInterval(timeInterval);
}

function connectToMQTT() {
    // console.log('connectToMQTT');
    const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe(topicTimer);
        client.subscribe(topicQuestion);
    });

    client.on('message', (topic, message) => {
        console.log('Message received: ' + message.toString());
        if (topic === topicTimer) {
            if (message.toString() === 'start_timer') {
                startTimer();
            } else if (message.toString() === 'stop_timer') {
                stopTimer();
            }
        } else if (topic === topicQuestion) {
            displayQuestion(message.toString());
        }
    });

    client.on('error', (error) => {
        console.log('Error: ' + error);
        process.exit(1);
    });
}

function displayQuestion(questionTitle) {
    document.getElementById('waiting').style.display = 'none';
    document.getElementById('question').style.display = 'block';

    document.getElementById('question-text').innerText = questionTitle;
}

function submitAnswer(selectedOption) {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);

    console.log(`Participant: ${participantId}, Trial: ${trialNumber}, Answer: ${selectedOption}, Time taken: ${elapsedTime}s`);

    // document.getElementById('question').style.display = 'none';
    // document.getElementById('waiting').style.display = 'block';
    // document.getElementById('timer-text').innerText = 'Timer: 0s';

    stopTimer();

    // TODO: Replace 'localhost' with the server's IP address
    fetch('http://localhost:5000/submit_quiz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            participantId: participantId,
            trial: trialNumber,
            answer: selectedOption,
            timeTaken: elapsedTime
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            document.getElementById('question').style.display = 'none';
            document.getElementById('waiting').style.display = 'block';

            // For debugging
            // document.getElementById('timer-text').innerText = 'Timer: 0s';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

window.onload = function () {
    showWelcomePage();
};