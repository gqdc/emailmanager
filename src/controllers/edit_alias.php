<?php
require_once(ROOT . 'src/model/emailAlias.php');

function edit_alias($username,$aliases) {
	$emailAlias = new emailAlias($username);
	if (empty(json_decode($emailAlias->get_alias_informations()))) {
		echo json_encode(array('function' => 'edit_alias', 'success' => 'false', 'error' => 'alias does not exists'));
	} else {
		echo $emailAlias->set_alias_target($aliases);
	}
}