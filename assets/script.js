// DECLARE VARIABLES
let directionsRenderer;
let directionsService;
let map;

$(document).ready(handleWeatherInfo)

// This button events apply to the modal and what happens when each of the buttons are clicked.
$('#closeBtn').on('click', handleGeoLocation)
// On btn click the modal closes.
$('#failedBtn').on('click', () => {
  $('#failedModal').removeClass('is-active')
})

// Initialize and add the map
function initMap() {
  let lat = 47.5518333
  let long = -122.82669

  let directionsService = new google.maps.DirectionsService;
  let directionsRenderer = new google.maps.DirectionsRenderer;

  // The location of hikeLocation
  const hikeLocation = { lat: lat, lng: long };
  // The map, centered at hikeLocation
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: hikeLocation,
  });
  directionsRenderer.setMap(map)
  // The marker, positioned at hikeLocation
  const marker = new google.maps.Marker({
    position: hikeLocation,
    map: map,
  });

 
}

function handleGeoLocation() {
  // On btn click the modal closes.
  $('.modal').removeClass('is-active')
  // THEN we pull the geo location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleUserAddress)
  }
  else {
    return;
  }
}

function handleUserAddress(position) {
  const googleAPI = 'AIzaSyBhOGyxS_RiEneLIpqf6mUUIL2HI2sEms4'

  // LET these variables be equal to the user's latitude and longitude
  let userLatitude = position.coords.latitude
  let userLongitude = position.coords.longitude

  // First we need to turn the geolocation of the user into a valid address for Google to use.
  const reverseGeoURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLatitude},${userLongitude}&key=${googleAPI}`

  $.ajax({
    url: reverseGeoURL,
    method: 'GET'
  }).then(function (response) {
    // console.log(response)
    let userAddress = response.results[0].formatted_address
    calcRoute(userAddress)
  })
}

function calcRoute(userAddress) {

  let destination = new google.maps.LatLng(47.5518333, -122.82669);
  let directionsService = new google.maps.DirectionsService
  let directionsRenderer = new google.maps.DirectionsRenderer

  let request = {
    origin: userAddress,
    destination: destination,
    travelMode: "DRIVING"
  }

  console.log(request)
  directionsService.route(request, function(result, status) {
    console.log(result)
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
}

function handleWeatherInfo() {

  var APIKey = "52aa85fe9180c06fe869a1a3e7d7de19"
  var lat = 45.7581747

  var long = -121.5425736
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + APIKey;



  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    appendweatherinfo(response)
  })
}

function appendweatherinfo(response) {

  for (let i = 0; i <= 7; i++) {

    var weatherAppend = $(`#weatherinfo${i}`);
    var tempF = (response.daily[i].temp.day - 273.15) * 1.80 + 32

    $("<p>").text(tempF.toFixed(2) + "°F").appendTo(weatherAppend);

  }



}


