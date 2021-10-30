const db = require('../config/db.js')
const { date } = require('../lib/utils.js')

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
		const { filter, limit, offset, callback } = params

		let query = '',
			filterQuery = '',
			totalQuery = `(
                SELECT count(*) FROM recipes
                ) AS total`

		if (filter) {
			filterQuery = `
                WHERE recipes.full_name ILIKE '%${filter}%'
                OR recipes.teaches ILIKE '%${filter}%'
            `

			totalQuery = `(
                SELECT count(*) FROM recipes
                ${filterQuery}
                ) AS total`
		}

		query = `
            SELECT recipes.*, ${totalQuery}, count(chefs) AS total_chefs
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ${filterQuery}
            GROUP BY recipes.id LIMIT $1 OFFSET $2
        `

		db.query(query, [limit, offset], function (err, results) {
			if (err) throw `Database error! ${err}`

			callback(results.rows)
		})
	},
}
