var subjects = ["Star Wars", "Street FIghter II", "Jonny Quest", "Elite Dangerous", "XCOM"];

function displayGifs() {

  var subjects = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subjects + "&api_key=YG4Y7s542RabyCVPvWtSZdvlIzYe5NTF&limit=10"
console.log(subjects);
 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#gif-appear-here").empty();
    
    var results = response.data;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      // Omit mature content
      if (results[i].rating !== "r" && results[i].rating !== "PG-13") {
        var gifDiv = $("<div class=gifDiv>");
        var rating = results[i].rating;
        var ratingText = $("<p>").text("Rating " + rating);
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url
        var subjectImage = $("<img class=gifImage>");
             
        //Starting with stills
        subjectImage.attr('src', still);
        subjectImage.attr('data-still', still)
        subjectImage.attr('data-animate', animated);
        subjectImage.attr('data-state', 'still');

        gifDiv.append(ratingText);
        gifDiv.append(subjectImage);

        $("#gifs-appear-here").prepend(gifDiv)
      }
    
    }
  });

    // Onclick function to animate/pause gifs
$('#gifs-appear-here').on("click", ".gifImage", function() {
//console.log("Image clicked");
  var state = $(this).attr('data-state');
  // If state = still, on click will animate the gif
  if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');}
  // Otherwise, if state != still, gif will pause on click   
  else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
  }
});
}



    //Creates Buttons
function renderButtons() {
  $('#buttons-view').empty();
  for (var i = 0; i < subjects.length; i++) {
    var addButton = $("<button>");
    addButton.addClass("subjects");
    addButton.attr("data-name", subjects[i]);
    addButton.text(subjects[i]);
    $("#buttons-view").append(addButton);
  }
  };

    // Single button clicked
    $("#add-choice").on("click", function (event) {
      event.preventDefault();
      var choice = $("#input-choice").val().trim();
      subjects.push(choice);
      renderButtons();
      $("#input-choice").val("");

      
  
    })




$(document).on("click", ".subjects", displayGifs);
renderButtons();
