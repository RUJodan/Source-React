import React from 'react';
import { Link } from 'react-router-dom';

export class MenuSideBar extends React.Component {
	render() {
		return(
			<div className='sidebar'>
				<div className='title'>
					SourceUndead
				</div>
				<ul className='nav'>
					<li>
						<Link to="/" className="menu-option-text"><i className="menu-option fa fa-line-chart fa-2x"></i> Statistics</Link>
					</li>
					<li>
						<Link to="/lobby" className="menu-option-text"><i className="menu-option fa fa-hourglass-start fa-2x"></i> Lobby</Link>
					</li>
					<li>
						<Link to="/createGame" className="menu-option-text"><i className="menu-option fa fa-gamepad fa-2x"></i> Create a Game</Link>
					</li>
					<li>
						<a href="https://github.com/RUJodan/SourceUndead"><i className="menu-option fa fa-github fa-2x"></i> Github</a>
					</li>
					<li>
						<Link to="/logout"><i className="menu-option fa fa-power-off fa-2x"></i> Logout</Link>
					</li>
				</ul>
			</div>
		);
	};
}