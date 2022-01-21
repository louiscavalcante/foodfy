const db = require('../config/db.js')

module.exports = {
	allRecipes(callback) {
		db.query(
			`
            SELECT recipes.*, chefs.name AS author
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ORDER BY recipes.id`,
			function (err, results) {
				if (err) throw `Database error! ${err}`

				callback(results.rows)
			}
		)
	},

	findRecipe(id, callback) {
		db.query(
			`
            SELECT recipes.*, chefs.name AS author
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`,
			[id],
			function (err, results) {
				if (err) throw `Database error! ${err}`

				callback(results.rows[0])
			}
		)
	},

	findRecipesByChef(id, callback) {
		db.query(
			`
            SELECT recipes.*, chefs.name AS author
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = $1
            ORDER BY title`,
			[id],
			function (err, results) {
				if (err) throw `Database error! ${err}`

				callback(results.rows)
			}
		)
	},

	allChefs(callback) {
		db.query(
			`
            SELECT chefs.*, count(recipes.id) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            GROUP BY chefs.id
            ORDER BY chefs.id`,
			function (err, results) {
				if (err) throw `Database error! ${err}`

				callback(results.rows)
			}
		)
	},

	findChef(id, callback) {
		db.query(
			`
            SELECT chefs.*, count(recipes.id) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id`,
			[id],
			function (err, results) {
				if (err) throw `Database error! ${err}`

				callback(results.rows[0])
			}
		)
	},

	paginate(params) {
		const { limit, offset, callback } = params

		let query = '',
			totalQuery = `(
                SELECT count(*) FROM recipes
                ) AS total`

		query = `
            SELECT recipes.*, ${totalQuery}, chefs.name AS author
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            GROUP BY recipes.id, chefs.name
            ORDER BY title LIMIT $1 OFFSET $2
        `

		db.query(query, [limit, offset], function (err, results) {
			if (err) throw `Database error! ${err}`

			callback(results.rows)
		})
	},

	filterRecipes(params) {
		const { filter, callback } = params

		let query = `
        SELECT recipes.*, chefs.name AS author
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE title ILIKE '%${filter}%'
            OR chefs.name ILIKE '%${filter}%'`

		db.query(query, function (err, results) {
			if (err) throw `Database error! ${err}`

			callback(results.rows)
		})
	},
}
