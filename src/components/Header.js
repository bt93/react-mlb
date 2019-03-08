import React from 'react';
import Datetime from './misc/Datetime';

function Header(props) {
	return (
			<header className="App-header">
				<h1>Major League Baseball</h1>
				<img src={props.logo} alt="logo"/>
          		<Datetime />
        	</header>
		)
}

export default Header