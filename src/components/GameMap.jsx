import React from 'react';
import { Link } from 'react-router-dom';
import { MenuSideBar } from './MenuSideBar.jsx';

export default class GameMap extends React.Component {
	state = {
		x : 0,
		y : 0
	}
	componentWillMount() {
		const keyEventMap = {
			"w" : "n",
			"a" : "w",
			"s" : "s",
			"d" : "e"
		}
		document.addEventListener("keydown", key => {
			if (["w","a","s","d"].includes(key.key)) {
				socket.emit("movePlayer", { "direction" : keyEventMap[key.key] });
			}
		});

		socket.on("location", map => {
			this.setState({
				x : map.data.x,
				y : map.data.y
			});
		});

		socket.on("locations", data => {
			console.log(data)
		});

		socket.on("bearing", data => {
			console.log(data);
		});
	}

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
						<h6 className="title">Your location: ({this.state.x},{this.state.y})</h6>
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