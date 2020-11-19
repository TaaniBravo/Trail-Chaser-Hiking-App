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
var starInput;
var lat;
var lon;

var savedCriteria = JSON.parse(localStorage.getItem("savedCriteria")) || [];

function init() {
  if (savedCriteria != []) {
    $("#location").val(savedCriteria.location);
    $("#length").val(savedCriteria.length);
    $("#radius").val(savedCriteria.radius);
    $("#ratingInput").val(savedCriteria.ratingInput);
  }
}
// handleUserInfo - get user inputs
function handleUserInfo() {
    
    // get inputs
    locationInput = $("#location").val();
    // TO DO - do some checks to make sure a place was already exits
    radiusInput = $("#radius").val();
    // TO DO - check radius and length are actual numbers
    lengthInput = $("#length").val();
    starInput = $("#ratingInput").val();

    let checkSaveCriteria = document.getElementById('checkboxChecker').checked;

    
    // make ajax call
    handleCity();
    // handleSearch();

    // IF the user doesnt input a city/location name
    if (locationInput === ""){
        console.log("hellooo hiker");
        $("#location").val("Please enter a valid City Name!");
        //return; 
    }
    else if (checkSaveCriteria === true) {
        
        var userData = {
            location: locationInput, 
            radius: radiusInput, 
            length: lengthInput,  
            ratingInput: starInput
        };

        localStorage.setItem("savedCriteria", JSON.stringify(userData));
        //function that appends info into form
        
    }
    else {
        localStorage.clear("savedCriteria");
    };

}

// handleSearch - make ajax call and get response info for hikes to appear
// TO DO - update the query URL with input from handleUserInfo
function handleSearch() {
  // TO DO - there is no difficulty input parameter

  queryURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=${radiusInput}&minLength=${lengthInput}&minStars=${starInput}&key=${apiID}`;
  console.log(queryURL);
  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    // After the data from the AJAX request comes back
    .then(function (response) {
      console.log(response);
      handleResults(response);
    });
}

// handleResults - display results of first 5 results in card form
function handleResults(response) {
  // console.log(response);
  hikesReturned = response.trails; // store for use when user clicks selection
  // console.log(hikesReturned)
  resultsEl.empty(); // clearresults section
  for (var i = 0; i < 5; i++) {
    // console.log(response.trails[i]);
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
                                    <p class="index-difficulty">Difficulty: ${response.trails[i].difficulty}</p>
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

// TO DO - create listener for when user clicks on search result
$("#results").on("click", ".card", function () {
  // console.log("you clicked a hike!" + $(this).attr('id'));
  userHikeSelected = hikesReturned[$(this).attr("id")];
  // use userHikeSelected in script.js
  // console.log(userHikeSelected);
  localStorage.setItem("hikeSelected", JSON.stringify(userHikeSelected));
  window.location.href = "results.html";
});

// TO DO - create function to save search criteria if user clicks checkbox

init();
$("#findBtn").on("click", handleUserInfo);
