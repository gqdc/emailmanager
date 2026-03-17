<?php
require_once(ROOT . 'src/model/Database.php');

class customerClass {
	function __construct($customerID=CUSTOMER_ID) {
		$orderby = "domain, username";

		$customerInfosRequest = "SELECT display_name FROM customers WHERE active = 1 AND id = :customerID";
		$customerInfosRequestParameters = array('customerID' => $customerID);

		$customerRessources = "SELECT domain_name, quota FROM domains JOIN customers ON customers.id = domains.customer_id WHERE domains.active = 1 AND customers.id = :customerID ORDER BY domain_name";
		$customerRessourcesParameters = array('customerID' => $customerID);

		$dbConnect = new Database();
		$this->customerInfos = $dbConnect->getData($customerInfosRequest, $customerInfosRequestParameters);
		$this->customerRessources = $dbConnect->getData($customerRessources, $customerRessourcesParameters);
	}

	function get_customer_infos() {
		return json_encode($this->customerInfos);
	}

	function get_customer_ressources() {
		return json_encode($this->customerRessources);
	}

	function customer_exists() {
		if (empty($this->customerInfos)) {
			return false;
		} else {
			return true;
		}
	}
}

function get_customer_id($emailAddress) {
	$customerEmailRequest = "SELECT id FROM customers WHERE active = 1 AND email = :emailAddress";
	$customerEmailParameters = array('emailAddress' => $emailAddress);

	$dbConnect = new Database();

	return $dbConnect->getData($customerEmailRequest, $customerEmailParameters);
}