const express = require('express');
const pays = express.Router();
const db = require('../database/db');

// rajouter un nouveau pays
pays.post('/newpays',(req,res) => {
    if(req.body.nom){
       db.pays.findOne({
           where: {nom: req.body.nom}
       }).then(pays =>{
           if(!pays){
               db.pays.create(req.body)
               .then(data =>{
                   res.send(data)
               })
               .catch(err =>{
                   res.json("error" + err)
               })
           }else{
               res.json({error: "pays aleady exist"})
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
});



// fonction GET
pays.get('/pays',(req, res) => {
   db.pays.findAll({
       attributes:{
           include:[],
           exclude:[]
       },
   })
   .then(pays => {
       res.json(pays)
   })
   .catch(err => {
       res.send("error" + err)
   })
})


// Fonction DELETE
pays.delete("/pays/:id", (req,res) => {
    db.pays.findOne({
        where: {id:req.params.id}
    })
    .then(pays => {
        pays.destroy()
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
pays.put("/pays/:id", (req,res) =>{
   console.log(req.params.id);
   if(req.body.nom){
       db.agenda.update(
           {nom: req.body.nom,},
           {where: {id: req.params.id}}
           )
           .then(() =>{
               res.json("pays update")
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

module.exports = pays;