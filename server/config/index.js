module.exports = {
  db: {
    uri: process.env.DATABASE_URL,
    options: {}
  },
  secret: {
    session: 'super-secret'
  },
  userRoles: ['guest', 'user', 'admin']
}
