import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { MenuSideBar } from './MenuSideBar.jsx';

export default withRouter(class WaitingRoom extends React.Component {
	state = {
		playerCount : 0,
		players : "",
		lobbyName : ""
	}

	leaveLobby(event) {
		event.preventDefault();
		socket.emit("removePlayer");
		this.props.history.replace('/lobby');
		this.props.history.go('/lobby');
	}

	async componentDidMount() {
		const response = await fetch(`/waitingRoom/${this.props.match.params.id}`);
		const json = await response.json();

		this.setState({
			players : json[0],
			playerCount: json[0].players.length,
			lobbyName : json[0].meta.lobbyName
		});

		socket.on("waitingRoomRefresh", async data => {
			const waiting = await fetch(`/waitingRoom/${this.props.match.params.id}`);
			const waitingRoomPlayers = await waiting.json();

			this.setState({
				players : waitingRoomPlayers[0],
				playerCount: waitingRoomPlayers[0].players.length,
				lobbyName : waitingRoomPlayers[0].meta.lobbyName
			});
		});
	}

	render() {
		let players = "";
		if (this.state.players.players) {
			players = this.state.players.players.map((playersObject, index) => {
				return  <div className="row" key={index}>
							<div className="twelve columns">
								<span>{playersObject.user}</span>
							</div>
						</div>
			});
		}
		return(
			<div>
				<div className="header twelve columns">
					<h1>SourceUndead</h1>
				</div>
				<div className="twelve columns full-page">
					<div className="nine columns stats">
						<div className="ten columns">
							<fieldset>
								<legend>{this.state.lobbyName} Waiting Room {this.state.playerCount}/15</legend>
								<div className="twelve columns" id="waiting">{ players }</div>
							</fieldset>
						</div>
					</div>
					<div className="three columns menu full-page">
						<h5>Lobby Menu</h5>
						<div className="menu-item twelve columns">
							<i className="menu-option fa fa-close fa-2x"></i><a onClick={this.leaveLobby} className="menu-option-text">Leave Game</a>
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
});