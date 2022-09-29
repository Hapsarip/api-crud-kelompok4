const express = require('express')
const userRoutes = require('./routes/user')
const activityRoutes = require('./routes/activity')
const authRoutes = require('./routes/auth')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())

//Route
app
  .use("/user", userRoutes)
  .use("/user", authRoutes)
  .use("/activity", activityRoutes)
  .get("/", (req, res) => res.send("Welcome to the API!"))
  .all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."))

//dB
mongoose
  .connect(process.env.dB_connection) 
  .then(console.log("Connected to database"))
  .catch((error) => console.error(error))

//Server / URL
app.listen(process.env.PORT, () => 
  console.log(`Server running on port: http://localhost:${process.env.PORT}`)
)
