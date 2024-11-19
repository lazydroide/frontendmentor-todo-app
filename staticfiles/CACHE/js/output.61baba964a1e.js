const inputTodo=document.getElementById('todo');const todoForm=document.getElementById('newtodo');const todosContainer=document.getElementById('todos-container');const todosElements=todosContainer.querySelectorAll('.todo');const csrftoken=document.querySelector('[name=csrfmiddlewaretoken]').value;const filter=document.getElementById('filter');const filterBtns=document.querySelectorAll('.btn');const messagesContainer=document.getElementById('messages');const messages=document.querySelectorAll('.message');const clearBtn=document.getElementById('clear');const generateMessage=(msg)=>{const message=document.createElement('article');message.classList.add('message');message.classList.add('row');message.innerHTML=`<p class="text-message text-body">${msg}</p><div class="dismiss">X</div>`;applyMessageListeners(message);messagesContainer.appendChild(message);}
const generateTodo=(task,id)=>{const newTodo=document.createElement('article');newTodo.id=id;newTodo.classList.add('todo');newTodo.classList.add('row');newTodo.setAttribute("draggable","true");newTodo.innerHTML=`<div class="check-border"><div class="check"></div></div>
                        <div class="task text-body">${task}</div>
                        <div class="delete hidden">
                            <img src="../static/img/icon-cross.svg" alt="" class="cross">
                        </div>`
addTodoListeners(newTodo);return newTodo;}
const deleteTodo=(todo,url,id)=>{fetch(url+'delete/'+id,{method:'POST',headers:{'X-CSRFToken':csrftoken,'Accept':'application/json','Content-Type':'application/json'},body:getPositions()}).then(response=>response.json()).then(response=>{if(response.status===true){todo.remove();generateMessage('Todo borrado!!!')
if(todosContainer.querySelectorAll('.todo').length===0){todosContainer.innerHTML=`<div class="not-todos">You don't hava any TODO yet Xd</div>`}
updateLeft();}else{generateMessage('Something go wrong!');}})}
const updateTodo=(todo,url,id)=>{fetch(url+'update/'+id).then(response=>response.json()).then(response=>{if(response.status===true){if(response.checked){todo.setAttribute('checked','')}else{todo.removeAttribute('checked')}
updateLeft();}else{generateMessage('Something go wrong!');}})}
todoForm.addEventListener('submit',(e)=>{e.preventDefault();if(inputTodo.value.trim()===''){return};fetch(todoForm.action+'?task='+inputTodo.value).then(response=>response.json()).then(response=>{if(response.status===true){if(todosContainer.innerHTML.includes('<div class="not-todos">')){todosContainer.innerHTML='';}
todosContainer.appendChild(generateTodo(inputTodo.value,response.id));inputTodo.value='';updateLeft();}else{generateMessage('Something go wrong!');}})})
const positionRequest=(e)=>{const request=new Request(e.target.baseURI+'positions',{method:'POST',headers:{'X-CSRFToken':csrftoken,'Accept':'application/json','Content-Type':'application/json'},body:getPositions()});return request}
const getPositions=()=>{const positions={};[...todosContainer.querySelectorAll('.todo')].map((todo)=>todo.id).forEach((id,index)=>{positions[index.toString()]=id})
return JSON.stringify(positions);};const updatePosition=(e)=>{fetch(positionRequest(e)).then(response=>response.json()).then(response=>{if(response.status===true){console.log(response)}else{generateMessage('Something go wrong!');}});}
const setPosition=(e)=>{const draggingTodo=todosContainer.querySelector('.is-dragging');const otherTodos=[...todosContainer.querySelectorAll('.todo:not(.is-dragging)')];let nextTodo=otherTodos.find(otherTodo=>{return e.clientY<=otherTodo.offsetTop+otherTodo.offsetHeight/2;});todosContainer.insertBefore(draggingTodo,nextTodo);}
const setPositionMobile=(e)=>{const draggingTodo=todosContainer.querySelector('.is-dragging');const otherTodos=[...todosContainer.querySelectorAll('.todo:not(.is-dragging)')];let nextTodo=otherTodos.find(otherTodo=>{return e.targetTouches[0].clientY<=otherTodo.offsetTop+otherTodo.offsetHeight/2;});todosContainer.insertBefore(draggingTodo,nextTodo);}
const addTodoListeners=(todo)=>{todo.addEventListener('click',(e)=>{if(e.target.className.includes('cross')){deleteTodo(todo,e.target.baseURI,todo.id);}else if(e.target.className.includes('check')){updateTodo(todo,e.target.baseURI,todo.id);}else{console.log('nothing')}})
todo.addEventListener('dragstart',()=>{todo.classList.add('is-dragging');})
todo.addEventListener('dragend',(e)=>{todo.classList.remove('is-dragging');updatePosition(e);})
todo.addEventListener('touchstart',(e)=>{todo.classList.add('is-dragging');})
todo.addEventListener('touchend',(e)=>{todo.classList.remove('is-dragging');});}
todosElements.forEach(todo=>{addTodoListeners(todo)})
todosContainer.addEventListener('touchmove',setPositionMobile)
todosContainer.addEventListener('dragover',(e)=>{setPosition(e);})
const resetButtonStates=()=>{filterBtns.forEach(button=>{button.setAttribute('state','default');})}
const countActives=()=>{return[...document.querySelectorAll('.todo:not([checked])')].length;}
const updateLeft=()=>{const left=countActives();document.getElementById('left').textContent=left===1?`${left} item left`:`${left} items left`;}
const actives=()=>{todosContainer.querySelectorAll('.todo').forEach((todo)=>{if(todo.hasAttribute('checked')){todo.classList.add('hidden');}else{todo.classList.remove('hidden');}})}
const completed=()=>{todosContainer.querySelectorAll('.todo').forEach((todo)=>{if(todo.hasAttribute('checked')){todo.classList.remove('hidden');}else{todo.classList.add('hidden');}})}
const alltodos=()=>{todosContainer.querySelectorAll('.todo').forEach((todo)=>{todo.classList.remove('hidden');})}
filter.addEventListener('click',(e)=>{if(e.target.className.includes('btn')){resetButtonStates();e.target.setAttribute('state','clicked');}});filter.addEventListener('touchstart',(e)=>{if(e.target.className.includes('btn')){resetButtonStates();e.target.setAttribute('state','clicked');}});clearBtn.addEventListener('click',(e)=>{fetch(e.target.baseURI+'clear').then(response=>response.json()).then(response=>{if(response.status===true){todosContainer.querySelectorAll('.todo').forEach((todo)=>{if(todo.hasAttribute('checked')){todo.remove();}})
if(todosContainer.querySelectorAll('.todo').length===0){todosContainer.innerHTML=`<div class="not-todos">You don't hava any TODO yet Xd</div>`}}else{const msg=response.msg||'Something go wrong!';generateMessage(msg);}})})
const applyMessageListeners=(message)=>{message.addEventListener('click',(e)=>{if(e.target.className.includes('dismiss')){e.target.parentNode.remove();}})
message.addEventListener('touchstart',(e)=>{if(e.target.className.includes('dismiss')){e.target.parentNode.remove();}})}
messages.forEach(message=>{applyMessageListeners(message)});document.onload=updateLeft();;const themeBtn=document.getElementById('theme');const darkThemeMq=window.matchMedia("(prefers-color-scheme: dark)");const storageTheme=(value)=>{localStorage.setItem('todoapp_theme',value);}
const retrieveTheme=()=>{const theme=localStorage.getItem('todoapp_theme');if(theme){document.documentElement.className=theme;}else{if(darkThemeMq.matches){document.documentElement.className='dark';}else{document.documentElement.className='light';}}}
themeBtn.addEventListener('click',()=>{if(document.documentElement.className==='dark'){document.documentElement.className='light';storageTheme('light');}else{document.documentElement.className='dark';storageTheme('dark');}});document.onload=retrieveTheme();