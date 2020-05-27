const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');


const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
//.Router is interface
// dish router is now express router

//take endpoint as a perameter

dishRouter.route('/') 

//here req and res are from app.all as used next
.get( (req,res,next) => {
    Dishes.find({})
     .then((dishes) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(dishes); //res.json ->input - json string send a json response to the client
         // so dish will be in the body of the reply message
   
     }, (err) => {next(err)})
     .catch((err) => {next(err)});

})

.post((req,res,next) => {
//as we used bodyparser,
//for incoming req the body of the incoming req
//will parsed and then added into the req object as req.body
//so req.body will give you access to whatever inside 
//the body of the messsage
Dishes.create(req.body)
    .then((dish) => {
        console.log("Dish created", dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => {next(err)})
    .catch((err) => {next(err)})
})
.put( (req,res,next) => {
        req.statusCode = 403;
        res.end('PUT operation not support on dishes');

})
.delete((req,res,next) => {
        Dishes.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => {next(err)})
        .catch((err) => {next(err)})
});

dishRouter.route('/:dishId')
.get( (req,res,next) => {
        Dishes.findById(req.params.dishId)
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish); 
        }, (err) => {next(err)})
        .catch((err) => {next(err)});

})

.post((req,res,next) => {
    
        req.statusCode = 403;
        res.end('Post operation not support on dishes');

})
.put((req,res,next) => {
    
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {new : true}) //findbymethod returns the updated dish as a json string reply in the message
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish); 
        }, (err) => {next(err)})
        .catch((err) => {next(err)});


})
.delete( (req,res,next) => {
        Dishes.findByIdAndRemove(req.params.dishId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => {next(err)})
        .catch((err) => {next(err)})
});

module.exports = dishRouter;