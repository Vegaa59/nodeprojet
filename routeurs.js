const express = require('express')
const routeur = express.Router()
const utilisateurController = require('./controllers/utilisateurController')
const sociosController = require('./controllers/sociosController')


routeur.get('/', utilisateurController.acceuil )

routeur.post('/inscrire', utilisateurController.inscrire )

routeur.post('/connecter', utilisateurController.connecter)

routeur.post('/deconnecter', utilisateurController.deconnecter)

routeur.get('/creer_socios', utilisateurController.doitEtreConnecter, sociosController.creerSocios)

// routeur.get('/contact', (req, res) => {
//     res.send('Contact')
// })

module.exports = routeur
