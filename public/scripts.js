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

//! -------------------- admin create - add ingredient
const createAddIngredientButton = document.querySelector('.admin-create-btn_add_ingredient')

function createAddIngredient() {
	const ingredients = document.querySelector('#admin-create-ingredients_node')
	const fieldContainer = document.querySelectorAll('.admin-create-ingredients_content')

	// Realiza um clone do último ingrediente adicionado
	let newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

	// Deixa o valor do input vazio
	newField.children[0].value = ''
	ingredients.appendChild(newField)

	// Não adiciona um novo input se o último tem um valor vazio
	if (newField.children[0].value == '') return false
}

if (createAddIngredientButton) {
	createAddIngredientButton.addEventListener('click', createAddIngredient)
}

//! -------------------- admin create - add preparation
const createAddPreparationButton = document.querySelector('.admin-create-btn_add_preparation')

function createAddPreparation() {
	const ingredients = document.querySelector('#admin-create-preparation_node')
	const fieldContainer = document.querySelectorAll('.admin-create-preparation_content')

	// Realiza um clone do último ingrediente adicionado
	let newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

	// Deixa o valor do input vazio
	newField.children[0].value = ''
	ingredients.appendChild(newField)

	// Não adiciona um novo input se o último tem um valor vazio
	if (newField.children[0].value == '') return false
}
if (createAddPreparationButton) {
	createAddPreparationButton.addEventListener('click', createAddPreparation)
}

//todo admin edit - buttons
//! -------------------- admin edit - add ingredient
const editAddIngredientButton = document.querySelector('.admin-edit-btn_add_ingredient')

function editAddIngredient() {
	let ingredients = document.querySelector('.admin-edit-ingredients_content')
	let fieldContainer = document.querySelectorAll('.admin-edit-ingredients_input')

	// Realiza um clone do último ingrediente adicionado
	let newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

	// Deixa o valor do input vazio
	newField.setAttribute('value', '')
    newField.value = ''

	// Não adiciona um novo input se o último tem um valor vazio
	if (fieldContainer[fieldContainer.length - 1].value == '') return false

	ingredients.appendChild(newField)
}

if (editAddIngredientButton) {
	editAddIngredientButton.addEventListener('click', editAddIngredient)
}
