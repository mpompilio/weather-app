var locationFormEl = document.querySelector("#location-form");
var locationInputEl = document.querySelector("#location");
var weatherContainerEl = document.querySelector("#weather-list");
var weatherSearchTerm = document.querySelector("#weather-search-term");

var getLocationWeather = function (location) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&cnt=7&APPID=5e742c8ba47b81a48d8489422caebdaf";

    fetch(apiUrl).then(function (response) {

        if(response.ok) {
        response.json().then(function(data) {
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
    weatherSearchTerm.textContent = searchTerm;

    var todayData = document.createElement("li");
    var todayDataText = document.createTextNode(weather.main.temp);
    todayData.appendChild(todayDataText);
    weatherContainerEl.appendChild(todayData);
    
}


var getLatandLon = function (weather) {

        var latVal = weather.coord.lat;
        console.log(latVal);

        var lonVal = weather.coord.lon;
        console.log(lonVal);

        var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latVal + "&lon=" + lonVal + "&exclude=hourly&appid=5e742c8ba47b81a48d8489422caebdaf";

        fetch(apiUrl).then(function (response) {

            if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        } else {
            alert("Error");
        }
        });
    }


locationFormEl.addEventListener("submit", formSubmitHandler);