const db = require('../config/db.js')
const { date } = require('../lib/utils.js')
const red = require('chalk').bgRed

module.exports = {
	all(callback) {
		db.query(
			`
            SELECT chefs.*
            FROM chefs
            ORDER BY chefs.id`,
			function (err, results) {
				if (err) throw red(`Database error! ${err}`)

				callback(results.rows)
			}
		)
	},

	create(data, callback) {
		const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `

		const values = [data.name, data.avatar_url, date(Date.now()).iso]

		db.query(query, values, function (err, results) {
			if (err) throw red(`Database error! ${err}`)

			callback(results.rows[0])
		})
	},

	find(id, callback) {
		db.query(
			`
            SELECT chefs.*, count(recipes.id) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id`,
			[id],
			function (err, results) {
				if (err) throw red(`Database error! ${err}`)

				callback(results.rows[0])
			}
		)
	},

	findRecipes(id, callback) {
		db.query(
			`
            SELECT *, chefs.name AS author
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE chefs.id = $1
            ORDER BY title`,
            [id],
			function (err, results) {
				if (err) throw red(`Database error! ${err}`)

				callback(results.rows)
			}
		)
	},

	update(data, callback) {
		const query = `
            UPDATE chefs SET
                name=($1),
                avatar_url=($2)
            WHERE id = $3
        `

		const values = [data.name, data.avatar_url, data.id]

		db.query(query, values, function (err, results) {
			if (err) throw red(`Database error! ${err}`)

			callback()
		})
	},

	delete(id, callback) {
		db.query(`DELETE FROM chefs WHERE id = $1`, [id], function (err, results) {
			if (err) throw red(`Database error! ${err}`)

			callback()
		})
	},

	paginate(params) {
		const { filter, limit, offset, callback } = params

		let query = '',
			filterQuery = '',
			totalQuery = `(
                SELECT count(*) FROM chefs
                ) AS total`

		if (filter) {
			filterQuery = `
                WHERE chefs.full_name ILIKE '%${filter}%'
                OR chefs.teaches ILIKE '%${filter}%'
            `

			totalQuery = `(
                SELECT count(*) FROM chefs
                ${filterQuery}
                ) AS total`
		}

		query = `
            SELECT chefs.*, ${totalQuery}, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            ${filterQuery}
            GROUP BY chefs.id LIMIT $1 OFFSET $2
        `

		db.query(query, [limit, offset], function (err, results) {
			if (err) throw red(`Database error! ${err}`)

			callback(results.rows)
		})
	},
}
