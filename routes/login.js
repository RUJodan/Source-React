"use strict";
import express from "express";
import bcrypt from "bcryptjs";
import Promise from "bluebird";
import {Player} from "../lib/Player";
import {client, io} from "../server";

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
	if (!rows.length) return false;
	return rows;
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
		const { username, password } = req.body;
		if (!username || !password) {
			return res.json({
				"msg" : "Please fill out all form fields.",
				"flag" : true
			});
		}
		const user = await login(username);
		let response = {
			"flag" : true,
			"msg" : ""
		} //fetch player details
		if (!user) {
			response.msg = "This username does not exist!";
			return res.json(response);
		}
		const bool = await bcrypt.compareAsync(password, user[0].password); //compare to password hash
		if (bool) { 
			//create session, return success status
			req.session.loggedIn = true;
			req.session.user = user[0].id;
			req.session.player = new Player(user[0].id, user[0].username);
			response.msg = "You have logged in!";
			response.flag = false;
		} else {
			//reject, password is wrong
			response.msg = "Your username or password is incorrect."
			response.flag = true;
		}
		req.session.save();
		res.send(response)
	});

export default router;
