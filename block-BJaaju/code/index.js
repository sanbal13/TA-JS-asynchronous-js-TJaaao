let gallery = document.querySelector(".gallery");
let search = document.querySelector("input");

search.addEventListener('keyup', handleSearch);

function handleSearch(event) {
    if(event.keyCode === 13) {
    let xhr = new XMLHttpRequest;
    xhr.open('GET', `https://api.unsplash.com/search/photos/?query= ${event.target.value}&client_id=a23zt9qI2yxTVDU8jYxc8PdWzY_zO8BQdhfWY8DcuyA`);
    
    xhr.onload = function() {
        
        gallery.innerText = '';
        let h1 = document.createElement('h1');
        let br = document.createElement("br");
        h1.innerText = event.target.value;        
        gallery.append(h1);
        gallery.append(br);
        event.target.value = '';
        let imagesData = JSON.parse(xhr.response);
        imagesData.results.forEach(image => {
            let a = document.createElement("a");
            a.href = image.urls.regular;
            a.target = '_blank';
            let img = document.createElement("img");
            img.src = image.urls.small;
            a.append(img);
            gallery.append(a);
        });
    };

    xhr.onerror = function() {
        gallery.innerText = "Something went wrong...";
    }

    xhr.send();
}
}

