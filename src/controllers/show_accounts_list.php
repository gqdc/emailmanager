<?php
require_once(ROOT . 'src/model/emailDomain.php');

function show_accounts_list($domainName) {
	$emailDomain = new emailDomain($domainName);
	$accountsList = $emailDomain->get_account_list();

	require( ROOT . 'templates/accounts_list.php');
}