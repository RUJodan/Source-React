import React from 'react';

const Login = _ => (
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
				<button id="login" className="u-full-width button">Submit</button>
			</div>
		</div>

		<div className="row">
			<div className="twelve columns">
				<div className="u-full-width">
					<small>Don't have an account? <a href="/create">Create An Account</a>!</small>
				</div>
			</div>
		</div>
	</form>
);

export default Login;