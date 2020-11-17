const hikeSelected = JSON.parse(localStorage.getItem('hikeSelected'))

$(document).ready(handleWeatherInfo)
$(document).ready(handlenameanddescription)
// This button events apply to the modal and what happens when each of the buttons are clicked.
$('#closeBtn').on('click', handleGeoLocation)

// Initialize and add the map
function initMap() {
  let lat = 47.5518333
  let long = -122.82669

  // The location of hikeLocation
  const hikeLocation = { lat: lat, lng: long };
  // The map, centered at hikeLocation
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: hikeLocation,
  });
  
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

  // LET the destination be EQUAL to this new Latitude and Longitude.
  let destination = new google.maps.LatLng(47.5518333, -122.82669);
  // Variables that will create new directions and renderer them to the map for us.
  let directionsService = new google.maps.DirectionsService();
  let directionsRenderer = new google.maps.DirectionsRenderer();

  // THEN we are going to create a new map so that we can get our route displayed out of the scope of the initMap function.
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: destination,
  });

  let request = {
    origin: userAddress,
    destination: destination,
    travelMode: "DRIVING"
  }

  directionsService.route(request, function(result, status) {

    if (status == 'OK') {
      directionsRenderer.setMap(map)
      directionsRenderer.setDirections(result);
    }
  });
}

function handleWeatherInfo() {

  var APIKey = "52aa85fe9180c06fe869a1a3e7d7de19"
  var lat = hikeSelected.latitude

  var long = hikeSelected.longitude

  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + APIKey;



  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

     console.log(response)

    appendweatherinfo(response)
  })
}

function appendweatherinfo(response) {

  for (let i = 0; i <= 7; i++) {

    var weatherAppend = $(`#weatherinfo${i}`);
    var tempF = (response.daily[i].temp.day - 273.15) * 1.80 + 32

    $(`#weathericon${i}`).attr('src', `https://openweathermap.org/img/wn/${response.daily[i].weather[0].icon}@2x.png`);
    console.log(response.daily[i].weather[0].icon)
    $("<p>").text('Temp: ' + tempF.toFixed(2) + "°F").appendTo(weatherAppend).addClass('is-size-4');

  }



}

function handlenameanddescription () {

$("#hikeName").text(hikeSelected.name)
$("#difficulty").text(hikeSelected.difficulty)
$("#description").text(hikeSelected.summary)

}


