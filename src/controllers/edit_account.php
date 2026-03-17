<?php
require_once(ROOT . 'src/model/emailAccount.php');

function edit_account($username,$password,$domainName,$aliases=null) {
	$emailAccount = new emailAccount($username,$domainName);
	if (empty(json_decode($emailAccount->get_account_informations()))) {
		echo json_encode(array('function' => 'edit_account', 'success' => 'false', 'error' => 'account does not exists'));
	} else {
		echo $emailAccount->edit_account($password,$aliases);
	}
}