"use strict";
const Promise = require("bluebird");
const db = require("../lib/db");
const mysql = require("mysql");
const bcrypt = require('bcryptjs');

Promise.promisifyAll(bcrypt);

/*
	Function to create a users account

	@param user - username
	@param pass - password
	@param email - email address
 */
export function createAccount(user,pass,email) {
	//check if username already exists
	const check = "SELECT COUNT(username) AS count FROM players WHERE username=?";
	const params = [user];
	return db.query(check, params).then(data => {
		if (data[0].count) {
			return {
				"msg":"This username has been taken!",
				"flag":true,
				"title":": Taken Username"
			}
		} else {
			//hash password with bcrypt and store account in db
			return bcrypt.hashAsync(pass, 11).then(password => {
				const sql = "INSERT INTO players (username,email,password) VALUES (?, ?, ?)";
				const params = [user, email, password];
				return db.query(sql, params);
			}).then(() => {
				//return status
				return {
					"msg":"Your account was created! You will be redirected to the login page in 2 seconds.",
					"flag":false,
					"title":": Account Created"
				}
			});
		}
	});
}

//log user into dashboard
export function login(user) {
	//check for player existance
	const query = "SELECT id, username, password FROM players WHERE username = ?";
	const params = [user];
	return db.query(query, params).then(rows => {
		//if results, return them, otherwise return empty array (non existing account)
		if (!rows.length) return [];
		return [rows[0]];
	});
}