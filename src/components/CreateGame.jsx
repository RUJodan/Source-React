import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { MenuSideBar } from './MenuSideBar.jsx';

export default withRouter(class CreateGame extends React.Component {
	state = {
		lobbyName: "",
		privateLobby: false,
		error : "",
		errorClass : ""
	};

	componentDidMount() {
		socket.on("alreadyInLobbyCreateGame", data => {
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
					this.props.history.replace(`/waiting/${data.id}`);
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
			<div className='wrapper'>
				<MenuSideBar />
				<div className='content'>
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
		)
	};
});