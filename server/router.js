const Router = require('koa-router')
const multer = require('koa-multer')


const testController = require('./controller/test')
const userController = require('./controller/user')
const upload = multer({
  dest: './static/uploads'
})

module.exports = () => {
  const router = new Router({
    prefix: '/api'
  })

  // test url 测试用相关 service 
  router.get('/test/get', testController.testGet)  // 测试 get 带参数
  router.post('/test/post', testController.testPost)   // 测试post 带参数
  router.put('/test/put', testController.testPut)  // 测试 put 带参数
  router.delete('/test/delete', testController.testDelete) // 测试 delete 带参数
 

  // user 相关 service 
  router.get('/user/usergetAllData',userController.userGet)
  router.post('/user/userAddUser',userController.userPost) 
  router.get('/user/userGetUserData',userController.userGet)
  router.delete('/user/userDeleteById', userController.userDelete)
  router.put('/user/modifyUserById',userController.userPut)

  // device 相关 service


  return router
}