<?php
    include_once 'dan-lib.php';
    
    $portfolio = getPortfolio('../assets/portfolio/');
    respond(responseData($response, $portfolio));
?>