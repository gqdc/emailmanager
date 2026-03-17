<?php
require_once(ROOT . 'src/model/emailAccount.php');

function delete_account($username,$domainName) {
	$emailDomain = new emailDomain($domainName);
	echo $emailDomain->delete_account($username);
}

