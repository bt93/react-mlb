import React from 'react';
import { Link } from 'react-router-dom';

function Player( {match} ) {
	return (
			<div>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/standings">Standings</Link>
				</nav>
				<Playerinfo id={match.params.id} />
			</div>
		)
}

class Playerinfo extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: true,
			data: []
		}
	}

	componentDidMount() {
		fetch(`https://statsapi.mlb.com/api/v1/people/${this.props.id}
			?hydrate=currentTeam,team,
			stats(type=[yearByYear,yearByYearAdvanced,careerRegularSeason,careerAdvanced,availableStats]
			(team(league)),leagueListId=mlb_hist)&site=en`)
		.then(res => res.json())
		.then(res => {
			this.setState({data: res.people[0], isLoading:false})
		})
	}

	render() {
		let renderedData;
		let renderedStats;

		if (!this.state.isLoading) {
			renderedData = (
				<div>
					<h1>{this.state.data.firstLastName} #{this.state.data.primaryNumber}</h1>
					<h2>{this.state.data.primaryPosition.name} | B/T: {this.state.data.batSide.code}/{this.state.data.pitchHand.code} | {this.state.data.height}/{this.state.data.weight} IB</h2>
					<img src={`https://securea.mlb.com/mlb/images/players/head_shot/${this.state.data.id}.jpg`} 
					alt={this.state.data.firstLastName}/>
					<ul>
						<li><b>{this.state.data.fullFMLName}</b></li>
						<li>Age: {this.state.data.currentAge}</li>
						<li>Nickname: {this.state.data.nickName}</li>
						<li>Born: {this.state.data.birthDate} in {this.state.data.birthCity}
						{this.state.data.birthStateProvince && <span>, {this.state.data.birthStateProvince}</span>}, {this.state.data.birthCountry}</li>
						{this.state.data.draftYear &&<li>Draft: {this.state.data.draftYear}</li>}
						<li>Debut: {this.state.data.mlbDebutDate}</li>
					</ul>
				</div>
				)
			if (this.state.data.primaryPosition.abbreviation === "P") {
				// Pitchers stats
				renderedStats = (
					<div>
						<table>
							<thead>
								<tr>
									<th>Season</th>
									<th>Team</th>
									<th>GP</th>
									<th>GS</th>
									<th>ERA</th>
									<th>Wins</th>
									<th>Losses</th>
									<th>Saves</th>
									<th>Win %</th>
									<th>ER</th>
									<th>WHIP</th>
									<th>K</th>
									<th>BB</th>
									<th>Complete Games</th>
									<th>Shutouts</th>
								</tr>
							</thead>
							<tbody>
								{this.state.data.stats[0].splits.map(season => {
									return (
										<tr key={season.season}>
											<td>{season.season}</td>
											<td>{season.team.abbreviation}</td>
											<td>{season.stat.gamesPlayed}</td>
											<td>{season.stat.gamesStarted}</td>
											<td>{season.stat.era}</td>
											<td>{season.stat.wins}</td>
											<td>{season.stat.losses}</td>
											<td>{season.stat.saves}</td>
											<td>{season.stat.winPercentage}</td>
											<td>{season.stat.earnedRuns}</td>
											<td>{season.stat.whip}</td>
											<td>{season.stat.strikeOuts}</td>
											<td>{season.stat.baseOnBalls}</td>
											<td>{season.stat.completeGames}</td>
											<td>{season.stat.shutouts}</td>
										</tr>
										)
								})}
							</tbody>
						</table>
					</div>
				)
				} else {
					renderedStats = (
						<div>
						<table>
							<thead>
								<tr>
									<th>Season</th>
									<th>Team</th>
									<th>GP</th>
									<th>Avg.</th>
									<th>Hits</th>
									<th>RBI</th>
									<th>HR</th>
									<th>Runs</th>
									<th>AB</th>
									<th>PA</th>
									<th>K</th>
									<th>BB</th>
									<th>Slg. %</th>
									<th>SB</th>
								</tr>
							</thead>
							<tbody>
								{this.state.data.stats[0].splits.map(season => {
									return (
										<tr key={season.season}>
											<td>{season.season}</td>
											<td>{season.team.abbreviation}</td>
											<td>{season.stat.gamesPlayed}</td>
											<td>{season.stat.avg}</td>
											<td>{season.stat.hits}</td>
											<td>{season.stat.rbi}</td>
											<td>{season.stat.homeRuns}</td>
											<td>{season.stat.runs}</td>
											<td>{season.stat.atBats}</td>
											<td>{season.stat.plateAppearances}</td>
											<td>{season.stat.strikeOuts}</td>
											<td>{season.stat.baseOnBalls}</td>
											<td>{season.stat.slg}</td>
											<td>{season.stat.stolenBases}</td>
										</tr>
										)
								})}
							</tbody>
						</table>
					</div>
						)
				}
			}
		return (
			<div>
				{renderedData}
				{renderedStats}
			</div>
			)
	}
}

export default Player