const { GraphQLObjectType, GraphQLString } = require('graphql')
const User = require('../user/user.model')
const UserType = require('../user/user.type')

const Auth = new GraphQLObjectType({
  name: 'Auth',
  fields: () => ({
    id: { type: GraphQLString },
    token: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: async function(_, args) {
        return await User.findById(_.id)
      }
    }
  })
})

module.exports = Auth
