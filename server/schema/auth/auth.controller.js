const { GraphQLList, GraphQLString } = require('graphql')
const AuthType = require('./auth.type')
const passport = require('passport')
const { signToken } = require('./auth.service')
const { Strategy } = require('passport-local')
const { UserError } = require('graphql-errors')

const authLocal = (req, res) => new Promise((resolve, reject) => {
  passport.authenticate('local', async (err, user, info) => {
    const error = err || info;
    if(error) {
      reject(new UserError(error.message))
    }
    if(!user) {
      reject(new UserError('Something went wrong, please try again'))
    }

    const token = await signToken(user._id, user.role)
    
    resolve({
      id: user._id,
      token: token
    })
  })(req, res);
});


exports.token = {
  type: AuthType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  resolve: async function(_, args, ctx) {
    try {
      ctx.req.body = {
        username: args.username,
        password: args.password
      }
      return await authLocal(ctx.req, ctx.res)
    } catch(err) {
      throw err
    }
  }
}
