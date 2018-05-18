const left_panel = document.getElementById('left-panel');
const menu_links = left_panel.querySelectorAll('a')
const nav_toggle = document.getElementById('nav-toggle');
const home_logo = document.getElementById('home-logo');
const content_logo = document.getElementById('content-logo');
const content = document.getElementById('content');
const order_form = document.getElementById('order-form');


const checkInterval = 15000;
let checkingLivestream = false;

window.onload = function () {
    menu_links.forEach(element => {

        const re = new RegExp("^(http|https)://", "i");
        const href = element.getAttribute('href');
        const external = re.test(href);
        if(!external && content) {
            element.addEventListener('click', () => {
                content.velocity({
                    opacity: 0
                }, 500);
            })
        }
    });

    if (home_logo) {
        home_logo.velocity({
            opacity: 1
        }, 1000);
    }

    if (content_logo) {
        content_logo.velocity({
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
    getJSON('https://api.twitch.tv/kraken/streams/vzroh_?client_id=65rzgehnta8mlgc2f96ka7us7x5m78', response => {
        if (response.stream) {
            showStream();
        } else {
            hideStream();
        }
    })
}

const livestreamCheck = () => {
    checkingLivestream = true;
}

const submitOrder = () => {
    const body = formToBody(order_form, ['name', 'email', 'message']);
    const status = document.getElementById('status-message');
    const loading_icon = document.getElementById('loading-icon');
    loading_icon.style.display = 'inline-block';
    postJSON('api/contact-form.php', body, response => {
        status.innerHTML = '';
        loading_icon.style.display = 'none';
        if(response.status === 'error') {
            for(let i = 0; i < response.data.length; i++) {
                let msg = document.createElement('div');
                msg.classList.add('error', 'message');
                msg.innerText = response.data[i];
                status.appendChild(msg);
            }
        } else if(response.status === 'success') {
            const hide = document.querySelectorAll('.hide-after');
            for(let i = 0; i < hide.length; i++) {
                hide[i].style.display = 'none';
            }
            let msg = document.createElement('div');
                msg.classList.add('success', 'message');
                msg.innerText = response.data;
                status.appendChild(msg);
        }
    })
};
