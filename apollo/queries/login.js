import gql from 'graphql-tag'

export const AUTH = gql`
  query auth($username: String!, $password: String!) {
    auth(username: $username, password: $password) {
      token
      user {
        id
        username
        role
      }
    }
  }
`
