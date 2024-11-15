
const todosContainer = document.getElementById('todos-container');
const draggables = todosContainer.querySelectorAll('.todo');

const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

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

draggables.forEach( todo => {
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



//  [x] drag and drop
//  [x] drag and drop mobile e.clientY en mobile
//  [x] drag and drop mobile checks not working (preventdefault vs long touch)
//  [x] enviar actualizacion de posicion al servidor para que la guarde y la muestre correctamente en reload.
//      new position = float entre dos posiciones o el anterior -/+ 1
