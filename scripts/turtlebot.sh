#!/bin/bash

# Function to send the ROS 2 action goal
send_ros_action() {
  ros2 action send_goal /drive_distance irobot_create_msgs/action/DriveDistance "{distance: 3, max_translation_speed: 0.3}"
}

# Function to publish an MQTT message
publish_mqtt_message() {
  local topic="$1"
  local message="$2"
  mqtt pub -t "$topic" -m "$message" -h 'broker.hivemq.com'
}

# Send MQTT message to start the timer
publis_mqtt_message "kuggen/experiment/robots/timer" "Start Timer"

# Send the ROS 2 action goal
send_ros_action

# Check if the ROS 2 action goal was successful
if [ $? -eq 0 ]; then
  echo "ROS 2 action goal sent successfully."

  # Wait for the action to complete (you may need to adjust this sleep time based on how long the action takes)
  sleep 1

  # Publishing MQTT message to display the question
  publish_mqtt_message "kuggen/experiment/robots/question" "Display Question"
else
  echo "Failed to send ROS 2 action goal."
fi
