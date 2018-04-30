const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const config = require('../../config')
const { UserError } = require('graphql-errors')
const User = require('../user/user.model')

const validateJwt = expressJwt({
  secret: config.secret.session
});

exports.signToken = (id, role) => {
  return jwt.sign({
    _id: id,
    role: role
  }, config.secret.session, {
    expiresIn: 60 * 60 * 5
  })
}

exports.validateAuthorization = async (req, res, next) => {
  if(req.headers.authorization) {
    return await validateJwt(req, res, next)
  }
  next()
}

exports.isAuthenticated = (fn) => async (_, args, ctx) => {
  if(!ctx.req.user) {
    throw new UserError('Access Denied / Forbidden');
  } else {
    if(config.userRoles.indexOf(ctx.req.user.role)) {
      return await fn(...[_, args, ctx])
    } else {
      throw new UserError('Access Denied / Forbidden');
    }
  }
}

exports.hasRole = (role, fn) => async (_, args, ctx) => {
  if(!ctx.req.user) {
    throw new UserError('Access Denied / Forbidden');
  } else {
    if(config.userRoles.indexOf(ctx.req.user.role) >= config.userRoles.indexOf(role)) {
      return await fn(...[_, args, ctx])
    } else {
      throw new UserError('Access Denied / Forbidden');
    }
  }
}

/*exports.isAuthenticated = (req, res, next) => {
  return compose()
    .use((req, res, next) => {
      validateJwt(req, res, next)
    })
    .use(async (req, res, next) => {
      try {
        if (err.name === 'UnauthorizedError') {
          reject(new UserError('No authorization token was found'))
        } else {
          const user = await User.findById(req.user._id);
          if(!user) {
            reject(new UserError('Cannot find the user'))
          }
          req.user = user
          next()
        }
      } catch(err) {
        next(err)
      }
    })(req, res, next)
});

exports.hasRole = (roleRequired) => {
  if(!roleRequired) {
    throw new Error('Required role needs to be set');
  }
  return compose()
    .use(this.isAuthenticated())
    .use((req, res, next) => {
      if(userRoles.indexOf(req.user.role) >= userRoles.indexOf(roleRequired)) {
        return next();
      } else {
        return res.status(403).json({
          message: "Access Denied/Forbidden"
        });
      }
    });
}*/
