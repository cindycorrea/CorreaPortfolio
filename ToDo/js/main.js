//Helper class to retrieve from and push to localStorage 
class StorageHelper {

    // default constructor when instantiated
    constructor(storage = window.localStorage) {
        this.storage = storage;
    }
    // Retrieves the item 'name' from local storage
    load(name) {
        return this.storage.getItem(name);
    }
    // Pushes key:value pair to local storage
    save(name, info) {
        this.storage.setItem(name, JSON.stringify(info));
    }
}

// Create constants
const inputValue = document.getElementById('inputField');
const myList = document.getElementById('taskList');
const ls = new StorageHelper();
const toDoList = [];

// Creates a task object; adds it to toDoList constant; optional: saves it in local storage
function addTaskToList(timestamp, content, completed = false, save = true) {

    // Creates a task object or key:value pair
    toDoList.push({
        'timestamp': timestamp,
        'content': content,
        'completed': completed
    });

    // If true, it overwrites the toDoList in local storage with the toDoList constant
    if (save) {
        ls.save('toDoList', toDoList);
    }
}

// Removes a task object from the toDoList constant; then overwrites local storage
function removeTaskFromList(todo) {

    // Get the index of the task object within toDoList constant
    var index = toDoList.indexOf(todo);

    // Remove the task object based on its index value
    if (index > -1) {
        toDoList.splice(index, 1);
    }

    // overwrite toDoList in local storage with the updated toDoList constant
    ls.save('toDoList', toDoList);
}

// Loads toDoList from the local storage (if there)
// Creates task elements and task objects for each item in local storage
// Adds newly created task objects to toDoList constant, but
// doesn't overwrite local storage because they're already there
function renderStoredTasks() {

    // If toDoList is not in local storage; render tasks and move on
    if (ls.storage.getItem("toDoList") === null) {
        renderTaskCount();

        // If toDoList is in local storage, iterate over task items
    } else {

        // Pull toDoList items from local storage
        var tempList = JSON.parse(ls.load('toDoList'));

        // Iterate over each task item
        tempList.forEach(element => {

            // Create an html list item
            var task = document.createElement('li');

            // Add the id attribute to the list item
            // with the value set to the time it was created
            task.setAttribute('id', element.timestamp);

            // Set the html inner text to the task item content
            task.innerText = element.content;

            // Add the 'task-style' class to the list item
            task.classList.add('task-style')

            // If the task item has been completed, switch the
            // class to 'checked'
            if (element.completed) {
                task.classList.toggle('checked');
            }

            // Create a task object with the task item
            // Add the task object to toDoList constant, but don't overwrite the local storage
            // because it's already in there (that's where we just got it!)
            addTaskToList(element.timestamp, element.content, element.completed, save = false);

            // Create an html span
            var deleteButton = document.createElement('span');

            // Set the html inner text to 'X'
            deleteButton.innerText = "X";

            // Add the 'close' class to the span item
            deleteButton.classList.add('close');

            // Nest span inside the list item
            task.appendChild(deleteButton)

            // Nest list item inside the myList div
            myList.appendChild(task);

            // Update the task counter
            renderTaskCount();
        });
    }
}

// Creates a new task element and a new task object
function addTask() {

    // If there's nothing in the input field, then alert the user
    if (inputValue.value === '') {
        alert(`You must enter a task`)

        // Otherwise, continue
    } else {

        // Create an html list item
        var task = document.createElement('li');

        // Create a new timestamp for the task
        var date = Date.now();

        // Add the id attribute to the list item
        // with the value set to the new time
        task.setAttribute('id', date.toString());

        // Set the html inner text to the input value
        task.innerText = inputValue.value;

        // Add the 'task-style' class to the list item
        task.classList.add('task-style');

        // Create a task object with the task item
        // Add the task object to toDoList constant, and overwrite the local storage
        addTaskToList(date.toString(), inputValue.value);

        // Create an html span
        var deleteButton = document.createElement('span');

        // Set the html inner text to 'X'
        deleteButton.innerText = "X";

        // Add the 'close' class to the span item
        deleteButton.classList.add('close');

        // Nest span inside the list item
        task.appendChild(deleteButton)

        // Nest list item inside the myList div
        myList.appendChild(task);

        // Reset input value
        inputValue.value = "";

        // Update the task counter
        renderTaskCount();
    }
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


renderStoredTasks();