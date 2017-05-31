import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

//import jsx
import Login from './components/Login.jsx';
import Create from './components/Create.jsx';

import './index.scss';

render((
	<Router>
		<div>
			<Route exact path="/" component={Login} />
			<Route path="/create" component={Create} />
			<Route path='/login' component={Login} />
		</div>
	</Router>
), document.getElementById('root'))