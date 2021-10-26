//! -------------------- recipes - click redirect
const index_recipe = document.querySelectorAll('.index-recipe')
const recipes_recipe = document.querySelectorAll('.recipes-recipe')

function recipeHrefParams(recipes) {
	for (let recipe of recipes) {
		recipe.addEventListener('click', function () {
			const recipeId = recipe.getAttribute('data-recipe_id')
			window.location.href = `/recipes/${recipeId}`
		})
	}
}

if (index_recipe) {
	recipeHrefParams(index_recipe)
}

if (recipes_recipe) {
	recipeHrefParams(recipes_recipe)
}
//
//! -------------------- chefs - click redirect
const index_chef = document.querySelectorAll('.index-chef')
const chefs_chef = document.querySelectorAll('.chefs-chef')

function chefHrefParams(chefs) {
	for (let chef of chefs) {
		chef.addEventListener('click', function () {
			const chefId = chef.getAttribute('data-chef_id')
			window.location.href = `/chefs/${chefId}`
		})
	}
}

if (index_chef) {
	chefHrefParams(index_chef)
}

if (chefs_chef) {
	chefHrefParams(chefs_chef)
}

//! -------------------- admin recipes index - recipes click redirect
const admin_index_recipes = document.querySelectorAll('.admin-recipes-index-recipe')

function adminRecipeHrefParams(recipes) {
	for (let recipe of recipes) {
		recipe.addEventListener('click', function () {
			const recipeId = recipe.getAttribute('data-recipe_id')
			window.location.href = `/admin/recipes/${recipeId}`
		})
	}
}
if (admin_index_recipes) {
	adminRecipeHrefParams(admin_index_recipes)
}

//! -------------------- admin chefs index - chefs click redirect
const admin_index_chefs = document.querySelectorAll('.admin-chefs-index-chef')

function adminchefHrefParams(chefs) {
	for (let chef of chefs) {
		chef.addEventListener('click', function () {
			const chefId = chef.getAttribute('data-chef_id')
			window.location.href = `/admin/chefs/${chefId}`
		})
	}
}

if (admin_index_chefs) {
	adminchefHrefParams(admin_index_chefs)
}

//! -------------------- about - buttons click hide
const hideButtons = document.querySelectorAll('.btn')

if (hideButtons) {
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

if (addIngredientBtn) {
	addIngredientBtn.addEventListener('click', addIngredient)
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

if (addPreparationBtn) {
	addPreparationBtn.addEventListener('click', addPreparation)
}

//! -------------------- global - adds activePage class to headers of same href
const currentPage = location.pathname
const menuItems = document.querySelectorAll('.activeSelector')

if (menuItems) {
	for (item of menuItems) {
		if (currentPage.includes(item.getAttribute('href'))) {
			item.classList.add('activePage')
		}
	}
}

//! -------------------- global - pagination
const pagination = document.querySelector('.pagination')

function createPagination(pagination) {
	const filter = pagination.dataset.filter
	const page = +pagination.dataset.page
	const total = +pagination.dataset.total
	const pages = paginate(page, total)

	let elements = ''

	for (let page of pages) {
		if (String(page).includes('...')) {
			elements += `<span>${page}</span>`
		} else {
			if (filter) {
				elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
			} else {
				elements += `<a href="?page=${page}">${page}</a>`
			}
		}
	}

	pagination.innerHTML = elements
}

if (pagination) {
	createPagination(pagination)
}
