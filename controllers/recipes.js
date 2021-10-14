const fs = require('fs')
const data = require('../data.json')

exports.index = function (req, res) {
	const { recipes } = data
	const newRecipes = recipes.map(splitFunc)

	function splitFunc(recipe) {
		let recipesFormatted = {
			...recipe,
			school_year: grade(recipe.school_year),
		}
		return recipesFormatted
	}

	return res.render('recipes/index', { recipes: newRecipes })
}

exports.create = function (req, res) {
	return res.render('recipes/create')
}

exports.post = function (req, res) {
	const keys = Object.keys(req.body)

	for (let key of keys) {
		if (req.body[key] == '') {
			return res.send('Please fill all the fields!')
		}
	}

	let {  } = req.body

	let id = 1
	const lastRecipe = data.recipes[data.recipes.length - 1]
	if (lastRecipe) {
		id = lastRecipe.id + 1
	}

	data.recipes.push({
		id,
	})

	fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
		if (err) return res.send('Write file error!')

		return res.redirect('/recipes')
	})
}

exports.show = function (req, res) {
	const { id } = req.params

	const foundRecipe = data.recipes.find(function (recipe) {
		return recipe.id == id
	})

	if (!foundRecipe) return res.send('Recipe not found!')

	const recipe = {
		...foundRecipe,
		birth: date(foundRecipe.birth).birthDay,
		school_year: grade(foundRecipe.school_year),
		created_at: new Intl.DateTimeFormat('pt-BR').format(foundRecipe.created_at),
	}

	return res.render('recipes/show', { recipe: recipe })
}

exports.edit = function (req, res) {
	const { id } = req.params

	const foundRecipe = data.recipes.find(function (recipe) {
		return recipe.id == id
	})

	if (!foundRecipe) return res.send('Recipe not found!')

	const recipe = {
		...foundRecipe,
		birth: date(foundRecipe.birth).iso,
	}

	return res.render('recipes/edit', { recipe: recipe })
}

exports.put = function (req, res) {
	const { id } = req.body
	let index = 0

	const foundRecipe = data.recipes.find(function (recipe, foundIndex) {
		if (id == recipe.id) {
			index = foundIndex
			return true
		}
	})

	if (!foundRecipe) return res.send('Recipe not found!')

	const recipe = {
		...foundRecipe,
		...req.body,
		birth: Date.parse(req.body.birth),
		id: Number(req.body.id),
	}

	data.recipes[index] = recipe

	fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
		if (err) return res.send('Write file error!')

		return res.redirect(`/recipes/${id}`)
	})
}

exports.delete = function (req, res) {
	const { id } = req.body

	const filteredRecipes = data.recipes.filter(function (recipe) {
		return recipe.id != id
	})

	data.recipes = filteredRecipes

	fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
		if (err) return res.send('Write file error!')
	})

	return res.redirect('/recipes')
}
