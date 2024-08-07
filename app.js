var todosJson = JSON.parse(localStorage.getItem("todos") || "[]");
var filters = document.querySelectorAll(".filter");
var filter = "";
var input = document.querySelector("input");
var addButton = document.querySelector(".add-button");
var todosHtml = document.querySelector(".todos");
showTodos();
function getTodoHtml(todo, index) {
    if (filter && filter !== todo.status) {
        return "";
    }
    var checked = todo.status === "completed" ? "checked" : "";
    return "\n    <li class=\"todo\">\n      <label for=\"".concat(index, "\">\n        <input id=\"").concat(index, "\" onclick=\"updateStatus(this)\" type=\"checkbox\" ").concat(checked, ">\n        <span class=\"").concat(checked, "\">").concat(todo.name, "</span>\n      </label>\n      <button class=\"edit-btn\" data-index=\"").concat(index, "\" onclick=\"edit(this)\"><i class=\"fa fa-pencil\"></i></button>\n      <button class=\"delete-btn\" data-index=\"").concat(index, "\" onclick=\"remove(this)\"><i class=\"fa fa-times\"></i></button>\n    </li>\n  ");
}
function showTodos() {
    if (todosJson.length === 0) {
        todosHtml.innerHTML = "";
    }
    else {
        todosHtml.innerHTML = todosJson.map(getTodoHtml).join("");
    }
}
function addTodo(todo) {
    if (input) {
        input.value = "";
    }
    todosJson.unshift({ name: todo, status: "pending" });
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
}
input === null || input === void 0 ? void 0 : input.addEventListener("keyup", function (e) {
    var todo = input.value.trim();
    if (!todo || e.key !== "Enter") {
        return;
    }
    addTodo(todo);
});
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", function () {
    var todo = input.value.trim();
    if (todo) {
        addTodo(todo);
    }
});
function updateStatus(todo) {
    var _a;
    var todoName = (_a = todo.parentElement) === null || _a === void 0 ? void 0 : _a.lastElementChild;
    if (todo.checked) {
        todoName.classList.add("checked");
        todosJson[todo.id].status = "completed";
    }
    else {
        todoName.classList.remove("checked");
        todosJson[todo.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todosJson));
}
function remove(todo) {
    var index = parseInt(todo.dataset.index || "0", 10);
    todosJson.splice(index, 1);
    showTodos();
    localStorage.setItem("todos", JSON.stringify(todosJson));
}
function edit(todo) {
    var index = parseInt(todo.dataset.index || "0", 10);
    var newTodo = prompt("Edit your task:", todosJson[index].name);
    if (newTodo !== null && newTodo.trim() !== "") {
        todosJson[index].name = newTodo.trim();
        localStorage.setItem("todos", JSON.stringify(todosJson));
        showTodos();
    }
}
