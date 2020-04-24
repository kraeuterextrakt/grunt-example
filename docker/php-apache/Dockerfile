ARG PHP_VERSION

FROM php:$PHP_VERSION-apache

RUN apt-get update \
    && docker-php-source extract

# Install GD
RUN apt-get install -y libjpeg62-turbo-dev libpng-dev libfreetype6-dev libxml2-dev \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd

# Install basic PHP extentions
RUN docker-php-ext-install -j$(nproc) \
        pdo pdo_mysql mysqli zip soap

        # bcmath bz2 calendar ctype curl dba dom enchant exif \
        # fileinfo filter ftp gd gettext gmp hash iconv imap \
        # interbase intl json ldap mbstring mcrypt mysqli oci8 \
        # odbc opcache pcntl pdo pdo_dblib pdo_firebird pdo_mysql \
        # pdo_oci pdo_odbc pdo_pgsql pdo_sqlite pgsql phar posix  \
        # pspell readline recode reflection session shmop simplexml  \
        # snmp sockets spl standard sysvmsg sysvsem sysvshm tidy  \
        # tokenizer wddx xml xmlreader xmlrpc xmlwriter xsl zip \

RUN docker-php-source delete \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN a2enmod rewrite
RUN a2enmod headers

COPY vhost.conf /etc/apache2/sites-available/000-default.conf
COPY php.ini /usr/local/etc/php/php.ini