let input = document.getElementById("input-box");

let addBtn = document.getElementById("btn");

let display = document.querySelector("#display");

let todoTasks = [];

let editIndex;

printing();

addBtn.addEventListener("click", () => {
  let inputText = input.value;

  if (editIndex == undefined) {
    if (!inputText) {
      alert("Please Enter Some Task Before Adding");
    } else {
      todoTasks.unshift(inputText);
      localStorage.setItem("todo", JSON.stringify(todoTasks));
      console.log(todoTasks);
      printing();
    }
  } else {
    todoTasks = todoTasks.map((e, i) => {
      if (i == editIndex) {
        return input.value;
      } else {
        return e;
      }
    });
    localStorage.setItem("todo", JSON.stringify(todoTasks));
    printing();
    editIndex = undefined;
    addBtn.innerText = "ADD";
    addBtn.style.backgroundColor = "gray";
  }
});

//printing
function printing() {
  let str = "";
  todoTasks = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : todoTasks;
  todoTasks.forEach((ele, i) => {
    str += ` <div class="card col-3 bg-secondary flex-grow">
                    <div class="card-body">
                        <p class="card-text text-dark">${ele}</p>
                        <button type="button" class="btn btn-danger" onclick="deleteTask(${i})">DEL</button>
                        <button type="button" class="btn btn-info" onclick="editTask(${i})">EDIT</button>
                    </div>
                </div>`;
  });

  display.innerHTML = str;
  input.value = "";
}

//delete

function deleteTask(index) {
  //splice
  todoTasks.splice(index, 1);

  //filter
  // todoTasks = todoTasks.filter((e, i) => {
  //     return i != index;
  // })
  localStorage.setItem("todo", JSON.stringify(todoTasks));
  printing();
}

//edit
function editTask(index) {
  let editData = todoTasks.find((e, i) => i == index);
  input.value = editData;
  editIndex = index;
  addBtn.innerText = "UPDATE";
  addBtn.style.backgroundColor = "blue";
}
