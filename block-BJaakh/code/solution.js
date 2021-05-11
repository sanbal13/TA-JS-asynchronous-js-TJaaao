let ulRoot = document.querySelector(".todos");
let todoInput = document.querySelector(`input[type="text"]`);

const baseURL='https://sleepy-falls-37563.herokuapp.com/api/todo';

function handleDelete(id) {
    
    fetch((baseURL + '/' + id), {
        method: 'DELETE',
        headers: {
          'Content-Type'  : 'application/json'           
        }    
    }).then(() => {
        displayTodos();
    });
} 

function handleToggle(id, status) {
    let data = {
        "todo" : {
            "isCompleted": !status,
        }
    }

    fetch((baseURL + '/' + id), {
        method: 'PUT',
        headers: {
          'Content-Type'  : 'application/json'           
        },
        body: JSON.stringify(data),  
    }).then(() => {
        displayTodos();
    });
} 

function handleEdit(event, id, title) { 

 
let input = document.createElement("input");
input.value = title;
input.addEventListener('keyup', (event) => {
    if(event.keyCode === 13 && event.target.value) {
             let data = {
        "todo" : {
            "title": event.target.value,
        }
    }

    fetch((baseURL + '/' + id), {
        method: 'PUT',
        headers: {
          'Content-Type'  : 'application/json'           
        },
        body: JSON.stringify(data),  
    }).then(() => {
        displayTodos();
    });
} 
})

let p = event.target;
let parent = event.target.parentElement;
parent.replaceChild(input, p);

}

function createUI(data) {
    ulRoot.innerHTML = '';
    data.forEach((todo, i) => {
        let li = document.createElement("li");
        let input = document.createElement("input");
        input.type = 'checkbox';
        input.checked = todo.isCompleted;
        input.addEventListener('click',() => handleToggle(todo._id, todo.isCompleted));
        input.setAttribute('data-id', todo._id);
        let p = document.createElement("p");
        p.addEventListener('dblclick',(event) => handleEdit(event, todo._id, todo.title));
        p.innerText = todo.title;
        let span = document.createElement('span');
        span.innerText = '❌';
        span.addEventListener('click', () => handleDelete(todo._id));
        span.setAttribute('data-id', todo._id);
        li.append(input, p, span);
        ulRoot.append(li); 
    });
}

 function displayTodos() {
fetch(baseURL).then((res) => res.json())
              .then((allTodos) =>{                  
                 createUI(allTodos.todos) 
              }).catch((error) => {
                  console.error(error);
              })
             }

function addTodo(event) {
    if(event.keyCode === 13 && event.target.value !== '') {
        data = {
            "todo": {
                "title": event.target.value
            }
        }
        fetch(baseURL, {
            method: 'POST',
            headers: {
              'Content-Type'  : 'application/json'           
            },    
            body: JSON.stringify(data), 
        }).then(() => {
            event.target.value = '';
            displayTodos();
        });
    }
    
}             

todoInput.addEventListener('keyup', addTodo);



displayTodos();            

             

            