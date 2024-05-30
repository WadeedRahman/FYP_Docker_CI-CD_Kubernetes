FROM php:7.4-apache

# Copy the PHP application code to the Apache HTML directory
COPY . /var/www/html

# Install MySQLi extension for PHP
RUN docker-php-ext-install mysqli

# Expose port 80
EXPOSE 80
