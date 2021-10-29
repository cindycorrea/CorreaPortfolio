//I understand all of this
const textButton = document.getElementById('number');
const apiButton = document.getElementById('chuck');
const outputDiv = document.getElementById('output');
const clearButton = document.getElementById('clear');

//Pulling the API addresses
const textURL = 'http://numbersapi.com/random';
const apiURL = 'https://api.chucknorris.io/jokes/random';

//adding an event listener to do something when the button is clicked
textButton.addEventListener('click', () => {
    //get the data from the numbers site
    fetch(textURL)
        .then(response => {
            //temporary message while the API connects
            outputDiv.innerHTML = 'Waiting for response...';
            //if all is good do this:
            if (response.ok) {
                console.log(response);
                return response;
                //I searched for awhile and couldn't find where they are pulling the text from
            }
            throw Error(response.statusText);
        })
        //where is the "text" in the object? It's working, but how??
        .then(response => response.text())
        .then(text => outputDiv.innerText = text)
        .catch(error => console.log('There was an error.'))
}, false)

//time to pull random Chuck Norris facts in a similar way
apiButton.addEventListener('click', () => {
    fetch(apiURL)
        .then(response => {
            outputDiv.innerHTML = 'Waiting for a response...'
            if (response.ok) {
                console.log(response);
                return response;
            }
            throw Error(response.statusText);
        })
        //just as confused with where the data is coming from, couldn't find it in the JSON object
        .then(response => response.json())
        .then(data => outputDiv.innerHTML = data.value)
        .catch(error => console.log('There was an error:', error))
}, false)

//added my own button to clear the dumb facts away ;)
clearButton.addEventListener('click', () => {
    outputDiv.innerHTML = "Ajax response will appear here";
})