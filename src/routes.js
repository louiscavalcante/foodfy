const express = require('express')
const routes = express.Router()
const recipes = require('./app/controllers/recipes.js')
const chefs = require('./app/controllers/chefs.js')
const globals = require('./app/controllers/globals.js')

//! -------------------- global routes
routes.get('/', globals.index)
routes.get('/about', globals.about)
routes.get('/recipes', globals.recipes)
routes.get('/recipes/:id', globals.recipe)
routes.get('/chefs', globals.chefs)
routes.get('/chefs/:id', globals.chef)

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
