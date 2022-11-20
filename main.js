let  cityInput = document.querySelector(".city");
let day = document.querySelector(".day");
let date_year = document.querySelector(".date");
let time = document.querySelector(".time");
let temperature = document.querySelector(".tempature");
let minTemp = document.querySelector(".mintemp");
let maxTeimp = document.querySelector(".maxtemp");
let windspeed = document.querySelector(".windspeed");
let humditi = document.querySelector(".humditi");
let presure = document.querySelector(".presure");
let sunRiseTime = document.querySelector(".sunrisetime");
let sunsSetTime = document.querySelector(".sunsettime");
let weatherStatus = document.querySelector(".weather-status");
let image = document.querySelector(".images");
cityInput.addEventListener("keyup",showWeather)

function showWeather(e) {
    if(e.keyCode === 13){
        let city = cityInput.value;
        let xml = new XMLHttpRequest();
        xml.open(
            "GET",
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ab15de9c261de334088454488c97054c&units=metric`
        )
        xml.onreadystatechange = function(){
            if (xml.readyState === 4 && xml.status ===200) {
                displayResult(JSON.parse(xml.responseText))
                
            }

        }
        xml.send();
    }
    
}

function displayResult(data) {
    let date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;

    let utcTime = utc + 1000 * data.timezone;
    let newCity = new Date(utcTime);
    let msunrise = new Date(data.sys.sunrise * 1000).getMinutes();
    let msunset = new Date(data.sys.sunset  * 1000).getMinutes();
    let hsunrise = new Date(data.sys.sunrise * 1000).getHours();
    let hsunset = new Date(data.sys.sunset  * 1000).getHours();

    

    let cityHour = newCity.getHours();
    let cityMinute = newCity.getMinutes();


   
    cityHour < 10 ? (cityHour= `0${cityHour}`) : (cityHour = cityHour)
    cityMinute < 10 ? (cityMinute = `0${cityMinute}`) : (cityMinute = cityMinute);
    hsunrise < 10 ? (hsunrise = `0${hsunrise}`) :(hsunrise = hsunrise);
    msunrise < 10 ? (msunrise = `0${msunrise}`) :(msunrise = msunrise);
    hsunset < 10 ? (hsunset = `0${hsunset}`) :(hsunset= hsunset);
    msunset < 10 ? (msunset = `0${msunset}`) :(msunset= msunset);


    time.innerHTML = `${cityHour}:${cityMinute} h   `
    
     maxTeimp.innerHTML = `Max: ${Math.round(data.main.temp_max)} &deg;C`
    temperature.innerHTML = `${Math.round(data.main.temp)} &deg;C`
    minTemp.innerHTML = `Min: ${Math.round(data.main.temp_min)} &deg;C`

    windspeed.innerHTML = `${data.wind.speed} km/h`;
    humditi.innerHTML = `${data.main.humidity} %`;
    presure.innerHTML = `${data.main.pressure} hPa`;
    sunRiseTime.innerHTML =  `${hsunrise}:${msunrise}`;
    sunsSetTime.innerHTML = `${hsunset}:${msunset}`;

    weatherStatus.innerHTML = `Weather Status: ${data.weather[0].description}`;

    let curentStatus = data.weather[0].description;
    console.log(curentStatus)
    if (curentStatus.includes("clear sky")) {
        image.setAttribute("src","img/01d@2x.png")
        
    } else if (curentStatus.includes("few clouds")){
        image.setAttribute("src","img/02d@2x.png")

    }else if (curentStatus.includes("scattered clouds")){
        image.setAttribute("src","img/03d@2x.png")
    }else if (curentStatus.includes("broken clouds")){
        image.setAttribute("src","img/04d@2x.png")
    }else if (curentStatus.includes("shower rain")){
        image.setAttribute("src","img/09d@2x.png")  
    }else if (curentStatus.includes(" rain")){
        image.setAttribute("src","img/10d@2x.png")  
    }else if (curentStatus.includes("thunderstorm")){
        image.setAttribute("src","img/11d@2x.png")  
    }else if (curentStatus.includes("snow")){
        image.setAttribute("src","img/13d@2x.png")  
    }else if (curentStatus.includes("mist")){
        image.setAttribute("src","img/50d@2x.png")  

        
    }


    let days = [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    let mounts = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
 
    day.innerHTML = days[newCity.getDay()];
    date_year.innerHTML= `${mounts[newCity.getUTCMonth()]} ${newCity.getUTCDate()},${newCity.getUTCFullYear()}`
    console.log(data);
    }





   

