const db = require('../config/db.js')
const { date } = require('../lib/utils.js')
const red = require('chalk').bgRed

module.exports = {
	all(callback) {
		db.query(
			`
            SELECT recipes.*, chefs.name AS author
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            ORDER BY recipes.id`,
			function (err, results) {
				if (err) throw red(`Database error! ${err}`)

				callback(results.rows)
			}
		)
	},

	create(data, callback) {
		const query = `
            INSERT INTO recipes (
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

		const values = [
			data.chef_id,
			data.image,
			data.title,
			data.ingredients,
			data.preparation,
			data.information,
			date(Date.now()).iso,
		]

		db.query(query, values, function (err, results) {
			if (err) throw red(`Database error! ${err}`)

			callback(results.rows[0])
		})
	},

	find(id, callback) {
		db.query(
			`
            SELECT recipes.*, chefs.name AS author
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`,
			[id],
			function (err, results) {
				if (err) throw red(`Database error! ${err}`)

				callback(results.rows[0])
			}
		)
	},

	findChefs(callback) {
		db.query(
			`
            SELECT *
            FROM chefs
            ORDER BY name`,
			function (err, results) {
				if (err) throw red(`Database error! ${err}`)

				callback(results.rows)
			}
		)
	},

	update(data, callback) {
		const query = `
            UPDATE recipes SET
                chef_id=($1),
                image=($2),
                title=($3),
                ingredients=($4),
                preparation=($5),
                information=($6)
            WHERE id = $7
        `

		const values = [
			data.chef_id,
			data.image,
			data.title,
			data.ingredients,
			data.preparation,
			data.information,
			data.id,
		]

		db.query(query, values, function (err, results) {
			if (err) throw red(`Database error! ${err}`)

			callback()
		})
	},

	delete(id, callback) {
		db.query(`DELETE FROM recipes WHERE id = $1`, [id], function (err, results) {
			if (err) throw red(`Database error! ${err}`)

			callback()
		})
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
            SELECT recipes.*, ${totalQuery}, count(chefs) as total_chefs
            FROM recipes
            LEFT JOIN chefs ON (recipes.id = chefs.recipe_id)
            ${filterQuery}
            GROUP BY recipes.id LIMIT $1 OFFSET $2
        `

		db.query(query, [limit, offset], function (err, results) {
			if (err) throw red(`Database error! ${err}`)

			callback(results.rows)
		})
	},
}
