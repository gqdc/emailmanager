<?php
require_once(ROOT . 'src/model/emailAccount.php');

function add_account($username,$password,$domainName,$aliases) {
	$emailAccount = new emailAccount($username,$domainName);
	if (empty(json_decode($emailAccount->get_account_informations()))) {
		$emailDomain = new emailDomain();
		echo $emailDomain->add_account($username,$password,$domainName,$aliases);
	} else {
		echo json_encode(array('function' => 'create_account', 'success' => 'false', 'error' => 'account already exists'));
	}
}