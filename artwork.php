<?php
    $page = array(
        "name" => "Artwork",
        "description" => "",
        "maintenance" => false,
        "content" => true
    );

    include_once('api/dan-lib.php');

    $portfolio = getPortfolio('assets/portfolio/');
    if(isset($_GET['id'])) {
        $id = $_GET['id'];
        $current_portfolio_item = $portfolio[intval($id)];
        $page["name"] = $current_portfolio_item["name"];
        $page["description"] = $current_portfolio_item["description"];
        $item_image_path = '/' . $current_portfolio_item["file"];
        $page["image"] = 'http://' . $_SERVER['HTTP_HOST'] . $item_image_path;
    }
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
            <ul id="portfolio-list"></ul>
        </div>
        <!--CONTENT END-->
        <?php include 'footer.php'; ?>
        

    </div>
    <?php include 'external_footer.php'; ?>
    <script>
        loadPortfolio(document.getElementById('portfolio-list'));
    </script>
</body>

</html>