const left_panel = document.getElementById('left-panel');
const nav_toggle = document.getElementById('nav-toggle');
const home_logo = document.getElementById('home-logo');
const content = document.getElementById('content');
const artwork_list = document.getElementById('artwork-list');



let checkingLivestream = false;

window.onload = function () {
    if (home_logo) {
        home_logo.velocity({
            opacity: 1
        }, 1000);
    }


    nav_toggle.onclick = function () {
        left_panel.style.display = left_panel.style.display === 'block' ? 'none' : 'block';
    };


    if (checkingLivestream) {
        ifOnline();
        window.setInterval(() => {
            ifOnline();
        }, checkInterval);
    }
}


const checkInterval = 15000;

const streamOnline = (fn) => {
    fetch('https://api.twitch.tv/kraken/streams/vzroh_?client_id=65rzgehnta8mlgc2f96ka7us7x5m78')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            fn(myJson);
        });
}

const showStream = () => {
    home_logo.velocity({
        opacity: 0
    }, 1000, () => {
        home_logo.style.display = 'none';
        content.style.display = 'block';
        content.style.opacity = 0;
        content.velocity({
            opacity: 1
        }, 1000);
    });
}

const hideStream = () => {
    content.velocity({
        opacity: 0
    }, 1000, () => {
        content.style.display = 'none';
        home_logo.style.display = 'block';
        // home_logo.style.opacity = 0;
        home_logo.velocity({
            opacity: 1
        }, 1000);
    });
}

const ifOnline = () => {
    streamOnline(result => {
        if (result.stream) {
            showStream();
        } else {
            hideStream();
        }
    });
}

const livestreamCheck = () => {
    checkingLivestream = true;
}

const renderArtworkList = (data) => {
    artwork_list.innerHTML = '';
    for(let i = 0; i < data.length; i++) {
        let artwork = data[i];
        let artwork_dom = document.createElement('li');

        let thumbnail = document.createElement('img');
        thumbnail.src = artwork.thumbnail;
        artwork_dom.append(thumbnail);

        let block = document.createElement('div');
        block.classList.add('block');

        let title = document.createElement('div');
        title.classList.add('title');
        title.innerHTML = artwork.title;

        let desc = document.createElement('div');
        desc.classList.add('desc');
        desc.innerHTML = artwork.description;
        

        artwork_dom.append(block);

        artwork_dom.style.opacity = 0;
        artwork_list.append(artwork_dom);
        artwork_dom.velocity({
            opacity: 1
        }, 1000);
    }
}

const getArtworkList = (fn) => {
    fetch('api/get_artwork.php')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            fn(myJson);
        });
}

const loadArtwork = () => {
    getArtworkList((result) => {
        renderArtworkList(result);
    });
};