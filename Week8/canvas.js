//Canvas- stroke and fill

//get the canvas element
var myCanvas = document.getElementById('myCanvas');
//define that we will be drawing in 2D
var context = myCanvas.getContext('2d');

//define colors
context.strokeStyle = "rgb(217, 217, 230)";
context.fillStyle = "rgb(108, 108, 230)";
context.lineWidth = 5;

//start drawing a rectangle
context.fillRect(20, 20, 160, 160);
context.strokeRect(20, 20, 160, 160);


//Canvas #1- fill with an image
function drawHallows() {
    var canvas1 = document.getElementById('myCanvas1');
    var context1 = canvas1.getContext('2d');

    //get the image and place it in the canvas
    var img = new Image();
    img.src = './images/rsz_deathlyhallows.jpg';
    //onload event handler passes the image to the createPattern method
    img.onload = function () {
        var pattern = context1.createPattern(img, "repeat");
        context1.fillStyle = pattern;
        context1.fillRect(0, 0, 200, 200);
    };
}
//initiate the function to fill the canvas with the image
drawHallows();

//Canvas #2- draw a gradient on the canvas

function drawGradient() {
    //grab the canvas element and define it as a 2D object
    var canvas2 = document.getElementById('myCanvas2');
    var context2 = canvas2.getContext('2d');
    //create a variable to hold the gradient styles
    //define what direction the gradient will go
    var gradient = context2.createLinearGradient(0, 0, 200, 200);
    //add color stops to define the colors, 0 is beginning, 1 is the end
    gradient.addColorStop(0, "#4158D0");
    gradient.addColorStop(0.4, "#C850C0");
    gradient.addColorStop(1, "#FFCC70");

    context2.fillStyle = gradient;
    context2.fillRect(10, 10, 180, 180);
}
//initiate the gradient
drawGradient();

//Canvas #3- draw a circle
var canvas3 = document.getElementById('myCanvas3');

function drawCircle(canvas) {
    var context3 = canvas.getContext('2d');
    //reset the default path so I can begin drawing a new shape
    context3.beginPath();
    //the arc creates one side of the circle
    //arc(x, y, radius, startAngle, endAngle, anticlockwise)
    context3.arc(100, 100, 80, 0, Math.PI * 2, true);
    context3.closePath();
    context3.strokeStyle = "#FFCC70";
    context3.fillStyle = "#C850C0";
    context3.lineWidth = 5;
    context3.fill();
    context3.stroke();
}

drawCircle(canvas3);

//Drag and Drop sorting followed a tutorial from Web Dev Simplified: https://www.youtube.com/watch?v=jfYWwQrtzzY
const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault;
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging');
        //console.log(afterElement)
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement)
        }
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return {
                offset: offset,
                element: child
            }
        } else {
            return closest;
        }
    }, {
        offset: Number.NEGATIVE_INFINITY
    }).element

}