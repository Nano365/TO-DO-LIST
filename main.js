let input = document.querySelector(".input");
let add =document.querySelector(".add");
let tasks = document.querySelector(".tasks");

let arrayTasks = [];
if(localStorage.task) {
    arrayTasks = JSON.parse(localStorage.task);
}

getTasksFromLocalStorage();


add.onclick = ()=>{
    if (input.value !== "") {
        addTasksToArray(input.value);
        input.value = "";
    }
}

tasks.addEventListener("click" , (e)=>{
    if(e.target.classList.contains("dele")) {
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains("task")) {

        completedTask(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done"); 
    }
});

function addTasksToArray(tasks) {
    const task = {
        id : Date.now() ,
        text : tasks ,
        completed : false,
    };

    arrayTasks.push(task);
    
    addTasksToPage();
    addTasksToLocalStorage(arrayTasks);
}

function addTasksToPage() {
    tasks.innerHTML = "";
    arrayTasks.forEach((task) => {
        let div = document.createElement("div")
        div.className = 'task';
        div.setAttribute("data-id" , task.id);
        let taskText = document.createElement("div")
        taskText.appendChild(document.createTextNode(task.text));
        taskText.className='taskText';
        div.appendChild(taskText);

        if(task.completed) 
            div.className = 'done task';

        let dele = document.createElement("span");
        dele.className = 'dele';
        dele.appendChild(document.createTextNode("Delete"));

        div.appendChild(dele);
        tasks.appendChild(div)
    });
}

function addTasksToLocalStorage(arrOfTasks) {
    window.localStorage.setItem("task" , JSON.stringify(arrOfTasks));
}

function getTasksFromLocalStorage() {
    let data = window.localStorage.getItem("task")
    if(data) {
        let tasks = JSON.parse(data);
        addTasksToPage(tasks);
    }
}

function deleteTaskWith(dataId) {
    arrayTasks = arrayTasks.filter((task)=> task.id != dataId);
    addTasksToLocalStorage(arrayTasks)
}

function completedTask(taskId) {
    for(let i = 0 ; i < arrayTasks.length ; i++) {
        if(arrayTasks[i].id == taskId) {
            arrayTasks[i].completed == false ? (arrayTasks[i].completed = true) : (arrayTasks[i].completed = false) ;
            addTasksToLocalStorage(arrayTasks)
        }
    }
}