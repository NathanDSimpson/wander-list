const express = require('express')
require('dotenv').config()
const app = express()
const massive = require('massive')
const session = require('express-session')
const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env
const controller = require('./controller')

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // keep session for one week
    }
}))

massive(CONNECTION_STRING)
.then(database => {
    app.set('db', database)
    console.log(`DATABASE: Connected`)
    app.listen(SERVER_PORT, () => {
        console.log(`SERVER: ${SERVER_PORT}`)
    })
})

app.post('/api/items', controller.getUserItems) //get all items for the user
app.post('/api/add-item', controller.addItem) //add an item to the user's library

app.post('/auth/register', controller.register) 
app.post('/auth/login', controller.login)
app.get('/auth/logout', controller.logout)