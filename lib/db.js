"use strict";
import Promise from "bluebird";
import settings from "../settings.js";
import mysql from "mysql";

//Promise all the things!
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

//export db methods for use
export {query};

//create config object
const db_config = {
	hostname : "localhost",
	user : settings.user,
	password : settings.password,
	database : settings.database
}

//create db connection pool
const con = mysql.createPool(db_config);

/*
	Function to take in a basic SQL query, and return results if it's a select
	@param sql string to run query
 */
function query(sql, params) {
	return con.getConnectionAsync().then(connection => {
		return connection.queryAsync(sql,params)
			.then(rows => rows)
			.finally(() => connection.release());
	});
}