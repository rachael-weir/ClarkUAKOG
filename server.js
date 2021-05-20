require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
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
mongoose.connect('mongodb://localhost:27017/steeringCommitteeDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

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
        },
        fullname:{
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

app.get('/about', function (req, res) {
    res.sendFile(__dirname + "/public/about.html");
});

app.get('/program', function (req, res) {
    res.sendFile(__dirname + "/public/program.html");
});

app.get('/join', function (req, res) {
    res.sendFile(__dirname + "/public/join.html");
});

app.get('/steeringcommittee', function (req, res) {
    res.sendFile(__dirname + "/public/steeringcommittee.html");
});

app.get('/contact', function (req, res) {
    res.sendFile(__dirname + "/public/contact.html");
});

app.get('/social', function (req, res) {
    res.sendFile(__dirname + "/public/social.html");
});