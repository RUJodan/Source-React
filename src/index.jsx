import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

//import jsx
import Login from './components/Login.jsx';
import Create from './components/Create.jsx';
import Index from './components/Index.jsx';
import Lobby from './components/Lobby.jsx';
import CreateGame from './components/CreateGame.jsx';
import AuthComponent from './components/AuthComponent.jsx';

import './index.scss';

render((
	<Router>
		<div>
			<Route exact path="/" render={ _ => {
				return <AuthComponent authRoute={Index} authFallback={Login} />
			}} />
			<Route path="/lobby" render={ _ => {
				return <AuthComponent authRoute={Lobby} authFallback={Login} />
			}} />
			<Route path="/createGame" render={ _ => {
				return <AuthComponent authRoute={CreateGame} authFallback={Login} />
			}} />
			<Route path="/create" component={Create} />
			<Route path="/logout" render={ _ => {
				fetch("/logout");
				return <AuthComponent authRoute={Login} authFallback={Login} />
			}} />
			<Route path='/login' component={Login} />
		</div>
	</Router>
), document.getElementById('root'));