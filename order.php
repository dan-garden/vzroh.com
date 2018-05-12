<?php
    $page = array(
        "name" => "Order",
        "maintenance" => false,
        "content" => true
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
            <form id="order-form">
                <input type="text" name="name" placeholder="NAME"/>
                <input type="text" name="email" placeholder="EMAIL ADDRESS"/>
                <textarea name="message" placeholder="MESSAGE..."></textarea>
                <button type="submit" id="submit-form">Send</button>
            </form>
        </div>
        <!--CONTENT END-->
        <?php include 'footer.php'; ?>
    </div>
    <?php include 'external_footer.php'; ?>
</body>

</html>