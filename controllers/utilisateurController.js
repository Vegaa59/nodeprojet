const Utilisateur = require('../models/Utilisateur')

// une propriété connecter qui sera dispo dans ce qui sera exporté


exports.connecter = async function(req, res) {
   const utilisateur = new Utilisateur(req.body)
   try{
   await utilisateur.connecter()
   req.session.utilisateur = { nom : utilisateur.donnees.nom }
   
}catch(err){
   req.flash('erreursConnexion', err)
}
req.session.save(() => {
         res.redirect('/')
})
}

exports.deconnecter = function(req, res) {
   req.session.destroy(() => {
      res.redirect('/')
   })
}

exports.inscrire = function(req, res) {
   let utilisateur = new Utilisateur(req.body)
    utilisateur.inscrire()
    
    if(utilisateur.erreurs.length !==0){
       // les erreurs 
       utilisateur.erreurs.forEach(erreur => {
          req.flash('erreursInscription' , erreur)
       })
       req.session.save(() => {
          res.redirect('/')
       })
    }else{
       res.send(`Bonjour ${utilisateur.donnees.nom} Vous êtes inscrit !! `)
    }
}

exports.acceuil = function(req, res) {
   if(req.session.utilisateur){
      res.render('home', {nomUtilisateur: req.session.utilisateur.nom})
   }else{
           res.render('visiteur', {
               erreursConnexion: req.flash('erreursConnexion'),
               erreursInscription: req.flash('erreursInscription')
            }) 
   }
}
// module.exports = {
//     connecter: function() {

//     },
//     deconnecter: function() {

//     }
// }