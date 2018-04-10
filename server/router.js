const Router = require('koa-router')
const multer = require('koa-multer')


const testController = require('./controller/test')
const userController = require('./controller/user')
const deviceController = require('./controller/device')
const messageController = require('./controller/message')
const infoController = require('./controller/info')
const deviceApplyController = require('./controller/deviceApply')
const computeApplyController = require('./controller/computeApply')
const authController = require('./controller/auth')


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

  // notice 相关 service
  router.get('/info/getInfoDataById',infoController.infoGetById)
  router.get('/info/getAllInfoData',infoController.infoGetAll)
  router.get('/info/getInfoSearch',infoController.infoSearch)
  router.post('/info/addInfo',infoController.infoPost) 
  router.delete('/info/deleteInfoById', infoController.infoDelete)
  router.put('/info/modifyInfoById',infoController.infoPut)

  // deviceApply 相关 service
  router.get('/deviceApply/getApplyById',deviceApplyController.deviceApplyGetById)
  router.get('/deviceApply/getAllApplyData',deviceApplyController.deviceApplyGetAll)
  router.get('/deviceApply/getApplySearch',deviceApplyController.deviceApplySearch)
  router.post('/deviceApply/addApply',deviceApplyController.deviceApplyPost)
  router.post('/deviceApply/addApplyFront',deviceApplyController.deviceApplyPostFront) 
  router.delete('/deviceApply/deleteApplyById', deviceApplyController.deviceApplyDelete)
  router.put('/deviceApply/modifyApplyById',deviceApplyController.deviceApplyPut)

  //computeApply 相关 service
  router.get('/computeApply/getApplyById',computeApplyController.computeApplyGetById)
  router.get('/computeApply/getAllApplyData',computeApplyController.computeApplyGetAll)
  router.get('/computeApply/getApplySearch',computeApplyController.computeApplySearch)
  router.post('/computeApply/addApply',computeApplyController.computeApplyPost)
  router.post('/computeApply/addApplyFront',computeApplyController.computeApplyPostFront) 
  router.delete('/computeApply/deleteApplyById', computeApplyController.computeApplyDelete)
  router.put('/computeApply/modifyApplyById',computeApplyController.computeApplyPut)

  //auth 相关 service
  router.get('/auth/getUser',authController.authGetUser)
  router.get('/auth/checkLogIn',authController.authCheckLogin)
  router.post('/auth/regist',authController.authRegist)
  router.put('/auth/logIn',authController.authLogin)
  router.put('/auth/logOut',authController.authLogOut)
  
  return router
}