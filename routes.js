const express = require('express')
const routes = express.Router()
const recipes = require('./controllers/recipes.js')
const data = require('./data.json')

routes.get('/', function (req, res) {
	return res.render('index', { recipes: data.recipes })
})

routes.get('/about', function (req, res) {
	return res.render('about')
})

routes.get('/recipes', function (req, res) {
	return res.render('recipes', { recipes: data.recipes })
})

routes.get('/recipes/:index', function (req, res) {
	const recipes = [...data.recipes]
	const recipeIndex = req.params.index

	if (recipeIndex in recipes) {
		return res.render('recipe', { recipe: recipes[recipeIndex] })
	} else {
		return res.status(404).render('not-found')
	}
})

//! -------------------- admin routes
routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)
routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)

routes.use(function (req, res) {
	res.status(404).render('not-found')
})

module.exports = routes
