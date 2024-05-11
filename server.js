// server.js

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv").config();
const app = express();
const staticRoutes = require("./routes/static");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const utilities = require("./utilities/index");

// Set up view engine and templates
app.set("view engine", "ejs");
app.set("layout", "./layouts/layout"); // Specify the layout file path
app.use(expressLayouts);

// Static routes
app.use(staticRoutes);

// Inventory routes
app.use("/inv", inventoryRoute);

// Home route
app.get("/", utilities.handleErrors(baseController.buildHome));



// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});

// Express Error Handler
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  const message = err.status == 404 ? err.message : "Oh no! There was a crash. Maybe try a different route?";
  res.render("errors/error", {
    title: err.status || "Server Error",
    message,
    nav,
  });
});

// Local Server Information
const port = process.env.PORT;
const host = process.env.HOST;

// Log statement to confirm server operation
app.listen(port, host, () => {
  console.log(`App listening on ${host}:${port}`);
});
