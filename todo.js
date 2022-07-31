const input = document.querySelector("input");
const addBtn = document.querySelector("#addBtn");
const ul = document.querySelector("ul");
const example = document.querySelector("input");

let todos = JSON.parse(localStorage.getItem("todoList")) || {};

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();

document.getElementById("date").innerText = `${year} . ${month} . ${date}`;

addBtn.addEventListener("click", addTodo);

function logTodos() {
  console.log(todos);
}

function addTodo() {
  console.log(input.value);
  const todo = input.value;
  if (todo) {
    paintTodo(todo);
    todos[todo] = false;
    console.log(todos);
    input.value = "";
    saveTodo();
  }
}

function deleteTodo(event, delTodo) {
  const btn = event.target;
  const li = btn.parentNode;
  ul.removeChild(li);

  // todos = todos.filter((todo) => todo != delTodo);
  delete todos[delTodo];
  console.log(todos);

  saveTodo();
}

function saveTodo(todo) {
  localStorage.setItem("todoList", JSON.stringify(todos));
}

function check() {
  // if(checkbox.checked) todos[checkbox.value] = true;
  // else todos[checkbox.value] = false;
  console.log("asdf");
  saveTodo();
}

function paintTodo(todo) {
  const label = document.createElement("label");
  const checkBox = document.createElement("input");
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const example = document.createElement("button");

  label.className = "listElement";
  checkBox.type = "checkbox";
  checkBox.className = "check";
  checkBox.value = todo;
  console.log(todo + ": " + todos[todo]);
  label.appendChild(checkBox);
  label.innerHTML += ` ${todo}  `;
  delBtn.innerText = "❌";
  delBtn.className = "del-btn";
  example.innerText = "";

  li.appendChild(label);
  li.appendChild(delBtn);
  delBtn.addEventListener("click", (event) => {
    deleteTodo(event, todo);
  });

  ul.appendChild(li);
}

function init() {
  Object.keys(todos).forEach((todo) => {
    paintTodo(todo);
  });
  document.querySelectorAll(".check").forEach((checkBox) => {
    checkBox.checked = todos[checkBox.value];
    checkBox.addEventListener("change", function () {
      if (this.checked) todos[this.value] = true;
      else todos[this.value] = false;
      saveTodo();
    });
  });
}
init();
