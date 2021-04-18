let theCity = document.querySelector("#theCity");
let appKey = '1ee17a0fd44ca915e56b9bafc520fb32&units';
let cityInfo = document.querySelector("#forcast0");
let currentTime = moment().format("MM/DD/YYYY");
let searchBtn = document.querySelector("#searchBtn");
let userSelection = document.querySelector("#search-input");
let cityList = document.querySelector("#historyList");
let cityBtn = document.querySelector("cityBtn");
let main = document.querySelector('main');
let aside = document.querySelector('aside');




function getCurrentApi(userPick) {
    main.style.display = "block";

let weatherData = 'https://api.openweathermap.org/data/2.5/weather?q=' + userPick + '&units=imperial&appid=' + appKey;

fetch(weatherData)
    .then(function(currResponse) {
        return currResponse.json();

    })
    .then(function(weatherData) {

        let currLat = weatherData.coord.lat;
        let currLon = weatherData.coord.lon;

        let multiWeatherData = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + currLat + '&lon=' + currLon + '&exclude=hourly&appid=' + appKey + '=imperial';

    

        fetch(multiWeatherData)
        .then(function(multiResponse) {
            return multiResponse.json();
    
        })
        .then(function(multiWeatherData) {
        



            $("#forcast0").empty();

        let cityTemp = document.createElement('li');
        let cityWindSpeed = document.createElement('li');
        let cityHumidity = document.createElement('li');
        let cityUv = document.createElement('li');
        var cityimgEl = document.createElement('img');
        cityimgEl.setAttribute(
            'src',
            `http://openweathermap.org/img/w/${multiWeatherData.daily[0].weather[0].icon}.png`
          );

        
        theCity.textContent = weatherData.name + " (" + currentTime + ")" + " ";
        cityTemp.textContent = "Temp: " +  multiWeatherData.daily[0].temp.max + "°F"
        cityWindSpeed.textContent = "Wind: " + multiWeatherData.daily[0].wind_speed + " MPH";
        cityHumidity.textContent = "Humidity: " + multiWeatherData.daily[0].humidity + " %";
        cityUv.textContent = "UV index: " + multiWeatherData.daily[0].uvi; 
       
        theCity.appendChild(cityimgEl);
        cityInfo.appendChild(cityTemp);
        cityInfo.appendChild(cityWindSpeed);
        cityInfo.appendChild(cityHumidity);
        cityUv.id = "currUv";
        cityInfo.appendChild(cityUv);

        let colorChange = document.querySelector("#currUv");
        let uvValue = multiWeatherData.daily[0].uvi;

        if ( uvValue < 3) {
            colorChange.classList.add("green");
        }
        else if ((uvValue >= 3) && (uvValue < 6)) {
            colorChange.classList.add("yellow");
        }
        else if ((uvValue >= 6) && (uvValue < 8)) {
            colorChange.classList.add("yellow");
        }
        else if (uvValue > 8) {
            colorChange.classList.add("red");
        }
        
      
      
            
        for (let i = 1; i < 6; ++i) {

            $("#forcast" + i).empty();
           
            let currentElement = document.querySelector("#forcast" + i);
            
            let currentDate = moment().add(i, 'days');
            

           
            
            let theDate = document.createElement('li');
            let currentTemp = document.createElement('li');
            let currWindSpeed = document.createElement('li');
            let currHumidity = document.createElement('li');
            let currUv = document.createElement('li');
            var imgEl = document.createElement('img');
            imgEl.setAttribute(
                'src',
                `http://openweathermap.org/img/w/${multiWeatherData.daily[i].weather[0].icon}.png`
             );

    
            theDate.textContent = " (" + currentDate._d + ")" + " ";
            currentTemp.textContent = "Temp: " +  multiWeatherData.daily[i].temp.max + "°F"
            currWindSpeed.textContent = "Wind: " + multiWeatherData.daily[i].wind_speed + " MPH";
            currHumidity.textContent = "Humidity: " + multiWeatherData.daily[i].humidity + " %";
            currUv.textContent = "UV index: " + multiWeatherData.daily[i].uvi; 
        
         
            
            currentElement.appendChild(theDate);
            currentElement.appendChild(imgEl);
            currentElement.appendChild(currentTemp);
            currentElement.appendChild(currWindSpeed);
            currentElement.appendChild(currHumidity);
            currentElement.appendChild(currUv);


        }
       
    
        });
  

    })

}


searchBtn.addEventListener("click", function () {


    let savedCity = JSON.parse(localStorage.getItem("savedCity")) || [];
    let userPick = userSelection.value.trim();

    if (userPick === "") {
        return;
    }

    let newCity = {
        name: userPick
    };

    if (savedCity.length > 9) {
        let last = savedCity.pop();
    }
    savedCity.unshift(newCity);
    localStorage.setItem("savedCity" , JSON.stringify(savedCity));
    userSelection.value = '';
    userSelection.setAttribute("placeholder", newCity.name);

   
    getCurrentApi(userPick);
    displayHistory();
    main.style.display = "block";

});

function displayHistory() {

    main.style.display = "none";

    cityList.textContent = "";

    let newCityList = JSON.parse(localStorage.getItem("savedCity")) || [];

    for(i = 0; i < newCityList.length; i++) {

        let newCityName = document.createElement("button");
        newCityName.classList.add("historyButton");
        newCityName.id = "pick" + i;
        newCityName.textContent = newCityList[i].name;
        cityList.appendChild(newCityName);

        newCityName.addEventListener("click", function() {
            
           let historyPick = newCityName.textContent;
           getCurrentApi(historyPick);
            
        });
        

        
    }
    

}

    

   
displayHistory();


