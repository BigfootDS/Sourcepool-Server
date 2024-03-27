
const path = require('node:path');
const modelUtils = require('./functions/modelUtils');
/**
 * An object containing model references and helper functions so help us
 * work with the database more-efficiently.
 */
global.modelUtils = modelUtils;

/**
 * String representing the OS file path to the server-managed data.
 * This data should be a series of documents representing Camo-formatted NoSQL data.
 */
global.databasePath = path.join(process.env.userStorageDir, "database");

/**
 * String representing the OS file path to the installed server plugins.
 * Some server functionality is provided as a bundle of plugins, 
 * while other plugins may be user-collected for further server customisation.
 * Plugins can be used to store game content, such as character classes, creatures, and spells.
 * It's anything, really.
 * The server will load up plugins on boot-up.
 */
global.serverPlugins = path.join(process.env.userStorageDir, "plugins");