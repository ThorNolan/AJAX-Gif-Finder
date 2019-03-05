
//===================GLOBALS========================

// Initial array to populate the first buttons that appear on the top of the page when it loads
var topics = ["trees", "wind", "mountains", "flowers", "ocean"];



//==================FUNCTIONS========================

// Function for creating buttons based on my topics array, which will be dynamically updated when a user inputs a new topic in the search form
function createButton() {

    // prevents repeat buttons
    $("#buttonsDisplay").empty();
  
    // dynamically generate button for each item in my topics array and give it a class and data-name attribute
    for (var i = 0; i < topics.length; i++) {
        
      var newButton = $("<button>");
      newButton.addClass("gifBtn");
      newButton.attr("data-name", topics[i]);
      newButton.text(topics[i]);

      $("#buttonsDisplay").append(newButton);
    }
}

// Function to display the gifs and their relevant information in the gifDisplay area
function gifDisplay() {
  
  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic +"&api_key=GJ27HgHFEf0rGR4aQesqgJU7fSvuiESl&limit=10"

  // ajax call based on the topic for the button that was clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
    // var to store my data from the 
    var gifObject = response.data;
    console.log(response);

    for (var i = 0; i < gifObject.length; i++) {
        var gifDiv = $("<div class='gif'>");

        // displays the rating of the gif
        var gifRating = gifObject[i].rating;
        var gifRatingDisplay = $("<p>").text("Rating: " + gifRating);

        var gifURL = gifObject[i].images.url;
        var image = $("<img>");
            image.attr("src", gifURL);

        // Appending the image and rating
        gifDiv.append(image);
        gifDiv.append(gifRatingDisplay);


        $("#gifDisplay").append(gifDiv);
    }

  });
}  

//=============ON CLICK AND CALLING MY FUNCTIONS===========

// on click listener for my "add gif" button
$("#addGif").on("click", function(event) {
  event.preventDefault();

  var topic = $("#gifKeyword").val().trim();
    
    topics.push(topic);

  createButton();
});

// on click listener for my dynamically generated buttons with the class .gifBtn
$(document).on("click", ".gifBtn", gifDisplay);

// call my create button function
createButton();