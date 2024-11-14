const inputTodo = document.getElementById('todo');
const todoForm = document.getElementById('newtodo');
const sectionTodos = document.getElementById('todos-container');

const todosEl = sectionTodos.querySelectorAll('.todo'); 

const generateTodo = (task, id) => {
    const newTodo = document.createElement('article');
    newTodo.id = id;
    newTodo.classList.add('todo');
    newTodo.classList.add('row');
    newTodo.setAttribute("draggable", "true");
    newTodo.innerHTML = `<div class="check-border"><div class="check"></div></div>
                        <div class="task text-body">${task}</div>
                        <div class="delete hidden">
                            <img src="../static/img/icon-cross.svg" alt="" class="cross">
                        </div>`

    newTodo.addEventListener('click', (e) => {
        if (e.target.className.includes('cross')) {
            deleteTodo(newTodo, e.target.baseURI, newTodo.id); 
        } else if (e.target.className.includes('check')) {
            updateTodo(newTodo, e.target.baseURI, newTodo.id);
        } else {
            console.log('nothing')
        }
    })
    newTodo.addEventListener('dragstart', () => {
        newTodo.classList.add('is-dragging');
    })
    newTodo.addEventListener('dragend', () => {
        newTodo.classList.remove('is-dragging');
    })

    newTodo.addEventListener('touchstart', (e) => { 
        newTodo.classList.add('is-dragging');
    })
    newTodo.addEventListener('touchend', () => {
        newTodo.classList.remove('is-dragging');
    });


    return newTodo;
}

const deleteTodo = (todo, url, id) => {
    fetch(url + 'delete/' +  id)
            .then(response => response.json())
            .then(response => {
                if (response.status === true){
                    todo.remove();
                    console.log(sectionTodos.querySelectorAll('.todo'));
                    if (sectionTodos.querySelectorAll('.todo').length === 0) {
                        sectionTodos.innerHTML = `<div class="not-todos">You don't hava any TODO yet Xd</div>`
                    }
                }else{
                    console.log(response)
                }  
            })    
}

const updateTodo = (todo, url, id) => {
    fetch(url + 'update/' + id)
            .then(response => response.json())
            .then(response => {
                if (response.status === true){
                    if (response.checked) {
                        todo.setAttribute('checked', '')
                    } else {
                        todo.removeAttribute('checked')
                    }
                }else{
                    console.log(response)
                }  
            })    
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(todoForm.action + '?task=' + inputTodo.value)
    .then(response => response.json())
    .then(response => {
        if (response.status === true){

            if (sectionTodos.innerHTML.includes('<div class="not-todos">')) {
                sectionTodos.innerHTML = '';
            }

            sectionTodos.appendChild(generateTodo(inputTodo.value, response.id));
            inputTodo.value = '';
        }else{
            console.log(response)
        }  
    })  
})

todosEl.forEach( todo => {
    todo.addEventListener('click', (e) => {
        if (e.target.className.includes('cross')) {
            deleteTodo(todo, e.target.baseURI, todo.id); 
        } else if (e.target.className.includes('check')) {
            updateTodo(todo, e.target.baseURI, todo.id);
        } else {
            console.log('nothing')
        }
    })
})


// [ ] cambiar codigo para que el check se haga mediante js y envie una peticion al servidor para actualizar estado en la base de datos

