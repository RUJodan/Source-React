import React from 'react';
import { Link } from 'react-router-dom';
import { MenuSideBar } from './MenuSideBar.jsx';

export default class Index extends React.Component {

	render() {
		return(
			<div className='wrapper'>
				<MenuSideBar />
				<div className='content'>
					<fieldset>
						<legend>General Statistics</legend>      
					</fieldset>

					<fieldset>
						<legend>Stats as Human</legend>      
					</fieldset>

					<fieldset>
						<legend>Stats as Zombie</legend>      
					</fieldset>
				</div>
			</div>
		);
	};
}