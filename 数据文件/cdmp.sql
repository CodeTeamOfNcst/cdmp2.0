/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50710
Source Host           : localhost:3306
Source Database       : cdmp

Target Server Type    : MYSQL
Target Server Version : 50710
File Encoding         : 65001

Date: 2018-04-23 19:52:32
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of compute_applies
-- ----------------------------
INSERT INTO `compute_applies` VALUES ('1', '2018-04-09 17:02:00', '2018-04-30 17:02:04', '500', '123456', '123456', '1', '0', '2018-04-09 17:02:46', '2018-04-23 18:39:02', '2', '2');
INSERT INTO `compute_applies` VALUES ('2', '2018-04-22 21:48:12', '2018-04-27 21:48:12', '500', '123456', '123456', '0', '1', '2018-04-22 21:48:34', '2018-04-23 18:10:45', '5', '4');
INSERT INTO `compute_applies` VALUES ('3', '2018-04-25 08:00:00', '2018-05-31 08:00:00', '52', '687432', '123456', '0', '0', '2018-04-23 15:12:02', '2018-04-23 18:42:43', '2', '5');
INSERT INTO `compute_applies` VALUES ('4', '2018-04-25 08:00:00', '2018-05-30 08:00:00', '50', '687432', '123456', '0', '0', '2018-04-23 15:12:18', '2018-04-23 17:53:18', '3', '5');

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of devices
-- ----------------------------
INSERT INTO `devices` VALUES ('1', '全自动智能倒置显微镜及金相分析系统', '/uploads/deviceImages/c872f7b0-452e-11e8-85d2-c7f812e3cc03.jpg', '核心区HK座分析测试中心204', 'DMI5000M是徕卡公司推出的最先进的大型研究级全自动倒置显微镜，光学设计上采用先进的HC无限远轴向、径向双重色差校正光学技术，彻底消除杂散光等干扰因素；在整个光学系统内，对涉及成像质量的所有组件进行最优化组合，实现图像分辨率和反差的最优化，得到锐利图像的同时追求最高分辨率。DMI5000M适用于钢铁、金属、化工材料行业科研、质检、质控。反射光可实现明场、暗场、偏光、微分干涉、荧光观察功能；透射光可实现明场、暗场、偏光、微分干涉观察功能。', '2012-12-27 00:00:00', '0', '0', '0', '2018-04-09 16:53:14', '2018-04-21 21:19:26', '1', '1');
INSERT INTO `devices` VALUES ('2', '原子吸收光谱仪 ', '/uploads/deviceImages/4822ea20-452e-11e8-85d2-c7f812e3cc03.jpg', '核心区HK座分析测试中心 301 ', '1.火焰和石墨炉原子化器的切换不需要光轴校准和能量匹配，也无需机械移动；2.全波长（190~900nm）塞曼背景校正使原子化效率的利用率 100%-可直接进行原样分析3.空心阴极灯不用预热，开机就可测样。4.实现全程实时双光束监控系统，使复杂的分析变得简单和一目了然 ', '1970-01-01 08:00:02', '0', '1', '0', '2018-04-09 16:58:07', '2018-04-21 16:40:51', '2', '2');
INSERT INTO `devices` VALUES ('3', '红外吸收光谱仪', '/uploads/deviceImages/4cb54380-452e-11e8-85d2-c7f812e3cc03.jpg', '核心区HK座分析测试中心 310 ', '无', '2018-04-17 21:08:02', '0', '1', '1', '2018-04-17 21:08:07', '2018-04-21 21:01:20', '2', '3');
INSERT INTO `devices` VALUES ('4', '激光拉曼光谱仪', '/uploads/deviceImages/509e6490-452e-11e8-85d2-c7f812e3cc03.jpg', '核心区HK座分析测试中心309', '无', '2018-04-18 21:12:55', '1', '0', '1', '2018-04-20 21:13:03', '2018-04-21 21:01:28', '1', '2');
INSERT INTO `devices` VALUES ('5', '电子探针显微分析仪', '/uploads/deviceImages/546557a0-452e-11e8-85d2-c7f812e3cc03.jpg', '核心区HK座分析测试中心108', '无', '2018-04-20 21:14:05', '0', '1', '0', '2018-04-20 21:14:09', '2018-04-21 14:36:32', '2', '3');
INSERT INTO `devices` VALUES ('6', '压样机', '/uploads/deviceImages/58346100-452e-11e8-85d2-c7f812e3cc03.jpg', '核心教学区HE座101', null, '2018-04-21 12:32:35', '0', '1', '1', '2018-04-21 12:32:35', '2018-04-21 14:36:38', '1', '4');
INSERT INTO `devices` VALUES ('7', '全自动熔样机', '/uploads/deviceImages/5c1ee1a0-452e-11e8-85d2-c7f812e3cc03.jpg', '核心教学区HK201', null, '2018-04-21 12:38:32', '0', '1', '1', '2018-04-21 12:38:32', '2018-04-21 14:36:45', '2', '2');
INSERT INTO `devices` VALUES ('8', '激光粒度仪', '/uploads/deviceImages/b80ed020-4532-11e8-b382-c5a37ecb69e5.jpg', '核心教学区HK322', null, '2018-04-21 13:42:28', '0', '1', '1', '2018-04-21 13:42:28', '2018-04-21 15:07:57', '2', '4');
INSERT INTO `devices` VALUES ('9', '洛氏硬度计', '/uploads/deviceImages/5575a770-4534-11e8-baa6-ef370d46071f.jpg', '核心教学区HE212', null, '2018-04-21 15:19:30', '0', '1', '1', '2018-04-21 15:19:30', '2018-04-21 15:19:30', '1', '5');

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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of device_applies
-- ----------------------------
INSERT INTO `device_applies` VALUES ('1', '2018-04-25 08:00:00', '2018-05-31 08:00:00', '1', '教学使用', '1', '2018-04-23 15:05:27', '2018-04-23 15:09:14', '3', '2', '3');
INSERT INTO `device_applies` VALUES ('2', '2018-04-24 08:00:00', '2018-05-31 08:00:00', '1', '研究使用', '1', '2018-04-23 15:05:58', '2018-04-23 15:09:18', '5', '3', '2');
INSERT INTO `device_applies` VALUES ('3', '2018-04-24 08:00:00', '2018-06-08 08:00:00', '0', '大型实验研究使用', '0', '2018-04-23 15:06:44', '2018-04-23 15:09:23', '6', '4', '2');
INSERT INTO `device_applies` VALUES ('4', '2018-04-09 00:00:00', '2018-05-29 00:00:00', '0', '无', '0', '2018-04-23 15:07:09', '2018-04-23 15:07:09', '2', '5', '3');
INSERT INTO `device_applies` VALUES ('5', '2018-04-25 00:00:00', '2018-05-31 00:00:00', '0', '课后研究课题使用', '0', '2018-04-23 15:07:47', '2018-04-23 15:07:48', '4', '2', '1');
INSERT INTO `device_applies` VALUES ('6', '2018-04-25 08:00:00', '2018-05-31 08:00:00', '0', '实验', '0', '2018-04-23 15:09:05', '2018-04-23 15:09:32', '5', '3', '1');
INSERT INTO `device_applies` VALUES ('7', '2018-04-25 08:00:00', '2018-05-31 08:00:00', '1', '无', '1', '2018-04-23 15:10:32', '2018-04-23 15:10:36', '8', '5', '2');

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
INSERT INTO `messages` VALUES ('3', '您预约的计算资源时间超出范围，请修改后重新预约！', '2018-04-09 20:46:37', '0', '1', '2018-04-09 20:46:39', '2018-04-09 20:46:39', '3', '4');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice_announces
-- ----------------------------
INSERT INTO `notice_announces` VALUES ('1', '2018-04-09 17:01:27', '我校新添大型分析设备构成完备的微结构分析体系', ' 近日，我校新添大型分析设备——场发射透射电子显微镜（TEM，JEM 2800F）、电子探针（EPMA，JXA 8230）、场发射电子束/聚焦离子束双束系统（FIB，Scios）、三维计算机断层扫描设备（工业CT，X5000），已安装调试完成，同时现代技术教育中心展开了不同形式的业务学习，和其它现有设备一起构成了完备的微结构分析体系。\r\n\r\n这些设备可提供一系列显微结构分析：表面显微形貌-组织-结构原位观察分析；微区成分-晶体结构-晶体取向关系分析；全自动夹杂物分布分析，材料缺陷，损伤、失效分析、材料内部晶体结构-晶体缺陷分析，二相粒子分析、晶体结构高分辨分析。在三维结构分析方面能够对材料宏观组织-成分的进行三维重构、材料微纳米加工刻蚀、显微三维结构-成分分布分析等。\r\n\r\n目前学校搬迁提升过程中购置的重要分析设备已投入正常运行，能够为矿业、冶金、材料、机械、电子信息、医疗、生物等领域的教学和科研工作提供丰富的微结构分析体系数据。学校拥有先进大型仪器设备，始终坚持 “笃学 敬业 求实 创新”的方针，不断丰富测试手段，管理科学，资源共享，服务教学科研，热忱为学校和社会各界提供一流的服务。 ', '1', '2018-04-09 17:01:42', '2018-04-21 20:23:54');
INSERT INTO `notice_announces` VALUES ('2', '2018-04-10 20:00:53', '电子探针JXA-8230工程师培训时间安排', ' 2017年11月21日\r\n\r\n上午 基本原理：二次电子，反射电子，X 射线（包括空间分辨率）\r\n\r\n产品概要：基本构成，分光器的结构\r\n\r\n基礎操作实习\r\n\r\n试样更换、图像观察（SEI,BEI）、X 射线检测、分光器的结构和 X 射线强度等\r\n\r\n下午 全元素定性分析实习\r\n\r\n分析条件的设定（分光器条件的设定，电子光学条件的设定等）\r\n\r\n定性分析的应用实习', '1', '2018-04-10 20:00:53', '2018-04-21 20:24:01');
INSERT INTO `notice_announces` VALUES ('3', '2018-04-17 21:26:38', '大型仪器使用流程培训', '无', '0', '2018-04-17 21:26:46', '2018-04-21 20:23:12');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '2014', '123456', 'admin', '', '', '1', '2018-04-09 15:14:52', '2018-04-21 18:58:35', '1');
INSERT INTO `users` VALUES ('2', '2015', '123456', 'user1', '15230529628', '1050080567@qq.com', '1', '2018-04-09 15:12:53', '2018-04-09 15:12:53', '3');
INSERT INTO `users` VALUES ('3', '2016', '123456', 'user2', '', '', '1', '2018-04-09 15:13:52', '2018-04-22 20:54:48', '5');
INSERT INTO `users` VALUES ('4', '2017', '123456', 'user3', '', '', '1', '2018-04-09 15:16:05', '2018-04-22 21:20:42', '2');
INSERT INTO `users` VALUES ('5', '2018', '123456', 'user4', '', '', '1', '2018-04-09 17:05:36', '2018-04-22 21:22:38', '4');

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
