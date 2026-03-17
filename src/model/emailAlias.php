<?php
require_once(ROOT . 'src/model/emailDomain.php');

class emailAlias {  
	function __construct($username,$domainName=EMAIL_DOMAIN) {
		$request = "SELECT username, domain, forward_to, active FROM users WHERE (username = :username AND domain = :domainName) AND forward_to IS NOT NULL";
		$parameters= array('username' => $username, 'domainName' => $domainName);

		$dbConnect = new Database();
		$this->aliasInformations = $dbConnect->getData($request, $parameters);
	}

	function get_alias_informations() {
		return json_encode($this->aliasInformations);
	}

	function set_alias_target($target) {
		if ($target == "null") {
			$target = "";
		}
		$request = "UPDATE `users` SET forward_to = :forward_to WHERE username = :username AND domain = :domain";
		$parameters = array('username' => $this->aliasInformations[0]['username'], 'domain' => $this->aliasInformations[0]['domain'], 'forward_to' => $target);

		$dbConnect = new Database();
		$result = $dbConnect->setData($request, $parameters);

		if ($result === true) {
			return json_encode(array('function' => 'set_alias_target', 'success' => 'true'));
		} else {
			return json_encode(array('function' => 'set_alias_target', 'success' => 'false', 'error' => $result->errorInfo));
		}
	}
}