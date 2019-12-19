const express = require('express');
const paiement = express.Router();
const db = require('../database/db');

// créer une table paiement
paiement.post('/newpaiement',(req,res) => {
    // verifie si l'ID du paiement existe, sinon tu me le crée
    if(req.body.montant){
       db.paiement.findOne({
           where: {montant: req.body.montant}
       }).then(paiement =>{
           if(!paiement){
               db.paiement.create(req.body)
               .then(data =>{
                   res.send(data)
               })
               .catch(err =>{
                   res.json("error" + err)
               })
           }else{
               res.json({error: "paiement aleady exist"})
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

// fonction GET (réupérer)
paiement.get('/paiement',(req, res) => {
    // dans la base de données sur la table paiement tu me récupères tout les paiements
    db.paiement.findAll({
        attributes:{
            include:[], //il m'affichera tout ce que je lui demande
            exclude:[]  //il n'affichera pas ce que je lui aurait notifier
        },
    })
    .then(paiement => {
        res.json(paiement) // il récupérera tous les données et le mettra en JSON
    })
    .catch(err => {
        res.send("error" + err)
    })
})


// Fonction DELETE
paiement.delete("/paiement/:id", (req,res) => {
    db.paiement.findOne({
        where: {id:req.params.id}
    })
    .then(paie => {
        paie.destroy()
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

// fonction UPDATE (mettre à jour, modifier les données existante de la table)
paiement.put("/paiement/:id", (req,res) =>{
    // cette fonction me servira
    console.log(req.params.id);
    if(req.body.montant){
        db.paiement.update(
            {montant: req.body.montant},
            {where: {id: req.params.id}}
            )
            .then(() =>{
                res.json("paiement update")
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

module.exports = paiement;