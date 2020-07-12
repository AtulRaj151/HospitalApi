const express = require('express');
const port = 8000;
const app = express();
const bodyParser = require('body-parser');
//import database
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport_jwt_strategy');

//use of bodyParser

app.use(bodyParser.urlencoded());


//using routes
app.use('/',require('./routes'));



app.listen(port,(err) => {
      if(err) { console.log("Error in Connecting the Server",err); return;}

      console.log("Connected to the Server");
})