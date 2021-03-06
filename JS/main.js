const links = [
    {
        label: 'Week 1',
        url: './Week1/week1.html'
    },
    {
        label: 'Week 2',
        url: './Week2/week2.html'
    }, 
    {
        label: 'Week 3',
        url: './Week3/week3.html'
    }, 
    {
        label: 'Week 4',
        url: './Week4/week4.html'
    },
    {
        label: 'Week 5',
        url: './Week5/week5.html'
    },
    {
        label: 'To Do App',
        url: './ToDo/toDo.html'
    },
    {
        label: 'Week 7',
        url: './Week7/week7.html'
    },
    {
        label: 'Week 8',
        url: './Week8/week8.html'
    },
    {
        label: 'Week 9',
        url: './Week9/week9.html'
    },
    {
        label: 'Week 10',
        url: './Week10/week10.html'
    },
    {
        label: 'Final Project',
        url: './Final/madLibs.html'
    },
    {
        label: 'Religion',
        url: './REL/rel.html'
    }
]

let menu = document.getElementById('menu');

links.forEach(function (menuItem){
    let a = document.createElement('a');
    let li = document.createElement('li');
    li.innerHTML += menuItem.label;
    a.setAttribute('href', menuItem.url);

    a.appendChild(li);
    menu.appendChild(a);
});