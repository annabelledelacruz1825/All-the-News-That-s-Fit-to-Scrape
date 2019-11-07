// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one

  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      "<div id='wrapper" +
        data[i]._id +
        "' data-id='wrapper" +
        data[i]._id +
        "' style='margin-left: auto; margin-right: auto; border: 1px solid black;margin-bottom: 15px'><div id='populatedArticle'>" +
        data[i].title +
        "<button id='writeNote' data-id='" +
        data[i]._id +
        "' class='btn btn-success save' style='float:right; border:1px solid black; margin-left:5px' >Add Note</button><button id='saveArticle' data-id='" +
        data[i]._id +
        "' class='btn btn-success save' style='float:right; border:1px solid black' >Save Article</button></div><div id='populatedLink' >" +
        data[i].link +
        "</div></div>"
    );

    if (data[i].note) {
      $("#savedArticles").append(
        "<div id='wrapper" +
          data[i]._id +
          "' data-id='wrapper" +
          data[i]._id +
          "' style='margin-left: auto; margin-right: auto; border: 1px solid black;margin-bottom: 15px'>  <div id='populatedArticle' ><a href= " +
          data[i].link +
          "> " +
          data[i].title +
          " </a><button data-id='" +
          data[i]._id +
          "' class='btn btn-success save' style='float:right;  border:1px solid black'>Delete Article</button></div><div id='populatedLink' >" +
          data[i].link +
          "</div><div id='populatedNote' >" +
          data[i].note.title +
          "</div><div>" +
          data[i].note.body +
          "</div></div>"
      );
    }
  }
});

// Whenever someone clicks a p tag
$(document).on("click", "#writeNote", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append(
        "<div class='notesField' id='" +
          data._id +
          "'><h5 style=' margin: 5px;'>" +
          data.title +
          "</h5><input id='titleinput' name='title' ><textarea id='bodyinput' name='body'></textarea><button class='btn btn-success save' data-id='" +
          data._id +
          "' id='savenote' style='border:1px solid black' >Save Note</button></div>"
      );

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input

      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      $("#savedArticles").append(
        "<div id='wrapper" +
          thisId +
          "' data-id='wrapper" +
          thisId +
          "' style='margin-left: auto; margin-right: auto; border: 1px solid black;margin-bottom: 15px'>  <div id='populatedArticle' ><a href= " +
          thisId.link +
          "> " +
          thisId.title +
          " </a><button data-id='" +
          thisId +
          "' class='btn btn-success save' style='float:right;  border:1px solid black'>Delete Article</button></div><div id='populatedLink' >" +
          thisId.link +
          "</div><div id='populatedNote' >" +
          thisId.title +
          thisId.body +
          "</div><div>"
      );

      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();

      $("#wrapper" + thisId).remove();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

//----------------------------
// Grab the articles as a json

$(document).on("click", "#saveArticle", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input

      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#wrapper" + thisId).remove();
      $("#bodyinput").val();

      $("#savedArticles").append(
        "<div id='wrapper" +
          thisId +
          "' data-id='wrapper" +
          thisId +
          "'><div id='populatedArticle'>" +
          thisId.title +
          "<button id='writeNote' data-id='" +
          thisId +
          "' class='btn btn-success save' style='float:right; border:1px solid black; margin-left:5px' >Add Note</button><button id='saveArticle' data-id='" +
          thisId +
          "' class='btn btn-success save' style='float:right; border:1px solid black' >Save Article</button></div><div id='populatedLink' >" +
          thisId.link +
          "</div></div>"
      );
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
