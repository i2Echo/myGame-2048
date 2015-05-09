/*
MySQL Data Transfer
Source Host: localhost
Source Database: test
Target Host: localhost
Target Database: test
Date: 2015/1/26 19:24:28
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for scorelist
-- ----------------------------
CREATE TABLE `scorelist` (
  `id` tinyint(20) NOT NULL,
  `score` int(20) DEFAULT NULL,
  `name` char(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `scorelist` VALUES ('1', '2884', 'first');
INSERT INTO `scorelist` VALUES ('2', '1184', 'second');
INSERT INTO `scorelist` VALUES ('3', '964', 'third');
