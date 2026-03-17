<?php
require_once(ROOT . 'src/controllers/show_accounts_list.php');
require_once(ROOT . 'src/controllers/show_aliases_list.php');

function show_global_list($domainName) {
	show_accounts_list($domainName);
	show_aliases_list($domainName);

	require( ROOT . 'templates/global_list.php');
}