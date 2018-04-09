const Router = require('koa-router')
const multer = require('koa-multer')


const testController = require('./controller/test')
const userController = require('./controller/user')
const deviceController = require('./controller/device')
const messageController = require('./controller/message')

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
  router.get('/user/userGetUserData',userController.userGet)
  router.get('/user/userGetAllData',userController.userGetAll)
  router.get('/user/onlyGetAllUser',userController.userGetName)
  router.get('/user/userSearchData',userController.userSearch)
  router.get('/user/userApply',userController.getApplys)
  router.post('/user/userAddUser',userController.userPost) 
  router.delete('/user/userDeleteById', userController.userDelete)
  router.put('/user/modifyUserById',userController.userPut)

  // device 相关 service
  router.get('/device/getDeviceDataById',deviceController.deviceGetById)
  router.get('/device/getDeviceDataByName',deviceController.deviceGetByName)
  router.get('/device/getAllDeviceData',deviceController.deviceGetAllData)
  router.get('/device/getDeviceOnlyData',deviceController.deviceGetOnlyData)
  router.get('/device/getDeviceSearch',deviceController.deviceSearch)
  router.post('/device/AddDevice',deviceController.devicePost) 
  router.delete('/device/deleteDeviceById', deviceController.deviceDelete)
  router.put('/device/modifyDeviceById',deviceController.devicePut)

  // message 相关 service
  router.get('/message/getMessageDataById',messageController.messageGetById)
  router.get('/message/getAllMessageData',messageController.messageGetAll)
  router.get('/message/getMessageSearch',messageController.messageSearch)
  router.post('/message/addMessage',messageController.messagePost) 
  router.delete('/message/deleteMessageById', messageController.messageDelete)
  router.put('/message/modifyMessageById',messageController.messagePut)

  return router
}