"use strict";
import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import {login} from "../lib/posts";
import Promise from "bluebird";
import {Player} from "../lib/Player";
	
Promise.promisifyAll(bcrypt);

/*
	Routing for /login
	/get: render login form
	/post: @username @password params
		- Post user input to login form, retrieve player
		- If user exists, check password for validity, then create session
		- Reject if account does not exist or password is wrong
 */
router.route("/")
	.post((req, res) => {
		login(req.body.username).spread(user => {
			let response = {
				"flag" : true,
				"msg" : ""
			} //fetch player details
			if (!user) {
				response.msg = "This username does not exist!";
				return res.json(response);
			}
			console.log(req.body.password, user.password)
			bcrypt.compareAsync(req.body.password, user.password).then(bool => { //compare to password hash
				console.log("compared pass", bool)
				if (bool) { //create session, return success status
					// req.session.loggedIn = true;
					// req.session.user = user.id;
					// req.session.player = new Player(user.id, user.username);
					response.msg = "You have logged in!";
					response.flag = false;
					//console.log("Player", req.session.player);
					console.log("Logging in user");
				} else {
					//reject, password is wrong
					response.msg = "Your username and or password is incorrect."
					response.flag = true;
				}
				return res.json(response)
			});
		});
	});

export default router;
