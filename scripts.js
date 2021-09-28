const modal = document.querySelector('.recipes-modal_overlay')
const recipes = document.querySelectorAll('.recipes-recipe')

for (let recipe of recipes) {
	recipe.addEventListener('click', function () {
        const recipeId = recipe.getAttribute('id')
		modal.classList.add('active')
		modal.querySelector('img').src = `/assets/${recipeId}.png`
        modal.querySelector('.recipes-modal_info').innerHTML = recipe.querySelector('.recipes-recipe_info').innerHTML
        modal.querySelector('.recipes-modal_chef').innerHTML = recipe.querySelector('.recipes-recipe_chef').innerHTML
	})
}

//! Closes modal
document.querySelector('.recipes-modal_close').addEventListener('click', function () {
	modal.classList.remove('active')
})