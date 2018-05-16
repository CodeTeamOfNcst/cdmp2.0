'use strict' 
const { DeviceApply } = require('../config/models')
const { User } = require('../config/models')
const { Device } = require('../config/models')
const { ComputeApply } = require('../config/models')
const { Op } = require('sequelize')
/**
 * 
 * @param { JSON } options 相当于查询的条件
 * @param { Number } limit 限制数据的条数，默认为 comfig 中的条数
 */
const ItemPerPage = 10;
module.exports.getApplyById = async (JSON) => {
    try{
        let thisApply = await DeviceApply.findOne({
            where: { id: JSON.id }
        });
        let res = {
            startDate:thisApply.startDate,
            endDate:thisApply.endDate,
            vioReason:thisApply.vioReason,
            isAgree:thisApply.isAgree,
            isUse:thisApply.isUse,
            apply_user:thisApply.apply_user,
            apply_device:thisApply.apply_device,
            check_user:thisApply.check_user,
        }
        let result = {
            res:res,
            status : 1,
            message: '成功获取该设备申请信息'
        }
        return result;
    }catch (err){
        let result = {
            status : 0,
            message: `获取信息失败， 由于 ${err}`
        }
        return result;
    }
}

module.exports.getAllApplyData = async (JSON) => {
    try{
        let applys = await DeviceApply.findAll({ 
            offset: (parseInt(JSON || 1) - 1) * ItemPerPage, 
            limit: ItemPerPage 
        }); 
        let Applys = []
        let ApplyFront = []
        for(let i=0; i<applys.length; i++){
            let apply_user = await applys[i].getDeviceApplyer()
            let check_user = await applys[i].getDeviceApplyChecker()
            let apply_device = await applys[i].getApplyDevice()
            let Type = await apply_device.getDeviceType()
            Applys.push({
                id: applys[i].id,
                startDate:applys[i].startDate,
                endDate:applys[i].endDate,
                vioReason:applys[i].vioReason,
                isAgree:applys[i].isAgree,
                isUse:applys[i].isUse,
                createdAt:applys[i].createdAt,
                updatedAt:applys[i].updatedAt,
                applyUserId:applys[i].apply_user,
                applyUser: apply_user.name,
                userAccount:apply_user.account,
                checkUser: check_user.name,
                device: apply_device.name,
                Img:apply_device.imgFilePath,
                deviceType:Type.name,
            })
            //个人中心设备预约显示已审核且未禁用的信息
            if(applys[i].isUse){
                ApplyFront.push({
                    id: applys[i].id,
                    startDate:applys[i].startDate,
                    endDate:applys[i].endDate,
                    isAgree:applys[i].isAgree,
                    applyUserId:applys[i].apply_user,
                    applyUser: apply_user.name,
                    device: apply_device.name,
                    Img:apply_device.imgFilePath,
                    deviceType:Type.name,
                    createdAt:applys[i].createdAt,
                    updatedAt:applys[i].updatedAt,
                })
            }
        }
        let count =  await DeviceApply.count();
        let result = {
            counts: count,
            applys: Applys,
            applysFront:ApplyFront,
            status: 1,
            message: '成功获取信息'
        }
        
        return result;
    }catch(err){
        let result = {
            status : 0,
            message: `获取信息失败， 由于 ${err}`
        }
        return result;
    }
}

module.exports.getApplySearch = async (JSON) => {
    try{
        let deviceId = await Device.findOne({
            where:{
                name:JSON.device
            }
        })
        let searchResult = await DeviceApply.findAll({
            where: { apply_device:{ [Op.like] : `%${deviceId.id}%`}}
        })
        if(! searchResult || searchResult.length === 0) throw("未匹配到结果")
        let result = []
        for(let i =0; i< searchResult.length; i++){
            let apply_user = await searchResult[i].getDeviceApplyer()
            let check_user = await searchResult[i].getDeviceApplyChecker()
            let apply_device = await searchResult[i].getApplyDevice()
            result.push({
                id: searchResult[i].id,
                applyUser: apply_user.name,
                checkUser: check_user.name,
                device: apply_device.name,
                startDate:searchResult[i].startDate,
                endDate:searchResult[i].endDate,
                vioReason:searchResult[i].vioReason,
                isAgree:searchResult[i].isAgree,
                isUse:searchResult[i].isUse,
            })
        }
        let res = {
            result: result,
            status: 1,
            message: '申请搜索成功！'
        }
        return res;
    }catch(err){
        let res = {
            status : 0,
            message: `获取信息失败， 由于 ${err}`
        }
        return res;
    }
}

module.exports.addApply = async (JSON) => {   
    try{
        if((!JSON.device.vioReason) || 
            (!JSON.device.user) || 
            (!JSON.device.device)
        ) throw("预约信息填写有误")
        let newDevice = await DeviceApply.create({
            startDate: JSON.device.date[0],
            endDate: JSON.device.date[1],
            isAgree: JSON.device.isAgree,
            vioReason: JSON.device.vioReason,
            isUse: JSON.device.isUse
        });
        let checker = await User.findOne({
            where:{id:JSON.device.check_user}
        })
        let applyer = await User.findOne({
            where:{id: JSON.device.user }
        });
        let applyDevice = await Device.findOne({
            where: {id: JSON.device.device}
        });
        await newDevice.setDeviceApplyChecker(checker)
        await newDevice.setDeviceApplyer(applyer);
        await newDevice.setApplyDevice(applyDevice);
        await newDevice.save();
        let result ={
            status: 1,
            message: '创建成功'
        }
        return result;
    }catch (err){
        let result ={
            status: 0,
            message: `创建失败，由于 ${err}`
        }
        return result;
    }
}

module.exports.addApplyFront = async (JSON) => {   
    if(JSON.userAccount){
        try{
            let thisUserAccount = JSON.userAccount;
            let thisUser = await User.findOne({
                where: { account:thisUserAccount }
            });
            let checker = await User.findOne({
                where:{id:3}
            })
            if(thisUser){
                let thisDevice = await Device.findOne({
                    where: {id: JSON.deviceId}
                })
                let thisApply = await DeviceApply.create({
                    vioReason: JSON.vioReason,
                    startDate: JSON.startDate,
                    endDate: JSON.endDate
                })
                thisApply.setDeviceApplyChecker(checker)
                thisApply.setDeviceApplyer(thisUser);
                thisApply.setApplyDevice(thisDevice);
                thisApply.save();
                let result = {
                    status: 1,
                    message: '预约已提交'
                }
                return result;
            }else{
                let result = {
                    status: 0,
                    message: '用户不存在'
                }
                return result;
            }
        }catch(err){       
            let result = {
                status: 0,
                message: `异常，由于 ${err}`
            }
            return result;
        }
    }else{
        let result = {
            status: 0,
            message: '用户未登陆 '
        }
        return result;
    }
}

module.exports.deleteApplyById = async (JSON) => {
    try{
        let thisApply = await DeviceApply.findOne({
            where: {id: JSON.id }
        });
        await thisApply.update({
            isUse: false
        });
        let result = {
            status: 1,
            message: '禁用成功'
        }
        return result;
    }catch (err){
        let result = {
            status: 0,
            message: `禁用失败 由于 ${err}`
        }
        return result;
    }   
}

module.exports.modifyApplyById = async (JSON) => {
    try{
        let thisApply = await DeviceApply.findOne({
            where: {id: JSON.id}
        });
        await thisApply.update({
            apply_user:JSON.apply_user,
            check_user:JSON.check_user,
            apply_device:JSON.device,
            vioReason: JSON.vioReason,
            isAgree: JSON.isAgree,
            isUse: JSON.isUse,
            startDate: JSON.date[0],
            endDate: JSON.date[1]
        });
        await thisApply.save();
        let result = {
            status: 1,
            message: '修改成功'
        }
        return result;
    }catch (err){
        let result = {
            status: 1,
            message: `修改异常，原因 ${err}`
        }
        return result;
    }
}
