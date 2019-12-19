const express = require('express');
const artiste = express.Router();
const db = require('../database/db');

// créer une table artiste
artiste.post('/newartiste',(req,res) => {
    console.log(req.body);
     if(req.body.nom){
        db.artiste.findOne({
            where: {nom: req.body.nom}
        }).then(artiste =>{
            if(!artiste){
                db.artiste.create(req.body)
                .then(data =>{
                    res.send(data)
                })
                .catch(err =>{
                    res.json("error" + err)
                })
            }else{
                res.json({error: "artiste aleady exist"})
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
// cette fonction me permettra de trouver tous les artistes issus d'un même pays
artiste.get('/Find/:paysId',(req, res) => {
    db.artiste.findAll({
        where:{paysId: req.params.paysId}
    })
    .then(artiste => {
        if(artiste) {
            res.json({
                artiste: artiste
            })
        }
        else {
            res.json({error: "this artiste exist in your list of artiste "})
        }
    })
    .catch(err =>{
        res.json("error" + err);
    })
  
})


// fonction GET
artiste.get("/FindAll", (req, res) =>{
    db.artiste.findAll().then(artiste =>{
        // if garage exist so
        if(artiste) {res.json({artiste: artiste})}
        else {res.json({error: "you don't have list of artistes"})}
     })
     .catch(err =>{
        //  send back the message error
         res.json("error + err");
     })
});


// Fonction DELETE
artiste.delete('/artiste/:id',(req,res) =>{
    db.artiste.findOne( {
        where: {id: req.params.id}
    }).then(artiste => {
        if (artiste) {
            db.artiste.destroy({
                where: {id: req.params.id}
            }).then(()=> {
                res.json("artiste deleted")
            })
               .catch(err => {
                   res.send("error" +err)
               })
        }
        else{
            res.json("not artiste")
        }
    }).catch(err =>{
        res.send("error" + err)
    })
    
})


// fonction UPDATE
// cette fonction me servira à modifier (mettre à jour) les informations de ma table
artiste.put("/artiste/:id", (req,res) =>{
    // console.log(req.params.id);
    if(req.body.nom){
        db.artiste.update(
            {nom: req.body.nom, prenom: req.body.prenom, email: req.body.email, tel: req.body.tel},
            {where: {id: req.params.id}}
            )
            .then(() =>{
                res.json("artiste update")
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

module.exports = artiste;