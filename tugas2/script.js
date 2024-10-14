document.getElementById("add-btn").addEventListener("click", function () {
    const todoInput = document.getElementById("todo-input").value;
    
    if (todoInput) {
        addTodo(todoInput);
        document.getElementById("todo-input").value = ''; // Clear input field
    } else {
        alert("Please enter a task");
    }
});

function addTodo(task) {
    const todoList = document.getElementById("todo-list");
    
    // Create new todo item
    const li = document.createElement("li");
    
    const taskText = document.createElement("span");
    taskText.textContent = task;
    
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "✏️";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = function () {
        const newTask = prompt("Edit task:", taskText.textContent);
        if (newTask) {
            taskText.textContent = newTask;
        }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        todoList.removeChild(li);
    };

    li.appendChild(taskText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}
