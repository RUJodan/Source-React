import React from 'react';
import {render} from 'react-dom';
import Login from './components/Login.jsx';

import './index.scss';

class App extends React.Component {
	render() {
		return(
			<div>
				<h2>SourceUndead</h2>
				<div id="error"></div>
				<div className="container">
					<Login />
				</div>
			</div>
		);
	}
}

render(<App/>, document.getElementById('root'));