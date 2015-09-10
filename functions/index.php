<?php
require("db.php");

$query = "select * from product_list";

$result = $mysqli->query($query);

$data = array();
$key = 0;

while($value = $result->fetch_assoc()){
    foreach($value as $k => $v){
        $data[$key][$k] = $v;
    }
    $key++;
}

echo json_encode($data);
$mysqli->close();

