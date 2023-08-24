const express = require ('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const progressRoutes = require('./routes/progressRoutes')
const app = express()
app.use(express.json())
app.use(cors())
app.use('/', progressRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('connected do DB'))
.catch(error => console.log(error.message))


app.listen(5500, () => console.log('Server started on port 5500'))

