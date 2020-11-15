$(document).ready(handleweatherinformation)

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

  // LET these variables provide the directions and the display them.
  let directionsDisplay = new google.maps.DirectionsRenderer;

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

  directionsDisplay.setMap(map)
}

function handleGeoLocation() {
  // On btn click the modal closes.
  $('.modal').removeClass('is-active')
  // THEN we pull the geo location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleMap)
  }
  else {
    return;
  }
}

function handleMap(position, destination) {
  const googleAPI = 'AIzaSyBhOGyxS_RiEneLIpqf6mUUIL2HI2sEms4'
  // LET these variables be equal to the user's latitude and longitude
  let userLatitude = position.coords.latitude
  let userLongitude = position.coords.longitude
  let directionsService = new google.maps.DirectionsService;
  // First we need to turn the geolocation of the user into a valid address for Google to use.
  const reverseGeoURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLatitude},${userLongitude}&key=${googleAPI}`

  $.ajax({
    url: reverseGeoURL,
    method: 'GET'
  }).then(function (response) {
    let placeID = response.results[8].place_id
    let lat = 47.5518333
    let long = -122.82669
    let destination = new google.maps.LatLng(lat, long);

    // const directionsURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${placeID}&destination=${lat},${long}&key=${googleAPI}`

    // $.ajax({
    //   url: directionsURL,
    //   method: 'GET'
    // }).then(function (response) {
    //   console.log(response)
    // })
    let request = {
      origin: placeID,
      destination: destination,
      travelMode: "DRIVING"
    }
    directionsService.route(request, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      }
    })
  })

}

function handleweatherinformation() {

  var APIKey = "52aa85fe9180c06fe869a1a3e7d7de19"
  var lat = 45.7581747

  var long = -121.5425736
  var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + APIKey;



  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {


    console.log(queryURL)


    console.log(response)
    appendweatherinfo(response)
  })
}

function appendweatherinfo(response) {

  for (let i = 0; i <= 7; i++) {

    var weatherAppend = $(`#weatherinfo${i}`);
    var tempF = (response.daily[i].temp.day - 273.15) * 1.80 + 32

    $("<p>").text(tempF.toFixed(2) + "°F").appendTo(weatherAppend);



    console.log((response.daily[i].temp.day - 273.15) * 1.80 + 32);

  }



}


