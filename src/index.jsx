import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

//import jsx
import Login from './components/Login.jsx';
import CreateAccount from './components/CreateAccount.jsx';
import Index from './components/Index.jsx';
import Lobby from './components/Lobby.jsx';
import CreateGame from './components/CreateGame.jsx';
import GameMap from './components/GameMap.jsx';
import WaitingRoom from './components/WaitingRoom.jsx';
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
			<Route path="/map" render={ _ => {
				return <AuthComponent authRoute={GameMap} authFallback={Login} />
			}} />
			<Route path="/waiting/:id" render={ _ => {
				return <AuthComponent authRoute={WaitingRoom} authFallback={Login} />
			}} />
			<Route path="/create" component={CreateAccount} />
			<Route path="/logout" render={ _ => {
				fetch("/logout");
				return <AuthComponent authRoute={Login} authFallback={Login} />
			}} />
			<Route path='/login' component={Login} />
		</div>
	</Router>
), document.getElementById('root'));