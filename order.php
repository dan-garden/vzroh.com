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
                <div id="status-message"></div>
                
                <!-- <div class="message error">This is an error message</div> -->
                <input class="hide-after" type="text" name="name" autocomplete="name" placeholder="Name"/>
                <input class="hide-after" type="email" name="email" autocomplete="email" placeholder="Email Address"/>
                <textarea class="hide-after" name="message" placeholder="Message"></textarea>
                <button class="hide-after" type="submit" id="submit-form">SEND <i id="loading-icon" class="fas fa-spinner fa-pulse"></i></button>
            </form>
        </div>
        <!--CONTENT END-->
        <?php include 'footer.php';?>
    </div>
    <?php include 'external_footer.php'; ?>
</body>

</html>