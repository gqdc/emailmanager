<?php
ob_start();

require('accounts_list.php');
require('aliases_list.php');

$content = ob_get_clean();
require_once('layout.php');
?>