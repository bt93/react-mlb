import React from 'react';
import Gameheader from './gameparts/Gameheader';
import Linescore from './gameparts/Linescore';
import Decisions from './gameparts/Decisions';
import avatar from './img/avatar.png';

function Gameend(props) {
	return (
		<div>
			<Gameheader data={props.data} />
			<Linescore data={props.data} />
			<span><b>Final</b></span>
			<Decisions data={props.data} avatar={avatar}/>
		</div>
		)
}

export default Gameend;