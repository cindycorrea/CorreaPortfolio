let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField').value;

// addToDoButton.addEventListener('click', function() {
//     var li = document.createElement('li')
//     li.classList.add('task-style')
//     li.innerText = inputField.value
//     toDoContainer.appendChild(li);
//     inputField.value = "";
//     li.addEventListener('click', function() {
//         li.style.textDecoration = 'line-through';
//     })

//     li.addEventListener('dblclick', function() {
//         toDoContainer.removeChild(li);
//     })
// })

addToDoButton.addEventListener('click', function () {
    var task = document.createElement('div');
    var taskName = inputField;

    task.innerHTML =
    `<input type="checkbox" />
    <label>${taskName}
        <span class="custom-checkbox"></span>
    </label>
    <button>X</button>`;

    return task;
})