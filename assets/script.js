$(document).ready(handleweatherinformation)

// This button events apply to the modal and what happens when each of the buttons are clicked.
$('#yesBtn').on('click', handleGeoLocation)
// On btn click the modal closes.
$('#noBtn').on('click', () => {
  $('.modal').removeClass('is-active')
})

function handleGeoLocation() {
  // On btn click the modal closes.
  $('.modal').removeClass('is-active')
  // THEN we pull the geo location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleMap, failedToLocate)
  }
  else {
    return;
  }
}

function failedToLocate() {

}

function handleMap(position) {

  let userLatitude = position.coords.latitude
  let userLongitude = position.coords.longitude
  console.log(position.coords.latitude)
  console.log(position.coords.longitude)
}


function handleweatherinformation() {

    var APIKey = "52aa85fe9180c06fe869a1a3e7d7de19"
    var lat = 45.7581747

    var long = -121.5425736
var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid="+ APIKey;



$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

     
    console.log (queryURL)

    
    console.log(response)
    appendweatherinfo(response)
  })}

function appendweatherinfo(response) {

for (let i = 0; i <= 7; i++) {
    
    var weatherAppend = $(`#weatherinfo${i}`); 
    var tempF = ( response.daily[i].temp.day - 273.15) * 1.80 +32 

    $("<p>").text( tempF.toFixed(2) + "°F" ).appendTo(weatherAppend);



    console.log(( response.daily[i].temp.day - 273.15) * 1.80 +32 );
     
}



}


