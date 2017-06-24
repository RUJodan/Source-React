"use strict";
import { client, io } from "../server";
import Promise from 'bluebird';

function calculateBearing(prox) {
	//function by copy
	//takes an array of bearings, and accesses them via 
	return ["n", "ne", "e", "se", "s", "sw", "w", "nw"][(prox + 360 / 16) % 360 / (360 / 8) | 0];
}

//initiate redis game
// export function init(socket) {
// 	//redis push player to game set
// 	client.sadd("game-1", socket.request.session.player.id);
// 	client.hmset(socket.request.session.player.id, socket.request.session.player);
// 	socket.emit("location", {
// 		data : {
// 			x : socket.request.session.player.x,
// 			y : socket.request.session.player.y
// 		}
// 	});
// }

//funtion to check if 2 players are standing on the same time
//return true or false
function similarTile(data, socket) {
	if (data.user == socket.request.session.player.user) return false;
	if (+data.x == socket.request.session.player.x && +data.y == socket.request.session.player.y) {
		const string = `${socket.request.session.player.user} and ${data.user} are on the same tile!`;
		io.sockets.emit("sameTile", {msg:string});
		return true;
	} else return false;
}

//check distance to player via proximity check
function proximity(data, socket) {
	// Get the distance as a unit vector
	const v = getDistance(socket.request.session.player, data);
	console.log("Distance to player", v)
	//boolean radius check
	const rad = withinRadius(v, socket.request.session.player.radius);
	if (rad) {
		const uv = makeUnit(v); //make unit vector
		const angle = angleFromAtan(Math.atan2(+uv.x, +uv.y)); //get arctangent angle
		console.log("angle", angle, uv);
		return calculateBearing(angle);
	} else {
		return -1;
	}
}

//function to check if a player has entered another's radius
function withinRadius(v, r) {
	console.log(v.l, typeof v.l, r)
	return v.l <= r;
}

//calulate actual distance between 2 players
//return object form, and length
function getDistance(playerA, playerB) {
	const x = playerA.x - playerB.x;
	const y = playerA.y - playerB.y;
	const l = Math.sqrt((x * x) + (y * y));
	return {x, y, l};
}

//create unit vector from distance object
function makeUnit(v) {
	return {x: (+v.x / +v.l), y: (+v.y / +v.l), l: 1};
}

//calculate angle using arctangent
function angleFromAtan(a) {
	if (a > 0) {
		return (a * 360 / (2 * Math.PI));
	} else {
		return ((2*Math.PI + a) * 360 / (2*Math.PI));
	}
}

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
				socket.leave(gameId.replace("game-", ""));
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

		socket.request.session.player.playerGameId = id;
		console.log("creating game", socket.request.session.player.playerGameId);

		socket.emit("joinLobby", {
			"msg":"Your lobby was created! You will be redirected to your lobby momentarily..",
			"flag":false,
			"id":`${id}`
		});
		socket.broadcast.emit("refreshLobby");
		socket.request.session.save();
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
		client.hmset(socket.request.session.player.id, socket.request.session.player, (err, reply) => {
			if (err) {
				res.send({
					msg: "There was an error joining this lobby. Please try again.",
					success: false
				});
			} else {
				client.sadd(data.gameId, socket.request.session.player.id);
				socket.request.session.player.playerGameId = data.gameId.replace("game-","");
				console.log("Joining game", socket.request.session.player.playerGameId);
				socket.join(data.gameId.replace("game-",""));
				socket.emit("loadWaitingRoom", {
					msg: "You have joined the game!",
					success: true,
					id : data.gameId.replace("game-","")
				});
				socket.broadcast.emit("waitingRoomRefresh", {id:data.gameId});
				socket.broadcast.emit("refreshLobby");
				socket.request.session.save();
			}
		});
	}
}

export async function movePlayer(data, pid, socket) {
	//movement map for xy coordinate modifiers (thanks @rlemon)
	const movement = {
		'n': {
			x: 0,
			y: 1
		},
		's': {
			x: 0,
			y: -1
		},
		'w': {
			x: -1,
			y: 0
		},
		'e': {
			x: 1,
			y: 0
		}
	};

	if (data.direction === "null") {
		return false;
	} 

	//if no direction, ignore this function
	//destructure map collection movement
	let x = movement[data.direction].x;
	let y = movement[data.direction].y;

	console.log(movement[data.direction]);

	//check for map boundaries
	if (socket.request.session.player.x + x > 100 || socket.request.session.player.x + x < 1) x = 0;
	if (socket.request.session.player.y + y > 100 || socket.request.session.player.y + y < 1) y = 0;
	
	//apply modification to player object
	socket.request.session.player.x += x;
	socket.request.session.player.y += y;

	socket.emit("location", {
		data : {
			x : socket.request.session.player.x,
			y : socket.request.session.player.y
		}
	});

	client.hmset(socket.request.session.player.id, socket.request.session.player); //re-store player object with new coordinates

	/*
		Iterate game to get all player IDs
		get player object from redis, using game-id id index
		grab location
		check for functions (same tile, proximity..)
	 */
	console.log("MAP GAME ID", socket.request.session.player.playerGameId);
	client.smembers(`game-${socket.request.session.player.playerGameId}`, (err, reply) => {
		reply.map(x => {
			client.hgetall(x, (err, reply) => {
				console.log(reply);
				//if (reply.user != socket.request.session.player.user) { //no point in displaying yourself to yourself
					const msg = `${reply.user} is on ${reply.x}, ${reply.y}`;
					console.log(msg);
					socket.emit("locations", {location:msg});
				//}
				//if (reply.id != socket.request.session.player.id) {
					const tile = similarTile(reply, socket);
					let prox;
					if (!tile) { //if not on the same tile
						prox = proximity(reply, socket);
						//TODO calculate directional bearing from angle returned
						if (prox != -1)  {
							console.log(`Sending ${prox} bearing to ${reply.user}`);
							socket.to(socket.request.session.player.playerGameId).emit("bearing", {direction: prox});
							//io.sockets.connected[sock].emit("bearing", {direction: prox});
						}
					}
				//}
			});
		});
	});

	socket.request.session.save();
	//string to return to client for event log
	const string = `${socket.request.session.player.user} has moved ${data.direction} to [${socket.request.session.player.x},${socket.request.session.player.y}]`;
	io.sockets.emit("somethingelse", {msg:string});
}