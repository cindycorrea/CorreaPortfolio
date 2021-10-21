// Add current tasks to storage
class StorageHelper {
    constructor(storage = window.localStorage) {
        this.storage = storage;
    }
    load(name) {
        return this.storage.getItem(name);
    }
    save(name, info) {
        this.storage.setItem(name, info);
    }
}

// Create constants
const inputValue = document.getElementById('inputField');
const myList = document.getElementById('taskList');
const toDoList = [];
const ls = new StorageHelper();

//
function addTaskToList(timestamp, content, completed = false) {
    toDoList.push({
        'timestamp': timestamp,
        'content': content,
        'completed': completed
    });
    ls.save('toDoList', toDoList);
}

function removeTaskFromList(todo) {
    var index = toDoList.indexOf(todo);
    if (index > -1) {
        toDoList.splice(index, 1);
    }
    ls.save('toDoList', toDoList);
}

function renderStoredTasks() {
    // get the local storage
    var tempList = JSON.parse(ls.load('toDoList'));
    tempList.forEach(element => {
        var task = document.createElement('li');
        var date = element.timestamp;
        task.setAttribute('id', date);
        task.innerText = element.content;
        task.classList.add('task-style');

        // Create span; set value to 'X'; add class
        var deleteButton = document.createElement('span');
        deleteButton.innerText = "X";
        deleteButton.classList.add('close');

        // Nest span; nest list
        task.appendChild(deleteButton)
        myList.appendChild(task);
        renderTaskCount();
    });
    // iterate over each creating a task
}

function addTask() {

    // Create list item; update value; add class
    var task = document.createElement('li');
    var date = Date.now();
    task.setAttribute('id', date.toString());
    task.innerText = inputValue.value;
    task.classList.add('task-style');
    addTaskToList(date.toString(), inputValue.value);
    ls.save('toDoList', toDoList);

    // Create span; set value to 'X'; add class
    var deleteButton = document.createElement('span');
    deleteButton.innerText = "X";
    deleteButton.classList.add('close');

    // Nest span; nest list
    task.appendChild(deleteButton)
    myList.appendChild(task);

    // Reset input value
    inputValue.value = "";
    renderTaskCount();
}

//view all tasks
function filterAll() {
    var listToFilter = document.querySelectorAll('li');
    listToFilter.forEach(element => {
        element.style.display = "block";
    });
}

//filter active tasks
function filterActive() {
    var listToFilter = document.querySelectorAll('li');
    listToFilter.forEach(element => {
        if (element.classList.contains("checked")) {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    });
}

//filter completed tasks
function filterCompleted() {
    var listToFilter = document.querySelectorAll('li');
    listToFilter.forEach(element => {
        if (!element.classList.contains("checked")) {
            element.style.display = "none";
        } else {
            element.style.display = "block";
        }
    });
}

// Toggle the "checked" class to the li
myList.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        toDoList.forEach(task => {
            if (task.timestamp == ev.target.id) {
                task.completed = !task.completed;
                ls.save('toDoList', toDoList);
            }
        });
    }
    renderTaskCount();
}, false);

// Remove task (li) when span is clicked
myList.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'SPAN') {
        ev.target.parentElement.remove();
        toDoList.forEach(task => {
            if (task.timestamp == ev.target.parentElement.id) {
                removeTaskFromList(task);
                ls.save('toDoList', toDoList);
            }
        });
    }
    renderTaskCount();
}, false);

function renderTaskCount() {
    var listToFilter = document.querySelectorAll('li');
    var counter = 0;
    listToFilter.forEach(element => {
        if (!element.classList.contains("checked")) {
            counter++;
        }
        return counter;
    });
    var listCountElement = document.getElementById('remainingTasks');
    var taskString = counter === 1 ? "task" : "tasks"
    listCountElement.innerText = `${counter} ${taskString} remaining`;
}

// Create tasks from items in local storage
//addTaskToList('123','Task 1');
//addTaskToList('456','Task 2');
//addTaskToList('789','Task 3', true);

//ls.save('toDoList', toDoList);

//renderStoredTasks();
//console.log(ls.load('toDoList'));

//console.log(ls);

// Upon creation of task, add to local storage

// Upon deleting a task, remove from storage











































// const input = document.getElementById('inputField');
// const taskList = document.getElementById('taskList');

// function addTask() {
//     let task = new Task(input.value);
//     taskList.appendChild(task.container);
// }

// function removeTask(a) {
//     var close = document.getElementsByClassName("close");
//     var i;
//     for (i = 0; i < close.length; i++) {
//         close[i].onclick = function() {
//             var div = this.parentElement;
//             div.style.display = "none";
//         }
//     }
// }

// class Task {
//     constructor(content = "", id = Date.now(), completed = false) {
//         this.id = id.toString();
//         this.content = content;
//         this.completed = completed;
//         this.container = this.createNewTask();
//     }

//     createNewTask() {
//         let container = document.createElement('div');
//         container.setAttribute('id', this.id)
//         container.classList.add('task-style');

//         let checkbox = document.createElement('input');
//         checkbox.setAttribute('type', 'checkbox');

//         let label = document.createElement('label');
//         label.innerText = this.content;

//         let span = document.createElement('span');
//         span.classList.add('custom-checkbox');

//         let deleteButton = document.createElement('button');
//         deleteButton.classList.add('close');
//         deleteButton.addEventListener('click', removeTask());

//         //{
//             //console.log(a);
//             //var myTask = document.getElementById(this.id);
//             //console.log(myTask);
//             //myTask.node.remove();

//         //})
//         deleteButton.innerText = 'X';

//         label.appendChild(span);
//         container.appendChild(checkbox);
//         container.appendChild(label);
//         container.appendChild(deleteButton);

//         return container;
//     }
// }