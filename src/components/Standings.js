import React from 'react';
import { Link } from 'react-router-dom';

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
		let string = `${this.state.now.getMonth() + 1}/${this.state.now.getDate()}/${this.state.now.getFullYear()}`;
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
		}

		return (
			<div>
				<nav>
					<Link to="/">Home</Link>
				</nav>
				<h1>Stadings as of {string}</h1>
				<div>
					{records}
				</div>
			</div>
			)
	}
}

export default Standings