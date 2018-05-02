const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')

const UserSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  role: {
    type: String
  },
  salt: {
    type: String
  }
})

UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'username': this.username,
      'role': this.role
    }
  })

UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    }
  })

const validatePresenceOf = (value) => {
  return value && value.length
}

UserSchema
  .pre('save', function(next) {
    if(!this.isModified('password')) {
      return next()
    }

    if(!validatePresenceOf(this.password)) {
      return next(new Error('Invalid password'))
    }

    this.makeSalt()
      .then(salt => {
        this.salt = salt
      })
      .then(() => {
        return this.encryptPassword(this.password)
      })
      .then(hashedPassword => {
        this.password = hashedPassword
        return next()
      })
  })

UserSchema.methods = {
  makeSalt: async function makeSalt() {
    try {
      const bytes = 16
      const salt = await crypto.randomBytes(bytes).toString('base64')
      return salt
    } catch(err) {
      throw err
    }
  },
  encryptPassword: async function encryptPassword(password) {
    try {
      const defaultIterations = 10000
      const defaultKeyLength = 64
      const salt = new Buffer.from(this.salt, 'base64')
      const key = await crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha256').toString('base64')
      return key
    } catch(err) {
      throw err
    }
  },
  authenticate: async function authenticate(password) {
    try {
      const pwgen = await this.encryptPassword(password)
      if(this.password === pwgen) {
        return true
      } else {
        return false
      }
    } catch(err) {
      throw err
    }
  }
}

module.exports = mongoose.model('User', UserSchema, 'user')
