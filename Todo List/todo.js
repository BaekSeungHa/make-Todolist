const input = document.querySelector("input"); //input addBtn ul input태그를 불러온다
const addBtn = document.querySelector("#addBtn");
const ul = document.querySelector("ul");
const example = document.querySelector("input");

let todos = JSON.parse(localStorage.getItem("todoList")) || {}; //변수 선언  storage에 저장된 것을 가져온다.todolist를 JSON parse가 문자열 분석하고 그 결과에서 객체 생성

let today = new Date(); //날짜 객체
let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();

document.getElementById("date").innerText = `${year}. ${month}. ${date}`; //2022년 07월 11일

addBtn.addEventListener("click", addTodo);

function ExistsTodo(todo) {
  //todos배열 안에 중복된 투두가 있는지 확인
  return Object.keys(todos).includes(todo);
}

function addTodo() {
  //입력한 값
  console.log(input.value);
  const todo = input.value; //todo 는 입력한 값
  if (todo) {
    //만약 입력한값이 있으면
    if (ExistsTodo(todo)) {
      alert("그건 이미 있습니다 다른걸 입력해주세요."); //alert 출력
      return;
    }
    todos[todo] = false; //todos배열 안에 todo의 값은 false
    console.log(todos); //배열 console
    input.value = ""; //input값을 리셋
    saveTodo();
  }
}

function deleteTodo(event, delTodo) {
  const btn = event.target; //이벤트가 실행될곳을 가져,가르킨다
  const li = btn.parentNode; //삭제한 노드의 반환값을 다른 노드에 붙여 노드의 위치를 이동하는 작업에 사용할 수 있다
  ul.removeChild(li); //부모 자식 관계 끊기
  // todos = todos.filter((todo) => todo != delTodo);
  delete todos[delTodo];
  console.log(todos); //지울때 console에 출력
  saveTodo();
}

document.getElementById("clear").addEventListener("click", clearTodoList);
function clearTodoList(e) {
  //목록 전체 삭제하는 경우
  let ul = (document.querySelector("ul").innerHTML = "");
  todos = {};
}

function saveTodo(todo) {
  //문자열로 변환 웹브라우저에있는 저장소 따로따로 묶어서 스트링으로 만들어서 로컬스토리지에 넣어줌 글자밖에 못드감
  localStorage.setItem("todoList", JSON.stringify(todos));
}

function paintTodo(todo) {
  const label = document.createElement("label"); //createElement생성
  const checkBox = document.createElement("input");
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const example = document.createElement("button");

  label.className = "listElement"; //선택자 선언
  checkBox.type = "checkbox"; //체크박스
  checkBox.className = "check"; //선택자 선언
  checkBox.value = todo;
  console.log(todo + ": " + todos[todo]); //ex: 안녕 : false
  label.appendChild(checkBox); //현재 위치에서 새로운 위치로 이동
  label.innerHTML += ` ${todo}  `; //todo를 화면에 출력
  delBtn.innerText = "❌"; //삭제버튼 X
  delBtn.className = "del-btn";
  example.innerText = "";

  li.appendChild(label);
  li.appendChild(delBtn);
  delBtn.addEventListener("click", (event) => {
    //삭제 버튼 누르면
    deleteTodo(event, todo); //deltodo 실행
  });

  ul.appendChild(li);
}

function init() {
  Object.keys(todos).forEach((todo) => {
    //todos의 키들을 불러와 한개씩 paintTodo 인자로 넣어준다
    paintTodo(todo); //
  });
  document.querySelectorAll(".check").forEach((checkBox) => {
    //this 이 객체 this는 체크 박스를 가르킴
    checkBox.checked = todos[checkBox.value]; //todos의 체크박스에 벨류가 키인값이 checkBox.checked
    checkBox.addEventListener("change", function () {
      //checkbox가 실행되면 바꾼다
      todos[this.value] = this.checked; //체크되어있으면ture 아니면false
      saveTodo();
    });
  });
}
init();

document.querySelector("#title-input").focus();
//input창에 입력 마우스 클릭 안하고 바로 바로 입력 가능
