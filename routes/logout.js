"use strict";
import express from "express";
const router = express.Router();

/*
	If the user is logged in, redirect to index page
	Else, render the login page
 */
router.get('/', (req, res) => {
	req.session.destroy(err => {
		if (err) throw new Error(err);
	});
	res.redirect("/login");
});

export default router;