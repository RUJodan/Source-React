"use strict";
import express from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import socket from "socket.io";

const app = express();
const router = express.Router();

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

//GET/POST routing (JSX templates, POST functions)
import login from "./routes/login";

app.use("/login", login);

app.get("*", (req, res) => {
	res.sendFile(`${__dirname}/public/index.html`);
});