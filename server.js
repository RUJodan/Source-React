"use strict";
import express from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import socket from "socket.io";

const app = express();
const router = express.Router();

//create redis handler
//MAKE SURE REDIS IS RUNNING THIS TIME, YOU ASSJACK
import redis from "redis";
const client = redis.createClient(6379, "localhost");

//setup view engine for EJS templating
app.set("view engine", "ejs")
	.use(express.static(`${__dirname}/public`)); //expose public folder static serve

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//create the server
const server = app.listen(8080, () => {
	const port = server.address().port;
	console.log(`SourceUndead has risen from the grave on port ${port}`);
});

//attach socket to process
const io = socket.listen(server);

//session middleware so that socket and express share the same session
const sessionMiddleware = session({
	secret: '1234567890QWERTY',
	resave: false,
	saveUninitialized: true,
	cookie: {secure:false}
});

//APPLY THAT SESSION BRAH
io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);

//GET/POST routing (JSX templates, POST functions)
import login from "./routes/login";
import createAccount from "./routes/createAccount";
import index from "./routes/index";
import isLoggedIn from "./routes/isLoggedIn";

app.use("/login", login);
app.use("/createAccount", createAccount);
app.use("/index", index);
app.use("/isLoggedIn", isLoggedIn);

app.get("*", (req, res) => {
	res.sendFile(`${__dirname}/public/index.html`);
});

//object for delayed log out
let disconnection = {
	sid : null, //socket id
	delay : null //timeout id
};

//socket routing
let bucket = {}; //i haz a bukkit
io.sockets.on("connection", socket => {
	//check for disconnection, compare socket ids, and remove timeout if sockets match
	if (disconnection.delay && disconnection.sid == socket.request.sessionID) {
		clearTimeout(disconnection.delay);
		disconnection.sid = null;
		console.log(`${socket.request.session.player.user} has reconnected!`);
	}
	// make sure session and player exist!
	if (socket.request.sessionID && socket.request.session.player) {
		//init(socket); //create game redis tracker

		//check for existing sessions in the bukkit
		if (socket.request.sessionID && !bucket[socket.request.sessionID]) {
			bucket[socket.request.session.player.id] = socket.id; //nuuu they stealin mah bukkit
		}
		console.log("Connection has been made", socket.request.sessionID);

		//dicsonnect
		//-dump redis TODO: into mysql
		//empty bucket of session
		socket.on('disconnect', function () {
			disconnection.sid = socket.request.sessionID; //grab session id
			disconnection.delay = setTimeout(() => {
				//set timeout to variable, in case of reconnection
				console.log(`${socket.request.session.player.user} has disconnected`);
				delete bucket[socket.request.sessionID];
				const msg = `${socket.request.session.player.user} has disconnected`;
				//emit the disconnection event
				io.sockets.emit('disconnect', {data : msg});
			}, 30000); //player has 30 seconds to reconnect before force logout/leave match
		});
	}
});

export {client};
export {io};
