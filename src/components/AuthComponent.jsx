import React from 'react';

export async function isLoggedIn() {
	const response = await fetch('/isLoggedIn', {
		credentials : 'include'
	});
	const authenticated = await response.json();
	return authenticated.loggedIn;
}

export default class AuthComponent extends React.Component {
	state = {
		auth : null
	}

	componentWillMount = async _ => {
		this.authorize();
	}

	authorize = async _ => {
		const auth = await isLoggedIn();
		this.setState({
			auth : auth
		});
	}

	render() {
		let rendering = null;
		if (this.state.auth === true) {
			rendering = React.createElement(this.props.authRoute, {});
		} else if (this.state.auth === false) {
			rendering = React.createElement(this.props.authFallback, {});
		}
		return(
			<div>
				{rendering}
			</div>
		);
	}
}