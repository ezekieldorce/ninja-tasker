//packages
const express = require('express');

//starting express app
const app = express();

//Setting view engine
app.set("view engine", "ejs");

//middleware
const bodyParser = require('body-parser');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));

let list = ["watch anime", "Slackline tonight"];

//ROUTESfunction
app.get("/home", function (req, res) {
    res.render("home.ejs", { list: list })
});


//POST /ninja
app.post("/ninja,", function (req, res) {
    console.log(req.body.taskItem);
    list.push(req.body.taskItem);
    res.render("home.ejs", { list: list });
});

app.delete("/delete/:index", function (req, res) {
    console.log(req.params.index)
    list.splice(req.param.index, 1);
    res.json(list);
});

db.sequelize.sync().then(function () {
    //Server listening for request
    app.listen(3000, function (err) {
        if (err) console.log(err);
        console.log('Server is live on port: 3000');
    });
});
