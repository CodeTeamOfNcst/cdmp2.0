'use strict' 
const { User } = require('../config/models')
const { UserType } = require('../config/models')
/**
 * 
 * @param { JSON } options 相当于查询的条件
 * @param { Number } limit 限制数据的条数，默认为 comfig 中的条数
 */
const ItemPerPage = 10;
module.exports.usergetAllData = async () => {
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
        message: '获取数据成功!!!',
        usersDetail: UsersDetail,
        userTypeDetail: UserTypes
    }
    return res
  }catch(err){
    let res = {
      status: 0,
      message: '获取数据失败',
    }
    return res
  }
  
};

module.exports.userGetUserData = async (JSON, limit) => {
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
        message: '获取用户信息成功'
    }
    return res
  }catch(err){
    let res = {
      status: 0,
      message: `查询失败，原因 ${err}`
    }
    return res
  }
}

module.exports.userAddUser = async (JSON) => {
  try {
    let userType = await UserType.findOne({
      where: {
        id: JSON.user_type
      }
    });
    let newUser = await User.create({
      account: JSON.account,
      password: JSON.password,
      name: JSON.name,
      phone: JSON.phone,
      email: JSON.email,
      isUse: JSON.isUse
    })
    await newUser.setUserType(userType)
    newUser.save()
    let res = {
      status: 1,
      message: '创建成功'
    }
    return res
  }catch (err) {
    let res = {
      status: 0,
      message: `创建失败，原因 ${err}`
    }
    return res
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
      message: '成功禁用'
    }
    return res
  }catch(err){
    let res = {
      status: 0,
      message: `禁用失败，原因 ${err}`
    }
    return res
  }
}

module.exports.modifyUserById = async (JSON) => {
  try {
    let thisUser = await User.findOne({
        where: {
            id: 1
        }
    }); 
    let userType = await UserType.findOne({
      where: {
        id: JSON.user_type
      }
    });
    await thisUser.update({
      id:JSON.id,
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
    return result
  }catch (err) {
    let result = {
        status: 0,
        message: `更新失败， 原因${err}`
    }
    return result
  }
};
