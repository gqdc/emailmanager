<?php
define('ROOT', str_replace('index.php','',$_SERVER['SCRIPT_FILENAME']));

require_once(ROOT.'conf/config.php');

require_once(ROOT.'check_settings.php');

require_once(ROOT.'manage.php');