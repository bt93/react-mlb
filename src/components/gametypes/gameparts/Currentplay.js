import React from 'react';

function Currentplay(props) {

	return (
		<div>
		<p>{props.data.liveData.linescore.inningState} of the {props.data.liveData.linescore.currentInningOrdinal}</p>
			<div className="current-play">
				<img src={`https://securea.mlb.com/mlb/images/players/head_shot/${props.data.liveData.plays.currentPlay.matchup.batter.id}.jpg`}
				alt={props.data.liveData.plays.currentPlay.matchup.batter.fullName}/>
				<p>At Bat: {props.data.liveData.plays.currentPlay.matchup.batter.fullName} - {props.data.liveData.plays.currentPlay.matchup.batSide.code}</p>
				<img src={`https://securea.mlb.com/mlb/images/players/head_shot/${props.data.liveData.plays.currentPlay.matchup.pitcher.id}.jpg`}
				alt={props.data.liveData.plays.currentPlay.matchup.pitcher.fullName}/>
				<p>Pitching: {props.data.liveData.plays.currentPlay.matchup.pitcher.fullName} - {props.data.liveData.plays.currentPlay.matchup.pitchHand.code}</p>
			</div>
			<div>
				{props.data.liveData.plays.currentPlay.playEvents[0] && <p>{props.data.liveData.plays.currentPlay.playEvents[0].details.description}</p>}
				<p>Outs: {props.data.liveData.plays.currentPlay.count.outs}</p>
				<p>Balls: {props.data.liveData.plays.currentPlay.count.balls}</p>
				<p>Strikes: {props.data.liveData.plays.currentPlay.count.strikes}</p>
			</div>
		</div>
		)
}

export default Currentplay;