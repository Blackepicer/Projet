const express = require('express');
const formulaire = express.Router();
const db = require('../database/db');


//** NODEMAILER ** /
// Nodemailer est un module pour les applications Node.js qui permet d’envoyer des emails en toute simplicité.
const nodemailer = require('nodemailer') // elle permet de rappeler la dépendance
const sendgridTransport = require('nodemailer-sendgrid-transport')
// Ce module est un plugin de transport pour Nodemailer qui permet d’envoyer via l’API Web de SendGrid
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:'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'
    }
}))

//**  FIN NODEMAILER *** */

// créer une table art
formulaire.post('/newformulaire',(req,res) => {
     if(req.body.nom){
        db.formulaire.findOne({
            where: {nom: req.body.nom}
        }).then(formulaire =>{
            if(!formulaire){
                db.formulaire.create(req.body)
                .then(data =>{
                    res.send(data)
                })
                .catch(err =>{
                    res.json("error" + err)
                })
            }else{
                res.json({error: "formulaire aleady exist"})
            }
        })
        .catch(err =>{
            res.json("error" + err)
        })
    }else{
        res.status(400)
        res.json({
            error:"bad datttttta"
        })
    }
})


// fonction GET
formulaire.get('/formulaire',(req, res) => {
    db.formulaire.findAll({
        attributes:{
            include:[],
            exclude:[]
        },
    })
    .then(formulaire => {
        res.json(formulaire)
    })
    .catch(err => {
        res.send("error" + err)
    })
})


// Fonction DELETE
formulaire.delete("/formulaire/:id", (req,res) => {
    db.formulaire.findOne({
        where: {id:req.params.id}
    })
    .then(formulaire => {
        formulaire.destroy()
        .then(ress => {
            res.json(ress)
        })
        .catch(err => {
            res.json(err)
        })
    })
    .catch(err => {
        res.json(err)
    })
})


// fonction UPDATE
formulaire.put("/formulaire/:id", (req,res) =>{
    console.log(req.params.id);
    if(req.body.nom){
        db.formulaire.update(
            {nom: req.body.nom, prenom: req.body.prenom, email: req.body.email, tel: req.body.tel, message: req.body.message},
            {where: {id: req.params.id}}
            )
            .then(() =>{
                res.json("formulaire update")
            })
            .catch(err =>{
                res.send("error" + err)
            })
    }
    else{
        res.status(400)
        res.json({
            error: "bad data"
        })
    }
})

module.exports = formulaire;