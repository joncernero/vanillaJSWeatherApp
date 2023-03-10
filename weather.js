const searchInput = document.querySelector('.zipcode');
const weatherDisplay = document.querySelector('.weatherDisplay');
const dataDisplay = document.querySelector('.dataDisplay');

console.log('thanks for checking this app out!');

const weatherPics = {
  dawn: './assets/saad-chaudhry-cYpqYxGeqts-unsplash.jpg',
  day: './assets/mick-haupt-OVX3oiL5PsE-unsplash.jpg',
  dusk: './assets/benjamin-davies-9b5dvrjb05g-unsplash.jpg',
  night: './assets/nathan-jennings-VsPsf4F5Pi0-unsplash.jpg',
};

function lookUpZip(e) {
  e.preventDefault();
  let searchZip = this.querySelector('[name=zip]').value;
  if (!searchZip) {
    alert('Please Enter ZipCode');
  } else if (searchZip) {
    fetchWeather(searchZip);
  }
  this.reset();
}

async function fetchWeather(zipCode) {
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},US&appid=c03667c8e0d1189bf74000c04cbad51f`;

  await fetch(weatherAPI)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${data.coord.lat}&lon=${data.coord.lon}&limit=5&appid=c03667c8e0d1189bf74000c04cbad51f`
      )
        .then((response) => {
          return response.json();
        })
        .then((content) => {
          displayData(data, content);
        });
    });
}

function displayData(data, content) {
  let background = '';
  let date = new Date(data.dt * 1000);
  let hour = date.getHours();

  if (hour >= 6 && hour <= 9) {
    background = `url(${weatherPics.dawn})`;
  } else if (hour >= 10 && hour <= 17) {
    background = `url(${weatherPics.day})`;
  } else if (hour >= 18 && hour <= 20) {
    background = `url(${weatherPics.dusk})`;
  } else {
    background = `url(${weatherPics.night})`;
  }
  weatherDisplay.style.backgroundImage = background;

  return (dataDisplay.innerHTML = `
    <h5>${content[0].state}</h5>
    <h5>${date.toLocaleDateString()}</h5>
    <h5>${date.toLocaleTimeString()}</h5>
    <h1>${content[0].name}</h1>
    <h3>${data.weather[0].description}</h3>
    <h2>${Math.floor(data.main.temp * 1.8 - 459.67)}??</h2>
    <p>Feels Like: ${Math.floor(data.main.feels_like * 1.8 - 459.67)}??</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Today's High: ${Math.floor(data.main.temp_max * 1.8 - 459.67)}??</p>
    <p>Today's Low: ${Math.floor(data.main.temp_min * 1.8 - 459.67)}??</p>
   `);
}

searchInput.addEventListener('submit', lookUpZip);
