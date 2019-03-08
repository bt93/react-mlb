import React from 'react';

function Linescore(props) {
	let tableHead = props.data.liveData.linescore.innings.map(inning => {
		return <th key={inning.num}>{inning.num}</th>
	});

	let awayLine = props.data.liveData.linescore.innings.map(inning => {
		return <td key={inning.num}>{inning.away.runs}</td>
	});

	let homeLine = props.data.liveData.linescore.innings.map(inning => {
		return <td key={inning.num}>{inning.home.runs}</td>
	});
	return (
		<div className="line-score">
			<table>
				<thead>
					<tr>
						<th key="-1"></th>
						<th key="0"></th>
						{tableHead}
						<th key="20">R</th>
						<th key="21">H</th>
						<th key="22">E</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td key="-1"><img src={`https://www.mlbstatic.com/team-logos/${props.data.gameData.teams.away.id}.svg`} 
				 			className="team-logo"
				 			alt={props.data.gameData.teams.away.name}
				 			/>  </td>
						<td key="0">{props.data.gameData.teams.away.abbreviation}</td>
						{awayLine}
						<td key="20">{props.data.liveData.linescore.teams.away.runs}</td>
						<td key="21">{props.data.liveData.linescore.teams.away.hits}</td>
						<td key="22">{props.data.liveData.linescore.teams.away.errors}</td>
					</tr>
					<tr>
						<td key="-1"><img src={`https://www.mlbstatic.com/team-logos/${props.data.gameData.teams.home.id}.svg`} 
				 			className="team-logo"
				 			alt={props.data.gameData.teams.home.name}
				 			/> </td>
						<td key="0">{props.data.gameData.teams.home.abbreviation}</td>
						{homeLine}
						<td key="20">{props.data.liveData.linescore.teams.home.runs}</td>
						<td key="21">{props.data.liveData.linescore.teams.home.hits}</td>
						<td key="22">{props.data.liveData.linescore.teams.home.errors}</td>
					</tr>
				</tbody>
			</table>
		</div>
		)
}

export default Linescore;