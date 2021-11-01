require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')

mongoose.connect(process.env.DATABASE_URL)

const app = express()
const routes = require('./routes')

app.use(express.json())
app.use('/api', routes)

app.listen(process.env.PORT, () =>
  console.log(`process runing at port ${process.env.PORT}`)
)

module.exports = app
