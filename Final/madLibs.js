const baseURL = 'http://madlibz.herokuapp.com/api/';

function generate() {
    fetch(baseURL + 'random?minlength=5&maxlength=11')
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch()
}
generate();