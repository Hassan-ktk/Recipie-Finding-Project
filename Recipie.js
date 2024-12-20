const API_ID = "2cbb7807";
const API_KEY = "17222f5be3577d4980d6ee3bb57e9f00";

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const recipesContainer = document.getElementById("recipes");


async function getRecipe(query) {
  if (!query) return; 
  const response = await fetch(
    `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`
  );
  const data = await response.json();
  displayRecipes(data.hits);
}

function displayRecipes(recipes) {
  recipesContainer.innerHTML = "";
  recipes.forEach((item) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");

    recipeDiv.innerHTML = `
      <img class="recipe-img" src="${item.recipe.image}" alt="${item.recipe.label}" />
      <h2>${item.recipe.label}</h2>
      <a href="${item.recipe.url}" target="_blank">
        <button class="button">View Recipe</button>
      </a>
    `;

    recipesContainer.appendChild(recipeDiv);
  });
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  getRecipe(query);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    getRecipe(query);
  }
});
