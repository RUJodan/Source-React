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

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//session middleware so that socket and express share the same session
const sessionMiddleware = session({
	secret: '1234567890QWERTY',
	resave: false,
	saveUninitialized: true,
	cookie: {secure:false}
});

//create the server
const server = app.listen(8080, () => {
	const port = server.address().port;
	console.log(`SourceUndead has risen from the grave on port ${port}`);
});

//attach socket to process
const io = socket.listen(server);

//APPLY THAT SESSION BRAH
io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);
app.set("socket", io);

//GET/POST routing (JSX templates, POST functions)
import login from "./routes/login";
import createAccount from "./routes/createAccount";
import index from "./routes/index";
import logout from "./routes/logout";
import getOpenLobbies from "./routes/getOpenLobbies";
import isLoggedIn from "./routes/isLoggedIn";

app.use("/login", login);
app.use("/createAccount", createAccount);
app.use("/index", index);
app.use("/isLoggedIn", isLoggedIn);
app.use("/logout", logout);
app.use("/getOpenLobbies", getOpenLobbies);

app.get("*", (req, res) => {
	res.sendFile(`${__dirname}/public/index.html`);
});

//object for delayed log out
let disconnection = {
	sid : null, //socket id
	delay : null //timeout id
};

//socket functions
import { createGame, joinGame } from "./routes/io-functions";

//socket routing
let bucket = {}; //i haz a bukkit
io.sockets.on("connection", socket => {
	console.log("Socket connection", socket.request.sessionID);
	socket.on("createGame", data => {
		createGame(data, socket);
	});

	socket.on("joinGame", data => {
		joinGame(data, socket);
	});
});

export {client};
export {io};
