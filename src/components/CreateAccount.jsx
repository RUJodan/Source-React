import React from 'react';
import { Link } from 'react-router-dom';

export default class CreateAccount extends React.Component {
	state = {
		username : "",
		password : "",
		email : "",
		error : "",
		errorClass : ""
	};

	formChange = event => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
    		[name]: value
    	});
	};

	createAccount = async event => {
		event.preventDefault();
		const response = await fetch('/createAccount', {  
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
				email: this.state.email
			}),
			credentials : 'include'
		});

		const json = await response.json();
		console.log(json)
		let classFlag = "success";
		if (json.flag) {
			classFlag = "error";
		}
		this.setState({
			errorClass : classFlag,
			error : json.msg
		});
	};

	render = _ => {
		return(
			<div>
				<h2>SourceUndead :: Create an Account</h2>
				<div className={this.state.errorClass}>{this.state.error}</div>
				<div className="container">
					<form>
						<div className="row">
							<div className="twelve columns">
								<label htmlFor="name">Username</label>
								<input onChange={this.formChange} value={this.state.username} className="u-full-width" name="username" type="text" placeholder="Username" />
							</div>
						</div>

						<div className="row">
							<div className="twelve columns">
								<label htmlFor="password">Password</label>
								<input onChange={this.formChange} value={this.state.password} className="u-full-width" name="password" type="password" placeholder="Password" />
							</div>
						</div>

						<div className="row">
							<div className="twelve columns">
								<label htmlFor="email">Email Address</label>
								<input onChange={this.formChange} value={this.state.email} className="u-full-width" name="email" type="email" placeholder="Email Address" />
							</div>
						</div>

						<div className="row">
							<div className="twelve columns">
								<button onClick={this.createAccount} type="submit" className="u-full-width button">Submit</button>
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
	};
}