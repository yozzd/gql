import gql from 'graphql-tag'

export const ME = gql`
  query {
    userMe {
      id
      username
      role
    }
  }
`

export const USER_ALL = gql`
  query {
    userAll {
      id
      username
      role
    }
  }
`

export const USER_CREATE = gql`
  mutation userCreate($username: String!, $password: String!, $role: String!) {
    userCreate(username: $username, password: $password, role: $role) {
      id
      username
      role
    }
  }
`

export const USER_DELETE = gql`
  mutation userDelete($input: [UserInput]!) {
    userDelete(input: $input) {
      id
    }
  }
`
export const USER_UPDATE = gql`
  mutation userUpdate($id: String!, $username: String!, $role: String!) {
    userUpdate(id: $id, username: $username, role: $role) {
      id
      username
      role
    }
  }
`

export const CHANGE_PASSWORD = gql`
  mutation userChangePassword($id: String!, $oldPassword: String!, $newPassword: String!) {
   userChangePassword(id: $id, oldPassword: $oldPassword, newPassword: $newPassword) {
      id
      username
      role
    }
  }
`
