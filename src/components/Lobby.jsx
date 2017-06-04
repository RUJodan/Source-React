import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

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

		socket.on("alreadyInLobby", data => {
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
			}, 1000);
		});
	}


	joinGame(id, event) {
		socket.emit("joinGame", {
			gameId : id
		})
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
			<div>
				<div className="header twelve columns">
					<h1>SourceUndead</h1>
				</div>
				<div className="twelve columns full-page">
					<div className="nine columns stats">
						<div className="ten columns">
							<fieldset>
								<legend>Pick a game</legend>
								<div className={this.state.errorClass}>{this.state.error}</div>
								<div className="twelve columns" id="lobby">
									{ gamesList }
								</div>
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