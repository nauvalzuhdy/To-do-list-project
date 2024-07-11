
let tasks = [];

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('reset-btn').addEventListener('click', resetTasks);
document.getElementById('completed-btn').addEventListener('click', showCompletedTasks);
document.getElementById('uncompleted-btn').addEventListener('click', showUncompletedTasks);
document.getElementById('overdue-btn').addEventListener('click', showOverdueTasks);

function addTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const timeInput = document.getElementById('time-input');
    const priorityInput = document.getElementById('priority-input');
    const task = {
        text: taskInput.value,
        time: timeInput.value,
        priority: priorityInput.value,
        completed: false
    };
    tasks.push(task);
    renderTasks();
    taskInput.value = '';
    timeInput.value = '';
    priorityInput.value = 'low';
}


function renderTasks(filterTasks = tasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    // task pada foreach = data yang kita dapatkan satu persatu dari inputan
    filterTasks.forEach((task) => { 
        const taskHTML = `
            <li>
                <input type="checkbox" class="task-checkbox" ${task.completed? 'checked' : ''} onclick="toggleCompleted(${tasks.indexOf(task)})">
                <span class=" ${task.completed? 'completed' : ''}">${task.text}</span>
                <span class="task-priority">${task.priority}</span>
                <span class="task-time">${task.time}</span>
                <button class="delete-btn" onclick="deleteTask(${tasks.indexOf(task)})">Delete</button>
            </li>
        `;
        taskList.innerHTML += taskHTML;
    });
}

function deleteTask(taskIndex) {
    tasks.splice(taskIndex, 1);
    renderTasks();
}

function resetTasks() {
    tasks = [];
    renderTasks();
}

function showCompletedTasks() {
    const completedTasks = tasks.filter((task) => task.completed);
    renderTasks(completedTasks);
}

function showUncompletedTasks() {
    const uncompletedTasks = tasks.filter((task) => !task.completed);
    renderTasks(uncompletedTasks);
}

function showOverdueTasks() {
    const overdueTasks = tasks.filter((task) => {
        const taskTime = new Date(task.time);
        const currentTime = new Date();
        return taskTime < currentTime;
    });
    renderTasks(overdueTasks);
}

function toggleCompleted(taskIndex) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
}

renderTasks();