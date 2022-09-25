const express = require('express')
const userRoutes = require('./routes/user')
const activityRoutes = require('./routes/activity')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())


//Route
app.use("/users", userRoutes)
app.use("/activity", activityRoutes)
app.get("/", (req, res) => res.send("Welcome to the Users API!"))
app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."))

//dB
mongoose
  .connect(process.env.dB_connection) 
  .then(console.log("Connected to database"))
  .catch((error) => console.error(error))

//Server
app.listen(process.env.PORT, () => 
  console.log(`Server running on port: http://localhost:${process.env.PORT}`)
)
