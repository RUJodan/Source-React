import React from 'react';
import { Link } from 'react-router-dom';

export default class WaitingRoom extends React.Component {
	render() {
		return(
			<div>
				<div className="header twelve columns">
					<h1>SourceUndead</h1>
				</div>
				<div className="twelve columns full-page">
					<div className="nine columns stats">
						<div className="ten columns">
							<fieldset>
								<legend>Waiting Room</legend>
								<div className="twelve columns" id="waiting"></div>
							</fieldset>
						</div>
					</div>
					<div className="three columns menu full-page">
						<h5>Lobby Menu</h5>
						<div className="menu-item twelve columns">
							<i className="menu-option fa fa-close fa-2x"></i><Link to="/lobby" class="menu-option-text">Leave Game</Link>
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
		)
	}
}