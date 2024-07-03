<?php
require_once(ROOT . 'src/model/emailAccount.php');

function get_account_informations($username) {
	$emailAccount = new emailAccount($username);
	echo $emailAccount->get_account_informations();
}