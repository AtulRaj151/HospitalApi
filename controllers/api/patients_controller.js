
const  Patient = require('../../models/patient');
const Doctor = require('../../models/doctor');
const Report = require('../../models/reports');
const { findById } = require('../../models/patient');
module.exports.register = async function(req,res) {

      console.log("Request Body ************",req.body);
      console.log("request **********",req.user._id)

      //check if patient already exists or not

      try{
      
     let patient = await Patient.findOne({mobile:req.body.mobile});

         if(!patient){
             //if patient doesnot exists in db create new patient
             let user  = await Patient.create({
                   mobile: req.body.mobile,
                   doctor:req.user._id
             });
             return res.json(200,{
                 message:"success, UserCrated",
                 id:user._id
             })

         }else{
             //if it exists in the database resturn the info of patients
             return res.json(200,{
                message:"Success,Patient Already Exits",
                mobile:patient.mobile,
                id:patient._id
            })
         }
        }catch(err){
             console.log("Error")
        }

     
      
}

//create report action

module.exports.createReport = async (req,res) => {

          try{
           let patient = await Patient.findById(req.params.id);
        //    console.log(patient);

           //if patient exists in the database


            let status = "Negative";
           if(patient){
                            //check the status code
                if(req.body.status === 'TQ'){
                    status = "Travelled-Quarantine";                                
                }else if(req.body.status === "SQ") {
                    status = "Symptoms-Quarantine";
                }else if(req.body.status === "PA"){
                          status = "Positive-Admit";
                }
    // create report of the patient in the database
                    let report = await (await Report.create({status:status,patient:patient._id})).populate('patient','mobile')
                    console.log(report);
                  return res.json(200,{
                      message:"success, Patient Report created!!"
                  })
                     

           }
        }catch(err){
            return res.json(422,{
                message:"patient not found"
            })
        }
        
}