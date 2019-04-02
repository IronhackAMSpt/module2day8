const express = require('express');
const router  = express.Router();

const ensureLogin = require('connect-ensure-login');

/* GET home page */
router.get('/', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render('members');
});


module.exports = router;
