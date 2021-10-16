const fs = require('fs')
const data = require('../data.json')

exports.index = function (req, res) {
	const { recipes } = data
	const newRecipes = recipes.map(splitFunc)

	function splitFunc(recipe) {
		let recipesFormatted = {
			...recipe,
		}
		return recipesFormatted
	}

	return res.render('admin/recipes/index', { recipes: newRecipes })
}

exports.create = function (req, res) {
	return res.render('admin/recipes/create')
}

exports.post = function (req, res) {
	const keys = Object.keys(req.body)

	for (let key of keys) {
		if (req.body[key] == '') {
			return res.send('Please fill all the fields!')
		}
	}

	const { image, ingredients, preparation, information } = req.body
	const title = 'Recipe Name'
	const author = 'Admin'

	data.recipes.push({
		image,
		title,
		author,
		ingredients: [ingredients],
		preparation: [preparation],
		information,
	})

	fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
		if (err) return res.send('Write file error!')

		return res.redirect('/admin/recipes')
	})
}

exports.show = function (req, res) {
	const recipes = [...data.recipes]
	const recipeId = req.params.id

	if (recipeId in recipes) {
		return res.render('admin/recipes/show', { recipe: recipes[recipeId], id: recipeId })
	} else {
		return res.status(404).render('not-found')
	}
}

exports.edit = function (req, res) {
	const recipes = [...data.recipes]
	const recipeId = req.params.id

	if (recipeId in recipes) {
		return res.render('admin/recipes/edit', { recipe: recipes[recipeId], id: recipeId })
	} else {
		return res.status(404).render('not-found')
	}
}

exports.put = function (req, res) {
	const { id, image, ingredients, preparation, information } = req.body
	let index = id

	const recipe = {
		...data.recipes[index],
		image,
		ingredients,
		preparation,
		information,
	}

	data.recipes[index] = recipe

	fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
		if (err) return res.send('Write file error!')

		return res.redirect(`/admin/recipes/${id}`)
	})
}

exports.delete = function (req, res) {
	const { id } = req.body

	const filteredRecipes = data.recipes.filter(function (element, index, arr) {
		return arr[index] != arr[id]
	})

	data.recipes = filteredRecipes

	fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
		if (err) return res.send('Write file error!')
	})

	return res.redirect('/admin/recipes')
}
