'use strict' 
const { Message } = require('../config/models')
const { MessageType } = require('../config/models')
const { User } = require('../config/models')
const { UserType } = require('../config/models')

const { Op } = require('sequelize')
/**
 * 
 * @param { JSON } options 相当于查询的条件
 * @param { Number } limit 限制数据的条数，默认为 comfig 中的条数
 */
const ItemPerPage = 10;
module.exports.getMessageDataById = async (JSON) => {
    try {
        let thisMessage = await Message.findOne({
            where: {
                id: JSON.id
            }
        });
        let thisMessageTpe = await thisMessage.getMessageType();
        let thisMessageUser = await thisMessage.getMessageUser();
        let result = {
            thisMessage: thisMessage,
            user: thisMessageUser.name,
            type: thisMessageTpe.id,
            status: 1,
            message: '查询成功'
        }
        return result;
    } catch (err) {
        let result = {
            status: 1,
            message: `查询失败 由于 ${err}`
        }
        return result;
    }
}

module.exports.getAllMessageData = async () => {
    try{
        let messages = await Message.findAll({
            // offset: (parseInt(ctx.params.page || 1) - 1) * ItemPerPage,
            limit: ItemPerPage
        });
        let messageTypes = await MessageType.findAll()
        let Messages = [];
        let MessageTypes = [];
                // 格式化返回的数据
        for (let index in messages) {
            let messageType = await messages[index].getMessageType();
            let messageUser = await messages[index].getMessageUser();
            
            Messages.push({
                id: messages[index].id,
                content:messages[index].content,
                releaseDate:messages[index].releaseDate,
                isRead:messages[index].isRead,
                isUse:messages[index].isUse,
                message_type:messageType.firstType,
                title:messageType.title,
                name:messageUser.name,
            });
        }
        let count = await Message.count()
        for(let i in messageTypes) {
            MessageTypes.push({
                id:messageTypes[i].id,
                label:messageTypes[i].firstType+'-'+messageTypes[i].title
            })
        }
        let result = {
            counts: count,
            MessageTypes: MessageTypes,
            Messages: Messages,
            status: 1,
            message: '成功获取全部消息'
        }
        return result;
    }catch(err){
        let result = {
            status: 0,
            message: `获取消息失败，由于 ${err}`
        }
        return result;
    }
}
module.exports.getMessageSearch = async (JSON) => {
    try{
        let searchResult = await Message.findAll({
            where: {message_user:{ [Op.like] : `%${JSON.message_user}%`}}
        })
        if(! searchResult || searchResult.length === 0) throw("未匹配到结果")
        let result = []
        for(let i=0;i<searchResult.length; i++){
            result.push({
                message: searchResult[i].content,
                isUse:searchResult[i].isUse,
                id:searchResult[i].id,
                releaseDate:searchResult[i].releaseDate,
                messageTypeName: (await searchResult[i].getMessageType()).title,
                messageUserName: (await searchResult[i].getMessageUser()).name
            })
        }
        let res = {
            Message:result,
            status: 1,
            message: '匹配消息成功'
        }
        return res;
    }catch(err){
        let res = {
            status: 0,
            message: `搜索消息失败，由于 ${err}`
        }
        return res;
    }
}

module.exports.addMessage = async (JSON) => {   
    try {
        if(!JSON.message_user) 
            throw("未选择用户")
        for (let index in JSON.message_user) {
            let newMessage = await Message.create({
                releaseDate: JSON.releaseDate,
                isUse: JSON.isUse,
                isRead: JSON.isRead,
                content: JSON.content
            });
            let messageType = await MessageType.findOne({
                where: {
                    id: JSON.message_type
                }
            });
            let messageUser = await User.findOne({
                where: {
                    id: JSON.message_user[index]
                }
            });
            await newMessage.setMessageType(messageType);
            await newMessage.setMessageUser(messageUser);
            await newMessage.save();
        }
        let result = {
            status: 1,
            message: '消息创建成功'
        }
        return result;
    } catch (err) {
        let result = {
            status: 0,
            message: `创建失败，由于 ${err}`
        }
        return result;
    }
}

module.exports.deleteMessageById = async (JSON) => {
    try {
        let thisMessage = await Message.findOne({
            where: {
                id: JSON.id
            }
        })
        await thisMessage.update({
            isUse: false
        })
        await thisMessage.save()
        let result = {
            status: 1,
            message: '禁用成功'
        }
        return result;
    } catch (err) {
        let result = {
            status: 0,
            message: `禁用失败 由于 ${err}`
        }
        return result;
    }
}

module.exports.modifyMessageById = async (JSON) => {
    try {
        let thisMessage = await Message.findOne({
            where: {
                id: JSON.id
            }
        });
        let thisMessageType = await MessageType.findOne({
            where: {
                id: JSON.message_type
            }
        });
        await thisMessage.update({
            releaseDate: JSON.releaseDate,
            content: JSON.content,
            isRead: JSON.isRead,
            isUse: JSON.isUse
        });
        await thisMessage.setMessageType(thisMessageType);
        await thisMessage.save()
        let result = {
            status: 1,
            message: '更新成功'
        }
        return result;
    } catch (err) {
        let result = {
            status: 0,
            message: `更新失败， 由于${err}`
        }
        return result;
    }
}

module.exports.modifyMessageByIdFront = async (JSON) => {
    try {
        let thisMessage = await Message.findOne({
            where: {
                id: JSON.id
            }
        });
        let thisMessageType = await MessageType.findOne({
            where: {
                id: thisMessage.message_type
            }
        });
        await thisMessage.update({
            releaseDate: thisMessage.releaseDate,
            content: thisMessage.content,
            isRead: thisMessage.isRead,
            isUse: false
        });
        console.log(thisMessage.isUse)
        await thisMessage.setMessageType(thisMessageType);
        await thisMessage.save()
        let result = {
            status: 1,
            message: '更新成功'
        }
        return result;
    } catch (err) {
        let result = {
            status: 0,
            message: `更新失败， 由于${err}`
        }
        return result;
    }
}
