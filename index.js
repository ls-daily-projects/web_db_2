const express = require("express")

const db = require("./data")

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.get("/api/cars", async (_req, res, next) => {
    try {
        const cars = await db("cars")
        res.json(cars)
    } catch (error) {
        next(error)
    }
})

app.post("/api/cars", async (req, res, next) => {
    const car = req.body

    try {
        const [id] = await db("cars").insert(car)

        const err = Error("Could not add that car!")
        err.status = 422
        if (!id) return next(err)
        const createdCar = await db("cars")
            .where({ id })
            .first()
        res.json(createdCar)
    } catch (error) {
        next(error)
    }
})

app.use((req, _res, next) => {
    const { method, path } = req
    const msg = `${method} ${path} has not been implemented.`
    const err = Error(msg)
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    if (req.headerSent) return next(err)

    res.status(err.status || 500).json({ name: err.name, message: err.message })
})

app.listen(PORT, () => console.log(`Listening @ http://localhost:${PORT}`))
