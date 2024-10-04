document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskName = document.getElementById('task-name').value;
    const taskDate = document.getElementById('task-date').value;
    const taskPriority = document.getElementById('task-priority').value;

    if (taskName === '' || taskDate === '') {
        alert('Please fill in all fields');
        return;
    }

    const task = {
        name: taskName,
        date: taskDate,
        priority: taskPriority,
        completed: false
    };

    addTaskToUI(task);
    saveTaskToLocalStorage(task);
    clearInputFields();
}

function addTaskToUI(task) {
    const taskList = document.getElementById('tasks');

    const li = document.createElement('li');
    li.className = task.priority;
    li.setAttribute('data-name', task.name);  // Unique identifier for deletion

    const taskSpan = document.createElement('span');
    taskSpan.textContent = `${task.name} - ${task.date}`;
    if (task.completed) {
        taskSpan.style.textDecoration = 'line-through';
        li.style.backgroundColor = '#d4edda';
    }

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Uncomplete' : 'Complete';
    completeBtn.addEventListener('click', () => toggleCompleteTask(task, taskSpan, li, completeBtn));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task, li));

    li.appendChild(taskSpan);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

function toggleCompleteTask(task, taskSpan, li, button) {
    task.completed = !task.completed;

    if (task.completed) {
        taskSpan.style.textDecoration = 'line-through';
        li.style.backgroundColor = '#d4edda';
        button.textContent = 'Uncomplete';
    } else {
        taskSpan.style.textDecoration = 'none';
        li.style.backgroundColor = '';
        button.textContent = 'Complete';
    }

    updateTaskInLocalStorage(task);
}

function deleteTask(task, taskItem) {
    taskItem.remove();
    deleteTaskFromLocalStorage(task.name);
}

function saveTaskToLocalStorage(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => addTaskToUI(task));
}

function updateTaskInLocalStorage(updatedTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.map(task => task.name === updatedTask.name ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromLocalStorage(taskName) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task.name !== taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearInputFields() {
    document.getElementById('task-name').value = '';
    document.getElementById('task-date').value = '';
    document.getElementById('task-priority').value = 'low';
}
