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

const portfolioClicks = [];
const displayPortfolioItem = (data) => {
    if(portfolioClicks.indexOf(data.id) <= -1) {
        post('api/portfolio-click.php', {id: data.id});
        portfolioClicks.push(data.id);
        data.clicks++;
    }

    console.log(data);
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