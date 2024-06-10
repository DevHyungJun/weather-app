// html 날씨 정보 들어갈 요소들
const cityS = document.querySelector('.city');
const descriptionS = document.querySelector('.description');
const temperatureS = document.querySelector('.temperature');
const feelTemperatureS = document.querySelector('.feel-temperature');
const humidityS = document.querySelector('.humidity');
const windS = document.querySelector('.wind'); 
const weatherContainer = document.querySelector('.weather-container');
const weatherIconS = document.querySelector('.weather-icon');
//form 요소
const form = document.querySelector('.weather-form');

const weatherAPIKEY = '93d254bdacea6f6504c11d3e8206bc52';

// 초기화면: 사용자 위치의 날씨 정보
(function () {
  navigator.geolocation.getCurrentPosition(currentLocation, error);
})();

function currentLocation(position) {
    const 위도 = position.coords.latitude;
    const 경도 = position.coords.longitude;
    getCurrentWeather(위도, 경도);
  };
function error() {
  alert('사용자의 위치를 찾을 수 없음');
};

async function getCurrentWeather(위도, 경도) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${위도}&lon=${경도}&appid=${weatherAPIKEY}&units=metric&lang=kr`, {mode: 'cors'});
    const data = await response.json();
    drawWeather(data);
  } catch(error) {
    alert(error);
  }
};

form.addEventListener('submit', (e)=>{
  resetSection();
  e.preventDefault();
  searchCity(e.target.querySelector('#f').value);
});

function drawWeather(data) {  // 화면에 그리는 함수
  cityS.innerHTML = data.name;
  feelTemperatureS.innerHTML = '체감온도: ' + data.main.feels_like + '°C';
  temperatureS.innerHTML = '현재 온도: ' + data.main.temp + '°C';
  humidityS.innerHTML = '습도: ' + data.main.humidity + '%';
  windS.innerHTML = '풍속: ' + data.wind.speed + 'm/s';
  if(data.weather[0].description === '튼구름') {
    descriptionS.innerHTML = '뜬구름'
  } else {
    descriptionS.innerHTML = data.weather[0].description;
  }
  weatherIconS.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
  weatherContainer.classList.remove('error');
  weatherContainer.classList.add('show-weather');
};

// 세계 도시 검색 값 가져오기
async function searchCity(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKEY}&units=metric&lang=kr`, {mode: 'cors'});
    const data = await response.json();
    drawWeather(data);
  } catch(error) {
    feelTemperatureS.innerHTML = error;
    weatherContainer.classList.remove('show-weather');
    weatherContainer.classList.add('error');
  }
};

function resetSection() {
  cityS.innerHTML = '';
  feelTemperatureS.innerHTML = '';
  temperatureS.innerHTML = '';
  humidityS.innerHTML = '';
  windS.innerHTML = '';
  descriptionS.innerHTML = '';
  weatherIconS.setAttribute('src', '');
}