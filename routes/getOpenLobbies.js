"use strict";
import express from "express";
import bcrypt from "bcryptjs";
import Promise from "bluebird";
import {Player} from "../lib/Player";
import {client, io} from "../server";

const router = express.Router();
const db = require("../lib/db");
	
Promise.promisifyAll(bcrypt);

async function getOpenLobbies() {
	let response = {};
	let keysAsync = Promise.promisify(client.keys, {context: client});
	let smembersAsync = Promise.promisify(client.smembers, {context: client});
	let hgetallAsync = Promise.promisify(client.hgetall, {context: client});
	//await responses from async redis keys method
	const games = await keysAsync("*game*");
	//await response from mapped smembers method
	const players = await Promise.all(games.map(game => smembersAsync(game)));
	//metadata
	const metakey = await keysAsync("*metadata*");
	const data = await Promise.all(metakey.map(meta => hgetallAsync(meta)));
	//compile results of awaited methods into object to return
	const combined = games.map((game, i) => ({
		game,
		players: players[i],
		meta: data.filter(d => d.id === game.replace("game-",""))[0]
	}));
	return combined.filter(game => game.players.length);
}

/*
	Routing for /index
	/post: @username @password params
		- Post user input to login form, retrieve player
		- If user exists, check password for validity, then create session
		- Reject if account does not exist or password is wrong
 */
router.route("/")
	.get(async (req, res) => {
		//define async function
		const data = await getOpenLobbies()
		return res.json(data);
	});

export default router;
