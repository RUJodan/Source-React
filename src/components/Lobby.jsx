import React from 'react';
import { Link } from 'react-router-dom';

export default class Lobby extends React.Component {
	render() {
		return(
			<div>
				<div className="twelve columns full-page">
					<div className="nine columns stats">
						<div className="ten columns">
							<fieldset>
								<legend>Pick a game</legend>
								<div id="alert"></div>
								<div className="twelve columns" id="lobby"></div>
							</fieldset>
						</div>
					</div>
					<div className="three columns menu full-page">
						<h5>Lobby Menu</h5>
						<div className="menu-item twelve columns">
							<i className="menu-option fa fa-line-chart fa-2x"></i><Link to="/" className="menu-option-text">Statistics</Link>
						</div>
						<div className="menu-item twelve columns">
							<i className="menu-option fa fa-gamepad fa-2x"></i><Link to="/createGame" className="menu-option-text">Create a Game</Link>
						</div>
					</div>
				</div>
				<div className="footer twelve columns">
					<div>
						<Link to="https://github.com/RUJodan/SourceUndead">Follow this game on GitHub!</Link>
					</div>
					<div className="menu-item">
						<i className=" fa fa-power-off"></i><Link to="/logout">Logout</Link>
					</div>
				</div>
			</div>
		)
	}
}