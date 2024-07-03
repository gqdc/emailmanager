<?php
require_once(ROOT . 'src/model/Database.php');

class emailDomain {
	
	function __construct($domainName=EMAIL_DOMAIN) {
		$orderby = "domain, username";
		$request = "SELECT users.username, domain, forward_to, quota, active, bytes, messages FROM users, quota WHERE active = 1 AND quota.username = concat(users.username,'@',users.domain) AND domain = :domainName ORDER BY $orderby";
		$parameters= array('domainName' => $domainName);

		$dbConnect = new Database();
		$this->accountList = $dbConnect->getData($request, $parameters);
	}

	function get_account_list() {
		return json_encode($this->accountList);
	}

	function add_account($username,$password,$domainName=EMAIL_DOMAIN) {
		$request = "INSERT INTO `users` (`username`, `domain`, `password`)  VALUES (:username, :domain, ENCRYPT(:password, CONCAT('$6$', SUBSTRING(SHA(RAND()), -16))))";
		$parameters = array('username' => $username, 'domain' => $domainName, 'password' => $password);

		$dbConnect = new Database();
		$result = $dbConnect->setData($request, $parameters);

		if ($result === true) {
			$request = "INSERT INTO `quota` (`username`)  VALUES (:username)";
			$parameters = array('username' => $username . "@" . $domainName);

			$dbConnect = new Database();
			$result = $dbConnect->setData($request, $parameters);

			if ($result === true) {
				return json_encode(array('function' => 'create_account', 'success' => 'true'));
			} else {
				return json_encode(array('function' => 'create_account', 'success' => 'false', 'error' => $result->errorInfo));
			}
		} else {
			return json_encode(array('function' => 'create_account', 'success' => 'false', 'error' => $result->errorInfo));
		}
	}

	function delete_account($username,$domainName=EMAIL_DOMAIN) {
		$request = "UPDATE `users` SET `active` = '0' WHERE `username` = :username AND `domain` = :domain";
		$parameters = array('username' => $username, 'domain' => $domainName);

		$dbConnect = new Database();
		$result = $dbConnect->setData($request, $parameters);

		if ($result === true) {
			return json_encode(array('function' => 'delete_account', 'success' => 'true'));
		} else {
			return json_encode(array('function' => 'delete_account', 'success' => 'false', 'error' => $result->errorInfo));
		}
	}
}