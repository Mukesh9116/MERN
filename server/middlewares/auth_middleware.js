
const jwt = require('jsonwebtoken');

const User = require('../models/user_model');


const auth_middleware = async (req, res, next) => {
  const authHeader = req.header('Authorization'); // check ki token user ke pas hai ki nahi

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: token not provided' });
  }

  const token = authHeader.split(' ')[1]; // remove "Bearer" -> jab ham token ko access karna chahte hai to (Bearer token)-> ata hai aur hame bs token chahiye esliye Bearer ho hatate hai.

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: malformed token' });
  }
  
  try {
    const isVarified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      
    // Varified kar rahe hai ki jo email user ne enter kiya hai vo hamare User Schema me present hai ya nahi.
    const userData = await User.findOne({email:isVarified.email}).select({ // select method se hamne password ko remove kiya hai
        password:0,
    });
    console.log(userData);
 
    // userData se ham data ko req.user me send kar rahe hai jo controller ke user me use kiya gaya hai.
    req.user = userData; // complete user ka data hai password ko chhod ke

    req.token = token;

    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: invalid token' });
  }
};

module.exports = auth_middleware;
