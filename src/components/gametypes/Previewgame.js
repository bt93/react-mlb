import React from 'react';
import Gameheader from './gameparts/Gameheader';
import Probablepitchers from './gameparts/Probablepitchers';
import Startinglineup from './gameparts/Startinglineup';

function Previewgame(props) {
	return (
		<div>
			<Gameheader data={props.data} />
			<Probablepitchers data={props.data} />
			<Startinglineup data={props.data} />
		</div>
		)
}

export default Previewgame;