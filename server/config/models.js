const path = require('path')
const sequelize = require('./database.js')

const ComputeApply = sequelize.import('../models/computeApply')
const Device = sequelize.import('../models/device')
const DeviceApply = sequelize.import('../models/deviceApply')
const DeviceType = sequelize.import('../models/deviceType')
const Message = sequelize.import('../models/message')
const MessageType = sequelize.import('../models/messageType')
const Info = sequelize.import('../models/info')
const User = sequelize.import('../models/user')
const UserType = sequelize.import('../models/userType')
    
       
Message.belongsTo(MessageType, {
    as: "MessageType",
    foreignKey: 'message_type',
    foreignKeyContraints: false
})
MessageType.hasMany(Message, {
    as: "Message",
    foreignKey: 'message_type',
    foreignKeyContraints: false
})
Message.belongsTo(User, {
    as: "MessageUser",
    foreignKey: 'message_user',
    foreignKeyContraints: false
})
User.hasOne(Message, {
    as: "UserMessage",
    foreignKey: 'message_user',
    foreignKeyContraints: false
})
User.belongsTo(UserType, {
    as: "UserType",
    foreignKey: "user_type",
    foreignKeyContraints: false
})
UserType.hasMany(User, {
    as: "User",
    foreignKey: "user_type",
    foreignKeyContraints: false
})
Device.belongsTo(DeviceType, {
    as: "DeviceType",
    foreignKey: "device_type",
    foreignKeyContraints: false
})
DeviceType.hasMany(Device, {
    as: "Device",
    foreignKey: "device_type",
    foreignKeyContraints: false,
})
DeviceApply.belongsTo(Device, {
    as: "ApplyDevice",
    foreignKey: "apply_device",
    foreignKeyContraints: false
})
Device.hasOne(DeviceApply, {  
    as: "DeviceApply",
    foreignKey: "apply_device",
    foreignKeyContraints: false
})

// <--新增-->
Device.belongsTo(User,{
    as: "DeviceUser",
    foreignKey: "device_manager",
    foreignKeyContraints: false
})  //设备联系人
User.hasMany(Device,{
    as: "UserDevice",
    foreignKey: "device_manager",
    foreignKeyContraints: false
})
//一个预约用户，一个审批人员check_user
DeviceApply.belongsTo(User, {
    as: "DeviceApplyer",
    foreignKey: "apply_user",
    foreignKeyContraints: false
})
User.hasMany(DeviceApply, {
    as: "DeviceApply",
    foreignKey: "apply_user",
    foreignKeyContraints: false
})
DeviceApply.belongsTo(User,{
    as: "DeviceApplyChecker",
    foreignKey: "check_user",
    foreignKeyContraints: false
})
User.hasMany(DeviceApply, {
    as: "CheckDeviceApply",
    foreignKey: "check_user",
    foreignKeyContraints: false
})
ComputeApply.belongsTo(User,{
    as: "ComputeApplyer",
    foreignKey: "apply_user",
    foreignKeyContraints: false
})
User.hasOne(ComputeApply,{
    as: "UserComputeApply",
    foreignKey: "apply_user",
    foreignKeyContraints: false
})
ComputeApply.belongsTo(User,{
    as: "ComputeApplyChecker",
    foreignKey: "check_user",
    foreignKeyContraints: false
})
User.hasMany(ComputeApply,{
    as: "CheckComputeApply",
    foreignKey: "check_user",
    foreignKeyContraints: false
})

// <---->
module.exports = {
    ComputeApply,
    DeviceApply,
    Device,
    DeviceType,
    Message,
    MessageType,
    Info,
    User,
    UserType,

    sequelize
}