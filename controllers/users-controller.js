const passport = require('passport');
const bcrypt = require('bcrypt');

// models
const User = require('./models/User');

const register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10) 
  req.body.password = hash
  let user = new User(req.body)
  await user.save() 
  req.login(user, (err) => {
    if (err) {
      return res.status(404).send('error')
    } else {
      return res.send('success')
    }
  })
}

const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {  
    if (err) { return next(); }
    if (!user) {
      next()
    }
    req.login(user, function(err) {
      if (err) { return next(); }
      next()
    });
  })(req, res, next)
}

const confirmLogin = (req, res) => {
  // here you can redirect based on whether you have a user or not, you don't necessarily need this, it's just nice to check for req.user when using passport
  if (req.user) {
    res.send('success')
  } else {
    res.status(404).send('error')
  }
}

const logout = (req, res) => {
  req.logOut()
  res.redirect('/login')
}

module.exports = {
  register,
  login,
  confirmLogin,
  logout
}