/*
Navicat MySQL Data Transfer

Source Server         : 120.78.211.2
Source Server Version : 50719
Source Host           : 120.78.211.2:3306
Source Database       : chunyu-cms

Target Server Type    : MYSQL
Target Server Version : 50719
File Encoding         : 65001

Date: 2023-03-15 10:22:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for actor
-- ----------------------------
DROP TABLE IF EXISTS `actor`;
CREATE TABLE `actor` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '封面',
  `name` varchar(255) NOT NULL COMMENT '中文名',
  `name_en` varchar(255) NOT NULL DEFAULT '' COMMENT '英文名',
  `name_more` varchar(255) NOT NULL DEFAULT '' COMMENT '中文别名',
  `name_en_more` varchar(255) NOT NULL DEFAULT '' COMMENT '英文别名',
  `birthday` date DEFAULT NULL COMMENT '出生日期',
  `death_day` date DEFAULT NULL COMMENT '逝世日期',
  `born_place` varchar(255) NOT NULL DEFAULT '' COMMENT '出生地址',
  `brief` varchar(255) NOT NULL DEFAULT '' COMMENT '简介',
  `gender` varchar(255) NOT NULL DEFAULT '3' COMMENT '性别',
  `country_id` int(11) DEFAULT NULL COMMENT '国家id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of actor
-- ----------------------------
INSERT INTO `actor` VALUES ('2023-02-27 17:42:00.755654', '2023-03-08 11:38:54.000000', 'admin', 'admin', '', '6', '5', '', '赵丙乐', '', '', '', null, null, '', '', '1', '1');
INSERT INTO `actor` VALUES ('2023-03-03 08:08:45.680535', '2023-03-08 11:38:47.000000', 'admin', 'admin', '', '4', '6', 'http://127.0.0.1:4000/upload/2023-03-03/1677830924421-291135097-1.jpg', '宫崎骏', 'Hayao Miyazaki', '', '', '1941-01-05', null, '日本,东京', '', '1', '9');
INSERT INTO `actor` VALUES ('2023-03-03 08:10:13.273884', '2023-03-08 11:38:41.000000', 'admin', 'admin', '', '3', '7', 'http://127.0.0.1:4000/upload/2023-03-03/1677831012513-257196164-1.jpg', '柊瑠美', 'Rumi Hiiragi', '', '', '1987-08-01', null, '日本,东京都', '', '2', '9');
INSERT INTO `actor` VALUES ('2023-03-03 08:10:52.753169', '2023-03-08 11:38:34.000000', 'admin', 'admin', '', '2', '8', 'http://127.0.0.1:4000/upload/2023-03-03/1677831051927-46401501-1.jpg', '入野自由', '', '', '', '1988-02-19', null, '', '', '1', '9');
INSERT INTO `actor` VALUES ('2023-03-08 09:09:32.313483', '2023-03-08 09:09:32.313483', 'admin', 'admin', '', '1', '9', 'http://127.0.0.1:4000/upload/2023-03-08/1678266571377-214514195-1.jpg', '小罗伯特·唐尼', 'Robert Downey Jr.', '', '', '1965-04-04', null, '美国,纽约', '', '1', '2');
INSERT INTO `actor` VALUES ('2023-03-08 14:37:40.569858', '2023-03-08 14:37:40.569858', 'admin', 'admin', '', '1', '10', 'http://127.0.0.1:4000/upload/2023-03-08/1678286232139-475516702-Fs1cC1jVfteh6HxJW4aaYU9s9k6w@public.jpeg', '郑伟文', 'Wai-Man Cheng', '', '', '1966-05-30', null, '中国香港', '', '1', '12');
INSERT INTO `actor` VALUES ('2023-03-08 14:38:53.672955', '2023-03-08 14:38:53.672955', 'admin', 'admin', '', '1', '11', 'http://127.0.0.1:4000/upload/2023-03-08/1678286298370-178923794-FmfrSbGOqE1b5pJ3dmlFd2rpOriE@public.jpeg', '王一博', 'Yibo Wang', '白牡丹,小王子', '', '1997-08-05', null, '中国,河南,洛阳', '', '1', '1');
INSERT INTO `actor` VALUES ('2023-03-14 14:15:13.859830', '2023-03-14 14:15:13.859830', 'admin', 'admin', '', '1', '12', 'http://127.0.0.1:4000/upload/2023-03-14/1678803287420-664199994-FqCKjMZuoQBuRS3_p8vM1Fzh7Vtu@public.jpeg', '吴京', 'Jing Wu', '', '', '1974-04-03', null, '中国北京', '', '1', '1');
INSERT INTO `actor` VALUES ('2023-03-14 14:19:30.679113', '2023-03-14 14:19:30.679113', 'admin', 'admin', '', '1', '13', 'http://127.0.0.1:4000/upload/2023-03-14/1678803531931-684976388-FjQSlyYaQvT3iKp59Fnf8aTz6UHV@public.jpeg', '林秀香', 'Su-hyang Im', '', '', '1990-04-19', null, '韩国,首尔', '', '2', '8');
INSERT INTO `actor` VALUES ('2023-03-14 14:25:30.462124', '2023-03-14 14:25:30.462124', 'admin', 'admin', '', '1', '14', 'http://127.0.0.1:4000/upload/2023-03-14/1678803904277-667368779-FggBytLN7AEbjdhMCBxVrMcn8bxC@public.jpeg', '汪涵', 'Han Wang', '', '', '1974-04-07', null, '中国,江苏,苏州', '', '1', '1');

-- ----------------------------
-- Table structure for basic_banner
-- ----------------------------
DROP TABLE IF EXISTS `basic_banner`;
CREATE TABLE `basic_banner` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL COMMENT '标题',
  `url` varchar(255) DEFAULT NULL COMMENT '链接',
  `img` varchar(255) NOT NULL COMMENT '图片',
  `urlType` varchar(255) NOT NULL DEFAULT '0' COMMENT '链接类型 0: 站内 1: 站外',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of basic_banner
-- ----------------------------
INSERT INTO `basic_banner` VALUES ('2023-02-23 16:30:37.413332', '2023-02-23 16:57:04.000000', '', '', '', '5', '2', '金刚大战哥斯拉', '/movies/4', 'http://127.0.0.1:4000/upload/2023-02-23/1677141312582-728635903-40d002b1f4e9a86ab649ec07c89ea8cc.jpg', '0');
INSERT INTO `basic_banner` VALUES ('2023-02-23 16:35:52.816924', '2023-02-23 16:36:31.000000', '', '', '', '2', '3', '热带往事', null, 'http://127.0.0.1:4000/upload/2023-02-23/1677141334196-4943163-b1376b0c7ea851179f8601277c425e83.jpg', '0');
INSERT INTO `basic_banner` VALUES ('2023-02-23 16:36:07.996151', '2023-02-23 16:36:07.996151', '', '', '', '1', '4', '济公', null, 'http://127.0.0.1:4000/upload/2023-02-23/1677141358727-77838499-f161a4b8bc68b76a72c94014aee20bbe.jpg', '0');

-- ----------------------------
-- Table structure for basic_country
-- ----------------------------
DROP TABLE IF EXISTS `basic_country`;
CREATE TABLE `basic_country` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '中文简称',
  `code` varchar(255) NOT NULL DEFAULT '' COMMENT '编码',
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '类型 0:国家 1：地区',
  `fullname` varchar(255) NOT NULL DEFAULT '' COMMENT '中文全称',
  `continent` varchar(255) NOT NULL DEFAULT '' COMMENT '所属大洲',
  `nameEn` varchar(255) NOT NULL DEFAULT '' COMMENT '英文简称',
  `fullnameEn` varchar(255) NOT NULL DEFAULT '' COMMENT '英文全称',
  `originalName` varchar(255) NOT NULL DEFAULT '' COMMENT '原名简称',
  `originalFullname` varchar(255) NOT NULL DEFAULT '' COMMENT '原名全称',
  `beginDate` varchar(255) DEFAULT NULL COMMENT '成立日期',
  `endDate` varchar(255) DEFAULT NULL COMMENT '消失日期',
  `flag` varchar(255) DEFAULT NULL COMMENT '国旗/区旗',
  `brief` varchar(500) NOT NULL DEFAULT '' COMMENT '简介',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of basic_country
-- ----------------------------
INSERT INTO `basic_country` VALUES ('2022-12-11 10:32:04.180000', '2023-02-20 11:48:26.000000', 'admin', 'admin', '', '3', '1', '中国大陆', '', '0', '中华人民共和国', '亚洲', 'china', 'the People\'s Republic of China', '', '', null, null, 'http://127.0.0.1:4000/upload/2023-02-20/1676864904775-699548268-FmWw1Jcg9UwlHyj-5J-cyllOx6VR@flag.jpg', '');
INSERT INTO `basic_country` VALUES ('2022-12-12 16:38:45.343603', '2023-02-20 11:48:52.000000', 'admin', 'admin', '', '22', '2', '美国', 'USA', '0', '美利坚合众国', '北美洲', '', 'The United States of America', '', '', null, null, 'http://127.0.0.1:4000/upload/2023-02-20/1676864930968-844225518-FkODsuVJByPGjw1zRBpDMZ0GS-a4@flag.jpg', '');
INSERT INTO `basic_country` VALUES ('2022-12-14 10:30:19.956004', '2023-03-01 14:45:29.000000', 'admin', 'admin', '', '2', '5', '英国', 'GBR', '0', '大不列颠及北爱尔兰联合王国', '欧洲', '', 'United Kingdom of Great Britain and Northern Ireland', '', '', null, null, 'http://127.0.0.1:4000/default.jpg', '');
INSERT INTO `basic_country` VALUES ('2023-02-20 18:28:41.258001', '2023-03-01 14:47:11.000000', 'admin', 'admin', '', '2', '8', '韩国', '', '0', '大韩民国', '亚洲', '', 'Republic of Korea', '대한민국', '', null, null, 'http://127.0.0.1:4000/default.jpg', '');
INSERT INTO `basic_country` VALUES ('2023-02-20 18:29:01.873020', '2023-03-01 14:47:56.000000', 'admin', 'admin', '', '2', '9', '日本', '', '0', '日本国', '亚洲', 'Japan', 'Japan', 'にほんこく', '', null, null, 'http://127.0.0.1:4000/default.jpg', '');
INSERT INTO `basic_country` VALUES ('2023-02-20 18:29:10.489587', '2023-02-20 18:29:10.489587', 'admin', 'admin', '', '1', '10', '法国', '', '0', '', '欧洲', '', '', '', '', null, null, 'http://127.0.0.1:4000/default.jpg', '');
INSERT INTO `basic_country` VALUES ('2023-02-20 18:29:28.359921', '2023-02-20 18:29:28.359921', 'admin', 'admin', '', '1', '11', '德国', '', '0', '', '欧洲', '', '', '', '', null, null, 'http://127.0.0.1:4000/default.jpg', '');
INSERT INTO `basic_country` VALUES ('2023-03-01 14:45:19.960733', '2023-03-01 14:45:19.960733', 'admin', 'admin', '', '1', '12', '中国香港', '', '1', '中华人民共和国香港特别行政区', '亚洲', '', 'Hong Kong', '', '', null, null, 'http://127.0.0.1:4000/default.jpg', '');
INSERT INTO `basic_country` VALUES ('2023-03-01 14:46:18.209960', '2023-03-01 14:46:18.209960', 'admin', 'admin', '', '1', '13', '中国台湾', '', '1', '台湾省', '亚洲', '', 'Taiwan', '', '', null, null, 'http://127.0.0.1:4000/default.jpg', '');

-- ----------------------------
-- Table structure for basic_genre
-- ----------------------------
DROP TABLE IF EXISTS `basic_genre`;
CREATE TABLE `basic_genre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '中文名称',
  `name_en` varchar(50) DEFAULT NULL COMMENT '英文名称',
  `status` int(11) NOT NULL DEFAULT '0',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `column_value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COMMENT='基础数据-类型管理表';

-- ----------------------------
-- Records of basic_genre
-- ----------------------------
INSERT INTO `basic_genre` VALUES ('3', '喜剧片', null, '0', '2022-12-14 17:13:15.053790', '2023-03-10 05:35:38.000000', 'admin', 'admin', '', '9', 'movie');
INSERT INTO `basic_genre` VALUES ('6', '动作片', null, '0', '2023-02-15 19:16:48.001348', '2023-03-10 05:36:18.000000', 'admin', 'admin', '', '4', 'movie');
INSERT INTO `basic_genre` VALUES ('7', '爱情片', null, '0', '2023-02-20 17:57:07.112389', '2023-03-10 05:36:23.000000', 'admin', 'admin', '', '2', 'movie');
INSERT INTO `basic_genre` VALUES ('8', '科幻片', null, '0', '2023-02-20 17:57:25.269004', '2023-03-10 05:36:26.000000', 'admin', 'admin', '', '2', 'movie');
INSERT INTO `basic_genre` VALUES ('9', '恐怖片', null, '0', '2023-02-20 17:57:32.303947', '2023-03-10 05:36:29.000000', 'admin', 'admin', '', '2', 'movie');
INSERT INTO `basic_genre` VALUES ('10', '剧情片', null, '0', '2023-02-20 17:57:46.765316', '2023-03-10 05:36:33.000000', 'admin', 'admin', '', '2', 'movie');
INSERT INTO `basic_genre` VALUES ('11', '犯罪片', null, '0', '2023-02-20 17:57:58.076483', '2023-03-10 05:36:37.000000', 'admin', 'admin', '', '2', 'movie');
INSERT INTO `basic_genre` VALUES ('12', '战争片', null, '0', '2023-02-20 17:58:10.924118', '2023-03-10 05:36:45.000000', 'admin', 'admin', '', '2', 'movie');
INSERT INTO `basic_genre` VALUES ('13', '伦理片', null, '0', '2023-02-20 17:58:18.709121', '2023-03-10 05:36:41.000000', 'admin', 'admin', '', '2', 'movie');
INSERT INTO `basic_genre` VALUES ('14', '国产剧', null, '0', '2023-02-20 18:00:51.477384', '2023-03-10 06:03:19.000000', 'admin', 'admin', '', '2', 'tv');
INSERT INTO `basic_genre` VALUES ('15', '港剧', null, '0', '2023-02-20 18:01:01.166333', '2023-03-10 06:03:23.000000', 'admin', 'admin', '', '2', 'tv');
INSERT INTO `basic_genre` VALUES ('16', '台湾剧', null, '0', '2023-02-20 18:01:15.582579', '2023-03-10 06:03:27.000000', 'admin', 'admin', '', '2', 'tv');
INSERT INTO `basic_genre` VALUES ('17', '韩剧', null, '0', '2023-02-20 18:22:53.640722', '2023-03-10 06:03:30.000000', 'admin', 'admin', '', '2', 'tv');
INSERT INTO `basic_genre` VALUES ('18', '日剧', null, '0', '2023-02-20 18:23:02.384524', '2023-03-10 06:03:33.000000', 'admin', 'admin', '', '2', 'tv');
INSERT INTO `basic_genre` VALUES ('19', '泰剧', null, '0', '2023-02-20 18:23:12.007107', '2023-03-10 06:03:37.000000', 'admin', 'admin', '', '2', 'tv');
INSERT INTO `basic_genre` VALUES ('20', '欧美剧', null, '0', '2023-02-20 18:23:24.640935', '2023-03-10 07:19:05.000000', 'admin', 'admin', '', '3', 'tv');
INSERT INTO `basic_genre` VALUES ('21', '海外剧', null, '0', '2023-02-20 18:23:31.833798', '2023-03-10 07:19:01.000000', 'admin', 'admin', '', '3', 'tv');
INSERT INTO `basic_genre` VALUES ('22', '国产动漫', null, '0', '2023-02-27 17:10:47.142667', '2023-03-10 06:03:44.000000', 'admin', 'admin', '', '2', 'cartoon');
INSERT INTO `basic_genre` VALUES ('23', '日本动漫', null, '0', '2023-02-27 17:10:54.960679', '2023-03-10 06:03:51.000000', 'admin', 'admin', '', '2', 'cartoon');
INSERT INTO `basic_genre` VALUES ('24', '欧美动漫', null, '0', '2023-02-27 17:11:03.471268', '2023-03-10 06:03:54.000000', 'admin', 'admin', '', '2', 'cartoon');
INSERT INTO `basic_genre` VALUES ('25', '海外动漫', null, '0', '2023-02-27 17:11:54.400682', '2023-03-10 06:03:58.000000', 'admin', 'admin', '', '2', 'cartoon');
INSERT INTO `basic_genre` VALUES ('26', '大陆综艺', null, '0', '2023-03-02 14:48:31.891198', '2023-03-10 06:04:01.000000', 'admin', 'admin', '', '2', 'variety');
INSERT INTO `basic_genre` VALUES ('27', '日韩综艺', null, '0', '2023-03-02 14:48:45.412960', '2023-03-10 06:04:03.000000', 'admin', 'admin', '', '2', 'variety');
INSERT INTO `basic_genre` VALUES ('28', '港台综艺', null, '0', '2023-03-02 14:49:01.780819', '2023-03-10 06:04:06.000000', 'admin', 'admin', '', '2', 'variety');
INSERT INTO `basic_genre` VALUES ('29', '欧美综艺', null, '0', '2023-03-02 14:49:13.590669', '2023-03-10 06:04:09.000000', 'admin', 'admin', '', '2', 'variety');

-- ----------------------------
-- Table structure for basic_language
-- ----------------------------
DROP TABLE IF EXISTS `basic_language`;
CREATE TABLE `basic_language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '中文简称',
  `fullname` varchar(50) DEFAULT NULL COMMENT '中文全称',
  `country_id` int(11) DEFAULT NULL COMMENT '所属国家',
  `name_en` varchar(50) DEFAULT NULL COMMENT '英文简称',
  `fullname_en` varchar(50) DEFAULT NULL COMMENT '英文全称',
  `original_name` varchar(50) DEFAULT NULL COMMENT '原名简称',
  `original_fullname` varchar(50) DEFAULT NULL COMMENT '原名全称',
  `brief` varchar(500) DEFAULT NULL COMMENT '简介',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COMMENT='基础数据-语言管理表';

-- ----------------------------
-- Records of basic_language
-- ----------------------------
INSERT INTO `basic_language` VALUES ('2', '国语', null, '1', null, null, null, null, null, '2022-12-13 15:29:41.220937', '2023-02-20 18:27:10.000000', 'admin', 'admin', '', '15');
INSERT INTO `basic_language` VALUES ('5', '英语', null, '5', null, null, null, null, null, '2023-01-05 09:51:29.031493', '2023-02-20 18:27:40.000000', 'admin', 'admin', '', '7');
INSERT INTO `basic_language` VALUES ('6', '粤语', null, '1', null, null, null, null, null, '2023-02-20 18:27:56.859095', '2023-02-20 18:27:56.859095', 'admin', 'admin', '', '1');
INSERT INTO `basic_language` VALUES ('7', '闽南语', null, '1', null, null, null, null, null, '2023-02-20 18:28:17.896204', '2023-02-20 18:28:17.896204', 'admin', 'admin', '', '1');
INSERT INTO `basic_language` VALUES ('8', '韩语', null, '8', null, null, null, null, null, '2023-02-20 18:29:46.257391', '2023-02-20 18:29:46.257391', 'admin', 'admin', '', '1');
INSERT INTO `basic_language` VALUES ('9', '日语', null, '9', null, null, null, null, null, '2023-02-20 18:29:56.928570', '2023-02-20 18:29:56.928570', 'admin', 'admin', '', '1');
INSERT INTO `basic_language` VALUES ('10', '法语', null, '10', null, null, null, null, null, '2023-02-20 18:30:09.202072', '2023-02-20 18:30:09.202072', 'admin', 'admin', '', '1');
INSERT INTO `basic_language` VALUES ('11', '德语', null, '11', null, null, null, null, null, '2023-02-20 18:30:20.858101', '2023-02-20 18:30:20.858101', 'admin', 'admin', '', '1');

-- ----------------------------
-- Table structure for basic_level
-- ----------------------------
DROP TABLE IF EXISTS `basic_level`;
CREATE TABLE `basic_level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` int(11) DEFAULT NULL COMMENT '国家Id',
  `level` varchar(10) DEFAULT NULL COMMENT '家长引导',
  `level_zh` varchar(10) DEFAULT NULL COMMENT '引导中文',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `status` int(11) DEFAULT '0' COMMENT '状态',
  `descript` varchar(200) NOT NULL COMMENT '引导模板',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COMMENT='基础数据-家长引导表';

-- ----------------------------
-- Records of basic_level
-- ----------------------------
INSERT INTO `basic_level` VALUES ('7', '2', 'G', '大众级', '2022-12-23 16:15:46.216674', '2023-03-02 14:39:17.000000', 'admin', 'admin', '', '2', '0', '本片在${country}的评级为【${level}】，任何人都可以观看。');
INSERT INTO `basic_level` VALUES ('8', '2', 'PG', '辅导级', '2023-03-02 14:39:47.623280', '2023-03-02 14:39:47.623280', 'admin', 'admin', '', '1', '0', '本片在${country}的评级为【${level}】，该级别电影中的一些内容可能不适合儿童观看。');
INSERT INTO `basic_level` VALUES ('9', '2', 'PG-13', '特别辅导级', '2023-03-02 14:40:13.801177', '2023-03-02 14:40:13.801177', 'admin', 'admin', '', '1', '0', '本片在${country}的评级为【${level}】，建议13岁后儿童观看。');
INSERT INTO `basic_level` VALUES ('10', '2', 'NC-17', null, '2023-03-02 14:40:33.981626', '2023-03-02 14:40:33.981626', 'admin', 'admin', '', '1', '0', '本片在${country}的评级为【${level}】，17岁以下（包括17岁）禁止观看。');
INSERT INTO `basic_level` VALUES ('11', '2', 'R', '限制级', '2023-03-02 14:41:01.115525', '2023-03-02 14:41:01.115525', 'admin', 'admin', '', '1', '0', '本片在${country}的评级为【${level}】，建议17岁以上观看。');
INSERT INTO `basic_level` VALUES ('12', '9', 'G', null, '2023-03-02 14:41:43.543852', '2023-03-02 14:41:43.543852', 'admin', 'admin', '', '1', '0', '本片在${country}的评级为【${level}】，没有任何限制。');
INSERT INTO `basic_level` VALUES ('13', '9', 'PG-12', null, '2023-03-02 14:42:03.530108', '2023-03-02 14:42:03.530108', 'admin', 'admin', '', '1', '0', '本片在${country}的评级为【${level}】，12岁以下的人要有家长陪同才可观看。');
INSERT INTO `basic_level` VALUES ('14', '9', 'R-15', null, '2023-03-02 14:42:22.403681', '2023-03-02 14:42:22.403681', 'admin', 'admin', '', '1', '0', '本片在${country}的评级为【${level}】，15岁以下禁止入场。');
INSERT INTO `basic_level` VALUES ('15', '9', 'R-18', null, '2023-03-02 14:42:42.503633', '2023-03-02 14:42:42.503633', 'admin', 'admin', '', '1', '0', '本片在${country}的评级为【${level}】，18岁以下禁止入场。');
INSERT INTO `basic_level` VALUES ('16', '12', 'I', null, '2023-03-02 14:44:22.616102', '2023-03-02 14:44:22.616102', 'admin', 'admin', '', '1', '0', '本片在${country}的评级为【${level}】，适合任何年龄人士观看。');
INSERT INTO `basic_level` VALUES ('17', '12', 'Ⅱ', null, '2023-03-02 14:44:45.847411', '2023-03-02 14:44:45.847411', 'admin', 'admin', '', '1', '0', '本片在${country}的评级为【${level}】，儿童不宜观看。');
INSERT INTO `basic_level` VALUES ('18', '12', 'Ⅲ', null, '2023-03-02 14:45:21.092342', '2023-03-02 14:45:21.092342', 'admin', 'admin', '', '1', '0', '本片在${country}的评级为【${level}】，只准18岁或以上人士观看。');
INSERT INTO `basic_level` VALUES ('19', '12', 'ⅡA', null, '2023-03-02 14:45:40.835560', '2023-03-02 14:45:40.835560', 'admin', 'admin', '', '1', '0', '本片在${country}的评级为【${level}】，儿童不宜。');
INSERT INTO `basic_level` VALUES ('20', '12', 'ⅡB', null, '2023-03-02 14:45:57.413000', '2023-03-02 14:45:57.413000', 'admin', 'admin', '', '1', '0', '本片在${country}的评级为【${level}】，青少年及儿童不宜。');

-- ----------------------------
-- Table structure for basic_profession
-- ----------------------------
DROP TABLE IF EXISTS `basic_profession`;
CREATE TABLE `basic_profession` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(5) DEFAULT NULL COMMENT '中文名称',
  `name_en` varchar(50) DEFAULT NULL COMMENT '英文简称',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `parentId` int(11) DEFAULT NULL,
  `mpath` varchar(255) DEFAULT '',
  `status` int(11) DEFAULT '0' COMMENT '状态',
  `brief` varchar(500) DEFAULT NULL COMMENT '简介',
  PRIMARY KEY (`id`),
  KEY `FK_e79b0ebb1e14801f2c3542095d0` (`parentId`),
  CONSTRAINT `FK_e79b0ebb1e14801f2c3542095d0` FOREIGN KEY (`parentId`) REFERENCES `basic_profession` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COMMENT='基础数据-影人职务表';

-- ----------------------------
-- Records of basic_profession
-- ----------------------------
INSERT INTO `basic_profession` VALUES ('1', '导演', 'Director', '2022-12-15 10:52:24.704120', '2022-12-15 14:50:08.560528', 'admin', 'admin', '', '2', null, '', '0', '0');
INSERT INTO `basic_profession` VALUES ('2', '导演', 'Director', '2022-12-15 10:58:18.949238', '2022-12-16 14:48:03.000000', 'admin', 'admin', '', '3', '1', '1.2', '0', '');
INSERT INTO `basic_profession` VALUES ('3', '联合执导', 'Co-Director', '2022-12-15 10:58:30.935815', '2023-03-02 14:35:30.000000', 'admin', 'admin', '', '3', '1', '1.3', '0', '');
INSERT INTO `basic_profession` VALUES ('20', '演员', 'Cast', '2022-12-15 14:25:06.905618', '2023-03-02 14:35:53.000000', 'admin', 'admin', '', '3', null, '20.', '0', '');
INSERT INTO `basic_profession` VALUES ('21', '演员', 'Actor/Actress', '2022-12-15 14:25:20.148935', '2023-03-02 14:36:04.000000', 'admin', 'admin', '', '4', '20', '20.21.', '0', '');
INSERT INTO `basic_profession` VALUES ('23', '总导演', 'General Director', '2022-12-16 15:02:20.486917', '2023-03-02 14:35:40.000000', 'admin', 'admin', '', '3', '1', '23.', '0', null);
INSERT INTO `basic_profession` VALUES ('24', '配音', 'Voice', '2023-03-02 14:36:24.119103', '2023-03-02 14:36:24.000000', 'admin', 'admin', '', '2', '20', '20.24.', '0', null);
INSERT INTO `basic_profession` VALUES ('25', '自己', 'Self', '2023-03-02 14:36:40.560110', '2023-03-02 14:36:40.000000', 'admin', 'admin', '', '2', '20', '20.25.', '0', null);
INSERT INTO `basic_profession` VALUES ('26', '主持人', 'Host', '2023-03-02 14:36:55.332636', '2023-03-02 14:36:55.000000', 'admin', 'admin', '', '2', '20', '20.26.', '0', null);
INSERT INTO `basic_profession` VALUES ('27', '嘉宾', 'Guest', '2023-03-02 14:37:10.267136', '2023-03-02 14:37:10.000000', 'admin', 'admin', '', '2', '20', '20.27.', '0', null);
INSERT INTO `basic_profession` VALUES ('28', '动作捕捉', 'Motion Capture', '2023-03-02 14:37:26.431169', '2023-03-02 14:37:26.000000', 'admin', 'admin', '', '2', '20', '20.28.', '0', null);

-- ----------------------------
-- Table structure for columns
-- ----------------------------
DROP TABLE IF EXISTS `columns`;
CREATE TABLE `columns` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_bin NOT NULL COMMENT '栏目名称',
  `value` varchar(50) COLLATE utf8mb4_bin NOT NULL COMMENT '目录名',
  `order` int(11) NOT NULL DEFAULT '1' COMMENT '排序',
  `status` varchar(50) COLLATE utf8mb4_bin NOT NULL DEFAULT '0' COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of columns
-- ----------------------------
INSERT INTO `columns` VALUES ('2023-03-10 03:23:10.107145', '2023-03-10 05:38:38.000000', 'admin', 'admin', '导航', '4', '1', '电影', 'movie', '1', '0');
INSERT INTO `columns` VALUES ('2023-03-10 03:23:25.987368', '2023-03-10 03:23:25.987368', 'admin', 'admin', '', '1', '2', '电视剧', 'tv', '2', '0');
INSERT INTO `columns` VALUES ('2023-03-10 03:26:01.304447', '2023-03-10 03:26:01.304447', 'admin', 'admin', '', '1', '4', '动漫', 'cartoon', '3', '0');
INSERT INTO `columns` VALUES ('2023-03-10 03:26:13.648075', '2023-03-10 03:26:13.648075', 'admin', 'admin', '', '1', '5', '综艺', 'variety', '4', '0');

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `config_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '参数主键',
  `config_name` varchar(100) NOT NULL DEFAULT '' COMMENT '参数名称',
  `config_key` varchar(100) NOT NULL DEFAULT '' COMMENT '参数键名',
  `config_value` varchar(500) NOT NULL DEFAULT '' COMMENT '参数键值',
  `config_type` char(1) NOT NULL DEFAULT 'N' COMMENT '系统内置（Y是 N否）',
  `version` int(11) NOT NULL COMMENT '版本号',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`config_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of config
-- ----------------------------
INSERT INTO `config` VALUES ('2022-01-06 13:39:57.695833', '2022-01-06 13:39:57.695833', '初始化密码 123456', '1', '用户管理-账号初始密码', 'sys.user.initPassword', '123456', 'Y', '0', '', '');

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `dept_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '部门id',
  `dept_name` varchar(50) NOT NULL DEFAULT '' COMMENT '部门名称',
  `order_num` int(11) NOT NULL DEFAULT '0' COMMENT '显示顺序',
  `leader` varchar(20) DEFAULT NULL COMMENT '负责人',
  `phone` varchar(11) DEFAULT NULL COMMENT '联系电话',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `status` char(1) NOT NULL DEFAULT '0' COMMENT '部门状态（0正常 1停用）',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `mpath` varchar(255) DEFAULT '',
  `parentDeptId` int(11) DEFAULT NULL COMMENT '部门id',
  `version` int(11) NOT NULL COMMENT '版本号',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`dept_id`) USING BTREE,
  KEY `FK_427c332b4ebe1147caa3328adfa` (`parentDeptId`) USING BTREE,
  CONSTRAINT `FK_427c332b4ebe1147caa3328adfa` FOREIGN KEY (`parentDeptId`) REFERENCES `dept` (`dept_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES ('2021-12-29 16:36:06.320221', '2022-01-06 13:39:00.000000', '', '1', '淳渔总部', '1', '淳渔', '15674874636', '542968439@qq.com', '0', '0', '1.', null, '0', '', '');
INSERT INTO `dept` VALUES ('2022-12-15 11:25:29.948458', '2023-03-03 06:00:49.000000', '', '2', 'test', '0', null, null, null, '0', '0', '1.2.', '1', '4', 'admin', 'admin');

-- ----------------------------
-- Table structure for dict_data
-- ----------------------------
DROP TABLE IF EXISTS `dict_data`;
CREATE TABLE `dict_data` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `dict_data` int(11) NOT NULL AUTO_INCREMENT COMMENT '字典编码',
  `dict_sort` int(11) NOT NULL DEFAULT '0' COMMENT '字典排序',
  `dict_label` varchar(100) NOT NULL DEFAULT '' COMMENT '字典标签',
  `dict_value` varchar(100) NOT NULL DEFAULT '' COMMENT '字典键值',
  `css_class` varchar(100) DEFAULT NULL COMMENT '样式属性（其他样式扩展）',
  `list_class` varchar(100) DEFAULT NULL COMMENT '表格回显样式',
  `is_default` char(1) NOT NULL DEFAULT 'N' COMMENT '是否默认（Y是 N否）',
  `status` char(1) NOT NULL DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `dictTypeDictId` int(11) DEFAULT NULL COMMENT '字典类型ID',
  `version` int(11) NOT NULL COMMENT '版本号',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`dict_data`) USING BTREE,
  KEY `FK_bddc8251ad1c1ed3bcad5208a15` (`dictTypeDictId`) USING BTREE,
  CONSTRAINT `FK_bddc8251ad1c1ed3bcad5208a15` FOREIGN KEY (`dictTypeDictId`) REFERENCES `dict_type` (`dict_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of dict_data
-- ----------------------------
INSERT INTO `dict_data` VALUES ('2022-01-06 17:22:28.610065', '2022-01-06 17:22:28.610065', '正常状态', '1', '1', '正常', '0', null, 'primary', 'N', '0', '1', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:22:46.633485', '2022-01-06 17:22:46.633485', '停用状态', '2', '2', '停用', '1', null, 'danger', 'N', '0', '1', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:23:10.503824', '2022-01-06 17:23:10.503824', '系统默认是', '3', '1', '是', 'Y', null, 'primary', 'N', '0', '2', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:23:27.925513', '2022-01-06 17:23:27.925513', '系统默认否', '4', '2', '否', 'N', null, 'danger', 'N', '0', '2', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:23:53.124506', '2022-01-06 17:23:53.124506', '通知', '5', '1', '通知', '1', null, 'warning', 'N', '0', '3', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:24:48.108480', '2022-01-06 17:24:48.108480', '公告', '6', '2', '公告', '2', null, 'success', 'N', '0', '3', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:25:16.677767', '2022-01-06 17:25:16.677767', '正常状态', '7', '1', '正常', '0', null, 'primary', 'N', '0', '4', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:25:31.685121', '2022-01-06 17:25:31.685121', '关闭状态', '8', '2', '关闭', '1', null, 'danger', 'N', '0', '4', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:26:13.034016', '2022-01-06 17:26:13.034016', '显示菜单', '9', '1', '显示', '0', null, 'primary', 'N', '0', '5', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:26:28.928726', '2022-01-06 17:26:28.928726', '隐藏菜单', '10', '2', '隐藏', '1', null, 'danger', 'N', '0', '5', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:26:53.936024', '2022-01-06 17:26:53.936024', '性别男', '11', '1', '男', '0', null, 'default', 'N', '0', '6', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:27:09.341366', '2022-01-06 17:27:09.341366', '', '12', '2', '女', '1', null, 'default', 'N', '0', '6', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:27:26.557747', '2022-01-06 17:27:26.557747', '', '13', '3', '未知', '2', null, 'default', 'N', '0', '6', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:28:03.075867', '2022-01-06 17:28:03.075867', '其他操作', '14', '1', '其他', '1', '', 'default', 'N', '0', '7', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:28:17.031908', '2022-01-06 17:28:17.031908', '插入操作', '15', '2', '插入', '2', null, 'primary', 'N', '0', '7', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:28:31.698386', '2022-01-06 17:28:31.698386', '更新操作', '16', '3', '更新', '3', null, 'success', 'N', '0', '7', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:28:47.336031', '2022-01-06 17:28:47.336031', '删除操作', '17', '4', '删除', '4', null, 'danger', 'N', '0', '7', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:29:02.638173', '2022-01-06 17:29:02.638173', '授权操作', '18', '5', '授权', '5', null, 'info', 'N', '0', '7', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:29:17.692132', '2022-01-06 17:29:17.692132', '导出操作', '19', '6', '导出', '6', null, 'primary', 'N', '0', '7', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:29:32.192795', '2022-01-06 17:29:32.192795', '导入操作', '20', '7', '导入', '7', null, 'success', 'N', '0', '7', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:29:47.511268', '2022-01-06 17:29:47.511268', '强退操作', '21', '8', '强退', '8', null, 'info', 'N', '0', '7', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:30:06.376073', '2022-01-06 17:30:06.376073', '清除操作', '22', '9', '清除', '9', null, 'danger', 'N', '0', '7', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:30:29.075463', '2022-01-06 17:30:29.075463', '正常状态', '23', '1', '成功', '0', null, 'primary', 'N', '0', '8', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:30:44.318238', '2022-01-06 17:30:57.000000', '停用状态', '24', '2', '失败', '1', null, 'danger', 'N', '0', '8', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:31:19.931468', '2022-01-06 17:31:19.931468', '正常状态', '25', '1', '正常', '0', null, 'primary', 'N', '0', '9', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:31:34.260922', '2022-01-06 17:31:34.260922', '停用状态', '26', '2', '暂停', '1', null, 'danger', 'N', '0', '9', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:31:54.560801', '2022-01-06 17:31:54.560801', '默认分组', '27', '1', '默认', 'DEFAULT', null, 'default', 'N', '0', '10', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-01-06 17:32:11.831282', '2022-01-06 17:32:11.831282', '系统分组', '28', '2', '系统', 'SYSTEM', null, 'default', 'N', '0', '10', '0', '', '');
INSERT INTO `dict_data` VALUES ('2022-12-14 16:40:46.602441', '2023-02-15 19:02:49.000000', '', '29', '1', '电影', '1', 'new-movie', 'default', 'N', '0', '11', '2', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2022-12-14 16:41:06.934668', '2023-02-15 19:02:57.000000', '', '30', '2', '电视剧', '2', 'new-tv', 'default', 'N', '0', '11', '2', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2022-12-14 16:42:09.350468', '2022-12-14 16:42:09.350468', '', '31', '3', '动漫', '3', null, 'default', 'N', '0', '11', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2022-12-14 16:42:37.430704', '2022-12-14 16:42:45.000000', '', '33', '5', '综艺', '5', null, 'default', 'N', '0', '11', '2', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-06 14:23:36.177780', '2023-01-06 14:23:36.177780', '', '34', '1', '海报', '1', null, 'default', 'N', '0', '12', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-06 14:23:50.135100', '2023-01-06 14:23:50.135100', '', '35', '1', '剧照', '2', null, 'default', 'N', '0', '12', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-06 14:23:59.064161', '2023-01-06 14:23:59.064161', '', '36', '3', '壁纸', '3', null, 'default', 'N', '0', '12', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-06 14:25:37.689491', '2023-01-06 14:26:34.000000', '', '37', '1', '未审核', '1', null, 'info', 'N', '0', '13', '3', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-06 14:25:53.007173', '2023-01-06 14:26:23.000000', '', '38', '2', '已通过', '2', null, 'success', 'N', '0', '13', '2', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-06 14:26:15.503317', '2023-01-06 14:26:15.503317', '', '39', '3', '未通过', '3', null, 'danger', 'N', '0', '13', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 11:36:55.909293', '2023-01-11 11:37:37.000000', '', '40', '1', '正片', '1', null, 'default', 'N', '0', '14', '2', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 11:37:08.699317', '2023-01-11 11:37:34.000000', '', '41', '2', '预告片', '2', null, 'default', 'N', '0', '14', '2', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 11:37:29.975888', '2023-01-11 11:37:29.975888', '', '42', '3', '花絮', '3', null, 'default', 'N', '0', '14', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 11:37:56.423672', '2023-01-11 11:37:56.423672', '', '43', '4', '片段', '4', null, 'default', 'N', '0', '14', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 11:38:47.991309', '2023-01-11 11:38:47.991309', '', '44', '5', '其他', '5', null, 'default', 'N', '0', '14', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 17:22:07.345119', '2023-01-11 17:22:07.345119', '', '45', '1', '2022', '2022', null, 'default', 'N', '0', '15', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 17:22:16.693434', '2023-01-11 17:22:16.693434', '', '46', '0', '2023', '2023', null, 'default', 'N', '0', '15', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 17:22:30.339732', '2023-01-11 17:22:30.339732', '', '47', '2', '2021', '2021', null, 'default', 'N', '0', '15', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 17:22:41.676743', '2023-01-11 17:22:41.676743', '', '48', '3', '2020', '2020', null, 'default', 'N', '0', '15', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 17:22:55.646023', '2023-01-11 17:22:55.646023', '', '49', '4', '2019', '2019', null, 'default', 'N', '0', '15', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 17:23:14.373470', '2023-01-11 17:23:14.373470', '', '50', '6', '2018', '2018', null, 'default', 'N', '0', '15', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 17:23:31.444308', '2023-01-11 17:23:31.444308', '', '51', '7', '2017', '2017', null, 'default', 'N', '0', '15', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 17:24:12.282960', '2023-01-11 17:26:58.000000', '', '52', '10', '2016-2010', '5', null, 'default', 'N', '0', '15', '4', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 17:24:32.289171', '2023-01-11 17:26:39.000000', '', '53', '9', '2009-2000', '4', null, 'default', 'N', '0', '15', '3', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 17:24:55.182030', '2023-01-11 17:27:09.000000', '', '54', '11', '90年代', '3', null, 'default', 'N', '0', '15', '3', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 17:25:07.579035', '2023-01-11 17:27:14.000000', '', '55', '12', '80年代', '2', null, 'default', 'N', '0', '15', '3', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-11 17:25:17.430040', '2023-01-11 17:27:18.000000', '', '56', '13', '更早', '1', null, 'default', 'N', '0', '15', '3', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-18 15:33:07.582902', '2023-01-18 15:33:14.000000', '', '57', '1', '历史人物', '1', null, 'default', 'N', '0', '16', '2', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-18 15:33:30.322947', '2023-01-18 15:33:36.000000', '', '58', '2', '虚构人物', '2', null, 'default', 'N', '0', '16', '2', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-18 15:33:51.160792', '2023-02-27 16:10:04.000000', '', '59', '4', '道具', '3', null, 'default', 'N', '0', '16', '2', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-18 15:34:03.552857', '2023-02-27 16:10:08.000000', '', '60', '5', '其他', '4', null, 'default', 'N', '0', '16', '2', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-18 16:38:30.282436', '2023-01-18 16:38:30.282436', '', '61', '1', '男', '1', null, 'primary', 'N', '0', '17', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-18 16:38:39.760440', '2023-01-18 16:39:03.000000', '', '62', '2', '女', '2', null, 'danger', 'N', '0', '17', '2', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-01-18 16:38:58.513455', '2023-01-18 16:38:58.513455', '', '63', '3', '未知', '3', null, 'info', 'N', '0', '17', '1', 'admin', 'admin');
INSERT INTO `dict_data` VALUES ('2023-02-27 16:09:57.835238', '2023-02-27 16:09:57.835238', '', '64', '3', '动漫人物', '5', null, 'default', 'N', '0', '16', '1', 'admin', 'admin');

-- ----------------------------
-- Table structure for dict_type
-- ----------------------------
DROP TABLE IF EXISTS `dict_type`;
CREATE TABLE `dict_type` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `dict_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '字典类型ID',
  `dict_name` varchar(100) NOT NULL DEFAULT '' COMMENT '字典名称',
  `dict_type` varchar(100) NOT NULL DEFAULT '' COMMENT '字典类型',
  `status` char(1) NOT NULL DEFAULT '0' COMMENT '状态（0正常 1停用）',
  `version` int(11) NOT NULL COMMENT '版本号',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`dict_id`) USING BTREE,
  UNIQUE KEY `IDX_003e8d417dc1f24cd03575cb9e` (`dict_type`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of dict_type
-- ----------------------------
INSERT INTO `dict_type` VALUES ('2022-01-06 17:19:32.611851', '2022-01-06 17:19:32.611851', '系统开关列表', '1', '系统开关', 'sys_normal_disable', '0', '0', '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:19:55.785151', '2022-01-06 17:19:55.785151', '系统是否列表', '2', '系统是否', 'sys_yes_no', '0', '0', '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:20:09.089782', '2022-01-06 17:20:09.089782', '通知类型列表', '3', '通知类型', 'sys_notice_type', '0', '0', '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:20:20.222661', '2022-01-06 17:20:20.222661', '通知状态列表', '4', '通知状态', 'sys_notice_status', '0', '0', '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:20:43.378711', '2022-01-06 17:20:43.378711', '菜单状态列表', '5', '菜单状态', 'sys_show_hide', '0', '0', '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:20:58.306460', '2022-01-06 17:20:58.306460', '用户性别列表', '6', '用户性别', 'sys_user_sex', '0', '0', '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:21:17.184524', '2022-01-06 17:21:17.184524', '操作类型列表', '7', '操作类型', 'sys_oper_type', '0', '0', '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:21:34.350301', '2022-01-06 17:21:34.350301', '登录状态列表', '8', '系统状态', 'sys_common_status', '0', '0', '', '');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:21:49.814326', '2022-12-13 15:12:17.000000', '任务状态列表', '9', '任务状态', 'sys_job_status', '0', '2', '', 'admin');
INSERT INTO `dict_type` VALUES ('2022-01-06 17:22:00.163750', '2022-01-06 17:22:00.163750', '任务分组列表', '10', '任务分组', 'sys_job_group', '0', '0', '', '');
INSERT INTO `dict_type` VALUES ('2022-12-14 16:40:21.740199', '2022-12-15 09:30:27.000000', '', '11', '电影分类', 'movie_category_type', '0', '2', 'admin', 'admin');
INSERT INTO `dict_type` VALUES ('2023-01-06 14:23:15.681618', '2023-01-06 14:23:15.681618', '', '12', '图片类型', 'movie_img_type', '0', '1', 'admin', 'admin');
INSERT INTO `dict_type` VALUES ('2023-01-06 14:25:01.679841', '2023-01-06 14:25:01.679841', '', '13', '图片状态', 'movie_img_status', '0', '1', 'admin', 'admin');
INSERT INTO `dict_type` VALUES ('2023-01-11 11:36:29.348092', '2023-01-11 11:36:29.348092', '相关影视分类', '14', '影视分类', 'videos_type', '0', '1', 'admin', 'admin');
INSERT INTO `dict_type` VALUES ('2023-01-11 17:21:39.127981', '2023-01-11 17:21:39.127981', '', '15', '影视年代', 'movie_years', '0', '1', 'admin', 'admin');
INSERT INTO `dict_type` VALUES ('2023-01-18 15:32:46.744733', '2023-01-18 15:32:46.744733', '', '16', '影视角色类型', 'movie_role_type', '0', '1', 'admin', 'admin');
INSERT INTO `dict_type` VALUES ('2023-01-18 16:38:12.301662', '2023-01-18 16:38:12.301662', '', '17', '性别类型', 'sex_type', '0', '1', 'admin', 'admin');

-- ----------------------------
-- Table structure for job
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `job_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '任务ID',
  `job_name` varchar(64) NOT NULL DEFAULT '' COMMENT '任务名称',
  `job_group` varchar(64) NOT NULL DEFAULT 'DEFAULT' COMMENT '任务组名',
  `invoke_target` varchar(225) DEFAULT NULL COMMENT '调用目标字符串',
  `cron_expression` varchar(225) NOT NULL DEFAULT '' COMMENT 'cron执行表达式',
  `misfire_policy` varchar(20) NOT NULL DEFAULT '3' COMMENT '计划执行错误策略（1立即执行 2执行一次 3放弃执行）',
  `concurrent` char(1) NOT NULL DEFAULT '1' COMMENT '是否并发执行（0允许 1禁止）',
  `status` char(1) NOT NULL DEFAULT '0' COMMENT '状态（0正常 1暂停）',
  `version` int(11) NOT NULL COMMENT '版本号',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`job_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of job
-- ----------------------------
INSERT INTO `job` VALUES ('2022-01-06 17:35:01.664486', '2022-01-06 17:35:01.664486', '', '1', '测试定时任务', 'DEFAULT', 'JobService.ceshi(1,2,3,true)', '0/15 * * * * ?', '3', '1', '1', '0', '', '');

-- ----------------------------
-- Table structure for job_log
-- ----------------------------
DROP TABLE IF EXISTS `job_log`;
CREATE TABLE `job_log` (
  `job_log_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '任务日志ID',
  `job_name` varchar(64) NOT NULL COMMENT '任务名称',
  `job_group` varchar(64) NOT NULL COMMENT '任务组名',
  `invoke_target` varchar(500) NOT NULL COMMENT '调用目标字符串',
  `job_message` varchar(500) DEFAULT NULL COMMENT '日志信息',
  `status` char(1) NOT NULL DEFAULT '0' COMMENT '执行状态（0正常 1失败）',
  `exception_info` varchar(2000) NOT NULL DEFAULT '' COMMENT '异常信息',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  PRIMARY KEY (`job_log_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of job_log
-- ----------------------------

-- ----------------------------
-- Table structure for logininfor
-- ----------------------------
DROP TABLE IF EXISTS `logininfor`;
CREATE TABLE `logininfor` (
  `info_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '访问ID',
  `user_name` varchar(50) NOT NULL DEFAULT '' COMMENT '用户账号',
  `ipaddr` varchar(128) NOT NULL DEFAULT '' COMMENT '登录IP地址',
  `login_location` varchar(255) NOT NULL DEFAULT '' COMMENT '登录地点',
  `browser` varchar(50) NOT NULL DEFAULT '' COMMENT '浏览器类型',
  `os` varchar(50) NOT NULL DEFAULT '' COMMENT '浏览器操作系统类型',
  `status` char(1) NOT NULL DEFAULT '0' COMMENT '登录状态（0成功 1失败）',
  `msg` varchar(255) NOT NULL DEFAULT '' COMMENT '提示消息',
  `login_time` datetime NOT NULL COMMENT '访问时间',
  PRIMARY KEY (`info_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of logininfor
-- ----------------------------
INSERT INTO `logininfor` VALUES ('1', 'admin', '127.0.0.1', '内网IP', 'Chrome107', 'Windows10', '0', '登录成功', '2022-12-09 16:36:24');
INSERT INTO `logininfor` VALUES ('2', 'admin', '127.0.0.1', '内网IP', 'Chrome107', 'Windows10', '0', '登录成功', '2022-12-09 16:36:58');
INSERT INTO `logininfor` VALUES ('3', 'admin', '127.0.0.1', '内网IP', 'Chrome107', 'Windows10', '1', '验证码错误', '2022-12-12 09:27:33');
INSERT INTO `logininfor` VALUES ('4', 'admin', '127.0.0.1', '内网IP', 'Chrome107', 'Windows10', '0', '登录成功', '2022-12-12 09:27:36');
INSERT INTO `logininfor` VALUES ('5', 'admin', '127.0.0.1', '内网IP', 'Chrome107', 'Windows10', '0', '登录成功', '2022-12-12 11:54:50');
INSERT INTO `logininfor` VALUES ('6', 'admin', '127.0.0.1', '内网IP', 'Chrome107', 'Windows10', '0', '登录成功', '2022-12-12 11:56:19');
INSERT INTO `logininfor` VALUES ('7', 'admin', '127.0.0.1', '内网IP', 'Chrome107', 'Windows10', '0', '登录成功', '2022-12-12 15:56:11');
INSERT INTO `logininfor` VALUES ('8', 'admin', '127.0.0.1', '内网IP', 'Chrome108', 'Windows10', '0', '登录成功', '2022-12-12 16:52:37');
INSERT INTO `logininfor` VALUES ('9', 'admin', '127.0.0.1', '内网IP', 'Chrome108', 'Windows10', '0', '登录成功', '2022-12-12 16:55:18');
INSERT INTO `logininfor` VALUES ('10', 'admin', '127.0.0.1', '内网IP', 'Chrome108', 'Windows10', '0', '登录成功', '2022-12-13 09:40:12');
INSERT INTO `logininfor` VALUES ('11', 'admin', '127.0.0.1', '内网IP', 'Chrome108', 'Windows10', '0', '登录成功', '2022-12-13 09:40:49');
INSERT INTO `logininfor` VALUES ('12', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '1', '验证码错误', '2022-12-14 09:52:12');
INSERT INTO `logininfor` VALUES ('13', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2022-12-14 09:52:15');
INSERT INTO `logininfor` VALUES ('14', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2022-12-15 09:52:27');
INSERT INTO `logininfor` VALUES ('15', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2022-12-16 10:07:42');
INSERT INTO `logininfor` VALUES ('16', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2022-12-23 10:23:52');
INSERT INTO `logininfor` VALUES ('17', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-03 10:37:39');
INSERT INTO `logininfor` VALUES ('18', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-04 10:53:18');
INSERT INTO `logininfor` VALUES ('19', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-05 10:53:26');
INSERT INTO `logininfor` VALUES ('20', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-06 14:22:19');
INSERT INTO `logininfor` VALUES ('21', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-09 10:29:26');
INSERT INTO `logininfor` VALUES ('22', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-10 11:38:12');
INSERT INTO `logininfor` VALUES ('23', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-11 11:38:29');
INSERT INTO `logininfor` VALUES ('24', 'admin', '127.0.0.1', '内网IP', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-11 15:41:13');
INSERT INTO `logininfor` VALUES ('25', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-12 15:42:05');
INSERT INTO `logininfor` VALUES ('26', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-13 15:34:33');
INSERT INTO `logininfor` VALUES ('27', 'admin', '127.0.0.1', '内网IP', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-13 15:42:59');
INSERT INTO `logininfor` VALUES ('28', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '1', '验证码错误', '2023-01-16 09:35:20');
INSERT INTO `logininfor` VALUES ('29', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-16 09:35:26');
INSERT INTO `logininfor` VALUES ('30', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-16 17:12:36');
INSERT INTO `logininfor` VALUES ('31', 'admin', '::1', '湖南省 长沙市', 'Chrome108', 'Windows10', '0', '登录成功', '2023-01-18 13:42:14');
INSERT INTO `logininfor` VALUES ('32', 'admin', '::1', '湖南省 长沙市', 'Chrome109', 'Windows10', '0', '登录成功', '2023-01-29 11:41:33');
INSERT INTO `logininfor` VALUES ('33', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-01-30 14:11:30');
INSERT INTO `logininfor` VALUES ('34', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-01-30 15:27:02');
INSERT INTO `logininfor` VALUES ('35', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-01-31 15:27:07');
INSERT INTO `logininfor` VALUES ('36', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-02-08 18:46:33');
INSERT INTO `logininfor` VALUES ('37', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-02-08 18:59:52');
INSERT INTO `logininfor` VALUES ('38', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-02-08 19:07:23');
INSERT INTO `logininfor` VALUES ('39', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-02-13 16:55:32');
INSERT INTO `logininfor` VALUES ('40', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-02-14 17:01:13');
INSERT INTO `logininfor` VALUES ('41', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-02-15 18:29:05');
INSERT INTO `logininfor` VALUES ('42', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-02-15 19:16:23');
INSERT INTO `logininfor` VALUES ('43', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-02-20 09:58:01');
INSERT INTO `logininfor` VALUES ('44', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-02-20 10:28:43');
INSERT INTO `logininfor` VALUES ('45', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-02-21 10:37:48');
INSERT INTO `logininfor` VALUES ('46', 'admin', '127.0.0.1', '内网IP', 'Chrome109', 'Windows10', '0', '登录成功', '2023-02-22 10:45:07');
INSERT INTO `logininfor` VALUES ('47', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-02-23 11:31:05');
INSERT INTO `logininfor` VALUES ('48', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-02-27 16:06:50');
INSERT INTO `logininfor` VALUES ('49', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Mac OS10.15.7', '0', '登录成功', '2023-02-27 22:13:58');
INSERT INTO `logininfor` VALUES ('50', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-02-28 16:07:00');
INSERT INTO `logininfor` VALUES ('51', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-02-28 16:07:51');
INSERT INTO `logininfor` VALUES ('52', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-02-28 16:13:00');
INSERT INTO `logininfor` VALUES ('53', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Mac OS10.15.7', '0', '登录成功', '2023-02-28 23:01:58');
INSERT INTO `logininfor` VALUES ('54', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Mac OS10.15.7', '0', '登录成功', '2023-03-01 21:43:13');
INSERT INTO `logininfor` VALUES ('55', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Mac OS10.15.7', '0', '登录成功', '2023-03-01 22:09:06');
INSERT INTO `logininfor` VALUES ('56', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-03-02 11:30:05');
INSERT INTO `logininfor` VALUES ('57', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Mac OS10.15.7', '0', '登录成功', '2023-03-02 22:27:22');
INSERT INTO `logininfor` VALUES ('58', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-03-03 10:20:30');
INSERT INTO `logininfor` VALUES ('59', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-03-03 13:41:41');
INSERT INTO `logininfor` VALUES ('60', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '1', '验证码错误', '2023-03-04 11:58:59');
INSERT INTO `logininfor` VALUES ('61', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-03-04 11:59:01');
INSERT INTO `logininfor` VALUES ('62', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Mac OS10.15.7', '0', '登录成功', '2023-03-04 20:42:01');
INSERT INTO `logininfor` VALUES ('63', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-03-06 09:55:32');
INSERT INTO `logininfor` VALUES ('64', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-03-06 11:16:01');
INSERT INTO `logininfor` VALUES ('65', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-03-06 17:55:41');
INSERT INTO `logininfor` VALUES ('66', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Mac OS10.15.7', '1', '验证码错误', '2023-03-06 21:32:26');
INSERT INTO `logininfor` VALUES ('67', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Mac OS10.15.7', '0', '登录成功', '2023-03-06 21:32:33');
INSERT INTO `logininfor` VALUES ('68', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Mac OS10.15.7', '0', '登录成功', '2023-03-06 21:44:46');
INSERT INTO `logininfor` VALUES ('69', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Mac OS10.15.7', '0', '登录成功', '2023-03-06 21:47:52');
INSERT INTO `logininfor` VALUES ('70', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-03-08 14:50:38');
INSERT INTO `logininfor` VALUES ('71', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Mac OS10.15.7', '0', '登录成功', '2023-03-08 22:21:45');
INSERT INTO `logininfor` VALUES ('72', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-03-09 13:48:47');
INSERT INTO `logininfor` VALUES ('73', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-03-10 10:01:03');
INSERT INTO `logininfor` VALUES ('74', 'admin', '::1', '湖南省 长沙市', 'Chrome110', 'Windows10', '0', '登录成功', '2023-03-10 10:40:39');
INSERT INTO `logininfor` VALUES ('75', 'admin', '127.0.0.1', '内网IP', 'Chrome110', 'Windows10', '0', '登录成功', '2023-03-13 11:01:31');
INSERT INTO `logininfor` VALUES ('76', 'admin', '127.0.0.1', '内网IP', 'Chrome111', 'Mac OS10.15.7', '0', '登录成功', '2023-03-14 22:08:40');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `menu_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `menu_name` varchar(50) NOT NULL COMMENT '菜单名称',
  `order_num` int(11) NOT NULL COMMENT '显示顺序',
  `path` varchar(200) NOT NULL DEFAULT '' COMMENT '路由地址',
  `component` varchar(255) DEFAULT NULL COMMENT '组件路径',
  `query` varchar(255) DEFAULT NULL COMMENT '路由参数',
  `is_frame` int(11) NOT NULL DEFAULT '1' COMMENT '是否为外链（0是 1否）',
  `menu_type` char(1) NOT NULL DEFAULT '' COMMENT '菜单类型（M目录 C菜单 F按钮）',
  `visible` char(1) NOT NULL DEFAULT '0' COMMENT '菜单状态（0显示 1隐藏）',
  `status` char(1) NOT NULL DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `perms` varchar(100) DEFAULT NULL COMMENT '权限标识',
  `icon` char(100) NOT NULL DEFAULT '#' COMMENT '菜单图标',
  `mpath` varchar(255) DEFAULT '',
  `parentMenuId` int(11) DEFAULT NULL COMMENT '菜单ID',
  `version` int(11) NOT NULL COMMENT '版本号',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `is_cache` char(1) NOT NULL DEFAULT '0' COMMENT '是否缓存（0缓存 1不缓存）',
  PRIMARY KEY (`menu_id`) USING BTREE,
  KEY `FK_fbe2023241bd4c612415c080cc6` (`parentMenuId`) USING BTREE,
  CONSTRAINT `FK_fbe2023241bd4c612415c080cc6` FOREIGN KEY (`parentMenuId`) REFERENCES `menu` (`menu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.401465', '2023-01-16 11:35:17.000000', '', '1', '系统管理', '8', 'system', null, null, '1', 'M', '0', '0', null, 'system', '1.', null, '6', '', 'admin', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.406615', '2023-01-16 11:34:54.000000', '', '2', '系统监控', '9', 'monitor', null, null, '1', 'M', '0', '0', null, 'monitor', '2.', null, '2', '', 'admin', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.409007', '2023-01-16 11:34:45.000000', '', '3', '系统工具', '10', 'tool', null, null, '1', 'M', '0', '0', null, 'tool', '3.', null, '2', '', 'admin', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.411039', '2023-01-16 11:35:17.000000', '', '4', '用户管理', '1', 'user', 'system/user/index', null, '1', 'C', '0', '0', 'system:user:list', 'user', '1.4.', '1', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.412951', '2023-01-16 11:35:17.000000', '', '5', '角色管理', '2', 'role', 'system/role/index', null, '1', 'C', '0', '0', 'system:role:list', 'peoples', '1.5.', '1', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.414663', '2023-01-16 11:35:17.000000', '', '6', '菜单管理', '3', 'menu', 'system/menu/index', null, '1', 'C', '0', '0', 'system:menu:list', 'tree-table', '1.6.', '1', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.416394', '2023-01-16 11:35:17.000000', '', '7', '部门管理', '4', 'dept', 'system/dept/index', null, '1', 'C', '0', '0', 'system:dept:list', 'tree', '1.7.', '1', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.418494', '2023-01-16 11:35:17.000000', '', '8', '岗位管理', '5', 'post', 'system/post/index', null, '1', 'C', '0', '0', 'system:post:list', 'post', '1.8.', '1', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.420750', '2023-01-16 11:35:17.000000', '', '9', '字典管理', '6', 'dict', 'system/dict/index', null, '1', 'C', '0', '0', 'system:dict:list', 'dict', '1.9.', '1', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.422744', '2023-01-16 11:35:17.000000', '', '10', '参数设置', '7', 'config', 'system/config/index', null, '1', 'C', '0', '0', 'system:config:list', 'edit', '1.10.', '1', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.424344', '2023-01-16 11:35:17.000000', '', '11', '通知公告', '8', 'notice', 'system/notice/index', null, '1', 'C', '0', '0', 'system:notice:list', 'message', '1.11.', '1', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.426038', '2023-01-16 11:35:17.000000', '', '12', '日志管理', '9', 'log', null, null, '1', 'M', '0', '0', null, 'log', '1.12.', '1', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.427903', '2023-01-16 11:35:17.000000', '', '13', '操作日志', '1', 'operlog', 'monitor/operlog/index', null, '1', 'C', '0', '0', 'monitor:operlog:list', 'form', '1.12.13.', '12', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.429545', '2023-01-16 11:35:17.000000', '', '14', '登录日志', '2', 'logininfor', 'monitor/logininfor/index', null, '1', 'C', '0', '0', 'monitor:logininfor:list', 'logininfor', '1.12.14.', '12', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.431236', '2023-01-16 11:35:17.000000', '', '15', '用户查询', '1', '', null, null, '1', 'F', '0', '0', 'system:user:query', '#', '1.4.15.', '4', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.432834', '2023-01-16 11:35:17.000000', '', '16', '用户新增', '2', '', null, null, '1', 'F', '0', '0', 'system:user:add', '#', '1.4.16.', '4', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.434472', '2023-01-16 11:35:17.000000', '', '17', '用户修改', '3', '', null, null, '1', 'F', '0', '0', 'system:user:edit', '#', '1.4.17.', '4', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.436075', '2023-01-16 11:35:17.000000', '', '18', '用户删除', '4', '', null, null, '1', 'F', '0', '0', 'system:user:remove', '#', '1.4.18.', '4', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.437847', '2023-01-16 11:35:17.000000', '', '19', '用户导出', '5', '', null, null, '1', 'F', '0', '0', 'system:user:export', '#', '1.4.19.', '4', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.439590', '2023-01-16 11:35:17.000000', '', '20', '用户导入', '6', '', null, null, '1', 'F', '0', '0', 'system:user:import', '#', '1.4.20.', '4', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.441327', '2023-01-16 11:35:17.000000', '', '21', '重置密码', '7', '', null, null, '1', 'F', '0', '0', 'system:user:resetPwd', '#', '1.4.21.', '4', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.443415', '2023-01-16 11:35:17.000000', '', '22', '角色查询', '1', '', null, null, '1', 'F', '0', '0', 'system:role:query', '#', '1.5.22.', '5', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.445096', '2023-01-16 11:35:17.000000', '', '23', '角色新增', '2', '', null, null, '1', 'F', '0', '0', 'system:role:add', '#', '1.5.23.', '5', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.446669', '2023-01-16 11:35:17.000000', '', '24', '角色修改', '3', '', null, null, '1', 'F', '0', '0', 'system:role:edit', '#', '1.5.24.', '5', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.448225', '2023-01-16 11:35:17.000000', '', '25', '角色删除', '4', '', null, null, '1', 'F', '0', '0', 'system:role:remove', '#', '1.5.25.', '5', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.449790', '2023-01-16 11:35:17.000000', '', '26', '菜单查询', '1', '', null, null, '1', 'F', '0', '0', 'system:menu:query', '#', '1.6.26.', '6', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.451476', '2023-01-16 11:35:17.000000', '', '27', '菜单新增', '2', '', null, null, '1', 'F', '0', '0', 'system:menu:add', '#', '1.6.27.', '6', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.453462', '2023-01-16 11:35:17.000000', '', '28', '菜单修改', '3', '', null, null, '1', 'F', '0', '0', 'system:menu:edit', '#', '1.6.28.', '6', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.455110', '2023-01-16 11:35:17.000000', '', '29', '菜单删除', '4', '', null, null, '1', 'F', '0', '0', 'system:menu:remove', '#', '1.6.29.', '6', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.456866', '2023-01-16 11:35:17.000000', '', '30', '部门查询', '1', '', null, null, '1', 'F', '0', '0', 'system:dept:query', '#', '1.7.30.', '7', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.459044', '2023-01-16 11:35:17.000000', '', '31', '部门新增', '2', '', null, null, '1', 'F', '0', '0', 'system:dept:add', '#', '1.7.31.', '7', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.461136', '2023-01-16 11:35:17.000000', '', '32', '部门修改', '3', '', null, null, '1', 'F', '0', '0', 'system:dept:edit', '#', '1.7.32.', '7', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.463219', '2023-01-16 11:35:17.000000', '', '33', '部门删除', '4', '', null, null, '1', 'F', '0', '0', 'system:dept:remove', '#', '1.7.33.', '7', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.465120', '2023-01-16 11:35:17.000000', '', '34', '公告新增', '2', '', null, null, '1', 'F', '0', '0', 'system:notice:add', '#', '1.11.34.', '11', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.467050', '2023-01-16 11:35:17.000000', '', '35', '公告查询', '1', '', null, null, '1', 'F', '0', '0', 'system:notice:query', '#', '1.11.35.', '11', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.468696', '2023-01-16 11:35:17.000000', '', '36', '公告修改', '3', '', null, null, '1', 'F', '0', '0', 'system:notice:edit', '#', '1.11.36.', '11', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 10:43:24.470360', '2023-01-16 11:35:17.000000', '', '37', '公告删除', '4', '', null, null, '1', 'F', '0', '0', 'system:notice:remove', '#', '1.11.37.', '11', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 13:42:28.347454', '2023-01-16 11:35:17.000000', '', '38', '岗位查询', '1', '', null, null, '1', 'F', '0', '0', 'system:post:query', '#', '1.8.38.', '8', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 13:42:49.571121', '2023-01-16 11:35:17.000000', '', '39', '岗位新增', '2', '', null, null, '1', 'F', '0', '0', 'system:post:add', '#', '1.8.39.', '8', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 13:43:08.812751', '2023-01-16 11:35:17.000000', '', '40', '岗位修改', '3', '', null, null, '1', 'F', '0', '0', 'system:post:edit', '#', '1.8.40.', '8', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 13:43:42.637215', '2023-01-16 11:35:17.000000', '', '41', '岗位删除', '4', '', null, null, '1', 'F', '0', '0', 'system:post:remove', '#', '1.8.41.', '8', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-22 13:45:04.046592', '2023-01-16 11:35:17.000000', '', '42', '岗位导出', '5', '', null, null, '1', 'F', '0', '0', 'system:post:export', '#', '1.8.42.', '8', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-23 21:10:14.216043', '2023-01-16 11:34:54.000000', '', '43', '在线用户', '1', 'online', 'monitor/online/index', null, '1', 'C', '0', '0', 'monitor:online:list', 'online', '2.43.', '2', '1', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-24 11:19:41.071246', '2023-01-29 15:57:10.000000', '', '44', '表单构建', '1', 'build', 'tool/build/index', null, '1', 'C', '1', '0', 'tool:build:list', 'build', '3.44.', '3', '2', '', 'admin', '0');
INSERT INTO `menu` VALUES ('2021-12-24 11:20:27.949679', '2023-01-16 11:34:45.000000', '', '45', '系统接口', '2', 'swagger', 'tool/swagger/index', null, '1', 'C', '0', '0', 'tool:swagger:list', 'swagger', '3.45.', '3', '1', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-24 11:53:23.946743', '2023-01-16 11:34:54.000000', '', '46', '定时任务', '2', 'job', 'monitor/job/index', null, '1', 'C', '0', '0', 'monitor:job:list', 'job', '2.46.', '2', '1', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-24 11:55:16.294232', '2023-01-16 11:34:54.000000', '', '48', '服务监控', '4', 'server', 'monitor/server/index', null, '1', 'C', '0', '0', 'monitor:server:list', 'server', '2.48.', '2', '1', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 14:58:27.385651', '2023-01-16 11:35:17.000000', '', '49', '字典查询', '1', '', null, null, '1', 'F', '0', '0', 'system:dict:query', '#', '1.9.49.', '9', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 14:59:15.101581', '2023-01-16 11:35:17.000000', '', '50', '字典新增', '2', '', null, null, '1', 'F', '0', '0', 'system:dict:add', '#', '1.9.50.', '9', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:01:07.839872', '2023-01-16 11:35:17.000000', '', '51', '字典修改', '3', '', null, null, '1', 'F', '0', '0', 'system:dict:edit', '#', '1.9.51.', '9', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:03:36.875756', '2023-01-16 11:35:17.000000', '', '52', '字典删除', '4', '', null, null, '1', 'F', '0', '0', 'system:dict:remove', '#', '1.9.52.', '9', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:06:53.986748', '2023-01-16 11:35:17.000000', '', '53', '字典导出', '5', '', null, null, '1', 'F', '0', '0', 'system:dict:export', '#', '1.9.53.', '9', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:07:37.134365', '2023-01-16 11:35:17.000000', '', '54', '参数查询', '1', '', null, null, '1', 'F', '0', '0', 'system:config:query', '#', '1.10.54.', '10', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:15:50.914599', '2023-01-16 11:35:17.000000', '', '55', '参数新增', '2', '', null, null, '1', 'F', '0', '0', 'system:config:add', '#', '1.10.55.', '10', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:29:36.089648', '2023-01-16 11:35:17.000000', '', '56', '参数修改', '3', '', null, null, '1', 'F', '0', '0', 'system:config:edit', '#', '1.10.56.', '10', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:30:04.673290', '2023-01-16 11:35:17.000000', '', '57', '参数删除', '4', '', null, null, '1', 'F', '0', '0', 'system:config:remove', '#', '1.10.57.', '10', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:30:32.500905', '2023-01-16 11:35:17.000000', '', '58', '参数导出', '5', '', null, null, '1', 'F', '0', '0', 'system:config:export', '#', '1.10.58.', '10', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:31:40.135159', '2023-01-16 11:35:17.000000', '', '59', '操作查询', '1', '', null, null, '1', 'F', '0', '0', 'monitor:operlog:query', '#', '1.12.13.59.', '13', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:33:25.097943', '2023-01-16 11:35:17.000000', '', '60', '操作删除', '2', '', null, null, '1', 'F', '0', '0', 'monitor:operlog:remove', '#', '1.12.13.60.', '13', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:33:57.738551', '2023-01-16 11:35:17.000000', '', '61', '日志导出', '4', '', null, null, '1', 'F', '0', '0', 'monitor:operlog:export', '#', '1.12.13.61.', '13', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:34:24.310074', '2023-01-16 11:35:17.000000', '', '62', '登录查询', '1', '', null, null, '1', 'F', '0', '0', 'monitor:logininfor:query', '#', '1.12.14.62.', '14', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:34:36.220728', '2023-01-16 11:35:17.000000', '', '63', '登录删除', '2', '', null, null, '1', 'F', '0', '0', 'monitor:logininfor:remove', '#', '1.12.14.63.', '14', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:34:46.269560', '2023-01-16 11:35:17.000000', '', '64', '日志导出', '3', '', null, null, '1', 'F', '0', '0', 'monitor:logininfor:export', '#', '1.12.14.64.', '14', '3', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:35:26.165014', '2023-01-16 11:34:54.000000', '', '65', '在线查询', '1', '', null, null, '1', 'F', '0', '0', 'monitor:online:query', '#', '2.43.65.', '43', '1', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:35:40.022195', '2023-01-16 11:34:54.000000', '', '66', '批量强退', '2', '', null, null, '1', 'F', '0', '0', 'monitor:online:batchLogout', '#', '2.43.66.', '43', '1', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:35:50.997042', '2023-01-16 11:34:54.000000', '', '67', '单条强退', '3', '', null, null, '1', 'F', '0', '0', 'monitor:online:forceLogout', '#', '2.43.67.', '43', '1', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:36:12.590058', '2023-01-16 11:34:54.000000', '', '68', '任务查询', '1', '', null, null, '1', 'F', '0', '0', 'monitor:job:query', '#', '2.46.68.', '46', '1', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:36:25.111759', '2023-01-16 11:34:54.000000', '', '69', '任务新增', '2', '', null, null, '1', 'F', '0', '0', 'monitor:job:add', '#', '2.46.69.', '46', '1', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:36:36.070927', '2023-01-16 11:34:54.000000', '', '70', '任务修改', '3', '', null, null, '1', 'F', '0', '0', '	 monitor:job:edit', '#', '2.46.70.', '46', '1', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:36:47.605200', '2023-01-16 11:34:54.000000', '', '71', '任务删除', '4', '', null, null, '1', 'F', '0', '0', 'monitor:job:remove', '#', '2.46.71.', '46', '1', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:36:57.920063', '2023-01-16 11:34:54.000000', '', '72', '状态修改', '5', '', null, null, '1', 'F', '0', '0', 'monitor:job:changeStatus', '#', '2.46.72.', '46', '1', '', '', '0');
INSERT INTO `menu` VALUES ('2021-12-29 15:37:31.201464', '2023-01-16 11:34:54.000000', '', '73', '任务导出', '7', '', null, null, '1', 'F', '0', '0', 'monitor:job:export', '#', '2.46.73.', '46', '1', '', '', '0');
INSERT INTO `menu` VALUES ('2022-12-12 09:49:33.159344', '2023-01-16 11:35:12.000000', '', '75', '基础数据', '7', 'basic', null, null, '1', 'M', '0', '0', null, 'tab', '75.', null, '6', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2022-12-12 09:50:36.461669', '2023-01-16 11:35:12.000000', '', '76', '国家管理', '1', 'country', 'basic/country/index', null, '1', 'C', '0', '0', null, 'peoples', '75.76.', '75', '7', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2022-12-13 15:41:19.276369', '2023-01-16 11:35:12.000000', '', '77', '语言管理', '2', 'language', 'basic/language/index', null, '1', 'C', '0', '0', null, 'nested', '75.77.', '75', '5', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2022-12-15 09:11:59.003031', '2023-01-16 11:35:12.000000', '', '78', '类型管理', '3', 'genre', 'basic/genre/index', null, '1', 'C', '0', '0', null, 'row', '75.78.', '75', '4', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2022-12-15 14:33:20.467512', '2023-01-16 11:35:12.000000', '', '81', '影人职务', '4', 'profession', 'basic/profession/index', null, '1', 'C', '0', '0', null, 'peoples', '75.81.', '75', '4', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2022-12-23 11:43:21.983871', '2023-01-16 11:35:12.000000', '', '82', '家长引导', '5', 'level', 'basic/level/index', null, '1', 'C', '0', '0', null, 'server', '75.82.', '75', '5', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2023-01-03 11:18:45.811457', '2023-03-10 02:07:57.000000', '', '83', '影视管理', '2', 'movie', null, null, '1', 'M', '0', '0', null, 'dashboard', '83.', null, '6', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2023-01-03 11:19:59.404544', '2023-03-10 02:07:57.000000', '', '84', '影视列表', '1', 'movie-list', 'movie/list/index', null, '1', 'C', '0', '0', null, 'list', '83.84.', '83', '8', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2023-01-16 11:34:19.085563', '2023-01-16 13:36:51.000000', '', '85', '影人管理', '2', 'actor', null, null, '1', 'M', '0', '0', null, 'people', '85.', null, '4', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2023-01-16 11:36:28.628486', '2023-01-16 13:43:34.000000', '', '86', '影人列表', '1', 'actor-list', 'actor/list/index', null, '1', 'C', '0', '0', null, 'list', '85.86.', '85', '5', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2023-01-18 15:04:41.398064', '2023-01-18 15:18:41.000000', '', '87', '角色管理', '3', 'movie-role', null, null, '1', 'M', '0', '0', null, 'peoples', '87.', null, '4', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2023-01-18 15:05:32.159621', '2023-01-18 15:18:41.000000', '', '88', '角色列表', '1', 'role-list', 'role/list/index', null, '1', 'C', '0', '0', null, 'list', '87.88.', '87', '6', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2023-01-29 16:23:37.631133', '2023-01-29 16:23:37.000000', '', '89', '视频管理', '4', 'video', null, null, '1', 'M', '0', '0', null, 'redis-list', '89.', null, '2', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2023-01-29 16:24:36.349283', '2023-01-29 16:24:36.000000', '', '90', '视频列表', '1', 'list', 'video/list/index', null, '1', 'C', '0', '0', null, 'list', '89.90.', '89', '2', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2023-02-23 16:10:38.447932', '2023-02-23 16:10:38.000000', '', '91', '横幅管理', '5', 'banner', 'basic/banner/index', null, '1', 'C', '0', '0', null, 'druid', '75.91.', '75', '2', 'admin', 'admin', '0');
INSERT INTO `menu` VALUES ('2023-03-10 02:07:04.137187', '2023-03-10 02:07:04.000000', '', '92', '栏目管理', '1', 'column', 'column/index', null, '1', 'C', '0', '0', null, 'tree-table', '92.', null, '2', 'admin', 'admin', '0');

-- ----------------------------
-- Table structure for movie_basic
-- ----------------------------
DROP TABLE IF EXISTS `movie_basic`;
CREATE TABLE `movie_basic` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态： -9: 处理中 -8: 待完善 -7: 待审核 -1: 隐藏 0: 正常 1: 锁定',
  `release_status` int(11) NOT NULL DEFAULT '0' COMMENT '上映状态: 0: 无 1: 即将上映 2: 正在热映',
  `title` varchar(50) NOT NULL COMMENT '中文名',
  `bg_color` varchar(100) DEFAULT NULL COMMENT '背景色',
  `title_en` varchar(100) DEFAULT NULL COMMENT '英文名',
  `title_original` varchar(100) DEFAULT NULL COMMENT '影视原名',
  `akas` varchar(100) DEFAULT NULL COMMENT '别名',
  `genres` varchar(100) DEFAULT NULL COMMENT '所属类型',
  `pubdate` datetime DEFAULT NULL COMMENT '首映时间',
  `duration` varchar(100) DEFAULT NULL COMMENT '上映版片长',
  `versions` varchar(100) DEFAULT NULL COMMENT '银幕',
  `durations` varchar(100) DEFAULT NULL COMMENT '片长',
  `egg_hunt` int(11) DEFAULT NULL COMMENT '彩蛋个数',
  `color` int(11) DEFAULT NULL COMMENT '色彩 0: 彩色  1：黑白',
  `season_count` int(11) DEFAULT NULL COMMENT '总季数',
  `current_season` int(11) DEFAULT NULL COMMENT '当前季',
  `episode_count` int(11) DEFAULT NULL COMMENT '总集数',
  `current_episode` int(11) DEFAULT NULL COMMENT '当前集数',
  `the_end` int(11) DEFAULT NULL COMMENT '是否完结 0：否  1：是',
  `country_ids` varchar(100) DEFAULT NULL COMMENT '国家/地区',
  `languages` varchar(100) DEFAULT NULL COMMENT '语言',
  `tags` varchar(100) DEFAULT NULL COMMENT '标签',
  `summary` varchar(1000) DEFAULT NULL COMMENT '简介',
  `year` int(11) DEFAULT NULL COMMENT '年代',
  `poster` varchar(300) DEFAULT NULL COMMENT '海报',
  `release_date` varchar(255) DEFAULT NULL COMMENT '上映日期',
  `column_value` varchar(255) NOT NULL COMMENT '影视分类',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of movie_basic
-- ----------------------------
INSERT INTO `movie_basic` VALUES ('2023-01-06 10:34:12.138120', '2023-03-10 07:16:11.000000', 'admin', 'admin', '', '11', '4', '0', '0', '千与千寻', '#AD1D1D', '千と千尋の神隠し', null, '神隐少女(台),千与千寻的神隐,SpiritedAway,AVoyageofChihiro,SentoChihironokamikakushi', '日本动漫', null, '125', null, null, '0', '0', '0', '0', '0', '0', '0', '9', '日语,国语', '日本,动画,成长', '千寻和爸爸妈妈一同驱车前往新家，在郊外的小路上不慎进入了神秘的隧道——他们去到了另外一个诡异世界—一个中世纪的小镇。远处飘来食物的香味，爸爸妈妈大快朵颐，孰料之后变成了猪！这时小镇上渐渐来了许多样子古怪、半透明的人。 &lt;br /&gt; 　　千寻仓皇逃出，一个叫小白的人救了他，喂了她阻止身体消 失的药，并且告诉她怎样去找锅炉爷爷以及汤婆婆，而且必须获得一份工作才能不被魔法变成别的东西。 &lt;br /&gt; 　　千寻在小白的帮助下幸运地获得了一份在浴池打杂的工作。渐渐她不再被那些怪模怪样的人吓倒，并从小玲那儿知道了小白是凶恶的汤婆婆的弟子。 &lt;br /&gt; 　　一次，千寻发现小白被一群白色飞舞的纸人打伤，为了救受伤的小白，她用河神送给她的药丸驱出了小白身体内的封印以及守封印的小妖精，但小白还是没有醒过来。 &lt;br /&gt; 　　为了救小白，千寻又踏上了她的冒险之旅。 ', '2001', 'http://127.0.0.1:4000/upload/2023-03-03/1677832081824-94627776-p2888647044 (1).jpg', null, 'cartoon');
INSERT INTO `movie_basic` VALUES ('2023-02-21 10:42:24.484819', '2023-03-10 07:15:59.000000', 'admin', 'admin', '', '10', '25', '0', '0', '斗破苍穹特别篇1', '#4E2477', null, null, '斗破苍穹动画特别篇', '国产动漫', null, '23', null, null, '0', '0', null, null, '2', '0', '1', '1', '国语', '国产,小说动漫,动作,玄幻', '萧炎，萧家历史上空前绝后的斗气修炼天才。家族百年之内最年轻的斗者！三年之前，这名声望达到巅峰的天才少年，却是突兀的接受到了有生以来最残酷的打击，他辛辛苦苦修炼十数载方才凝聚的斗之气旋，一夜之间，化为乌有，而且体内的斗之气，也是随着时间的流逝，诡异地变得越来越少导致其实力不断地后退。一夜间，沦落成了路人口中嘲笑的废物！种种打击接踵而至，就在他即将绝望的时候，一缕幽魂（药尘又作药老）从他手上的戒指里浮现，一扇全新的大门在面前开启！竟是有一不死魂魄吸收他的斗气，在药老灵魂停止吸收斗气后萧炎终于天赋重展，（有药老帮助）连连突破，震惊全城。重新成为家族年轻一辈中的最强斗者，然而他却不满足于此。 为了一雪退婚带来的耻辱，萧炎来到了魔兽山脉，在药老的帮助下，进一步提升自己的实力……在魔兽山脉，他结识了小医仙（厄难毒体），结为好友，抵御妖兽和企图不轨的敌人。他面向的世界更加宽阔。后又在药老的教导下，成为加玛帝国黑岩城最年轻的二品炼药师，（现已是九品玄丹炼药宗师）。为着他的执着与信念闯荡大陆，向着大陆巅峰强者迈进。年仅29岁便晋级斗帝境界并自封炎帝， 30岁成为斗帝，号“炎帝”。 终于，在萧炎坚持不懈的努力和强大存在的帮助下，重新成为了家族年轻一辈的佼佼者，更游历了整个大陆，挑战无数强大而神秘的邪恶势力与大陆上无数传说中的无敌强者，成为大陆巅峰强者。', '2017', 'http://127.0.0.1:4000/upload/2023-02-27/1677488942365-591658223-1677340235453-578665177-260.jpeg', '', 'cartoon');
INSERT INTO `movie_basic` VALUES ('2023-03-08 09:14:26.332982', '2023-03-10 07:15:46.000000', 'admin', 'admin', '', '2', '32', '0', '2', '钢铁侠', null, null, 'Iron Man', null, '科幻片', '2008-04-14 00:00:00', '126', null, null, '2', '0', '0', '0', '0', '0', '0', '2', '英语', '科幻,漫威,动作', '斯塔克军火公司是美军在全球范围内第一大军火供应商，其新任掌门人托尼•斯塔克（小罗伯特·唐尼 Robert Downey Jr. 饰）风流倜傥，天资聪颖。他与公司元老俄巴迪亚•斯坦（杰夫·布里吉斯 Jeff Bridges 饰）合作无间，共同将斯塔克公司的业务推向顶峰。现 实生活中的托尼热衷收集名贵跑车，搞点儿发明创造，当然露水姻缘更不可少。所幸他身边有维吉尼亚•波茨（格温妮斯·帕特洛 Gwyneth Paltrow 饰）这样的好助手细心打理一切，才让他能自由自在过着贵公子的生活。 &lt;br /&gt; 　　在前往中东为军方展示新型武器的途中，托尼一众遭到恐怖分子袭击。他被弹片击中险些丧命，在英森博士的帮助下，托尼体内移植了一颗核动力的人工心脏。恐怖分子要求托尼制造强大的杀伤性武器，他和英森虚与委蛇，暗中制造了一套由聚变能源驱动的钢铁盔甲。穿上盔甲托尼大闹恐怖分子的基地，回到美国后又对其进行了改进。却不知，接下来有更为黑暗的阴谋等着他…… ', '2008', 'http://127.0.0.1:4000/upload/2023-03-08/1678266753842-457627090-p2888647044 (2).jpg', '2022', 'movie');
INSERT INTO `movie_basic` VALUES ('2023-03-08 14:35:54.673832', '2023-03-10 07:15:35.000000', 'admin', 'admin', '', '5', '33', '0', '0', '陈情令', null, null, null, ' 魔道祖师之陈情令,TheUntamed', '国产剧', null, '45', null, null, null, '0', '0', '0', '50', '0', '0', '1', '国语', '仙侠,小说改编', '十六年前，天下五分，姑苏蓝氏，云梦江氏，清河聂氏，岐山温氏，兰陵金氏共治天下。温氏一家独大，其余四家均受其苦。众家青年中，江氏故人之子魏无羡性格开朗，和以雅正闻名的姑苏蓝氏弟子蓝忘机相识并引为知己。一次偶然的机会，二人发现了蓝氏一直以来守护的秘密，二人继承遗志，为苍生消除隐患。但没想到一切的幕后黑手正是温氏家主温若寒。众家不堪其辱，合力讨伐温氏。温氏覆灭后，魏无羡却为保护温氏无辜之人不惜与众家对立，最终被奸人所害酿成大祸，误害师姐江厌离，自己也不知所踪。十六年后，消失已久的魏无羡出现在莫家庄，偶遇故人蓝忘机。莫家庄一桩桩诡异的凶案显得扑朔迷离。随着真相一步步揭开，身处幕后的金光瑶渐渐难以隐藏。最后金光瑶身死，蓝忘机承担起了匡扶天下的使命，而魏无羡不忘初心，最终潇洒世间。 ', '2019', 'http://127.0.0.1:4000/upload/2023-03-08/1678286172500-777158003-lg6KwxRLqA0nMckvE8Ws6V84fZG1@public.jpeg', null, 'tv');
INSERT INTO `movie_basic` VALUES ('2023-03-14 14:13:09.195190', '2023-03-14 14:13:09.195190', 'admin', 'admin', '', '1', '35', '0', '2', '流浪地球', null, null, null, '流浪地球：飞跃2020特别版 ,TheWanderingEarth', '科幻片', null, '125', null, null, null, '0', '0', '0', '0', '0', '1', '1', '国语', '科幻,太空,灾难', '近未来，科学家们发现太阳急速衰老膨胀，短时间内包括地球在内的整个太阳系都将被太阳所吞没。为了自救，人类提出一个名为“流浪地球”的大胆计划，即倾全球之力在地球表面建造上万座发动机和转向发动机，推动地球离开太阳系，用2500年的时间奔往另外一个栖息之地。中国航天员刘培强（吴京 饰）在儿子刘启四岁那年前往国际空间站，和国际同侪肩负起领航者的重任。转眼刘启（屈楚萧 饰）长大，他带着妹妹朵朵（赵今麦 饰）偷偷跑到地表，偷开外公韩子昂（吴孟达 饰）的运输车，结果不仅遭到逮捕，还遭遇了全球发动机停摆的事件。为了修好发动机，阻止地球坠入木星，全球开始展开饱和式营救，连刘启他们的车也被强征加入。在与时间赛跑的过程中，无数的人前仆后继，奋不顾身，只为延续百代子孙生存的希望…… &lt;br /&gt; 　　本片根据刘慈欣的同名小说改编。 ', '2019', 'http://127.0.0.1:4000/upload/2023-03-14/1678803187059-386070124-lgDJ6sUeKgbF3V8OawwNvjONEQL4@public.jpeg', null, 'movie');
INSERT INTO `movie_basic` VALUES ('2023-03-14 14:21:41.123701', '2023-03-14 14:21:41.123701', 'admin', 'admin', '', '1', '36', '0', '2', '顶斗的季节', null, null, null, null, '韩剧', null, null, null, null, null, null, '0', '0', '0', '0', '0', '8', '韩语', null, '本剧讲述了每99年就来人间给人类下天罚的死神顶斗（金正贤饰）和将自己当作仆人一样使唤的拥有神秘能力的女医生韩季节（林秀香饰）相遇后作为出诊医生工作时发生的奇幻爱情故事', '2023', 'http://127.0.0.1:4000/upload/2023-03-14/1678803651620-917304270-4588dd9f2dc7473da110e5a6f49c477b.jpg', null, 'tv');
INSERT INTO `movie_basic` VALUES ('2023-03-14 14:24:25.814758', '2023-03-14 14:24:25.814758', 'admin', 'admin', '', '1', '37', '0', '2', '天天向上', null, null, null, null, '大陆综艺', null, null, null, null, null, '0', null, null, null, null, '0', '1', '国语', '选秀,生活', '《天天向上》是由湖南卫视打造的大型礼仪公德脱口秀节目2008年8月4日首播节目的主持阵容由汪涵、欧弟、田源、钱枫、俞灏明、矢野浩二、金恩圣（小五）七位天天兄弟组成该节目采用全国第一支偶像男子团体的概念用各种形式来传播中国千年礼仪之邦的礼仪文化节目氛围欢快轻松幽默获得高收视率的同时也受到了广大观众的好评另有同名歌曲、系列丛书《天天向上丛书》及同名电影', '2020', 'http://127.0.0.1:4000/upload/2023-03-14/1678803814533-332383164-986424e23b6c29aa2aa4e72bc9484c5f.jpg', null, 'variety');

-- ----------------------------
-- Table structure for movie_cast
-- ----------------------------
DROP TABLE IF EXISTS `movie_cast`;
CREATE TABLE `movie_cast` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL COMMENT '关联的影视id',
  `actor_id` int(11) NOT NULL COMMENT '关联的影人id',
  `profession_id` int(11) NOT NULL COMMENT '影人类型id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of movie_cast
-- ----------------------------
INSERT INTO `movie_cast` VALUES ('2023-02-27 17:43:09.911801', '2023-02-27 17:43:09.911801', 'admin', 'admin', '', '1', '4', '25', '5', '2');
INSERT INTO `movie_cast` VALUES ('2023-03-03 08:09:06.993288', '2023-03-03 08:09:06.993288', 'admin', 'admin', '', '1', '5', '4', '6', '2');
INSERT INTO `movie_cast` VALUES ('2023-03-03 08:12:53.049245', '2023-03-03 08:12:53.049245', 'admin', 'admin', '', '1', '6', '4', '7', '24');
INSERT INTO `movie_cast` VALUES ('2023-03-03 08:13:14.642989', '2023-03-03 08:13:14.642989', 'admin', 'admin', '', '1', '7', '4', '8', '24');
INSERT INTO `movie_cast` VALUES ('2023-03-08 09:20:02.136201', '2023-03-08 09:20:02.136201', 'admin', 'admin', '', '1', '9', '32', '9', '21');
INSERT INTO `movie_cast` VALUES ('2023-03-08 14:39:53.171040', '2023-03-08 14:39:53.171040', 'admin', 'admin', '', '1', '10', '33', '10', '2');
INSERT INTO `movie_cast` VALUES ('2023-03-08 14:40:05.886370', '2023-03-08 14:40:05.886370', 'admin', 'admin', '', '1', '11', '33', '11', '21');
INSERT INTO `movie_cast` VALUES ('2023-03-14 14:15:55.638126', '2023-03-14 14:15:55.638126', 'admin', 'admin', '', '1', '12', '35', '12', '21');
INSERT INTO `movie_cast` VALUES ('2023-03-14 14:22:04.572472', '2023-03-14 14:22:04.572472', 'admin', 'admin', '', '1', '13', '36', '13', '21');
INSERT INTO `movie_cast` VALUES ('2023-03-14 14:25:50.723001', '2023-03-14 14:25:50.723001', 'admin', 'admin', '', '1', '14', '37', '14', '26');

-- ----------------------------
-- Table structure for movie_level
-- ----------------------------
DROP TABLE IF EXISTS `movie_level`;
CREATE TABLE `movie_level` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL COMMENT '关联的影视id',
  `level_id` int(11) NOT NULL COMMENT '关联的引导等级id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of movie_level
-- ----------------------------
INSERT INTO `movie_level` VALUES ('2023-01-13 17:09:30.620236', '2023-01-16 09:40:01.388529', 'admin', 'admin', '', '1', '1', '1', '4');
INSERT INTO `movie_level` VALUES ('2023-01-16 09:39:31.841035', '2023-01-16 10:44:37.000000', 'admin', 'admin', '', '5', '2', '1', '6');
INSERT INTO `movie_level` VALUES ('2023-01-16 10:46:24.522593', '2023-01-16 10:46:24.522593', 'admin', 'admin', '', '1', '3', '1', '5');
INSERT INTO `movie_level` VALUES ('2023-03-02 14:46:54.666954', '2023-03-02 14:46:54.666954', 'admin', 'admin', '', '1', '7', '25', '1');
INSERT INTO `movie_level` VALUES ('2023-03-03 08:07:05.006227', '2023-03-03 08:07:05.006227', 'admin', 'admin', '', '1', '9', '4', '16');
INSERT INTO `movie_level` VALUES ('2023-03-03 08:07:13.880503', '2023-03-03 08:07:13.880503', 'admin', 'admin', '', '1', '10', '4', '12');
INSERT INTO `movie_level` VALUES ('2023-03-08 09:15:55.527835', '2023-03-08 09:15:55.527835', 'admin', 'admin', '', '1', '11', '32', '9');

-- ----------------------------
-- Table structure for movie_pub_date
-- ----------------------------
DROP TABLE IF EXISTS `movie_pub_date`;
CREATE TABLE `movie_pub_date` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pub_date` date NOT NULL COMMENT '上映日期',
  `country_id` int(11) NOT NULL COMMENT '国家Id',
  `movie_id` int(11) NOT NULL COMMENT '关联的影视id',
  `premiere` varchar(255) NOT NULL DEFAULT '1' COMMENT '首映/重映',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of movie_pub_date
-- ----------------------------
INSERT INTO `movie_pub_date` VALUES ('2023-01-12 14:44:22.065263', '2023-01-12 15:53:01.000000', 'admin', 'admin', '', '3', '1', '2023-01-12', '1', '1', '1');
INSERT INTO `movie_pub_date` VALUES ('2023-01-12 14:45:08.042005', '2023-01-12 15:53:11.000000', 'admin', 'admin', '美国上映', '3', '2', '2023-01-11', '2', '1', '1');
INSERT INTO `movie_pub_date` VALUES ('2023-02-27 17:19:30.606693', '2023-02-27 17:22:22.000000', 'admin', 'admin', '', '4', '4', '2017-02-27', '1', '25', '0');
INSERT INTO `movie_pub_date` VALUES ('2023-03-08 09:14:55.834466', '2023-03-08 09:15:04.000000', 'admin', 'admin', '(London) (premiere)', '2', '5', '2008-04-24', '5', '32', '0');
INSERT INTO `movie_pub_date` VALUES ('2023-03-08 09:15:21.679735', '2023-03-08 09:15:21.679735', 'admin', 'admin', '(Hollywood, California) (premiere)', '1', '6', '2008-04-30', '2', '32', '0');
INSERT INTO `movie_pub_date` VALUES ('2023-03-08 09:15:39.779718', '2023-03-08 09:15:39.779718', 'admin', 'admin', '', '1', '7', '2008-04-30', '1', '32', '1');

-- ----------------------------
-- Table structure for movie_pv
-- ----------------------------
DROP TABLE IF EXISTS `movie_pv`;
CREATE TABLE `movie_pv` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `pv` int(11) NOT NULL DEFAULT '0' COMMENT '访问量',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movieId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_692eb1441d63362797c2f1a37a` (`movieId`),
  CONSTRAINT `FK_692eb1441d63362797c2f1a37a2` FOREIGN KEY (`movieId`) REFERENCES `movie_basic` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of movie_pv
-- ----------------------------
INSERT INTO `movie_pv` VALUES ('2023-03-06 14:14:23.000000', '2023-03-14 13:59:44.000000', '', '', '', '28', '30', '2', '25');
INSERT INTO `movie_pv` VALUES ('2023-03-06 14:15:24.000000', '2023-03-14 13:59:41.000000', '', '', '', '16', '15', '3', '4');
INSERT INTO `movie_pv` VALUES ('2023-03-08 09:14:26.382677', '2023-03-14 13:59:36.000000', '', '', '', '26', '25', '9', '32');
INSERT INTO `movie_pv` VALUES ('2023-03-08 14:35:54.748764', '2023-03-14 13:50:32.000000', '', '', '', '15', '14', '10', '33');
INSERT INTO `movie_pv` VALUES ('2023-03-14 14:13:09.265045', '2023-03-14 14:16:13.000000', '', '', '', '3', '2', '12', '35');
INSERT INTO `movie_pv` VALUES ('2023-03-14 14:21:41.195689', '2023-03-14 14:22:11.000000', '', '', '', '2', '1', '13', '36');
INSERT INTO `movie_pv` VALUES ('2023-03-14 14:24:25.878776', '2023-03-14 14:25:58.000000', '', '', '', '2', '1', '14', '37');

-- ----------------------------
-- Table structure for movie_role
-- ----------------------------
DROP TABLE IF EXISTS `movie_role`;
CREATE TABLE `movie_role` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '封面',
  `name` varchar(255) NOT NULL COMMENT '角色名',
  `akas` varchar(255) NOT NULL DEFAULT '' COMMENT '别名',
  `name_en` varchar(255) NOT NULL DEFAULT '' COMMENT '外文名',
  `age` varchar(255) NOT NULL DEFAULT '' COMMENT '年龄',
  `blood` varchar(255) NOT NULL DEFAULT '' COMMENT '血型',
  `height` varchar(255) NOT NULL DEFAULT '' COMMENT '身高',
  `weight` varchar(255) NOT NULL DEFAULT '' COMMENT '体重',
  `tags` varchar(255) NOT NULL DEFAULT '' COMMENT '标签',
  `type` varchar(2) NOT NULL COMMENT '类型',
  `sex` varchar(1) NOT NULL DEFAULT '3' COMMENT '性别',
  `brief` text COMMENT '简介',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of movie_role
-- ----------------------------
INSERT INTO `movie_role` VALUES ('2023-01-18 17:26:49.439807', '2023-02-27 16:22:40.000000', 'admin', 'admin', '', '9', '3', 'http://127.0.0.1:4000/upload/2023-02-27/1677486078290-767024937-1677341936947-597432132-541b-b5204948f4e7aa0958167126c6dbbce5.jpg', '萧炎', '药岩', '', '', '', '', '', '', '5', '1', null);
INSERT INTO `movie_role` VALUES ('2023-02-20 11:32:31.322922', '2023-02-27 14:46:36.000000', 'admin', 'admin', '', '4', '5', 'http://127.0.0.1:4000/upload/2023-02-27/1677508407693-525176864-093119ytg8ikmgkbtkjtt1.jpg', '云韵', '云芝', '', '', '', '', '', '', '5', '2', null);
INSERT INTO `movie_role` VALUES ('2023-02-27 14:41:31.421536', '2023-02-27 14:46:41.000000', 'admin', 'admin', '', '3', '6', 'http://127.0.0.1:4000/upload/2023-02-27/1677508815916-510977609-æªå±2023-02-27 22.38.48.png', '药老', '药尘', '', '', '', '', '', '', '5', '1', null);
INSERT INTO `movie_role` VALUES ('2023-03-08 09:06:05.788813', '2023-03-08 09:06:05.788813', 'admin', 'admin', '', '1', '7', 'http://127.0.0.1:4000/upload/2023-03-08/1678266325369-24694625-1.jpg', '托尼·斯塔克', '', 'Tony Stark', '', 'O', '1.85米', '102kg', '', '2', '1', '托尼·史塔克（Tony Stark，全名：安东尼·爱德华·“托尼”·史塔克（Anthony Edward \'Tony\' Stark）），男，出生于1970年5月29日，即初代钢铁侠（Iron Man），是美国漫威漫画旗下的超级英雄，初次登场于《悬疑故事》第39期（1963年3月），由斯坦·李、赖瑞·理柏、唐·赫克和杰克·科比联合创造。托尼·史塔克是斯塔克工业（STARK INDUSTRIES）的CEO，因一场阴谋绑架中，胸部遭弹片穿入，生命危在旦夕，为了挽救自己的性命，在同被绑架的物理学家何·银森（Ho Yinsen）的协助下托尼制造方舟反应炉（Arc Reactor）从而逃过一劫，利用方舟反应炉作为能量运转的来源，暗中制造了一套装甲（Mark1）杀出重围后逃脱，后参与创立复仇者联盟。');

-- ----------------------------
-- Table structure for movie_role_actor
-- ----------------------------
DROP TABLE IF EXISTS `movie_role_actor`;
CREATE TABLE `movie_role_actor` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NOT NULL COMMENT '关联的影视id',
  `roleId` int(11) NOT NULL COMMENT '关联的角色id',
  `actorId` int(11) DEFAULT NULL COMMENT '关联的演员id',
  `avatar` varchar(255) DEFAULT NULL COMMENT '封面',
  `brief` varchar(255) NOT NULL DEFAULT '' COMMENT '简介',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of movie_role_actor
-- ----------------------------
INSERT INTO `movie_role_actor` VALUES ('2023-01-19 10:40:35.668155', '2023-02-22 14:49:29.000000', 'admin', 'admin', '', '5', '1', '1', '3', '3', '', '');
INSERT INTO `movie_role_actor` VALUES ('2023-02-27 17:28:11.663407', '2023-02-27 17:28:11.663407', 'admin', 'admin', '', '1', '2', '25', '3', null, null, '');
INSERT INTO `movie_role_actor` VALUES ('2023-02-27 14:33:50.260407', '2023-02-27 14:33:50.260407', 'admin', 'admin', '', '1', '3', '25', '5', null, null, '');
INSERT INTO `movie_role_actor` VALUES ('2023-02-27 14:41:56.568308', '2023-02-27 14:41:56.568308', 'admin', 'admin', '', '1', '4', '25', '6', null, null, '');
INSERT INTO `movie_role_actor` VALUES ('2023-03-08 09:16:41.509910', '2023-03-08 09:16:41.509910', 'admin', 'admin', '', '1', '5', '32', '7', '9', null, '');

-- ----------------------------
-- Table structure for movie_videos
-- ----------------------------
DROP TABLE IF EXISTS `movie_videos`;
CREATE TABLE `movie_videos` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cover` varchar(255) NOT NULL DEFAULT '' COMMENT '封面',
  `sort` int(11) NOT NULL DEFAULT '1' COMMENT '排序',
  `title` varchar(200) NOT NULL COMMENT '标题',
  `movie_id` int(11) NOT NULL COMMENT '关联的影视id',
  `type_id` varchar(255) NOT NULL COMMENT '分类Id',
  `status` varchar(255) NOT NULL DEFAULT '0' COMMENT '状态',
  `movieIdId` int(11) DEFAULT NULL,
  `videoId` int(11) NOT NULL COMMENT '关联的视频',
  PRIMARY KEY (`id`),
  KEY `FK_e6d3332e408e4ba0c22fb98fa28` (`movieIdId`),
  KEY `FK_bc98e3ccd65fb1a0cfad5d9ee73` (`videoId`),
  CONSTRAINT `FK_bc98e3ccd65fb1a0cfad5d9ee73` FOREIGN KEY (`videoId`) REFERENCES `video` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e6d3332e408e4ba0c22fb98fa28` FOREIGN KEY (`movieIdId`) REFERENCES `movie_basic` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of movie_videos
-- ----------------------------
INSERT INTO `movie_videos` VALUES ('2023-03-06 03:39:17.173108', '2023-03-06 03:39:17.173108', 'admin', 'admin', '', '1', '14', '', '1', '第一', '25', '1', '0', '25', '24');
INSERT INTO `movie_videos` VALUES ('2023-03-06 03:44:37.122971', '2023-03-06 03:44:37.122971', 'admin', 'admin', '', '1', '15', '', '1', '东二', '25', '1', '0', '25', '24');
INSERT INTO `movie_videos` VALUES ('2023-03-08 09:17:02.848219', '2023-03-08 09:17:02.848219', 'admin', 'admin', '', '1', '17', '', '1', '钢铁侠1', '32', '1', '0', '32', '24');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `notice_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '公告id',
  `notice_title` varchar(50) NOT NULL COMMENT '公告标题',
  `notice_type` char(1) NOT NULL COMMENT '公告类型（1通知 2公告）',
  `notice_content` longtext COMMENT '公告内容',
  `status` char(1) NOT NULL DEFAULT '0' COMMENT '公告状态（0正常 1关闭）',
  `version` int(11) NOT NULL COMMENT '版本号',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`notice_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of notice
-- ----------------------------

-- ----------------------------
-- Table structure for oper_log
-- ----------------------------
DROP TABLE IF EXISTS `oper_log`;
CREATE TABLE `oper_log` (
  `oper_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '日志主键',
  `title` varchar(50) NOT NULL DEFAULT '' COMMENT '模块标题',
  `business_type` char(1) NOT NULL DEFAULT '0' COMMENT '业务类型',
  `method` varchar(100) NOT NULL DEFAULT '' COMMENT '方法名称',
  `request_method` varchar(10) NOT NULL DEFAULT '' COMMENT '请求方式',
  `operator_type` char(1) NOT NULL DEFAULT '0' COMMENT '操作类别（0其它 1后台用户 2手机端用户）',
  `oper_name` varchar(50) NOT NULL DEFAULT '' COMMENT '操作人员',
  `dept_name` varchar(50) NOT NULL DEFAULT '' COMMENT '部门名称',
  `oper_url` varchar(255) NOT NULL DEFAULT '' COMMENT '请求URL',
  `oper_ip` varchar(128) NOT NULL DEFAULT '' COMMENT '主机地址',
  `oper_location` varchar(255) NOT NULL DEFAULT '' COMMENT '操作地点',
  `oper_param` varchar(2000) NOT NULL DEFAULT '' COMMENT '请求参数',
  `json_result` varchar(2000) NOT NULL DEFAULT '' COMMENT '返回参数',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '操作状态（0正常 1异常）',
  `errorMsg` varchar(2000) NOT NULL DEFAULT '' COMMENT '返回参数',
  `oper_time` datetime NOT NULL COMMENT '操作时间',
  PRIMARY KEY (`oper_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of oper_log
-- ----------------------------
INSERT INTO `oper_log` VALUES ('1', '用户管理', '2', 'UserController.add()', 'POST', '0', 'admin', '淳渔总部', '/system/user', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"userName\":\"test\",\"nickName\":\"test\",\"password\":\"123123\",\"status\":\"0\",\"postIds\":[],\"roleIds\":[]}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', '', '2022-12-12 15:56:30');
INSERT INTO `oper_log` VALUES ('2', '用户管理', '2', 'UserController.add()', 'POST', '0', 'admin', '淳渔总部', '/system/user', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"userName\":\"test\",\"nickName\":\"test\",\"password\":\"123123\",\"status\":\"0\",\"postIds\":[],\"roleIds\":[]}}', '{\"code\":500,\"msg\":\"该用户名已存在，请更换\"}', '1', '该用户名已存在，请更换', '2022-12-12 15:56:36');
INSERT INTO `oper_log` VALUES ('3', '用户管理', '4', 'UserController.delete()', 'DELETE', '0', 'admin', '淳渔总部', '/system/user/2', '127.0.0.1', '内网IP', '{\"params\":{\"userIds\":\"2\"},\"query\":{},\"body\":{}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', '', '2022-12-13 15:17:15');
INSERT INTO `oper_log` VALUES ('4', '用户管理', '2', 'UserController.add()', 'POST', '0', 'admin', '淳渔总部', '/system/user', '::1', '湖南省 长沙市', '{\"params\":{},\"query\":{},\"body\":{\"deptId\":1,\"userName\":\"test\",\"nickName\":\"test\",\"password\":\"111111\",\"status\":\"0\",\"postIds\":[1],\"roleIds\":[1]}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', '', '2022-12-14 11:43:57');
INSERT INTO `oper_log` VALUES ('5', '部门管理', '2', 'DeptController.add()', 'POST', '0', 'admin', '淳渔总部', '/system/dept', '::1', '湖南省 长沙市', '{\"params\":{},\"query\":{},\"body\":{\"parentId\":1,\"deptName\":\"test\",\"orderNum\":0,\"status\":\"0\"}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', '', '2022-12-15 11:25:30');
INSERT INTO `oper_log` VALUES ('6', '部门管理', '3', 'DeptController.update()', 'PUT', '0', 'admin', '淳渔总部', '/system/dept', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"createTime\":\"2022-12-15T03:25:29.948Z\",\"deptId\":2,\"deptName\":\"test11\",\"orderNum\":0,\"leader\":null,\"phone\":null,\"email\":null,\"status\":\"0\",\"parentId\":\"1\"}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', '', '2023-03-03 13:49:48');
INSERT INTO `oper_log` VALUES ('7', '部门管理', '3', 'DeptController.update()', 'PUT', '0', 'admin', '淳渔总部', '/system/dept', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"createTime\":\"2022-12-15T03:25:29.948Z\",\"deptId\":2,\"deptName\":\"test\",\"orderNum\":0,\"leader\":null,\"phone\":null,\"email\":null,\"status\":\"0\",\"parentId\":1}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', '', '2023-03-03 14:00:50');
INSERT INTO `oper_log` VALUES ('8', '部门管理', '3', 'DeptController.update()', 'PUT', '0', 'admin', '淳渔总部', '/system/dept', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"createTime\":\"2022-12-15T03:25:29.948Z\",\"deptId\":2,\"deptName\":\"test\",\"orderNum\":0,\"leader\":null,\"phone\":null,\"email\":null,\"status\":\"0\",\"parentId\":1}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', '', '2023-03-03 14:13:55');
INSERT INTO `oper_log` VALUES ('9', '部门管理', '3', 'DeptController.update()', 'PUT', '0', 'admin', '淳渔总部', '/system/dept', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"createTime\":\"2022-12-15T03:25:29.948Z\",\"deptId\":2,\"deptName\":\"test\",\"orderNum\":0,\"leader\":null,\"phone\":null,\"email\":null,\"status\":\"0\",\"parentId\":1}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', '', '2023-03-03 14:17:51');
INSERT INTO `oper_log` VALUES ('10', '角色管理', '2', 'RoleController.add()', 'POST', '0', 'admin', '淳渔总部', '/system/role', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"roleName\":\"管理员\",\"roleKey\":\"admin2\",\"roleSort\":1,\"status\":\"0\",\"menuIds\":[75,76,77,78,81,82,91,1,4,15,16,17,18,19,20,21,5,22,23,24,25,6,26,27,28,29,7,30,31,32,33,8,38,39,40,41,42,9,49,50,51,52,53,10,54,55,56,57,58,11,35,34,36,37,12,13,59,60,61,14,62,63,64],\"deptIds\":[],\"menuCheckStrictly\":true,\"deptCheckStrictly\":true}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', '', '2023-03-06 10:39:39');
INSERT INTO `oper_log` VALUES ('11', '用户管理', '3', 'UserController.update()', 'PUT', '0', 'admin', '淳渔总部', '/system/user', '127.0.0.1', '内网IP', '{\"params\":{},\"query\":{},\"body\":{\"createTime\":\"2022-12-14T03:43:57.401Z\",\"updateTime\":\"2022-12-14T03:43:57.401Z\",\"createBy\":\"admin\",\"updateBy\":\"admin\",\"remark\":\"\",\"userId\":3,\"userName\":\"test\",\"nickName\":\"test\",\"userType\":\"00\",\"email\":null,\"phonenumber\":null,\"sex\":\"0\",\"avatar\":\"\",\"status\":\"0\",\"delFlag\":\"0\",\"loginIp\":\"\",\"loginDate\":null,\"dept\":{\"createTime\":\"2021-12-29T08:36:06.320Z\",\"updateTime\":\"2022-01-06T05:39:00.000Z\",\"createBy\":\"\",\"updateBy\":\"\",\"remark\":\"\",\"deptId\":1,\"deptName\":\"淳渔总部\",\"orderNum\":1,\"leader\":\"淳渔\",\"phone\":\"15674874636\",\"email\":\"542968439@qq.com\",\"status\":\"0\",\"delFlag\":\"0\"},\"posts\":[{\"createTime\":\"2022-01-06T05:39:28.615Z\",\"updateTime\":\"2022-01-06T05:39:28.615Z\",\"createBy\":\"\",\"updateBy\":\"\",\"remark\":\"\",\"postId\":1,\"postCode\":\"ceo\",\"postName\":\"董事长\",\"postSort\":1,\"status\":\"0\"}],\"roles\":[{\"createTime\":\"2021-12-29T08:34:08.369Z\",\"updateTime\":\"2022-01-06T05:38:18.155Z\",\"createBy\":\"\",\"updateBy\":\"\",\"remark\":\"\",\"roleId\":1,\"roleName\":\"超级管理员\",\"roleKey\":\"admin\",\"roleSort\":1,\"dataScope\":\"1\",\"menuCheckStrictly\":false,\"deptCheckStrictly\":true,\"status\":\"0\",\"delFlag\":\"0\"}],\"deptId\":1,\"postIds\":[1],\"roleIds\":[1,2]}}', '{\"code\":200,\"msg\":\"操作成功\"}', '0', '', '2023-03-06 10:39:48');

-- ----------------------------
-- Table structure for photos_movie
-- ----------------------------
DROP TABLE IF EXISTS `photos_movie`;
CREATE TABLE `photos_movie` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(500) NOT NULL COMMENT '图片',
  `type` varchar(255) NOT NULL COMMENT '图片类型',
  `img_width` int(11) NOT NULL DEFAULT '0' COMMENT '图片宽度',
  `img_height` int(11) NOT NULL DEFAULT '0' COMMENT '图片高度',
  `img_size` int(11) NOT NULL DEFAULT '0' COMMENT '图片大小',
  `status` varchar(255) NOT NULL DEFAULT '1' COMMENT '审核状态',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `movie_id` int(11) NOT NULL COMMENT '关联的影视id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of photos_movie
-- ----------------------------
INSERT INTO `photos_movie` VALUES ('2023-01-06 16:51:30.749052', '2023-02-20 10:00:24.000000', 'admin', 'admin', '', '2', '2', 'http://10.10.31.42:4000/upload/2023-01-06/1672995079282-494373618-FjjCCCFCtYBpJmWDwIF4IaCZLzee@public.jpg', '1', '0', '0', '0', '1', '2', '1');
INSERT INTO `photos_movie` VALUES ('2023-01-06 16:51:30.760595', '2023-02-20 10:00:22.000000', 'admin', 'admin', '', '2', '3', 'http://10.10.31.42:4000/upload/2023-01-06/1672995079286-59664034-Fu-qME4jo4NKN8MvWDE7pCRml0Xx@public.jpg', '1', '0', '0', '0', '1', '2', '1');
INSERT INTO `photos_movie` VALUES ('2023-01-06 17:06:17.169927', '2023-01-13 10:37:27.437970', 'admin', 'admin', '没意思', '3', '4', 'http://10.10.31.42:4000/upload/2023-01-06/1672995969812-837758142-profile.jpg', '2', '0', '0', '0', '1', '2', '1');
INSERT INTO `photos_movie` VALUES ('2023-01-06 17:21:56.271570', '2023-01-13 10:37:27.433434', 'admin', 'admin', '', '4', '5', 'http://10.10.31.42:4000/upload/2023-01-06/1672996872879-321703099-6db5ec0e267174b1d8e8dafc48932dfe22f912aa62ed555db4e598eef55270c5.png', '3', '0', '0', '0', '1', '2', '1');
INSERT INTO `photos_movie` VALUES ('2023-01-10 15:06:56.438039', '2023-02-20 10:00:20.000000', 'admin', 'admin', '', '2', '6', 'http://10.10.31.42:4000/upload/2023-01-10/1673334358135-40693486-profile.jpg', '1', '198', '198', '81131', '2', '2', '1');
INSERT INTO `photos_movie` VALUES ('2023-01-10 15:08:48.527360', '2023-02-20 10:00:18.000000', 'admin', 'admin', '', '2', '7', 'http://10.10.31.42:4000/upload/2023-01-10/1673334524722-429829800-Fu-qME4jo4NKN8MvWDE7pCRml0Xx@public.jpg', '1', '133', '200', '8447', '1', '2', '1');
INSERT INTO `photos_movie` VALUES ('2023-02-20 10:00:06.761809', '2023-02-20 10:00:06.761809', 'admin', 'admin', '', '1', '8', 'http://127.0.0.1:4000/upload/2023-02-20/1676858405480-725004106-FjjCCCFCtYBpJmWDwIF4IaCZLzee@public.jpg', '1', '138', '200', '7502', '1', '0', '1');
INSERT INTO `photos_movie` VALUES ('2023-03-03 08:28:58.881809', '2023-03-03 08:29:57.000000', 'admin', 'admin', '11', '2', '9', 'http://127.0.0.1:4000/upload/2023-03-03/1677832134251-88865640-p2888647044 (1).jpg', '1', '270', '390', '34885', '2', '2', '4');

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `post_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '岗位ID',
  `post_code` varchar(64) NOT NULL COMMENT '岗位编码',
  `post_name` varchar(50) NOT NULL COMMENT '岗位名称',
  `post_sort` int(11) NOT NULL COMMENT '显示顺序',
  `status` char(1) NOT NULL COMMENT '状态（0正常 1停用）',
  `version` int(11) NOT NULL COMMENT '版本号',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`post_id`) USING BTREE,
  UNIQUE KEY `IDX_4365bf877a23182bde2156ec6e` (`post_code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('2022-01-06 13:39:28.615762', '2022-01-06 13:39:28.615762', '', '1', 'ceo', '董事长', '1', '0', '0', '', '');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(30) NOT NULL COMMENT '角色名称',
  `role_key` varchar(100) NOT NULL COMMENT '角色权限字符串',
  `role_sort` int(11) NOT NULL COMMENT '显示顺序',
  `data_scope` char(1) NOT NULL DEFAULT '1' COMMENT '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限 5：仅本人数据权限）',
  `menu_check_strictly` tinyint(4) NOT NULL DEFAULT '1' COMMENT '菜单树选择项是否关联显示',
  `dept_check_strictly` tinyint(4) NOT NULL DEFAULT '1' COMMENT '菜单树选择项是否关联显示',
  `status` char(1) NOT NULL COMMENT '角色状态（0正常 1停用）',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `version` int(11) NOT NULL COMMENT '版本号',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`role_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('2021-12-29 16:34:08.369206', '2022-01-06 13:38:18.155638', '', '1', '超级管理员', 'admin', '1', '1', '0', '1', '0', '0', '0', '', '');
INSERT INTO `role` VALUES ('2023-03-06 02:39:39.237924', '2023-03-06 02:39:39.237924', '', '2', '管理员', 'admin2', '1', '1', '1', '1', '0', '0', '1', 'admin', 'admin');

-- ----------------------------
-- Table structure for role_depts_dept
-- ----------------------------
DROP TABLE IF EXISTS `role_depts_dept`;
CREATE TABLE `role_depts_dept` (
  `roleRoleId` int(11) NOT NULL,
  `deptDeptId` int(11) NOT NULL,
  PRIMARY KEY (`roleRoleId`,`deptDeptId`) USING BTREE,
  KEY `IDX_c38adaee013585bdc3f36a4edc` (`roleRoleId`) USING BTREE,
  KEY `IDX_a6df3f8f1af0e6fcd2424ff467` (`deptDeptId`) USING BTREE,
  CONSTRAINT `FK_a6df3f8f1af0e6fcd2424ff467c` FOREIGN KEY (`deptDeptId`) REFERENCES `dept` (`dept_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c38adaee013585bdc3f36a4edcf` FOREIGN KEY (`roleRoleId`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of role_depts_dept
-- ----------------------------

-- ----------------------------
-- Table structure for role_menus_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menus_menu`;
CREATE TABLE `role_menus_menu` (
  `roleRoleId` int(11) NOT NULL,
  `menuMenuId` int(11) NOT NULL,
  PRIMARY KEY (`roleRoleId`,`menuMenuId`) USING BTREE,
  KEY `IDX_d770d9678ced1d5a050126672f` (`roleRoleId`) USING BTREE,
  KEY `IDX_5b29b58ccc52b56f0a1ad62920` (`menuMenuId`) USING BTREE,
  CONSTRAINT `FK_5b29b58ccc52b56f0a1ad629209` FOREIGN KEY (`menuMenuId`) REFERENCES `menu` (`menu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_d770d9678ced1d5a050126672fa` FOREIGN KEY (`roleRoleId`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of role_menus_menu
-- ----------------------------
INSERT INTO `role_menus_menu` VALUES ('2', '1');
INSERT INTO `role_menus_menu` VALUES ('2', '4');
INSERT INTO `role_menus_menu` VALUES ('2', '5');
INSERT INTO `role_menus_menu` VALUES ('2', '6');
INSERT INTO `role_menus_menu` VALUES ('2', '7');
INSERT INTO `role_menus_menu` VALUES ('2', '8');
INSERT INTO `role_menus_menu` VALUES ('2', '9');
INSERT INTO `role_menus_menu` VALUES ('2', '10');
INSERT INTO `role_menus_menu` VALUES ('2', '11');
INSERT INTO `role_menus_menu` VALUES ('2', '12');
INSERT INTO `role_menus_menu` VALUES ('2', '13');
INSERT INTO `role_menus_menu` VALUES ('2', '14');
INSERT INTO `role_menus_menu` VALUES ('2', '15');
INSERT INTO `role_menus_menu` VALUES ('2', '16');
INSERT INTO `role_menus_menu` VALUES ('2', '17');
INSERT INTO `role_menus_menu` VALUES ('2', '18');
INSERT INTO `role_menus_menu` VALUES ('2', '19');
INSERT INTO `role_menus_menu` VALUES ('2', '20');
INSERT INTO `role_menus_menu` VALUES ('2', '21');
INSERT INTO `role_menus_menu` VALUES ('2', '22');
INSERT INTO `role_menus_menu` VALUES ('2', '23');
INSERT INTO `role_menus_menu` VALUES ('2', '24');
INSERT INTO `role_menus_menu` VALUES ('2', '25');
INSERT INTO `role_menus_menu` VALUES ('2', '26');
INSERT INTO `role_menus_menu` VALUES ('2', '27');
INSERT INTO `role_menus_menu` VALUES ('2', '28');
INSERT INTO `role_menus_menu` VALUES ('2', '29');
INSERT INTO `role_menus_menu` VALUES ('2', '30');
INSERT INTO `role_menus_menu` VALUES ('2', '31');
INSERT INTO `role_menus_menu` VALUES ('2', '32');
INSERT INTO `role_menus_menu` VALUES ('2', '33');
INSERT INTO `role_menus_menu` VALUES ('2', '34');
INSERT INTO `role_menus_menu` VALUES ('2', '35');
INSERT INTO `role_menus_menu` VALUES ('2', '36');
INSERT INTO `role_menus_menu` VALUES ('2', '37');
INSERT INTO `role_menus_menu` VALUES ('2', '38');
INSERT INTO `role_menus_menu` VALUES ('2', '39');
INSERT INTO `role_menus_menu` VALUES ('2', '40');
INSERT INTO `role_menus_menu` VALUES ('2', '41');
INSERT INTO `role_menus_menu` VALUES ('2', '42');
INSERT INTO `role_menus_menu` VALUES ('2', '49');
INSERT INTO `role_menus_menu` VALUES ('2', '50');
INSERT INTO `role_menus_menu` VALUES ('2', '51');
INSERT INTO `role_menus_menu` VALUES ('2', '52');
INSERT INTO `role_menus_menu` VALUES ('2', '53');
INSERT INTO `role_menus_menu` VALUES ('2', '54');
INSERT INTO `role_menus_menu` VALUES ('2', '55');
INSERT INTO `role_menus_menu` VALUES ('2', '56');
INSERT INTO `role_menus_menu` VALUES ('2', '57');
INSERT INTO `role_menus_menu` VALUES ('2', '58');
INSERT INTO `role_menus_menu` VALUES ('2', '59');
INSERT INTO `role_menus_menu` VALUES ('2', '60');
INSERT INTO `role_menus_menu` VALUES ('2', '61');
INSERT INTO `role_menus_menu` VALUES ('2', '62');
INSERT INTO `role_menus_menu` VALUES ('2', '63');
INSERT INTO `role_menus_menu` VALUES ('2', '64');
INSERT INTO `role_menus_menu` VALUES ('2', '75');
INSERT INTO `role_menus_menu` VALUES ('2', '76');
INSERT INTO `role_menus_menu` VALUES ('2', '77');
INSERT INTO `role_menus_menu` VALUES ('2', '78');
INSERT INTO `role_menus_menu` VALUES ('2', '81');
INSERT INTO `role_menus_menu` VALUES ('2', '82');
INSERT INTO `role_menus_menu` VALUES ('2', '91');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_name` varchar(30) NOT NULL COMMENT '用户账号',
  `nick_name` varchar(30) NOT NULL COMMENT '用户昵称',
  `user_type` varchar(2) NOT NULL DEFAULT '00' COMMENT '用户类型（00系统用户）',
  `email` varchar(50) DEFAULT NULL COMMENT '用户邮箱',
  `phonenumber` varchar(11) DEFAULT NULL COMMENT '手机号码',
  `sex` char(1) NOT NULL DEFAULT '0' COMMENT '用户性别（0男 1女 2未知）',
  `avatar` varchar(100) NOT NULL DEFAULT '' COMMENT '头像地址',
  `password` varchar(100) NOT NULL DEFAULT '' COMMENT '密码',
  `salt` varchar(100) NOT NULL DEFAULT '' COMMENT '盐加密',
  `status` char(1) NOT NULL DEFAULT '0' COMMENT '帐号状态（0正常 1停用）',
  `del_flag` char(1) NOT NULL DEFAULT '0' COMMENT '删除标志（0代表存在 2代表删除）',
  `login_ip` varchar(128) NOT NULL DEFAULT '' COMMENT '最后登录IP',
  `login_date` datetime DEFAULT NULL COMMENT '最后登录时间',
  `deptDeptId` int(11) DEFAULT NULL COMMENT '部门id',
  `version` int(11) NOT NULL COMMENT '版本号',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  PRIMARY KEY (`user_id`) USING BTREE,
  KEY `FK_d61db9f4f5464b51df4bd6f2332` (`deptDeptId`) USING BTREE,
  CONSTRAINT `FK_d61db9f4f5464b51df4bd6f2332` FOREIGN KEY (`deptDeptId`) REFERENCES `dept` (`dept_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2021-12-29 16:12:02.053561', '2023-02-23 16:25:29.000000', '', '1', 'admin', 'admin', '00', '87789771@qq.com', '13006133172', '0', '/upload/2023-02-23/1677140729991-772556076-blob.png', '9c68fb331431f8dcfb7defef22b0c527', 'Y2uPc7hyq8Vi5qBc879Ut', '0', '0', '', null, '1', '2', '', '');
INSERT INTO `user` VALUES ('2022-12-12 15:56:30.117237', '2022-12-13 15:17:15.000000', '', '2', 'test', 'test', '00', null, null, '0', '', 'aebc40e1ac589919bd8e56300afa45c1', 'wy8Ovn5JMfQz4HizVYb1_', '0', '2', '', null, '1', '2', 'admin', 'admin');
INSERT INTO `user` VALUES ('2022-12-14 11:43:57.401695', '2022-12-14 11:43:57.401695', '', '3', 'test', 'test', '00', null, null, '0', '', 'f8c77c53fb2ef2f3b6fab45c6d2940c3', 'CkZfVws8lqjMWMmUTMPaI', '0', '0', '', null, '1', '1', 'admin', 'admin');

-- ----------------------------
-- Table structure for user_posts_post
-- ----------------------------
DROP TABLE IF EXISTS `user_posts_post`;
CREATE TABLE `user_posts_post` (
  `userUserId` int(11) NOT NULL,
  `postPostId` int(11) NOT NULL,
  PRIMARY KEY (`userUserId`,`postPostId`) USING BTREE,
  KEY `IDX_28fca0ded6fc3ab66b451623f0` (`userUserId`) USING BTREE,
  KEY `IDX_3511ec6a3e38572359525a8550` (`postPostId`) USING BTREE,
  CONSTRAINT `FK_28fca0ded6fc3ab66b451623f05` FOREIGN KEY (`userUserId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_3511ec6a3e38572359525a85502` FOREIGN KEY (`postPostId`) REFERENCES `post` (`post_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user_posts_post
-- ----------------------------
INSERT INTO `user_posts_post` VALUES ('1', '1');
INSERT INTO `user_posts_post` VALUES ('3', '1');

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS `user_roles_role`;
CREATE TABLE `user_roles_role` (
  `userUserId` int(11) NOT NULL,
  `roleRoleId` int(11) NOT NULL,
  PRIMARY KEY (`userUserId`,`roleRoleId`) USING BTREE,
  KEY `IDX_0bd606ba8531dd93b457b8486d` (`userUserId`) USING BTREE,
  KEY `IDX_56f8ede2f2e059d4db74591c53` (`roleRoleId`) USING BTREE,
  CONSTRAINT `FK_0bd606ba8531dd93b457b8486d9` FOREIGN KEY (`userUserId`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_56f8ede2f2e059d4db74591c533` FOREIGN KEY (`roleRoleId`) REFERENCES `role` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
INSERT INTO `user_roles_role` VALUES ('1', '1');
INSERT INTO `user_roles_role` VALUES ('3', '1');
INSERT INTO `user_roles_role` VALUES ('3', '2');

-- ----------------------------
-- Table structure for video
-- ----------------------------
DROP TABLE IF EXISTS `video`;
CREATE TABLE `video` (
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_by` varchar(30) NOT NULL DEFAULT '' COMMENT '创建人',
  `update_by` varchar(30) NOT NULL DEFAULT '' COMMENT '更新人',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '备注',
  `version` int(11) NOT NULL COMMENT '版本号',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL COMMENT '视频地址',
  `height` int(11) NOT NULL COMMENT '视频高',
  `width` int(11) NOT NULL COMMENT '视频宽',
  `poster` longtext NOT NULL COMMENT '封面地址',
  `title` varchar(255) NOT NULL COMMENT '标题',
  `name` text NOT NULL COMMENT '视频文件名',
  `path` text NOT NULL COMMENT '视频存放路径',
  `duration` int(11) NOT NULL COMMENT '视频时长',
  `size` int(11) NOT NULL COMMENT '大小',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of video
-- ----------------------------
INSERT INTO `video` VALUES ('2023-03-01 14:56:18.085357', '2023-03-01 14:56:18.085357', 'admin', 'admin', '', '1', '24', 'http://127.0.0.1:4000/upload/videos/1677682571062-134892145-3e83b080-a27f-11ec-af96-59cc5e76cd89.mp4', '720', '1080', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCALQBDgDASIAAhEBAxEB/8QAHAABAAEFAQEAAAAAAAAAAAAAAAQBAgMFBgcI/8QATxAAAgIBAwIDBAYHBQUFBwMFAAECAxEEBSESMQYTQQciUWEUFzJWk9IVI0JxgZHRUlNVkqEWJDOxwQhUYnPxJSY0RXLh8GOCg8JDREai/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAECAwQFBv/EACQRAQEBAQADAAMAAwEAAwAAAAABEQIDEiEEEzEiQVEFFCMy/9oADAMBAAIRAxEAPwD5UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAehfUz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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z', '钢铁侠', '1677682571062-134892145-3e83b080-a27f-11ec-af96-59cc5e76cd89.mp4', '/Users/yinchunyu/my/project/chunyu-cms/Nest-server/public/upload/videos/1677682571062-134892145-3e83b080-a27f-11ec-af96-59cc5e76cd89.mp4', '146', '19983623');

-- ----------------------------
-- Table structure for video_movie_videos_movie_videos
-- ----------------------------
DROP TABLE IF EXISTS `video_movie_videos_movie_videos`;
CREATE TABLE `video_movie_videos_movie_videos` (
  `videoId` int(11) NOT NULL,
  `movieVideosId` int(11) NOT NULL,
  PRIMARY KEY (`videoId`,`movieVideosId`),
  KEY `IDX_5daf8d22f5eebac105d139ff6e` (`videoId`),
  KEY `IDX_636ff3078319a98ef19d6e8a8b` (`movieVideosId`),
  CONSTRAINT `FK_5daf8d22f5eebac105d139ff6e4` FOREIGN KEY (`videoId`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_636ff3078319a98ef19d6e8a8bd` FOREIGN KEY (`movieVideosId`) REFERENCES `movie_videos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of video_movie_videos_movie_videos
-- ----------------------------
