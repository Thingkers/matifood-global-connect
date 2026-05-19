-- Run this once in phpMyAdmin on u595773077_matifood
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(40) NOT NULL,
  `email` VARCHAR(200) DEFAULT NULL,
  `area` VARCHAR(40) NOT NULL,
  `delivery_address` VARCHAR(500) NOT NULL,
  `product` VARCHAR(200) NOT NULL,
  `quantity` INT(11) NOT NULL DEFAULT 1,
  `payment_method` VARCHAR(40) NOT NULL,
  `payment_note` VARCHAR(200) DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
