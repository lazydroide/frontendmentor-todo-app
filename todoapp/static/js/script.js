const inputTodo = document.getElementById('todo')
const todoForm = document.getElementById('newtodo')

const todos = document.getElementById('todos')

var hasChanged = false;

inputTodo.addEventListener('change', (e) => {
    console.log('change')
    hasChanged = true;
    e.preventDefault();
//     e.preventDefault()
//     if (e.target.value !== '') {  
//         console.log('dentro')      
//         todoForm.submit();
//     }
})

inputTodo.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.key === 'enter') {
        console.log('enter')

    }
})

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (hasChanged) { todoForm.submit() }
})