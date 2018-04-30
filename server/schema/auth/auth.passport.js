const passport = require('passport')
const { Strategy } = require('passport-local')

const localAuthenticate = async (User, username, password, done) => {
  try {
    const user = await User.findOne({username: username})
    if(!user) {
      return done(null, false, {
        message: 'This username is not registered'
      })
    }

    const authPassword = await user.authenticate(password)
    if(!authPassword) {
      return done(null, false, {
        message: 'This password is not correct'
      })
    } else {
      return done(null, user)
    }
  } catch(err) {
    throw err
  }
}

exports.setup = (User) => {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, function(username, password, done) {
    return localAuthenticate(User, username, password, done)
  }))
}
