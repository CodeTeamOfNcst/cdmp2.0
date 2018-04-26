'use strict' 
const { Info } = require('../config/models')
const { Op } = require('sequelize')
/**
 * 
 * @param { JSON } options 相当于查询的条件
 * @param { Number } limit 限制数据的条数，默认为 comfig 中的条数
 */
const ItemPerPage = 10;
module.exports.getInfoDataById = async (JSON) => {
    try{
        let thisInfo = await Info.findOne({where: {id: JSON.id}})
        let infoDetails = {
            id: thisInfo.id,
            releaseDate: thisInfo.releaseDate,
            title: thisInfo.title,
            content: thisInfo.content,
            isUse: thisInfo.isUse
        }
        let result = {
            infoDetails: infoDetails,
            status: 1,
            message: '成功获取信息'
        }
        return result;
    }catch (err){
        let result = {
            status: 0,
            message: `获取信息失败， 由于 ${err}`
        }
        return result;
    }
}

module.exports.getAllInfoData = async (JSON) => {
    try{
        let infos = await Info.findAll({ 
            offset: (parseInt(JSON || 1) - 1) * ItemPerPage,
            limit: ItemPerPage 
        });
        let infoDetail = []
        for(let i = 0; i < infos.length; i++){
            infoDetail.push({
                id: infos[i].id,
                title: infos[i].title,
                content: infos[i].content,
                isUse: infos[i].isUse ? '可用': '禁用',
                releaseDate: infos[i].releaseDate,
            })
        }
        let count = await Info.count();
        let result = {
            counts: count,
            infoDetail: infoDetail,
            status: 1,
            message: '从服务端获取所有数据成功'
        }
        return result;
    }catch (err){
        let result = {
            infoDetail: null,
            status: 1,
            message: '从服务端获取数据异常'
        }
        return result;
    }
}
module.exports.getInfoSearch = async (JSON) => {
    try{
        let searchResult = await Info.findAll({
            where: { title: { [Op.like] : `%${JSON.title}%`}}
        })
        if(! searchResult || searchResult.length === 0) throw("未匹配到结果")
        let result = []
        for(let i=0;i<searchResult.length; i++){
            result.push({
                id: searchResult[i].id,
                title: searchResult[i].title,
                content: searchResult[i].content,
                isUse: searchResult[i].isUse ? '可用': '禁用',
                releaseDate: searchResult[i].releaseDate,
            })
        }
        let res = {
            result: result,
            status: 1,
            message: '搜索公告成功！！'
        }
        return res;
    }catch(err){
        let res = {
            status: 0,
            message: `${err}`
        }
        return res;
    }
}

module.exports.addInfo = async (JSON) => {   
    try{
        if((!JSON.title) && (!JSON.content)) throw("公告标题或内容未定义")
        let newInfo = await Info.create({
            releaseDate: JSON.releaseDate,
            title: JSON.title,
            content: JSON.content,
            isUse: JSON.isUse
        })
        await newInfo.save()
        let res = {
            status: 1,
            message: '添加新公告成功'
        }
        return res;
    }catch (err){
        let res = {
            status: 0,
            message: `添加失败 由于 ${ err }`
        }
        return res;
    }
}

module.exports.deleteInfoById = async (JSON) => {
    try{
        let thisRule = await Info.findOne({ where: {id: JSON.id }});
        await thisRule.update({ isUse:false })
        await thisRule.save();
        let res = {
            status: 1,
            message: '成功禁用'
        }
        return res;
    }catch (err){
        let res = {
            status: 0,
            message: `服务端异常 原因：${ err }`
        }
        return res;
    }
}

module.exports.modifyInfoById = async (JSON) => {
    try{
        let thisInfo = await Info.findOne({
            where: {
                id: JSON.id
            }
        });
        await thisInfo.update({
            releaseDate: JSON.releaseDate,
            title: JSON.title,
            content: JSON.content,
            isUse: JSON.isUse
        })
        await thisInfo.save()
        let res = {
            status: 1,
            message: '修改成功'
        }
        return res;
    }catch(err){
        let res = {
            status: 0,
            message: `更新失败，由于 ${ err }`
        }
        return res;
    }
}
