(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.addEventListener('load', () => {
  getLocation();
})
let temp;

function getWeather (lat, lon) {
  let request = new XMLHttpRequest();
  request.open('GET', `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`)
  request.addEventListener('load', () => {
    let response = JSON.parse(request.responseText);
    temp = response.main.temp;
    const humidity = response.main.humidity;
    const wind = response.wind.speed;
    const condition = response.weather[0].description;
    const location = response.name;
    const windDirection = degCompass(response.wind.deg);
    console.log(response);

    convertTemp(check.checked, temp);
    document.querySelector('.switch').classList.remove('visible');
    document.querySelector('.humidity').innerHTML = `Humidity: ${humidity}%`;
    document.querySelector('.wind').innerHTML = `Wind: ${windDirection} ${wind}mph`;
    document.querySelector('.condition').innerHTML = condition;
    document.querySelector('.location').innerHTML = `Current Forecast for ${location}`;
    getConditions(condition);
  });
  request.send();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          getWeather(lat, lon)
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function convertTemp (val, temp) {
  let tempOut = document.querySelector('.temp');
  if(val === '' || val === false) {
    tempOut.innerHTML = `${Math.round(temp * 1.8 + 32)}&#8457`;
  }
  else tempOut.innerHTML = `${Math.round(temp)}&#8451`;
}

  let check = document.querySelector('.checkbox');
  check.addEventListener('click', () => {
    convertTemp(check.checked, temp);
  });

function degCompass (num) {
  const direction = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
  const degrees =  Math.trunc((num/22.5) + 0.5);
  return direction[degrees]
}


const addy = document.querySelector('.zip')
  addy.addEventListener('keyup',(e) => {
    let key = e.which || e.keyCode;
    let address = addy.value;
    console.log(address);
    if (key === 13) {
      getAddy(address);
      }
  })



 function getAddy (addy) {
   console.log(addy);
   if (addy == 'undefined'|| addy === null || addy === '') {
     let locate = document.querySelector('.zip');
     locate.innerHTML = `<span class="locate">Please enter a valid zip code</span>`;
  } else {
    let request = new XMLHttpRequest();
    request.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${addy}&key=AIzaSyCW15HLkARKoWKBePgLftUdKKQIyxaQYCM`)
    request.addEventListener('load', () => {
      let response = JSON.parse(request.responseText);

      const lat = response.results[0].geometry.location.lat;
      const lon = response.results[0].geometry.location.lng;
      getWeather(lat, lon);
    })
    request.send();
  }
 }

function getConditions (con) {
  const sun = document.querySelector('.sun');
  const cloud = document.querySelector('.cloud');
  const fog = document.querySelector('.fog');
  const rain = document.querySelector('.rain');
  const snow = document.querySelector('.snow');
  const lightning = document.querySelector('.lightning');
  console.log('shamon')

  con.includes('clouds') ? cloudy() :
  con.includes('clear') ? sunny() :
  con.includes('thunderstorm') ? thunder() :
  con.includes('snow') ? snowy() :
  con.includes('rain') ? rainy() : sunny();
}

const background = document.querySelector('.conditions');
const newDiv = document.createElement('div');
const sunny = () => {
  console.log('sunny var working');
  document.querySelector('.sun').classList.remove('hide');
  background.classList.add('sun');
};

const cloudy = () => {
  document.querySelector('.cloud').classList.remove('hide');
  document.querySelector('.sun').classList.remove('hide');
}

const foggy = () => {
  document.querySelector('.fog').classList.remove('hide');
  document.querySelector('.cloud').classList.remove('hide');
  document.querySelector('.sun').classList.remove('hide');
}

const rainy = () => {
  document.querySelector('.rain').classList.remove('hide');
  document.querySelector('.cloud').classList.remove('hide');
}

const snowy = () => {
  document.querySelector('.snow').classList.remove('hide');
  document.querySelector('.cloud').classList.remove('hide');
}

const thunder = () => {
  document.querySelector('.cloud').classList.remove('hide');
  document.querySelector('.lightning').classList.remove('hide');
}

},{}]},{},[1]);
