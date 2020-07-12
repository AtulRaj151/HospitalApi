const Doctor = require('../../models/doctor');
const jwt = require('jsonwebtoken'); // importing jsonwebtoken

//register new doctor 
module.exports.register = async(req,res) =>{
         
    try{

           //find doctor using the given username
        let doctor  = await  Doctor.findOne({username:req.body.username});

        if(!doctor) {
            //if username is not found then create new username
           await Doctor.create(req.body);
           return res.json(200,{
               message:"success"
           })
        }else{

            // if user already present then return response
            return res.json(200,{
                message:"user already registerd"
            }) 
        }
    }catch(err){
        //handling error
        console.log("Erro in register");
    }
      
    
}

//login action for user
module.exports.login = async (req,res) =>{

    try{
        //finding the doctor in database
    let doctor = await Doctor.findOne({username:req.body.username});

            //check for the doctor password and doctor as well 
      if(!doctor || doctor.password != req.body.password){
          //if password incorrect or doctor not found in db return res
            return res.json(422,{
                message:"Invalid username or password"
            })
      }
        //if user found  then send tokens to user
      return res.json(200,{
          message:"success,here is your Token, Keep it Safe!!",
          token:jwt.sign(doctor.toJSON(),"HospitalApi",{expiresIn:1000000})
      })
    }catch(err){
        //handle error
        console.log('Error',error);
        return res.json(500,{
            message:"Internal Server Error"
        })
    }


    
}
