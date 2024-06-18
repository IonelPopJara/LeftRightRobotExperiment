# TurtleBot Guide

## Basic Setup

In order to properly set up TurtleBot for personal use, you can follow the [setup guide](https://turtlebot.github.io/turtlebot4-user-manual/overview/).

Here is a quick overview of the steps that need to be followed:

### Installing ROS 2 in the user's PC

The recommended version of ROS 2 is [ROS 2 Humble](https://docs.ros.org/en/humble/index.html). Make sure to install it properly for your respective machine.

### Follow the Basic Setup

The [basic setup](https://turtlebot.github.io/turtlebot4-user-manual/setup/basic.html) includes some short and easy steps that explain how to connect and set up the TurtleBot for the first time.

### Set up Simple Discovery

The TurtleBot can function with two different network configurations: Simple Discovery, and Discovery Server.

By default, simple discovery is selected as the network configuration in a fresh install. However, in order to properly detect the topics published by the TurtleBot, some configurations need to be done to the user's computer. [This guide](https://turtlebot.github.io/turtlebot4-user-manual/setup/simple_discovery.html) explains the necessary setup.

## Important Points and Common Issues

### The passed action type is invalid ros2

```bash
sudo apt install -y ros-humble-irobot-create-msgs
```

### Set the TurtleBot to Access Point before transporting it

If you move the TurtleBot to a new location without setting it to [Access Point Mode](https://turtlebot.github.io/turtlebot4-user-manual/setup/basic.html#access-point-mode), the TurtleBot will not be able to connect to a new wifi.

### The WiFi network that turtlebot was connected no longer exists

If TurtleBot was moved to a different place without being set up as an Access Point or the previous WiFi network has changed, it won't be possible to access the TurtleBot's console over WiFi. In that case, there are 3 choices:

1. Restore the previous WiFi network
2. SSH via an ethernet adapter
    * Note: at the time of writing this guide, I had not been able to make this one work.
3. Reflash the Raspberry PI
    * Note: This will delete every configuration and the set-up process will have to be done again.

### Connecting to an already set up TurtleBot

If you are trying to connect to a TurtleBot that has already been set up. and thus, it does not appear as an Access Point as the `Basic Setup` suggested. You can log in into it by looking up the IP address in the LCD display and SSH'ing into it.

In Unix operating systems, you can run the following command where XX... depicts the IP address that appears in the LCD screen.

```bash
$ ssh ubuntu@XX.XX.XX.XX
```

### Can't SSH into the TurtleBot

#### No IP address displayed in the LCD screen

If the LCD screen is not showing any IP address to ssh to, there are 2 options.

**The LCD screen is not working properly**

This issue occurs from time to time. In order to check if this is the case, you need to log in into your router configuration page and check the list of connected devices. TurtleBot's device name should be something similar to `ubuntu`. If the device appears, try ssh'ing into that IP address.

**The WiFi network that turtlebot was connected no longer exists**

If this is the case, you can read the [previous poinnt](#the-wifi-network-that-turtlebot-was-connected-no-longer-exists).

If everything else fails, you can always [re-flash the SD card](https://turtlebot.github.io/turtlebot4-user-manual/setup/basic.html#install-latest-raspberry-pi-image) and start from scratch.

### Outdated TurtleBot Operating System

If you posses an older versions of TurtleBot 4, it probably has `ROS 2 Galactic` which has reached its EOL (end-of-life) and is no longer supported. Therefore, it is recommended to [re-flash the SD card](https://turtlebot.github.io/turtlebot4-user-manual/setup/basic.html#install-latest-raspberry-pi-image) that contains TurtleBot's operating system to a newer image. You can check the current version of the operating system by entering in the [Create 3 Webserver](https://turtlebot.github.io/turtlebot4-user-manual/setup/basic.html#accessing-the-create-3-webserver). The first letter of the version shows the current `ROS` installed. For example, version H.1.0 means that the TurtleBot has `ROS 2 Humble` installed, while G.1.0 would mean that `ROS 2 Galactic` is installed
