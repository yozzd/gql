const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const Auth = require('./auth/auth.controller')
const User = require('./user/user.controller')

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    auth: Auth.token,
    userAll: User.all,
    userMe: User.me
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    userCreate: User.create,
    userUpdate: User.update,
    userDelete: User.delete
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})

