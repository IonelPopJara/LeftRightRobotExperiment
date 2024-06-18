# Pepper Guide

If pepper has not been set up before, you can follow [this guide](http://doc.aldebaran.com/2-4/family/pepper_user_guide/first_conf_pep.html).

If that is not the case, you can just turn pepper on. If after turning Pepper on and pressing the button in its center it says "I can't connect the internet", you can use an ethernet cable to connect Pepper to the internet and set up a new WiFi network.

To do this, your first need to take out the pins located in Pepper's back compartment. Then, you can insert the pins in the pin holes located on top of Pepper's head to open the ethernet hatch.

Once you connect the ethernet cable, you can press Pepper's center button again to listen for the current IP address. Put that IP address into a browser and log in with your credentials to set-up Pepper.

## Setup Python SDK

### Setup Python 2.7

This SDK requires the use of Python 2.7. On Ubuntu, you can install python 2.7 by running:

```bash
sudo apt-get install python2
```

Alternatively, you can make use of virtual environments to control the version of Python you are using.

### Install Python SDK

You can download the Python SDK from [here](https://www.aldebaran.com/fr/support/nao-6/downloads-softwares).

### Linux
Extract the folder and move it to the desired location by running the following command:

```bash
mv pynaoqi-python2.7-2.8.6.23-linux64-20191127_152327.tar.gz pynaoqi # Rename the file to pynaoqi
mv pynaoqi /path-to-installation # Move the compressed file to the desired location
cd /path-to-installation # Move to the desired location
tar -xvzf pynaoqi # Extract the compressed file
```

Then you can add the path to the Python SDK to your `PYTHONPATH` environment variable by doing the following:

```bash
export PYTHONPATH=${PYTHONPATH}:/path-to-installation/pynaoqi/lib/python2.7/site-packages
```

Alternatively, if you don't want to export the path every time you open a new terminal, you can add the path to your `.bashrc` (or another terminal configuration) file.

```bash
echo 'export PYTHONPATH=${PYTHONPATH}:/path-to-installation/pynaoqi/lib/python2.7/site-packages' >> ~/.bashrc
```

Now you should be able to run python2 by doing:
```bash
python2
```

To check if the SDK is installed successfully, you can run the following command inside python2:

```bash
import naoqi
```

If no errors are thrown, the SDK is installed correctly.
