
const Koa = require('koa')
const { Nuxt, Builder } = require('nuxt')
const logger = require('koa-logger')
const Cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser');

const app = new Koa()
const database = require('./config/models')
const router = require('./router')()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  if (process.env.NODE_ENV === 'development') {
    /**
    ** Sync DB
    */
    await database.sequelize.sync({
    })
    console.log("Database Sync successfully")
  }
  // init middlewares 
  app.use(logger())
  app.use(bodyParser());
  app.use(Cors({
    'credentials': true
  }))
  app.use(router.routes()).use(router.allowedMethods())
  
  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}

start()
