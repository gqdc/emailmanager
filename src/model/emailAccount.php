<?php
require_once(ROOT . 'src/model/emailDomain.php');

class emailAccount {  
	//function __construct($username,$domainName=EMAIL_DOMAIN) {
	function __construct($username,$domainName) {
		$request = "SELECT users.username, domain, forward_to, quota, active, bytes, messages FROM users, quota WHERE (users.username = :username AND users.domain = :domainName) AND quota.username = concat(users.username,'@',users.domain)";
		$parameters= array('username' => $username, 'domainName' => $domainName);

		$dbConnect = new Database();
		$this->accountInformations = $dbConnect->getData($request, $parameters);
	}

	function get_account_informations() {
		return json_encode($this->accountInformations);
	}

	function edit_account($password,$aliases='') {
		$dbConnect = new Database();

		$request = "UPDATE `users` SET forward_to = :forward_to WHERE username = :username AND domain = :domain";
		
		if (!is_null($aliases)) {
			$parameters = array('username' => $this->accountInformations[0]['username'], 'domain' => $this->accountInformations[0]['domain'], 'forward_to' => $aliases . ',' . $this->accountInformations[0]['username'] . '@' . $this->accountInformations[0]['domain']);
		} else {
			$parameters = array('username' => $this->accountInformations[0]['username'], 'domain' => $this->accountInformations[0]['domain'], 'forward_to' => '');
		}

		$result_aliases_edit = $dbConnect->setData($request, $parameters);
		
		if ($result_aliases_edit === false) {
			return json_encode(array('function' => 'edit_account_redirection', 'success' => false, 'error' => $result_aliases_edit->errorInfo));
		}

		if (!empty($password)) {
			$request = "UPDATE `users` SET password = ENCRYPT(:password, CONCAT('$6$', SUBSTRING(SHA(RAND()), -16))) WHERE username = :username AND domain = :domain";
			$parameters = array('username' => $this->accountInformations[0]['username'], 'domain' => $this->accountInformations[0]['domain'], 'password' => $password);

			$result_password_edit = $dbConnect->setData($request, $parameters);

			if ($result_password_edit === false) {
				return json_encode(array('function' => 'edit_account_password', 'success' => false, 'error' => $result_password_edit->errorInfo));
			}
		}

		return json_encode(array('function' => 'edit_account', 'success' => true));
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