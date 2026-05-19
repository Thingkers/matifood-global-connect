<?php
// Upload to: public_html/order.php   (so it serves at https://nisilagro.com/order.php)
header('Content-Type: application/json');

// === CONFIG ===
$API_KEY  = 'REPLACE_WITH_YOUR_SECRET';      // must match MATIFOOD_API_KEY in Lovable
$DB_HOST  = 'localhost';
$DB_NAME  = 'u595773077_matifood';
$DB_USER  = 'u595773077_matifood';
$DB_PASS  = 'YOUR_DB_PASSWORD';

// === AUTH ===
$key = $_SERVER['HTTP_X_API_KEY'] ?? '';
if (!hash_equals($API_KEY, $key)) {
  http_response_code(401);
  echo json_encode(['ok'=>false,'error'=>'Unauthorized']);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok'=>false,'error'=>'Method not allowed']);
  exit;
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok'=>false,'error'=>'Bad JSON']);
  exit;
}

$fields = ['customer_name','phone','email','area','delivery_address','product','quantity','payment_method','payment_note'];
$v = [];
foreach ($fields as $f) { $v[$f] = isset($data[$f]) ? $data[$f] : ''; }
$v['quantity'] = (int)$v['quantity'];
if ($v['quantity'] < 1) $v['quantity'] = 1;

$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if ($mysqli->connect_errno) {
  http_response_code(500);
  echo json_encode(['ok'=>false,'error'=>'DB connection failed']);
  exit;
}
$mysqli->set_charset('utf8mb4');

$stmt = $mysqli->prepare(
  "INSERT INTO orders (customer_name, phone, email, area, delivery_address, product, quantity, payment_method, payment_note)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
);
$stmt->bind_param(
  'ssssssiss',
  $v['customer_name'], $v['phone'], $v['email'], $v['area'],
  $v['delivery_address'], $v['product'], $v['quantity'],
  $v['payment_method'], $v['payment_note']
);

if (!$stmt->execute()) {
  http_response_code(500);
  echo json_encode(['ok'=>false,'error'=>'Insert failed: '.$stmt->error]);
  exit;
}

echo json_encode(['ok'=>true, 'id'=>$stmt->insert_id]);
