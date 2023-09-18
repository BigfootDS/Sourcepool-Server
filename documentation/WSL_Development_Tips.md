# WSL Development Tips

## Building Windows Executables 

ElectronJS is a bit delicate when it comes to WSL.

WSL is typically running a popular version of Linux, such as Ubuntu. NodeJS and NPM are installed into that Ubuntu.

So, NodeJS thinks it's running in Linux. Systems like ElectronJS need _native_ dependencies - packages that are doing things specific to an operating system with native operating system code. This is not good for WSL.

You can read the current workaround here: 

- [Developing with WSL on the Electron Forge documentation](https://www.electronforge.io/guides/developing-with-wsl)

Basically, you must tell NPM to install Windows versions of packages, so that Electron has access to Windows native dependencies instead of Linux native dependencies. This will let us create a Windows installer, such as an ".EXE" file.

So, when setting up this project on your Windows/WSL machine, run: 

`npm install --platform=win32`

And when building the project to run locally, run:

`npm run make -- --platform=win32`

If there are any issues doing those within a WSL terminal, you may need to install NodeJS into your Powershell/Windows system and run the NPM commands there instead. Running the commands in Powershell is definitely running the commands in a Windows OS, compared to whatever virtual machine you have configured in WSL!

## Building Ubuntu Executables

Install `node-gyp` as per: [https://github.com/nodejs/node-gyp#on-unix](https://github.com/nodejs/node-gyp#on-unix)

Install helpful dependencies:

`sudo apt install libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev`

Create builds with this command:

`DEBUG=electron-installer-snap:snapcraft npm run make`


