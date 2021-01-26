const express = require('express')
const routeur = express.Router()
const utilisateurController = require('./controllers/utilisateurController')


routeur.get('/', utilisateurController.acceuil )

routeur.post('/inscrire', utilisateurController.inscrire )


// routeur.get('/contact', (req, res) => {
//     res.send('Contact')
// })

module.exports = routeur
