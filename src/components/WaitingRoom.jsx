import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

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
			<div className='wrapper'>
				<div className='sidebar'>
					<div className='title'>
						SourceUndead
					</div>
					<ul className='nav'>
						<li>
							<a onClick={this.leaveLobby.bind(this)} href="javascript:void()"><i className="menu-option fa fa-close fa-2x"></i> Leave Game</a>
						</li>
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
						<legend>{this.state.lobbyName} Waiting Room {this.state.playerCount}/15</legend>
						<div className="twelve columns" id="waiting">{ players }</div>
					</fieldset>
				</div>
			</div>
		)
	}
});