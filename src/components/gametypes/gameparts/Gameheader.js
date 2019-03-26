import React from 'react';

function Gameheader(props) {
	return (
		<div className="game-header">
			<h2>{props.data.gameData.teams.away.name} 
			<span> ({props.data.gameData.teams.away.record.wins} - {props.data.gameData.teams.away.record.losses}) @ </span> 
			<span> {props.data.gameData.teams.home.name}</span>
			<span> ({props.data.gameData.teams.home.record.wins} - {props.data.gameData.teams.home.record.losses})</span></h2>
			<h3>{props.data.gameData.venue.name} | {props.data.gameData.venue.location.city}, {props.data.gameData.venue.location.state}
			<span> | {props.data.gameData.datetime.time} {props.data.gameData.datetime.ampm} {props.data.gameData.venue.timeZone.tz}</span></h3>
			{props.data.gameData.weather.temp !== undefined && <p>Weather: {props.data.gameData.weather.condition}, {props.data.gameData.weather.temp}&#176;F</p>}
		</div>
		)
}

export default Gameheader;