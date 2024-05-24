# Use the official PHP image with Apache
FROM php:7.4-apache

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy the contents of your PHP application into the container
COPY . /var/www/html/

# Install any required PHP extensions (example: mysqli for MySQL)
RUN docker-php-ext-install mysqli

# Expose port 80 to be accessible from the host
EXPOSE 80

# Start Apache server
CMD ["apache2-foreground"]

