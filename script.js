let nav;

function success(position) {
  console.log("Hola", position);
  navigator.geolocation.clearWatch(nav);
}

function error(e) {
  console.log("ERROR", e);
}

options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
};

nav = navigator.geolocation.watchPosition(success, error, options);
