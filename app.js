const express = require('express')
const session = require('express-session')
const connectMongo = require('connect-mongo')
const MongoStore = connectMongo(session)
const app = express()
const flash = require('connect-flash')

app.use(flash())

const sessionOptions = session({
    secret: "mon secret de session",
    store: new MongoStore({ client: require('./db') }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
})

app.use(sessionOptions)

const routeur = require('./routeurs')


app.use(express.urlencoded({ extended: false})) 
app.use('/', routeur)
app.set('views', 'view')
//permettre aux clients d'acceder au repertoire 'public'
app.use(express.static('public'))
// utiliser le repertoire view pour aller chercher les vues

// EJS comme moteur de templating (alternatives : handlebars , pug , mustache)
app.set('view engine', 'ejs')



module.exports = app;