var topics = ["lord of the rings", "star wars", "harry potter", "avengers"];

// clear all buttons, then loop through the array to create new buttons
function refreshButtons() {
    $("#button-area").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn btn-outline-dark gif-button");
        newButton.attr("id", topics[i]);
        newButton.text(topics[i]);
        $("#button-area").append(newButton);
    }
}

$(document).on("click", ".gif-button", function() {
    // clear the gif area for new gifs
    $("#gif-area").empty();

    // value of button clicked, which will be added to queryURL
    var searchTerm = $(this).attr("id");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + searchTerm;

    $("#moreGifs").show()
    $("#moreGifs").attr("value", $(this).attr("id"));

    // call ajax
    $.ajax({
        url: queryURL,
        method: "GET"
    }) .then(function(response) {
        for (var i = 0; i < 10; i++) {
            var shortcut = response.data[i];
            console.log(shortcut);
            var newGifBox = $("<div>");
            newGifBox.addClass("gif-box");
            var newGif = $("<img>");
            newGif.addClass("gif");
            newGif.attr("data-still", shortcut.images.fixed_height_still.url);
            newGif.attr("data-animate", shortcut.images.fixed_height.url);
            newGif.attr("status", "still");
            newGif.attr("src", shortcut.images.fixed_height_still.url);
            newGifBox.append(newGif);
            newGifBox.append("<br><span>Rating: " + (shortcut.rating).toUpperCase() + "</span><br>");
            newGifBox.append("<a href=" + shortcut.source_post_url + "><span>Source</span></a><br>");

            $("#gif-area").prepend(newGifBox);
        }
    });
});

$(document).on("click", "#moreGifs", function() {
    $("#moreGifs").hide()

    var searchTerm = $(this).attr("value");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + searchTerm;

    // call ajax
    $.ajax({
        url: queryURL,
        method: "GET"
    }) .then(function(response) {
        for (var i = 10; i < 20; i++) {
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
            newGifBox.append("<br><span class='rating'>Rating: " + (shortcut.rating).toUpperCase() + "</span><br>");

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

// when the "add" button is clicked, add the input to the topics and create new buttons
$("#submitNewButton").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#inputNewButton").val().trim();
    $("#inputNewButton").val("");

    topics.push(newTopic);
    refreshButtons();
});

// allows the user to hit "enter" instead of clicking the "add" button
$("#inputNewButton").keydown(function(e) {
    if (e.keyCode == 13) {
        event.preventDefault();
        var newTopic = $("#inputNewButton").val().trim();
        $("#inputNewButton").val("");

        topics.push(newTopic);
        refreshButtons();
    }
})

// clear any added topics
$("#resetButton").on("click", function(event) {
    event.preventDefault();
    topics = [];
    topics = ["lord of the rings", "star wars", "harry potter", "avengers"];
    refreshButtons();
});

// initialize the page
$("#moreGifs").hide();
refreshButtons();