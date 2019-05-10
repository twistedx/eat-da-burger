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
    db.burger.findAll({}).then(function(data) {
      var temp = { burgers: data };
      // console.log(temp.burgers);
      res.render("index", temp);
    });
  });

  app.get("/api/burgers", (req, res) => {
    db.burger.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // Create a new burger entry
  app.post("/api/burgers", function(req, res) {
    console.log(req.body);
    db.burger
      .create({
        burger_name: req.body.burger_name,
        devoured: req.body.devoured
      })
      .then(function(burger) {
        res.redirect("/");
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.put("/api/burgers/:id", function(req, res) {
    console.log(req.params.id);
    db.burger
      .update(
        {
          devoured: true
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(function(burger) {
        res.json(burger);
      });
  });

  // DELETE route for deleting posts

  app.delete("/api/burgers/:id", function(req, res) {
    db.burger
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(burger) {
        res.json(burger);
      });
  });
};
