
(function() {
let modalWindow = document.querySelector(".modal-window");
let modalClose = document.querySelector("modal-close");
let openButton = document.querySelector(".btn");
let booksUl = document.querySelector(".book-list");
let charactersUl = document.querySelector(".characters");

const booksUrl = 'https://www.anapioficeandfire.com/api/books';


{/* <div class="donut"></div>/ */}

function handleSpinner(rootElm, status = false) {
    if(status) {
        rootElm.innerHTML ='<div class="donut"></div>';
    }

}

function displayCharacters(characters) {
    
    handleSpinner(charactersUl, true);
    Promise.all(characters.map((character) => fetch(character).then(res => res.json())))
                                              .then((charactersData) => {
                                                charactersUl.innerHTML = '';
                                                  charactersData.forEach((character) => {
                                                  let li = document.createElement("li");
                                                  li.innerText = `${character.name}: ${character.aliases.join(',')}`;
                                                  charactersUl.append(li);
                                                  })
                                              });
}


function displayBooks(data) {
    booksUl.innerHTML = '';
    data.forEach(book => {
        let li = document.createElement("li");
        let h3 = document.createElement("h3");
        h3.innerText = book.name;
        let p = document.createElement("p");
        p.innerText = book.authors.join(' ');
        let button = document.createElement("button");
        button.classList.add('btn');
        button.innerText =`Show Characters(${book.characters.length})`;

        button.addEventListener('click', () => {
            console.log('clicked');
            modalWindow.style.display ='block';
            displayCharacters(book.characters);
            modalWindow.querySelector('.modal-close').addEventListener('click', () => {
                    modalWindow.style.display = 'none';
            });
        });

        li.append(h3, p, button);

        booksUl.append(li);
        
    });
}

function fetchBooks() {
    handleSpinner(booksUl, true);
    fetch(booksUrl).then((res) => res.json())
    .then((booksData) => {
        displayBooks(booksData);
    })
    .finally(() => {
        handleSpinner(booksUl);        // Not required in this case as we are clearing the content in display()
    })
}

fetchBooks();
})();
