import React from 'react';
import Gameheader from './gameparts/Gameheader';
import Linescore from './gameparts/Linescore';
import Decisions from './gameparts/Decisions';
import Stats from './gameparts/Stats';
import avatar from './img/avatar.png';

function Gameend(props) {
	return (
		<div>
			<Gameheader data={props.data} />
			<Linescore data={props.data} />
			<span><b>Final</b></span>
			<Decisions data={props.data} avatar={avatar}/>
			<Stats data={props.data} />
		</div>
		)
}

export default Gameend;