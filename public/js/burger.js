$(function() {
  // Add a new burger.
  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      burger_name: $("#newBurger")
        .val()
        .trim(),
      devoured: 0
    };
    // console.log(newBurger);
    // Send the POST request.
    $.ajax("/api/burgers", {
      method: "POST",
      data: newBurger
    }).then(function() {
      console.log("Added new burger");
      // Reload the page to get the updated burger list.
      location.reload();
    });
  });

  $(".eatBurgerButton").on("click", function(event) {
    event.preventDefault();
    // console.log(event);
    var id = $(this).attr("id");
    var devouredState = {
      devoured: 1
    };
    console.log(id);
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      method: "PUT",
      data: devouredState
    }).then(function(event) {
      console.log("Updated the burger");
      // Reload the page to get the updated burger list.
      location.reload();
    });
  });

  $(".barfTheBurger").on("click", function(event) {
    event.preventDefault();

    var id = $(this).attr("id");
    console.log(id);
    // Send the DELETE request.
    $.ajax({
      type: "DELETE",
      url: "/api/burgers/" + id
    }).then(function(event) {
      location.reload();
    });
  });
});
