const faker = require("faker")

const cars = []

for (let index = 0; index < 100; index++) {
    const vin = faker.random.alphaNumeric(17)
    const make = faker.commerce.product()
    const model = faker.random.alphaNumeric(5)
    const mileage = faker.random.number({ min: 1, max: 200000 })
    const transmission_type = faker.company.bsAdjective()
    const title_status = faker.random.arrayElement(["clean", "salvage"])
    cars.push({ vin, make, model, mileage, transmission_type, title_status })
}

exports.seed = knex =>
    knex("cars")
        .truncate()
        .del()
        .then(() => knex("cars").insert(cars))
