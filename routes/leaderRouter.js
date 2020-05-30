const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Leaders = require('../models/leaders');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());


leaderRouter.route('/') 
.get( (req,res,next) => {
    Leaders.find({})
    .then((leaders)=>{
       res.statusCode =200;                              
       res.setHeader('Content-Type', 'application/json');  
       res.json(leaders); 
   }, (err) => {next(err)})
   .catch((err) => {next(err)});
                       
})
.post((req,res,next) => {
    Leaders.create(req.body)
     .then((promo) => {
        console.log("Promo created", promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => {next(err)})
    .catch((err) => {next(err)})

})
.put( (req,res,next) => {
req.statusCode = 403;
res.end('PUT operation not support on Leaders');
})
.delete((req,res,next) => {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => {next(err)})
    .catch((err) => {next(err)})


});


leaderRouter.route('/:leaderId')
.get( (req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((promo) => {
     res.statusCode = 200;
     res.setHeader('Content-Type', 'application/json');
     res.json(promo); 
 }, (err) => {next(err)})
 .catch((err) => {next(err)});
 
 })
 .post((req,res,next) => {
     
     req.statusCode = 403;
     res.end('Post operation not support on Leaders');
 
 })
 .put((req,res,next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set:req.body
 
     }, {new: true})
    .then((promo) => {
     res.statusCode = 200;
     res.setHeader('Content-Type', 'application/json');
     res.json(promo); 
 }, (err) => {next(err)})
 .catch((err) => {next(err)});
 
 })
 .delete( (req,res,next) => {
     Leaders.findByIdAndRemove(req.params.leaderId)
     .then((resp) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(resp);
     }, (err) => {next(err)})
     .catch((err) => {next(err)})
     
     });
module.exports = leaderRouter;