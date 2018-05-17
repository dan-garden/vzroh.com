<?php
    $page = array(
        "name" => "Connect",
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
            <div id="connect-content">
                <div id="connect-title">CONNECT</div>
                <div id="connect-header">
                    <div id="connect-image">
                        <!-- graphic artist. -->
                    </div>
                    <div id="connect-social">
                        <a href="https://twitter.com/vzroh" target="_blank" rel="noopener">twitter.com/<b>vzroh</b></a><br />
                        <a href="https://twitch.tv/vzroh_" target="_blank" rel="noopener">twitch.tv/<b>vzroh_</b></a><br />
                        <a href="https://youtube.com/vzroh" target="_blank" rel="noopener">youtube.com/<b>vzroh</b></a>
                    </div>
                </div>
                <div id="connect-about">
                    <h3>Karl "VZROH" M</h3>
                    <p>
                        Gold Coast, Australia<br /><br />
                        I'm 21 years old.. I look like a child though.<br /><br />
                        I've been working with Photoshop for 7 years now.<br /><br />
                        VZROH is really just a random bunch of letters strung together to create my online alias. <br /><br />
                        People ask me often how I got the skillset in design I have todday. Honestly, nothing special. Just practise.
                    </p>
                </div>
            </div>
        </div>
        <!--CONTENT END-->
        <include file="footer.html"></include>
    </div>
    <?php include 'external_footer.php'; ?>
</body>

</html>