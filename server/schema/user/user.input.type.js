const { GraphQLInputObjectType, GraphQLString } = require('graphql')

const User = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    id: { type: GraphQLString }
  })
})

module.exports = User
