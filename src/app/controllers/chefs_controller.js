const Chef = require('../models/chef.js')

exports.index = function (req, res) {
	Chef.all(function (allChefs) {
		return res.render('admin/chefs/index', { chefs: allChefs })
	})
}

exports.create = function (req, res) {
	return res.render('admin/chefs/create')
}

exports.post = function (req, res) {
	const keys = Object.keys(req.body)

	for (let key of keys) {
		if (req.body[key] == '') {
			return res.send('Por favor, preencha todos os campos!')
		}
	}

	const data = req.body

	Chef.create(data, () => {
		return res.redirect('/admin/chefs')
	})
}

exports.show = function (req, res) {
	const chefId = req.params.id

	Chef.find(chefId, foundChef => {
		if (!foundChef) return res.status(404).render('not-found')

		Chef.findRecipes(chefId, foundRecipes => {
			return res.render('admin/chefs/show', { chef: foundChef, recipes: foundRecipes })
		})
	})
}

exports.edit = function (req, res) {
	const chefId = req.params.id

	Chef.find(chefId, foundChef => {
		if (!foundChef) return res.status(404).render('not-found')

		Chef.findRecipes(chefId, foundRecipes => {
			return res.render('admin/chefs/edit', { chef: foundChef, recipesArray: foundRecipes })
		})
	})
}

exports.put = function (req, res) {
	const { id: chefId } = req.body

	let data = {
		...req.body,
	}

	Chef.update(data, () => {
		return res.redirect(`/admin/chefs/${chefId}`)
	})
}

exports.delete = function (req, res) {
	const { id: chefId } = req.body

	Chef.delete(chefId, () => {
		return res.redirect('/admin/chefs')
	})
}
