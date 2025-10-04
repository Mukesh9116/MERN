const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//*--------------------------------
// UserSchema
//*--------------------------------

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    phone: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    }
})

//*--------------------------------
//? secure the password with the bcryct
//*--------------------------------

userSchema.pre('save',async function(next){ 
    // save ka meaning data ko save karne se phle ye vala code run hoga phir data save hoga.
   const user = this; //this-> userSchema ka data deta hai save hone se phle.
   if(!user.isModified('password')){
    next();  // agar password change nahi hua hai to data directly save kar do.
   }
 
   // nahi to encryped password ko save karo.
   try{ // salt ki value jitna jada rahega utna jade complecated encypted password hoga.
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password , saltRound);
    user.password = hash_password;
   }
   catch(error){
    next(error);
   }
});

//*--------------------------------
// compare the password -->>
//*--------------------------------

userSchema.methods.comparePassword = async function (password) {
    return  bcrypt.compare(password,this.password);
}

//*--------------------------------
// json web token ->
//*--------------------------------


// instance method(esme chahe kitni bhi method or function create kar sakte hai.) -->>esko kahi pe bhi access kar sakte hai.
 // generateToken() ka use auth_controller.js me use ho raha hai authentication ke liye.
userSchema.methods.generateToken =async function () {
    try{
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d",
        }
    );

    }
    catch(error){
        console.log(error);
    }
};
// define the model or the collection name

const User = new mongoose.model("User" , userSchema);

module.exports = User;

