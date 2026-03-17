<?php
require_once(ROOT . 'src/model/customerClass.php');

function get_customer_ressources($customerID) {
	$customerClass = new customerClass(CUSTOMER_ID);

	//echo $customerRessources = $customerClass->get_customer_ressources();
	return $customerClass->get_customer_ressources();
}