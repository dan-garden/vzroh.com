<?php

$response = [
    'status'=> 'success',
    'data'=> false
];

function prettyDump($val) {
    echo '<pre>';
    var_dump($val);
    echo '</pre>';
}


function json($arr) {
    header('Content-type: application/json;charset=utf-8');
    echo json_encode($arr, 448);
}

function getJSON($filename) {
    $stringedJSON = file_get_contents($filename);
    $decodedJSON = json_decode($stringedJSON, true);
    return $decodedJSON;
}

function setJSON($filename, $data) {
    $encodedJSON = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents($filename, $encodedJSON);
}

function getPortfolio($path) {
    $portfolio_list = getJSON($path . "meta.json");
    for($i = 0; $i < count($portfolio_list); $i++) {
        $portfolio_list[$i]['id'] = $i;
        $thumbnail = $path . $i . '/thumbnail.jpg';
        if(file_exists($thumbnail)) {
            $portfolio_list[$i]['thumbnail'] = $thumbnail;
        }

        $thumbnail = $path . $i . '/thumbnail.jpg';
        if(file_exists($thumbnail)) {
            $portfolio_list[$i]['thumbnail'] = $thumbnail;
        } else {
            $portfolio_list[$i]['thumbnail'] = false;
        }
        $portfolio_list[$i]['file'] = $path . $i . '/thumbnail.jpg';
    }
    return $portfolio_list;
}

function addToPortfolio($name, $description) {
    $dir = '../assets/portfolio/';


    $portfolio = getJSON($dir . 'meta.json');

    $portfolio[] = array(
        'name' => $name,
        'description' => $description
    );

    $count = count($portfolio) - 1;

    mkdir($dir . '/' . $count);


    setJSON($dir . 'meta.json', $portfolio);
}

function increasePortfolioClicks($id) {
    $dir = '../assets/portfolio/';


    $portfolio = getJSON($dir . 'meta.json');

    $portfolio[$id]['clicks']++;

    setJSON($dir . 'meta.json', $portfolio);
}

function responseError($response, $error) {
    if($response['data']===false || $response['status'] === 'success') {
        $response['status'] = 'error';
        $response['data'] = array();
    }
    $response['data'][] = $error;
    return $response;
}

function responseData($response, $data) {
    $response['data'] = $data;
    return $response;
}

function respond($response) {
    json($response);
    die();
}

function responseSuccessful($response) {
    return $response['status'] === 'success';
}

?>
