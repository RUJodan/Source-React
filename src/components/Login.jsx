import React from 'react';

function login(event) {
	event.preventDefault();
	console.log(event, "button was clicked!");
	fetch("/getJSON")
		.then(response => response.json())
		.then(json => console.log(json));
}

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username : "",
			password : ""
		};

		this.formChange = this.formChange.bind(this);
		this.login = this.login.bind(this);
	}

	formChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
    		[name]: value
    	});
	}

	login(event) {
		event.preventDefault();
		console.log("button was clicked!", this.state.username, this.state.password);
		
	}

	render() {
		return(
			<div>
				<h2>SourceUndead</h2>
				<div id="error"></div>
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
								<button onClick={this.login} type="submit" className="u-full-width button">Submit</button>
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
				</div>
			</div>
		);
	}
}

export default Login;