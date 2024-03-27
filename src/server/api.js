const express = require('express');
const router = express.Router();


const { 
	prepareJwtHeader, requiresAdminUser, requiresValidUserJwt, 
	enableFullDocumentDataInQueries, 
	
} = require('./middleware/authMiddleware');

router.use(prepareJwtHeader);
router.use(enableFullDocumentDataInQueries);




const serverUtilsRouter = require('./controllers/serverUtilities');
router.use("/server", serverUtilsRouter);

const userController = require('./controllers/UsersController');
router.use("/users", userController);

const configsController = require('./controllers/ServerConfigsController');
router.use("/config", configsController);

const pluginsController = require("./controllers/ServerPluginsController");
router.use("/plugins", pluginsController);

const genericModelsController = require('./controllers/GenericModelsController');
router.use("/models", requiresValidUserJwt, genericModelsController);

module.exports = router;