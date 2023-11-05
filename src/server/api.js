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

const propsController = require('./controllers/PropsController');
router.use("/props", propsController);

const placesController = require('./controllers/PlacesController');
router.use("/places", placesController);

const productsController = require('./controllers/ProductsController');
router.use("/products", productsController);

const encountersController = require('./controllers/EncountersController');
router.use("/encounters", encountersController);

const templatesController = require('./controllers/TemplatesController');
router.use("/templates", templatesController);

const campaignsController = require('./controllers/CampaignsController');
router.use("/campaigns", campaignsController);

const gamesController = require('./controllers/GamesController');
router.use("/games", gamesController);

const charactersController = require('./controllers/CharactersController');
router.use("/characters", charactersController);

const epochsController = require('./controllers/EpochsController');
router.use("/epochs", epochsController);

const ingamedatesController = require('./controllers/InGameDatesController');
router.use("/ingamedates", ingamedatesController);

const ingameeventsController = require('./controllers/InGameEventsController');
router.use("/ingameevents", ingameeventsController);

const monthsController = require('./controllers/MonthsController');
router.use("/months", monthsController);

const calendarsController = require('./controllers/CalendarsController');
router.use("/calendars", calendarsController);

const universesController = require('./controllers/UniversesController');
router.use("/universes", universesController);


const configsController = require('./controllers/ServerConfigsController');
router.use("/config", configsController);

module.exports = router;