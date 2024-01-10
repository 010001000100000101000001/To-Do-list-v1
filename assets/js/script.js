function updateTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    const formattedDate = now.toLocaleDateString();
    document.getElementById('current-time').textContent = `Time: ${formattedTime}, Date: ${formattedDate}`;
}

function updateTaskStats(taskList) {
    const totalTasks = taskList.children.length;
    const completedTasks = Array.from(taskList.children).filter(li => li.querySelector("input[type='checkbox']").checked).length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    document.getElementById('task-stats').textContent = `Tasks Completed: ${completionRate}%`;

    if (totalTasks > 0 && completedTasks === totalTasks) {
        playFireworks();
    }
}

function playFireworks() {
    const fireworksSound = new Audio('assets/audio/fireworks-150296.mp3');
    fireworksSound.play();

    const fireworksContainer = document.getElementById('fireworks-container');
    fireworksContainer.style.display = 'flex';

    setTimeout(() => {
        fireworksContainer.style.display = 'none';
    }, 15000);
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

// Initialize variables
const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

const dingSound = new Audio('assets/audio/ding-126626.mp3');
const pingSound = new Audio('assets/audio/ping-82822.mp3');
const deleteSound = new Audio('assets/audio/bong-105459.mp3');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const listItem = document.createElement("li");

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        listItem.appendChild(checkBox);

        const taskContent = document.createElement("span");
        taskContent.textContent = taskText;

        listItem.appendChild(taskContent);

        setColorCoding(taskContent, taskText.length);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        taskContent.style.whiteSpace = 'nowrap';
        taskContent.style.overflow = 'hidden';
        taskContent.style.textOverflow = 'ellipsis';
        taskContent.style.display = 'block';
        taskContent.style.marginRight = '50px';
        listItem.appendChild(deleteButton);

        deleteButton.addEventListener('click', function () {
            listItem.remove();
            updateTaskStats(taskList);
            deleteSound.play();
    
        });

        checkBox.addEventListener('change', function () {
            if (checkBox.checked) {
                taskContent.style.textDecoration = "line-through";
                dingSound.play();
            } else {
                taskContent.style.textDecoration = "none";
            }
            updateTaskStats(taskList);
        });

        taskList.appendChild(listItem);
        taskInput.value = "";
        pingSound.play();
        updateTaskStats(taskList);
    }
}

// Event Listeners
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initialize the clock
updateTime();
setInterval(updateTime, 1000);
