let url = 'https://test.spaceflightnewsapi.net/api/v2/articles?_limit=30git ';
let newsElm = document.querySelector(".newsElm");
let select = document.querySelector("select");
let allNews = [];

let news = fetch(url).then(res => {
                        if(!res.ok) {
                            throw new Error(res.status);
                        }
                        return res.json()
                    })
                     .then(news => {
                         allNews = news;
                         renderNews(news);
                         let allSources = Array.from(new Set(news.map((n) => n.newsSite)));
                         console.log(allSources);
                         displayOptions(allSources);
                     })
                     .catch((error) => {
                         console.log(error);
                         newsElm.style.color ='red';
                         newsElm.style.textAlign ='center';
                         newsElm.innerText = error;
                     })
                     .finally();

function displayOptions(sources) {
    sources.forEach((source) => {
    let option = document.createElement("option");
    option.innerText = source;
    option.value = source;
    select.append(option);
})
};                     

function renderNews(news) {
        newsElm.innerText = '';
    news.forEach(newsItem => {
        let li = document.createElement("li");
        let img = document.createElement("img");
        let div = document.createElement("div");
        let span = document.createElement("span"); 
        let heading = document.createElement("h3");
        let a = document.createElement("a");
        let button = document.createElement("button");

        img.src = newsItem.imageUrl;
        img.alt = newsItem.title;
        span.innerText = newsItem.newsSite;
        span.classList.add('source');
        heading.innerText = newsItem.title;
        button.innerText = 'Read More';
        a.href = newsItem.url;
        a.append(button);
        div.append(span, heading, a);
        div.classList.add('info');
        li.append(img, div);   
        newsElm.append(li);
    });        
}

select.addEventListener('change', (event) => {
    let source = event.target.value;
    let filteredNews = allNews.filter((news) => (news.newsSite === source));
    if(source === 'Select a News Source') {
        filteredNews = allNews;
    }
    renderNews(filteredNews);
});


                   

