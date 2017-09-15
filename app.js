window.addEventListener('load', () => {
  getLocation();
})
// this global var is needed for fahrenheit to celsius conversion to work;
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

    convertTemp(check.checked, temp);
    document.querySelector('.switch').classList.remove('visible');
    document.querySelector('.humidity').innerHTML = `Humidity: ${humidity}%`;
    document.querySelector('.wind').innerHTML = `Wind: ${windDirection} ${wind}mph`;
    document.querySelector('.condition').innerHTML = condition;
    document.querySelector('.location').innerHTML = `Current Forecast for ${location}`;
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

// convert between fahrenheit and celsius
function convertTemp (val, temp) {
  let tempOut = document.querySelector('.temp');
  if(val === '' || val === false) {
    tempOut.innerHTML = `${Math.round(temp * 1.8 + 32)}&#8457`;
  }
  else tempOut.innerHTML = `${Math.round(temp)}&#8451`;
}

  let check = document.querySelector('.checkbox');
  check.addEventListener('click', () => {
    console.log(check.checked);
    convertTemp(check.checked, temp);
  });

//converting degrees to compass direction
function degCompass (num) {
  const direction = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
  const degrees =  Math.trunc((num/22.5) + 0.5);
  return direction[degrees]
}

//api key AIzaSyCW15HLkARKoWKBePgLftUdKKQIyxaQYCM

//gets input from location element
const addy = document.querySelector('.locate')
  addy.addEventListener('keyup',(e) => {
    let key = e.which || e.keyCode;
    let address = addy.textContent;
    console.log(address);
    if (key === 13) {
      getAddy(address);
      }
  })



//convert addy to lat lon
 function getAddy (addy) {
   console.log(addy);
   if (addy == 'undefined'|| addy === null || addy === '') {
     let locate = document.querySelector('.locate');
     locate.innerHTML = `<span contenteditable="true" class="locate">Please enter a valid zip code</span>`;
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
