const Recipe = require('../models/recipe.js')

exports.index = function (req, res) {
	Recipe.all(function (allRecipes) {
		return res.render('admin/recipes/index', { recipes: allRecipes })
	})
}

exports.create = function (req, res) {
	Recipe.findChefs(foundChefs => {
		return res.render('admin/recipes/create', { chefs: foundChefs })
	})
}

exports.post = function (req, res) {
	const keys = Object.keys(req.body)

	for (let key of keys) {
		if (req.body[key] == 'empty') {
			return res.send('Por favor, selecione um Chef!')
		}
	}

	const { ingredients, preparation } = req.body

	let arrIngredients = []
	Array.isArray(ingredients) ? (arrIngredients = ingredients) : arrIngredients.push(ingredients)

	let arrPreparation = []
	Array.isArray(preparation) ? (arrPreparation = preparation) : arrPreparation.push(preparation)

	let data = {
		...req.body,
		ingredients: arrIngredients,
		preparation: arrPreparation,
	}

	Recipe.create(data, () => {
		return res.redirect('/admin/recipes')
	})
}

exports.show = function (req, res) {
	const recipeId = req.params.id

	Recipe.find(recipeId, foundRecipe => {
		if (!foundRecipe) return res.status(404).render('not-found')

		return res.render('admin/recipes/show', { recipe: foundRecipe })
	})
}

exports.edit = function (req, res) {
	const recipeId = req.params.id

	Recipe.find(recipeId, foundRecipe => {
		if (!foundRecipe) return res.status(404).render('not-found')

		Recipe.findChefs(foundChefs => {
			return res.render('admin/recipes/edit', { recipe: foundRecipe, chefs: foundChefs })
		})
	})
}

exports.put = function (req, res) {
	const { id: recipeId, ingredients, preparation } = req.body

	let arrIngredients = []
	Array.isArray(ingredients) ? (arrIngredients = ingredients) : arrIngredients.push(ingredients)

	let arrPreparation = []
	Array.isArray(preparation) ? (arrPreparation = preparation) : arrPreparation.push(preparation)

	let data = {
		...req.body,
		ingredients: arrIngredients,
		preparation: arrPreparation,
	}

	Recipe.update(data, () => {
		return res.redirect(`/admin/recipes/${recipeId}`)
	})
}

exports.delete = function (req, res) {
	const { id: recipeId } = req.body

	Recipe.delete(recipeId, () => {
		return res.redirect('/admin/recipes')
	})
}
