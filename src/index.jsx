import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

//import jsx
import Login from './components/Login.jsx';
import Create from './components/Create.jsx';
import Index from './components/Index.jsx';

import './index.scss';

export async function isLoggedIn() {
	const response = await fetch('/isLoggedIn');
	const authenticated = await response.json();
	return authenticated.loggedIn ? true : false;
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
		console.log("authorize", auth);
		this.setState({
			auth : auth
		});
	}

	render = _ => {
		console.log("state", this.state);
		return(
			<div>{this.state.auth ? <Index /> : <Login />}</div>
		);
	}
}

render((
	<Router>
		<div>
			<Route exact path="/" render={ _ => {
				return <AuthComponent />
			}} />
			<Route path="/create" component={Create} />
			<Route path='/login' component={Login} />
		</div>
	</Router>
), document.getElementById('root'));