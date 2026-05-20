<?php
// Upload to: public_html/orders_list.php  (https://nisilagro.com/orders_list.php)
header('Content-Type: application/json');

$API_KEY  = 'REPLACE_WITH_YOUR_SECRET';        // must match MATIFOOD_API_KEY in Lovable
$DB_HOST  = 'localhost';
$DB_NAME  = 'u595773077_matifood';
$DB_USER  = 'u595773077_matifood';
$DB_PASS  = 'YOUR_DB_PASSWORD';

$key = $_SERVER['HTTP_X_API_KEY'] ?? '';
if (!hash_equals($API_KEY, $key)) {
  http_response_code(401);
  echo json_encode(['ok'=>false,'error'=>'Unauthorized']);
  exit;
}

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli->connect_errno) {
  http_response_code(500);
  echo json_encode(['ok'=>false,'error'=>'DB connection failed']);
  exit;
}
$mysqli->set_charset('utf8mb4');

$res = $mysqli->query(
  "SELECT id, customer_name, phone, email, area, delivery_address,
          product, quantity, payment_method, payment_note, created_at
   FROM orders
   ORDER BY id DESC
   LIMIT 1000"
);
if (!$res) {
  http_response_code(500);
  echo json_encode(['ok'=>false,'error'=>'Query failed: '.$mysqli->error]);
  exit;
}
$rows = [];
while ($r = $res->fetch_assoc()) {
  $r['id'] = (int)$r['id'];
  $r['quantity'] = (int)$r['quantity'];
  $rows[] = $r;
}
echo json_encode(['ok'=>true, 'orders'=>$rows]);
