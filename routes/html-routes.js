// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html

  app.get("/", (req, res) => {
    db.Burger.findAll({}).then(function(data) {
      var temp = { burgers: data };
      res.render("index", temp);
    });
  });

  // Create a new burger entry
  app.post("/api/burgers", function(req, res) {
    console.log(req.body);
    db.Burger.create(req.body)
      .then(function(burger) {
        console.log(burger);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
};
