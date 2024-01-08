document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const dingSound = new Audio('assets/audio/ding-126626.mp3');
    const pingSound = new Audio('assets/audio/ping-82822.mp3');
    const deleteSound = new Audio('assets/audio/bong-105459.mp3')

    // Display the current time and date
    function updateTime() {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString();
        const formattedDate = now.toLocaleDateString();
        document.getElementById('current-time').textContent = `Time: ${formattedTime}, Date: ${formattedDate}`;
    }

    // Update and display task completion statistics
    function updateTaskStats() {
        const totalTasks = taskList.children.length;
        const completedTasks = Array.from(taskList.children).filter(li => li.querySelector("input[type='checkbox']").checked).length;
        const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        document.getElementById('task-stats').textContent = `Tasks Completed: ${completionRate}%`;

        // Check if all tasks are completed
    if (totalTasks > 0 && completedTasks === totalTasks) {
        // Play the fireworks audio
        const fireworksSound = new Audio('assets/audio/fireworks.mp3');
        fireworksSound.play();

        // Display the fireworks image
        document.getElementById('fireworks-container').style.display = 'flex';

        // Hide fireworks after 15 seconds
        setTimeout(() => {
            document.getElementById('fireworks-container').style.display = 'none';
        }, 15000);
    }
}

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

            deleteButton.addEventListener('click', function () {
                listItem.remove(); 
                updateTaskStats(); // Update stats on task deletion
                deleteSound.play(); //Play the delete sound
            });

            checkBox.addEventListener('change', function () {
                if (checkBox.checked) {
                    taskContent.style.textDecoration = "line-through";
                    dingSound.play();
                } else {
                    taskContent.style.textDecoration = "none";
                }
                updateTaskStats(); // Update stats on task completion
            });

            taskList.appendChild(listItem);
            taskInput.value = "";

            // Play the ping sound when a new task is added
            pingSound.play();

            // Update stats after adding a new task
            updateTaskStats();
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

    // Call updateTime initially and set an interval to update it every second
    updateTime();
    setInterval(updateTime, 1000);
});

