"use strict";
import express from "express";
import bcrypt from "bcryptjs";
import Promise from "bluebird";
import {Player} from "../lib/Player";

const router = express.Router();
const db = require("../lib/db");
	
Promise.promisifyAll(bcrypt);

//log user into dashboard
async function login(user) {
	//check for player existance
	const query = "SELECT id, username, password FROM players WHERE username = ?";
	const params = [user];
	const rows = await db.query(query, params);
	
	//if results, return them, otherwise return empty array (non existing account)
	if (!rows.length) return [];
	return [rows[0]];
}

/*
	Routing for /login
	/get: render login form
	/post: @username @password params
		- Post user input to login form, retrieve player
		- If user exists, check password for validity, then create session
		- Reject if account does not exist or password is wrong
 */
router.route("/")
	.post(async (req, res) => {
		const user = await login(req.body.username);
		let response = {
			"flag" : true,
			"msg" : ""
		} //fetch player details
		if (!user) {
			response.msg = "This username does not exist!";
			return res.json(response);
		}
		const bool = await bcrypt.compareAsync(req.body.password, user[0].password); //compare to password hash
		if (bool) { //create session, return success status
			// req.session.loggedIn = true;
			// req.session.user = user.id;
			// req.session.player = new Player(user.id, user.username);
			response.msg = "You have logged in!";
			response.flag = false;
			//console.log("Player", req.session.player);
		} else {
			//reject, password is wrong
			response.msg = "Your username and or password is incorrect."
			response.flag = true;
		}
		return res.json(response)
	});

export default router;
