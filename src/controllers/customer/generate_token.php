<?php
require_once(ROOT . 'src/model/customerClass.php');

function generate_token($userID) {
	$customer = new customerClass($userID);
	if (empty(json_decode($customer->generate_token()))) {
		echo json_encode(array('function' => 'generate_token', 'success' => 'false', 'error' => 'user does not exists'));
	} else {
		echo $customer->generate_token();
	}
}