//! -------------------- Recipes Click Redirect 
const index_recipes = document.querySelectorAll('.index-recipe')
const recipes_recipes = document.querySelectorAll('.recipes-recipe')

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

//! -------------------- Buttons Click Hide
const hideButtons = document.querySelectorAll('.btn')

for (let btn of hideButtons) {
	btn.addEventListener('click', function () {
		if (btn.innerText === 'ESCONDER') {
			btn.innerText = 'MOSTRAR'
		} else {
			btn.innerText = 'ESCONDER'
		}

		const index = Array.prototype.indexOf.call(hideButtons, btn)
		const hideThis = document.getElementsByClassName('hideThis')
		hideThis[index].classList.toggle('hide')
	})
}
