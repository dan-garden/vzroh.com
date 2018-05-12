<?php
    $artwork = [
        [
            'id'=>0,
            'thumbnail'=>'assets/artwork/image1.jpg',
            'title'=>'Client eSports Facecam',
            'description'=>'Digital Graphics'
        ],
        [
            'id'=>1,
            'thumbnail'=>'assets/artwork/image2.jpg',
            'title'=>'eSports Twitter Header',
            'description'=>'Digital Layout Graphics'
        ],
        [
            'id'=>2,
            'thumbnail'=>'assets/artwork/image3.jpg',
            'title'=>'Obey Alliance Mobile Wallpaper',
            'description'=>'Digital Wallpaper Photo Manipulation'
        ],
        [
            'id'=>3,
            'thumbnail'=>'assets/artwork/image4.jpg',
            'title'=>'Retro Jabre Header',
            'description'=>'Digital Layout Graphics'
        ],
        [
            'id'=>4,
            'thumbnail'=>'assets/artwork/image5.jpg',
            'title'=>'Self Edit',
            'description'=>'Digital Photography Manipulation'
        ],
        [
            'id'=>5,
            'thumbnail'=>'assets/artwork/image6.jpg',
            'title'=>'Graffiti Tribute to a lost brother',
            'description'=>'Digital Streetart Graphics'
        ]
    ];



    header('Content-type: application/json;charset=utf-8');
    echo json_encode($artwork, 448);
?>