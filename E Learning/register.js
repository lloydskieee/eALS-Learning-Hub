$(document).ready(function() {
  function register(event) {
    event.preventDefault(); // Prevent form submission

    var username = $("#register-username").val();
    var password = $("#register-password").val();

    // Make an AJAX request to fetch the user credentials
    $.getJSON("credentials.json", function(credentials) {
      var found = false;

      // Check if the entered username already exists in the JSON file
      for (var i = 0; i < credentials.length; i++) {
        var user = credentials[i].username.trim();

        if (username === user) {
          found = true;
          break;
        }
      }

      if (found) {
        alert("Username is already taken. Please choose a different username.");
      } else {
        // Add the new user to the credentials array
        credentials.push({ username: username, password: password });

        // Convert the updated credentials to JSON string
        var updatedCredentials = JSON.stringify(credentials);

        // Upload the updated credentials file back to the server
        $.ajax({
          url: "save_credentials.php", // Replace with the server-side script or endpoint to handle the upload
          type: "POST",
          data: { credentials: updatedCredentials },
          success: function() {
            alert("Registration successful. You can now log in with your credentials.");
            document.getElementById("register-form").reset();
            window.location.href = "login.html"; // Redirect to login page
          },
          error: function() {
            alert("Failed to register. Please try again.");
          }
        });
      }
    });
  }

  // Add event listener to the register form
  $("#register-form").submit(register);
});
