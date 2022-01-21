const express = require('express')
const routes = express.Router()

const RecipesController = require('../app/controllers/recipes_controller.js')
const multer = require('../app/middlewares/multer.js')

//! -------------------- admin recipes - routes
routes.get('/', RecipesController.index)
routes.get('/create', RecipesController.create)
routes.get('/:id', RecipesController.show)
routes.get('/:id/edit', RecipesController.edit)
routes.post('/', RecipesController.post)
routes.put('/', RecipesController.put)
routes.delete('/', RecipesController.delete)
routes.post('/', multer.array('photos', 5), RecipesController.post)
routes.put('/', multer.array('photos', 5), RecipesController.put)

module.exports = routes