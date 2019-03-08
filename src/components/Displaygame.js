import React from 'react';
import Livegame from './gametypes/Livegame';
import Gameend from './gametypes/Gameend';
import Previewgame from './gametypes/Previewgame';
import { Link } from 'react-router-dom';

function Displaygame({ match }) {
		return (
			<div>
				<Link to="/">Home</Link>
				<Gameinfo id={match.params.id}/>
			</div>
			)
}

class Gameinfo extends React.Component {
	constructor() {
		super();
		this.state = {
			error: null,
			gameInfo: [],
			isLoading: true,
			intervalId: null
		}
	}

	componentDidMount() {
		let fetchGame = () => {
		fetch(`https://statsapi.mlb.com/api/v2/game/${this.props.id}/feed/live`)
		.then(res => res.json())
		.then((res) => {
			this.setState({
				gameInfo: res,
				isLoading: false
			});
		},
			(err) => {
				this.setState({
					isLoading:false,
					error: err
				});
			});
		}
		fetchGame();
		let intervalId = setInterval(fetchGame, 15000);
		this.setState({intervalId: intervalId});
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	render() {
		let renderedData;
		if (!this.state.isLoading) {
			if (this.state.gameInfo.gameData.status.statusCode === 'I') {
				renderedData = (
					<Livegame data={this.state.gameInfo}/>
				)
			} else if (this.state.gameInfo.gameData.status.statusCode === 'F' || 
				this.state.gameInfo.gameData.status.statusCode === 'O' ||
				this.state.gameInfo.gameData.status.statusCode === 'FT' ) {
				renderedData = (
					<Gameend data={this.state.gameInfo} />
					)
			} else if (this.state.gameInfo.gameData.status.statusCode === 'P' ||
				this.state.gameInfo.gameData.status.statusCode === 'S' ||
				this.state.gameInfo.gameData.status.statusCode === 'PW' ) {
				renderedData = (
					<Previewgame data={this.state.gameInfo} />
					)
			}
		} else {
			renderedData = <h1>Loading...</h1>
		}
		return (
			<div>
				{renderedData}
			</div>
			)
	}
}

export default Displaygame;