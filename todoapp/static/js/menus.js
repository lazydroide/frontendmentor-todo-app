const filter = document.getElementById('filter');
const filterBtns = document.querySelectorAll('.btn');

const todos = document.querySelectorAll('.todo');
const messages = document.querySelectorAll('.message');

const resetButtonStates = () => {
  filterBtns.forEach(button => {
    button.setAttribute('state', 'default');
  })
}

const countActives = () => {
    return [...document.querySelectorAll('.todo:not([checked])')].length;   
}
  
const updateLeft = () => {
    const left = countActives();
    document.getElementById('left').textContent = left === 1 ? `${left} item left` : `${left} items left`;
}

const actives = () => {
    todos.forEach((todo) => {
        if (todo.hasAttribute('checked')) {
        todo.classList.add('hidden');
        } else {
        todo.classList.remove('hidden');
        }
    })
}

const completed = () => {
    todos.forEach((todo) => {
      if (todo.hasAttribute('checked')) {
        todo.classList.remove('hidden');
      } else {
        todo.classList.add('hidden');
      }
    })
}
  
const alltodos = () => {
    todos.forEach((todo) => {    
        todo.classList.remove('hidden');
    })
}

filter.addEventListener('click', (e) => {
    if (e.target.className.includes('btn')) {
      console.log('btn')
      resetButtonStates();
      e.target.setAttribute('state', 'clicked');
    } 
});

messages.forEach(message => {
  message.addEventListener('click', (e) => {
    if (e.target.className.includes('dismiss')) {
      e.target.parentNode.remove();
    }
  })

  message.addEventListener('touchstart', (e) => {
    if (e.target.className.includes('dismiss')) {
      e.target.parentNode.remove();
    }
  })
})

// menu
//  [x] filter
//  [ ] visibility vs display:none
//  [ ] listener para mobile
//  [ ] clear button
document.onload = updateLeft();