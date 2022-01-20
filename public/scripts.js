//! -------------------- recipes - click redirect
const index_recipe = document.querySelectorAll('.index-recipe')
const recipes_recipe = document.querySelectorAll('.recipes-recipe')
const search_recipe = document.querySelectorAll('.search-recipe')

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

if (search_recipe) {
	recipeHrefParams(search_recipe)
}

//! -------------------- chefs - click redirect
const chefs_chef = document.querySelectorAll('.chefs-chef')

function chefHrefParams(chefs) {
	for (let chef of chefs) {
		chef.addEventListener('click', function () {
			const chefId = chef.getAttribute('data-chef_id')
			window.location.href = `/chefs/${chefId}`
		})
	}
}

if (chefs_chef) {
	chefHrefParams(chefs_chef)
}

//! -------------------- admin recipes index - recipes click redirect
const admin_index_recipes = document.querySelectorAll('.admin-recipes-index-recipe_info_show')

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

//! -------------------- admin chefs index - chef click redirect
const admin_index_chefs = document.querySelectorAll('.admin-chefs-index-chef_info_show')

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
		const hasRecipes = formDelete.getAttribute('data-has_recipes')
        console.log(hasRecipes)
		if (hasRecipes.length > 0) {
			alert('Não é possível deletar Chefs que contém receitas cadastradas!')
			event.preventDefault()
		} else {
			const confirmation = confirm('Deseja realmente deletar?')
			if (!confirmation) {
				event.preventDefault()
			}
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

//! -------------------- global header - adds activePage class to headers of same href
const currentPage = location.pathname
const menuItems = document.querySelectorAll('.activeSelector')

if (menuItems) {
	for (item of menuItems) {
		if (currentPage.includes(item.getAttribute('href'))) {
			item.classList.add('activePage')
		}
	}
}

//! -------------------- admin global header - adds admin-activePage class to headers of same href
const adminCurrentPage = location.pathname
const adminMenuItems = document.querySelectorAll('.admin-activeSelector')

if (adminMenuItems) {
	for (item of adminMenuItems) {
		if (adminCurrentPage.includes(item.getAttribute('href'))) {
			item.classList.add('admin-activePage')
		}
	}
}

//! -------------------- pagination
function paginate(selectedPage, totalPages) {
	let pages = [],
		oldPage

	for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
		const firstAndLastPage = currentPage == 1 || currentPage == totalPages
		const pagesAfterSelectedPage = currentPage <= selectedPage + 2
		const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

		if (firstAndLastPage || (pagesBeforeSelectedPage && pagesAfterSelectedPage)) {
			if (oldPage && currentPage - oldPage > 2) {
				pages.push('...')
			}

			if (oldPage && currentPage - oldPage == 2) {
				pages.push(oldPage + 1)
			}

			pages.push(currentPage)

			oldPage = currentPage
		}
	}

	return pages
}

function createPagination(pagination) {
	const page = +pagination.dataset.page
	const total = +pagination.dataset.total
	const pages = paginate(page, total)

	let elements = ''

	for (let page of pages) {
		if (String(page).includes('...')) {
			elements += `<span>${page}</span>`
		} else {
			elements += `<a href="?page=${page}">${page}</a>`
		}
	}

	pagination.innerHTML = elements
}

const pagination = document.querySelector('.recipes-pagination')

if (pagination) {
	createPagination(pagination)
}

//! -------------------- photos manager
const PhotosUpload = {
	input: '',
	preview: document.querySelector('#photos-preview'),
	uploadLimit: 5,
	files: [],
	handleFileInput(event) {
		const { files: fileList } = event.target
		PhotosUpload.input = event.target

		if (PhotosUpload.hasLimit(event)) return

		Array.from(fileList).forEach(file => {
			PhotosUpload.files.push(file)

			const reader = new FileReader()

			reader.onload = () => {
				const image = new Image()
				image.src = String(reader.result)

				const div = PhotosUpload.getContainer(image)
				PhotosUpload.preview.appendChild(div)
			}

			reader.readAsDataURL(file)
		})

		PhotosUpload.input.files = PhotosUpload.getAllFiles()
	},
	hasLimit(event) {
		const { uploadLimit, input, preview } = PhotosUpload
		const { files: fileList } = input

		if (fileList.length > uploadLimit) {
			alert(`Envie no máximo ${uploadLimit} fotos`)
			event.preventDefault()
			return true
		}

		const photosDiv = []
		preview.childNodes.forEach(item => {
			if (item.classList && item.classList.value == 'photo') {
				photosDiv.push(item)
			}
		})

		const totalPhotos = fileList.length + photosDiv.length
		if (totalPhotos > uploadLimit) {
			alert(`Você atingiu o limite máximo de ${uploadLimit} fotos`)
			event.preventDefault()
			return true
		}

		return false
	},
	getAllFiles() {
		const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer()

		PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

		return dataTransfer.files
	},
	getContainer(image) {
		const div = document.createElement('div')
		div.classList.add('photo')

		div.onclick = PhotosUpload.removePhoto

		div.appendChild(image)

		div.appendChild(PhotosUpload.getRemoveButton())

		return div
	},
	getRemoveButton() {
		const button = document.createElement('i')
		button.classList.add('material-icons')
		button.innerHTML = 'close'

		return button
	},
	removePhoto(event) {
		const photoDiv = event.target.parentNode // <div class="photo">
		const photosArray = Array.from(PhotosUpload.preview.children)
		const index = photosArray.indexOf(photoDiv)

		PhotosUpload.files.splice(index, 1)
		PhotosUpload.input.files = PhotosUpload.getAllFiles()

		photoDiv.remove()
	},
	removeOldPhoto(event) {
		const photoDiv = event.target.parentNode // <div class="photo">

		if (photoDiv.id) {
			const removedFiles = document.querySelector('input[name="removed_files"]')
			if (removedFiles) {
				removedFiles.value += `${photoDiv.id},`
			}
		}

		photoDiv.remove()
	},
}

//! -------------------- image gallery select
const ImageGallery = {
	highlight: document.querySelector('.gallery .highlight > img'),
	previews: document.querySelectorAll('.gallery-preview img'),
	setImage(event) {
		const { target } = event

		ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
		target.classList.add('active')

		ImageGallery.highlight.src = target.src
		Lightbox.image.src = target.src
	},
}

//! -------------------- lightbox
const Lightbox = {
	target: document.querySelector('.lightbox-target'),
	image: document.querySelector('.lightbox-target img'),
	open() {
		Lightbox.target.style.opacity = 1
		Lightbox.target.style.top = 0
		Lightbox.target.style.bottom = 0
	},
	close() {
		Lightbox.target.style.opacity = 0
		Lightbox.target.style.top = '-100%'
		Lightbox.target.style.bottom = 'initial'
	},
}