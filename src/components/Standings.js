import React from 'react';
import { Link } from 'react-router-dom';

class Standings extends React.Component {
	constructor() {
		super();
	}

	render() {
		let now = new Date();
		let string = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
		return (
			<div>
				<nav>
					<Link to="/">Home</Link>
				</nav>
				<h1>Stadings as of {string}</h1>
			</div>
			)
	}
}

export default Standings