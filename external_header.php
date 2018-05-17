<?php
    if($page['maintenance'] === true) {
        header("Location: maintenance");
    }
?>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>VZROH.com &raquo; <?php echo $page['name'];?></title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" media="screen" href="css/main.css" />