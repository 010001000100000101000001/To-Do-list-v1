let fireworksPlayed = false;

function updateTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    const formattedDate = now.toLocaleDateString();
    document.getElementById('current-time').textContent = `Time: ${formattedTime}, Date: ${formattedDate}`;
}

function updateTaskStats(taskList, initialLoad = false) {
    const totalTasks = taskList.children.length;
    const completedTasks = Array.from(taskList.children).filter(li => li.querySelector("input[type='checkbox']").checked).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    document.getElementById('task-stats').textContent = `Tasks Completed: ${completionRate}%`;
    
    if (!initialLoad) {
        checkAndPlayFireworks(completionRate);
    }
}

function checkAndPlayFireworks(completionRate) {
   
    if (completionRate === 100 && !fireworksPlayed) {
        playFireworks();
        fireworksPlayed = true;
        
    }
}

function playFireworks() {
    const fireworksContainer = document.getElementById('fireworks-container');
    fireworksContainer.style.display = 'flex';

    setTimeout(() => {
        fireworksContainer.style.display = 'none';
    }, 5000);
}

function saveTasks() {
    const tasks = [];
    Array.from(taskList.children).forEach(li => {
        tasks.push({
            text: li.textContent.replace('Delete', '').trim(),
            completed: li.querySelector("input[type='checkbox']").checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(task => {
            addTask(task.text, task.completed);
        });
    }
    updateTaskStats(taskList, true);
}

function setColorCoding(element, length) {
    if (length < 10) {
        element.style.color = '#4CAF50';
        element.style.backgroundColor = '#E8F5E9';
    } else if (length < 20) {
        element.style.color = '#FF9800';
        element.style.backgroundColor = '#FFF3E0';
    } else {
        element.style.color = '#D32F2F';
        element.style.backgroundColor = '#FBE9E7';
    }
}

const dingSound = new Audio('assets/audio/ding-126626.mp3');
const pingSound = new Audio('assets/audio/ping-82822.mp3');
const deleteSound = new Audio('assets/audio/bong-105459.mp3');

// Function to mute all audio
function muteAudio() {
    dingSound.muted = true;
    pingSound.muted = true;
    deleteSound.muted = true;
}

// Function to unmute all audio
function unmuteAudio() {
    dingSound.muted = false;
    pingSound.muted = false;
    deleteSound.muted = false;
}

// Function to adjust volume
function adjustVolume(level) {
    dingSound.volume = level;
    pingSound.volume = level;
    deleteSound.volume = level;
}

// Mute audio on page load
muteAudio();

// Event Listeners for Mute, Unmute, and Volume Control
document.getElementById('mute-btn').addEventListener('click', muteAudio);
document.getElementById('unmute-btn').addEventListener('click', unmuteAudio);
document.getElementById('volume-control').addEventListener('input', function () {
    adjustVolume(this.value / 100);
});

// Initialize variables
const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

function addTask(taskText, completed = false) {
    const listItem = document.createElement("li");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = completed;
    listItem.appendChild(checkBox);

    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;
    listItem.appendChild(taskContent);

    setColorCoding(taskContent, taskText.length);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    listItem.appendChild(deleteButton);

    deleteButton.addEventListener('click', function () {
        listItem.remove();
        updateTaskStats(taskList);
        deleteSound.play();
        saveTasks();

    });

    checkBox.addEventListener('change', function () {
        if (checkBox.checked) {
            taskContent.style.textDecoration = "line-through";
            dingSound.play();
        } else {
            taskContent.style.textDecoration = "none";
        }
        saveTasks();
        updateTaskStats(taskList);

        // Check if all tasks are completed after this task is checked off
        const completedTasks = Array.from(taskList.children).filter(li => li.querySelector("input[type='checkbox']").checked).length;
        if (completedTasks === totalTasks) {
            playFireworks();
        }
    });

    taskList.appendChild(listItem);
    taskInput.value = "";
    pingSound.play();
    updateTaskStats(taskList);
    saveTasks();
}

// Event Listeners
addButton.addEventListener('click', function () {
    if (taskInput.value.trim()) {
        addTask(taskInput.value.trim());
    }
});

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && taskInput.value.trim()) {
        addTask(taskInput.value.trim());
    }
});

// Local Storage Functions
function saveTasks() {
    const tasks = [];
    Array.from(taskList.children).forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("input[type='checkbox']").checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(task => {
            addTask(task.text, task.completed);
        });
    }
    updateTaskStats(taskList, true);
}

   // Check if all tasks are completed after loading
   const totalTasks = taskList.children.length;
   const completedTasks = Array.from(taskList.children).filter(li => li.querySelector("input[type='checkbox']").checked).length;
   
   updateTaskStats(taskList, true);

   if (completedTasks === totalTasks) {
       playFireworks();
   }

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Initialize the clock
updateTime();
setInterval(updateTime, 1000);