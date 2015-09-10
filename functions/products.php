<?php
/**
 * Created by PhpStorm.
 * User: qlm
 * Date: 2015/8/18
 * Time: 18:15
 */
require("db.php");
$id = $_GET["id"];

$query = "select * from product_detail where runtimeNumber like '%" . $id . "%'";
if($id == 0){
    $query = "select * from product_detail";
}


$result = $mysqli->query($query);
$data = array();
$key = 0;

while($value = $result->fetch_assoc()){
    foreach($value as $k => $v){
        $data[$key][$k] = $v;
    }
    $dir = "../pics/products/".$data[$key]["product_name_en"];
    if(is_dir($dir)){
        $handler = opendir($dir);
        $data[$key]["files"] = array();
        $i = 0;
        while(($filename = readdir($handler)) !== false){
            if($filename != "." && $filename!=".."){
                $data[$key]["files"][$i++] = $filename;
            }
        }

        closedir($handler);
    }

    $key++;
}

echo json_encode($data);

$mysqli->close();

