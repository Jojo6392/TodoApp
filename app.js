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
        btn_checked = btn_checked.value
    }

    //check if we get empty input value because we don't use the form element to check it
    if(title == '' || lieu == '' || heure == '' || description == '') {
        console.log("rentre");
        const elError = document.querySelector(".form-error");
        elError.style.setProperty("--display", "block")
        return;
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
        level: btn_checked,
    }

    //adding in html, parent div
    addTodoInHTML(list)

    //store in local
    localStorage.setItem(`todo-${list.title}`, JSON.stringify(list));
    
    //close form
    document.getElementById("form").reset();
    const elForm = document.querySelector(".form")
    elForm.style.setProperty('--display','none')
    elForm.setAttribute("isActive", false)
}

//function to get all items in the local storage
let isEmpty ;
function getAllItems() {

    var archive = {}
    keys = Object.keys(localStorage)
    i = keys.length;

    while ( i-- ) {
        archive[keys[i]] = localStorage.getItem( keys[i] );
        addTodoInHTML(JSON.parse(archive[keys[i]]));
    }

    isItEmpty(Object.keys(archive).length)
    //console.log(archive);
}

function isItEmpty(item) {
    const elTodos = document.querySelector(".title-todos")
    elTodos.classList.add("elMsg")

    if(item === 0) {
        elTodos.innerHTML = "Vous n'avez aucune tâche :-)"
        isEmpty = true
    }
    else {
        elTodos.innerHTML = "";
        elTodos.innerHTML = "Vos tâches :"
        isEmpty = false
    }
}

//function to add in HTML (parent div : todos) all data get in the parameter
function addTodoInHTML(data) {

    var elTodo = document.createElement("div")
    elTodo.classList.add("todo")
    elTodo.classList.add(`todo-${data.title}`)
    elTodo.innerHTML = `
        <input type="checkbox" class="checkbox-todo" id="checkbox-${data.title}" value="${data.title}">
        <h3>${data.title}</h3>
        <div>${data.heure} - ${data.lieu}</div>
        <div>${data.description}</div>
        <div class="delete-todo" value="${data.title}">🚮</div>`
    const elTodos = document.querySelector(".todos")
    elTodos.insertAdjacentElement("afterbegin", elTodo)
    elTodos.insertAdjacentHTML("afterbegin", "<br />")

    if(data.level == 0) {
        elTodo.style.setProperty("--border", "2px grey solid")
    }
    if(data.level == 1) {
        elTodo.style.setProperty("--border", "2px yellow solid")
    }
    if(data.level == 2) {
        elTodo.style.setProperty("--border", "2px red solid")
    }
    isItEmpty(data)
}

getAllItems()

const btn_display_form = document.querySelector(".display-form")
const elForm = document.querySelector(".form")

btn_display_form.addEventListener("click",() => {
    var isActive = elForm.getAttribute("isActive")
    if(isActive == "false") isActive = false

    if(!isActive) {
        elForm.style.setProperty('--display','block')
    elForm.setAttribute("isActive", true)
    }
    else {
        elForm.style.setProperty('--display','none')
        elForm.setAttribute("isActive", false)
    }

    const btnAnnuler  = document.querySelector(".annuler")
    btnAnnuler.addEventListener("click", () => { 
        elForm.style.setProperty('--display','none')
        elForm.setAttribute("isActive", false)
    })
})

var checkboxesCondition = document.querySelectorAll(".checkbox-todo") !== null
if(checkboxesCondition) {
    var checkboxes = document.querySelectorAll(".checkbox-todo")
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {

            var currentTodo = document.querySelector(`.todo-${checkbox.value}`)
            if(this.checked) {
                currentTodo.style.setProperty("--opacity","0.40")
                currentTodo.style.setProperty("--text","line-through")
            }
            else {
                currentTodo.style.setProperty("--opacity","1")
                currentTodo.style.setProperty("--text","")
            }
        })
    })
}

var deleteElementsCondition = document.querySelectorAll(".delete-todo") !== null
if(deleteElementsCondition) {
    var deleteElements = document.querySelectorAll(".delete-todo")
    deleteElements.forEach(function(deleteElement){
        deleteElement.addEventListener("click", function(){
            var currentTodo = document.querySelector(`.todo-${deleteElement.getAttribute("value")}`)
            //console.log();
            currentTodo.style.display = "none"
            localStorage.removeItem(`todo-${deleteElement.getAttribute("value")}`);
        })
    })
}

    


