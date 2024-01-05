document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const dingSound = new Audio('assets/audio/ding-126626.mp3');


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
            listItem.appendChild(deleteButton);

            taskList.appendChild(listItem);
            taskInput.value = "";

            deleteButton.addEventListener('click', function () {
                listItem.remove();
            });
            checkBox.addEventListener('change', function () {
                if (checkBox.checked) {
                    taskContent.style.textDecoration = "line-through";
                    dingSound.play();
                } else {
                    taskContent.style.textDecoration = "none";
                }
            });
        }
    }

    function setColorCoding(element, length) {
        if (length < 10) {
            element.style.color = '#4CAF50'; // Green for short tasks
            element.style.backgroundColor = '#E8F5E9';
        } else if (length < 20) {
            element.style.color = '#FF9800'; // Orange for medium length tasks
            element.style.backgroundColor = '#FFF3E0';
        } else {
            element.style.color = '#D32F2F'; // Dark red for long tasks
            element.style.backgroundColor = '#FBE9E7';
        }
    }
    
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function updateTime() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    const formattedDate = now.toLocaleDateString();
    document.getElementById('current-time').textContent = `Time: ${formattedTime}, Date: ${formattedDate}`;
}

// Call updateTime initially and set an interval to update it every second
updateTime();
setInterval(updateTime, 1000);