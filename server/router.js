const Router = require('koa-router')
const multer = require('koa-multer')

const { testGet } = require('./service/test')
const upload = multer({
  dest: './static/uploads'
})

module.exports = () => {
  const router = new Router({
    prefix: '/api'
  })

  // test url 
  router.get('/test', testGet)

  return router
}