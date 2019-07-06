var subjects = ["Bunnies", "Giraffes", "Kittens", "Puppies", "Pandas", "Bears"," Skunks", "Hedgehogs"];
//var subjects =[""];
function displayGifs() {
  ('displayGifs', this)
  var subjects = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subjects + "&api_key=YG4Y7s542RabyCVPvWtSZdvlIzYe5NTF&limit=10";
 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#gifs-appear-here").empty();
    var results = response.data;
    
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

        //gifDiv.append(ratingText);
        gifDiv.append(subjectImage);

        $("#gifs-appear-here").prepend(gifDiv)
      }

    }
  });

}
// Onclick function to animate/pause gifs
$(document).on("click", ".gifImage", function () {
 ("Image clicked", this);
  var state = $(this).attr('data-state');
  var animate = $(this).attr('data-animate')
  var still = $(this).attr('data-still')
  // If state = still, on click will animate the gif
    if (state === 'still') {
    $(this).attr('src', animate);
    $(this).attr('data-state', 'animate');
  }
  // Otherwise, if state != still, gif will pause on click   
  else {
    $(this).attr('src', still);
    $(this).attr('data-state', 'still');
  }
});

//Creates Buttons
function renderButtons() {
 ('renderButtons', this)
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
 ('addChoice', this)
  event.preventDefault();
  var choice = $("#input-choice").val().trim();
  subjects.push(choice);
 (subjects, choice)
  renderButtons();
  $("#input-choice").val("");



})
renderButtons();
$(document).on("click", ".subjects", displayGifs);
