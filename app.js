//packages
const express = require('express');
const routes = require("./routes");
const db = require("./models");


//starting express app
const app = express();

//Setting view engine
app.set("view engine", "ejs");

//middleware
const bodyParser = require('body-parser');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));

//rounting manager
app.use(routes);

db.sequelize.sync().then(function () {
    //Server listening for request
    app.listen(3000, function (err) {
        if (err) console.log(err);
        console.log('Server is live on port: 3000');
    });
});
