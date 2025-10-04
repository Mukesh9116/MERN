require("dotenv").config({quiet:true});
const express = require("express");
const cors = require("cors");
const app = express();
// console.log("MONGO:", process.env.MONGODB_URI); // test if it works
const authRouter = require("./router/auth_router");
const contactRouter = require("./router/contact_router");
const serviceRouter = require("./router/service_router");
const adminRouter = require("./router/admin_router");

const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error_middleware");

// let's tackel cors

const corsOptions = {
  origin:"http://localhost:5173",
  method:"GET , POST , DELETE , PATCH , HEAD",
  credentials:true,
}

app.use(cors(corsOptions)); // use as a middleware

app.use(express.json()); // middleware

// Mount the Router : To use the router in your main Express app , you can "mount" it at a specific URL prefix.

app.use("/api/auth",authRouter);
app.use("/api/form",contactRouter);
app.use("/api/data",serviceRouter);

// lets define admin pannel-->>
app.use("/api/admin",adminRouter);


app.use(errorMiddleware);

// Basic Routes for testing purpose only.

// app.get('/' , (req, res) => {
//     res.status(200).send("Welcome to world best mern series by thapa technical");
// });


// app.get('/register' , (req, res) => {
//     res.status(200).send("Welcome to registration page.");
// });

const PORT = 8080;

connectDb().then(() => {
  // Start the server only after successful database connection
    app.listen(PORT , () => {
    console.log(`Server is running at port : ${PORT}`);
});
});
