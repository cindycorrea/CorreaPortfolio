//Customizing the error messages

const email = document.getElementById('mail');

email.addEventListener('input', (e) => {
    if (email.validity.typeMismatch) {
        email.setCustomValidity('I am expecting an e-mail address!');
    } else {
        email.setCustomValidity('');
    }
});

//Using free APIs to generate random dog and cat images

const cat = document.getElementById('cat_result');
const dog = document.getElementById('dog_result');
const catBtn = document.getElementById('cat_button');
const dogBtn = document.getElementById('dog_button');

catBtn.addEventListener('click', getRandomCat)
dogBtn.addEventListener('click', getRandomDog)

function getRandomCat() {
    fetch('https://aws.random.cat/meow')
        .then(result => result.json())
        .then(data => {
            cat.innerHTML = `<img src="${data.file}"/>`
        })
}

function getRandomDog() {
    fetch('https://random.dog/woof.json')
        .then(result => result.json())
        .then(data => {
            console.log(data)
            dog.innerHTML = `<img src="${data.url}"/>`
        })
}

//recommit, I don't know what's going on