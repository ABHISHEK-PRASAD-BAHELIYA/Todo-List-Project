export function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderCategories(categories, tasks, showCategoryDetails);
    if (selectedCategory) {
      const categoryTasks = tasks.filter(task => task.category === selectedCategory.title);
      renderTasks(categoryTasks);
    }
  }
  
  export function toggleTaskCompletion(taskId, completed) {
    tasks = tasks.map(task => (task.id === taskId ? { ...task, completed } : task));
    renderCategories(categories, tasks, showCategoryDetails);
    if (selectedCategory) {
      const categoryTasks = tasks.filter(task => task.category === selectedCategory.title);
      renderTasks(categoryTasks);
    }
  }
  