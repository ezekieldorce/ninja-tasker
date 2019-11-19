//packages
const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes");
const db = require("./models");
const passport = require("./config/passport");
const session = require("express-session");

//starting express app
const app = express();

//Setting view engine
app.set("view engine", "ejs");

//middleware
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({ secret: "Giorno theme", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//rounting manager
app.use(routes);

db.sequelize.sync().then(function () {
    //Server listening for request
    app.listen(3000, function (err) {
        if (err) console.log(err);
        console.log('Server is live on port: 3000');
    });
});
