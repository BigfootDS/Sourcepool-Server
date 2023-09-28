const express = require('express');
const router = express.Router();


const { validateBasicAuth, requiresAdminUser } = require('./middleware/authMiddleware');
router.use(validateBasicAuth);

const serverUtilsRouter = require('./controllers/serverUtilities');
router.use("/server", serverUtilsRouter);

const userController = require('./controllers/UsersController');
router.use("/users", userController);

module.exports = router;