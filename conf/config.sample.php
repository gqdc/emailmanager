<?php
/*
 * Settings for the email manager
 *
 */

/* Database settings */
define('DB_HOST', "database.tld");
define('DB_USER', "username");
define('DB_PASSWORD', "password");
define('DB_NAME', "database");

/* E-mail server settings */
define('EMAIL_DOMAIN', "domain.tld");
define('DOVECOT_API_URL', "https://mail.domain.tld/doveadm/v1");

/* Web server settings*/
define('ROOT', str_replace('index.php','',$_SERVER['SCRIPT_FILENAME']));
