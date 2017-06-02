import React from 'react';
import { Link } from 'react-router-dom';

export default class GameMap extends React.Component {
	render() {
		return(
			<div>
				<div className="header twelve columns">
					<h1>SourceUndead</h1>
				</div>
				<div className="game">
					<div className="twelve columns full-page">
						<div className="nine columns stats full-page">
							<div className="ten columns full-page">
								<h3>Your location: <span id="x">0</span>,<span id="y">0</span></h3>
								<div id="grid">
									<div className="grid-element" data-direction="nw"></div>
									<div className="grid-element" data-direction="n"></div>
									<div className="grid-element" data-direction="ne"></div>
									<div className="grid-element" data-direction="w"></div>
									<div className="grid-element" data-direction="null"></div>
									<div className="grid-element" data-direction="e"></div>
									<div className="grid-element" data-direction="sw"></div>
									<div className="grid-element" data-direction="s"></div>
									<div className="grid-element" data-direction="se"></div>
								</div>
							</div>
						</div>
						<div className="three columns menu full-page">
							<div className="split-menu-top twelve columns">
								<h5>Game Actions</h5>
							</div>
							<div className="split-menu-bottom log twelve columns">
								<h5>Event Log</h5>
								<div id="log"></div>
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
			</div>
		)
	}
}