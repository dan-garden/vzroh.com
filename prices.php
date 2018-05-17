<?php
    include_once 'config.php';
    $page = array(
        "name" => "Prices",
        "maintenance" => false,
        "content" => true
    );

    function groupPrices($item_prices) {
        $groupedprices = array();
        foreach($item_prices as $item) {
            $pricekey = $item['price'];
            if(!array_key_exists($pricekey, $groupedprices)) {
                $groupedprices[$pricekey] = array();
            }

            $groupedprices[$pricekey][] = $item;
        }
        return $groupedprices;
    }
    
    function generatePricingTable($item_prices) {
        $grouping = groupPrices($item_prices);
        ?>
<table id="pricing-table">
                <tbody>
                    <?php
                    foreach($grouping as $items) {
                    ?>
<tr>
            <td>
                        <?php
                            foreach($items as $item) {
                        ?>
            <?=$item['type'];?><br />
                        <?php
                        }
                        ?>
            </td>
            <td><?='$'.$items[0]['price'];?></td>
        </tr>
                    <?php
                    }
                    ?>
    </tbody>
</table>
        <?php
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
            <?=generatePricingTable($prices);?>
            <span class="white-text">OTHER ARTWORK - <a href="mailto:gfx@vzroh.com">GFX@VZROH.COM</a></span>
            <a id="order-now" href="order">ORDER NOW!</a>
            <br /><br /><br /><br />
        </div>
        <!--CONTENT END-->
        <?php include 'footer.php';?>
    </div>
    <?php include 'external_footer.php'; ?>
</body>

</html>