function createTaskItem(task, description) {
    const li = document.createElement("li");
    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");
    taskInfo.innerHTML = `<strong>${task}</strong><br>${description}`;
    
    const actionButtons = document.createElement("div");
    actionButtons.classList.add("action-buttons");
    
    const tickIcon = document.createElement("span");
    tickIcon.innerHTML = "&#10004;";
    tickIcon.classList.add("tick");
    
    const deleteIcon = document.createElement("span");
    deleteIcon.innerHTML = "&#10008;";
    deleteIcon.classList.add("delete");
    
    actionButtons.appendChild(tickIcon);
    actionButtons.appendChild(deleteIcon);
    
    li.appendChild(taskInfo);
    li.appendChild(actionButtons);

    return li;
}

function addCustomTask(task, description) {
    const taskItem = createTaskItem(task, description);
    document.getElementById("remaining-list").appendChild(taskItem);

    const tickIcon = taskItem.querySelector(".tick");
    tickIcon.addEventListener("click", function () {
        moveTaskToCompleted(taskItem, task);
    });

    const deleteIcon = taskItem.querySelector(".delete");
    deleteIcon.addEventListener("click", function () {
        removeTaskFromRemaining(taskItem, task);
    });
}

function moveTaskToCompleted(taskItem, task) {
    const completedList = document.getElementById("completed-list");
    taskItem.querySelector(".action-buttons").remove();
    completedList.appendChild(taskItem);

    const remainingTasks = getRemainingTasks();
    const index = remainingTasks.findIndex(item => item.task === task);
    if (index !== -1) {
        remainingTasks.splice(index, 1);
        setRemainingTasks(remainingTasks);
    }
}

function removeTaskFromRemaining(taskItem, task) {
    const remainingList = document.getElementById("remaining-list");
    taskItem.remove();

    const remainingTasks = getRemainingTasks();
    const index = remainingTasks.findIndex(item => item.task === task);
    if (index !== -1) {
        remainingTasks.splice(index, 1);
        setRemainingTasks(remainingTasks);
    }
}

function getRemainingTasks() {
    const tasksJSON = localStorage.getItem("remainingTasks");
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

function setRemainingTasks(tasks) {
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem("remainingTasks", tasksJSON);
}

function loadTasksFromLocalStorage() {
    const remainingTasks = getRemainingTasks();
    remainingTasks.forEach(({ task, description }) => {
        addCustomTask(task, description);
    });
}

document.getElementById("addTaskBtn").addEventListener("click", function () {
    const taskInput = document.getElementById("taskInput");
    const descriptionInput = document.getElementById("descriptionInput");
    const task = taskInput.value.trim();
    const description = descriptionInput.value.trim();

    if (task !== "") {
        addCustomTask(task, description);
        taskInput.value = "";
        descriptionInput.value = "";

        const remainingTasks = getRemainingTasks();
        remainingTasks.push({ task, description });
        setRemainingTasks(remainingTasks);
    }
});

window.addEventListener("load", function () {
    loadTasksFromLocalStorage();
});
