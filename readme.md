# Sourcepool Server

This repository contains the source code for the core "server" component of Sourcepool.

## Installation

Installers are provided in [the Releases page](https://github.com/BigfootDS/Sourcepool-Server/releases) for MacOS and Windows platforms. Releases towards the top of the page are newer, with the release labelled "latest" being the newest version of the server.

So, MacOS and Windows users, please visit this page: [https://github.com/BigfootDS/Sourcepool-Server/releases](https://github.com/BigfootDS/Sourcepool-Server/releases)

Linux users, please refer to the "Build From Source" section of this page.

## Build From Source

First, download or clone this repository. 

This is a NodeJS project, built on the latest LTS version of NodeJS.

Depending on your platform, you may need to do things like install `node-gyp` separately.

On all systems, you will need to install the NPM dependencies. In your terminal, run this command:

`npm install`

On Ubuntu and other Linux systems, you may need to install additional dependencies before running or building this app:

### Ubuntu dependencies and building

1. Install dependencies:

`sudo apt install libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev`

2. Create builds with this command:

`DEBUG=electron-installer-snap:snapcraft npm run make`

## MacOS, Windows and other platforms

On most systems, you can simply run the `npm run make` command in your terminal and things should work.


## Attributions

["PBR Paper 02 Texture" texture by plaggy, available on OpenGameArt.org](https://opengameart.org/content/cc0-pbr-paper-02-texture-paper02albedopng) - [CC0](https://creativecommons.org/publicdomain/zero/1.0/) - Used in backgrounds in some places of the app, but typically at a reduced opacity (eg. 40% in MacOS DMG installers).