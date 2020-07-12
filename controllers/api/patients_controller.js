
const  Patient = require('../../models/patient');
const Doctor = require('../../models/doctor');
const Report = require('../../models/reports');
const { findById, populate } = require('../../models/patient');
const { all } = require('../../routes');
const { response } = require('express');
const patient = require('../../models/patient');
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
                    let report = await Report.create({status:status,patient:patient._id})
                      let currentReport = await Report.findById(report._id)
                      .populate({
                          path:'patient',
                          populate:{
                              path:'doctor',
                            
                          }
                      })
                      
                    //   console.log(currentReport)

                        
                  return res.json(200,{
                      message:"success, Patient Report created!!",
                      mobile:currentReport.patient.mobile,
                      status:currentReport.status,
                      doctor:currentReport.patient.doctor.username,
                      date: new Date(currentReport.createdAt).toUTCString()

                  })
                     

           }
        }catch(err){
            return res.json(422,{
                message:"patient not found"
            })
        }
        
}

module.exports.allReports = async (req,res) => {

        try {

            
        let reports = await Report.find({patient:req.params.id})
        .sort([['createdAt','ascending']])
        .populate({
              path: 'patient',
              populate:{
                  path:'doctor'
              }
        });

          let data = [];
                 
          
          
            reports.map((report) =>{
                    console.log(report);
                    data.push({
                         
                          status:report.status,
                          doctor:report.patient.doctor.username,
                          date:new Date(report.createdAt).toLocaleDateString(),
                          time:new Date(report.createdAt).toLocaleTimeString()

                    })
            })
        return res.json(200,{
            message:'success,all reports of patient',
            mobile: reports[0].patient.mobile,
            data:data

        })
            
        } catch (error) {
            console.log("Error in finding Report");
            return res.json(422,{
                message:'error,could not found any patients'
            })
        }


}

module.exports.findStatus = async (req,res) =>{

    let status ;
    console.log(req.params.status)
   //check the keyword and asign the status
   if(req.params.status === 'TQ'){
       status = "Travelled-Quarantine";                                
   }else if(req.params.status === "SQ") {
       status = "Symptoms-Quarantine";
   }else if(req.params.status === "PA"){
             status = "Positive-Admit";
   }else if(req.params.status === 'N'){
         status = "Negative";
   }else{
        return res.json(422,{
              message:"Invalid Keyword"
        })
   }

   
   
     //find the status in reports
              try {

               

                let reports  = await Report.find({status:status})
                .populate({
                      path:'patient',
                      populate:{
                             path:'doctor'
                      }
                })

                let data = [];
                 
                     
          
                reports.map((report) =>{
                        console.log(report);
                        data.push({
                             
                              mobile:report.patient.mobile,
                              doctor:report.patient.doctor.username,
                              date:new Date(report.createdAt).toLocaleDateString(),
                              time:new Date(report.createdAt).toLocaleTimeString()
    
                        })
                })
            return res.json(200,{
                message:'success,all reports of patient',
                status:status,
                data:data
    
            })


                  
              } catch (error) {
                  console.log("Error",error);
                  return res.json(422,{
                      message:'error'
                  })
              }

}