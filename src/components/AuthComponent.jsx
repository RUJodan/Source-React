import React from 'react';

export async function isLoggedIn() {
	const response = await fetch('/isLoggedIn');
	const authenticated = await response.json();
	return authenticated.loggedIn;
}

export default class AuthComponent extends React.Component {
	state = {
		auth : false
	}

	componentDidMount = _ => {
		this.authorize();
	}

	authorize = async _ => {
		const auth = await isLoggedIn();
		console.log("auth", auth, this.props.authRoute, this.props.authFallback);
		this.setState({
			auth : auth
		});
	}

	render() {
		return(
			<div>{this.state.auth ? React.createElement(this.props.authRoute, {}) : React.createElement(this.props.authFallback, {})}</div>
		);
	}
}