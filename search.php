<?php
// Assuming you have a MySQL database
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_dbname";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle search form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $searchTerm = $_POST["search"];

    // Query to fetch rows based on the search term
    $sql = "SELECT * FROM your_table WHERE column_name LIKE '%$searchTerm%'";
    $result = $conn->query($sql);

    echo "<html><body><table border='1'><tr><th>ID</th><th>Name</th><th>Other Column</th></tr>";

    if ($result->num_rows > 0) {
        // Displaying the results in a table
        while ($row = $result->fetch_assoc()) {
            echo "<tr><td>" . $row["id"] . "</td><td>" . $row["name"] . "</td><td>" . $row["other_column"] . "</td></tr>";
        }
    } else {
        echo "<tr><td colspan='3'>No results found.</td></tr>";
    }

    echo "</table></body></html>";
}

// Close the database connection
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Example</title>
</head>
<body>

    <form method="post" action="">
        <label for="search">Search:</label>
        <input type="text" name="search" id="search">
        <button type="submit">Submit</button>
    </form>

</body>
</html>
