const express = require('express')
const routes = express.Router()

const home = require('./home.js')
const recipes = require('./recipes.js')
const chefs = require('./chefs.js')

routes.use(home)
routes.use('/admin/recipes', recipes)
routes.use('/admin/chefs', chefs)

// Alias //
routes.get('/admin', (req, res) => res.redirect('/admin/recipes'))

routes.use(function (req, res) {
	res.status(404).render('home/not-found')
})

module.exports = routes
