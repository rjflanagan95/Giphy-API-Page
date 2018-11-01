// value of button clicked, which will be added to queryURL
var searchTerm

var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + searchTerm;

// call ajax
$.ajax({
    url: queryURL,
    method: "GET"
}) .then(function(response) {
    var imageUrl = response.data.image_original_url;
});