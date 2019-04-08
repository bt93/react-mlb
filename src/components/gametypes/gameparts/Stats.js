import React from 'react';
import { Link } from 'react-router-dom';

class Stats extends React.Component {
	constructor() {
		super();
		this.state = {
			awayBatters: {stats: [], isLoading: true},
			homeBatters: {stats: [], isLoading: true}
		}
	}

	componentWillMount() {
		let awayBatters = this.props.data.liveData.boxscore.teams.away.batters.map(batter => {
			return `personIds=${batter}&`
		});
		awayBatters = awayBatters.join('');
		fetch(`https://statsapi.mlb.com/api/v1/people?${awayBatters}season=${this.props.data.gameData.teams.away.season}
			&hydrate=stats(group=hitting,type=season,season=${this.props.data.gameData.teams.away.season},gameType=${this.props.data.gameData.game.type})`)
		.then(res => res.json())
		.then(res => {
			this.setState({
				awayBatters: {stats: res, isLoading:false}
			})
		});

		let homeBatters = this.props.data.liveData.boxscore.teams.home.batters.map(batter => {
			return `personIds=${batter}&`
		});
		homeBatters = homeBatters.join('');
		fetch(`https://statsapi.mlb.com/api/v1/people?${homeBatters}season=${this.props.data.gameData.teams.home.season}
			&hydrate=stats(group=hitting,type=season,season=${this.props.data.gameData.teams.home.season},gameType=${this.props.data.gameData.game.type})`)
		.then(res => res.json())
		.then(res => {
			this.setState({
				homeBatters: {stats: res, isLoading:false}
			})
		});
	}

	render() {
		let awayBattersStats;
		let homeBattersStats;
		if (!this.state.awayBatters.isLoading) {
			awayBattersStats = this.state.awayBatters.stats.people.map(batter => {
				return (
				<tr key={batter.id}>
					<td><Link to={`/player/${batter.id}`}>{batter.firstLastName}</Link></td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.avg}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.runs}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.hits}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.rbi}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.baseOnBalls}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.strikeOuts}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.homeRuns}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.atBats}</td>
				</tr>
				)
			});
		}

		if (!this.state.homeBatters.isLoading) {
			homeBattersStats = this.state.homeBatters.stats.people.map(batter => {
				return (
				<tr key={batter.id}>
					<td><Link to={`/player/${batter.id}`}>{batter.firstLastName}</Link></td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.avg}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.runs}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.hits}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.rbi}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.baseOnBalls}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.strikeOuts}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.homeRuns}</td>
					<td>{batter.stats && batter.stats[0].splits[0].stat.atBats}</td>
				</tr>
				)
			});
		}

		let infoLen = this.props.data.liveData.boxscore.info.length;
		let info = this.props.data.liveData.boxscore.info.map((info, index) => {
			if (infoLen === index + 1) {
				return <li key={index}>{info.label} {info.value}</li>
			} else {
				return <li key={index}>{info.label}: {info.value}</li>
			}
		})
		return (
			<div>
				<div className="starting-lineup">
					<table>
						<thead>
							<tr>
								<th>{this.props.data.liveData.boxscore.teams.away.team.name}</th>
								<th>AVG</th>
								<th>R</th>
								<th>H</th>
								<th>RBI</th>
								<th>BB</th>
								<th>K</th>
								<th>HR</th>
								<th>AB</th>
							</tr>
						</thead>
						<tbody>
							{awayBattersStats}
						</tbody>
					</table>
					<table>
						<thead>
							<tr>
								<th>{this.props.data.liveData.boxscore.teams.home.team.name}</th>
								<th>AVG</th>
								<th>R</th>
								<th>H</th>
								<th>RBI</th>
								<th>BB</th>
								<th>K</th>
								<th>HR</th>
								<th>AB</th>
							</tr>
						</thead>
						<tbody>
							{homeBattersStats}
						</tbody>
					</table>
				</div>
				<div>
					<ul>
						{info}
					</ul>
				</div>
			</div>
			)
	}
}

export default Stats;