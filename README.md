SourceUndead :: React
============

Multi-player [in progress] zombie game built with MySQL, Express, Redis, ReactJS and NodeJS

I left out my settings.js file because it has private credentials in it. But here is the schema I used (a simple JS Object) to have my settings all in one file:

    "use strict";
    export default {
        user : "dat username",
        database : "not my database",
        password : "asswordp"
    }

Setting up your own server is easy! The following steps should help you create and setup your server.

1. Install an Ubtuntu 14.04 instance
2. Create your non-root user and give sudo permissions
3. Install a mysql server by running `sudo apt-get install mysql-server`
4. Install npm by running `sudo apt-get install npm`
5. Run `npm install` to install the project dependencies
6. Login to mysql using the credentials you created
7. Run `database.sql` to create the database and tables
8. Set up Redis server on your machine! Make sure Redis is running `redis-server` on a dedicated terminal (or have it run in the background)
9. Run `npm run-script build` to compile the code
10. Run `npm run-script source` to start the server

*Note: Eventually I will export a distribution model that does not require babel. If you do this on your own, use `node server.js --harmony` to start the server. Make sure you install babel-cli globally!

Game Status: [Under Development]
================================

Game is undergoing a massive overhaul and introducing React to the front end! Currently you can:
	- Create an account
	- Login

Special Thanks
==============

[@rlemon](https://github.com/rlemon) -- Helping design, teach, and create the express node routing system. Also screamed BABEL at me several times.

[@ssube](https://github.com/ssube) -- Designed the algorithm to determine player bearing within radius of sense, along with teaching me redis, and why I should use it.

[@ralt](https://github.com/ralt) -- For yelling at my shit code so that I wrote good code. U da real MVP.