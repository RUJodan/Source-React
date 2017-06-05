import React from 'react';
import { withRouter } from 'react-router';

export default withRouter(class Login extends React.Component {
	state = {
		username : "",
		password : "",
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

	login = async event => {
		event.preventDefault();
		const response = await fetch('/login', {  
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			}),
			credentials: 'include'
		});

		const json = await response.json();
		let classFlag = "success";
		if (json.flag) {
			classFlag = "error";
		}
		this.setState({
			errorClass : classFlag,
			error : json.msg
		});
		if (!json.flag) {
			setTimeout(_ => {
				console.log("redirecting to index", this.props);
				this.props.history.replace('/');
				this.props.history.go('/');
			}, 1000);
		}
	};

	render = _ => {
		return(
			<div>
				<h2 className="title">SourceUndead</h2>
				<div className="container">
					<form>
						<div className={this.state.errorClass}>{this.state.error}</div>
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
	};
});