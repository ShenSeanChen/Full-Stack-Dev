const express = require('express'); //use require to get access to express library
//we are using 'common js modules' on the server side 

// import express from 'express'; 
//we use 'ES2015 module' on the front end (react side)

const app = express();
//it generates an application called app that runs express stuff


app.get('/', (req, res) => {
    res.send({ bye: 'buddy'});
});
// create our first 'route handler' with express
// app -> get method (get info); can also do the following
    // app.post: send info to the server
    // app.put: update all the properties of sth
    // app.delete; app.patch: update 1 or 2 properties of sth
// '/'  wathes for requests trying to access '/', 
    // '/' is the route portion of the hander, we can do /greeting
// req:request; res:outgoing response
// res.send({}):immediately send some JSON data back to whoever made the req

const PORT = process.env.PORT || 3000;
// heroku will inject environment variables
    // env vars are set in underlying runtime that node is running on top of 
// The boolean || 5000
    // if there are no env vars set by heroku, go ahead and set 5000 as the port
app.listen(PORT)
// app.listen(5000);
//go to localhost:5000 on your browser







