<?php
require_once(ROOT . 'src/model/customerClass.php');

function get_customer_infos($customerID) {
	$customerClass = new customerClass(CUSTOMER_ID);

	echo $customerInfos = $customerClass->get_customer_infos();
	$customerRessources = $customerClass->get_customer_ressources();
}