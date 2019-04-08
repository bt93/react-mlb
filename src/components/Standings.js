import React from 'react';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";

class Standings extends React.Component {
	constructor() {
		super();
		this.state = {
			now: new Date(),
			standings: [],
			isLoading: true
		}
	}

	componentDidMount() {
		fetch(`https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=${this.state.now.getFullYear()}
			&standingsTypes=regularSeason,springTraining,firstHalf,secondHalf&hydrate=division,conference,sport,league,
			team(nextSchedule(team,gameType=[R,F,D,L,W,C],inclusive=false),previousSchedule(team,gameType=[R,F,D,L,W,C],inclusive=true))`)
		.then(res => res.json())
		.then(res => {
			this.setState({
				standings: res,
				isLoading: false
			})
		});
	}

	render() {
		let date = `${this.state.now.getMonth() + 1}/${this.state.now.getDate()}/${this.state.now.getFullYear()}`;
		let records;
		if (!this.state.isLoading) {
			records = this.state.standings.records.map(div => {
				let renderedData;
				if (div.standingsType === 'regularSeason') {
					renderedData = (
						<div key={div.division.id}>
							<table>
								<thead>
									<tr>
										<th>{div.division.name} | </th>
										<th>W | </th>
										<th>L | </th>
										<th>PCT | </th>
										<th>GB | </th>
										<th>WCGB | </th>
										<th>L10 | </th>
										<th>STRK | </th>
										<th>RS | </th>
										<th>RA | </th>
										<th>DIFF | </th>
										<th>X-W/L | </th>
										<th>HOME | </th>
										<th>AWAY | </th>
										<th>NEXT GAME</th>
									</tr>
								</thead>
								<tbody>
									{div.teamRecords.map(teamInfo => {
										return (
											<tr key={teamInfo.team.id}>
												<td>
												<img src={`https://www.mlbstatic.com/team-logos/${teamInfo.team.id}.svg`} 
												className="team-logo"
												alt={teamInfo.team.name}
												/>
												{teamInfo.team.shortName}
												</td>
												<td>{teamInfo.wins}</td>
												<td>{teamInfo.losses}</td>
												<td>{teamInfo.winningPercentage}</td>
												<td>{teamInfo.gamesBack}</td>
												<td>{teamInfo.wildCardGamesBack}</td>
												<td>{teamInfo.records.splitRecords[4].wins}-{teamInfo.records.splitRecords[4].losses}</td>
												<td>{teamInfo.streak !== undefined && teamInfo.streak.streakCode}</td>
												<td>{teamInfo.runsScored}</td>
												<td>{teamInfo.runsAllowed}</td>
												<td>{teamInfo.runDifferential}</td>
												<td>{teamInfo.records.expectedRecords !== undefined && teamInfo.records.expectedRecords[0].wins}-{teamInfo.records.expectedRecords !== undefined && teamInfo.records.expectedRecords[0].losses}</td>
												<td>{teamInfo.records.splitRecords[0].wins}-{teamInfo.records.splitRecords[0].losses}</td>
												<td>{teamInfo.records.splitRecords[1].wins}-{teamInfo.records.splitRecords[1].losses}</td>
												<td><Link to={`/game/${teamInfo.team.nextGameSchedule.dates[0].games[0].gamePk}`}>{teamInfo.team.nextGameSchedule.dates[0].date}</Link></td>
											</tr>
											)
									})}
								</tbody>
							</table>
						</div>
						)
				}
				return renderedData
			})
		} else {
			records = <img src={this.props.ball} alt="ball" className="ball" />
		}

		return (
			<div>
				<nav>
					<Link to="/">Home</Link>
				</nav>
				<h1>Standings</h1>
				<div>
					{records}
				</div>
				<small>Records as of {date}</small>
			</div>
			)
	}
}

export default Standings