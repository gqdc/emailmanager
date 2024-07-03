<?php
require_once(ROOT . 'src/model/emailAccount.php');

function delete_account($username) {
	$emailDomain = new emailDomain();
	echo $emailDomain->delete_account($username);
}

