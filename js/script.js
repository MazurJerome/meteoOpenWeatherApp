const APIKey = "41bb90ba8ab8eb00f65ca309c065b1e7";

let api_Call = function (city) {
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&lang=fr&units=metric`;

	fetch(apiUrl)
		.then((response) =>
			response.json().then((data) => {
				document.querySelector("#city").innerHTML = data.name;
				document.querySelector("#temp").innerHTML = data.main.temp + "°C";
				document.querySelector("#humidity").innerHTML =
					data.main.humidity + "%";
				document.querySelector("#wind").innerHTML = data.wind.speed + "km/h";
			})
		)
		.catch((error) => console.log("erreur " + error));
};

document.querySelector("form").addEventListener("submit", function (event) {
	event.preventDefault();
	let ville = document.querySelector("#inputCity").value;

	api_Call(ville);
});

api_Call("Paris");
