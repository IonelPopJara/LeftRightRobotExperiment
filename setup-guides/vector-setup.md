# Vector Guide

**NOTE:** Due to the company shutting down, the official servers are down. This means that the official SDK is not available. To bypass this, a third party server is needed. The most popular one is called [wire-pod](https://github.com/kercre123/wire-pod). However, at the time of writing this guide, I haven't had success with the setup process. It will sometimes work and sometimes won't. If you want to try it, here are the steps that I followed to successfully set up a Vector robot.

[Wire-pod's documentation](https://github.com/kercre123/wire-pod/wiki/Installation), provides all the necessary information to set up the server and the robot. However, I decided to write this guide to summarize and hopefully clarify some steps.

## Things needed
1. A 2.4GHz internet connection.
   * Due to Eduroam's security settings, it is not possible to connect to Vector using Eduroam.
2. A Raspberry Pi connected to the 2.4GHz network.
   * If you want to use a graphical interface, you will need a mini hdmi, a keyboard, and a mouse. Otherwise, it is recommended to use SSH.
   * When installing Raspberry Pi OS, the name of the device should be set up to `escapepod`, and the SSH should be enabled and connected to the internet.
3. A regular computer connected to the same 2.4GHz network as the raspberry pi.
   * Python 3.9.X has to be installed.
      * (The documentation says that it is 3.9 or latest but I tried it with 3.11 and it did not work) 

## Raspberry Pi Setup

Once your Raspberry Pi OS is installed, if you enabled SSH, you can plug in the Raspberry Pi and connect to it using SSH. To get the IP address of the Raspberry Pi, you will need to access your router's configuration page. Once you have the IP address, you can connect to it using the following command:

```bash
ssh escapepod@192.168.0.1 # Example IP address, make sure to replace it with your device's IP address
```

If you managed to successfully connect to the raspberry by doing SSH, that means that the hostname is most definitely set up to escapepod.

If you didn't enable SSH or you just want to double check the hostname, you can follow the next steps:

**Note:** If you are not using SSH you will need a keyboard, a mouse, and a monitor to connect to the Raspberry Pi.

### Hostname Set-Up
Make sure the host name is set up to escapepod by running the following command:

```bash
hostname

# escapepod
```

If the hostname is not escapepod, to set it up properly you should run the following commands.

```bash
sudo nano /etc/hostname
```

Edit the hostname to `escapepod` and save the file.

Next, run the following command:

```bash
sudo nano /etc/hosts
```

And update the first line of the file to look like this:

```bash
127.0.0.1   localhost escapepod
```

Finally, reboot the Raspberry Pi.

```bash
sudo reboot
```

### Wire-Pod Set-Up
Since the official servers are down, a third party server is needed to setup a Vector. This third party server is called [wire-pod](https://github.com/kercre123/wire-pod). To install it, simply follow the [installation guide](https://github.com/kercre123/wire-pod/wiki/Installation) provided in the [Guide 2: Other Linux](https://github.com/kercre123/wire-pod/wiki/Installation#guide-2-other-linux-or-macos-if-you-want-to-build-it-yourself) section.

After following those steps, wire-pod should be properly set up.

To check if wire-pod is still running after rebooting the Raspberry Pi, you can run the following command:

```bash
systemctl status wire-pod
```

If it's not enabled, run the last steps in the installation guide to run it again.

## Computer Set-Up

1. Make sure Python 3.9.X is installed. (I used 3.9.7).
   1. NOTE: You can use virtual environments if you want to have multiple versions of Python installed.
3. Run the following commands:
   1. `pip install wirepod_vector_sdk`
   2. `pip install anki_vector`
   3. `pip install protobuf==3.20.*`

## Vector Set-Up

This step is the most prone to errors. I've had to try it multiple times to get it to work.

1. Take vector out of the case and turn it on.
2. Start recovery mode.
   1. Put vector in its charger.
   2. Hold the power button for ~20 seconds. Until the lights turn on blue.
   3. Wait for it to reach the screen that says "ddl.io/v"
3. Follow the instructions [here](https://github.com/kercre123/wire-pod/wiki/Installation#authenticate-the-bot-with-wire-pod) to activate it.
   * To get into the configuration page specified in the guide just type `localhost:8080` in your computer's browser. (You can also type the ip address that wire-pod showed when it started. For example `http://192.168.1.221:8080`

**NOTE:** For some reason, sometimes vector does not want to download the update. I have no idea why that happens. The only way I've fixed that is by turning it on and off many times.

## SDK Set-Up

### Get API Credentials

Once vector is authenticated and it has rebooted, it should display its `normal face` on the screen. That means that the SDK can now be set up.

Run this command:

```bash
python ./anki_vector.configure
```

You should see a `SUCCESS` message displayed.
This will get your computer the access credentials to be able to use the SDK with your current robot.

### Download the SDK Samples

Next, you should download the sdk files for your operating system [here](https://keriganc.com/sdkdocs/downloads.html).

Once you have downloaded them you can go to the directory `examples\tutorials` and run some scripts to test it.

**NOTE:** Script 06_face_image.py crashes vector.

### Test the SDK

Now, you can follow [this guide](https://keriganc.com/sdkdocs/getstarted.html#example-program) here to try some code.
