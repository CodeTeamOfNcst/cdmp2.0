'use strict' 
const { Device } = require('../config/models')
const { DeviceType } = require('../config/models')
const { DeviceApply } = require('../config/models')
const { User } = require('../config/models')
const { fs } = require('fs')
const { uuid } = require('uuid')
const { Op } = require('sequelize')
/**
 * 
 * @param { JSON } options 相当于查询的条件
 * @param { Number } limit 限制数据的条数，默认为 comfig 中的条数
 */
const ItemPerPage = 10;
module.exports.getDeviceDataById = async (JSON) => {
  try {
    let thisDevice = await Device.findOne({
      where: {
        id: JSON.id
      }
    });
    let deviceType = await DeviceType.findOne({
      where: {
        id: thisDevice.device_type
      }
    });
    let deviceManager = await User.findOne({
      where: {
        id:thisDevice.device_manager
      }
    });
    let device = {
      id: thisDevice.id,
      name: thisDevice.name,
      imgFilePath: thisDevice.imgFilePath,
      description: thisDevice.description,
      location:thisDevice.location,
      purchaseDate: thisDevice.purchaseDate,
      needRepair: thisDevice.needRepair,
      canReserve: thisDevice.canReserve,
      device_type_id: deviceType.id,
      device_type_name: deviceType.name,
      device_manager:deviceManager.name,
      isUse: thisDevice.isUse
    };
    let result = {
      device: device,
      status: 1,
      message: '获取设备信息成功'
    }
    return result;
} catch (err) {
  let result = {
      status: 0,
      message: `获取详细信息失败， 原因 ${err}`
    }
    return result;
  }
}
module.exports.getDeviceDataByName = async (JSON) => {
  try {
    let thisDevice = await Device.findOne({
      where: {
        name: JSON.name
      }
    });
    let deviceType = await DeviceType.findOne({
      where: {
        id: thisDevice.device_type
      }
    });
    let deviceManager = await User.findOne({
      where: {
        id:thisDevice.device_manager
      }
    });
    let device = {
      id: thisDevice.id,
      name: thisDevice.name,
      imgFilePath: thisDevice.imgFilePath,
      description: thisDevice.description,
      location:thisDevice.location,
      purchaseDate: thisDevice.purchaseDate,
      needRepair: thisDevice.needRepair,
      canReserve: thisDevice.canReserve,
      device_type: deviceType.id,
      device_manager:deviceManager.name,
      device_type_name: deviceType.name,
      isUse: thisDevice.isUse
    };
    let result = {
      device: device,
      status: 1,
      message: '获取设备信息成功'
    }
    return result;
} catch (err) {
  let result = {
      status: 0,
      message: `获取详细信息失败， 原因 ${err}`
    }
    return result;
  }
}

module.exports.getAllDeviceData = async () => {
  try {
    let devices = await Device.findAll({
      // offset: (parseInt(ctx.params.page || 1) - 1) * ItemPerPage,
      limit: ItemPerPage
    });
    let devicesType = await DeviceType.findAll();
    let Devices = [];
    let DevicesTypes = [];
    for (let i = 0; i < devices.length; i++) {
      let user = await devices[i].getDeviceUser();
      Devices.push({
        id: devices[i].id,
        date: devices[i].purchaseDate,
        name: devices[i].name,
        description: devices[i].description,
        location: devices[i].location,
        isUse: devices[i].isUse ? '可用' : '禁用',
        type: devicesType[devices[i].device_type - 1].name,
        type_id: devicesType[devices[i].device_type - 1].id,
        imgFilePath: devices[i].imgFilePath,
        device_manager:user.name,
        needRepair:devices[i].needRepair ? '需要' : '不需要',
        canReserve: devices[i].canReserve ? '可预约':'不可预约',
        show: true,
      })
    }
    for (let i = 0; i < devicesType.length; i++) {
        DevicesTypes.push({
            id: devicesType[i].id,
            name: devicesType[i].name
        })
    }
    let count = await Device.count();
    let result = {
      status: 1,
      message: '成功获取数据',
      counts: count,
      Devices: Devices,
      DeviceTypes: DevicesTypes
    }
    return result;
} catch (err) {
  let result = {
      status: 0,
      message: `获取详细信息失败， 原因 ${err}`
    }
    return result;
  }
}
module.exports.getDeviceSearch = async (JSON) => {
  try{
    let searchResult = await Device.findAll({
      where: {name:{ [Op.like] : `%${JSON.name}%`}}
    })
    if(! searchResult || searchResult.length === 0) throw("未匹配到结果")
    let result = []
    let devicesType = await DeviceType.findAll();
    for(let i=0;i<searchResult.length; i++){
      result.push({
        id: searchResult[i].id,
        date: searchResult[i].purchaseDate,
        name: searchResult[i].name,
        isUse: searchResult[i].isUse ? '可用' : '禁用',
        type:  devicesType[searchResult[i].device_type - 1].name,
        type_id:  devicesType[searchResult[i].device_type - 1].id,
        imgFilePath: searchResult[i].imgFilePath,
        needRepair:searchResult[i].needRepair ? '需要' : '不需要',
        canReserve: searchResult[i].canReserve ? '可预约':'不可预约',
        show: true,
      })
    }
    let res = {
      result: result,
      status: 1,
      message: '设备匹配成功'
    }
    return res
  }catch(err){
    let res = {
      status: 0,
      message: `${err}`
    }
    return res
  }
}
module.exports.getDeviceOnlyData = async () => {
  try {
    let devices = await Device.findAll();
    let thisDevices = [];
    for (let i = 0; i < devices.length; i++) {
      thisDevices.push({
        key: devices[i].id,
        label: devices[i].id +'-'+ devices[i].name
      })
    }
    let result = {
      devices: thisDevices,
      status: 1,
      message: '获取数据成功'
    }
    return result;
  }catch (err) {
    let result = {
      status: 0,
      message: `获取详细信息失败， 原因 ${err}`
    }
    return result;
  }
}

module.exports.AddDevice = async (JSON) => {
  try {
    if(!JSON.name){throw("设备名称未定义")}
    let newDevice = await Device.create(
      {
        name: JSON.name,
        device_manager:JSON.device_manager,
        description: JSON.describe,
        imgFilePath: JSON.imgFilePath,
        location: JSON.location,
        purchaseDate: JSON.addDate,
        needRepair: JSON.needRepair,
        canReserve: JSON.canApply,
        isUse: JSON.isUse
      }
    );
    await newDevice.save();
    let device_type = await DeviceType.findOne({
      where: {
        id: JSON.deviceType
      }
    });
    let device_manager = await User.findOne({
      where: {
        id:JSON.device_manager
      }
    });
    await newDevice.setDeviceUser(device_manager);
    await newDevice.setDeviceType(device_type);
    await newDevice.save();
    let result = {
      status: 1,
      message: '创建成功'
    }
    return result;
} catch (err) {
    let result = {
      status: 0,
      message: `创建失败，原因： ${err}`
    }
    return result;
  }
}

module.exports.deleteDeviceById = async (JSON) => {
  try {
    let deleteDevice = await Device.findOne({
      where: {
          id: JSON.id
      }
    });
    let result = await deleteDevice.update({
      isUse: false
    });
    deleteDevice.save();
    let res = {
      status: 1,
      message: '仪器禁用成功'
    }
    return res;
} catch (err) {
    let res = {
      status: 0,
      message: `不可用失败， 原因 ${err}`
    }
    return res;
  }
}

module.exports.modifyDeviceById = async (JSON) => {
  try {
    let thisDevice = await Device.findOne({
      where: {
        id: JSON.id
      }
    });
    // if (thisDevice.imgFilePath !== imagePath && imagePath) { // 判断是否上传了新的图片，没有则不改变图片
    //   let oldPath = thisDevice.imgFilePath;
    //   let targetPath = 'uploads/deviceImages/' + uuid.v1() + '.jpg'; //图片路径不一致，将图片copy到文件夹下
    //   if (fs.existsSync('static/' + imagePath)) {
    //     fs.readFile('static/' + imagePath, (err, data) => {
    //       fs.writeFile('static/' + targetPath, data, (err) => {
    //           if (err) console.log(err)
    //       })
    //     });
    //     thisDevice.update({
    //       imgFilePath: targetPath //直接将可以作为图片路径显示的路径存储在数据库中
    //     });
    //     if (fs.existsSync('static/' + oldPath) && oldPath) fs.unlink('static/' + oldPath)
    //   }
    // }
    console.log(JSON.deviceTypeId)
    let thisType = await DeviceType.findOne({
      where: {
        id: JSON.deviceTypeId
      }
    });
    await thisDevice.setDeviceType(thisType);
    await thisDevice.update({
      name: JSON.name,
      purchaseDate: JSON.purchaseDate,
      needRepair: JSON.needRepair,
      location: JSON.location,
      canReserve: JSON.canApply || true,
      isUse: JSON.isUse,
      description: JSON.describe
    });
    await thisDevice.save();
    let res = {
      status: 1,
      message: '设备信息更新成功'
    }
    return res;
} catch (err) {
    let res = {
      status: 0,
      message: `更新失败，由于 ${ err }`
    }
    return res;
  }
}
