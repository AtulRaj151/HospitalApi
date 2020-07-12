
const  Patient = require('../../models/patient');//importing Patient Schema
const Doctor = require('../../models/doctor');//importing doctor Schema
const Report = require('../../models/reports');//importing Report Schema

//action to register the patients by the doctor using id as parameter
module.exports.register = async function(req,res) {

    //   console.log("Request Body ************",req.body);
    //   console.log("request **********",req.user._id)

      //check if patient already exists or not

      try{
      
     let patient = await Patient.findOne({mobile:req.body.mobile});

         if(!patient){
             //if patient doesnot exists in db create new patient
             let user  = await Patient.create({
                   mobile: req.body.mobile,
                   doctor:req.user._id
             });
             //return res success along with id so that doctor can use for future reference
             return res.json(200,{
                 message:"success, UserCrated",
                 id:user._id
             })

         }else{
             //if it exists in the database resturn the info of patients along with id
             return res.json(200,{
                message:"Success,Patient Already Exits",
                mobile:patient.mobile,
                id:patient._id
            })
         }
        }catch(err){
          //handle error
             console.log("Error")
             return res.json(500,{
                message:"Internal Server Error"
            })
        }

     
      
}

//generate report action using the id of a patient

module.exports.createReport = async (req,res) => {

          try{
              //check patient in db using id of patient as params
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

                    //find the report and populate the reference of patient and doctor in Report Schema
                      let currentReport = await Report.findById(report._id)
                      .populate({
                          path:'patient',//first populate the patient in ReportSchema
                          populate:{
                              path:'doctor', //then populate doctor in Patient Schema
                            
                          }
                      })
                      
                    //   console.log(currentReport)
               //send response to doctor with the follwing details of the patient
                        
                  return res.json(200,{
                      message:"success, Patient Report created!!",
                      id: currentReport.patient._id,
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

//generate the all the reports of a patients from oldest to latest using id of patient
module.exports.allReports = async (req,res) => {

        try {

            //find all reports of patients using the patient id
        let reports = await Report.find({patient:req.params.id})
        .sort([['createdAt','ascending']]) //sort in ascending order using the field createdAt
        .populate({
              path: 'patient',  //first populate the patient in ReportSchema
              populate:{
                  path:'doctor' //then populate doctor in Patient Schema
              }
        });

          let data = []; // initialise empty array              
          
          //add all the relevent info in data
            reports.map((report) =>{
                    console.log(report);
                    data.push({
                          id: report.patient._id,
                          status:report.status,
                          doctor:report.patient.doctor.username,
                          date:new Date(report.createdAt).toLocaleDateString(),
                          time:new Date(report.createdAt).toLocaleTimeString()

                    })
            })
            // return data response to the user
        return res.json(200,{
            message:'success,all reports of patient',
            mobile: reports[0].patient.mobile,
            data:data

        })
            
        } catch (error) {
            //handle error
            console.log("Error in finding Report");
            return res.json(422,{
                message:'error,could not found any patients'
            })
        }


}
// find the reports based on the Status using keywords
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

               
                //  find all report which are status
                let reports  = await Report.find({status:status})
                .populate({
                      path:'patient', //first populate the patient in ReportSchema
                      populate:{
                             path:'doctor' //then populate doctor in Patient Schema
                      }
                })

                let data = []; //init data array                
                     
          
                reports.map((report) =>{
                        console.log(report);
                        data.push({
                              id: report.patient._id,
                              mobile:report.patient.mobile,
                              doctor:report.patient.doctor.username,
                              date:new Date(report.createdAt).toLocaleDateString(),
                              time:new Date(report.createdAt).toLocaleTimeString()
    
                        })
                })

            
            return res.json(200,{
                message:'success,all reports of patient',
                status:status,
                data:data //return data array
    
            })


                  
              } catch (error) {
                  console.log("Error",error);
                  return res.json(422,{
                      message:'error'
                  })
              }

}