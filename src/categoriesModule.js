export function renderCategories(categories, tasks, showCategoryDetails) {
  // Get the categories wrapper element from the DOM
  const categoriesWrapper = document.querySelector('.categories');
  
  // Check if the categories wrapper exists
  if (!categoriesWrapper) {
    console.error("Categories wrapper not found in the DOM.");
    return;
  }

  // Clear the categories wrapper
  categoriesWrapper.innerHTML = '';

  // Check if categories and tasks are arrays
  if (!Array.isArray(categories) || !Array.isArray(tasks)) {
    console.error("Invalid categories or tasks data.");
    return;
  }

  // Loop through each category and create an element for it
  categories.forEach(category => {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('category');
    categoryElement.innerHTML = `
      <div class="left">
        <img src="images/${category.img}" alt="${category.title}" />
        <div class="content">
          <h1>${category.title}</h1>
          <p>${tasks.filter(task => task.category === category.title).length} Tasks</p>
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

    // Add a click event listener to the category element
    categoryElement.addEventListener('click', () => {
      if (typeof showCategoryDetails === 'function') {
        showCategoryDetails(category);
      } else {
        console.error("showCategoryDetails is not a function.");
      }
    });

    // Append the category element to the categories wrapper
    categoriesWrapper.appendChild(categoryElement);
  });
}
