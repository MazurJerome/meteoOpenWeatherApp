const APIKey = "41bb90ba8ab8eb00f65ca309c065b1e7";
let iconApiRes = "10d";

let call_Icone = `https://openweathermap.org/img/wn/${iconApiRes}@3x.png`;

let api_Call = function (city) {
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&lang=fr&units=metric`;

	fetch(apiUrl)
		.then((response) =>
			response.json().then((data) => {
				let date = new Date().toLocaleString("fr-FR", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
				});

				document.querySelector("#city").innerHTML = data.name;
				document.querySelector("#temp").innerHTML = data.main.temp + "°C";
				document.querySelector("#humidity").innerHTML =
					data.main.humidity + "%";
				document.querySelector("#wind").innerHTML = data.wind.speed + "km/h";
				iconApiRes = data.weather[0].icon;
				call_Icone = `https://openweathermap.org/img/wn/${iconApiRes}.png`;
				document.querySelector(
					"#icone_Meteo"
				).innerHTML = `<img src="${call_Icone}" alt="icone météo">`;
				document.querySelector("#date").innerHTML = `${date}`;
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
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "numeric",
							minute: "numeric",
						});
						document.querySelector("#city").innerHTML = data.name;
						document.querySelector("#temp").innerHTML = data.main.temp + "°C";
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

	api_Call(ville);
});

api_Call("Paris");
