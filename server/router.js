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

  // test url 测试用相关 service 
  router.get('/test', testGet)  // 测试 get 带参数
  router.post('/test/post')   // 测试post 带参数

  // user 相关 service 

  // device 相关 service
  

  return router
}