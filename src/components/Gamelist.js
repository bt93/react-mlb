import React from 'react';
// eslint-disable-next-line 
import Displaygame from './Displaygame';
import { Link } from 'react-router-dom';

class Gamelist extends React.Component {
	constructor() {
		super();
		this.state = {
			error: null,
			gameList: [],
			isLoading: true,
			intervalId: null
		}
	}

	componentDidMount() {
		let fetchGames = () => {
		fetch('https://statsapi.mlb.com/api/v1/schedule/?sportId=1')
		.then(res => res.json())
		.then((res) => {
			this.setState({
				gameList: res,
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
		fetchGames();
		let intervalId = setInterval(fetchGames, 60000);
		this.setState({intervalId: intervalId});
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	render() {
		let renderedData;
		let headLine;
		if (!this.state.isLoading) {
			if (this.state.gameList.totalGames > 0) {
				headLine = <h2>Todays Games</h2>;
				renderedData = this.state.gameList.dates[0].games.map(game => {
				 	return (
				 		<li key={game.gamePk} className="game">
				 			{game.doubleHeader === 'Y' &&
				 			<p>Game #{game.gameNumber} of doubleheader</p>
				 			}
				 			<h3>{game.description}</h3>
				 			<p><img src={`https://www.mlbstatic.com/team-logos/${game.teams.away.team.id}.svg`} 
				 			className="team-logo"
				 			alt={game.teams.away.team.name}
				 			/>  {game.teams.away.team.name} <b>{game.teams.away.score}</b> | ({game.teams.away.leagueRecord.wins} - {game.teams.away.leagueRecord.losses}) <br />
				 			<img src={`https://www.mlbstatic.com/team-logos/${game.teams.home.team.id}.svg`} 
				 			className="team-logo"
				 			alt={game.teams.home.team.name}
				 			/>  {game.teams.home.team.name} <b>{game.teams.home.score}</b> | ({game.teams.home.leagueRecord.wins} - {game.teams.home.leagueRecord.losses})</p>
					 			<div>
						 			<Link to={`/game/${game.gamePk}`}>
						 			{game.status.statusCode === 'F' && <small>Final</small>}
						 			{game.status.statusCode === 'O' && <small>Final</small>}
						 			{game.status.statusCode === 'FT' && <small>Final</small>}
						 			{game.status.statusCode === 'I' && <small>Live</small>}
						 			{game.status.statusCode === 'P' && <small>Preview</small>}
						 			{game.status.statusCode === 'S' && <small>Preview</small>}
						 			{game.status.statusCode === 'PW' && <small>Preview</small>}</Link>
					 			</div>
				 		</li>
				 		)
				 });
			} else {
				headLine = <h2>There are no games today</h2>
			}
		} else {
			renderedData = <img src={this.props.ball} alt="ball" className="ball" />
		}

		let date = new Date();
		let year = date.getFullYear();
		return (
				<div>
					{headLine}
					<ul className="game-list">
						{renderedData}
					</ul>
					<p>All data and stats from <a href="https://statsapi.mlb.com/" target="_blank" rel="noopener noreferrer">https://statsapi.mlb.com/</a> 
					<span>and <a href="http://lookup-service-prod.mlb.com" target="_blank" rel="noopener noreferrer">http://lookup-service-prod.mlb.com</a></span></p>
				 	<p>Copyright {year} MLB Advanced Media, L.P. Use of any content on this page acknowledges agreement to the terms posted here <span>
				 	 <a href="http://gdx.mlb.com/components/copyright.txt" target="_blank" rel="noopener noreferrer">http://gdx.mlb.com/components/copyright.txt</a></span></p>
				</div>
			)
	}
}

export default Gamelist;