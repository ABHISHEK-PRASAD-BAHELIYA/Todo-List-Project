const wrapper = document.querySelector(".wrapper");
const homeScreen = document.querySelector(".home-screen");
const categoryScreen = document.querySelector(".category-screen");
const screenBackdrop = document.querySelector(".screen-backdrop");
const categoryDetailsImg = document.getElementById("category-img");
const categoryDetailsTitle = document.getElementById("category-title");
const categoryDetailsTasks = document.getElementById("num-tasks");
const tasksWrapper = document.querySelector(".tasks-wrapper");
const addTaskBtn = document.querySelector(".add-task-btn");
const blackBackdrop = document.querySelector(".black-backdrop");
const addTask = document.querySelector(".add-task");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");
const categorySelect = document.getElementById("category-select");
const taskInput = document.getElementById("task-input");

let selectedCategory = null;

const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");

menuBtn.addEventListener("click", () => {
  wrapper.classList.add("show-category");
});

backBtn.addEventListener("click", () => {
  wrapper.classList.remove("show-category");
});

function renderCategories() {
  const categoriesWrapper = document.querySelector(".categories");
  categoriesWrapper.innerHTML = "";
  categories.forEach((category) => {
    const categoryElement = document.createElement("div");
    categoryElement.classList.add("category");
    categoryElement.innerHTML = `
      <div class="left">
        <img src="images/${category.img}" alt="${category.title}" />
        <div class="content">
          <h1>${category.title}</h1>
          <p>${tasks.filter((task) => task.category === category.title).length} Tasks</p>
        </div>
      </div>
      <div class="options">
        <div class="toggle-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </div>
      </div>
    `;
    categoryElement.addEventListener("click", () => {
      selectedCategory = category;
      showCategoryDetails(category);
    });
    categoriesWrapper.appendChild(categoryElement);
  });
}

function showCategoryDetails(category) {
  categoryDetailsImg.src = `images/${category.img}`;
  categoryDetailsTitle.innerText = category.title;
  const categoryTasks = tasks.filter((task) => task.category === category.title);
  categoryDetailsTasks.innerText = `${categoryTasks.length} tasks`;
  renderTasks(categoryTasks);
}

function renderTasks(categoryTasks) {
  tasksWrapper.innerHTML = "";
  categoryTasks.forEach((task) => {
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
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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
    tasksWrapper.appendChild(taskWrapper);
  });
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  const categoryTasks = tasks.filter((task) => task.category === selectedCategory.title);
  categoryDetailsTasks.innerText = `${categoryTasks.length} tasks`;
  renderTasks(categoryTasks);
  renderCategories();
}

function toggleTaskCompletion(taskId, completed) {
  const task = tasks.find((task) => task.id === taskId);
  task.completed = completed;
  const categoryTasks = tasks.filter((task) => task.category === selectedCategory.title);
  renderTasks(categoryTasks);
}

addTaskBtn.addEventListener("click", () => {
  addTaskBtn.classList.toggle("active");
  addTask.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  renderCategoryOptions();
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
    renderCategories();
    if (selectedCategory && selectedCategory.title === category) {
      const categoryTasks = tasks.filter((task) => task.category === selectedCategory.title);
      categoryDetailsTasks.innerText = `${categoryTasks.length} tasks`;
      renderTasks(categoryTasks);
    }
    addTaskBtn.classList.remove("active");
    addTask.classList.remove("active");
    blackBackdrop.classList.remove("active");
  }
});

function renderCategoryOptions() {
  categorySelect.innerHTML = "";
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.title;
    option.innerText = category.title;
    categorySelect.appendChild(option);
  });
}

renderCategories();
