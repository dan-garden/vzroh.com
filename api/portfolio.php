<?php
    include_once 'api_lib.php';

    function getPortfolio() {
        $string = file_get_contents("../portfolio/meta.json");
        $portfolio_list = json_decode($string, true);

        for($i = 0; $i < count($portfolio_list); $i++) {
            $portfolio_list[$i]['thumbnail'] = 'portfolio/' . $i . '/thumbnail.jpg';
            $portfolio_list[$i]['file'] = 'portfolio/' . $i . '/file.jpg';
        }

        return $portfolio_list;
    }

    
    $artwork = getPortfolio();
    respond(responseData($response, $artwork));
?>