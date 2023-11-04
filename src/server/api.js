const express = require('express');
const router = express.Router();


const { validateBasicAuth, requiresAdminUser } = require('./middleware/authMiddleware');
router.use(validateBasicAuth);

const serverUtilsRouter = require('./controllers/serverUtilities');
router.use("/server", serverUtilsRouter);

const userController = require('./controllers/UsersController');
router.use("/users", userController);

const abilityController = require('./controllers/AbilitiesController');
router.use("/abilities", abilityController);

const skillController = require('./controllers/SkillsController');
router.use("/skills", skillController);

const featureController = require('./controllers/FeaturesController');
router.use("/features", featureController);

const conditionController = require('./controllers/ConditionsController');
router.use("/conditions", conditionController);

const damageTypeController = require('./controllers/DamageTypesController');
router.use("/damagetypes", damageTypeController);

const itemsController = require('./controllers/ItemsController');
router.use("/items", itemsController);

module.exports = router;