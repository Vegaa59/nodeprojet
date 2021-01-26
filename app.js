const express = require('express')
const app = express()
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