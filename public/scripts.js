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
if (formDelete) {
	formDelete.addEventListener('click', function (event) {
		const confirmation = confirm('Deseja realmente deletar?')
		if (!confirmation) {
			event.preventDefault()
		}
	})
}

//! -------------------- admin - add ingredient
const addIngredientBtn = document.querySelector('.add-ingredients')

function addIngredient() {
	let ingredients = document.querySelector('.add-ingredients-node')
	let fieldContainer = document.querySelectorAll('.add-ingredients-input')

	// Realiza um clone do último ingrediente adicionado
	let newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

	// Deixa o valor do input vazio
	newField.setAttribute('value', '')
	newField.value = ''

	// Não adiciona um novo input se o último tem um valor vazio
	if (fieldContainer[fieldContainer.length - 1].value == '') return false

	ingredients.appendChild(newField)
}

//! -------------------- admin - add preparation
const addPreparationBtn = document.querySelector('.add-preparation')

function addPreparation() {
	let preparation = document.querySelector('.add-preparation-node')
	let fieldContainer = document.querySelectorAll('.add-preparation-input')

	// Realiza um clone do último ingrediente adicionado
	let newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

	// Deixa o valor do input vazio
	newField.setAttribute('value', '')
	newField.value = ''

	// Não adiciona um novo input se o último tem um valor vazio
	if (fieldContainer[fieldContainer.length - 1].value == '') return false

	preparation.appendChild(newField)
}

if (addIngredientBtn || addPreparationBtn) {
	addIngredientBtn.addEventListener('click', addIngredient)
    addPreparationBtn.addEventListener('click', addPreparation)
}
