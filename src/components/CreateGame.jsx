import React from 'react';
import { Link } from 'react-router-dom';

export default class CreateGame extends React.Component {
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
								<legend>Create a game</legend>
								<div id="error"></div>
								<div className="twelve columns">
									<form>
										<div className="row">
											<div className="twelve columns">
												<label htmlFor="lobby">Lobby Name</label>
												<input className="u-full-width" id="lobby" type="text" placeholder="Lobby Name" />
											</div>
										</div>

										<div className="row">
											<div className="twelve columns">
												<label className="label-body" htmlFor="private">
													<span className="label-body">Private Lobby</span>
													<input id="private" value="false" type="checkbox" />
												</label>
											</div>
										</div>

										<div className="row">
											<div className="twelve columns">
												<button id="createGame" className="u-full-width button">Submit</button>
											</div>
										</div>
									</form>
								</div>
							</fieldset>
						</div>
					</div>
					<div className="three columns menu full-page">
						<h5>Create a Game</h5>
						<div className="menu-item twelve columns">
							<i className="menu-option fa fa-line-chart fa-2x"></i><Link to="/" className="menu-option-text">Statistics</Link>
						</div>
						<div className="menu-item twelve columns">
							<i className="menu-option fa fa-hourglass-start fa-2x"></i><Link to="/lobby" className="menu-option-text">Lobby</Link>
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