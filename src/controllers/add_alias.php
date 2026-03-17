<?php
require_once(ROOT . 'src/model/emailAlias.php');

function add_alias($username,$aliases) {
	$emailAlias = new emailAlias($username);
	if (empty(json_decode($emailAlias->get_alias_informations()))) {
		$emailDomain = new emailDomain();
		echo $emailDomain->add_alias($username,$aliases);
	} else {
		echo json_encode(array('function' => 'create_alias', 'success' => 'false', 'error' => 'alias already exists'));
	}
}