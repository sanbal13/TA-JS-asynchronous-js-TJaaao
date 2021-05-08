let books = document.querySelector(".books");
let modal = document.querySelector(".modal");
let url ='https://www.anapioficeandfire.com/api/books';


function hideSpinner(elm) {
        document.querySelector(elm).style.display = "none";
}

function fetchUrl(url){
            return   fetch(url)
                     .then((res) => {
                         hideSpinner('.booksDonut');
                        if(res.ok){  
                        return res.json();
                        } else {
                            throw new Error('Something went wrong...');
                        }
                        })
                    .catch((error) => {
                        books.innerText = error;
                        console.error(error)
                        });
                    }

                    let library = fetchUrl(url);                    

function createUI() {             

             library.then((booksList) =>               
             booksList.forEach(book => {

            let li = document.createElement("li");
            li.classList.add('book');

            let bookName = document.createElement("h2");
            bookName.innerText = book.name;

            let authors = document.createElement("h3");
            authors.innerText = 'Author: ' + book.authors;

            let noOfPages = document.createElement("h4");
            noOfPages.innerText = 'Pages: ' + book.numberOfPages;

            let publisher = document.createElement("h3");
            publisher.innerText = 'Publisher: ' + book.publisher;

            let released = document.createElement("h4");
            released.innerText = 'Release: ' + book.released;

            let country = document.createElement("h3");
            country.innerText = 'Country: ' + book.country;

            let button = document.createElement("button");
            button.innerText = `Show Characters(${book.characters.length})`;
            button.addEventListener('click', handleClick);

            li.append(bookName, authors, noOfPages, publisher, released, country, button);
            books.append(li);
        }));
}

/* `name`, `gender`, `aliases` and `tvSeries` */

let header = document.querySelector(".modal h2");
let charactersList = document.querySelector(".characters-list");
let close = document.querySelector(".close");
close.addEventListener('click', () => {
        modal.style.display = "none";   
        document.querySelector('body').style.background = "#D1F9E5"; 
        document.querySelector('.charactersDonut').style.display ="block";       
});

function handleClick(e) {
    modal.style.display = "block";
    document.querySelector('body').style.background = "black";
    const bookName = e.target.parentElement.firstElementChild.innerText;
    header.innerText = bookName;
    library.then(bookList => {
        let reqBook = bookList.find(book => book.name === bookName);
        //fetch(reqBook.characters[0]).then(res => res.json()).then(res => console.log(res.name));
        let characterArr = [];
        reqBook.characters.forEach((character) => {
            characterArr.push(fetchUrl(character)); 
        });
           let promiseAll = new Promise((res) => {
              
               res(Promise.all(characterArr));
               
           });
           setTimeout(() => hideSpinner('.charactersDonut'), 3000);   // This is hard coded
            promiseAll.then(characterArr =>
            characterArr.forEach((member) =>           
                {
                    let li = document.createElement("li");
                    li.classList.add("characters");

                    let name = document.createElement("h2");
                    name.innerText = member.name;

                    let gender = document.createElement("h4");
                    gender.innerText = member.gender;
                    
                    
                    let aliases = document.createElement("h4");
                    aliases.innerText = "Aliases: " + member.aliases;              

                    
                    let tvSeries = document.createElement("h4");
                    tvSeries.innerText = "TV Series: " + member.tvSeries;
                    
                    li.append(name, gender, aliases, tvSeries);
                    charactersList.append(li);
                } 
                
                ));
                
        })
    }  


createUI();

