const express = require('express')
const mongoose = require('mongoose');
const CrudRoutes = require('./routes');
require('dotenv').config();

const mongoString = process.env.DB_URL
const app = express();
app.use(express.json())

mongoose.connect(mongoString)
const db = mongoose.connection
db.on('error', (error) => console.log('Connection to DB Failed : ', error))
db.once('connected', () => console.log('Connected to DB Atlas'))
app.listen(3000, () => {
    console.log('Server Started At http://localhost:3000')
})

app.use(CrudRoutes)
