// uiModule.js

export function setupEventListeners(
    addTaskBtn,
    blackBackdrop,
    cancelBtn,
    addBtn,
    addTask,
    categorySelect,
    taskInput,
    tasks,
    categories,
    renderCategories,
    selectedCategory,
    renderTasks,
    showCategoryDetails,
    deleteTask,
    toggleTaskCompletion
  ) {
    addTaskBtn.addEventListener("click", () => {
      addTaskBtn.classList.toggle("active");
      addTask.classList.toggle("active");
      blackBackdrop.classList.toggle("active");
      renderCategoryOptions(categories, categorySelect);
    });
  
    blackBackdrop.addEventListener("click", () => {
      addTaskBtn.classList.remove("active");
      addTask.classList.remove("active");
      blackBackdrop.classList.remove("active");
    });
  
    cancelBtn.addEventListener("click", () => {
      addTaskBtn.classList.remove("active");
      addTask.classList.remove("active");
      blackBackdrop.classList.remove("active");
    });
  
    addBtn.addEventListener("click", () => {
      const task = taskInput.value.trim();
      const category = categorySelect.value;
      if (task && category) {
        const newTask = {
          id: tasks.length + 1,
          task: task,
          category: category,
          completed: false,
        };
        tasks.push(newTask);
        taskInput.value = "";
        renderCategories(categories, tasks, showCategoryDetails);
        if (selectedCategory && selectedCategory.title === category) {
          const categoryTasks = tasks.filter((task) => task.category === selectedCategory.title);
          renderTasks(categoryTasks, selectedCategory, deleteTask, toggleTaskCompletion);
        }
        addTaskBtn.classList.remove("active");
        addTask.classList.remove("active");
        blackBackdrop.classList.remove("active");
      }
    });
  }
  
  export function renderCategoryOptions(categories, categorySelect) {
    categorySelect.innerHTML = "";
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.title;
      option.innerText = category.title;
      categorySelect.appendChild(option);
    });
  }
  