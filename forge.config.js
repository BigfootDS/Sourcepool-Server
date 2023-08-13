module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      // Windows installer
      name: '@electron-forge/maker-squirrel',
      config: {
        // Only need these if using electron-winstaller directly instead?? 
        // certificateFile: './cert.pfx', 
        // certificatePassword: process.env.CERTIFICATE_PASSWORD 
      }
    },
    {
      // Ubuntu installer
      name: '@electron-forge/maker-snap',
      config: {
        features: { // TODO
          audio: true,
          mpris: 'com.bigfootds.sourcepool',
          webgl: true
        },
        summary: 'Sourcepool'
      }
    },
    {
      // MacOS installer
      name: '@electron-forge/maker-dmg',
      config: {
        background: './assets/Sourcepool-Parchment-Background-500px.png', // TODO
        format: 'ULFO'
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
