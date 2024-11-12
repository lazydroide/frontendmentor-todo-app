
const todosContainer = document.getElementById('todos-container');
const draggables = document.querySelectorAll('.todo');

const setPosition = (e) => {
    const draggingTodo = todosContainer.querySelector('.is-dragging');
    const otherTodos = [...todosContainer.querySelectorAll('.todo:not(.is-dragging)')];
    
    let nextTodo = otherTodos.find( otherTodo => {
        return e.clientY <= otherTodo.offsetTop + otherTodo.offsetHeight / 2;
    });
    
    todosContainer.insertBefore(draggingTodo, nextTodo);
}

draggables.forEach( todo => {
    todo.addEventListener('dragstart', () => {
        todo.classList.add('is-dragging');
    })
    todo.addEventListener('dragend', () => {
        todo.classList.remove('is-dragging');
    })
})

todosContainer.addEventListener('dragover', setPosition)



//  [ ] drag and drop