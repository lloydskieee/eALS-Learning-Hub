$(document).ready(function() {
  function login(event) {
    event.preventDefault(); // Prevent form submission

    var username = $("#login-username").val().trim();
    var password = $("#login-password").val().trim();

    // Make an AJAX request to fetch the user credentials
    $.getJSON("credentials.json", function(credentials) {
      var found = false;

      // Check if the entered credentials match any user in the JSON file
      for (var i = 0; i < credentials.length; i++) {
        var user = credentials[i].username.trim();
        var pass = credentials[i].password.trim();

        if (username === user && password === pass) {
          found = true;
          break;
        }
      }

      if (found) {
        window.location.href = "./home/index.html"; // Redirect to home page
      } else {
        console.log("Entered username:", username);
        console.log("Entered password:", password);
        console.log("Credentials:", credentials);
        console.log("Login failed. Invalid username or password");
        alert("Invalid username or password");
      }
    }).fail(function() {
      console.log("Failed to retrieve credentials from credentials.json");
      alert("Failed to retrieve credentials. Please try again later.");
    });
  }

  // Add event listener to the login form
  $("#login-form").submit(login);
});
