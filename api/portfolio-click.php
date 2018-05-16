<?php
    include_once 'dan-lib.php';
    $id = $_POST['id'];
    if(!isset($id) || !is_numeric($id)) {
        $response = responseError($response, 'Invalid ID');
    }
    increasePortfolioClicks($id);
    respond($response);
?>