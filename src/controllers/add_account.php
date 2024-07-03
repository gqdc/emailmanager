<?php
require_once(ROOT . 'src/model/emailAccount.php');

function add_account($username,$password) {
	$emailAccount = new emailAccount($username);
	if (empty(json_decode($emailAccount->get_account_informations()))) {
		$emailDomain = new emailDomain();
		echo $emailDomain->add_account($username,$password);
	} else {
		echo json_encode(array('function' => 'create_account', 'success' => 'false', 'error' => 'account already exists'));
	}
}

