const { GraphQLObjectType, GraphQLString } = require('graphql')

const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    role: { type: GraphQLString }
  })
})

module.exports = User
