class Todo {
    constructor(title, lieu, heure, description, btn_checked) {
      this.title = title;
      this.lieu = lieu;
      this.heure = heure;
      this.description = description;
      this.btn_checked = btn_checked
    }
}

function sendData() {
    //var btn = document.querySelector("#btn-submit")
    var title = document.querySelector("#title").value
    var lieu = document.querySelector("#lieu").value
    var heure = document.querySelector("#heure").value
    var description = document.querySelector("#description").value
    var btn_checked = document.querySelector(".btn:checked")
    if(btn_checked) {
        console.log(btn_checked.value);
        btn_checked = btn_checked.value
    }

    const todo = new Todo(title, lieu, heure, description, btn_checked)
    title = todo.title
    lieu = todo.lieu
    heure = todo.heure
    description = todo.description
    btn_checked = todo.btn_checked

    var list = {
        title: title,
        lieu: lieu,
        heure: heure,
        description: description,
        level: btn_checked
    }

    //adding in html, parent div
    var elTodo = document.createElement("div")
    elTodo.classList.add("todo")
    elTodo.innerHTML = `
        <h3>${list.title}</h3>
        <div>${list.heure} - ${list.lieu}</div>
        <div>${list.description}</div>`
    
        const elTodos = document.querySelector(".todos")
        elTodos.append(elTodo)

    //store in local
    localStorage.setItem(`todo-${list.title}`, JSON.stringify(list));
    
    //reset form
    document.getElementById("form").reset();

}

//function to get all items in the local storage
function getAllItems() {

    var archive = {}
    keys = Object.keys(localStorage)
    i = keys.length;

    while ( i-- ) {
        archive[keys[i]] = localStorage.getItem( keys[i] );
        addTodoInHTML(JSON.parse(archive[keys[i]]));
    }
    //console.log(archive);
}

//function to add in HTML (parent div : todos) all data get in the parameter
function addTodoInHTML(data) {

    var elTodo = document.createElement("div")
    elTodo.classList.add("todo")
    elTodo.innerHTML = `
        <h3>${data.title}</h3>
        <div>${data.heure} - ${data.lieu}</div>
        <div>${data.description}</div>`
    window.addEventListener("load", function() {
        const elTodos = document.querySelector(".todos")
        elTodos.append(elTodo)
        elTodos.insertAdjacentHTML("beforeend", "<br />")

        if(data.level == 0) {
            elTodo.style.setProperty("--border", "2px grey solid")
        }
        if(data.level == 1) {
            elTodo.style.setProperty("--border", "2px yellow solid")
        }
        if(data.level == 2) {
            elTodo.style.setProperty("--border", "2px red solid")
        }
    });
    
}

getAllItems()

