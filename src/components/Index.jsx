import React from 'react';
import { Link } from 'react-router-dom';

export default class Index extends React.Component {

	render = _ => {
		return(
			<div>
				<div className="header twelve columns">
					<h1>SourceUndead</h1>
				</div>
				<div className="twelve columns full-page">
					<div className="nine columns stats">
						<div className="ten columns">
							<fieldset>
								<legend>General Statistics</legend>      
							</fieldset>

							<fieldset>
								<legend>Stats as Human</legend>      
							</fieldset>

							<fieldset>
								<legend>Stats as Zombie</legend>      
							</fieldset>
						</div>
					</div>
					<div className="three columns menu full-page">
						<h5>Player Menu</h5>
						<div className="menu-item twelve columns">
							<i className="menu-option fa fa-hourglass-start fa-2x"></i><Link to="/lobby" className="menu-option-text">Lobby</Link>
						</div>
						<div className="menu-item twelve columns">
							<i className="menu-option fa fa-gamepad fa-2x"></i><Link to="/createGame" className="menu-option-text">Create a Game</Link>
						</div>
					</div>
				</div>
				<div className="footer twelve columns">
					<div>
						<a href="https://github.com/RUJodan/SourceUndead">Follow this game on GitHub!</a>
					</div>
					<div className="menu-item">
						<i className=" fa fa-power-off"></i><Link to="/logout">Logout</Link>
					</div>
				</div>
			</div>
		);
	};
}