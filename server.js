require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const csvParse = require('csv-parse');
const mongoose = require('mongoose');
//Add sessions
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

//Configure body-parser and set static dir path.
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//Initialize passport
app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Configure Mongoose
mongoose.connect('mongodb://localhost:27017/steeringCommitteeDB', {useNewUrlParser: true, useUnifiedTopology: true}, function () {
    console.log("db connection successful 2");
});
mongoose.set("useCreateIndex", true);

const memberSchema = {
    title: String,
    name: String,
    year: String,
    major: String,
    bio: String,
    url: String
};

const Member = mongoose.model('Member', memberSchema);

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            unique: true,
            require: true,
            minlength: 3
        },
        password:{
            type: String,
            require: true
        }
    }
);

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

//Configure passport
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(3000, function () {
    console.log("server started at 3000");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/home.html");
});

app.get("/get_all_members", function (req, res) {
    Member.find(function (err, data) {
        if (err) {
            res.send({
                "message": "error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});

app.get('/get_current_user', function (req,res){
    if (req.isAuthenticated()){
        console.log(req.user);
        res.send({
            message: "success",
            data: req.user
        });
    }else{
        res.send({
            message: "no login",
            data: {}
        });
    }
});

app.get('/login', (req, res) => {
    if (req.query.error) {
        res.redirect("/login.html?error=" + req.query.error);
    } else {
        res.redirect("/login.html");
    }
});

app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(
        user,
        function (err) {
            if (err) {
                console.log(err);
                res.redirect('login?error=Invalid username or password');
            }
            else{
                const authenticate = passport.authenticate(
                    "local",
                    {
                        successRedirect: "/",
                        failureRedirect: "/login?error=Username and password don't match"
                    })
                authenticate(req, res);
            }
        }
    )
});

app.post('/delete_member_by_id', (req, res) => {
    console.log("deletemember2");
    Member.deleteOne(
        {"_id": req.body._id},
        {},
        (err) => {
            if (err){
                res.send({"message":"database error"});
            }
            else {
                res.send({"message": "success"});
            }
        }
    )
});

app.get('/get_member_by_id',
    function (req, res) {
        console.log(req.query.member_id);
        Member.find({"_id": req.query.member_id}, function (err, data) {
            if (err || data.length === 0) {
                res.send({
                    "message": "internal database error",
                    "data": {}
                });
            } else {
                res.send({
                    "message": "success",
                    "data": data[0]
                });
            }
        });
    });

app.get('/about', function (req, res) {
    res.sendFile(__dirname + "/public/about.html");
});

app.get('/program', function (req, res) {
    res.sendFile(__dirname + "/public/program.html");
});

app.get('/join', function (req, res) {
    res.sendFile(__dirname + "/public/join.html");
});

app.get('/mentor', function (req, res) {
    res.sendFile(__dirname + "/public/mentor.html");
});

app.get('/mentee', function (req, res) {
    res.sendFile(__dirname + "/public/mentee.html");
});

app.get('/steeringcommittee_list', function (req, res) {
    res.sendFile(__dirname + "/public/steeringcommittee_list.html");
});

app.get('/steeringcommittee_edit', function (req, res) {
    res.sendFile(__dirname + "/public/steeringcommittee_edit.html");
});

app.get('/steeringcommittee_detail', function (req, res) {
    res.sendFile(__dirname + "/public/steeringcommittee_detail.html");
});

app.get('/contact', function (req, res) {
    res.sendFile(__dirname + "/public/contact.html");
});

app.get('/social', function (req, res) {
    res.sendFile(__dirname + "/public/social.html");
});