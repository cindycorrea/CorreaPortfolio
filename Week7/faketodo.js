const form = document.forms['todo'];
form.addEventListener('submit', addTask, false);

function addTask(ev) {
    ev.preventDefault();
    const number = form.task.value;
    const task = {
        userId: 1,
        title: number,
        completed: false
    }
    const data = JSON.stringify(task);
    const url = 'https://jsonplaceholder.typicode.com/todos';

    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    const request = new Request(url, {
        method: 'POST',
        header: headers,
        body: data
    })
    fetch(request)
        .then(response => response.json())
        .then(task => console.log(`This was a pointless exercise with a silly result. What a waste of time.`))
        .catch(error => console.log('There was an error' + error))
}