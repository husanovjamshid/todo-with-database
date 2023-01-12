let elLogOut = document.querySelector(".js-logout");
let localData = localStorage.getItem("token");
let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".js-input");
let elList = document.querySelector(".js-list");

// console.log(localData);

if (!localData) {
  location.replace("home.html");
}

elLogOut.addEventListener("click", () => {
  localStorage.removeItem("token");
  location.replace("home.html");
});

async function todoRender() {
  await fetch("http://192.168.4.105:5000/todo", {
    headers: {
      "Content-Type": "application/json",
      Authorization: localData,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      elList.innerHTML = "";
      data.forEach((item) => {
        elList.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">${item.todo_value}  
                <div class="d-flex">
                    <i data-todo-id=${item.id} class="fa-solid fa-trash shadow text-danger todo-delete"></i>
                    <i data-todo-id=${item.id} class="fa-solid fa-pen-to-square shadow text-warning ms-3 todo-edit"></i>
                </div>
            </li>
        `;
      });
    })
    .catch((err) => console.log(err));
}

todoRender();

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  fetch("http://192.168.4.105:5000/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localData,
    },
    body: JSON.stringify({
      text: elInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  todoRender();
  elInput.value = "";
});

function deleteTodos(id) {
  fetch(`http://192.168.4.105:5000/todo/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localData,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        todoRender();
      }
    })
    .catch((err) => console.log(err));
}

function editTodos(id) {
  let newTodo = prompt("Yangi todo kiriting: ");
  fetch(`http://192.168.4.105:5000/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localData,
    },
    body: JSON.stringify({
      text: newTodo,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        todoRender();
      }
    })
    .catch((err) => console.log(err));
}

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".todo-delete")) {
    let itemId = evt.target.dataset.todoId;
    deleteTodos(itemId)
  }

  if (evt.target.matches(".todo-edit")) {
    let itemId = evt.target.dataset.todoId;
    editTodos(itemId);

  }
});
