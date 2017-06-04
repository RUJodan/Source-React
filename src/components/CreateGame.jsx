import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

export default withRouter(class CreateGame extends React.Component {
	state = {
		lobbyName: "",
		privateLobby: false,
		error : "",
		errorClass : ""
	};

	componentDidMount() {
		socket.on("alreadyInLobby", data => {
			this.setState({
				errorClass : "error",
				error : data.msg
			});
		});

		socket.on("joinLobby", data => {
			let classFlag = "success";
			if (data.flag) {
				classFlag = "error";
			}
			this.setState({
				errorClass : classFlag,
				error : data.msg
			});

			if (!data.flag) {
				setTimeout(_ => {
					console.log("redirecting to index", this.props);
					this.props.history.go(`/waiting/${data.id}`);
				}, 1000);
			}
		});
	}

	handleInputChange = event => {
		const target = event.target;
		const name = target.name;
		const value = target.value;

		this.setState({
    		lobbyName: value
    	});
	};

	handleCheckboxChange = event => {
		this.setState({
			privateLobby : !this.state.privateLobby
		});
	};

	createGame = async event => {
		event.preventDefault();
		socket.emit("createGame", {
			lobbyName: this.state.lobbyName,
			privateLobby: this.state.privateLobby,
		});
	};

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
								<div className={this.state.errorClass}>{this.state.error}</div>
								<div className="twelve columns">
									<form>
										<div className="row">
											<div className="twelve columns">
												<label htmlFor="lobby">Lobby Name</label>
												<input onChange={this.handleInputChange} value={this.state.lobbyName} name="lobbyName" className="u-full-width" type="text" placeholder="Lobby Name" />
											</div>
										</div>

										<div className="row">
											<div className="twelve columns">
												<label className="label-body" htmlFor="private">
													<span className="label-body">Private Lobby</span>
													<input onChange={this.handleCheckboxChange} checked={this.state.privateLobby} name="privateLobby" type="checkbox" />
												</label>
											</div>
										</div>

										<div className="row">
											<div className="twelve columns">
												<button onClick={this.createGame} type="submit" className="u-full-width button">Create a Lobby</button>
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
	};
});