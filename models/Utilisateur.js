const validator = require('validator')
const utilisateurCollection = require('../db.js').db().collection('utilisateurs')
const bcrypt = require('bcryptjs')
//fonction constructeur qui crée un nouvel objet 

let Utilisateur = function(donnees){
    
    this.donnees = donnees;
    this.erreurs = [];

}

Utilisateur.prototype.nettoyerentrees = function(){
    this.donnees = {
        nom: this.donnees.nomInscription.trim().toLowerCase(),
        email: this.donnees.emailInscription.trim().toLowerCase(),
        mdp: this.donnees.mdpInscription,
    }
}

Utilisateur.prototype.nettoyerentreesConnection = function() {
    this.donnees = {
        nom: this.donnees.nomConnexion.trim().toLowerCase(),
        mdp: this.donnees.mdpConnexion,
    }
}

Utilisateur.prototype.validerEntrees = function(){

         if(!this.donnees.nom){
             this.erreurs.push("vous devez entré un nom d'utilisateur ! ")
       }else{
           if (!validator.isAlphanumeric(this.donnees.nom)){
                this.erreurs.push("le nom de doit pas contenir de caractères speciaux")
           }       
               if(this.donnees.nom.length < 3){
               this.erreurs.push("le nom doit avoir au moins 3 caractères ! ")
           }
           if(this.donnees.nom.length > 20){
            this.erreurs.push("le nom ne doit pas dépasser 20 caractères ! ")
        }
       }
       if(!this.donnees.email){
            this.erreurs.push("vous devez entré votre mail ! ")
         }else{
             if(!validator.isEmail(this.donnees.email)){
                 this.erreurs.push("vous devez entrez un email valid fdp ! ")
             }
         }

        if(!this.donnees.mdp){
            this.erreurs.push("vous devez entré un MDP! ")
        }else if(this.donnees.mdp.length < 12){
            this.erreurs.push("vous devez entré un MDP de au moins 12 caracteres ! ")
        }if(this.donnees.mdp.length > 30){
            this.erreurs.push("vous devez entré un MDP plus court max 30 caracteres ! ") 
        }
}

Utilisateur.prototype.inscrire = function(){
    this.nettoyerentrees();
    this.validerEntrees();
    // sauvegarde en DB 
    if(this.erreurs.length == 0){
        this.donnees.mdp = bcrypt.hashSync(this.donnees.mdp, 10 )
        utilisateurCollection.insertOne(this.donnees)
    }
}

Utilisateur.prototype.connecter = async function (){
    this.nettoyerentreesConnection()
    let utilisateurTrouve
    try{
     utilisateurTrouve = await utilisateurCollection.findOne({nom: this.donnees.nom}) 
    }catch(err){
        console.log('throw1')
        throw "une erreur s'est produite, try again ! "
    }

    if(!utilisateurTrouve || !bcrypt.compareSync(this.donnees.mdp ,utilisateurTrouve.mdp)){
        throw "nom d'utilisateur ou mot de passe incorrect ! "

    }
}

module.exports = Utilisateur;