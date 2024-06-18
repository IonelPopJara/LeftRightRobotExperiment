#!/bin/bash

# Function to check the dock status
check_dock_status() {
    dock_status=$(timeout 10s ros2 topic echo /dock_status)
    is_docked=$(echo "$dock_status" | grep "is_docked" | tail -1 | awk '{print $2}')
    echo "$is_docked"
}

check_dock_status

