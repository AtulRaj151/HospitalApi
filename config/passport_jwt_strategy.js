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
          Doctor.find({id:payload.id},(err,doctor) => {

               if(err) {
                    return done(err,false);
               }

               if(doctor){
                    return done(null,doctor);
               }else{
                   return done(null,false);
               }

          })
            
  
}))


