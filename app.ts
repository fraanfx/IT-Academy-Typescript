const boton =  document.getElementById('clickme');
const valorarUno = document.getElementById("rate-1");
const valorarDos = document.getElementById("rate-2");
const valorarTres = document.getElementById("rate-3");

const colorsArray:Array<string> = ['color--red', 'color--purple', 'color--green', 'color-blue', 'color--dark-blue', 'color--dark-blue', 'color--dark-gray', 'color--dark-green', 'color--dark-pink', 'color--brown']
let randomColor = '';
let weatherUrl:string = "http://api.openweathermap.org/data/2.5/weather?q=Barcelona&appid={APITOKEN}}";

const urls:Array<string> = [ "http://api.icndb.com/jokes/random", "https://icanhazdadjoke.com" ];
let url:string  = "";
let urlPosition:string  = "";
let actualJoke:string = '';
let reportJokes = [];
let scored:number = undefined;
let scoreAcc:number = 0;
const containerChisteFetch = document.getElementById('jokeplaceFetch');

const svgPaths = document.getElementsByTagName('path');

console.log("hh"+svgPaths)


//random URL function
function randomUrl() {
    console.log(urls.length)
    let randomUrl = Math.floor(Math.random() * urls.length);
    url = urls[randomUrl];
}





//Fetch mehods
function llamadaFetch(){
    //Call random URL function
    randomUrl()
    const containerChisteFetch = document.getElementById('jokeplaceFetch');
    //Let blank the joke container
    containerChisteFetch.innerHTML = "";
    if(url === urls[0]){
    //Start request
   const callChuck= fetch(url)
        
        //Solve request
        .then(res => res.json())
        //Receive request data
        .then(data => {

            actualJoke = data.value.joke;
            containerChisteFetch.innerHTML = `" ${actualJoke} "`;
        })
    } else {

        //Other joke api
        fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        })
        //Solve request
        .then(res => res.json())
        //Receive request data
        .then(data => {
            actualJoke = data.joke;
            containerChisteFetch.innerHTML = `" ${actualJoke} "`;
        })
    }
}
function getWeatherPosition() {
        let buttonsArr:object = document.getElementsByClassName('rate');
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            // Show a map centered at latitude / longitude.
            console.log(position.coords.longitude+ " <-- Logitud -- Latitud " +position.coords.latitude)
            urlPosition = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=964c02d67282ac68ed3a1eb13049f2e1`
            console.log(urlPosition)
            getWeather();
        });
}
getWeatherPosition();
function getWeather() {
    let containerTiempo = document.getElementById("tiempo");
    let locationSite = document.getElementById("location");
    let locationIcon = document.getElementById('weather-icon');
    console.log(urlPosition)
    if(urlPosition != ""){
        weatherUrl = urlPosition;
        console.log('Geolocation :)'+weatherUrl)
    }
    fetch(weatherUrl)
        
        //Solve request
        .then(res => res.json())
        //Receive request data
        .then(data => {
            console.log("Random "+typeof(data)+ " " + data)
            console.log(data)
            let celsius = (data.main.temp-273).toFixed(2);
            containerTiempo.innerHTML = `${celsius} ºC`;
            locationSite.innerHTML = `${data.name}`;
            const {icon} = data.weather[0];
            locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
        })
}


class Comentario {
    joke:string;
    score:number;
    date: string;

    constructor(joke, score, date){
        this.joke = joke;
        this.score = score;
        this.date = date;
    }

}
    function valorar(actualJoke, score,dateNow){

        let containerMedia = document.getElementById("vMedia");
        const comentario = new Comentario(actualJoke, score, dateNow)
        
        //scoreTotal=  scoreTotal + (comentario.score+1)
        reportJokes.push(comentario)
        
        for (let i = 0; i < reportJokes.length; i++){
            
           console.log("Comentario nª"+(i+1) + "| Valor: " +reportJokes[i].score+ " Fecha: " +reportJokes[i].date +" Chiste: "+ reportJokes[i].joke+ " / " );
           console.log(reportJokes[i])
           
            console.log(scoreAcc)
             }
            scoreAcc = scoreAcc+comentario.score

             console.log(scoreAcc+ " " +reportJokes.length)
             let finalScore = scoreAcc/reportJokes.length;
             console.log(finalScore)
             containerMedia.innerHTML = `La valoració mitja dels chistes es: ${finalScore.toFixed(1)}`;
        }

        function applyRandomColor (){
           let randomColor = Math.floor(Math.random() * colorsArray.length)
            console.log(svgPaths)
            
            for(let i = 0 ; i < svgPaths.length ; i++){
                svgPaths[i].removeAttribute("class");
                svgPaths[i].classList.add(`${colorsArray[randomColor]}`)
            }
        }
        

        
        
        
        
        
    
valorarUno.addEventListener('click',function (evento){
    if(actualJoke != ''){
        scored = 1;
        const d: Date = new Date();
        let dateText:string = d.toISOString();
        valorar(actualJoke,scored, dateText);
    }
});
valorarDos.addEventListener('click',function (evento){
    if(actualJoke != ''){
        scored = 2;
        const d: Date = new Date();
        let dateText:string = d.toISOString();
        valorar(actualJoke,scored, dateText);
    }
});
valorarTres.addEventListener('click',function (evento){
    if(actualJoke != ''){
        scored = 3;
        const d: Date = new Date();
        let dateText:string = d.toISOString();
        valorar(actualJoke,scored, dateText);
    }
});


boton.addEventListener('click', function (evento){
    
    randomUrl();
    llamadaFetch();
    applyRandomColor();
});