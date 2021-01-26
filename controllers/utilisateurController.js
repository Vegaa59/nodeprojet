const Utilisateur = require('../models/Utilisateur')

// une propriété connecter qui sera dispo dans ce qui sera exporté


exports.connecter = function() {}

exports.deconnecter = function() {}

exports.inscrire = function(req, res) {
   let utilisateur = new Utilisateur(req.body)
    utilisateur.inscrire()
    
    if(utilisateur.erreurs.length !==0){
       res.send(utilisateur.erreurs)
    }else{
       res.send(`Bonjour ${utilisateur.donnees.nom} Vous êtes inscrit !! `)
    }
}

exports.acceuil = function(req, res) {
res.render('Visiteur')
}



// module.exports = {
//     connecter: function() {

//     },
//     deconnecter: function() {

//     }
// }