const express = require('express');
const oeuvre = express.Router();
const db = require('../database/db');

// créer une table oeuvre
oeuvre.post('/newoeuvre',(req,res) => {
     if(req.body.nom){
        db.oeuvre.findOne({
            where: {nom: req.body.nom}
        }).then(oeuvre =>{
            if(!oeuvre){
                db.oeuvre.create(req.body)
                .then(data =>{
                    res.send(data)
                })
                .catch(err =>{
                    res.json("error" + err)
                })
            }else{
                res.json({error: "oeuvre aleady exist"})
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
oeuvre.get('/oeuvre',(req, res) => {
    db.oeuvre.findAll({
        attributes:{
            include:[],
            exclude:[]
        },
        // pour afficher le nom de l'artiste dans vue.js
        // include:[{
        //     model: db.artiste
        // }]
    })
    .then(oeuvre => {
        res.json(oeuvre)
    })
    .catch(err => {
        res.send("error" + err)
    })
})


// Fonction DELETE
oeuvre.delete('/oeuvre/:id',(req,res) =>{
    db.oeuvre.destroy({
        where: {id: req.params.id}
    }).then(()=> {
        res.json({status: "oeuvre deleted"})
    })
       .catch(err => {
           res.send("error" +err)
       })
})


// fonction UPDATE
oeuvre.put("/oeuvre/:id", (req,res) =>{
    console.log(req.params.id);
    if(req.body.nom){
        db.oeuvre.update(
            {nom: req.body.nom, date_publication: req.body.date_publication},
            {where: {id: req.params.id}}
            )
            .then(() =>{
                res.json("oeuvre update")
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

module.exports = oeuvre;