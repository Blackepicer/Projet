const express = require('express');
const art = express.Router();
const db = require('../database/db');

// créer une table art
art.post('/newart',(req,res) => {
     if(req.body.type_art){
        db.art.findOne({
            where: {type_art: req.body.type_art}
        }).then(art =>{
            if(!art){
                db.art.create(req.body)
                .then(data =>{
                    res.send(data)
                })
                .catch(err =>{
                    res.json("error" + err)
                })
            }else{
                res.json({error: "art aleady exist"})
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
art.get('/FindAll',(req, res) => {
    db.art.findAll({
        attributes:{
            include:[],
            exclude:[]
        },
    })
    .then(art => {
        res.json(art)
    })
    .catch(err => {
        res.send("error" + err)
    })
})


// Fonction DELETE
art.delete("/art/:id",(req,res) =>{
    console.log(req.params.id)
    db.art.destroy({
        where: {id:req.params.id}
    }).then(()=> {
        res.json({status: "art deleted"})
    })
       .catch(err => {
           res.send("error" +err)
       })
    
})


// fonction UPDATE
art.put("/art/:id", (req,res) =>{
    console.log(req.params.id);
    if(req.body.type_art){
        db.art.update(
            {type_art: req.body.type_art},
            {where: {id: req.params.id}}
            )
            .then(() =>{
                res.json("art update")
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

module.exports = art;