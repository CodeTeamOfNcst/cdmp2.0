/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : cdmp

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2018-04-19 20:08:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for compute_applies
-- ----------------------------
DROP TABLE IF EXISTS `compute_applies`;
CREATE TABLE `compute_applies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `hours` int(11) NOT NULL,
  `account` int(11) NOT NULL,
  `password` int(11) NOT NULL,
  `isAgree` tinyint(1) NOT NULL DEFAULT '0',
  `isUse` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `apply_user` int(11) DEFAULT NULL,
  `check_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `apply_user` (`apply_user`),
  KEY `check_user` (`check_user`),
  CONSTRAINT `compute_applies_ibfk_1` FOREIGN KEY (`apply_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `compute_applies_ibfk_2` FOREIGN KEY (`check_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of compute_applies
-- ----------------------------
INSERT INTO `compute_applies` VALUES ('1', '2018-04-09 17:02:00', '2018-04-30 17:02:04', '500', '123456', '123456', '0', '1', '2018-04-09 17:02:46', '2018-04-16 17:02:46', '3', '2');
INSERT INTO `compute_applies` VALUES ('2', '2018-04-10 21:47:41', '2018-04-10 21:47:41', '15000', '555888', '123456', '1', '1', '2018-04-10 21:47:41', '2018-04-10 21:47:41', '5', '6');

-- ----------------------------
-- Table structure for devices
-- ----------------------------
DROP TABLE IF EXISTS `devices`;
CREATE TABLE `devices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `imgFilePath` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `purchaseDate` datetime DEFAULT NULL,
  `needRepair` tinyint(1) NOT NULL DEFAULT '0',
  `canReserve` tinyint(1) NOT NULL DEFAULT '1',
  `isUse` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `device_type` int(11) DEFAULT NULL,
  `device_manager` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `device_type` (`device_type`),
  KEY `device_manager` (`device_manager`),
  CONSTRAINT `devices_ibfk_1` FOREIGN KEY (`device_type`) REFERENCES `device_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `devices_ibfk_2` FOREIGN KEY (`device_manager`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of devices
-- ----------------------------
INSERT INTO `devices` VALUES ('1', '全自动智能倒置显微镜及金相分析系统', null, '核心区HK座分析测试中心204', 'DMI5000M是徕卡公司推出的最先进的大型研究级全自动倒置显微镜，光学设计上采用先进的HC无限远轴向、径向双重色差校正光学技术，彻底消除杂散光等干扰因素；在整个光学系统内，对涉及成像质量的所有组件进行最优化组合，实现图像分辨率和反差的最优化，得到锐利图像的同时追求最高分辨率。DMI5000M适用于钢铁、金属、化工材料行业科研、质检、质控。反射光可实现明场、暗场、偏光、微分干涉、荧光观察功能；透射光可实现明场、暗场、偏光、微分干涉观察功能。', '2012-12-27 00:00:00', '0', '1', '1', '2018-04-09 16:53:14', '2018-04-09 16:53:14', '1', '1');
INSERT INTO `devices` VALUES ('2', '原子吸收光谱仪 ', null, ' 核心区HK座分析测试中心 301 ', '无', '1970-01-01 08:00:02', '0', '1', '0', '2018-04-09 16:58:07', '2018-04-09 19:51:57', '2', '3');
INSERT INTO `devices` VALUES ('3', '红外吸收光谱仪', null, ' 核心区HK座分析测试中心 310 ', '无', '2018-04-17 21:08:02', '0', '1', '1', '2018-04-17 21:08:07', '2018-04-17 21:08:07', '2', '2');

-- ----------------------------
-- Table structure for device_applies
-- ----------------------------
DROP TABLE IF EXISTS `device_applies`;
CREATE TABLE `device_applies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `isAgree` tinyint(1) NOT NULL DEFAULT '0',
  `vioReason` varchar(255) DEFAULT NULL,
  `isUse` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `apply_device` int(11) DEFAULT NULL,
  `apply_user` int(11) DEFAULT NULL,
  `check_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `apply_device` (`apply_device`),
  KEY `apply_user` (`apply_user`),
  KEY `check_user` (`check_user`),
  CONSTRAINT `device_applies_ibfk_1` FOREIGN KEY (`apply_device`) REFERENCES `devices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `device_applies_ibfk_2` FOREIGN KEY (`apply_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `device_applies_ibfk_3` FOREIGN KEY (`check_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of device_applies
-- ----------------------------
INSERT INTO `device_applies` VALUES ('1', '2018-04-09 16:58:40', '2018-04-18 16:58:47', '0', '需要借用！', '1', '2018-04-09 16:59:04', '2018-04-16 16:59:04', '2', '3', '3');
INSERT INTO `device_applies` VALUES ('2', '2018-04-04 17:00:20', '2018-04-11 17:00:24', '0', '借来用', '1', '2018-04-09 17:00:36', '2018-04-09 17:00:36', '1', '8', '3');
INSERT INTO `device_applies` VALUES ('3', '2018-04-10 21:20:33', '2018-04-26 21:20:35', '0', '测试', '0', '2018-04-10 21:21:01', '2018-04-10 21:21:28', '2', '5', '3');

-- ----------------------------
-- Table structure for device_types
-- ----------------------------
DROP TABLE IF EXISTS `device_types`;
CREATE TABLE `device_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `isUse` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of device_types
-- ----------------------------
INSERT INTO `device_types` VALUES ('1', '分析测试中心', '1', '2018-04-09 16:53:54', '2018-04-09 16:53:54');
INSERT INTO `device_types` VALUES ('2', '化工学院', '1', '2018-04-09 16:54:11', '2018-04-09 16:54:11');

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `releaseDate` datetime DEFAULT NULL,
  `isRead` tinyint(1) DEFAULT '0',
  `isUse` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `message_type` int(11) DEFAULT NULL,
  `message_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `message_type` (`message_type`),
  KEY `message_user` (`message_user`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`message_type`) REFERENCES `message_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`message_user`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of messages
-- ----------------------------
INSERT INTO `messages` VALUES ('1', '您已成功预约云计算资源，请注意使用时间！', '2018-04-09 20:44:42', '0', '1', '2018-04-09 20:44:51', '2018-04-09 20:44:51', '2', '1');
INSERT INTO `messages` VALUES ('2', '您的设备使用权限即将到期，请在规定时间内归还！', '2018-04-09 20:45:43', '0', '1', '2018-04-09 20:45:45', '2018-04-09 20:45:45', '1', '2');
INSERT INTO `messages` VALUES ('3', '您预约的计算资源时间超出范围，请修改后重新预约！', '2018-04-09 20:46:37', '0', '1', '2018-04-09 20:46:39', '2018-04-09 20:46:39', '3', '8');
INSERT INTO `messages` VALUES ('4', '测试消息禁用', '2018-04-09 21:24:43', '1', '1', '2018-04-09 21:24:46', '2018-04-10 19:20:12', '2', '3');

-- ----------------------------
-- Table structure for message_types
-- ----------------------------
DROP TABLE IF EXISTS `message_types`;
CREATE TABLE `message_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstType` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `isUse` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `firstType` (`firstType`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of message_types
-- ----------------------------
INSERT INTO `message_types` VALUES ('1', '普通1', '预约即将到期！', '1', '2018-04-09 20:35:58', '2018-04-09 20:36:58');
INSERT INTO `message_types` VALUES ('2', '成功', '预约成功！', '1', '2018-04-09 20:36:24', '2018-04-09 20:36:24');
INSERT INTO `message_types` VALUES ('3', '失败', '预约失败！', '1', '2018-04-09 20:36:48', '2018-04-09 20:36:48');
INSERT INTO `message_types` VALUES ('4', '普通2', '推送通知', '1', '2018-04-16 14:43:24', '2018-04-16 14:43:24');

-- ----------------------------
-- Table structure for notice_announces
-- ----------------------------
DROP TABLE IF EXISTS `notice_announces`;
CREATE TABLE `notice_announces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `releaseDate` datetime DEFAULT NULL,
  `title` text NOT NULL,
  `content` text NOT NULL,
  `isUse` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice_announces
-- ----------------------------
INSERT INTO `notice_announces` VALUES ('1', '2018-04-09 17:01:27', '我校新添大型分析设备构成完备的微结构分析体系', '无无无', '1', '2018-04-09 17:01:42', '2018-04-09 17:01:42');
INSERT INTO `notice_announces` VALUES ('2', '2018-04-10 20:00:53', '电子探针JXA-8230工程师培训时间安排', '这是测试内容', '1', '2018-04-10 20:00:53', '2018-04-10 20:05:26');
INSERT INTO `notice_announces` VALUES ('3', '2018-04-17 21:26:38', '大型仪器使用流程培训', '无', '1', '2018-04-17 21:26:46', '2018-04-17 21:26:46');
INSERT INTO `notice_announces` VALUES ('4', '2018-04-17 21:26:58', '华北理工大学军训服务项目 竞争性磋商中标公告', '无', '1', '2018-04-17 21:27:18', '2018-04-17 21:27:18');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL DEFAULT '123456',
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `isUse` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`),
  KEY `user_type` (`user_type`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_type`) REFERENCES `user_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '201514620000', '123456', '郝一擎', '', '', '1', '2018-04-09 15:14:52', '2018-04-09 15:14:52', '1');
INSERT INTO `users` VALUES ('2', '201514620110', '123456', '张凌雪', '15230529628', '1050080567@qq.com', '1', '2018-04-09 15:12:53', '2018-04-09 15:12:53', '3');
INSERT INTO `users` VALUES ('3', '201514620125', '123456', '王洋洋', '', '', '1', '2018-04-09 15:13:52', '2018-04-09 15:13:52', '4');
INSERT INTO `users` VALUES ('4', '201622222222', '123456', '赵丽颖', '', '', '1', '2018-04-09 15:16:05', '2018-04-09 15:16:05', '2');
INSERT INTO `users` VALUES ('5', '201514620123', '123456', '盛明兰', '', '', '1', '2018-04-09 17:05:36', '2018-04-09 17:05:36', '3');
INSERT INTO `users` VALUES ('6', '201514620166', '123456', '林更新', '', '', '1', '2018-04-09 17:06:37', '2018-04-09 17:06:37', '5');
INSERT INTO `users` VALUES ('7', '201514620999', '123456', '魏大勋', '', '', '1', '2018-04-09 17:07:41', '2018-04-09 17:07:41', '6');
INSERT INTO `users` VALUES ('8', '201514620333', '123456', '白敬亭', '', '', '1', '2018-04-09 17:08:31', '2018-04-09 17:08:31', '4');

-- ----------------------------
-- Table structure for user_types
-- ----------------------------
DROP TABLE IF EXISTS `user_types`;
CREATE TABLE `user_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isUse` tinyint(1) NOT NULL DEFAULT '1',
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_types
-- ----------------------------
INSERT INTO `user_types` VALUES ('1', '1', '超级管理员', '2018-04-09 15:10:21', '2018-04-09 15:10:21');
INSERT INTO `user_types` VALUES ('2', '1', '普通用户', '2018-04-09 15:10:39', '2018-04-09 15:10:39');
INSERT INTO `user_types` VALUES ('3', '1', '实验设备管理员', '2018-04-09 15:11:02', '2018-04-09 15:11:02');
INSERT INTO `user_types` VALUES ('4', '1', '设备维护人员', '2018-04-09 15:11:30', '2018-04-09 15:11:30');
INSERT INTO `user_types` VALUES ('5', '1', '计算资源管理员', '2018-04-09 15:12:00', '2018-04-09 15:12:00');
INSERT INTO `user_types` VALUES ('6', '1', '计算资源维护人员', '2018-04-09 15:12:19', '2018-04-09 15:12:19');
