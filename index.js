const express = require('express')
const cors = require('cors');
const userRoutes = require('./routes/user')
const activityRoutes = require('./routes/activity')
const authRoutes = require('./routes/auth')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const errorHandler = require('./middleware/errorHandler')
require('dotenv').config()

const app = express()
const corsConfig = {
  credentials: true,
  origin: "https://listify-seven.vercel.app",
};
app.use(cors(corsConfig));

// listify-seven.vercel.app

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://listify-seven.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cookieParser());
app.use(bodyParser.json())

//Route
app
  .use("/user", userRoutes)
  .use("/user", authRoutes)
  .use("/activity", activityRoutes)
  .get("/", (req, res) => res.send("Welcome to the API!"))
  .all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."))

app.use(errorHandler)

//dB
mongoose
  .connect(process.env.dB_connection) 
  .then(console.log("Connected to database"))
  .catch((error) => console.error(error))

//Server / URL
app.listen(process.env.PORT, () => 
  console.log(`Server running on port: http://localhost:${process.env.PORT}`)
)
