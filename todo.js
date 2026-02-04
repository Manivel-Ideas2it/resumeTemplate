const todoObj = {
  tasks: [],
  lists: [],
  activeListId: "myday",
  selectedTaskId: null,
};

const taskInputElement = document.getElementById("addTask");
const listInputElement = document.getElementById("addMenuList");
const listContainer = document.getElementById("side-menu-list-container");
const taskListContainer = document.getElementById("task-list");

document.addEventListener("click", (event) => {
  const button = event.target.closest(".side-menu-btn");
  if (!button) return;
  const listId = button.dataset.listId;
  todoObj.activeListId = listId;
  setActiveMenuList(button);
});

const setActiveMenuList = (activeButton) => {
  document.querySelectorAll(".side-menu-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  activeButton.classList.add("active");
  const toolbar = document.getElementById("listActiveTitle");
  toolbar.innerHTML = "";
  toolbar.innerHTML = `<span>${todoObj.activeListId}</span>`;
  renderTasks();
  closeTaskDetailsPanel();
};

listInputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const newMenu = listInputElement.value.trim();
    addNewMenu(newMenu);
    listInputElement.value = "";
  }
});

const addNewMenu = (newMenuInput) => {
  const menuList = {
    id: `${newMenuInput.toString()}`,
    name: newMenuInput,
  };
  todoObj.lists.push(menuList);
  renderMenuList();
};

const renderMenuList = () => {
  listContainer.innerHTML = "";

  todoObj.lists.forEach((list) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <button class="side-menu-btn" data-list-id="${list.id}">
        <span class="material-symbols-outlined side-menu-btn-icon icon">
          format_list_bulleted
        </span>
        <span>${list.name}</span>
      </button>
    `;

    listContainer.appendChild(li);
  });
};

taskInputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const taskValue = taskInputElement.value.trim();
    addTask(taskValue);
    taskInputElement.value = "";
  }
});

const addTask = (inputValue) => {
  const newTask = {
    id: Date.now().toString(),
    title: inputValue,
    completed: false,
    important: false,
    listId: todoObj.activeListId,
    steps: [],
  };
  todoObj.tasks.push(newTask);
  renderTasks();
};

const renderTasks=()=> {
  const header = document.getElementById("task-list-header-container");
  taskListContainer
    .querySelectorAll(".task-item")
    .forEach((item) => item.remove());
  const visibleTasks = todoObj.tasks.filter(
    (task) => task.listId === todoObj.activeListId,
  );
  if (visibleTasks.length === 0) {
    header.style.display = "none";
    return;
  }
  header.style.display = "flex";

  visibleTasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task-item task-item-container";
    div.dataset.taskId = task.id;
    console.log(`${task.title}`, task.important);
    console.log(`${task.title}`, task.completed);

    
    div.innerHTML = `
      <span class="material-symbols-outlined icon task-status-icon">${task.completed ? "check_circle" : "radio_button_unchecked"}</span>
        <div class="task-item-title">
            <span class="task-title">${task.title}</span>
            <input class="task-edit-input" type="text" name="task-edit-input" value="${task.title}"/>
            <span class="material-symbols-outlined info-icon icon">info</span>
        </div>
        <div class="task-item-due-date icon">
            <span class="material-symbols-outlined icon">calendar_month</span>
        </div>
        <div class="task-item-importance icon">
            <span class="material-symbols-outlined  task-important-icon icon">  ${task.important ? "star_shine" : "star"}</span>
        </div>
    `;

    taskListContainer.appendChild(div);
  });
}

taskListContainer.addEventListener("click", (event) => {
  const infoIcon = event.target.current(".info-icon");
  if (!infoIcon) return;
  event.stopPropagation();
  const taskItem = infoIcon.closest(".task-item");
  if (!taskItem) return;
  const taskId = taskItem.dataset.taskId;
  openTaskDetails(taskId);
});

const openTaskDetails=(taskId)=> {
  todoObj.selectedTaskId = taskId;
  // const task = todoObj.tasks.find((t) => t.id === taskId);
  const panel = document.getElementById("task-details-panel");
  // const title = document.getElementById("task-details-title");
  // title.textContent = task.title;
  panel.classList.add("open");

  renderTaskDetails();
}

taskListContainer.addEventListener("click", (event) => {
  const statusIcon = event.target.closest(".task-status-icon");
  if(!statusIcon) return;
  event.stopPropagation();
  const taskItem = statusIcon.closest(".task-item");
  if(!taskItem) return;
  const taskId = taskItem.dataset.taskId;
  toggleTaskCompleted(taskId);
});

const toggleTaskCompleted =(taskId)=> {
  const task = todoObj.tasks.find(t => t.id === taskId);
   if (!task) return;
  task.completed = !task.completed;
  renderTasks();
  renderTaskDetails();
}

taskListContainer.addEventListener("click", (event) => {
  const starIcon = event.target.closest(".task-important-icon");
  if (!starIcon) return;
  event.stopPropagation();
  const taskItem = starIcon.closest(".task-item");
  if (!taskItem) return;
  const taskId = taskItem.dataset.taskId;
  toggleTaskImportant(taskId);
});

const toggleTaskImportant=(taskId)=> {
  const task = todoObj.tasks.find(t => t.id === taskId);
  if (!task) return;
  task.important = !task.important;
  renderTasks();
  renderTaskDetails()
}


taskListContainer.addEventListener("dblclick", (event) => {
  const editInput = event.target.closest(".task-title");
  if(!editInput) return
  const taskItem = editInput.closest(".task-item");
  if (!taskItem) return;
  event.stopPropagation();
  enterEditMode(taskItem);
})

const enterEditMode =(taskItem)=>{
  const titleSpan = taskItem.querySelector(".task-title");
  const input = taskItem.querySelector(".task-edit-input");
  titleSpan.style.display = "none";
  input.style.display = "block";
  input.focus();
  const taskId = taskItem.dataset.taskId;
  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      saveTaskTitle(taskId, input.value.trim());
    }
    if (e.key === "Escape") {
      exitEditMode(taskItem);
    }
  };
  input.onblur = () => {
    saveTaskTitle(taskId, input.value.trim());
  };
}

const saveTaskTitle=(taskId, newTitle)=> {
  if (!newTitle) {
    renderTasks();
    return;
  }
  const task = todoObj.tasks.find(t => t.id === taskId);
  if (!task) return;
  task.title = newTitle;
  renderTasks();
  renderTaskDetails()
}

const exitEditMode =(taskItem)=> {
  const titleSpan = taskItem.querySelector(".task-title");
  const input = taskItem.querySelector(".task-edit-input");
  titleSpan.style.display = "block";
  input.style.display = "none";
}

const deleteTaskBtn = document.getElementById("task-details-delete");

deleteTaskBtn.addEventListener("click", (event)=>{
    event.stopPropagation();
  if(!todoObj.selectedTaskId) return;
  deleteTask(todoObj.selectedTaskId);
})

const deleteTask =(taskId)=>{
  if(!taskId) return;
  todoObj.tasks = todoObj.tasks.filter(task => task.id !== taskId);
  todoObj.selectedTaskId = null;
  closeTaskDetailsPanel();
  renderTasks();
}

const closePanelBtn  = document.getElementById("task-details-close");

closePanelBtn.addEventListener("click",(event)=>{
  event.stopPropagation();
  closeTaskDetailsPanel();
});

const closeTaskDetailsPanel = () =>{
  const panel = document.getElementById("task-details-panel");
  panel.classList.remove("open");
}


const renderTaskDetails = () => {
  if (!todoObj.selectedTaskId) return;
  const task = todoObj.tasks.find(
    t => t.id === todoObj.selectedTaskId
  );
  if (!task) return;
  document.getElementById("task-details-title").textContent = task.title;
};
