import React from 'react';

class Probablepitchers extends React.Component {
	constructor() {
		super();
		this.state = {
			awayStats: {stats: [], isLoading: true},
			homeStats: {stats: [], isLoading: true}
		}
	}

	componentWillMount() {
		if (this.props.data.gameData.probablePitchers.away) {
			fetch(`http://lookup-service-prod.mlb.com/
			json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='${this.props.data.gameData.game.type}'
			&season='${this.props.data.gameData.teams.away.season}'
			&player_id='${this.props.data.gameData.probablePitchers.away.id}'`)
		.then(res => res.json())
		.then(res => {
			this.setState({awayStats: {stats: res, isLoading:false}})
		});
		}
		if (this.props.data.gameData.probablePitchers.home) {
			fetch(`http://lookup-service-prod.mlb.com/
			json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='${this.props.data.gameData.game.type}'
			&season='${this.props.data.gameData.teams.home.season}'
			&player_id='${this.props.data.gameData.probablePitchers.home.id}'`)
		.then(res => res.json())
		.then(res => {
			this.setState({homeStats: {stats: res, isLoading:false}})
		});
		}
	}

	render() {
		let awayPitcher;
		let homePitcher;
		if (this.props.data.gameData.probablePitchers.away && !this.state.awayStats.isLoading) {
			awayPitcher = (
				<div className="away-pitcher">
					<img src={`https://securea.mlb.com/mlb/images/players/head_shot/${this.props.data.gameData.probablePitchers.away.id}.jpg`} 
					alt={this.props.data.gameData.probablePitchers.away.fullName}/>
					<p>{this.props.data.gameData.teams.away.abbreviation} - {this.props.data.gameData.probablePitchers.away.fullName}</p>
					{this.state.awayStats.stats.sport_pitching_tm.queryResults.row && 
					<ul>
						<li>Record: ({this.state.awayStats.stats.sport_pitching_tm.queryResults.row.w} - {this.state.awayStats.stats.sport_pitching_tm.queryResults.row.l})</li>
						<li>ERA: {this.state.awayStats.stats.sport_pitching_tm.queryResults.row.era}</li>
						<li>Innings Pitched: {this.state.awayStats.stats.sport_pitching_tm.queryResults.row.ip}</li>
						<li>Strike Outs: {this.state.awayStats.stats.sport_pitching_tm.queryResults.row.so}</li>
						<li>WHIP: {this.state.awayStats.stats.sport_pitching_tm.queryResults.row.whip}</li>
					</ul>
					}
				</div>
					)
		} else {
			awayPitcher = <p>{this.props.data.gameData.teams.away.abbreviation} - ?</p>
		}

		if (this.props.data.gameData.probablePitchers.home && !this.state.homeStats.isLoading) {
			homePitcher = (
				<div className="home-pitcher">
					<img src={`https://securea.mlb.com/mlb/images/players/head_shot/${this.props.data.gameData.probablePitchers.home.id}.jpg`} 
					alt={this.props.data.gameData.probablePitchers.home.fullName}/>
					<p>{this.props.data.gameData.teams.home.abbreviation} - {this.props.data.gameData.probablePitchers.home.fullName}</p>
					{this.state.homeStats.stats.sport_pitching_tm.queryResults.row && 
					<ul>
						<li>Record: ({this.state.homeStats.stats.sport_pitching_tm.queryResults.row.w} - {this.state.homeStats.stats.sport_pitching_tm.queryResults.row.l})</li>
						<li>ERA: {this.state.homeStats.stats.sport_pitching_tm.queryResults.row.era}</li>
						<li>Innings Pitched: {this.state.homeStats.stats.sport_pitching_tm.queryResults.row.ip}</li>
						<li>Strike Outs: {this.state.homeStats.stats.sport_pitching_tm.queryResults.row.so}</li>
						<li>WHIP: {this.state.homeStats.stats.sport_pitching_tm.queryResults.row.whip}</li>	
					</ul>
					}
				</div>
				)
		} else {
			homePitcher = <p>{this.props.data.gameData.teams.home.abbreviation} - ?</p>
		}

		return (
			<div>
				<h4>Probable Pitchers</h4>
				{awayPitcher}
				{homePitcher}
			</div>
			)
	}
}

export default Probablepitchers;