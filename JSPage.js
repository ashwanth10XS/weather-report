var dataElement = document.getElementById("data");

var Latitude;
var Longitude;
var key = "c0ddfc682d7c0cde147b8b88fe464853";// Replace with your actual OpenWeatherMap API Key
var url = "https://api.openweathermap.org/data/2.5/weather?";

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        dataElement.innerHTML = "Geolocation is not supported by this browser. SORRY!";
    }
}

function showPosition(position) {
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    getData(Latitude, Longitude);
}

function getData(Lat, Lon) {
    const readyToSent = (url + "lat=" + Lat + "&lon=" + Lon + "&appid=" + key);
    fetch(readyToSent)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fetchData(data);
        });
}

function fetchData(data) {
    const icon = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    dataElement.innerHTML =
        "<b>The weather report of your Location is :-</b><br>" +
        "<img src=" + icon + "><br>" +
        "<b>Country :</b>" + data.sys.country +
        "<br><b>Local Area Name :</b>" + data.name +
        "<br><b>Temp. :</b>" + parseFloat((data.main.temp - 273.15)).toFixed(1) + "&#8451;" +
        "<br><b>But You will feel like :</b>" + parseFloat((data.main.feels_like - 273.15)).toFixed(1) + "&#8451;" +
        "<br><b>Min. Temp. :</b>" + parseFloat((data.main.temp_min - 273.15)).toFixed(1) + "&#8451;" +
        "<br><b>Max. Temp. :</b>" + parseFloat((data.main.temp_max - 273.15)).toFixed(1) + "&#8451;" +
        "<br><b>Pressure :</b>" + data.main.pressure + "hPa" +
        "<br><b>Humidity :</b>" + data.main.humidity + "%" +
        "<br><b>Weather :</b>" + data.weather[0].description +
        "<br>";
}

getLocation();
