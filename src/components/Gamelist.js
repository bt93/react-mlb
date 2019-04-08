import React from 'react';
// eslint-disable-next-line 
import Displaygame from './Displaygame';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class Gamelist extends React.Component {
	constructor() {
		super();
		this.state = {
			error: null,
			gameList: [],
			isLoading: true,
			intervalId: null,
			startDate: new Date()
		}
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		let month = this.state.startDate.getMonth() + 1;
		let day = this.state.startDate.getDate();
		let year = this.state.startDate.getFullYear();
		let date = `${month}/${day}/${year}`;
		let fetchGames = () => {
		fetch(`https://statsapi.mlb.com/api/v1/schedule/?sportId=1
			&date=${date}`)
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

	handleChange(date) {
		this.setState({
			startDate: date
		});
		this.changeDate(date)
	}

	changeDate(date) {
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let year = date.getFullYear();
		let fullDate = `${month}/${day}/${year}`;
		localStorage.setItem('date', fullDate);
		fetch(`https://statsapi.mlb.com/api/v1/schedule/?sportId=1
			&date=${fullDate}`)
		.then(res => res.json())
		.then(res => {
			this.setState({
				gameList: res
			})
		})
	}


	render() {
		let renderedData;
		let headLine;
		if (!this.state.isLoading) {
			if (this.state.gameList.totalGames > 0) {
				headLine = <div>
								<h2>Todays Games</h2>
								<DatePicker 
								todayButton={"Today"}
								selected={this.state.startDate}
								onChange={this.handleChange}
								showYearDropdown
			            		dateFormatCalendar="MMMM"
			            		scrollableYearDropdown
			            		yearDropdownItemNumber={15}
								/>
							</div>
				renderedData = this.state.gameList.dates[0].games.map(game => {
				 	return (
				 		<li key={game.gamePk} className="game">
				 			{game.doubleHeader === 'Y' &&
				 			<p>Game #{game.gameNumber} of doubleheader</p>
				 			}
				 			{game.description && <h3>{game.description}</h3>}
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
							 			{game.status.statusCode === 'PW' && <small>Preview</small>}
						 			</Link>
						 			{game.status.statusCode === 'CR' && <small>Canceled/Rain</small>}
					 			</div>
				 		</li>
				 		)
				 });
			} else {
				headLine = <div>
								<h2>There are no games today</h2>
								<DatePicker 
								todayButton={"Today"}
								selected={this.state.startDate}
								onChange={this.handleChange}
								showYearDropdown
			            		dateFormatCalendar="MMMM"
			            		scrollableYearDropdown
			            		yearDropdownItemNumber={15}
								/>
							</div>
			}
		} else {
			headLine = <img src={this.props.ball} alt="ball" className="ball" />
		}
		// Get year for copyright
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