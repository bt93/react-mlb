import React from 'react';
import { Link } from 'react-router-dom';

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
			fetch(`https://lookup-service-prod.mlb.com/
			json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='${this.props.data.gameData.game.type}'
			&season='${this.props.data.gameData.teams.away.season}'
			&player_id='${this.props.data.gameData.probablePitchers.away.id}'`)
		.then(res => res.json())
		.then(res => {
			this.setState({awayStats: {stats: res.sport_pitching_tm.queryResults.row, isLoading:false}})
		});
		}
		if (this.props.data.gameData.probablePitchers.home) {
			fetch(`https://lookup-service-prod.mlb.com/
			json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='${this.props.data.gameData.game.type}'
			&season='${this.props.data.gameData.teams.home.season}'
			&player_id='${this.props.data.gameData.probablePitchers.home.id}'`)
		.then(res => res.json())
		.then(res => {
			this.setState({homeStats: {stats: res.sport_pitching_tm.queryResults.row, isLoading:false}})
		});
		}
	}

	render() {
		let awayPitcher;
		let homePitcher;
		if (this.props.data.gameData.probablePitchers.away && !this.state.awayStats.isLoading) {
			awayPitcher = (
				<div className="away-pitcher">
					<img src={`https://securea.mlb.com/images/players/525x330/alt/${this.props.data.gameData.probablePitchers.away.id}.jpg`} 
					alt={this.props.data.gameData.probablePitchers.away.fullName}
					className="probable-pitcher-img"
					/>
					<p>{this.props.data.gameData.teams.away.abbreviation} - 
					<Link to={`/player/${this.props.data.gameData.probablePitchers.away.id}`}>{this.props.data.gameData.probablePitchers.away.fullName}</Link></p>
					{this.state.awayStats.stats && 
					<ul>
						<li>Record: ({this.state.awayStats.stats.w} - {this.state.awayStats.stats.l})</li>
						<li>ERA: {this.state.awayStats.stats.era}</li>
						<li>Innings Pitched: {this.state.awayStats.stats.ip}</li>
						<li>Strike Outs: {this.state.awayStats.stats.so}</li>
						<li>WHIP: {this.state.awayStats.stats.whip}</li>
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
					<img src={`https://securea.mlb.com/images/players/525x330/alt/${this.props.data.gameData.probablePitchers.home.id}.jpg`} 
					alt={this.props.data.gameData.probablePitchers.home.fullName}
					className="probable-pitcher-img"
					/>
					<p>{this.props.data.gameData.teams.home.abbreviation} - 
					<Link to={`/player/${this.props.data.gameData.probablePitchers.home.id}`}>{this.props.data.gameData.probablePitchers.home.fullName}</Link></p>
					{this.state.homeStats.stats && 
					<ul>
						<li>Record: ({this.state.homeStats.stats.w} - {this.state.homeStats.stats.l})</li>
						<li>ERA: {this.state.homeStats.stats.era}</li>
						<li>Innings Pitched: {this.state.homeStats.stats.ip}</li>
						<li>Strike Outs: {this.state.homeStats.stats.so}</li>
						<li>WHIP: {this.state.homeStats.stats.whip}</li>	
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
				<div className="probable-pitchers">
					{awayPitcher}
					{homePitcher}
				</div>
			</div>
			)
	}
}

export default Probablepitchers;