const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];


if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
    
    tasks.forEach((task) => {
        renderTask(task)
    })
}


// добавляем задачу
form.addEventListener('submit', addTask)

function addTask(e) {
    e.preventDefault();
    const taskText = taskInput.value;    

    // объект задачи
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }

    // пушим 
    tasks.push(newTask);

    renderTask(newTask);   

    taskInput.value= "";
    taskInput.focus();

    checkEmptyList();
    saveToLocalStorage();

}

// удаляем задачу
tasksList.addEventListener('click', deleteTask)

function deleteTask(e){   
    if(e.target.dataset.action !== 'delete') return

    const parenNode = e.target.closest('.list-group-item');

    // ищем объект по id 
    const id = parenNode.id
    // ищем оп массву
    const index = tasks.findIndex( function(task){
        if(task.id == id){
            parenNode.remove();
            return true;
        }
    })    
    tasks.splice(index, 1) 

    checkEmptyList();
    saveToLocalStorage();
}

// завершаем задачу
tasksList.addEventListener('click', doneTask)

function doneTask(e){
    if(e.target.dataset.action !== 'done') return
    
    const parenNode = e.target.closest('.list-group-item');

    // ищем объект по id 
    const id = parenNode.id
    // ищем оп массву
    const task = tasks.find((task) => task.id == id)    
        

    task.done = !task.done;

    const taskTitle = parenNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')

    saveToLocalStorage()    

    }

// если список пуст
function checkEmptyList(){
    if(tasks.length === 0){
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    } else {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}  

// запись в localstorage 
function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// отрисовка задачи 
function renderTask(task){
    // css класс
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    const taskHtml = `
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${task.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
        </div>
    </li>`;
    tasksList.insertAdjacentHTML('beforeend', taskHtml);

}

checkEmptyList();




