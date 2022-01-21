const express = require('express')
const routes = express.Router()

const home = require('./home.js')
const adminRecipes = require('./recipes.js')
const adminChefs = require('./chefs.js')

routes.use(home)
routes.use('/admin/recipes', adminRecipes)
routes.use('/admin/chefs', adminChefs)

//! Alias
routes.get('/admin', (req, res) => res.redirect('/admin/recipes'))

routes.use(function (req, res) {
	res.status(404).render('home/not-found')
})

module.exports = routes
