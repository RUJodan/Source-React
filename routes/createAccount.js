"use strict";
import express from "express";
import bcrypt from "bcryptjs";
import Promise from "bluebird";
import {Player} from "../lib/Player";

const router = express.Router();
const db = require("../lib/db");

async function createAccount(user, pass, email) {
	//check if username already exists
	const check = "SELECT COUNT(username) AS count FROM players WHERE username=?";
	const params = [user];
	const data = await db.query(check, params);
	if (data[0].count) {
		return {
			"msg" : "This username has been taken!",
			"flag" : true
		}
	} else {
		//hash password with bcrypt and store account in db
		const password = await bcrypt.hashAsync(pass, 11);
		const sql = "INSERT INTO players (username,email,password) VALUES (?, ?, ?)";
		const params = [user, email, password];
		db.query(sql, params);
		
		return {
			"msg" : "Your account was created! You will be redirected to the login page in 2 seconds.",
			"flag" : false
		}
	}
}

/*
	Routing for /create
	/get: render createAccount form
	/post: @username @password @email params
		- Post user input to createAccount form, check for existing username
		- If user exists, reject request and send error back
		- Create the user account
 */
router.route("/")
	.post(async (req,res) => {
		//destructure form body into constants
		const { username, password, email } = req.body;
		if (!username || !password || !email) {
		return res.json({
				"msg" : "Please fill out all form fields.",
				"flag" : true
			});
		}
		const json = await createAccount(username ,password ,email);
		return res.json(json); //create/reject account, send to user
	});

export default router;