const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Hospital');
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in Database"));

db.once('open',()=>{
      console.log("Connected to the database");
})

module.exports = db;