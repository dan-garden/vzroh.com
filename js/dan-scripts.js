const postJSON = (url, data, fn) => {
    fetch(url, {
        body: data,
        method: 'POST'
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        fn(response);
    });
}

const post = (url, data, fn) => {
    fetch(url, {
        body: data,
        method: 'POST'
    })
    .then(function (response) {
        return response.text();
    })
    .then(function (response) {
        fn(response);
    });
}

const getJSON = (url, fn) => {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            fn(response);
        });
}

const get = (url, fn) => {
    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (response) {
            fn(response);
        });
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

const formToJSON = (form) => {
    const fields = ['name', 'email', 'message'];
    const body = new FormData();

    for (let i = 0; i < fields.length; i++) {
        let field = fields[i];
        body.append(field, form[field].value);
    }

    return body;
}

const displayPortfolioItem = (data) => {
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

        let thumbnail = document.createElement('img');
        thumbnail.src = portfolio_item.thumbnail;
        link.append(thumbnail);

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
        portfolio_item_dom.style.opacity = 0;
        element.append(portfolio_item_dom);
        thumbnail.onload = () => {
            portfolio_item_dom.velocity({
                opacity: 1
            }, 1000);
        }
    }
}


const loadPortfolio = (element) => {
    getJSON('api/portfolio.php', response => {
        renderPortfolioList(element, response.data);
    })
};