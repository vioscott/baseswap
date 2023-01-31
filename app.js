//jshint esverion:6
require('dotenv').config();
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();
  // parse requests of content-type
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/userDB", {useNewUrlParser: true});

// const db = require("./app/models");
// const Role = db.role;



// user database
const userSchema = new mongoose.Schema ({
    email: String,
    username: String,
    password: String,
    status: {
      type: String, 
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    confirmationCode: { 
      type: String, 
      unique: true },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
});

userSchema.plugin(passportLocalMongoose);


const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// module.exports = User;

//mailer



// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'baseswap.team@gmail.com',
//       pass: 'BaseSwap1000'
//     }
//   });

//   var mailOptions = {
//     from: 'baseswap.team@gmail.com',
//     to: 'vioscott2020@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });



// routes
// require("./app/routes/auth.routes")(app);
// require("./app/routes/user.routes")(app);


// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "moderator"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'moderator' to roles collection");
//       });

//       new Role({
//         name: "admin"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }


    //process get request for all pages
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/index.html", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/account/register-view.html", function(req, res) {
    res.sendFile(__dirname + "/account/register-view.html");
});

app.get("/account/index.html", function(req, res) {
    res.sendFile(__dirname + "/account/index.html");
});

app.get("/account/index13ff.html", function(req, res) {
    res.sendFile(__dirname + "/account/index13ff.html");
});

app.get("/account/password-reset/index.html", function(req, res) {
    res.sendFile(__dirname + "/account/password-reset/index.html");
});


app.get("/learn.html", function(req, res) {
    res.sendFile(__dirname + "/learn.html");
});

app.get("/aboutUs.html", function(req, res) {
    res.sendFile(__dirname + "/aboutUs.html");
});

app.get("/terms-and-conditions.html", function(req, res) {
    res.sendFile(__dirname + "/terms-and-conditions.html");
});

app.get("/privacy-policy.html", function(req, res) {
    res.sendFile(__dirname + "/privacy-policy.html");
});

app.get("/exchange/dashboard.html", function(req, res) {
    if(req.isAuthenticated()){
        res.sendFile(__dirname + "/exchange/dashboard.html")
    } else {
        res.redirect("/account/index.html")
    }
});

app.get("/login", function(req, res) {
    if(req.isAuthenticated()){
        res.sendFile(__dirname + "/exchange/dashboard.html")
    } else {
        res.redirect("/account/index.html")
    }
});

app.get("/account/logout", function(req, res) {
   req.logout();
   res.redirect("/")
});



app.post("/register", function(req, res) {

    User.register({email: req.body.user_email}, req.body.username, req.body.user_password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/account/register-view.html")
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/exchange/dashboard.html")
            })
        }
    })    
});

app.post("/login", function(req, res) {

    const user = new User({
        username: req.body.username,
        password: req.body.user_password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
        } else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/exchange/dashboard.html")
            })
        }
    })

});

// function initial() {
//     Role.estimatedDocumentCount((err, count) => {
//       if (!err && count === 0) {
//         new Role({
//           name: "user"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'user' to roles collection");
//         });
  
//         new Role({
//           name: "moderator"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'moderator' to roles collection");
//         });
  
//         new Role({
//           name: "admin"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'admin' to roles collection");
//         });
//       }
//     });
//   }
  








app.listen(3000, function() {
    console.log("Server is up and running");
});