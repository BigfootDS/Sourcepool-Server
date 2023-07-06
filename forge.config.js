module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: { // TODO
        certificateFile: './cert.pfx', 
        certificatePassword: process.env.CERTIFICATE_PASSWORD 
      }
    },
    {
      name: '@electron-forge/maker-snap',
      config: {
        features: { // TODO
          audio: true,
          mpris: 'com.example.mpris',
          webgl: true
        },
        summary: 'Pretty Awesome'
      }
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        background: './assets/dmg-background.png', // TODO
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
