themeArray = ["lord of the rings", "star wars", "harry potter", "avengers"];

for (var i = 0; i < themeArray.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("gif-button");
    newButton.attr("id", themeArray[i]);
    newButton.text(themeArray[i]);
    $("#button-area").append(newButton);
}

$(".gif-button").click(function() {
    // clear the gif area for new gifs
    $("#gif-area").empty();

    // value of button clicked, which will be added to queryURL
    var searchTerm = $(this).attr("id");
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + searchTerm;

    for (var i = 0; i < 10; i++) {
        // call ajax
        $.ajax({
            url: queryURL,
            method: "GET"
        }) .then(function(response) {
            // console.log(response.data);
            var newGifBox = $("<div>");
            newGifBox.addClass("gif-box");
            var newGif = $("<img>");
            newGif.addClass("gif");
            newGif.attr("data-still", response.data.images.fixed_height_still.url);
            newGif.attr("data-animate", response.data.images.fixed_height.url);
            newGif.attr("status", "still");
            newGif.attr("src", response.data.images.fixed_height_still.url);
            newGifBox.append(newGif);
            $("#gif-area").prepend(newGifBox);
        });
    }
    
});

$(".gif").click(function() {
    console.log("clicked a gif");
    console.log($(this));
    if ($(this).attr("status") === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");;
    }
});