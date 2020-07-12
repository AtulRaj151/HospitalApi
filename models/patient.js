const mongoose = require('mongoose');
let patientSchema =new mongoose.Schema({
        mobile:{
            type:String,
            required:true,
            unique:true
        },        
        doctor:{
              type:mongoose.Schema.Types.ObjectId,
              ref:'Doctor'
        }

},{
    timestamps:true
})

module.exports = mongoose.model('Patient',patientSchema);