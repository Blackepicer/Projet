const express = require('express');
const evenement = express.Router();
const db = require('../database/db');

// créer une table évènement
evenement.post('/newevenement',(req,res) => {
     if(req.body.type_events){
        db.evenement.findOne({
            where: {type_events: req.body.type_events}
        }).then(evenement =>{
            if(!evenement){
                db.evenement.create(req.body)
                .then(data =>{
                    res.send(data)
                })
                .catch(err =>{
                    res.json("error" + err)
                })
            }else{
                res.json({error: "evenement aleady exist"})
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
evenement.get('/evenement',(req, res) => {
    db.evenement.findAll({
        attributes:{
            include:[],
            exclude:[]
        },
    })
    .then(evenement => {
        res.json(evenement)
    })
    .catch(err => {
        res.send("error" + err)
    })
})


// Fonction DELETE
evenement.delete("/evenement/:id", (req,res) => {
    db.evenement.findOne({
        where: {id:req.params.id}
    })
    .then(evenement => {
        evenement.destroy()
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
evenement.put("/evenement/:id", (req,res) =>{
    console.log(req.params.id);
    if(req.body.type_events){
        db.evenement.update(
            {type_events: req.body.type_events},
            {where: {id: req.params.id}}
            )
            .then(() =>{
                res.json("evenement update")
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

module.exports = evenement;