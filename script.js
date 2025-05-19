let nav;
const appID = "06d12b314bb4c17941caf958f729dcdd";
const weatherBaseApi = "http://api.openweathermap.org/data/2.5/weather";
const geocodingBaseApi = "http://api.openweathermap.org/geo/1.0/direct";

const inputSearch = document.getElementById("city-name");
const searchButton = document.getElementById("search-button");

async function getWeatherConditionsByPosition(lat, lng) {
  try {
    const response = await fetch(
      `${weatherBaseApi}?lat=${lat}&lon=${lng}&lang=es&units=metric&appid=${appID}`
    );
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log("DATA", data);
    return data;
  } catch (error) {
    console.log("ERROR", error);
    return error;
  }
}

async function getWeatherConditionsByCityName(city) {
  try {
    const response = await fetch(
      `${geocodingBaseApi}?q=${city}&limit=5&appid=${appID}`
    );
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log("DATA City", data);
    return data;
  } catch (error) {
    console.log("ERROR City", error);
    return error;
  }
}

async function success(position) {
  const { longitude, latitude } = position.coords;
  try {
    await getWeatherConditionsByPosition(latitude, longitude);
  } catch (error) {
    console.log("ERROR", error);
  } finally {
    navigator.geolocation.clearWatch(nav);
  }
}

function error(e) {
  console.log("ERROR", e);
}

options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
};

searchButton.addEventListener("click", function () {
  let cityNameValue = inputSearch.value;
  console.log("Value", cityNameValue);
  getWeatherConditionsByCityName(cityNameValue);
});

// if (navigator.geolocation) {
//   nav = navigator.geolocation.watchPosition(success, error, options);
// } else {
//   console.error("Geolocalización no soportada en este navegador");
// }
