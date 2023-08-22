const APIKey = "41bb90ba8ab8eb00f65ca309c065b1e7";
let iconApiRes = "10d";

let call_Icone = `https://openweathermap.org/img/wn/${iconApiRes}@3x.png`;

let api_LatLon = function (city, apiKey) {
	let apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=2&appid=${apiKey}`;

	fetch(apiUrl)
		.then((response) =>
			response.json().then((data) => {
				let lat = data[0].lat;
				let lon = data[0].lon;
				return api_Call(lat, lon, apiKey);
			})
		)
		.catch((error) => console.log("erreur " + error));
};

let api_Call = function (lat, lon, apiKey) {
	let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&lang=fr&units=metric`;

	fetch(apiUrl)
		.then((response) =>
			response.json().then((data) => {
				let date = new Date().toLocaleString("fr-FR", {
					weekday: "long",
					month: "long",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
				});
				let today = new Date();
				let day1 = new Date(today);
				day1.setDate(today.getDate() + 1);

				let day1ofweek = day1.toLocaleString("fr-FR", {
					weekday: "long",
				});
				let day2 = new Date(today);
				day2.setDate(today.getDate() + 2);

				let day2ofweek = day2.toLocaleString("fr-FR", {
					weekday: "long",
				});
				let day3 = new Date(today);
				day3.setDate(today.getDate() + 3);

				let day3ofweek = day3.toLocaleString("fr-FR", {
					weekday: "long",
				});
				let day4 = new Date(today);
				day4.setDate(today.getDate() + 4);

				let day4ofweek = day4.toLocaleString("fr-FR", {
					weekday: "long",
				});

				document.querySelector("#city").innerHTML = data.city.name;
				document.querySelector("#temp").innerHTML =
					data.list[0].main.temp.toFixed(1) + "°C";
				document.querySelector("#humidity").innerHTML =
					data.list[0].main.humidity + "%";
				document.querySelector("#wind").innerHTML =
					data.list[0].wind.speed + "km/h";
				iconApiRes = data.list[0].weather[0].icon;
				call_Icone = `https://openweathermap.org/img/wn/${iconApiRes}.png`;
				document.querySelector(
					"#icone_Meteo"
				).innerHTML = `<img src="${call_Icone}" alt="icone météo">`;
				document.querySelector("#date").innerHTML = `${date}`;

				// 4 jours

				document.querySelector("#day1").innerHTML = `${day1ofweek}`;
				document.querySelector("#temp1").innerHTML =
					data.list[8].main.temp.toFixed(1) + "°C";
				iconApiRes1 = data.list[8].weather[0].icon;
				call_Icone1 = `https://openweathermap.org/img/wn/${iconApiRes1}.png`;
				document.querySelector(
					"#icone1"
				).innerHTML = `<img src="${call_Icone1}" alt="icone météo">`;

				document.querySelector("#day2").innerHTML = `${day2ofweek}`;
				document.querySelector("#temp2").innerHTML =
					data.list[16].main.temp.toFixed(1) + "°C";
				iconApiRes2 = data.list[16].weather[0].icon;
				call_Icone2 = `https://openweathermap.org/img/wn/${iconApiRes2}.png`;
				document.querySelector(
					"#icone2"
				).innerHTML = `<img src="${call_Icone2}" alt="icone météo">`;

				document.querySelector("#day3").innerHTML = `${day3ofweek}`;
				document.querySelector("#temp3").innerHTML =
					data.list[24].main.temp.toFixed(1) + "°C";
				iconApiRes3 = data.list[24].weather[0].icon;
				call_Icone3 = `https://openweathermap.org/img/wn/${iconApiRes3}.png`;
				document.querySelector(
					"#icone3"
				).innerHTML = `<img src="${call_Icone3}" alt="icone météo">`;

				document.querySelector("#day4").innerHTML = `${day4ofweek}`;
				document.querySelector("#temp4").innerHTML =
					data.list[32].main.temp.toFixed(1) + "°C";
				iconApiRes4 = data.list[32].weather[0].icon;
				call_Icone4 = `https://openweathermap.org/img/wn/${iconApiRes4}.png`;
				document.querySelector(
					"#icone4"
				).innerHTML = `<img src="${call_Icone4}" alt="icone météo">`;
			})
		)
		.catch((error) => {
			console.log("erreur " + error);
			fetch(
				"https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=41bb90ba8ab8eb00f65ca309c065b1e7&lang=fr&units=metric"
			)
				.then((response) =>
					response.json().then((data) => {
						let date = new Date().toLocaleString("fr-FR", {
							weekday: "long",
							month: "long",
							day: "numeric",
							hour: "numeric",
							minute: "numeric",
						});
						document.querySelector("#city").innerHTML = data.name;
						document.querySelector("#temp").innerHTML =
							data.main.temp.toFixed(1) + "°C";
						document.querySelector("#humidity").innerHTML =
							data.main.humidity + "%";
						document.querySelector("#wind").innerHTML =
							data.wind.speed + "km/h";

						document.querySelector("#date").innerHTML = `${date}`;
					})
				)
				.catch((error) => console.log("erreur " + error));
		});
};

document.querySelector("form").addEventListener("submit", function (event) {
	event.preventDefault();
	let ville = document.querySelector("#inputCity").value;

	api_LatLon(ville, APIKey);
});

api_LatLon("Paris", APIKey);
