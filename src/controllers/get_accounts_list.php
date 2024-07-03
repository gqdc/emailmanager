<?php
require_once(ROOT . 'src/model/emailDomain.php');

function get_accounts_list($domainName) {
	$emailDomain = new emailDomain($domainName);
	$accountsList = $emailDomain->get_account_list();

	echo $accountsList;
}
