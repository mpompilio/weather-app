var locationFormEl = document.querySelector("#location-form");
var locationInputEl = document.querySelector("#location");
var weatherContainerEl = document.querySelector("#weather-list");
var weatherSearchTerm = document.querySelector("#weather-search-term");
var weatherDayDiv = document.querySelector("#weather-day");

var getLocationWeather = function (location) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&cnt=7&APPID=5e742c8ba47b81a48d8489422caebdaf";

    fetch(apiUrl).then(function (response) {

        if (response.ok) {
            response.json().then(function (data) {
                getLatandLon(data, location);
                displayToday(data, location);
                console.log(data);
            });
        } else {
            alert("Error");
        }
    });
}

var formSubmitHandler = function (event) {
    event.preventDefault();
    var location = locationInputEl.value.trim();

    if (location) {
        getLocationWeather(location);
        locationInputEl.value = "";
    } else {
        alert("Please enter a location");
    }
    console.log(event);
};

var displayToday = function (weather, searchTerm) {

    var iconLink = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";
    var iconSpan = document.createElement("img");
    iconSpan.setAttribute('src', iconLink);



    weatherContainerEl.textContent = "";
    weatherSearchTerm.textContent = searchTerm + " " + moment().format("MM/DD/YYYY");
    weatherSearchTerm.appendChild(iconSpan);

    var farenheight = Math.round((weather.main.temp - 273.15) * 9 / 5 + 32);

    var tempData = document.createElement("li");
    tempData.textContent = farenheight + "*F";
    tempData.classList.add("today-data");

    var windData = document.createElement("li");
    windData.textContent = "Wind: " + weather.wind.speed + " MPH";
    windData.classList.add("today-data");

    var humidityData = document.createElement("li");
    humidityData.textContent = "Humidity: " + weather.main.humidity + "%";
    humidityData.classList.add("today-data");



    weatherContainerEl.appendChild(tempData);
    weatherContainerEl.appendChild(windData);
    weatherContainerEl.appendChild(humidityData);

}


var getLatandLon = function (weather) {

    var latVal = weather.coord.lat;
    console.log(latVal);

    var lonVal = weather.coord.lon;
    console.log(lonVal);

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latVal + "&lon=" + lonVal + "&cnt=5&exclude=hourly&appid=5e742c8ba47b81a48d8489422caebdaf";

    fetch(apiUrl).then(function (response) {

        if (response.ok) {
            response.json().then(function (data) {
                displayOtherDays(data, location)
                console.log(data);
            });
        } else {
            alert("Error");
        }
    });
}


var displayOtherDays = function (weather, searchTerm) {

    var uvData = document.createElement("li");
    uvData.textContent = "UV Index: " + weather.current.uvi;
    if (weather.current.uvi <= 5) {
        uvData.classList.add("uv-favorable");
    } else if (weather.current.uvi >= 5.1 || weather.current.uvi <= 9) {
        uvData.classList.add("uv-moderate");
    } else if (weather.current.uvi > 0) {
        uvData.classList.add("uv-severe");
    }


    weatherContainerEl.appendChild(uvData);


    weatherDayDiv.textContent = "";

    for (i = 1; i < 6; i++) {

        var weatherCard = document.createElement("div");
        weatherCard.classList = "card col-2 mr-4 pl-2";
        weatherCard.setAttribute("id", "card-day")

        var iconLink = "http://openweathermap.org/img/wn/" + weather.daily[i].weather[0].icon + "@2x.png";
        var iconSpan = document.createElement("img");
        iconSpan.setAttribute('src', iconLink);

        var cardDate = document.createElement("h4");
        cardDate.textContent = moment().add(i, 'days').format("MM/DD/YYYY");
        cardDate.appendChild(iconSpan);

        weatherCard.appendChild(cardDate);


        var farenheight = Math.round((weather.daily[i].temp.day - 273.15) * 9 / 5 + 32);

        var tempData = document.createElement("li");
        tempData.textContent = farenheight + "*F";
        tempData.classList.add("other-data");

        var windData = document.createElement("li");
        windData.textContent = "Wind: " + weather.daily[i].wind_speed + " MPH";
        windData.classList.add("other-data");

        var humidityData = document.createElement("li");
        humidityData.textContent = "Humidity: " + weather.daily[i].humidity + "%";
        humidityData.classList.add("other-data");



        weatherCard.appendChild(tempData);
        weatherCard.appendChild(windData);
        weatherCard.appendChild(humidityData);


        weatherDayDiv.appendChild(weatherCard);
    }


}


locationFormEl.addEventListener("submit", formSubmitHandler);