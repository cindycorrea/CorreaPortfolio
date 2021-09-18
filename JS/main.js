const links = [
    {
        label: 'Week1 notes',
        url: './Week1/week1.html'
    },
    {
        label: 'Week2 notes',
        url: './Week2/week2.html'
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