#!/bin/bash

# Function to send the ROS 2 action goal
send_ros_action() {
  ros2 action send_goal /undock irobot_create_msgs/action/Undock "{}"
}

# Send the ROS 2 action goal
send_ros_action

# Check if the ROS 2 action goal was successful
if [ $? -eq 0 ]; then
  echo "ROS 2 action goal sent successfully."

  # Wait for the action to complete (you may need to adjust this sleep time based on how long the action takes)
  sleep 1

else
  echo "Failed to send ROS 2 action goal."
fi

