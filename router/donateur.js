const express = require('express');
const donateur = express.Router();
const db = require('../database/db');

// créer une table donateur
donateur.post('/newdonateur',(req,res) => {
    const donateurdata = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        tel: req.body.tel,
        adresse: req.body.adresse,
        cp: req.body.cp,
        ville: req.body.ville,
        pays: req.body.pays,
    };
    db.donateur.findOne({
        where: {nom: req.body.nom}
    })
    .then(donateur =>{
        if(!donateur){
            console.log(req.body);
            db.donateur.create(donateurdata)
            .then(donateur => {
                res.json(donateur)
            })
            .catch(err =>{
                res.send({
                    error: "error" + err
                })
            })
        }
        else{
            res.json({
                error: "donateur exist"
            })
        }
    })
})

// fonction GET (réupérer)
donateur.get('/donateur',(req, res) => {
    // dans la base de données sur la table donateur tu me récupères tout les paiements
    db.donateur.findAll({
        attributes:{
            include:[], //il m'affichera tout ce que je lui demande
            exclude:[]  //il n'affichera pas ce que je lui aurait notifier
        },
    })
    .then(donateur => {
        res.json(donateur) // il récupérera tous les données et le mettra en JSON
    })
    .catch(err => {
        res.send("error" + err)
    })
})


// Fonction DELETE


donateur.delete("/donateur/:id", (req,res) => {
    db.donateur.findOne({
        where: {id:req.params.id}
    })
    .then(don => {
        don.destroy()
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
donateur.put("/donateur/:id", (req,res) =>{
    // cette fonction me servira
    console.log(req.params.id);
    if(req.body.nom){
        db.donateur.update(
            {nom: req.body.nom, prenom: req.body.prenom, email: req.body.email, tel: req.body.tel, 
                adresse: req.body.adresse, CP: req.body.CP, ville: req.body.ville, pays: req.body.pays},
            {where: {id: req.params.id}}
            )
            .then(() =>{
                res.json("donateur update")
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

module.exports = donateur;