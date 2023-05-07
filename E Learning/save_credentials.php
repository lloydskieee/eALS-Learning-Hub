<?php
// Get the updated credentials from the request
$updatedCredentials = $_POST['credentials'];

// Specify the path to the credentials.json file
$credentialsFile = 'credentials.json';

// Save the updated credentials to the file
file_put_contents($credentialsFile, $updatedCredentials);

// Return a success response
http_response_code(200);
?>
