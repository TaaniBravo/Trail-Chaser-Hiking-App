// trail chaser app - javascript for index.html
// VARIABLES
var apiID = "200970639-981a2550ac3c48f2579397ecf3a9b65e";
var queryURL;
var resultsEl = $("#results");
var hikesReturned;
var hikeSelected; 
var locationInput;
var radiusInput;
var lengthInput;
var dateInput;
var difficultyInput;
var starInput;

var savedCriteria = JSON.parse(localStorage.getItem("savedCriteria")) || [];

// handleUserInfo - get user inputs
function handleUserInfo() {
    // get inputs
    locationInput = $("#location").val();
    // TO DO - do some checks to make sure a place was already exits
    radiusInput = $("#radius").val();
    // TO DO - check radius and length are actual numbers
    lengthInput = $("#length").val();
    dateInput = $("#date").val();
    difficultyInput = $("#difficultyInput").val();
    starInput = $("#ratingInput").val();

    let checkSaveCriteria = document.getElementById('checkboxChecker').checked;

    // I Created this variable just to see if my if statement was working.
    var taylorSwift = "We're all Taylor Swift fans here!";

    console.log(locationInput);
    console.log(radiusInput);
    console.log(lengthInput);
    console.log(dateInput);
    console.log(difficultyInput);
    console.log(starInput);

    console.log(checkSaveCriteria);

    // make ajax call
    handleSearch();

    // display results
    if (checkSaveCriteria === true) {
        //var locationInput = $("#location").val();
        //var radiusInput = $("#radius").val();
        //var lengthInput = $("#length").val();
        //var dateInput = $("#date").val();
        //var difficultyInput = $("#difficultyInput").val();
        //var starInput = $("#ratingInput").val();

        var userData = {
            location: locationInput, 
            radius: radiusInput, 
            length: lengthInput, 
            date: dateInput, 
            difficultyInput: difficultyInput, 
            ratingInput: starInput
        };

        savedCriteria.push(userData)

        //$.each(userData, function (i, index) {
        //localStorage.setItem(key, value);
        //});

    

        localStorage.setItem("savedCriteria", JSON.stringify(savedCriteria));
        //function that appends info into form
        
        
        //function handleStorage() {
        //var savedUserData = localStorage.getItem("location");
        //document.getElementById("location").innerText = savedUserData;
        //};
        //$.each(userData, function (i, index) {
            //localStorage.getItem(index.key, index.value);
            //document.getElementById().innerHTML
        //});
        //e.preventDefault();

        console.log(taylorSwift);

    }
    else {
        console.log(checkSaveCriteria);
    };


};

// handleSearch - make ajax call and get response info for hikes to appear
// TO DO - update the query URL with input from handleUserInfo
function handleSearch() {

    // get lat and lon for city; placeholders for now
    var lat = 47.6062;
    var lon = -122.3321;
    // TO DO - there is no difficulty input parameter

    // queryURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=100&key=${apiID}`;

    queryURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=${radiusInput}&minLength=${lengthInput}&minStars=${starInput}&key=${apiID}`;
    console.log(queryURL);
    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
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
                                    <p class="title is-4">${response.trails[i].name}</p>
                                    <p class="subtitle is-6">${response.trails[i].stars}</p>
                                </div> 
                            </div> 
                        </div> 
                    </div>`;
        resultsEl.append(card);
    }

}

// TO DO - create listener for when user clicks on search result
$("#results").on("click", ".card", function() {
    // console.log("you clicked a hike!" + $(this).attr('id'));
    hikeSelected = hikesReturned[$(this).attr('id')];
    // use hikeSelected in script.js
    // console.log(hikeSelected);
    localStorage.setItem("hikeSelected", JSON.stringify(hikeSelected));
    window.location.href = "results.html";
});

// TO DO - create function to save search criteria if user clicks checkbox


$("#findBtn").on("click", handleUserInfo);
