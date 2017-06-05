import React from 'react';
import { Link } from 'react-router-dom';
import { MenuSideBar } from './MenuSideBar.jsx';

export default class GameMap extends React.Component {
	render() {
		return(
			<div className='wrapper'>
				<div className='sidebar'>
					<div className='title'>
						Live Event Log
					</div>
					<ul className='nav'>
						<li>
							<a href="https://github.com/RUJodan/SourceUndead"><i className="menu-option fa fa-github fa-2x"></i> Github</a>
						</li>
						<li>
							<Link to="/logout"><i className="menu-option fa fa-power-off fa-2x"></i> Logout</Link>
						</li>
					</ul>
				</div>
				<div className='content'>
					<fieldset>
						<legend>Sense Map</legend>
						<h6 className="title">Your location: <span id="x">0</span>,<span id="y">0</span></h6>
						<div className="grid">
							<div className="grid-row">
								<div className="grid-element" data-direction="nw"></div>
								<div className="grid-element" data-direction="n"></div>
								<div className="grid-element" data-direction="ne"></div>
							</div>
							<div className="grid-row">
								<div className="grid-element" data-direction="w"></div>
								<div className="grid-element" data-direction="null"></div>
								<div className="grid-element" data-direction="e"></div>
							</div>
							<div className="grid-row">
								<div className="grid-element" data-direction="sw"></div>
								<div className="grid-element" data-direction="s"></div>
								<div className="grid-element" data-direction="se"></div>
							</div>
						</div>
					</fieldset>

					<fieldset>
						<legend>Actions</legend>
						<div>testing</div>

					</fieldset>
				</div>
			</div>
		)
	}
}