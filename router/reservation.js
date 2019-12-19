const express = require('express');
const reservation = express.Router();
const db = require('../database/db');

// rajouter une nouvelle réservation
reservation.post('/newreservation',(req,res) => {
     if(req.body.reserver){
        db.reservation.findOne({
            where: {reserver: req.body.reserver}
        }).then(reservation =>{
            if(!reservation){
                db.reservation.create(req.body)
                .then(data =>{
                    res.send(data)
                })
                .catch(err =>{
                    res.json("error" + err)
                })
            }else{
                res.json({error: "reservation aleady exist"})
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
reservation.get('/reservation',(req, res) => {
    db.reservation.findAll({
        attributes:{
            include:[],
            exclude:[]
        },
    })
    .then(reservation => {
        res.json(reservation)
    })
    .catch(err => {
        res.send("error" + err)
    })
})


// Fonction DELETE
reservation.delete('/reservation/:id',(req,res) =>{
    db.reservation.findOne( {
        where: {id: req.params.id}
    }).then(reservation => {
        if (reservation) {
            reservation.destroy().then(()=> {
                res.json({status: "reservation deleted"})
            })
               .catch(err => {
                   res.send("error" +err)
               })
        }
        else{
            res.json("not reservation")
        }
    }).catch(err =>{
        res.send("error" + err)
    })
    
})


// fonction UPDATE
reservation.put("/reservation/:id", (req,res) =>{
    console.log(req.params.id);
    if(req.body.reserver){
        db.reservation.update(
            {reserver: req.body.reserver, nbre_place: req.body.nbre_place},
            {where: {id: req.params.id}}
            )
            .then(() =>{
                res.json("reservation update")
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

module.exports = reservation;