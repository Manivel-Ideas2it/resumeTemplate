const listContainer = document.getElementById("task-list");
const taskInput = document.getElementById("addTask");

function handleSideBar() {
    const sideBar = document.getElementById("sideBar");
    sideBar.style.display = "none";
}

function handleChange(event) {
    const task = event.target.value.trim();
    const taskElement = document.createElement("p");
    taskElement.className = "task-item";
    taskElement.textContent = task;
    listContainer.appendChild(taskElement);
    event.target.value = "";
}
