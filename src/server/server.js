const express = require('express');
const app = express();

// Configure some basic Helmet settings on the server instance.
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.contentSecurityPolicy({
    directives:{
        defaultSrc:["'self'"]
    }
}));

// CORS settings
// For now, just allow all traffic from all sources to reach this API.
var cors = require('cors');
app.use(cors());

// Configure the server instance to receive JSON data.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Debug error handling
void process.on('unhandledRejection', (reason, p) => {
	console.log(`Things got pretty major here! Big error:\n`+ JSON.stringify(p));
	console.log(`That error happened because of:\n` + reason);
});

const { databaseInitCheck } = require('./functions/serverUtils');
try {
	databaseInitCheck();
} catch (error) {
	console.log("--- Error occured! --- ")
	console.log(error);
}

const {readServerConfig} = require('./middleware/serverMiddleware');
app.use(readServerConfig);

// Keeping the admin creation route separate so that it is usable regardless of auth settings
app.post("/users/admin/create/emergency", async (request, response) => {
	let adminCheck = await User.count({isAdmin: true});
	if (adminCheck > 0){
		response.json({
			message:"Other admin accounts exist, please use those to do whatever you're trying to do."
		});
	} else {
		let newUser = User.create({ username: request.body.username, password: request.body.password, isAdmin: true});
		let result = await newUser.save();
		response.json({
			user: result
		});
	}
});

const { validateBasicAuth, requiresAdminUser } = require('./middleware/authMiddleware');
app.use(validateBasicAuth);

app.get("/", (request, response) => {
	response.json({
		message:"Hello world!"
	});
});



const serverUtilsRouter = require('./controllers/serverUtilities');
app.use("/server", requiresAdminUser, serverUtilsRouter);

const userController = require('./controllers/UsersController');
const { User } = require('./models/UserModel');
app.use("/users", userController);


app.use((error, request, response, next) => {
	response.status(500).json({
		message: "You did something that we haven't accounted for. Please raise an issue on GitHub!",
		error: JSON.stringify(error)
	});
});



module.exports = {app};