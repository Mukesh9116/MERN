// const { data } = require("react-router-dom");
const { use } = require("react");

const User = require("../models/user_model");

const bcrypt = require("bcryptjs"); // use for the password hashing and compare.


//*------------------------
// Home page
//*------------------------

const home = async (req, res) => {
    try {
        res
            .status(200)
            .send(
                "Welcome to  home page."
            )

    }
    catch (error) {
        console.log(error);
    }
}


//*------------------------
// Registration Logic
//*------------------------

const register = async (req, res) => {
    try {
        // console.log(req.body);

        const { username, email, phone, password } = req.body;

        // jo hamne database banai hai user ki usme ye email exist karta hai ki nahi.
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "email already exists" });
        }


        // hash the password


        // password ko ham yaha per hash n kar ke using pre method schema me kar rahe hai.

        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password , saltRound);

        // agar user exist nahi karta hai to ek naya user create kar do.
        const userCreated = await User.create({ username, email, phone, password });

                                                                // generateToken() ye function userSchema function me define hai.
        res.status(201).json({ msg: "registration successful", token: await userCreated.generateToken(), userId: userCreated._id.toString() });
    }
    catch (error) {
        res.status(500).json("internal server error");
    }
} 


//*------------------------
// User Login Logic
//*------------------------

// controllers/authController.js
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // compare password
    const isMatch = await userExist.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // generate token
    const token = await userExist.generateToken();
    return res.status(200).json({
      msg: "Login Successful",
      token,
      userId: userExist._id.toString(),
    });

  } catch (error) {
    console.error(error);
    return next(error); // or res.status(500).json({ message: "Internal Server Error" });
  }
};


//*------------------------
// to send user data -User Logic
//*------------------------

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    res.status(200).json({userData});
  } catch (error) {
    console.error(`error from the user route ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { home, register, login , user};


