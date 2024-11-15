const inputTodo = document.getElementById('todo');
const todoForm = document.getElementById('newtodo');
const todosContainer = document.getElementById('todos-container');

const todosElements = todosContainer.querySelectorAll('.todo'); 

const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

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
                    if (todosContainer.querySelectorAll('.todo').length === 0) {
                        todosContainer.innerHTML = `<div class="not-todos">You don't hava any TODO yet Xd</div>`
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

            if (todosContainer.innerHTML.includes('<div class="not-todos">')) {
                todosContainer.innerHTML = '';
            }

            todosContainer.appendChild(generateTodo(inputTodo.value, response.id));
            inputTodo.value = '';
        }else{
            console.log(response)
        }  
    })  
})

todosElements.forEach( todo => {
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

// positions
const positionRequest = (e) => {
    const request = new Request(
        e.target.baseURI + 'positions',
        {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: getPositions()
        }
    );
    return request
}

const getPositions = () => {
    const positions = {};
    [...todosContainer.querySelectorAll('.todo')].map((todo) => todo.id).forEach((id, index) => {
        positions[index.toString()] = id
    })

    return JSON.stringify(positions);
};

const updatePosition = (e) => {
    fetch(positionRequest(e))
    .then(response => response.json())
    .then(response => {
        if (response.status === true) {
            console.log(response)

        } else {
            console.log(response)
        }
    });
}


// drag and drop

const setPosition = (e) => {
    const draggingTodo = todosContainer.querySelector('.is-dragging');
    const otherTodos = [...todosContainer.querySelectorAll('.todo:not(.is-dragging)')];
    
    let nextTodo = otherTodos.find( otherTodo => {
        return e.clientY <= otherTodo.offsetTop + otherTodo.offsetHeight / 2;
    });
    
    todosContainer.insertBefore(draggingTodo, nextTodo);
    
}

const setPositionMobile = (e) => {
    const draggingTodo = todosContainer.querySelector('.is-dragging');
    const otherTodos = [...todosContainer.querySelectorAll('.todo:not(.is-dragging)')];
    
    let nextTodo = otherTodos.find( otherTodo => {
        return e.targetTouches[0].clientY <= otherTodo.offsetTop + otherTodo.offsetHeight / 2;
    });
    
    todosContainer.insertBefore(draggingTodo, nextTodo);
}

todosElements.forEach( todo => {
    todo.addEventListener('dragstart', () => {
        todo.classList.add('is-dragging');
    })
    todo.addEventListener('dragend', (e) => {
        todo.classList.remove('is-dragging'); 
        updatePosition(e);
    })

    todo.addEventListener('touchstart', (e) => { 
        todo.classList.add('is-dragging');
    })
    todo.addEventListener('touchend', (e) => {
        todo.classList.remove('is-dragging');
    });
})


todosContainer.addEventListener('touchmove', setPositionMobile)
todosContainer.addEventListener('dragover', (e) => {
    setPosition(e);
})



// [x] cambiar codigo para que el check se haga mediante js y envie una peticion al servidor para actualizar estado en la base de datos
// [ ] eliminar console.logs
// [ ] eliminar drag.js



//  [x] drag and drop
//  [x] drag and drop mobile e.clientY en mobile
//  [x] drag and drop mobile checks not working (preventdefault vs long touch)
//  [x] enviar actualizacion de posicion al servidor para que la guarde y la muestre correctamente en reload.
//      new position = float entre dos posiciones o el anterior -/+ 1
