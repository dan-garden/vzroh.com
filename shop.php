<?php
    $page = array(
        "name" => "Shop",
        "description" => "",
        "maintenance" => true,
        "content" => false
    );
?>
<!DOCTYPE html>
<html>

<head>
    <?php include 'external_header.php'; ?>
</head>

<body>
    <div id="particles">
        <?php include 'left_panel.php'; ?>
        <?php include 'right_panel.php'; ?>
        <!--CONTENT START-->
        <div id="content">
            <a href="/" id="content-logo"></a>
        </div>
        <!--CONTENT END-->
        <?php include 'footer.php';?>
    </div>
    <?php include 'external_footer.php'; ?>
</body>

</html>