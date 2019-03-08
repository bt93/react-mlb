import React from 'react';

class Startinglineup extends React.Component {
	constructor() {
		super();
		this.state = {
			lineups: [],
			isLoading: true,
			awayStats: [],
			homeStats: []
		}
	}

	componentWillMount() {
		// for info
		fetch(`https://statsapi.mlb.com/api/v1/schedule?
			gamePk=${this.props.data.gamePk}&language=en&hydrate=lineups,&useLatestGames=true&fields=dates,games,note,id,dates,games,homeAway,isNational,dates,games,game,tickets,ticketType,ticketLinks,dates,games,lineups,homePlayers,awayPlayers,
			useName,lastName,primaryPosition,abbreviation`)
			.then(res => res.json())
			.then(res => {
				this.setState({
					lineups: res,
					isLoading: false
				});
			})
	}

	render() {
		let awayLineup;
		let homeLineup;
		if (!this.state.isLoading) {
			awayLineup = this.state.lineups.dates[0].games[0].lineups.awayPlayers.map(batter => {
				return (
					<tr key={batter.id}>
						<td>{batter.lastName}, {batter.useName}<b> {batter.primaryPosition.abbreviation}</b></td>
					</tr>
					)
			});
			homeLineup = this.state.lineups.dates[0].games[0].lineups.homePlayers.map(batter => {
				return (
					<tr key={batter.id}>
						<td>{batter.lastName}, {batter.useName}<b> {batter.primaryPosition.abbreviation}</b></td>
					</tr>
					)
			});
		}
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>{this.props.data.liveData.boxscore.teams.away.team.name}</th>
						</tr>
					</thead>
					<tbody>
						{awayLineup}
					</tbody>
				</table>
				<table>
					<thead>
						<tr>
							<th>{this.props.data.liveData.boxscore.teams.home.team.name}</th>
						</tr>
					</thead>
					<tbody>
						{homeLineup}
					</tbody>
				</table>
			</div>
			)
	}
}

export default Startinglineup;