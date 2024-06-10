require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const insuranceRouter = require('./routes/insurance')
app.use('/insurance', insuranceRouter)
app.listen(3000, () => console.log('Server started'))