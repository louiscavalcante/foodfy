//! -------------------- index recipes - click redirect
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

//! -------------------- admin index - recipes click redirect
const admin_index_recipes = document.querySelectorAll('.admin-index-recipe')

function adminRecipeHrefParams(recipes) {
	for (let recipe of recipes) {
		recipe.addEventListener('click', function () {
			const recipeId = recipe.getAttribute('data-recipe_id')
			window.location.href = `/admin/recipes/${recipeId}`
		})
	}
}

adminRecipeHrefParams(admin_index_recipes)

//! -------------------- about - buttons click hide
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

//! -------------------- delete confirmation
const formDelete = document.querySelector('#form-delete')
formDelete.addEventListener('click', function (event) {
	const confirmation = confirm('Deseja realmente deletar?')
	if (!confirmation) {
		event.preventDefault()
	}
})

//todo add buttons -------------------- 
//! -------------------- admin edit - add buttons
function addIngredient() {
	const ingredients = document.querySelector('#ingredients')
	const fieldContainer = document.querySelectorAll('.admin-edit-ingredients_content')

	// Realiza um clone do último ingrediente adicionado
	const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

	// Não adiciona um novo input se o último tem um valor vazio
	if (newField.children[0].value == '') return false

	// Deixa o valor do input vazio
	newField.children[0].value = ''
	ingredients.appendChild(newField)
}

document.querySelector('.add-ingredient').addEventListener('click', addIngredient)
