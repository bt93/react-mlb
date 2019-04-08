import React from 'react';
import { Link } from 'react-router-dom';

function Player( {match} ) {
	return (
			<div>
				<h1>{match.params.id}</h1>
			</div>
		)
}

export default Player