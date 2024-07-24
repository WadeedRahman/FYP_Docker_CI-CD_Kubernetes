# Use the official PHP image with Apache
FROM php:7.4-apache

# Update the package manager and install necessary PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd mysqli \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /var/www/html

# Copy the PHP application code to the Apache HTML directory
COPY . /var/www/html

# Set permissions for the Apache document root
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Start Apache in the foreground (needed for Docker container)
CMD ["apache2-foreground"]
