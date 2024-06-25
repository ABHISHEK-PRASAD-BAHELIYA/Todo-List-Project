// tasksModule.js

export function renderTasks(tasks, selectedCategory, deleteTask, toggleTaskCompletion) {
    const tasksWrapper = document.querySelector(".tasks-wrapper");
    tasksWrapper.innerHTML = "";
    const categoryTasks = tasks.filter((task) => task.category === selectedCategory.title);
    categoryTasks.forEach((task) => {
      const taskWrapper = createTaskElement(task, deleteTask, toggleTaskCompletion);
      tasksWrapper.appendChild(taskWrapper);
    });
  }
  
  function createTaskElement(task, deleteTask, toggleTaskCompletion) {
    const taskWrapper = document.createElement("div");
    taskWrapper.classList.add("task-wrapper");
    taskWrapper.innerHTML = `
      <label for="task-${task.id}" class="task">
        <input type="checkbox" name="task" id="task-${task.id}" ${task.completed ? "checked" : ""} />
        <span class="checkmark">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
        <p>${task.task}</p>
      </label>
      <div class="delete">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m-12-.562a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </div>
    `;
    const deleteBtn = taskWrapper.querySelector(".delete");
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });
    const checkbox = taskWrapper.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", (e) => {
      toggleTaskCompletion(task.id, e.target.checked);
    });
    return taskWrapper;
  }
  