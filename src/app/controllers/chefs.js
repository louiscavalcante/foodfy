const { date } = require('../lib/utils.js')
const Chef = require('../models/chef.js')
const data = require('../../../data.json')


exports.index = function (req, res) {
	const { chefs } = data
	const newChefs = chefs.map(splitFunc)

	function splitFunc(chef) {
		let chefsFormatted = {
			...chef,
		}
		return chefsFormatted
	}

	return res.render('admin/chefs/index', { chefs: newChefs })
}

exports.create = function (req, res) {
	return res.render('admin/chefs/create')
}

exports.post = function (req, res) {
	const keys = Object.keys(req.body)

	for (let key of keys) {
		if (req.body[key] == '') {
			return res.send('Please fill all the fields!')
		}
	}

	const { image, ingredients, preparation, information } = req.body
	const title = 'Chef Name'
	const author = 'Admin'

	let arrIngredients = []
	Array.isArray(ingredients)
		? (arrIngredients = ingredients)
		: arrIngredients.push(ingredients)

	let arrPreparation = []
	Array.isArray(preparation)
		? (arrPreparation = preparation)
		: arrPreparation.push(preparation)

	data.chefs.unshift({
		image,
		title,
		author,
		ingredients: arrIngredients,
		preparation: arrPreparation,
		information,
	})

	fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
		if (err) return res.send('Write file error!')

		return res.redirect('/admin/chefs')
	})
}

exports.show = function (req, res) {
	const chefs = [...data.chefs]
	const chefId = req.params.id

	if (chefId in chefs) {
		return res.render('admin/chefs/show', { chef: chefs[chefId], id: chefId })
	} else {
		return res.status(404).render('not-found')
	}
}

exports.edit = function (req, res) {
	const chefs = [...data.chefs]
	const chefId = req.params.id

	if (chefId in chefs) {
		return res.render('admin/chefs/edit', { chef: chefs[chefId], id: chefId })
	} else {
		return res.status(404).render('not-found')
	}
}

exports.put = function (req, res) {
	const { id, image, ingredients, preparation, information } = req.body
	let index = id

	const chef = {
		...data.chefs[index],
		image,
		ingredients,
		preparation,
		information,
	}

	data.chefs[index] = chef

	fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
		if (err) return res.send('Write file error!')

		return res.redirect(`/admin/chefs/${id}`)
	})
}

exports.delete = function (req, res) {
	const { id } = req.body

	const filteredChefs = data.chefs.filter(function (element, index, arr) {
		return arr[index] != arr[id]
	})

	data.chefs = filteredChefs

	fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
		if (err) return res.send('Write file error!')
	})

	return res.redirect('/admin/chefs')
}
