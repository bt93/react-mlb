import React from 'react';
import Gameheader from './gameparts/Gameheader';
import Linescore from './gameparts/Linescore';
import Currentplay from './gameparts/Currentplay';
import Stats from './gameparts/Stats';

function Livegame(props) {
	return (
		<div>
			<Gameheader data={props.data} />
			<Linescore data={props.data} />
			<Currentplay data={props.data} />
			<Stats data={props.data} />	
		</div>
		)
}

export default Livegame