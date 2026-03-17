<?php
require_once(ROOT . 'src/model/customerClass.php');

function customer_exists($userID="", $emailAddress="") {
	if (!empty($emailAddress)) {
		$userID = get_customer_id($emailAddress);
	}

	$customerClass = new customerClass($userID);
	return $customerClass->customer_exists();
}