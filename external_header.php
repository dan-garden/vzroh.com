<?php

    if($page['maintenance'] === true) {
        header("Location: maintenance");
    }

    if(!isset($page["image"])) {
        $page["image"] = 'http://' . $_SERVER['HTTP_HOST'] . '/assets/site-header.png';
    }

    $page["name"] = "VZROH.com &raquo; " . $page["name"];
?>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><?php echo $page['name'];?></title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" media="screen" href="css/main.css" />


<!-- Search Engine -->
<meta name="description" content="<?=$page['description'];?>">
<meta name="image" content="<?=$page['image'];?>">
<!-- Schema.org for Google -->
<meta itemprop="name" content="<?=$page['name'];?>">
<meta itemprop="description" content="<?=$page['description'];?>">
<meta itemprop="image" content="<?=$page['image'];?>">
<!-- Twitter -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="<?=$page['name'];?>">
<meta name="twitter:description" content="<?=$page['description'];?>">
<meta name="twitter:site" content="@vzroh">
<meta name="twitter:creator" content="@vzroh">
<meta name="twitter:image:src" content="<?=$page['image'];?>">
<!-- Open Graph general (Facebook, Pinterest & Google+) -->
<meta property="og:title" content="<?=$page['name'];?>">
<meta property="og:description" content="<?=$page['description'];?>">
<meta property="og:image" content="<?=$page['image'];?>">
<meta property="og:url" content='<?="http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";?>'>
<meta property="og:site_name" content="<?=$page['name'];?>">
<meta property="og:locale" content="en_AU">
<meta property="og:type" content="website">