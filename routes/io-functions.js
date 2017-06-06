"use strict";
import { client, io } from "../server";
import Promise from 'bluebird';

function uuid() {
	let d = new Date().getTime();
	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid;
}

export async function removePlayer(id, socket) {
	const keysAsync = Promise.promisify(client.keys, {context: client});
	const smembersAsync = Promise.promisify(client.smembers, {context: client});
	const hgetallAsync = Promise.promisify(client.hgetall, {context: client});
	const scardAsync = Promise.promisify(client.scard, {context: client});

	const games = await keysAsync("*game*");
	let gameId = "";
	const players = await Promise.all(games.map(game => {
		gameId = game;
		return smembersAsync(game)
	}));
	players.forEach(player => {
		player.forEach(async id => {
			if (id == socket.request.session.player.id) {
				client.srem(gameId, id);
				const count = await scardAsync(gameId);
				if (!count) {
					const metaId = gameId.replace("game-", "");
					client.del(gameId);
					client.del(`metadata-${metaId}`);
					client.del(socket.request.session.player.id);
				}
				socket.broadcast.emit("waitingRoomRefresh", {id:gameId});
			}
		});
	});
}

//define async function
async function isInLobby(id, socket) {
	const keysAsync = Promise.promisify(client.keys, {context: client});
	const smembersAsync = Promise.promisify(client.smembers, {context: client});
	const hgetallAsync = Promise.promisify(client.hgetall, {context: client});

	const games = await keysAsync(id);
	//await response from mapped smembers method
	const players = await Promise.all(games.map(game => smembersAsync(game)));
	
	let exit = false;
	players.forEach(p => {
		p.forEach(id => {
			if (id == socket.request.session.player.id) {
				exit = true;
			}
		});
	});
	if (exit) {
		return true;
	} else {
		return false;
	}
}

async function countPlayer(game) {
	const scardAsync = Promise.promisify(client.scard, {context:client});
	const keyLength = await scardAsync(game);
	return keyLength;
}

export async function createGame(data, socket) {
	const keysAsync = Promise.promisify(client.keys, {context: client});
	const smembersAsync = Promise.promisify(client.smembers, {context: client});
	const hgetallAsync = Promise.promisify(client.hgetall, {context: client});
	const scardAsync = Promise.promisify(client.scard, {context:client});
	const { lobbyName, privateLobby } = data;
	if (!lobbyName) {
		return res.json({
			"msg" : "Your lobby requires a name!",
			"flag" : true
		});
	}
	const inLobby = await isInLobby("*game*", socket);
	if (!inLobby) {
		const id = uuid();
		client.sadd("game-"+id, socket.request.session.player.id);
		client.hmset(socket.request.session.player.id, socket.request.session.player);
		client.hmset("metadata-"+id, {
			"id":id,
			"lobbyName":lobbyName,
			"private": privateLobby
		});

		socket.emit("joinLobby", {
			"msg":"Your lobby was created! You will be redirected to your lobby momentarily..",
			"flag":false,
			"id":`${id}`
		});
		socket.broadcast.emit("refreshLobby");
	} else {
		socket.emit("alreadyInLobbyCreateGame", {
			msg: "You are already in a lobby and cannot join another",
			success: false
		});
	}
}

export async function joinGame(data, socket) {
	const keysAsync = Promise.promisify(client.keys, {context: client});
	const smembersAsync = Promise.promisify(client.smembers, {context: client});
	const hgetallAsync = Promise.promisify(client.hgetall, {context: client});

	const flag = await isInLobby("*game*", socket);
	if (flag) {
		socket.emit("alreadyInLobbyJoinGame", {
			msg: "You are already in a lobby and cannot join another",
			success: false
		});
		return false; //exit
	}
	const count = await countPlayer(data.gameId);
	if (count >= 15) return false; //do not add player, lobby is full!
	else { 
		client.sadd(data.gameId, socket.request.session.player.id);
		socket.request.session.player.playerGameId = data.gameId;
		client.hmset(socket.request.session.player.id, socket.request.session.player, (err, reply) => {
			if (err) {
				res.send({
					msg: "There was an error joining this lobby. Please try again.",
					success: false
				});
			} else {
				socket.emit("loadWaitingRoom", {
					msg: "You have joined the game!",
					success: true
				});
				socket.broadcast.emit("refreshLobby");
				socket.broadcast.emit("waitingRoomRefresh", {id:data.gameId});
			}
		});
	}
}