const express = require("express");
const db = require('../models')
const routes = express.Router();
const passport = require("../config/passport");
let list = ["watch anime", "Slackline tonight"];

//ROUTES
//GET home
routes.get("/home", function (req, res) {
    db.Tasks.findAll({
        attributes: ["id", "todo"]
    }).then(function (results) {
        console.log(results);
        res.render("home.ejs", { list: results })
    })
});


//POST /ninja
routes.post("/home", function (req, res) {
    console.log(req.body.taskItem);
    db.Tasks.create({
        todo: req.body.taskItem
    }).then(function (results) {
        console.log(results);
        res.redirect("/home")
    })
});


routes.delete("/delete/:index", function (req, res) {
    console.log(req.params.index);
    db.Tasks.destroy({
        where: { id: req.param.index }
    }).then(function (results) {
        res.redirect("home");
    });

    res.json(list);
});

// Routes: Users

//GET Login
routes.get("/user/login", function (req, res) {
    res.render("login.ejs");
});

//POST Login
routes.post("/user/login", passport.authenticate('local', {
    successRedirect: "/home",
    faliureRedirect: "/user/login"
}
));

//GET Signup
routes.get("/user/registration", function (req, res) {
    res.render("registration.ejs");
});

//POST Signup
routes.post("/user/signup", function (req, res) {
    passport.authenticate("local-signup", {
        successRedirect: "/home",
        failureRedirect: "/user/signup"
    })
});

module.exports = routes;
