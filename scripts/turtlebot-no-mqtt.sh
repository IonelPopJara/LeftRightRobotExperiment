#!/bin/bash

# Default distance (in meters) if no command-line argument is provided
DEFAULT_DISTANCE=1.0

# Function to send the ROS 2 action goal
send_ros_action() {
  # Check if a distance argument is provided
  if [ ! -z "$1" ]; then
    distance=$1
  else
    distance=$DEFAULT_DISTANCE
  fi

  ros2 action send_goal /drive_distance irobot_create_msgs/action/DriveDistance "{distance: $distance, max_translation_speed: 0.3}"
}

# Send the ROS 2 action goal
send_ros_action "$1"

# Check if the ROS 2 action goal was successful
if [ $? -eq 0 ]; then
  echo "ROS 2 action goal sent successfully."

  # Wait for the action to complete (you may need to adjust this sleep time based on how long the action takes)
  sleep 1

else
  echo "Failed to send ROS 2 action goal."
fi

