const express = require('express');

// Make a new request app
var app = express();

// Using express middleware to serve static pages
// This simplifies serving static websites to users

app.use(express.static(__dirname+'/public'));

// set a http request route

// set a handle for http request
// 2 parameters, 1 is the route that the visitors use to get to the website
// '/' is the root of the website.
// second parameter defines what to send back to the user (i.e. function to run)
// parameter for the handler function requires 2 arguments
// request stores information about incoming request 
// response stores what data can be sent back
app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express</h1>')

    //send json data back
    res.send({
        name:'Suresh Jeyaverasingam',
        likes:['Biking', 'Cities']
    });
});

app.get('/about',(req,res) =>{
    res.send('<b> About Suresh</b>')
});

//test another route but sending bad data
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Oops, Double Oops, did you get here by mistake?'
    });
});

// we now need to set the app to listed by binding the app to a port to listen
// 2nd parameter is optional and is a function. Functions happen when server is up
app.listen(3000,()=>{
    console.log('Server is up and running');
});

