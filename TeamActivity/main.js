//JSON JavaScript Object Notation- data representation format

const baseURL = 'https://swapi.dev/api/';
const app = document.getElementById('app');
var counter = 3;
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');


function generate() {
    if(counter > 9) {
        return app.innerHTML = `You've reached the end of the list, so stop clicking "next" you idiot`;
    }
    fetch(baseURL + '/people/' + '?page=' + counter)
        .then(response => response.json())
        .then(data => {
            var people = data.results
            console.log(data.results)
            people.forEach(person => {
                var entry = `<div>
                <h2>${person.name}</h2>
                <p>Gender: ${person.gender}</p>
                <p>Eye Color: ${person.eye_color}</p>
            </div>`;
                app.innerHTML += entry;
            });
        })
}
generate();

function previous() {
    counter -= 1;
    app.innerHTML = '';
    generate();
}

function next() {
    counter += 1;
    app.innerHTML = '';
    generate();
}

const numbers = document.getElementById('numbers');

function pageNumber(number) {
    counter = number;
    app.innerHTML = '';
    generate();
}