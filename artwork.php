<?php
    $page = array(
        "name" => "Artwork",
        "maintenance" => false
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
            <div id="content-logo"></div>
            <ul id="artwork-list">

            </ul>
        </div>
        <!--CONTENT END-->
        <?php include 'footer.php'; ?>
    </div>
    <?php include 'external_footer.php'; ?>
    <script>
        loadArtwork();
    </script>
</body>

</html>