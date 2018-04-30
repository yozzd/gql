const { GraphQLList, GraphQLString } = require('graphql')
const { UserError } = require('graphql-errors')
const auth = require('../auth/auth.service')
const User = require('./user.model')
const UserType = require('./user.type')
const UserInput = require('./user.input.type')

exports.all = {
  type: new GraphQLList(UserType),
  resolve: auth.hasRole('admin', async (_, args, ctx) => {
    try {
      return await User.find()
    } catch(err) {
      throw err
    }
  })
}

exports.create = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString }
  },
  resolve: async function(_, args) {
    try {
      const newUser = new User({
        username: args.username,
        password: args.password,
        role: args.role
      })
      return await newUser.save()
    } catch(err) {
      throw err
    }
  }
}

exports.update = {
  type: UserType,
  args: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    role: { type: GraphQLString }
  },
  resolve: auth.hasRole('admin', async (_, args, ctx) => {
    try {
      const user = await User.findById(args.id)
      user.username = args.username
      user.role = args.role
      return await user.save()
    } catch(err) {
      throw err
    }
  })
}

exports.me = {
  type: UserType,
  resolve: auth.isAuthenticated(async (_, args, ctx) => {
    try {
      return await User.findById(ctx.req.user._id)
    } catch(err) {
      throw err
    }
  })
}

exports.delete = {
  type: new GraphQLList(UserType),
  args: {
    input: { type: new GraphQLList(UserInput) }
  },
  resolve: auth.hasRole('admin', async (_, args, ctx) => {
    try {
      await Promise.all(args.input.map(async (val) => {
        await User.findByIdAndRemove(val.id);
      }))
      return args.input
    } catch(err) {
      throw err
    }
  })
}
