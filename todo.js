const input = document.querySelector("input");
const addBtn = document.querySelector("#addBtn");
const ul = document.querySelector("ul");
let todos = JSON.parse(localStorage.getItem("todoList")) || [];

addBtn.addEventListener("click", addTodo);

function addTodo() {
    const todo = input.value;
    if (todo) {
        paintTodo(todo);
       todos.push(todo);
       console.log(todos);
       input.value = "";
      //   saveTodo();
  }
}

function deleteTodo(event, delTodo) {
    const btn = event.target;
    const li = btn.parentNode;
    ul.removeChild(li);
  
    todos = todos.filter((todo) => todo != delTodo);
    console.log(todos);
  
    // saveTodo();
}

function paintTodo(todo) {
    const li = document.createElement('li')
    const span = document.createElement("span");
    const delBtn = document.createElement("button");

    span.innerText = todo;
    delBtn.innerText = "❌";

    li.appendChild(span);
    li.appendChild(delBtn);
    delBtn.addEventListener("click", (event) => {
    deleteTodo(event, todo);
    });

    ul.appendChild(li);
}