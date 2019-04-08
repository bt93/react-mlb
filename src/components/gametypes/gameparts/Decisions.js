import React from 'react';

class Decisions extends React.Component {
	constructor() {
		super();
		this.state = {
			winStats: {stats: [], isLoading: true},
			lossStats: {stats: [], isLoading: true},
			saveStats: {stats: [], isLoading: true}
		}
	}

	componentWillMount() {
			if (this.props.data.gameData.status.statusCode !== 'FT') {
				if (this.props.data.liveData.decisions.winner) {
				fetch(`https://lookup-service-prod.mlb.com/
				json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='${this.props.data.gameData.game.type}'
				&season='${this.props.data.gameData.teams.away.season}'
				&player_id='${this.props.data.liveData.decisions.winner.id}'`)
			.then(res => res.json())
			.then(res => {
				this.setState({winStats: {stats: res.sport_pitching_tm.queryResults.row, isLoading:false}})
			});
			}
			if (this.props.data.liveData.decisions.loser) {
				fetch(`https://lookup-service-prod.mlb.com/
				json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='${this.props.data.gameData.game.type}'
				&season='${this.props.data.gameData.teams.home.season}'
				&player_id='${this.props.data.liveData.decisions.loser.id}'`)
			.then(res => res.json())
			.then(res => {
				this.setState({lossStats: {stats: res.sport_pitching_tm.queryResults.row, isLoading:false}})
			});
			}
			if (this.props.data.liveData.decisions.save) {
				fetch(`https://lookup-service-prod.mlb.com/
				json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='${this.props.data.gameData.game.type}'
				&season='${this.props.data.gameData.teams.home.season}'
				&player_id='${this.props.data.liveData.decisions.save.id}'`)
			.then(res => res.json())
			.then(res => {
				this.setState({saveStats: {stats: res.sport_pitching_tm.queryResults.row, isLoading:false}})
			});
			}
		}
	}

	render() {
		let renderedData;
		if (this.props.data.gameData.status.statusCode !== 'FT') {
			renderedData = (
				<div>
					<h4>Decisions</h4>
						<div className="decisions">
						{!this.state.winStats.isLoading && 
						<div>
							<img src={`https://securea.mlb.com/mlb/images/players/head_shot/${this.props.data.liveData.decisions.winner.id}.jpg`} 
							alt={this.props.data.liveData.decisions.winner.fullName}/>
							<p>Winner: {this.props.data.liveData.decisions.winner.fullName}</p>
							<ul>
								<li>Record: ({this.state.winStats.stats.w} - {this.state.winStats.stats.l})</li>
								<li>ERA: {this.state.winStats.stats.era}</li>
								<li>Innings Pitched: {this.state.winStats.stats.ip}</li>
								<li>Strike Outs: {this.state.winStats.stats.so}</li>
								<li>WHIP: {this.state.winStats.stats.whip}</li>	
							</ul>
						</div>
						}
						{!this.state.lossStats.isLoading && 
						<div>
							<img src={`https://securea.mlb.com/mlb/images/players/head_shot/${this.props.data.liveData.decisions.loser.id}.jpg`} 
							alt={this.props.data.liveData.decisions.loser.fullName}/>
							<p>Loser: {this.props.data.liveData.decisions.loser.fullName}</p>
							<ul>
								<li>Record: ({this.state.lossStats.stats.w} - {this.state.lossStats.stats.l})</li>
								<li>ERA: {this.state.lossStats.stats.era}</li>
								<li>Innings Pitched: {this.state.lossStats.stats.ip}</li>
								<li>Strike Outs: {this.state.lossStats.stats.so}</li>
								<li>WHIP: {this.state.lossStats.stats.whip}</li>	
							</ul>
						</div>
						}
						{this.props.data.liveData.decisions.save && !this.state.saveStats.isLoading &&
						<div>
							<img src={`https://securea.mlb.com/mlb/images/players/head_shot/${this.props.data.liveData.decisions.save.id}.jpg`} 
							alt={this.props.data.liveData.decisions.save.fullName} />
							<p>Save: {this.props.data.liveData.decisions.save.fullName}</p>
							<ul>
								<li>Saves: {this.state.saveStats.stats.sv}</li>
								<li>ERA: {this.state.saveStats.stats.era}</li>
								<li>Innings Pitched: {this.state.saveStats.ip}</li>
								<li>Strike Outs: {this.state.saveStats.stats.so}</li>
								<li>WHIP: {this.state.saveStats.stats.whip}</li>	
							</ul>
						</div>
						}
					</div>
				</div>
				)
		} else {
			renderedData = <h4>Tied Game</h4>
		} 
		return (
			<div>
			{renderedData}
			</div>
	)
	}
}

export default Decisions;