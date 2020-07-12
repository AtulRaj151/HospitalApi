const express = require('express');
const port = 8000;
const app = express();
const bodyParser = require('body-parser');
//import database
const db = require('./config/mongoose');
//setting up passport and passportjwt 
const passport = require('passport');
const passportJWT = require('./config/passport_jwt_strategy');

//use of bodyParser

app.use(bodyParser.urlencoded());


//using routes
app.use('/',require('./routes'));


//listen on port 
app.listen(port,(err) => {
      if(err) { console.log("Error in Connecting the Server",err); return;}

      console.log("Connected to the Server");
})