//base URL for MadLibz API
const baseURL = 'http://madlibz.herokuapp.com/api/';

//grab the elements from the HTML
const line = document.getElementById('line');
const options = document.getElementById('options');
const userSaved = document.getElementById('userSaved');

//create starting global elements
var story;
var words;
var title;
var userStory = [];
var counter = 0;
var ending;

// Generate Start button
function start() {
    //create the button
    let startBtn = document.createElement('button');
    //give it some attributes for styling
    startBtn.innerHTML = `Start a New Mad Lib`;
    startBtn.setAttribute('id', 'start');
    //append it to line HTML element
    line.appendChild(startBtn);

    //Call the API when the start button is clicked
    startBtn.addEventListener('click', generate);
}

//get the API data and assign it to the global variables
function generate() {
    //make sure the HTML elements are blank slates to write on
    options.innerHTML = "";
    line.innerHTML = "";
    //counter to keep track of the array index numbers
    counter = 0;
    //clear userStory array if playing additional games
    userStory = [];
    //grab the data from the API
    fetch(baseURL + 'random?minlength=5&maxlength=10')
        .then(response => response.json())
        .then(data => {
            //assign the data to global variables for all functions to access
            words = data.blanks;
            story = data.value;
            //take the last array item create an object to later add to the end of the userStory
            ending = {
                id: Date.now(),
                story: data.value.slice(-2, -1),
                word: ''
            }
            //grab the title
            title = data.title;
            makeWords();
        })
}

//create individual inputs for each of the words
function makeWords() {
    //clear the options div
    options.innerHTML = '';
    //create the progress bar
    progressBar();
    //update the progress value with the counter number
    updateProgress(counter);
    //create the label, input and next button
    line.innerHTML = `<label id="change">${words[counter]}:<input id="word" placeholder="Pick a word..." autofocus required></label><button id="next">next</button><br>`;
    let nextBtn = document.getElementById('next');
    let enterInput = document.getElementById('change');
    //while the counter number is less than the array length, keep adding words to the userStory
    if (counter < words.length - 1) {
        nextBtn.addEventListener('click', () => {
            //create a singleLine with the function addStory
            let singleLine = addToStory();
            //add the singleLine to the userStory
            userStory.push(singleLine);
            //add one to the counter and run it again
            counter++;
            makeWords();
        })
        enterInput.addEventListener('keyup', (ev) => {
            if (ev.key === 'Enter') {
                ev.preventDefault;
                // console.log('I hit enter!');
                //create a singleLine with the function addStory
                let singleLine = addToStory();
                //add the singleLine to the userStory
                userStory.push(singleLine);
                //add one to the counter and run it again
                counter++;
                makeWords();
            }
        })
        //when the counter reaches the end of the words array, change the button innerHTML to 'Build my Story'
    } else {
        nextBtn.innerHTML = 'Build my Story!'
        enterInput.addEventListener('keyup', () => {
            //add the ending to the userStory array
            userStory.push(ending);
            //move on to building the story
            done();
        })
        nextBtn.addEventListener('click', () => {
            //add the ending to the userStory array
            userStory.push(ending);
            //move on to building the story
            done();
        })
    }
};

//build the progress bar
function progressBar() {
    //div for the bar
    let bar = document.createElement('div');
    //div for the fill
    let progressBar = document.createElement('div');
    //add the classes for styling
    bar.classList.add('progress');
    progressBar.classList.add('fill');
    //put them all together
    bar.appendChild(progressBar);
    options.appendChild(bar);
}

//change the progress bar value while creating words
function updateProgress(value) {
    //grab the correct div to change
    var progressBar = document.querySelector('.fill');
    //value is counter plus one to show progress from the beginning, and 0% to make it the correct value for CSS
    progressBar.style.width = `${value + 1}0%`;
}
//create an object to store the story line and the user's word
function addToStory() {
    let singleLine = {
        id: Date.now(),
        story: story[counter],
        word: document.getElementById('word').value
    }
    //console.log(singleLine);
    return (singleLine);
}

//Build the story out and create option buttons
function done() {
    //clear the innerHTML
    line.innerHTML = '';
    let storyTitle = document.createElement('h2');
    storyTitle.innerHTML = title;
    line.appendChild(storyTitle);
    //build the story using the userStory objects
    userStory.forEach(sentence => {
        line.innerHTML += sentence.story + ' ' + `<span>${sentence.word}</span>`;
    })
    //create buttons to either start a new game or save the game to localStorage
    options.innerHTML = `<button id="new">Start a new Mad Lib</button><button id="save">Save Story</button>`;
    var newGame = document.getElementById('new');
    //when the newGame button is clicked start over with the generate function
    newGame.addEventListener('click', () => {
        generate();
    })
    var saveStory = document.getElementById('save');
    saveStory.addEventListener('click', saveMyStory);
}

function saveMyStory() {
    userSaved.innerHTML += 'The story is saved-ish.';
}

start();