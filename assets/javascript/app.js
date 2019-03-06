$(document).ready(function() {
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

    // clear out my gif display area so new gifs can be placed there  
    $("#gifDisplay").empty();  
  
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
          var gifDiv = $("<div>");

          // displays the rating of the gif
          var gifRating = gifObject[i].rating;
          var gifRatingDisplay = $("<p>").text("Rating: " + gifRating);

          var stillURL = gifObject[i].images.original_still.url;
          var animatedURL = gifObject[i].images.original.url;

          var image = $("<img class='gif'>");
            
            // give my images an original data-state of still for my on-click pause/play feature
            image.attr("src", stillURL);
            image.attr("data-state", "still");

            image.attr("data-still", stillURL);
        	image.attr("data-animate", animatedURL);

          // Appending the image and rating
          gifDiv.append(image);
          gifDiv.append(gifRatingDisplay);


          $("#gifDisplay").append(gifDiv);
      }
    });
  }  

  // Function for pausing/playing gifs by changing their data-state to "still" or "animate" which changes their URL
  function pauseAndPlay () {
      var state = $(this).attr("data-state");

      if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
  }

//=============ON CLICK AND CALLING MY FUNCTIONS===========

  // On-click listener for my "add gif" button
  $("#addGif").on("click", function(event) {
    event.preventDefault();

      var topic = $("#gifKeyword").val().trim();
    
          topics.push(topic);

      createButton();
  });

  // On-click listener for my dynamically generated buttons with the class .gifBtn
  $(document).on("click", ".gifBtn", gifDisplay); 

  // Call my create button function at the beginning to populate my first buttons
  createButton();

  // On-click listener for the gifs to pause/play them 
  $(document).on("click", ".gif", pauseAndPlay);

});