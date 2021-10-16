//form validation

const userName = document.getElementById('name');
const password = document.getElementById('password');
const form = document.getElementById('form');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    let messages = []
    if (userName.value === '' || userName.value == null) {
        messages.push('Name is required, you dummy')
    }

    if (password.value.length <= 6) {
        messages.push(`Password must be longer than 6 characters`)
    }
    if (password.value.length >= 20) {
        messages.push(`Password must be less than 20 characters`)
    }
    if (password.value === 'password' || 'PASSWORD') {
        messages.push(`Password cannot be set to "password"`)
    }
    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }
})

//Object-oriented Programming
//CLASS: like a blueprint, defines all the methods, properties, but doesn't give it data
//OBJECT: like a house, holds the values of properties and what the methods will return
//NEW keyword: take a class and turn it into an object example: NEW Date()
//CONSTRUCTOR is a property of my new Object
//FUNCTIONs are methods of my object

//create a class with the keyword 'class' and give it a name starting w/ a capital letter to designate an object
class House {
    //constructors are the class's properties the parameters are the property names in order
    constructor(houseName, color = undefined, floors, rooms = undefined) {

        //the property extension and variable name are placeholders
        this.houseName = houseName
        this.floors = floors

        //a default value can be inserted if the value of the object is undefined
        this.color = color
        if (color == undefined) {
            this.color = 'beige'
        }
        else {
            this.color = color
        }
      
        if (rooms == undefined) {
            this.rooms = 40
        }
        else {
            this.rooms = rooms
        }

        //properties can also have a function define it
        this.price = this.housePrice()
    }
    //functions inside of the class are called methods
    housePrice() {
        return this.floors * this.rooms * 1000
    }
    getSummary() {
        return `Today's house will be the ${this.houseName}'s house which has ${this.color} walls, ${this.floors} floors, and ${this.rooms} rooms, and costs $${this.price}.`
    }
}

//create a instance of the object and define the parameters
    //the default parameter can be inserted with either 'undefined' or leaving it out if it is the last parameter
const houseObject = new House('Correa', 'red', 7, undefined)
const houseObject2 = new House('Pilkington', undefined, 4)
const houseObject3 = new House('Weasley', 'purple', 7, 10)
const houseObject4 = 


//can call individual properties
console.log(houseObject.color)
console.log(houseObject3.rooms)

console.log(houseObject2.color)

console.log(houseObject3.price)

//or individual methods
console.log(houseObject3.getSummary())
console.log(houseObject2.getSummary())
console.log(houseObject.getSummary())

//can create a new class based on an existing object using the 'extends' keyword 
class Cabin extends House {
    //and add to it, must use the keyword 'super' to supercede the new properties with the existing ones, add the new variable to the end of the list
    constructor(houseName, color, floors, rooms, location) {
        super(houseName, color, floors, rooms)
        //adding location of the Cabin class
        this.location = location
        
    }
    //can reassign the getSummary() method 
    getSummary() {
        return `Today's cabin will be the ${this.name}'s house which has ${this.color} walls, ${this.floors} , and ${this.rooms} rooms, and costs $${this.price}. This cabin in located in ${this.location}.`
    }
}

const cabinObject = new Cabin('Potters', 'brown', 1, 5, 'Silverthorne, CO')

console.log(cabinObject.getSummary())

//can still call the original objects without error
console.log(houseObject3.getSummary())

//A property or method can also be added outside of the class using the keyword 'prototype' 'large' will always be the value of yardSize
House.prototype.yardSize = 'large'
House.prototype.newGetSummary = function() {
    return this.getSummary() + ` This house has a ${House.prototype.yardSize} yard.`
}
//define a new object and pull information about it
const newHouse = new House('New House', 'yellow', 4, 2);
console.log(newHouse.newGetSummary())

//the older objects can use the new methods too! They will have the large yard added to them
console.log(houseObject3.newGetSummary())

//find out if an object has it's own properties
console.log(houseObject2.hasOwnProperty('color'))

//can still use the original method without the addition on the new object
console.log(newHouse.getSummary())

//any new instance of the object can use properties and methods that have been declared
const houseObject4 = new House('Swan', 'white', 5, undefined)
console.log(houseObject4.getSummary())
console.log(houseObject4.newGetSummary())

//change the value of yardSize for all instances of House
House.prototype.yardSize = 'small'
console.log(houseObject4.newGetSummary())

//the new class of Cabin cannot use the new methods
//console.log(cabinObject.prototype.newGetSummary());

