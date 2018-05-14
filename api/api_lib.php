<?php

$response = [
    'status'=> 'success',
    'data'=> false
];


function json($arr) {
    header('Content-type: application/json;charset=utf-8');
    echo json_encode($arr, 448);
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