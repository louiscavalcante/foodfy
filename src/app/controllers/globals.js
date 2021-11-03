const Global = require('../models/global.js')

exports.index = function (req, res) {
	Global.allRecipes(function (allRecipes) {
		return res.render('index', { recipes: allRecipes })
	})
}

exports.about = function (req, res) {
	return res.render('about')
}

exports.recipes = function (req, res) {
	let { page, limit } = req.query

	page = page || 1
	limit = limit || 3
	let offset = limit * (page - 1)

	const params = {
		page,
		limit,
		offset,
		callback(foundRecipes) {
			const pagination = {
				total: Math.ceil(foundRecipes[0].total / limit),
				page,
			}
			return res.render('recipes', { recipes: foundRecipes, pagination })
		},
	}
	Global.paginate(params)
}

exports.recipe = function (req, res) {
	const recipeId = req.params.id

	Global.findRecipe(recipeId, function (foundRecipe) {
		if (!foundRecipe) return res.status(404).render('not-found')

		return res.render('recipe', { recipe: foundRecipe })
	})
}

exports.search = function (req, res) {
	let { filter } = req.query

	const params = {
		filter,
		callback(foundRecipes) {
			return res.render('search', { recipes: foundRecipes, filter })
		},
	}
	Global.filterRecipes(params)
}

exports.chefs = function (req, res) {
	Global.allChefs(function (allChefs) {
		return res.render('chefs', { chefs: allChefs })
	})
}

exports.chef = function (req, res) {
	const chefId = req.params.id

	Global.findChef(chefId, function (foundChef) {
		if (!foundChef) return res.status(404).render('not-found')

		Global.findRecipesByChef(chefId, foundRecipes => {
			return res.render('chef', { chef: foundChef, recipes: foundRecipes })
		})
	})
}
