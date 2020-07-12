const mongoose = require('mongoose');//importing mongoose
//report schema
let reportSchema =new mongoose.Schema({
        status:{
              type:String,
              enum:['Negative', 'Travelled-Quarantine',
                'Symptoms-Quarantine', 'Positive-Admit'],
              default:'Negative'
        },
      
        patient:{
            type:mongoose.Types.ObjectId,
            ref:'Patient'
        }

},{
    timestamps:true
})

module.exports = mongoose.model('Report',reportSchema);