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
		}
		return (
			<div>
				{renderedData}
			</div>
			)
	}
}

export default Player