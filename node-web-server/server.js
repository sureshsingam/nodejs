const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

// Make a new request app
var app = express();
// using partials ; partials contains a partial piece of the website
//set up to be able to use partials
//takes parameter containing absolute location for the directory containing the handlebar partials files
hbs.registerPartials(__dirname + '/views/partials');


app.set('view engine','hbs');



// testing the creation and using of a middleware
// app.use is used to register a middleware
// takes one function.
// function is called with three parameters
// next exists so that we can tell middleware function when it is done
// you can have as many middleware functions that you have
// you can do anything you like in the middle ware function
// only when middleware is complete, type next so that the rest of the code can proceed
app.use( (req,res, next) => {
    // This middleware function will log for every request made
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    
    fs.appendFile('server.log',log+'\n', (err) => {
        if(err){
            console.log('Unable to append to server.log')
        }
    });

    next();
});

// Doing challenge, have a new piece of middle ware that renders the page under maintenance
// app.use( (req,res,next) => {

//     res.render('maintenance.hbs');
    
// });

// Using express middleware to serve static pages
// This simplifies serving static websites to users
app.use(express.static(__dirname+'/public'));

// to use middleware, use app.ise
// functions that you can use multiple times within express
// takes 2 parameters, 1st = name of the helper, 2nd = function to run the helper
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
    
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


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
    // res.send({
    //     name:'Suresh Jeyaverasingam',
    //     likes:['Biking', 'Cities']
    // });s

    res.render('home.hbs',{
        welcomeMessage: 'Welcome to My Main Page',
        pageTitle:'My Website',
        // currentYear:new Date().getFullYear()  -- This is not needed as we now have the helper function getCurrentYear
    });

});

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
        // currentYear:new Date().getFullYear() -- This is not needed as we now have the helper function getCurrentYear
    })
});

// handling a new route to projects
app.get('/projects',(req,res) =>{
    res.render('projects.hbs',{
        pageTitle: 'Projects Page',
        // currentYear:new Date().getFullYear() -- This is not needed as we now have the helper function getCurrentYear
    })
});


//test another route but sending bad data
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Oops, Double Oops, did you get here by mistake?'
    });
});

// we now need to set the app to listed by binding the app to a port to listen
// 2nd parameter is optional and is a function. Functions happen when server is up
app.listen(port,() => {
    console.log(`Listening on ${port}`);
});

