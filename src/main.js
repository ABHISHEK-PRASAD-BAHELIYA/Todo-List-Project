// main.js

import { renderCategories } from './categoriesModule.js';
import { renderTasks } from './tasksModule.js';
import { setupEventListeners } from './uiModule.js';

let selectedCategory = null;
let tasks = [
  // Initial tasks can be defined here
];
const categories = [
  // Initial categories can be defined here
];

const wrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");
const addTaskBtn = document.querySelector(".add-task-btn");
const blackBackdrop = document.querySelector(".black-backdrop");
const addTask = document.querySelector(".add-task");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");
const categorySelect = document.getElementById("category-select");
const taskInput = document.getElementById("task-input");

menuBtn.addEventListener("click", () => {
  wrapper.classList.add("show-category");
});

backBtn.addEventListener("click", () => {
  wrapper.classList.remove("show-category");
});

function showCategoryDetails(category) {
  selectedCategory = category;
  const categoryTasks = tasks.filter((task) => task.category === category.title);
  renderTasks(categoryTasks, selectedCategory, deleteTask, toggleTaskCompletion);
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderCategories(categories, tasks, showCategoryDetails);
  if (selectedCategory) {
    const categoryTasks = tasks.filter((task) => task.category === selectedCategory.title);
    renderTasks(categoryTasks, selectedCategory, deleteTask, toggleTaskCompletion);
  }
}

function toggleTaskCompletion(taskId, completed) {
  tasks = tasks.map((task) => (task.id === taskId ? { ...task, completed } : task));
  renderCategories(categories, tasks, showCategoryDetails);
  if (selectedCategory) {
    const categoryTasks = tasks.filter((task) => task.category === selectedCategory.title);
    renderTasks(categoryTasks, selectedCategory, deleteTask, toggleTaskCompletion);
  }
}

// Initialize tasks and categories

// Call initial render
renderCategories(categories, tasks, showCategoryDetails);

// Setup event listeners
setupEventListeners(
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
);
