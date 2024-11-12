const inputTodo = document.getElementById('todo')
const todoForm = document.getElementById('newtodo')

var hasChanged = false;

inputTodo.addEventListener('change', (e) => {
    console.log('change')
    hasChanged = true;
    e.preventDefault();
})

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (hasChanged) { todoForm.submit() }
})

