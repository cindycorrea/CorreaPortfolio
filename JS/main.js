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