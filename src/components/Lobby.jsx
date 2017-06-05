import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { MenuSideBar } from './MenuSideBar.jsx';

export default withRouter(class Lobby extends React.Component {
	state = {
		games : []
	}

	async componentDidMount() {
		const response = await fetch("/getOpenLobbies");
		const json = await response.json();
		this.setState({
			games : json,
			errorClass : "",
			error : ""
		});

		socket.on("alreadyInLobbyJoinGame", data => {
			this.setState({
				errorClass : "error",
				error : data.msg
			});
		});

		socket.on("loadWaitingRoom", data => {
			this.setState({
				errorClass : "success",
				error : data.msg
			});
			setTimeout(_ => {
				this.props.history.go(`/waiting/${data.id}`);
				this.props.history.replace(`/waiting/${data.id}`);
			}, 1000);
		});

		socket.on("refreshLobby", async _ => {
			const refresh = await fetch("/getOpenLobbies");
			const games = await refresh.json();
			this.setState({
				games : games
			});
			console.log(this.state.games);
		})
	}


	joinGame(id, event) {
		socket.emit("joinGame", {
			gameId : id
		});
	}

	render() {
		const gamesList = this.state.games.map((gameObject, index) => {
			return  <div className="row" key={index}>
						<div className="twelve columns">
							<input 
								type="text"
								disabled="true" 
								value = {gameObject.meta.lobbyName + " ("+gameObject.players.length+"/15)"} />
							<button 
								onClick={this.joinGame.bind(this, gameObject.game)}
								className="button">
								Join Game
							</button>
						</div>
					</div>
		});
		return(
			<div className='wrapper'>
				<MenuSideBar />
				<div className='content'>
					<fieldset>
						<legend>Pick a game</legend>
						<div className={this.state.errorClass}>{this.state.error}</div>
						<div className="twelve columns" id="lobby">
							{ gamesList }
						</div>
					</fieldset>
				</div>
			</div>
		)
	}
});