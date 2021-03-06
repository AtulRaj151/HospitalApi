const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctor');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : "HospitalApi"
}
//use for authentication from doctor
passport.use(new JWTStrategy(opts,(payload,done) => {

            //find doctor in database
            console.log(payload);
          Doctor.findOne({username:payload.username},(err,doctor) => {

               if(err) {
                    //if error occurs
                    return done(err,false);
               }

               if(doctor){

                    
                    return done(null,doctor);
               }else{
                   return done(null,false);
               }

          })
            
  
}))


