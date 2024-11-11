const inputTodo = document.getElementById('todo')
const todoForm = document.getElementById('newtodo')

const todos = document.getElementById('todos')

const filter = document.getElementById('filter');
const filterBtns = document.querySelectorAll('.btn');

console.log(filter)
console.log(filterBtns)

var hasChanged = false;

const resetButtonStates = () => {
  filterBtns.forEach(button => {
    button.setAttribute('state', 'default');
  })
}

filter.addEventListener('click', (e) => {
  if (e.target.className.includes('btn')) {
    console.log('btn')
    resetButtonStates();
    e.target.setAttribute('state', 'clicked');
  } 
})

inputTodo.addEventListener('change', (e) => {
    console.log('change')
    hasChanged = true;
    e.preventDefault();
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


