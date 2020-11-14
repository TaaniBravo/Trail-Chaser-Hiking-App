// trail chaser app - javascript for index.html
// VARIABLES
var apiID = "200970639-981a2550ac3c48f2579397ecf3a9b65e";
var queryURL;

function handleUserInfo () {
    // get inputs
    var locationInput = $("#location").val();
    // TO DO - do some checks to make sure a place was already exits
    var radiusInput = $("#radius").val();
    // TO DO - check radius and length are actual numbers
    var lengthInput = $("#length").val();
    var dateInput = $("#date").val();
    var difficultyInput = $("#difficultyInput").val();
    var starInput = $("#ratingInput").val();

    console.log(locationInput);
    console.log(radiusInput);
    console.log(lengthInput);
    console.log(dateInput);
    console.log(difficultyInput);
    console.log(starInput);

    // make ajax call
    handleSearch();

    // display results
}

// handleSearch - make ajax call and get response info for hikes to appear
// TO DO - update the query URL with input from handleUserInfo
function handleSearch() {
    queryURL = `https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=${apiID}`;
      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      // After the data from the AJAX request comes back
        .then(function(response) {
            // console.log(response);
            handleResults(response);
        });
}

// handleResults - display results of first 5 results in card form
function handleResults(response) {
    console.log(response);

}


$("#findBtn").on("click", handleUserInfo);