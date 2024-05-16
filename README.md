# Experiment App

A simple web application that will be used in conjunction with the kuggen bots to display interactive questionnaires to the users.

## Starting the Application

### Running the Application
```bash
cd app
http-server -p 8000
```

### Running the Server
```bash
cd server
python server.py
```

## Rough Idea

There will be a web application written in plain `HTML`, `CSS`, and `JavaScript`. When a user starts the experiment, the `Welcome Page` will be displayed and the user will be prompted to enter their participant `ID`, which will be stored in the local storage. Once the user enters their participant `ID`, they will be taken to the `Waiting For Question Page`. If the user closes the browser, the participant-id will be lost and the user will have to enter it again. At any time, there will be a button on the top right corner of the page that will take the user back to the `Welcome Page`, this will start a new experiment with a different participant `ID`.

On the `Waiting For Question Page`, the user will be waiting for the question and choices to be displayed. The robot will send a first MQTT message once it starts moving and playing the sound that will trigger the timer. Once the robot stops, it will send a second MQTT message that will trigger the question and choices to be displayed. The user will then select one of the answers, which will cause application to stop the timer and the sound being played, and send the answer to the server in the form of a request. The server - Flask - will then save the answer to a CSV file. Show the `Waiting For Question Page`, and the process will repeat until the user has answered all the questions.

## CSV Format

ID,Trial,Question,Answer,Time

## Technologies

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [MQTT](https://mqtt.org/)


## TODO

- [x] Add the trial ID.

- [x] Make a template web application
  - [x] The template has 3 pages
    - [x] Welcome
    - [x] Waiting for question
    - [x] Questionnaire
  - [x] The template communicates through MQTT
    - [x] When the app receives the appropriate message, it displays the questionnaire