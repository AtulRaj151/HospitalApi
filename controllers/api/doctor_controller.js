const Doctor = require('../../models/doctor');
const jwt = require('jsonwebtoken'); // importing jsonwebtoken

module.exports.register = async(req,res) =>{
         
    try{

    
        let doctor  = await  Doctor.findOne({username:req.body.username});

        if(!doctor) {
           await Doctor.create(req.body);
           return res.json(200,{
               message:"success"
           })
        }else{
            return res.json(200,{
                message:"user already registerd"
            }) 
        }
    }catch(err){
        console.log("Erro in register");
    }
      
    
}

module.exports.login = async (req,res) =>{

    try{
    let doctor = await Doctor.findOne({username:req.body.username});


      if(!doctor || doctor.password != req.body.password){
            return res.json(422,{
                message:"Invalid username or password"
            })
      }

      return res.json(200,{
          message:"success,here is your Token, Keep it Safe!!",
          token:jwt.sign(doctor.toJSON(),"HospitalApi",{expiresIn:'100000'})
      })
    }catch(err){
        
        console.log('Error',error);
        return res.json(500,{
            message:"Internal Server Error"
        })
    }


    
}
