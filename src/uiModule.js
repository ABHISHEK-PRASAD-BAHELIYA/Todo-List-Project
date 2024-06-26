export function setupEventListeners(
    tasks,
    categories,
    renderCategories,
    selectedCategory,
    renderTasks,
    showCategoryDetails,
    deleteTask,
    toggleTaskCompletion
  ) {
    const addTaskBtn = document.querySelector('.add-task-btn');
    const blackBackdrop = document.querySelector('.black-backdrop');
    const cancelBtn = document.querySelector('.cancel-btn');
    const addBtn = document.querySelector('.add-btn');
    const addTask = document.querySelector('.add-task');
    const categorySelect = document.getElementById('category-select');
    const taskInput = document.getElementById('task-input');
    const menuBtn = document.querySelector('.menu-btn');
    const backBtn = document.querySelector('.back-btn');
  
    menuBtn.addEventListener('click', () => {
      document.querySelector('.wrapper').classList.add('show-category');
    });
  
    backBtn.addEventListener('click', () => {
      document.querySelector('.wrapper').classList.remove('show-category');
    });
  
    addTaskBtn.addEventListener('click', () => {
      addTaskBtn.classList.toggle('active');
      addTask.classList.toggle('active');
      blackBackdrop.classList.toggle('active');
      renderCategoryOptions(categories, categorySelect);
    });
  
    blackBackdrop.addEventListener('click', () => {
      addTaskBtn.classList.remove('active');
      addTask.classList.remove('active');
      blackBackdrop.classList.remove('active');
    });
  
    cancelBtn.addEventListener('click', () => {
      addTaskBtn.classList.remove('active');
      addTask.classList.remove('active');
      blackBackdrop.classList.remove('active');
    });
  
    addBtn.addEventListener('click', () => {
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
        taskInput.value = '';
        renderCategories(categories, tasks, showCategoryDetails);
        if (selectedCategory && selectedCategory.title === category) {
          const categoryTasks = tasks.filter(task => task.category === selectedCategory.title);
          renderTasks(categoryTasks);
        }
        addTaskBtn.classList.remove('active');
        addTask.classList.remove('active');
        blackBackdrop.classList.remove('active');
      }
    });
  }
  
  export function renderCategoryOptions(categories, categorySelect) {
    categorySelect.innerHTML = '';
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.title;
      option.innerText = category.title;
      categorySelect.appendChild(option);
    });
  }
  