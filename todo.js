const input = document.querySelector("input");
const addBtn = document.querySelector("#addBtn");
const ul = document.querySelector("ul");

addBtn.addEventListener("click", addTodo);
function addTodo() {
    const todo = input.value;
    if(todo == ""){
        return 0;
    }
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener('click', deleteTodo);
    span.innerText = todo; //글씨 넣는거 todo 부터 아래로 시작
    li.appendChild(span);
    li.appendChild(delBtn);

    ul.appendChild(li);

    input.value = "";
    }


function deleteTodo(event) {
    console.log(event.target);
    const btn = event.target;
    const li = btn.parentNode;
    ul.removeChild(li);
}