<?php
require_once(ROOT . 'src/model/emailAccount.php');

function set_account_password($username,$password) {
	$emailAccount = new emailAccount($username);
	try {
		echo $emailAccount->set_account_password($password);
	} catch (PDOException $e) {
		echo $e->getMessage();
	}
} 