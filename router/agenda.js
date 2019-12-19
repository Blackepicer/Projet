const express = require('express');
const agenda = express.Router();
const db = require('../database/db');

// rajouter un nouvel agenda
agenda.post('/newagenda',(req,res) => {
     if(req.body.date_debut){
        db.agenda.findOne({
            where: {date_debut: req.body.date_debut}
        }).then(agenda =>{
            if(!agenda){
                db.agenda.create(req.body)
                .then(data =>{
                    res.send(data)
                })
                .catch(err =>{
                    res.json("error" + err)
                })
            }else{
                res.json({error: "agenda aleady exist"})
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
agenda.get('/agenda',(req, res) => {
    db.agenda.findAll({
        attributes:{
            include:[],
            exclude:[]
        },
    })
    .then(agenda => {
        res.json(agenda)
    })
    .catch(err => {
        res.send("error" + err)
    })
})


// Fonction DELETE
agenda.delete('/agenda/:id',(req,res) =>{
    db.agenda.findOne( {
        where: {id: req.params.id}
    }).then(agenda => {
        if (agenda) {
            agenda.destroy().then(()=> {
                res.json({status: "agenda deleted"})
            })
               .catch(err => {
                   res.send("error" +err)
               })
        }
        else{
            res.json("not agenda")
        }
    }).catch(err =>{
        res.send("error" + err)
    })
    
})


// fonction UPDATE
agenda.put("/agenda/:id", (req,res) =>{
    console.log(req.params.id);
    if(req.body.date_debut){
        db.agenda.update(
            {date_debut: req.body.date_debut, date_fin: req.body.date_fin,},
            {where: {id: req.params.id}}
            )
            .then(() =>{
                res.json("agenda update")
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

module.exports = agenda;