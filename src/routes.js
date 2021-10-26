const express = require('express')
const routes = express.Router()
const recipes = require('./app/controllers/recipes.js')
const chefs = require('./app/controllers/chefs.js')
const data = require('../data.json')

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

//! -------------------- admin recipes - routes
routes.get('/admin/recipes', recipes.index)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)
routes.post('/admin/recipes', recipes.post)
routes.put('/admin/recipes', recipes.put)
routes.delete('/admin/recipes', recipes.delete)


//! -------------------- admin chefs - routes
routes.get('/admin/chefs', chefs.index)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)
routes.post('/admin/chefs', chefs.post)
routes.put('/admin/chefs', chefs.put)
routes.delete('/admin/chefs', chefs.delete)

routes.use(function (req, res) {
	res.status(404).render('not-found')
})

module.exports = routes
