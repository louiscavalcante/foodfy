const modal = document.querySelector('.recipes-modal_overlay')
const recipes_recipes = document.querySelectorAll('.recipes-recipe')
const index_recipes = document.querySelectorAll('.index-recipe')

function recipeHrefParams(recipes) {
	for (let recipe of recipes) {
		recipe.addEventListener('click', function () {
			const recipeId = recipe.getAttribute('data-recipe_id')
			window.location.href = `/recipes/${recipeId}`
		})
	}
}

recipeHrefParams(index_recipes)
recipeHrefParams(recipes_recipes)