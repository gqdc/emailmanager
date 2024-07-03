<?php
require_once(ROOT . 'src/model/emailAccount.php');

function set_account_redirection($username,$target) {
	$emailAccount = new emailAccount($username);
	try {
		echo $emailAccount->set_account_redirection($target);
	} catch (PDOException $e) {
		echo $e->getMessage();
	}	
}
