-- MySQL Script generated by MySQL Workbench
-- Sat Dec  8 17:49:02 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema rateme
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `rateme` ;

-- -----------------------------------------------------
-- Schema rateme
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `rateme` DEFAULT CHARACTER SET utf8 ;
USE `rateme` ;

-- -----------------------------------------------------
-- Table `rateme`.`Restaurant`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rateme`.`Restaurant` ;

CREATE TABLE IF NOT EXISTS `rateme`.`Restaurant` (
  `restaurant_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NULL,
  `address` VARCHAR(30) NULL,
  `description` VARCHAR(100) NULL,
  `is_active` TINYINT(1) DEFAULT 1 NOT NULL,
  PRIMARY KEY (`restaurant_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rateme`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rateme`.`User` ;

CREATE TABLE IF NOT EXISTS `rateme`.`User` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(15) NULL,
  `password` VARCHAR(100) NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `userId_UNIQUE` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rateme`.`Rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rateme`.`Rating`;

CREATE TABLE IF NOT EXISTS `rateme`.`Rating` (
  `rating_id` INT NOT NULL AUTO_INCREMENT,
  `rating` INT NULL,
  `user_id` INT NULL,
  `restaurant_id` INT NULL,
  PRIMARY KEY (`rating_id`),
  UNIQUE INDEX `ratingId_UNIQUE` (`rating_id` ASC) VISIBLE,
  INDEX `restaurantId_idx` (`restaurant_id` ASC) VISIBLE,
  INDEX `userId_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `restaurantId`
    FOREIGN KEY (`restaurant_id`)
    REFERENCES `rateme`.`Restaurant` (`restaurant_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`user_id`)
    REFERENCES `rateme`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rateme`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rateme`.`Role` ;

CREATE TABLE IF NOT EXISTS `rateme`.`Role` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE INDEX `roleId_UNIQUE` (`role_id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rateme`.`User_Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `rateme`.`User_Role` ;

CREATE TABLE IF NOT EXISTS `rateme`.`User_Role` (
  `user_role_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `role_id` INT NULL,
  PRIMARY KEY (`user_role_id`),
  INDEX `userId_idx` (`user_id` ASC) VISIBLE,
  INDEX `roleId_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `role.userId`
    FOREIGN KEY (`user_id`)
    REFERENCES `rateme`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `roleId`
    FOREIGN KEY (`role_id`)
    REFERENCES `rateme`.`Role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO ROLE VALUES (1, 'ROLE_USER');
INSERT INTO ROLE VALUES (2, 'ROLE_ADMIN');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
