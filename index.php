<?php
    $page = array(
        "name" => "Home",
        "maintenance" => false,
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
            <div id="home-logo"></div>
            <div id="content" style="display:none;">
                <a href="/" id="content-logo"></a>
                <iframe id="twitch-stream" src="https://player.twitch.tv/?channel=vzroh" frameborder="0" allowfullscreen="true" scrolling="no"></iframe>
            </div>

            <!--CONTENT END-->
            <?php include 'footer.php'; ?>
        </div>
        <?php include 'external_footer.php'; ?>

        <script>
            livestreamCheck();
        </script>
    </body>

    </html>