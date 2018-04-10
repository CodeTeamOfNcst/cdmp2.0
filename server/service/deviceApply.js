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

module.exports.getAllApplyData = async () => {
    try{
        let applys = await DeviceApply.findAll({ 
            // offset: (parseInt(ctx.params.page || 1) - 1) * ItemPerPage, 
            limit: ItemPerPage 
        });
        // let applys = await DeviceApply.findAll({ offset: 5, limit: 5 }); // 分页查询
        // 教程上说由于原型链方法的原因不鼓励使用for in
        let Applys = [];
        for(let i=0; i<applys.length; i++){
            Applys.push({
                apply: applys[i],
                applyUser: applys[i].apply_user,
                checkUser: applys[i].check_user,
                applyDevice: applys[i].apply_device,
            })
        }
        let count =  await DeviceApply.count();
        let result = {
            counts: count,
            applys: Applys,
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
        //暂定以申请理由搜索，后期改为以申请人搜索
        let searchResult = await DeviceApply.findAll({
            where: { vioReason:{ [Op.like] : `%${JSON.vioReason}%`}}
        })
        if(! searchResult || searchResult.length === 0) throw("未匹配到结果")
        let result = []
        for(let i =0; i< searchResult.length; i++){
            result.push({
                apply: searchResult[i],
                applyUser: searchResult[i].apply_user,
                applyDevice:  searchResult[i].apply_device
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
        if((!JSON.vioReason) || 
            (!JSON.apply_user) || 
            (!JSON.apply_device)
        ) throw("预约信息填写有误")
        let newDevice = await DeviceApply.create({
            startDate: JSON.date[0],
            endDate: JSON.date[1],
            isAgree: JSON.isAgree,
            vioReason: JSON.vioReason,
            isUse: JSON.isUse
        });
        let applyer = await User.findOne({
            where:{id: JSON.apply_user }
        });
        let applyDevice = await Device.findOne({
            where: {id: JSON.apply_device}
        });
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

module.exports.addApplyFront = async (JSON,userJSON) => {   
    if(userJSON){
        try{
            let thisUserAccount = userJSON;
            let thisUser = await User.findOne({
                where: { account:thisUserAccount }
            });
            if(thisUser){
                let thisDevice = await Device.findOne({
                    where: {id: JSON.apply_device}
                })
                let thisApply = await DeviceApply.create({
                    vioReason: JSON.vioReason,
                    startDate: JSON.startDate,
                    endDate: JSON.endDate
                })
                thisApply.setDeviceApplyer(thisUser);
                thisApply.setApplyDevice(thisDevice)

                let result = {
                    status: 1,
                    message: '成功'
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
