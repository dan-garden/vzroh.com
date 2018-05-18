<?php
    include_once '../api/dan-lib.php';

    $orders = getJSON('../contact/orders.json');
    $orders = array_reverse($orders);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Orders</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="../css/admin.css" />
</head>
<body>
    <div id="content">
        <div class="title">ORDERS</div>
        <?php
            if(count($orders) > 0) {
                foreach($orders as $order) {
                    ?>
                    <div class="order-block">
                        <b>Name: </b><?=$order['name'];?><br /><br />
                        <b>Email: </b><?=$order['email'];?><br /><br />
                        <b>Message: </b><?=nl2br($order['message']);?>
                    </div>
                    <?php
                }
            } else {
                echo '<h4>There are no orders yet.</h4>';
            }
        ?>
    </div>
</body>
</html>