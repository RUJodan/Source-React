"use strict";
import Promise from "bluebird";
import settings from "../settings.js";
import mysql from "mysql";

//Promise all the things!
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

//create config object
const db_config = {
	hostname : process.env.MYSQL_HOST || "localhost",
	user : process.env.MYSQL_USER || settings.user,
	password : process.env.MYSQL_PASSWORD || settings.password,
	database : "SourceUndead"
};

//create db connection pool
const con = mysql.createPool(db_config);

/*
	Function to take in a basic SQL query, and return results if it's a select
	@param sql string to run query
 */
async function query(sql, params) {
	console.log('DB CONFIG', db_config);
	
	const connection = await con.getConnectionAsync()
		.catch(console.error.bind(console.error, 'ERROR!'));
	
	if (connection) {
		return connection.queryAsync(sql, params)
			.finally(() => connection.release())
			.catch(console.error.bind(console.error, 'ERROR!'));
	} else {
		return new Promise((res) => res());
	}
}

//export db methods for use
export {query};