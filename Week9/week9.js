///Use setInterval to create an animation in the document
//This is the old way to create animation with JS

const square = document.querySelector('.square');
let angle = 0;

setInterval(() => {
    angle = (angle + 2) % 360;
    square.style.transform = `rotate(${angle}deg)`
}, 1000 / 80);

const square2 = document.querySelector('.square2');
let angle2 = 0;

function rotate() {
    angle = (angle + 2) % 360;
    square2.style.transform = `rotate(-${angle}deg)`
    window.requestAnimationFrame(rotate);
}

const id = requestAnimationFrame(rotate);

//Using the data- attribute in HTML

const display = document.getElementById('display');
const data = document.getElementById('data');
const greeting = data.dataset.greeting;

display.innerHTML = greeting;

const myDiv = document.getElementById('myDiv');
const myName = myDiv.dataset.name;
const myPets = myDiv.getAttribute('data-has-pets');
//  const myPets = myDiv.dataset.hasPets;
console.log(myName);
console.log(myPets);
console.log(myDiv.dataset);

//localStorage.... again

//set an item to local storage
localStorage.setItem('name', 'Mario');
localStorage.setItem(myName, myPets);
localStorage.setItem('myName', 'Cindy');
//get an item from localStorage
console.log(localStorage.getItem(myName));
//localStorage.removeItem('name');
myDiv.innerHTML = localStorage.getItem('myName') + ' loves ' + localStorage.getItem('cindy');
