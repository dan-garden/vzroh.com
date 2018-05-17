<?php

    function isMobile() {
        return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
    }

    $file = 'assets/logo.png';



    if(isMobile()) {
        $imgPng = imageCreateFromPng($file);
        imageAlphaBlending($imgPng, true);
        imageSaveAlpha($imgPng, true);
        
        /* Output image to browser */
        header("Content-type: image/png");
        imagePng($imgPng); 
    } else if(!isMobile()){
        $quoted = sprintf('"%s"', addcslashes(basename($file), '"\\'));
        $size   = filesize($file);
    
        header('Content-Description: File Transfer');
        header('Content-Type: image/png');
        header('Content-Disposition: attachment; filename=' . $quoted); 
        header('Content-Transfer-Encoding: binary');
        header('Connection: Keep-Alive');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: ' . $size);
    }
?>