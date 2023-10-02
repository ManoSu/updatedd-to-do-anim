   // Initialize tasks array or retrieve it from local storage
   const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

   // Function to toggle task completion
   function toggleCompletion(index) {
       tasks[index].completed = !tasks[index].completed;
       updateTasks();
   }

   // Function to render tasks
   function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${i})">
            <span contenteditable="true" onblur="editText(${i}, this)">${task.text}</span>
            <span class="deadline" contenteditable="true" onblur="editDeadline(${i}, this)"> (Deadline: ${task.deadline})</span>
            <button class="edit" onclick="editTask(${i})">Edit Task</button>
            <button class="edit-deadline" onclick="editDeadline(${i})">Edit Deadline</button>
            ${task.completed ? '<button class="delete" onclick="deleteTask(' + i + ')">Delete Task</button>' : ''}
        `;
        li.className = task.completed ? 'completed' : '';
        taskList.appendChild(li);
    }
}


   // Function to update tasks in local storage
   function updateTasks() {
       localStorage.setItem('tasks', JSON.stringify(tasks));
       renderTasks();
   }

   // Function to add a task
   function addTask() {
       const taskInput = document.getElementById('taskInput');
       const deadlineInput = document.getElementById('deadlineInput');
       const text = taskInput.value.trim();
       const deadline = deadlineInput.value;

       if (text === '') {
           alert('Please enter a task.');
           return;
       }

       const currentDate = new Date(); // Get the current date
       const selectedDate = new Date(deadline);

       if (selectedDate < currentDate) {
           alert('Please select a date not before the current date.');
           return;
       }

       const newTask = { text, deadline, completed: false };
       tasks.push(newTask);
       updateTasks();

       // Clear input fields
       taskInput.value = '';
       deadlineInput.value = '';

       // Add animation class
       const taskList = document.getElementById('taskList');
       const lastLi = taskList.lastChild;
       lastLi.classList.add('adding');
   }

   // Function to edit task text
   function editText(index, element) {
       const newText = element.innerText;
       tasks[index].text = newText;
       updateTasks();
   }

   // Function to edit the deadline of a task
   function editDeadline(index, element) {
       const currentDate = new Date(); // Get the current date
       const newDeadline = prompt('Edit deadline:', tasks[index].deadline);

       if (newDeadline !== null) {
           const selectedDate = new Date(newDeadline);

           if (selectedDate < currentDate) {
               alert('Please select a date not before the current date.');
               return;
           }

           tasks[index].deadline = newDeadline;
           updateTasks();
       }
   }

   // Function to delete a task
   function deleteTask(index) {
       tasks.splice(index, 1);
       updateTasks();
   }
   



   // Function to edit a task
   function editTask(index) {
       const newText = prompt('Edit task:', tasks[index].text);
       if (newText !== null) {
           tasks[index].text = newText;
           updateTasks();
       }
   }

   // Initial render
   renderTasks();