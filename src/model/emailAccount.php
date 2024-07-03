<?php
require_once(ROOT . 'src/model/emailDomain.php');

class emailAccount {  
	function __construct($username,$domainName=EMAIL_DOMAIN) {
		$request = "SELECT users.username, domain, forward_to, quota, active, bytes, messages FROM users, quota WHERE (users.username = :username AND users.domain = :domainName) AND quota.username = concat(users.username,'@',users.domain)";
		$parameters= array('username' => $username, 'domainName' => $domainName);

		$dbConnect = new Database();
		$this->accountInformations = $dbConnect->getData($request, $parameters);
	}

	function get_account_informations() {
		return json_encode($this->accountInformations);
	}

	function set_account_redirection($target) {
		if ($target == "null") {
			$target = "";
		}
		$request = "UPDATE `users` SET forward_to = :forward_to WHERE username = :username AND domain = :domain";
		$parameters = array('username' => $this->accountInformations[0]['username'], 'domain' => $this->accountInformations[0]['domain'], 'forward_to' => $target);

		$dbConnect = new Database();
		$result = $dbConnect->setData($request, $parameters);

		if ($result === true) {
			return json_encode(array('function' => 'set_account_redirection', 'success' => 'true'));
		} else {
			return json_encode(array('function' => 'set_account_redirection', 'success' => 'false', 'error' => $result->errorInfo));
		}
	}

	function set_account_password($password) {
		$request = "UPDATE `users` SET password = ENCRYPT(:password, CONCAT('$6$', SUBSTRING(SHA(RAND()), -16))) WHERE username = :username AND domain = :domain";
		$parameters = array('username' => $this->accountInformations[0]['username'], 'domain' => $this->accountInformations[0]['domain'], 'password' => $password);

		$dbConnect = new Database();
		$result = $dbConnect->setData($request, $parameters);

		if ($result === true) {
			return json_encode(array('function' => 'set_account_password', 'success' => 'true'));
		} else {
			return json_encode(array('function' => 'set_account_password', 'success' => 'false', 'error' => $result->errorInfo));
		}
	}
}