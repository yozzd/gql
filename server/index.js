const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const cfg = require('./config')
const expressCfg = require('./config/express.js')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')
const { maskErrors } = require('graphql-errors')
maskErrors(schema)
const authPassport = require('./schema/auth/auth.passport');
const User = require('./schema/user/user.model')
const auth = require('./schema/auth/auth.service')

mongoose.connect(cfg.db.uri, cfg.db.options)
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: ' + err)
    process.exit(-1)
})

app.set('port', port)

const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

authPassport.setup(User)

  app.use('/graphql', auth.validateAuthorization, graphqlHTTP((req, res, next) => {
    return ({
      schema: schema,
      context: { req, res, next },
      graphiql: true
    })
  }))


const start = async function() {
  expressCfg(app)
  const nuxt = new Nuxt(config)

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(nuxt.render)

  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port + ' in ' + process.env.NODE_ENV + ' mode')
}
start()
