// trail chaser app - javascript for index.html
// VARIABLES
var apiID = "200970639-981a2550ac3c48f2579397ecf3a9b65e";
var queryURL;
var resultsEl = $("#results");
var hikesReturned;
var userHikeSelected;
var locationInput;
var radiusInput;
var lengthInput;
var dateInput;
var difficultyInput;
var starInput;
var lat;
var lon;

var savedCriteria = JSON.parse(localStorage.getItem("savedCriteria")) || [];

function init() {
  if (savedCriteria != []) {
    $("#location").val(savedCriteria.location);
    $("#length").val(savedCriteria.length);
    $("#radius").val(savedCriteria.radius);
    $("#date").val(savedCriteria.date);
    $("#difficultyInput").val(savedCriteria.difficultyInput);
    $("#ratingInput").val(savedCriteria.ratingInput);
  }
}
// handleUserInfo - get user inputs
function handleUserInfo() {
    
    // get inputs
    locationInput = $("#location").val();
    radiusInput = $("#radius").val();
    lengthInput = $("#length").val();
    dateInput = $("#date").val();
    difficultyInput = $("#difficultyInput").val();
    starInput = $("#ratingInput").val();

    let checkSaveCriteria = document.getElementById('checkboxChecker').checked;

    // make ajax call
    handleCity();
    // handleSearch();

    // IF the user doesnt input a city/location name
    if (locationInput === ""){
        $("#location").val("Please enter a valid City Name!");
        $("#results").empty();

        //return; 
    }
    
    else if (checkSaveCriteria === true) {
        
        var userData = {
            location: locationInput, 
            radius: radiusInput, 
            length: lengthInput, 
            date: dateInput, 
            difficultyInput: difficultyInput, 
            ratingInput: starInput
        };

        //savedCriteria.push(userData)

        localStorage.setItem("savedCriteria", JSON.stringify(userData));
        //function that appends info into form
        
    }
    else {
        localStorage.clear("savedCriteria");
    };

}

// handleSearch - make ajax call and get response info for hikes to appear
function handleSearch() {
  queryURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=${radiusInput}&minLength=${lengthInput}&minStars=${starInput}&key=${apiID}`;
  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    // After the data from the AJAX request comes back
    .then(function (response) {
      handleResults(response);
    });
}

// handleResults - display results of first 5 results in card form
function handleResults(response) {
  hikesReturned = response.trails; // store for use when user clicks selection
  resultsEl.empty(); // clearresults section
  for (var i = 0; i < 5; i++) {
    // get difficulty and assign color class
    var difficultyText;
    var difficultyClass;
    console.log(response.trails[i].difficulty.trim());
    switch (response.trails[i].difficulty.trim()){
      case("blackBlack"):
      difficultyText = "Very Difficult";
      difficultyClass = "dBlack";
      break;
      case("black"):
      difficultyText = "Difficult";
      difficultyClass = "dBlack";
      break;
      case("blueBlack"):
      difficultyText = "Intermediate/Difficult";
      difficultyClass = "dBlueBlack";
      break;
      case("blue"):
      difficultyText = "Intermediate";
      difficultyClass = "dBlue";
      break;
      case("greenBlue"):
      difficultyText = "Easy/Intermediate";
      difficultyClass = "dGreen";
      break;
      case("green"):
      difficultyText = "Easy";
      difficultyClass = "dGreen";
      break;
    }
    // create a card with info
    var card = `<div class="card" id="${i}">
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-48x48">
                                    <img src="${response.trails[i].imgSqSmall}" alt="Placeholder image">
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="is-size-4">${response.trails[i].name}</p>
                                    <p>${response.trails[i].stars}<i class="fas fa-star"></i></p>
                                    <p>Location: ${response.trails[i].location}</p> 
                                    <p class="index-difficulty">Difficulty: <span class="${difficultyClass}">${difficultyText}</span></p>
                                </div> 
                            </div> 
                        </div> 
                    </div>`;
    resultsEl.append(card);
    $(".index-difficulty").css("textTransform", "capitalize");
  }
}

function handleCity() {
    const googleAPI = "AIzaSyBhOGyxS_RiEneLIpqf6mUUIL2HI2sEms4";
    
  // First we need to turn the geolocation of the user into a valid address for Google to use.
  const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationInput}&key=${googleAPI}`;

  $.ajax({
    url: geocodeURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    if (response.status == "OK") {
      lat = response.results[0].geometry.location.lat;
      lon = response.results[0].geometry.location.lng;
      console.log(lat, lon);
      handleSearch();
    } else if (response.status == "ZERO_RESULTS") {
      $("#results").empty();
      $("#location").val("Please enter a valid City Name!");
    }
  });
}

// listen for hike result to be clicked on
$("#results").on("click", ".card", function () {
  userHikeSelected = hikesReturned[$(this).attr("id")];
  localStorage.setItem("hikeSelected", JSON.stringify(userHikeSelected));
  window.location.href = "results.html";
});

init();

$("#findBtn").on("click", handleUserInfo);
