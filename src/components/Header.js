import React from 'react';
import Datetime from './misc/Datetime';
import { Link } from 'react-router-dom';

function Header(props) {
	return (
			<header className="App-header">
				<nav>
					<Link to="/standings">Standings</Link>
				</nav>
				<h1>Major League Baseball</h1>
				<img src={props.logo} alt="logo"/>
          		<Datetime />
        	</header>
		)
}

export default Header