'use strict' 
const { User } = require('../config/models')
const { UserType } = require('../config/models')
const { Device } = require('../config/models')
const { DeviceApply } = require('../config/models')
const { ComputeApply } = require('../config/models')
const { DeviceType } = require('../config/models')
const { Op } = require('sequelize')
/**
 * 
 * @param { JSON } options 相当于查询的条件
 * @param { Number } limit 限制数据的条数，默认为 comfig 中的条数
 */

module.exports.userGetUserData = async (JSON) => {
  try{
    let userId = await User.findOne({
      where: {
        id: JSON.id  
      } 
    })
    let userType = await userId.getUserType()
    let userData = {
      id: userId.id,
      name: userId.name,
      account: userId.account,
      password: userId.password,
      userType: userType.id,
      phone: userId.phone,
      email: userId.email,
      isUse: userId.isUse
    };
    let res = {
        user: userData,
        status: 1,
        message: '查询用户信息成功'
    }
    return res
  }catch(err){
    let res = {
      status: 0,
      message: `查询失败，原因 ${err}`
    }
    return res;
  }
}
const ItemPerPage = 10;
module.exports.userGetAllData = async () => {
  try{
    let Users = await User.findAll({
      // offset: (parseInt(ctx.params.page || 1) - 1) * ItemPerPage,
      limit: ItemPerPage
    });
    let UserTypes = await UserType.findAll();
    let UsersDetail = [];
    for (let index in Users) {
      let userType = await Users[index].getUserType();
      UsersDetail.push({
          user: Users[index],
          userType: userType
      })
    }
    let count = await User.count();
    let res = {
      counts: count,
      status: 1,
      message: '获取用户所有数据',
      usersDetail: UsersDetail,
      userTypeDetail: UserTypes
    }
    return res
  }catch(err){
    let res = {
      status: 0,
      message: '获取数据失败',
    }
    return res;
  }
};
module.exports.onlyGetAllUser = async () => {
  let users = await User.findAll();
  let thisUsers = []
  for (let index in users) {
    thisUsers.push({
        key: users[index].id,
        label: users[index].name,
    })
  }
  let result = {
      users: thisUsers,
      status: 1,
      message: '成功获取用户数据'
  }
  return result;
};
module.exports.userSearchData = async (JSON) => {
  try{
    let searchData = await User.findAll({
      where: {name:{ [Op.like] : `%${JSON}%`}}
    })
    if(! searchData || searchData.length === 0) throw("未匹配到结果")
    let user = {}
    let result = []
    for(let i=0;i<searchData.length; i++){
      let user_type = await searchData[i].getUserType()
      let User = {
        id: searchData[i].id,
        name: searchData[i].name,
        account:searchData[i].account,
        password:searchData[i].password,
        phone:searchData[i].phone,
        email:searchData[i].email,
        isUse: searchData[i].isUse
      }
      result.push({
        user:User,
        userType:user_type
      })
    }
    let res = {
      result: result,
      status: 1,
      message: '匹配用户信息成功'
    }
    return res;
  }catch(err){
    let res = {
        status: 0,
        message: `${err}`
    }
    return res;
  }
};
module.exports.userApply = async (JSON) => {
  try{
    let thisUser = await User.findOne({
        where: {id: JSON.id}
    })
    if(!thisUser) throw("用户不存在")
    //查询所有申请
    let DeviceApply = []
    let thisDeviceApplys = await thisUser.getDeviceApply()
    let ComputeApply = await ComputeApply.findAll({
      where:{apply_user:thisUser.id}
    })
    for(let i=0; i<thisDeviceApplys.length; i++){  
      let device = await Device.findOne({
        where: {id: thisDeviceApplys[i].apply_device }
      })
      DeviceApply.push({
        deviceApply: thisDeviceApplys[i],
        device: thisDeviceApplys[i].apply_device,
        deviceType:device.device_type,
      })
    }
    let result = {
      status : 1,
      message: '申请表查询成功',
      deviceResult: DeviceApply ,
      computeResult: ComputeApply
    }
    return result;
  }catch(err){
    let result = {
      status: 0,
      message : `错误：${err}`
    }
    return result;
  }
}

module.exports.userAddUser = async (JSON) => {
  try {
    if(!JSON.name && !JSON.account && !JSON.user_type){throw("请务必填写前三项")}
    let users = await User.findAll();
    for(let index in users) {
      if(JSON.account == users[index].account) {
        let res = {
          status: 0,
          message: `账号创建重复`
        } 
        return res;
      } 
    } 
    let newUser = await User.create({
      account: JSON.account,
      password: JSON.password,
      name: JSON.name,
      phone: JSON.phone,
      email: JSON.email,
      isUse: JSON.isUse
    })
    let userType = await UserType.findOne({
      where: {
        id: JSON.user_type
      }
    });
    await newUser.setUserType(userType)
    newUser.save()
    let res = {
      status: 1,
      message: '用户创建成功'
    }
    return res;
  }catch (err) {
    let res = {
      status: 0,
      message: `创建失败，原因 ${err}`
    }
    return res;
  }
}

module.exports.userDeleteById = async (JSON) => {
  try{
    let thisUser = await User.findOne({
      where:{
        id:JSON.id
      }
    })
    await thisUser.update({
      isUse: false
    });
    await thisUser.save()
    let res = {
      status: 1,
      message: '成功禁用该用户'
    }
    return res;
  }catch(err){
    let res = {
      status: 0,
      message: `禁用失败，原因 ${err}`
    }
    return res;
  }
}

module.exports.modifyUserById = async (JSON) => {
  try {
    let thisUser = await User.findOne({
        where: {
          account:JSON.account, 
        }
    }); 
    let userType = await UserType.findOne({
      where: {
        id: JSON.user_type
      }
    });
    await thisUser.update({
      user_type:JSON.user_type,
      account: JSON.account,
      password:JSON.password,
      name: JSON.name,
      phone: JSON.phone,
      email: JSON.email,
      isUse: JSON.isUse
    })
    thisUser.setUserType(userType);
    thisUser.save();
    let result = {
        status: 1,
        message: '用户信息更新成功'
    }
    return result;
  }catch (err) {
    let result = {
        status: 0,
        message: `更新失败， 原因${err}`
    }
    return result;
  }
};
