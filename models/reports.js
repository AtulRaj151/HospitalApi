const mongoose = require('mongoose');
let reportSchema =new mongoose.Schema({
        status:{
              type:String,
              enum:['Negative', 'Travelled-Quarantine',
                'Symptoms-Quarantine', 'Positive-Admit'],
              default:'Negative'
        },
        doctor:{
             type:mongoose.Types.ObjectId,
             ref:'Doctor'
        },
        patient:{
            type:mongoose.Types.ObjectId,
            ref:'Patient'
        }

},{
    timestamps:true
})

module.exports = mongoose.model('Report',reportSchema);