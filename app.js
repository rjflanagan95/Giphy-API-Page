themeArray = ["lord of the rings", "star wars", "harry potter", "avengers"];

function refreshButtons() {
    $("#button-area").empty();
    for (var i = 0; i < themeArray.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("gif-button");
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
            newGifBox.append("<br><span class='rating'>" + shortcut.rating + "</span>");
            $("#gif-area").prepend(newGifBox);
        }
    });
});

$(document).on("click", ".gif", function() {
    if ($(this).attr("status") === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("status", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("status", "still");;
    }
});

$("#submitNewButton").on("click", function() {
    var newTopic = $("#inputNewButton").val().trim();
    $("#inputNewButton").val("");

    themeArray.push(newTopic);
    refreshButtons();
});

refreshButtons();