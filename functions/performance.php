<?php
/**
 * Created by PhpStorm.
 * User: qlm
 * Date: 2015/8/14
 * Time: 14:38
 */

require("db.php");

$query = "select * from performance";

$result = $mysqli->query($query);
$data = array();
$key = 0;

while($value = $result->fetch_assoc()){
    foreach($value as $k => $v)
        $data[$key][$k] = $v;

    $key++;
}

echo json_encode($data);

$mysqli->close();
