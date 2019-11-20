const express = require("express");
const db = require('../models')
const routes = express.Router();
const passport = require("../config/passport");
let list = ["watch anime", "Slackline tonight"];

//ROUTES
//GET home
routes.get("/home", authenticate, function (req, res) {
    db.Tasks.findAll({
        where: { userID: req.user.id }
    }).then(function (results) {
        // console.log(results);
        res.render("home.ejs", { list: results, user: req.user });
    });
});


//POST /ninja
routes.post("/home", function (req, res) {
    console.log(req.body.taskItem);
    db.Tasks.create({
        todo: req.body.taskItem,
        userID: req.user.id
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


//GET profile
routes.get("/profile", authenticate, function (res, req) {
    res.render("profile.ejs", { user: req.user });
})

//GET logout
routes.get("/logout", function (req, res) {
    req.logout();
    res.redirect('/home');
});

module.exports = routes;
