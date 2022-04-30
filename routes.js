const express = require('express')
const { CreateUser, LoginUser, UpdateUser, DeleteUser } = require('./controllers')
const CrudRoutes = express.Router()


// Create User 
CrudRoutes.post('/create-user', CreateUser)
CrudRoutes.post('/login-user', LoginUser)
CrudRoutes.post('/update-user', UpdateUser)
CrudRoutes.post('/delete-user', DeleteUser)


module.exports = CrudRoutes