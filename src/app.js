const express = require('express')
const app = express()
const userRoutes = require('../routes/users')
const showRoutes = require('../routes/shows')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/shows', showRoutes)
app.use('/users', userRoutes)


module.exports = app