// categoriesModule.js

export function renderCategories(categories, tasks, showCategoryDetails) {
    const categoriesWrapper = document.querySelector(".categories");
    categoriesWrapper.innerHTML = "";
    categories.forEach((category) => {
      const categoryElement = createCategoryElement(category, tasks, showCategoryDetails);
      categoriesWrapper.appendChild(categoryElement);
    });
  }
  
  function createCategoryElement(category, tasks, showCategoryDetails) {
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
      showCategoryDetails(category);
    });
    return categoryElement;
  }
  