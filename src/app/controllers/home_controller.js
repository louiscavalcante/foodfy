const Home = require('../models/home.js')

exports.index = function (req, res) {
	Home.allRecipes(function (allRecipes) {
		return res.render('home/index', { recipes: allRecipes })
	})
}

exports.about = function (req, res) {
	return res.render('home/about')
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
			return res.render('home/recipes', { recipes: foundRecipes, pagination })
		},
	}
	Home.paginate(params)
}

exports.recipe = function (req, res) {
	const recipeId = req.params.id

	Home.findRecipe(recipeId, function (foundRecipe) {
		if (!foundRecipe) return res.status(404).render('home/not-found')

		return res.render('home/recipe', { recipe: foundRecipe })
	})
}

exports.search = function (req, res) {
	let { filter } = req.query

	const params = {
		filter,
		callback(foundRecipes) {
			return res.render('home/search', { recipes: foundRecipes, filter })
		},
	}
	Home.filterRecipes(params)
}

exports.chefs = function (req, res) {
	Home.allChefs(function (allChefs) {
		return res.render('home/chefs', { chefs: allChefs })
	})
}

exports.chef = function (req, res) {
	const chefId = req.params.id

	Home.findChef(chefId, function (foundChef) {
		if (!foundChef) return res.status(404).render('home/not-found')

		Home.findRecipesByChef(chefId, foundRecipes => {
			return res.render('home/chef', { chef: foundChef, recipes: foundRecipes })
		})
	})
}