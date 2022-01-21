const express = require('express')
const routes = express.Router()
const RecipesController = require('./app/controllers/recipes_controller.js')
const ChefsController = require('./app/controllers/chefs_controller.js')
const HomeController = require('./app/controllers/home_controller.js')
const multer = require('./app/middlewares/multer.js')

//! -------------------- global routes
routes.get('/', HomeController.index)
routes.get('/about', HomeController.about)
routes.get('/recipes', HomeController.recipes)
routes.get('/recipes/:id', HomeController.recipe)
routes.get('/search', HomeController.search)
routes.get('/chefs', HomeController.chefs)
routes.get('/chefs/:id', HomeController.chef)

//! -------------------- admin recipes - routes
routes.get('/admin/recipes', RecipesController.index)
routes.get('/admin/recipes/create', RecipesController.create)
routes.get('/admin/recipes/:id', RecipesController.show)
routes.get('/admin/recipes/:id/edit', RecipesController.edit)
routes.post('/admin/recipes', RecipesController.post)
routes.put('/admin/recipes', RecipesController.put)
routes.delete('/admin/recipes', RecipesController.delete)
routes.post('/admin/recipes', multer.array('photos', 5), RecipesController.post)
routes.put('/admin/recipes', multer.array('photos', 5), RecipesController.put)

//! -------------------- admin chefs - routes
routes.get('/admin/chefs', ChefsController.index)
routes.get('/admin/chefs/create', ChefsController.create)
routes.get('/admin/chefs/:id', ChefsController.show)
routes.get('/admin/chefs/:id/edit', ChefsController.edit)
routes.post('/admin/chefs', ChefsController.post)
routes.put('/admin/chefs', ChefsController.put)
routes.delete('/admin/chefs', ChefsController.delete)

routes.use(function (req, res) {
	res.status(404).render('not-found')
})

module.exports = routes
