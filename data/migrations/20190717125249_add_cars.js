exports.up = knex =>
    knex.schema.createTable("cars", table => {
        table.increments()
        table
            .string("vin")
            .unique()
            .notNullable()
        table.string("make").notNullable()
        table.string("model").notNullable()
        table.decimal("mileage").notNullable()
        table.string("transmission_type")
        table.enu("title_status", ["clean", "salvage"])
    })

exports.down = knex => knex.schema.dropTableIfExists("cars")
