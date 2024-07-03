<?php
/*
 * Check constants definition
 */

if (!defined('DB_HOST')) {
	throw new Exception ("DB_HOST must be set.");
}
if (!defined('DB_USER')) {
	throw new Exception ("DB_USER must be set.");
}
if (!defined('DB_PASSWORD')) {
	throw new Exception ("DB_PASSWORD must be set.");
}
if (!defined('DB_NAME')) {
	throw new Exception ("DB_NAME must be set.");
}
if (!defined('EMAIL_DOMAIN')) {
	throw new Exception ("EMAIL_DOMAIN must be set.");
}
?>