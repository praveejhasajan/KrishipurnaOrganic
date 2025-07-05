<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name    = strip_tags($_POST['name']);
  $email   = strip_tags($_POST['email']);
  $subject = strip_tags($_POST['subject']);
  $message = strip_tags($_POST['message']);
  $date    = date("Y-m-d H:i:s");

  $csvFile = fopen("contacts.csv", "a");
  if ($csvFile) {
    fputcsv($csvFile, [$date, $name, $email, $subject, $message]);
    fclose($csvFile);
    echo "OK";
  } else {
    http_response_code(500);
    echo "Failed to write to CSV.";
  }
} else {
  http_response_code(403);
  echo "Invalid request.";
}
