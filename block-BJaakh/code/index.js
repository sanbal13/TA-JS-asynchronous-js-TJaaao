let text = document.querySelector("input");
let todoList = document.querySelector(".todo-list");
let url = 'https://sleepy-falls-37563.herokuapp.com/api/todo';

text.addEventListener('keyup', handleInput);

/******** Capture value from the textbox ********/    
function handleInput(event) {

    let text = event.target.value;
    let data = {
        "todo": {
          "title": text,
        }
      }

    if(event.keyCode === 13 && text !== '') {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        event.target.value = '';
        displayTodos();
    }    
    
}

/************* Delete a Todo *************/
function handleDelete(event) {
    let id = fetch(url).then((res) => res.json())
                       .then((res) => console.log(res.todos));
       console.log(id);                 

   fetch(url + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
   });                     
    
}


/************* Display Todos *************/
function displayTodos() {
        todoList.innerHTML = '';
    fetch(url).then((res) => res.json())
              .then((data) => {
                  data.todos.forEach((todo, index, arr) => {                      
                      let outerDiv = document.createElement("div");
                      outerDiv.classList.add("outer");
                      outerDiv.classList.add("flex");

                      if(index === arr.length - 1) {
                          outerDiv.style.borderBottomRightRadius = "2rem";
                      }

                      let innerDiv = document.createElement("div");
                      innerDiv.classList.add("inner");

                      let circle = document.createElement("span");
                      circle.classList.add("circle");

                      let text = document.createElement("span");
                      text.classList.add("text");
                      text.innerText = todo.title;

                      innerDiv.append(circle, text);

                      let cross = document.createElement("span");
                      cross.classList.add("cross");
                      cross.addEventListener('click', handleDelete);
                      cross.innerText = '❌';

                      outerDiv.append(innerDiv, cross);  
                      todoList.append(outerDiv);  

                  });
              });
}

displayTodos();