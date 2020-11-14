
function searchTrail () {
    var locationInput = $("#location").val();
    // TO DO - do some checks to make sure a place was already exits
    console.log(locationInput);
    var radiusInput = $("#radius").val();
    // TO DO - check radius and length are actual numbers

    console.log(radiusInput);
    var lengthInput = $("#length").val();
    var dateInput = $("#date").val();
    console.log(lengthInput);
    console.log(dateInput);
    var difficultyInput = $("#difficultyInput").val();
    console.log(difficultyInput);
    var starInput = $("#ratingInput").val();
    console.log(starInput);
}



$("#findBtn").on("click", searchTrail);