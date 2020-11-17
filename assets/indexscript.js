// trail chaser app - javascript for index.html
// VARIABLES
var apiID = "200970639-981a2550ac3c48f2579397ecf3a9b65e";
var queryURL;

// handleUserInfo - get user inputs
function handleUserInfo() {
    // get inputs
    var locationInput = $("#location").val();
    // TO DO - do some checks to make sure a place was already exits
    var radiusInput = $("#radius").val();
    // TO DO - check radius and length are actual numbers
    var lengthInput = $("#length").val();
    var dateInput = $("#date").val();
    var difficultyInput = $("#difficultyInput").val();
    var starInput = $("#ratingInput").val();
    // TO DO - collect click from "remember my criteria" checkbox

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
    if (checkSaveCriteria = true) {
        //var locationInput = $("#location").val();
        //var radiusInput = $("#radius").val();
        //var lengthInput = $("#length").val();
        //var dateInput = $("#date").val();
        //var difficultyInput = $("#difficultyInput").val();
        //var starInput = $("#ratingInput").val();

        var userData = [locationInput, radiusInput, lengthInput, dateInput, difficultyInput, starInput]

        //localStorage.setItem("flag", "set");

        //var userData = [
            //{
                //name: location,
                //value: locationInput,
            //},
            //{
                //name: radius,
                //value: radiusInput,
            //},
            //{
                //name: length,
                //value: lengthInput,
            //},
            //{
                //name: date,
                //value: dateInput,
            //},
            //{
                //name: difficultyInput,
                //value: difficultyInput,
            //},
            //{
                //name: ratingInput,
                //value: starInput,
            //}
        //];

        //$.each(userData, function (i, index) {
            //localStorage.setItem(obj.name, obj.value);
        //});
        

        //if (localStorage.getItem("flag") == "set") {
            //$("header").after("<p>This form has saved data!</p>");

            //$.each(userData, function (i, obj) {
                //$("[name= '" + obj.name + "']").val(localStorage.getItem(obj.name, obj.value));

            //});




            localStorage.setItem("location", locationInput);
            localStorage.setItem("radius", radiusInput);
            localStorage.setItem("length", lengthInput);
            localStorage.setItem("date", dateInput);
            localStorage.setItem("difficultyInput", difficultyInput);
            localStorage.setItem("ratingInput", starInput);
            console.log(userData);

            //function persistInput(input) {
            //var key = "input-" + input.id;

            //var storedValue = localStorage.getItem(key);

            //if (storedValue)
            //input.value = storedValue;

            //input.addEventListener('input', function () {
            //localStorage.setItem(key, input.value);
            //});
            //}
            //function handleStorage() {

            //e.preventDefault();

            //var userData = document.getElementById('form-group').serializeArray();
            //console.log(userData);
            //};

            console.log(taylorSwift);



        }
        else {
            console.log(checkSaveCriteria);
        };


    };

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
            .then(function (response) {
                // console.log(response);
                handleResults(response);
            });
    }

    // handleResults - display results of first 5 results in card form
    function handleResults(response) {
        // console.log(response);
        $("#results").empty();
        for (var i = 0; i < 5; i++) {
            // console.log(response.trails[i]);
            $("#results").append(response.trails[i].name);
            $("#results").append("<br>");
            console.log(response.trails[i].name);
            console.log(response.trails[i].imgSqSmall);
            console.log(response.trails[i].stars);
        }

    }

    // TO DO - create listener for when user clicks on search result

    // TO DO - create function to save search criteria if user clicks checkbox



    //if ("box is checked") {
    //store my criteria checked
    //}
    // function handleStorage() {}


    $("#findBtn").on("click", handleUserInfo);
