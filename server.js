/* ******************************************
* This server.js file is the primary file of the 
* application. It is used to control the project.
*******************************************/

/* ***********************
* Require Statements
*************************/
const expressLayouts = require("express-ejs-layouts")
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const utilities = require("./utilities")
const baseController = require("./controllers/baseController")
/* ***********************
* View Engine and Templates
*************************/
app.set("view engine", "ejs");
app.set("layout", "./layouts/layout"); // Specify the layout file path
app.use(expressLayouts);
 
/* ***********************
* Routes
*************************/
app.use(static)
//Index route
app.get("/", utilities.handleErrors(baseController.buildHome))

 /* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){ message = err.message} else {message = 'Oh no! There was a crash. Maybe try a different route?'}
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})
/* ***********************
* Local Server Information
* Values from .env (environment) file
*************************/
const port = process.env.PORT
const host = process.env.HOST
 
/* ***********************
* Log statement to confirm server operation
*************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})