const input = document.querySelector("input");        //문서를 불러온다
const addBtn = document.querySelector("#addBtn");            //add버튼 불러오고
const ul = document.querySelector("ul");
                  //ul 태그도 불러온다
let todos = JSON.parse(localStorage.getItem("todoList")) || []; //변수 선언  storage에 저장된 것을 가져온다. todolist를 JSON parse가 문자열 분석하고 그 결과에서 객체 생성

let today = new Date();   
let year = today.getFullYear(); 
let month = today.getMonth() + 1; 
let date = today.getDate();  

document.getElementById("date").innerText = '' + year + '년 ' + month + '월 ' + date + '일';

addBtn.addEventListener("click", addTodo);

function addTodo() { //addTodo 라는 함수 생성
    console.log(input.value); 
    const todo = input.value; 
    if (todo) { //if를 사용하지 않으면 비문자열이 들어감
        paintTodo(todo); //paintTodo 실행
        todos.push(todo); //배열에 넣어주고
        console.log(todos); //출력 해준다
        input.value = "";//input 값을 리셋
        saveTodo();
  } 
}
function checkTodo(event, checkToDo) {

}
function deleteTodo(event, delTodo) {   //
    const btn = event.target;  //이벤트가 실행될곳을 가져온다 가르킨다
    const li = btn.parentNode; //이렇게 삭제한 노드의 반환값을 다른 노드에 붙여서 노드의 위치를 이동하는 작업에 사용 할 수 있다.
    ul.removeChild(li); // 부모 자식 관계를 끊는다
  
    todos = todos.filter((todo) => todo != delTodo); //todos가 배열 안에 있다 배열을 하나 하나씩 연산을해서 델투둔지 확인 아니면 리턴 투두면 투두스에 저장 false면 저장안됨투두랑 델투두가 다르면  투두인것들은 투두스에 저장
    console.log(todos); 

    saveTodo();
}

function saveTodo(todo) {
    localStorage.setItem("todoList", JSON.stringify(todos));  //문자열로 변환 웹브라우저에있는 저장소 따로따로 묶어서 스트링으로 만들어서 로컬스토리지에 넣어줌 글자밖에 못드감
}

function paintTodo(todo) {
    const li = document.createElement('li');
    const span = document.createElement("span");        
    const delBtn = document.createElement("button"); 
 
    span.innerText = todo; 
    delBtn.innerText = "❌";
    checkBtn.innerText = "💦"; 
    li.appendChild(span); //자식 맺기 
    li.appendChild(delBtn); //
    delBtn.addEventListener("click", (event) => { //클릭했을때 deleteTodo 실행
    deleteTodo(event, todo);
    });
    checkBtn.addEventListener("click", (event) => {
    checkTodo(event, todo);
    });

    ul.appendChild(li); 
}

function init(){
    todos.forEach((todo) => {     //for문 연산을 해주는 값들 배열들을 끝날때 까지 돌림 array length 길이를 알려줌 투두스 배열에 값들이있을거아니야 값들을 하나씩 저렇게 화살표 함수처럼 투두에 넣어죠가지고 
        paintTodo(todo);
    });
};
init(); //init이라는 개념 자체는 없다최초 실행되는 이벤트들을 보기 좋게 모아둔 함수 인것 같다