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

// [ ] cambiar codigo para que el check se haga mediante js y envie una peticion al servidor para actualizar estado en la base de datos

