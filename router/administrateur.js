/**
 *Express.js
 * is a framework for building web applications based on Node.js.
 * This is the standard framework for server development in Node.js.
 **/
const express = require("express");

/**
 *Le routage consiste à déterminer comment une application répond à une demande client adressée
  à un point de terminaison particulier, à savoir un URI (ou chemin) et une méthode de requête
   HTTP spécifique (GET, POST, etc.). Chaque route peut avoir une ou plusieurs fonctions de 
   gestionnaire, qui sont exécutées lorsque la route est appariée.La définition d'itinéraire 
   prend la structure suivante: client.METHOD (PATH, HANDLER)
 *
 * GET: la méthode GET demande une représentation de la ressource spécifiée. Les demandes 
 utilisant GET doivent uniquement extraire des données et ne doivent avoir aucun autre effet.
 (Ceci est également vrai pour certaines autres méthodes HTTP.) [1] Le W3C a publié des principes
 directeurs sur cette distinction, indiquant que "la conception d'applications Web doit être 
 informée des principes ci-dessus, mais également des limitations correspondantes" [22]. 
 Voir les méthodes sécurisées ci-dessous.

 * HEAD: la méthode HEAD demande une réponse identique à celle d'une demande GET, mais sans le 
 corps de la réponse. Ceci est utile pour récupérer des méta-informations écrites dans les 
 en-têtes de réponse, sans avoir à transporter tout le contenu.

 * POST: la méthode POST demande au serveur d'accepter l'entité incluse dans la demande en tant 
 que nouveau subordonné de la ressource Web identifiée par l'URI. Les données POSTed peuvent être, 
 par exemple, une annotation pour des ressources existantes; un message pour un forum, un groupe 
 de discussion, une liste de diffusion ou un fil de commentaires; un bloc de données résultant 
 de la soumission d'un formulaire Web à un processus de traitement de données; ou un élément à
  ajouter à une base de données. [23]

 * PUT: La méthode PUT demande que l'entité incluse soit stockée sous l'URI fourni. Si l'URI fait
  référence à une ressource déjà existante, elle est modifiée. si l'URI ne pointe pas vers une 
  ressource existante, le serveur peut créer la ressource avec cet URI. [24]

 * DELETE: la méthode DELETE supprime la ressource spécifiée.

 * TRACE: la méthode TRACE fait écho à la demande reçue de sorte qu'un client puisse voir les 
 éventuelles modifications ou ajouts effectués par les serveurs intermédiaires.

 * OPTIONS: la méthode OPTIONS renvoie les méthodes HTTP prises en charge par le serveur pour
l'URL spécifiée. Cela peut être utilisé pour vérifier la fonctionnalité d'un serveur Web en 
demandant '*' au lieu d'une ressource spécifique.

 * PATCH: la méthode PATCH applique des modifications partielles à une ressource.
 *
 * @type { Router }
 */
const administrateur = express.Router();

//** NODEMAILER ** /

// Nodemailer est un module pour les applications Node.js qui permet d’envoyer des emails en toute simplicité.

const nodemailer = require('nodemailer') // rappele la dependence nodemailer

// Ce module est un plugin de transport pour Nodemailer qui permet d’envoyer via l’API Web de SendGrid

const sendgridTransport = require('nodemailer-sendgrid-transport')
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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'
    }
}))

//**  FIN NODEMAILER *** */

//create db
const db = require('../database/db');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

/************************************** End Require module ****************************************************
 *****************************************************************************************************************/

/************************************** Start client router ****************************************************
 *****************************************************************************************************************/
process.env.SECRET_KEY = "secret"; /**faire recherche sur process.env */
console.log(process.env.SECRET_KEY);

// add new administrateur 
// POST =>>>>localhost:3000/administrateur/newadmin
administrateur.post("/newadmin", (req, res) => {

    // create data admin if need to add new data in table administrateurs
    const admindata = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        date_naissance: req.body.date_naissance
    };
    // essaie de trouver si l'admin exist dans la bdd
    db.administrateur.findOne({
        where: {email: req.body.email}
    }).then(administrateur => {
        // si l'administrateur n'est pas dans la bdd alors
        if (!administrateur) {
            //faire le hachage du mot de passe dans bcrypt, salt 10 
            //**************************donnée a crypter****salt10 utiliser pour le cryptage)
            const hash = bcrypt.hashSync(admindata.password,10);
            const hashConfirm = bcrypt.hashSync(admindata.confirm_password,10);

            admindata.password = hash;
            admindata.confirm_password = hashConfirm

            //On créer un nouveau administrateur a la data 'admindata'
            db.administrateur.create(admindata)
            .then(administrateur => {
                transporter.sendMail({

                    to: req.body.email, // tu va m'envoyer un mail
                    from: 'ahoton.melissa@gmail.com', // le mail que je viens d'envoyer est celui ci
                    subject:'vous êtes bien inscrit a notre site Daj-Miel',
                    html: `<h1> Bienvenue sur notre site !</h1> 
                    <br>
                    <br>
                    <p>
                    voici vos informations : 
                    - Identifiant : ${req.body.email} <br> 
                    - password : ${req.body.password} </p>`
                })

                let token = jwt.sign(administrateur.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                });
                res.json({token:token})
            })
            .catch(err => {
                res.send('error' + err)
            })
        } else {
            res.json({
                error: "l'administrateur existe déja"
            })
        }
    })// si une erreur le détecte et le renvoie en format json pour montrer à l'utilisateur 
    // 'de l'application que vous ne pouvez pas supprimer l'administrateur
    .catch(err => {
        res.json({
            error: "error" + err
        })
    })

});


// *********************************LOGIN***********************************
//POST =>>> localhost:3000/administrateur/login
administrateur.post("/login", (req, res) => {
    db.administrateur.findOne({
        where: {email: req.body.email}
    })
    .then(administrateur => {
        // req.body.password: c'est celui saisi, administrateur.password: c'est celui de la db, compareSync les compares
        if (bcrypt.compareSync(req.body.password, administrateur.password)){
            //  Il n'y as pas de mot de passe du  administrateur dedans.
         //  Nous créons un jeton d'authentification pour l'utilisateur avec le jwt
            let token = jwt.sign(administrateur.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            });
            // je récupère le token
            res.json({token: token})
        }else {
            res.send('error mail or error password')
        }
    })
    .catch(err =>{
        res.send('error ' + err)
    })
});

// chercher administrateur avec son email
// **********************************Get/Find***************************************
// GET =>>> localhost:3000/administrateur/Find/id:(l'email)
administrateur.get("/Find/:email", (req, res) =>{
    // tu me get mes info a partir de mon id et mon email 
    db.administrateur.findOne({
        where:{id: req.params.email}
    }).then(administrateur =>{
        //if administrateur exist donc
        if(administrateur) {
            res.json({
                administrateur: administrateur
            })
        }
        else {
            res.json({error: "l'admin n'existe pas dans la liste des administrateur"})
        }
    })
    .catch(err =>{
        res.json("error" + err);

    })
});

// ******************************GET ALL*****************************
// GET: localhost:3000/administrateur/All
//  cette fontion me servira à afficher ltous les administrateurs sans leur mot de passe et autres
administrateur.get("/All", (req, res) =>{
    db.administrateur.findAll({
        attributes:{
            exclude:["password", "confirm_password", "createdAt", "updatedAt"]
        }
    }).then(administrateurs =>{
        res.json(administrateurs)
    })
    .catch(err =>{
        res.json("error" + err)
    })
});

// Confirmation de mail pour mot de passe perdu
/** ce POST est la pour envoyer le mail  **/
administrateur.post("/send", (req, res) => {
    console.log(req.body.email)
    db.administrateur.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(administrateur => {
            if (administrateur) {
                // On lui dit si je modifie le mot de passe qu'il me le crypt 
                transporter.sendMail({
                    to: req.body.email,
                    from: 'ahoton.melissa@gmail.com',
                    subject:'cliquer pour changer vos mot de passe',
                    html: `<h1> Bienvenue sur notre site Chez Nous ! </h1>
                    <br>
                    <br>
                    <p>Grace</p>
                    <a>ici</a>`,
                })
            } else {
                res.json({
                    error: "ne peut pas mettre à jour cet admin ce n'est pas votre client"
                })
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
});

// Reinitialiser mdp 
/** UPDATE MOT DE PASSE OUBLIE **/

administrateur.post("/mdpoublie", (req, res) => {
    db.administrateur.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(administrateur => {
            if (administrateur) {
                // On lui dit si je modifie le mot de passe qu'il me le crypt 
                const hash = bcrypt.hashSync(req.body.password, 10);
                const hashconfirmation = bcrypt.hashSync(req.body.confirm_password, 10);
                administrateur.update({
                    email: req.body.email,
                    confirm_password:hashconfirmation,
                    password: hash,

                })
            } else {
                res.json({
                    error: "ne peut pas mettre à jour cet admin"
                })
            }
        })
        .catch(err => {
            res.send('error' + err)
        })
});

// update
// il me permet de faire des mises à jour existant
// PUT: localhost:3000/administrateur/update (mettre le nom, prenom et email)
administrateur.put("/update", (req, res) => {
    db.administrateur.findOne({
        where: {email: req.body.email}
    })
        .then(administrateur => {
           if(administrateur){
               //faire le hachage du mot de passe dans bcrypt, salt 10 
            //**************************donnée a crypter****salt10 utiliser pour le cryptage)
            //    const hash = bcrypt.hashSync(req.body.password, 10);
               administrateur.update({
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password: req.body.password,
                confirm_password: req.body.confirm_password,
                date_naissance: req.body.date_naissance
               }).then(res =>{
                   res.json("update ok")
               })
           }
           else {
               res.json({
                   error: "can't update this admin"
               })
           }
        })
        .catch(err => {
            res.send('error' + err)
        })
});

//delete
administrateur.delete("/deleteBy/:email", (req,res) =>{
    // trouver l'administrateur que l'ont veut supprimer
    db.administrateur.findOne({
        where:{id: req.params.email}
    }).then(administrateur =>{
        // si l'administrateur existe donc..
        if(administrateur) {
            // delete ce admin
            administrateur.destroy().then(() => {
                // send back une confirmation de l'admin effacer
                res.json("admin deleted")
            })
            // catch si error
                .catch(err => {
                    // send back the error to info that in json
                    res.json("error" + err)
                })
        }
        else {
            //renvoyer le message d'erreur à l'info que vous ne pouvez pas supprimer ce client qu'il n'existe pas dans votre base de données
            res.json({error : "you can't delete this admin it not exist in you list of admins"})
        }
    })
        .catch(err =>{
            // send back le message d'erreur
            res.json("error" + err);
        })
});


module.exports = administrateur;