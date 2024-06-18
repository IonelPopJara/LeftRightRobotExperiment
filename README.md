# Experiment App

A simple web application that will be used in conjunction with the kuggen bots - Pepper, and Turtlebot -  to display questionnaires to the users.

## Preparations

To run this project, you will need the following:
- Python 3
- Node.js

To check if you have them installed you can run these commands and check if your output is similar:

```bash
$ python3 --version

# OUTPUT
Python 3.10.12
```

```bash
$ node --version

# OUTPUT
v16.20.2
```

Once you have checked the installation of both Python and Node.js, you need to install the following dependencies:

### Python
- flask
- flask_cors

You can install these dependencies by running the following command in your workspace environment:

```bash
pip3 install flask flask_cors
```

### Node.js
- MQTT.js installed globally with npm

You can install it by running:

```bash
npm install -g mqtt
```

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

## Overview

The frontend of the application is written in plain `HTML`, `CSS`, and `JavaScript`. The app communicates with a server written in `Python` using `Flask`. This server is responsible for writing the experiment data to a `csv` file to be analyzed later. The system also makes use of MQTT for the communication between the robots and the frontend.

### CSV Format

```bash
ID,Trial,Question,Answer,Time
```

### MQTT Topics

```bash
# A message with  this topic will start the experiment timer
kuggen/experiment/robots/timer
```

```bash
# A message with  this topic will display the question sent in the payload
kuggen/experiment/robots/question
```

## About the Application

When a user starts the experiment, the `Welcome Page` will be displayed and the user will be prompted to enter their participant `ID`, which will be stored in the local storage. Once the user enters their participant `ID`, they will be taken to the `Waiting For Question Page`. If the user closes the browser, the participant-id will be lost and the user will have to enter it again. At any time, there will be a button on the top right corner of the page that will take the user back to the `Welcome Page`, this will start a new experiment with a different participant `ID`.

On the `Waiting For Question Page`, the user will be waiting for the question and choices to be displayed. The robot will send a first MQTT message once it starts moving and playing the sound that will trigger the timer. Once the robot stops, it will send a second MQTT message that will trigger the question and choices to be displayed. The user will then select one of the answers, which will cause application to stop the timer and the sound being played, and send the answer to the server in the form of a request. The server - Flask - will then save the answer to a CSV file. Show the `Waiting For Question Page`, and the process will repeat until the user has answered all the questions.

### Technologies

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Python3](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [MQTT](https://mqtt.org/)

## Robots Integration

The robots used for this experiment are [TurleBot 4](https://turtlebot.github.io/turtlebot4-user-manual/setup/basic.html) and [Pepper](http://doc.aldebaran.com/2-4/family/pepper_user_guide/first_conf_pep.html). You can follow [Pepper's](./setup-guides/pepper-setup.md) and [TurtleBot's](./setup-guides/turtlebot4-setup.md) guides to set them up.

It is important to notice that virtually any robot should be able to interact with the application as long as MQTT can be implemented.

Currently, in the [scripts folder](/scripts/) you will find two shell scripts: [turtlebot.sh](/scripts/turtlebot.sh) and [pepper.sh](/scripts/pepper.sh). These scripts are in charge of sending the respective commands to the robots to move forward, and communicating with the main application via MQTT. There is a third script called [pepper-move.py](/scripts/pepper-move.py). This script is called inside `pepper.sh` and it uses the SDK to move Pepper.

To run the scripts you can use the following commands:

```bash
cd setup-guides # If you are not already in this directory

# The chmod command only needs to be done once
sudo chmod +x turtlebot.sh # Make the TurtleBot script executable
sudo chmod +x pepper.sh # Make the Pepper script executable

# Choose which one you want to execute
./turtlebot.sh
./pepper.sh
```
