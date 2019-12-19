const express = require('express');
const note = express.Router();
const db = require('../database/db');

// créer une table note
note.post('/newnote',(req,res) => {
    // verifie si l'ID de la note existe, sinon tu me le crée
    if(req.body.note){
       db.note.findOne({
           where: {note: req.body.note}
       }).then(note =>{
           if(!note){
               db.note.create(req.body)
               .then(data =>{
                   res.send(data)
               })
               .catch(err =>{
                   res.json("error" + err)
               })
           }else{
               res.json({error: "note aleady exist"})
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
note.get('/note',(req, res) => {
    // dans la base de données sur la table paiement tu me récupères tout les paiements
    db.note.findAll({
        attributes:{
            include:[], //il m'affichera tout ce que je lui demande
            exclude:[]  //il n'affichera pas ce que je lui aurait notifier
        },
    })
    .then(note => {
        res.json(note) // il récupérera tous les données et le mettra en JSON
    })
    .catch(err => {
        res.send("error" + err)
    })
})


// Fonction DELETE
note.delete("/note/:id", (req,res) => {
    db.note.findOne({
        where: {id:req.params.id}
    })
    .then(note => {
        note.destroy()
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
note.put("/note/:id", (req,res) =>{
    // cette fonction me servira
    console.log(req.params.id);
    if(req.body.note){
        db.paiement.update(
            {note: req.body.note, avis: req.body.avis},
            {where: {id: req.params.id}}
            )
            .then(() =>{
                res.json("note update")
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

module.exports = note;