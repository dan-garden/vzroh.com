<?php
    include_once 'api_lib.php';

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];


    if($name === '') {
        $response = responseError($response, 'Please fill out the name field.');
    } if($email === '') {
        $response = responseError($response, 'Please fill out the email field.');
    } if($message === '') {
        $response = responseError($response, 'Please fill out the message field.');
    }
    
    if(responseSuccessful($response)) {

        $to      = 'dangarden@gmail.com';
        $subject = 'the subject';
        $message = 'hello this is a test email please test test order order';
        $headers = 'From: order@vzroh.com' . "\r\n" .
                'To: dangarden@gmail.com' . "\r\n" .
                'Reply-To: order@vzroh.com' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();

        mail($to, $subject, $message, $headers);

        $response = responseData($response, 'Order has been sent!');
    }


    respond($response);
?>