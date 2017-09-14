window.addEventListener('load', () => {
  //getWeather();
  getLocation();
})

let temp;

function getWeather (position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  console.log(`get weather ${lat}`);
  let request = new XMLHttpRequest();
  request.open('GET', `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`)
  request.addEventListener('load', () => {
    let response = JSON.parse(request.responseText);
    console.log(response)
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
          getWeather(position)
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function convertTemp (val, temp) {
  let tempOut = document.querySelector('.temp');
  if(val === '' || val === false) {
    console.log(temp)
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

const direction = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];

function degCompass (num) {
  const degrees =  Math.trunc((num/22.5) + 0.5);
  return direction[degrees]
}
