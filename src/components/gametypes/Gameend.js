import React from 'react';
import Gameheader from './gameparts/Gameheader';
import Linescore from './gameparts/Linescore';
import Decisions from './gameparts/Decisions';

function Gameend(props) {
	return (
		<div>
			<Gameheader data={props.data} />
			<Linescore data={props.data} />
			<Decisions data={props.data} />
		</div>
		)
}

export default Gameend;