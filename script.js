// Code goes here
// if there is no localStorage data, initialize array, else, fill the array with localStorage data
if (!localStorage.getItem("task")) {
    arrayTask = [];
} else {
    arrayTask = localStorage.getItem("task").split(",");
}

// add a single task to localStorage
function addTask() {
    let obj = document.taskList.txtNewTask;

    if (obj.value !== "") {
        arrayTask.push(obj.value);
        localStorage.setItem("task", arrayTask);
        showTasks();
        obj.value = "";
    } else {
        alert("Task text field cannot be blank");
    }
}

// show tasks from localStorage
function showTasks() {
    document.getElementById("tasksContainer").innerHTML = "";

    if (typeof(Storage) !== "undefined") {
        for (let i = 0; i < arrayTask.length; i++) {
            // create single task container
            let taskContainer = document.createElement("DIV");
            taskContainer.className = "singleTask";
            // create single task text content
            let taskSpan = document.createElement("SPAN");
            let taskContent = document.createTextNode(arrayTask[i]);
            taskSpan.appendChild(taskContent);
            taskContainer.appendChild(taskSpan);
            // create single task delete button
            let taskDeleteIcon = document.createElement("I");
            taskDeleteIcon.className = "fas fa-times";
            taskDeleteIcon.title = "Delete this task";
            taskDeleteIcon.setAttribute("onclick", "deleteTask(event)");
            taskContainer.appendChild(taskDeleteIcon);
            // add everything to list of tasks
            document.getElementById("tasksContainer").appendChild(taskContainer);
            // clear new task text box
            document.taskList.txtNewTask.value = "";
        }
    } else {
        alert("Sorry! Your browser doesn't support Web Storage, all changes will be lost when you turn off your browser.");
    }
}

// filter tasks
function filterTasks() {
    let txtToFilter = document.tasksForm.txtFilterTasks.value.toUpperCase();
    let groupOfTasks = document.getElementById("tasksContainer").getElementsByTagName("DIV");

    for (let i = 0; i < groupOfTasks.length; i++) {
        let data = groupOfTasks[i].getElementsByTagName("SPAN")[0];
        if (data.innerHTML.toUpperCase().indexOf(txtToFilter) > -1) {
            groupOfTasks[i].style.display = "flex";
        } else {
            groupOfTasks[i].style.display = "none";
        }        
    }
}

// delete all tasks from screen and from localStorage
function clearAllTasks() {
    let taskContainer = document.getElementById("tasksContainer");

    if (taskContainer.innerHTML !== "" && confirm("Do you really want to clear all the tasks?")) {
        // delete all items with 'task' key prefix from localStorage
        localStorage.removeItem("task");
        arrayTask = [];
        // clear task container
        taskContainer.innerHTML = "";
        // clear filter text box
        document.tasksForm.txtFilterTasks.value = "";
    }
}

// delete a single task
function deleteTask(event) {
    if (confirm("Do you really want to delete this task?")) {
        let objParent = event.target.parentElement;

        // delete selected element
        for (let i = 0; i < arrayTask.length; i++) {
            if (objParent.getElementsByTagName("SPAN")[0].innerHTML === arrayTask[i]) {
                arrayTask.splice(i, 1);
                localStorage.setItem("task", arrayTask);
            }
        }
        objParent.remove();
        showTasks();
    }
}

window.onload = showTasks;
