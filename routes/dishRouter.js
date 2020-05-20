const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
//.Router is interface
// dish router is now express router

//take endpoint as a perameter

dishRouter.route('/') 
.all( (req,res,next)=> { 
   
    res.statusCode =200;                               
    res.setHeader('Content-Type', 'text/plain');  
    next();                             //incoming requests will be handes

})
//here req and res are from app.all as used next
.get( (req,res,next) => {
res.end("Will send all the dishes to you");
//when get request is received, and calling res.end
//this means that end is handling of the get 
//request and  trigger the reply to be
//sent back, or response to be sent back
//to the client at this point
})
//if post request is executed then app.all will be executed
//because of next, app.post will be executed
.post((req,res,next) => {
//as we used bodyparser,
//for incoming req the body of the incoming req
//will parsed and then added into the req object as req.body
//so req.body will give you access to whatever inside 
//the body of the messsage
res.end("Will add the dish: " + req.body.name +
"Desc "+req.body.description);

})
.put( (req,res,next) => {
req.statusCode = 403;
res.end('PUT operation not support on dishes');

})
.delete((req,res,next) => {
res.end('Deleting all the dishes');

});

dishRouter.route('/:dishId')
.get( (req,res,next) => {
    res.end("Will send details of the dish: " +
    req.params.dishId + ' to you'); //'/dishes/:dishId and this dishId should match
    

})

.post((req,res,next) => {
    
    req.statusCode = 403;
    res.end('Post operation not support on dishes');

})
.put((req,res,next) => {
    // res.end('Will update the dish' +
    // req.params.dishId);
    res.write('Updating the dish' + ' '+ req.params.dishId +'\n');
    res.end('Will update the dish: '+
    req.body.name +
    ' with details '+ req.body.description);

    //res.write can be used to add 
    // a line to the reply message

})
.delete( (req,res,next) => {
    res.end('Deleting dish '+ req.params.dishId);
    
    });

module.exports = dishRouter;