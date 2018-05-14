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
            <form id="order-form" method="POST" action="javascript: submitOrder();">
                <input type="text" name="name" autocomplete="name" placeholder="Name"/>
                <input type="email" name="email" autocomplete="email" placeholder="Email Address"/>
                <textarea name="message" placeholder="Message"></textarea>
                <button type="submit" id="submit-form">SEND</button>
            </form>
        </div>
        <!--CONTENT END-->
        <include file="footer.html"></include>
    </div>
    <?php include 'external_footer.php'; ?>
</body>

</html>