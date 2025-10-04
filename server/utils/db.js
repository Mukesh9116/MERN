const mongoose = require("mongoose");

// const URL = "mongodb://127.0.0.1:27017/mern_admin";
// mongoose.connect(URL);

// const URL = "mongodb+srv://kumarsinghmukesh237:0NLh7RrvicgCc8BD@cluster0.12yotgo.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0";

const URI = process.env.MONGODB_URI; // yaha se ham URK ko access kar rahe hai. 

const connectDb = async () => {
    try{
        await mongoose.connect(URI);
        console.log("connection successfull to DB");

    }
    catch(error){
        console.log("database connection failed");
        process.exit(0);
    }
}

module.exports = connectDb;
