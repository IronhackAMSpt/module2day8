const express = require('express');
const router  = express.Router();

const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require('../models/User');

/* GET home page */
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  const password = req.body.password;
  const username = req.body.username; 

  bcrypt.hash(password, 10)
    .then(hash => {
      return User.create({
        username: username,
        password: hash
      })
    })
    .then(user => {
      res.send('user created: ' + user);
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/login', (req, res) => {
  res.render('login');
})

// router.post('/login', (req, res) => {
//   let currentUser;

//   User.findOne({username: req.body.username})
//     .then(user => {
//       if(!user) {
//         res.send("user not found");
//         return
//       }
//       currentUser = user;
//       return bcrypt.compare(req.body.password, user.password)
//     })
//     .then(passwordCorrect => {
//       if(passwordCorrect) {
//         req.session.currentUser = currentUser
//         res.send("the password is correct")
//       } else {
//         res.send("incorrect password");
//       }
//     })
// })

router.post('/login', passport.authenticate("local", {
  successRedirect: "/members",
  failureRedirect: '/auth/login'
}))

// router.get('/logout', (req, res) => {
//   req.session.destroy(err => {
//     res.redirect('/auth/login');
//   })
// })

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/auth/login');
})
module.exports = router;
