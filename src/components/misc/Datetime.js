import React from 'react';

function Datetime() {
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	const today = new Date();
	let month = months[today.getMonth()];
	let day = days[today.getDay()];
	let date = today.getDate();
	let year = today.getFullYear();
	return (
		<h2>Today is {day}, {month} {date}, {year}</h2>
		)
}

export default Datetime;