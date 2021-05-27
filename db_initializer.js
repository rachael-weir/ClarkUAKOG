require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const parse = require('csv-parse/lib/sync');

//Add sessions
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

//Initialize passport
app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const fs = require('fs');
const rawdata = fs.readFileSync(__dirname + "/steeringcommitteedata.csv");

const csvList = parse(rawdata, {
    columns: true,
    skip_empty_lines: true
});

mongoose.connect('mongodb://localhost:27017/steeringCommitteeDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });
mongoose.set("useCreateIndex", true);

const memberSchema = {
    title: String,
    name: String,
    year: String,
    major: String,
    bio: String,
    url: String
}

const Member = mongoose.model('Member', memberSchema);

const memberList = [];

csvList.forEach(function (member) {
    memberList.push({
        "title": member["title"],
        "name": member["name"],
        "year": member["year"],
        "major": member["major"],
        "bio": member["bio"],
        "url": member["url"]
    });
});

Member.insertMany(memberList, {}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("All list data saved successfully!");
        mongoose.connection.close();
    }
});

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true,
            minlength: 3
        },
        password: {
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

const newUser = {
    username: process.env.USERNAME_SECRET
};

// newUser.save(function (err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("All user data saved successfully!")
//             mongoose.connection.close();
//         }
//     });

User.register(
    newUser,
    process.env.PASSWORD_SECRET,
    function (err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log("All user data saved successfully!")
            mongoose.connection.close();
        }
    }
);