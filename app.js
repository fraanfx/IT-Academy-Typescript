var boton = document.getElementById('clickme');
var valorarUno = document.getElementById("rate-1");
var valorarDos = document.getElementById("rate-2");
var valorarTres = document.getElementById("rate-3");
var colorsArray = ['color--red', 'color--purple', 'color--green', 'color-blue', 'color--dark-blue', 'color--dark-blue', 'color--dark-gray', 'color--dark-green', 'color--dark-pink', 'color--brown'];
var randomColor = '';
var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid={APITOKEN}}";
var urls = ["http://api.icndb.com/jokes/random", "https://icanhazdadjoke.com"];
var url = "";
var urlPosition = "";
var actualJoke = '';
var reportJokes = [];
var scored = undefined;
var scoreAcc = 0;
var containerChisteFetch = document.getElementById('jokeplaceFetch');
var svgPaths = document.getElementsByTagName('path');
console.log("hh" + svgPaths);
//random URL function
function randomUrl() {
    console.log(urls.length);
    var randomUrl = Math.floor(Math.random() * urls.length);
    url = urls[randomUrl];
}
//Fetch mehods
function llamadaFetch() {
    //Call random URL function
    randomUrl();
    var containerChisteFetch = document.getElementById('jokeplaceFetch');
    //Let blank the joke container
    containerChisteFetch.innerHTML = "";
    if (url === urls[0]) {
        //Start request
        var callChuck = fetch(url)
            //Solve request
            .then(function (res) { return res.json(); })
            //Receive request data
            .then(function (data) {
            actualJoke = data.value.joke;
            containerChisteFetch.innerHTML = "\" ".concat(actualJoke, " \"");
        });
    }
    else {
        //Other joke api
        fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        })
            //Solve request
            .then(function (res) { return res.json(); })
            //Receive request data
            .then(function (data) {
            actualJoke = data.joke;
            containerChisteFetch.innerHTML = "\" ".concat(actualJoke, " \"");
        });
    }
}
function getWeatherPosition() {
    var buttonsArr = document.getElementsByClassName('rate');
    navigator.geolocation.getCurrentPosition(function (position) {
        var _a = position.coords, latitude = _a.latitude, longitude = _a.longitude;
        // Show a map centered at latitude / longitude.
        console.log(position.coords.longitude + " <-- Logitud -- Latitud " + position.coords.latitude);
        urlPosition = "http://api.openweathermap.org/data/2.5/weather?lat=".concat(position.coords.latitude, "&lon=").concat(position.coords.longitude, "&appid=964c02d67282ac68ed3a1eb13049f2e1");
        console.log(urlPosition);
        getWeather();
    });
}
getWeatherPosition();
function getWeather() {
    var containerTiempo = document.getElementById("tiempo");
    var locationSite = document.getElementById("location");
    var locationIcon = document.getElementById('weather-icon');
    console.log(urlPosition);
    if (urlPosition != "") {
        weatherUrl = urlPosition;
        console.log('Geolocation :)' + weatherUrl);
    }
    fetch(weatherUrl)
        //Solve request
        .then(function (res) { return res.json(); })
        //Receive request data
        .then(function (data) {
        console.log("Random " + typeof (data) + " " + data);
        console.log(data);
        var celsius = (data.main.temp - 273).toFixed(2);
        containerTiempo.innerHTML = "".concat(celsius, " \u00BAC");
        locationSite.innerHTML = "".concat(data.name);
        var icon = data.weather[0].icon;
        locationIcon.innerHTML = "<img src=\"icons/".concat(icon, ".png\">");
    });
}
var Comentario = /** @class */ (function () {
    function Comentario(joke, score, date) {
        this.joke = joke;
        this.score = score;
        this.date = date;
    }
    return Comentario;
}());
function valorar(actualJoke, score, dateNow) {
    var containerMedia = document.getElementById("vMedia");
    var comentario = new Comentario(actualJoke, score, dateNow);
    //scoreTotal=  scoreTotal + (comentario.score+1)
    reportJokes.push(comentario);
    for (var i = 0; i < reportJokes.length; i++) {
        console.log("Comentario nª" + (i + 1) + "| Valor: " + reportJokes[i].score + " Fecha: " + reportJokes[i].date + " Chiste: " + reportJokes[i].joke + " / ");
        console.log(scoreAcc);
    }
    scoreAcc = scoreAcc + comentario.score;
    console.log(scoreAcc + " " + reportJokes.length);
    var finalScore = scoreAcc / reportJokes.length;
    console.log(finalScore);
    containerMedia.innerHTML = "La valoraci\u00F3 mitja dels chistes es: ".concat(finalScore.toFixed(1));
}
function applyRandomColor() {
    var randomColor = Math.floor(Math.random() * colorsArray.length);
    console.log("sdaasd " + typeof (svgPaths));
    console.log(svgPaths);
    for (var i = 0; i < svgPaths.length; i++) {
        svgPaths[i].removeAttribute("class");
        svgPaths[i].classList.add("".concat(colorsArray[randomColor]));
    }
}
valorarUno.addEventListener('click', function (evento) {
    if (actualJoke != '') {
        scored = 1;
        var d = new Date();
        var dateText = d.toISOString();
        valorar(actualJoke, scored, dateText);
    }
});
valorarDos.addEventListener('click', function (evento) {
    if (actualJoke != '') {
        scored = 2;
        var d = new Date();
        var dateText = d.toISOString();
        valorar(actualJoke, scored, dateText);
    }
});
valorarTres.addEventListener('click', function (evento) {
    if (actualJoke != '') {
        scored = 3;
        var d = new Date();
        var dateText = d.toISOString();
        valorar(actualJoke, scored, dateText);
    }
});
boton.addEventListener('click', function (evento) {
    randomUrl();
    llamadaFetch();
    applyRandomColor();
});
