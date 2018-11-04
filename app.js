var themeArray = ["lord of the rings", "star wars", "harry potter", "avengers"];

function refreshButtons() {
    $("#button-area").empty();
    for (var i = 0; i < themeArray.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn btn-outline-dark gif-button");
        newButton.attr("id", themeArray[i]);
        newButton.text(themeArray[i]);
        $("#button-area").append(newButton);
    }
}

$(document).on("click", ".gif-button", function() {
    // clear the gif area for new gifs
    $("#gif-area").empty();

    // value of button clicked, which will be added to queryURL
    var searchTerm = $(this).attr("id");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + searchTerm;

    // call ajax
    $.ajax({
        url: queryURL,
        method: "GET"
    }) .then(function(response) {
        for (var i = 0; i < 10; i++) {
            var shortcut = response.data[i];
            var newGifBox = $("<div>");
            newGifBox.addClass("gif-box");
            var newGif = $("<img>");
            newGif.addClass("gif");
            newGif.attr("data-still", shortcut.images.fixed_height_still.url);
            newGif.attr("data-animate", shortcut.images.fixed_height.url);
            newGif.attr("status", "still");
            newGif.attr("src", shortcut.images.fixed_height_still.url);
            newGifBox.append(newGif);
            newGifBox.append("<br><span class='rating'>Rating: " + (shortcut.rating).toUpperCase() + "</span>");
            $("#gif-area").prepend(newGifBox);
        }
    });
});

// start/stop gifs when clicked
$(document).on("click", ".gif", function() {
    if ($(this).attr("status") === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("status", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("status", "still");;
    }
});

// when the "add" button is clicked, add the input to the themeArray and create new buttons
$("#submitNewButton").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#inputNewButton").val().trim();
    $("#inputNewButton").val("");

    themeArray.push(newTopic);
    refreshButtons();
});

// allows the user to hit "enter" instead of clicking the "add" button
$("#inputNewButton").keydown(function(e) {
    if (e.keyCode == 13) {
        event.preventDefault();
        var newTopic = $("#inputNewButton").val().trim();
        $("#inputNewButton").val("");

        themeArray.push(newTopic);
        refreshButtons();
    }
})

// clear any added topics
$("#resetButton").on("click", function(event) {
    event.preventDefault();
    themeArray = [];
    themeArray = ["lord of the rings", "star wars", "harry potter", "avengers"];
    refreshButtons();
});

// initialize the page
refreshButtons();