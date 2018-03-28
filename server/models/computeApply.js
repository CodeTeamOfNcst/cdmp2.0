const moment = require('moment');

/**
 * 计算资源预约申请表 
 * @param { [object] } sequelize 
 * @param { [object] } DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'computeApply', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            startDate: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                get() {
                    return moment(this.getDataValue('startDate')).format('YYYY-MM-DD');
                }
            }, //申请开始使用时间
            endDate: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: DataTypes.NOW,
                get() {
                    return moment(this.getDataValue('endDate')).format('YYYY-MM-DD');
                }
            }, //申请结束使用时间
            hours: {
                type: DataTypes.INTEGER,
                allowNull: false
            },//申请机时
            account: {
                type: DataTypes.INTEGER,
                allowNull: false
            },//分配账号
            password: {
                type: DataTypes.INTEGER,
                allowNull: false
            },//分配密码
            isAgree: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }, //是否批准(默认不同意)
            isUse: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            } // 此条记录是否可用
            //默认添加 createAt 和 updateAt 两个字段 
        }
    )
};