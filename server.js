require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
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
mongoose.connect('mongodb://localhost:27017/steeringCommitteeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function () {
    console.log("db connection successful 2");
});
mongoose.set("useCreateIndex", true);

const infoPageSchema = {
    page: String,
    title: String,
    body: [{
        paragraph: String
    }],
    sub_title: String,
    sub_body: [{
        paragraph: String
    }],
    home_description: String
}

const infoPage = mongoose.model('Page', infoPageSchema);

const memberSchema = {
    title: String,
    name: String,
    year: String,
    major: String,
    bio: String
};

const Member = mongoose.model('Member', memberSchema);

const themeSchema = {
    theme: String,
    description: String
};

const Theme = mongoose.model('Theme', themeSchema);

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './img')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: "clarkakog.contact@gmail.com",
        pass: process.env.CONTACT_PASSWORD_SECRET,
    },
});

// verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

app.post("/send", (req, res) => {
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
        console.log(fields);
        Object.keys(fields).forEach(function (property) {
            data[property] = fields[property].toString();
        });
        const mail = {
            from: data.email,
            to: "clarkakog@gmail.com",
            subject: data.subject,
            text: `Name: ${data.name}\nEmail: ${data.email}\nPhone Number: ${data.phone}\n\n${data.message}`,
        };
        transporter.sendMail(mail, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send("Something went wrong.");
            } else {
                res.status(200).send("Email successfully sent to recipient!");
            }
        });
    });
});

app.listen(8080, function () {
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

app.get("/get_all_themes", function (req, res) {
    Theme.find(function (err, data) {
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

app.get('/get_current_user', function (req, res) {
    if (req.isAuthenticated()) {
        // console.log(req.user);
        res.send({
            message: "success",
            data: req.user
        });
    } else {
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
            } else {
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

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.post('/delete_member_by_id', (req, res) => {
    if (req.isAuthenticated()) {
        Member.deleteOne(
            {"_id": req.body._id},
            {},
            (err) => {
                if (err) {
                    res.send({"message": "database error"});
                } else {
                    res.send({"message": "success"});
                }
            }
        )
    } else {
        //navigate to login
        res.send({
            message: 'Login required!',
            data: '/login'
        });
    }
});

app.post("/new-member", (req, res) => {
    if (req.isAuthenticated()) {
        const member = {
            title: req.body.title,
            name: req.body.name,
            year: req.body.year,
            major: req.body.major,
            bio: req.body.bio
        }
        console.log("save:" + req.body._id);

        if (req.body._id) {
            Member.updateOne(
                {_id: req.body._id},
                {$set: member},
                {runValidators: true},
                (err, info) => {
                    if (err) {
                        console.log(err.message);
                        res.redirect(`/steeringcommittee_edit.html?error_message=${JSON.stringify(err.errors)}&input=${JSON.stringify(member)}&member_id=${req.body._id}`);
                    } else {
                        console.log(info);
                        res.redirect(`/steeringcommittee_detail.html?member_id=${req.body._id}`);
                    }
                }
            )
        } else {
            const nm = new Member(member);
            nm.save((err, new_member) => {
                if (err) {
                    console.log(err);
                    res.redirect('/steeringcommitte_edit.html?error_message=' + err["message"] + '&input=' + JSON.stringify(member));
                } else {
                    console.log(new_member._id);
                    res.redirect('/steeringcommittee_detail.html?member_id=' + new_member._id);
                }
            });
        }
    } else {
        //navigate to login
        res.redirect('/login.html?error=Login Required!');
    }
});

app.get('/get_member_by_id', function (req, res) {
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

app.get('/get_theme_by_id', function (req, res) {
    console.log(req.query.theme_id);
    Theme.find({"_id": req.query.theme_id}, function (err, data) {
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

app.get('/edit_member', function (req, res) {
    if (req.isAuthenticated()) {
        res.send({
            message: "success",
            url: '/steeringcommittee_edit?member_id=' + req.query._id
        });
    } else {
        //res.redirect('/login.html?error=Login Required!');
        res.send({
            message: "login required",
            url: '/login.html?error=Login Required!'
        });
    }
});

app.get('/steeringcommittee_edit', (req, res) => {
    console.log(req.query.member_id);
    if (req.isAuthenticated()) {
        res.redirect('steeringcommittee_edit.html?member_id=' + req.query.member_id)
        //res.sendFile(__dirname + "/src/steeringcommittee_edit.html");
    } else {
        res.redirect('/login.html?error=Login Required!')
    }
})

app.get('/steeringcommittee_detail', function (req, res) {
    res.sendFile(__dirname + "/public/steeringcommittee_detail.html");
});

app.get('/contact', function (req, res) {
    res.sendFile(__dirname + "/public/contact.html");
});

app.get('/social', function (req, res) {
    res.sendFile(__dirname + "/public/social.html");
});

app.get('/success', function (req, res) {
    res.redirect('/home.html?sent=success');
});

app.get('/get_page_info', function (req, res) {
    //console.log(req.query.page);

    infoPage.find(
        {'page': req.query.page},
        function (err, data) {
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
        }
    );
});

app.post('/edit_page', function (req, res) {
    if (req.isAuthenticated()) {
        const page = req.body.page;

        //console.log("save:" + page._id);

        if (page._id) {
            infoPage.updateOne(
                {_id: page._id},
                {$set: page},
                {runValidators: true},
                (err, info) => {
                    if (err) {
                        res.send({
                            "message": err.message,
                        });
                    } else {
                        res.send({
                            "message": "success",
                            "info": info
                        });
                    }
                }
            )
        }
    } else {
        //navigate to login
        res.redirect('/login.html?error=Login Required!');
    }
});

app.get('/themes_list', function (req, res) {
    res.sendFile(__dirname + "/public/themes_list.html");
});

app.get('/themes_detail', function (req, res) {
    res.sendFile(__dirname + "/public/themes_detail.html");
});