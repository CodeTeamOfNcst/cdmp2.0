/**
 * 用户类别表
 * @param { [object] } sequelize 
 * @param { [object] } DataTypes 
 * a foreign_key of { user }  每个用户含有一个用户分类的外键
 */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'user_type', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            isUse: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }, // 此条记录是否可用
            name: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            }, // 类别名称
            // （  1.超级管理员 superManager
            //     2.普通用户 commonUser
            //     3.实验设备管理员 deviceManager
            //     4.设备维护人员 deviceMainter
            //     5.计算资源管理员 computeManager
            //     6.计算资源维护人员 computeMainter）
            //默认添加 createAt 和 updateAt 两个字段 
        },{
            tabelName: 'user_type'
        }
    )
}