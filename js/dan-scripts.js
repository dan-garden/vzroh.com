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
        fileDom = document.createElement('img');
        fileDom.src =  data.file;
        // fileDom.src = 'http://via.placeholder.com/1000x700';
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
    info_clicks.innerText = data.clicks + ' Project Views';
    info_clicks.classList.add('popup-clicks');
    info_block.append(info_clicks);

    popup.append(info_block);

    return popup;
}

const portfolioClicks = [];
const displayPortfolioItem = (data) => {
    if(portfolioClicks.indexOf(data.id) <= -1) {
        post('api/portfolio-click.php', {id: data.id});
        portfolioClicks.push(data.id);
        data.clicks++;
    }

    showPopup(renderPortfolioItem(data));
};

const renderPortfolioList = (element, data) => {
    element.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let portfolio_item = data[i];
        let portfolio_item_dom = document.createElement('li');

        let link = document.createElement('a');
        link.href = '#';
        link.onclick = () => {
            displayPortfolioItem(portfolio_item);
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
    }
}


const loadPortfolio = (element) => {
    getJSON('api/portfolio-get.php', response => {
        renderPortfolioList(element, response.data);
    })
};

const showPopup = (element) => {
  const backdrop = document.createElement('div');
  backdrop.classList.add('popup-backdrop');

  const backdropClick = document.createElement('div');
  backdropClick.classList.add('popup-clickable');
  backdropClick.addEventListener('click', () => {
    document.body.removeChild(backdrop);
  })

  backdrop.append(backdropClick);

  backdrop.append(element);
  document.body.append(backdrop);
}