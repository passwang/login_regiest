var express = require("express");
var app = express();
var db = require("./models/db.js");
var crypto = require("./models/crypto.js");
var formidable = require("formidable");
app.set("view engine","ejs");
app.use(express.static("./public"));

app.get("/register",function (req,res) {
    res.render("register");
});
app.post("/zhuce",function (req,res,next) {
    var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
        var username = fields.username;
        var password = crypto(fields.password);
        db.insertArray("person",[{
           "username": username,
           "password": password
        }],function (err,result) {
            res.end("注册成功");
        })

    });
});
app.get("/login", function (req, res) {
    res.render("login");
});
app.post("/denglu", function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var username = fields.username;
        var password = crypto(fields.password);
        console.log(username,password);
        db.find("person", {"username": username},function (err, result) {
            console.log(result);
            if(result.length == 0) {
                res.send("-2");
                return;//没有这个用户名
            } else if(result[0].password === password) {
                res.send("1");//登录成功
            } else {
                res.send("-1");//没有登录成功
            }
        })

    });
});
app.listen(3000);
