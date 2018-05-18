const postJSON = (url, data, fn) => {
    if(!(data instanceof FormData)) {
        data = objectToBody(data);
    }
    fetch(url, {
        body: data,
        method: 'POST'
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        if(typeof fn === "function") {
            fn(response);
        }
    });
}

const post = (url, data, fn) => {
    if(!(data instanceof FormData)) {
        data = objectToBody(data);
    }
    fetch(url, {
        body: data,
        method: 'POST'
    })
    .then(function (response) {
        return response.text();
    })
    .then(function (response) {
        if(typeof fn === "function") {
            fn(response);
        }
    });
}

const getJSON = (url, data, fn) => {
    if(typeof data === 'object') {
        url += '?' + serialize(data);
    } else if(typeof data === 'function') {
        fn = data;
    }
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            if(typeof fn === "function") {
                fn(response);
            }
        });
}

const get = (url, data, fn) => {
    if(typeof data === 'object') {
        url += '?' + serialize(data);
    } else if(typeof data === 'function') {
        fn = data;
    }
    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (response) {
            if(typeof fn === "function") {
                fn(response);
            }
        });
}

const serialize = (object) => {
    const keyvals = [];
    const keys = Object.keys(object);
    for(let i = 0; i < keys.length; i++) {
        let key = keys[i];
        keyvals.push(key + '=' + encodeURI(object[key]));
    }
    return keyvals.join('&');
}

const formToBody = (form, fields) => {
    let body;
    if(!fields) {
        body = new FormData(form);
    } else {
        body = new FormData();
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            body.append(field, form[field].value);
        }
    }
    return body;
}

const objectToBody = (object) => {
    const body = new FormData();
    const keys = Object.keys(object);
    for(let i = 0; i < keys.length; i++) {
        let key = keys[i];
        body.append(key, object[key]);
    }
    return body;
}


const runIncludes = (includes, fn) => {
    for(let i = 0; i < includes.length; i++) {
        let include = includes[i];
        let file = include.getAttribute('file');
        get(file, result => {
            let div = document.createElement('div');
            div.innerHTML = result.trim();
            let newElements = div.childNodes;
            let childIncludes = [];
            for(let j = 0; j < newElements.length; j++) {
                let newElement = newElements[j];
                include.parentNode.insertBefore(newElement, include);
                if(newElement.tagName === 'SCRIPT') {
                    eval(newElement.innerHTML);
                }
                if(newElement.tagName === 'INCLUDE') {
                    childIncludes.push(newElement);
                }
            }
            if(childIncludes.length > 0) {
                runIncludes(childIncludes, fn);
            } else {
                if(typeof fn === 'function') {
                    fn()
                };
            }
            include.parentNode.removeChild(include);
        })
    }
};

const getFileType = (path) => {
  const fileJoin = path.split('.');
  return fileJoin[fileJoin.length - 1];
}

const URLParams = (url) => {
    const params = {};
    const search = new URL(url || document.location.href);
    let searchParams = new URLSearchParams(search.search);
    searchParams.forEach((value, key) => {
        if(!isNaN(value)) {
            value = parseInt(value);
        }
        params[key] = value;
    })
    return params;
};

const br = () => {
  return document.createElement('br');
}

const renderPortfolioItem = (data) => {
    const popup = document.createElement('div');
    popup.classList.add('popup-container');


    if(data.file) {
      const fileType = getFileType(data.file);
      const imageTypes = ['jpg', 'jpeg', 'png', 'gif'];

      let fileDom;

      if(imageTypes.indexOf(fileType) > -1) {
        //Is image
        // fileDom = document.createElement('img');
        // fileDom.src =  data.file;

        fileDom = document.createElement('div');
        fileDom.style.backgroundImage = 'url('+data.file+')';
      }

      fileDom.classList.add('popup-file');
      popup.append(fileDom);
    }

    const info_block = document.createElement('div');
    info_block.classList.add('popup-info-block');

    const info_name = document.createElement('span');
    info_name.innerText = data.name;
    info_name.classList.add('popup-name');
    info_block.append(info_name);

    const info_desc = document.createElement('span');
    info_desc.innerText = data.description;
    info_desc.classList.add('popup-desc');
    info_block.append(info_desc);
    info_block.append(br());

    const info_clicks = document.createElement('span');
    info_clicks.innerHTML = '<i class="fas fa-eye"></i> ' + data.clicks + ' Project Views';
    info_clicks.classList.add('popup-clicks');
    info_block.append(info_clicks);

    const share_block = document.createElement('div');
    share_block.classList.add('popup-share-block');

    const share_url = 'artwork?id=' + data.id;
    const twitter_url = shareLink('twitter', share_url);
    const facebook_url = shareLink('facebook', share_url);
    const gplus_url = shareLink('gplus', share_url);

    const twitter_link = document.createElement('a');
    twitter_link.classList.add('twitter-share', 'share-link');
    twitter_link.target ="_blank";
    twitter_link.href = twitter_url;
    share_block.append(twitter_link);

    const facebook_link = document.createElement('a');
    facebook_link.classList.add('facebook-share', 'share-link');
    facebook_link.target ="_blank";
    facebook_link.href = facebook_url;
    share_block.append(facebook_link);

    const gplus_link = document.createElement('a');
    gplus_link.classList.add('gplus-share', 'share-link');
    gplus_link.target ="_blank";
    gplus_link.href = gplus_url;
    share_block.append(gplus_link);

    popup.append(info_block);
    popup.append(share_block);

    return popup;
}

const portfolioClicks = [];
const displayPortfolioItem = (data, addToHistory=true) => {
    if(addToHistory) {
        window.history.pushState(data,"", '?id='+data.id);
    }
    if(portfolioClicks.indexOf(data.id) <= -1) {
        post('api/portfolio-click.php', {id: data.id});
        portfolioClicks.push(data.id);
        data.clicks++;
    }

    showPopup(renderPortfolioItem(data));
};

window.onpopstate = function(e){
    if(e.state){
        displayPortfolioItem(e.state);
    } else {
        removePopups();
    }
};

const shareLink = (type, path=document.location.pathname) => {
    const url = encodeURI(document.location.origin + '/' + path);
    let shareurl;
    if(type === 'fb' || type === 'facebook') {
        shareurl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
    }
    if(type === 'twitter') {
        shareurl = 'https://twitter.com/home?status=Check%20out%20this%20awesome%20design%20by%20Vzroh!%3A%20' + url;
    }
    if(type === 'google' || type === 'gplus') {
        shareurl = 'https://plus.google.com/share?url=' + url;
    }
    return shareurl;
}

const renderPortfolioList = (element, data, clickable=true) => {
    const params = URLParams();

    element.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let portfolio_item = data[i];
        let portfolio_item_dom = document.createElement('li');
        portfolio_item_dom.id = 'portfolio-item-' + portfolio_item.id;

        let link = document.createElement('a');
        link.href = '?id=' + portfolio_item.id;

        if(clickable) {
            link.onclick = (e) => {
                e.preventDefault();
                displayPortfolioItem(portfolio_item);
            }
        }
        

        let thumbnail;
        if(portfolio_item.thumbnail) {
            thumbnail = document.createElement('img');
            thumbnail.src = portfolio_item.thumbnail;
            link.append(thumbnail);
        }

        let block = document.createElement('div');
        block.classList.add('block');

        let name = document.createElement('div');
        name.classList.add('name');
        name.innerHTML = portfolio_item.name;
        block.append(name);

        let desc = document.createElement('div');
        desc.classList.add('desc');
        desc.innerHTML = portfolio_item.description;
        block.append(desc);

        link.append(block);

        portfolio_item_dom.append(link);
        element.append(portfolio_item_dom);

        portfolio_item_dom.style.opacity = 0;
        thumbnail.onload = () => {
            portfolio_item_dom.velocity({
                opacity: 1
            }, 1000);
        }

        if(clickable && params.id === portfolio_item.id) {
            displayPortfolioItem(portfolio_item, false);
        }
    }
}


const loadPortfolio = (element, clickable=true) => {
    getJSON('../api/portfolio-get', response => {
        renderPortfolioList(element, response.data, clickable);
    })
};

const showPopup = (element) => {
  const backdrop = document.createElement('div');
  backdrop.classList.add('popup-backdrop');

  const backdropClick = document.createElement('div');
  backdropClick.classList.add('popup-clickable');
  backdropClick.addEventListener('click', () => {
    document.body.removeChild(backdrop);
    window.history.pushState(false, "", location.pathname.split("/").slice(-1));
  })

  backdrop.append(backdropClick);

  backdrop.append(element);
  document.body.append(backdrop);
}

const removePopups = () => {
    const popups = document.querySelectorAll('.popup-backdrop');
    for(let i = 0; i < popups.length; i++) {
        document.body.removeChild(popups[i]);
    }
}