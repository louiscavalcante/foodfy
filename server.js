const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const PORT = process.env.PORT || 5000
const data = require('./data.js')

server.use(express.static('public'))

server.set('view engine', 'html')

nunjucks.configure('views', {
	express: server,
	autoescape: false, // Renders HTML inside variables
	noCache: true,
})

server.get('/', function (req, res) {
	return res.render('index', { recipes: data })
})

server.get('/about', function (req, res) {
	return res.render('about')
})

server.get('/recipes', function (req, res) {
	return res.render('recipes', { recipes: data })
})

server.get('/recipes/:index', function (req, res) {
	const recipes = [...data]
	const recipeIndex = req.params.index

    if (recipeIndex in recipes) {
        return res.render('recipe', { recipe: recipes[recipeIndex] })
    } else {
        return res.status(404).render('not-found')
    }
})

server.use(function (req, res) {
	res.status(404).render('not-found')
})

server.listen(PORT, function () {
	console.log(`Server is running at http://localhost:${PORT}`)
})
