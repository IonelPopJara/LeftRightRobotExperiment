#!/bin/bash

# Function to run Pepper's movement script
move_pepper() {
    python2 pepper-move.py 3
}

# Function to publish an MQTT message
publish_mqtt_message() {
  local topic="$1"
  local message="$2"
  mqtt pub -t "$topic" -m "$message" -h 'broker.hivemq.com'
}

# Send MQTT message to start the timer
publish_mqtt_message "kuggen/experiment/robots/timer" "Start Timer"

# Execute the python script that will move Pepper
move_pepper

# Check if the script was executed successfully
if [ $? -eq 0 ]; then
  echo "Pepper moved successfully."

  # Wait for the action to complete (you may need to adjust this sleep time based on how long the action takes)
  sleep 1

  # Publishing MQTT message to display the question
  publish_mqtt_message "kuggen/experiment/robots/question" "Display Question"
else
  echo "Failed to move Pepper."
fi