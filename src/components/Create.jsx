import React from 'react';
import { Link } from 'react-router-dom';

const Create = _ => (
	<div>
		<h2>SourceUndead :: Create an Account</h2>
		<div id="error"></div>
		<div className="container">
			<form>
				<div className="row">
					<div className="twelve columns">
						<label htmlFor="name">Username</label>
						<input className="u-full-width" id="name" type="text" placeholder="Username" />
					</div>
				</div>

				<div className="row">
					<div className="twelve columns">
						<label htmlFor="password">Password</label>
						<input className="u-full-width" id="password" type="password" placeholder="Password" />
					</div>
				</div>

				<div className="row">
					<div className="twelve columns">
						<label htmlFor="email">Email Address</label>
						<input className="u-full-width" id="email" type="email" placeholder="Email Address" />
					</div>
				</div>

				<div className="row">
					<div className="twelve columns">
						<button id="createAccount" className="u-full-width button">Submit</button>
					</div>
				</div>
	
				<div className="row">
					<div className="twelve columns">
						<small>Already have an account? <Link to="/login">Return to Login</Link></small>
					</div>
				</div>
			</form>
		</div>
	</div>
);

export default Create;