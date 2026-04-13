document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    // Function to add a new task
    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;

        const li = document.createElement('li');
        li.className = 'task-item';

        li.innerHTML = `
            <div class="custom-radio"></div>
            <span class="task-text">${escapeHTML(text)}</span>
            <button class="delete-btn" aria-label="Delete task">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3V4H4V6H5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
                </svg>
            </button>
        `;

        taskList.appendChild(li);
        taskInput.value = '';
    }

    // Event listener for add button
    addBtn.addEventListener('click', addTask);

    // Event listener for Enter key in input
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Event delegation for marking task as completed and deleting task
    taskList.addEventListener('click', (e) => {
        // Toggle completed state on click
        const taskItem = e.target.closest('.task-item');
        const deleteBtn = e.target.closest('.delete-btn');

        if (taskItem) {
            // If click was on the delete button
            if (deleteBtn) {
                taskItem.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    taskItem.remove();
                }, 300);
            } else {
                // Otherwise toggle the completed state for the strikethrough (slide line)
                taskItem.classList.toggle('completed');
            }
        }
    });

    // Utility function to escape HTML to prevent XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
