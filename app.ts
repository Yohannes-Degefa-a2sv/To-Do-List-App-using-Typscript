let todosJson: { name: string; status: string }[] = JSON.parse(
  localStorage.getItem("todos") || "[]"
);

const filters = document.querySelectorAll<HTMLElement>(".filter");
let filter: string = "";

const input = document.querySelector<HTMLInputElement>("input");
const addButton = document.querySelector<HTMLButtonElement>(".add-button");
const todosHtml = document.querySelector<HTMLElement>(".todos");

showTodos();

function getTodoHtml(
  todo: { name: string; status: string },
  index: number
): string {
  if (filter && filter !== todo.status) {
    return "";
  }

  let checked = todo.status === "completed" ? "checked" : "";
  return `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="edit-btn" data-index="${index}" onclick="edit(this)"><i class="fa fa-pencil"></i></button>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
  `;
}

function showTodos(): void {
  if (todosJson.length === 0) {
    todosHtml.innerHTML = "";
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join("");
  }
}

function addTodo(todo: string): void {
  if (input) {
    input.value = "";
  }
  todosJson.unshift({ name: todo, status: "pending" });
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

input?.addEventListener("keyup", (e: KeyboardEvent) => {
  let todo = input.value.trim();
  if (!todo || e.key !== "Enter") {
    return;
  }
  addTodo(todo);
});

addButton?.addEventListener("click", () => {
  let todo = input.value.trim();
  if (todo) {
    addTodo(todo);
  }
});

function updateStatus(todo: HTMLInputElement): void {
  let todoName = todo.parentElement?.lastElementChild as HTMLElement;
  if (todo.checked) {
    todoName.classList.add("checked");
    todosJson[todo.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    todosJson[todo.id].status = "pending";
  }
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

function remove(todo: HTMLButtonElement): void {
  const index = parseInt(todo.dataset.index || "0", 10);
  todosJson.splice(index, 1);
  showTodos();
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

function edit(todo: HTMLButtonElement): void {
  const index = parseInt(todo.dataset.index || "0", 10);
  const newTodo = prompt("Edit your task:", todosJson[index].name);
  if (newTodo !== null && newTodo.trim() !== "") {
    todosJson[index].name = newTodo.trim();
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
  }
}
