<?php
require_once(ROOT . 'src/model/Database.php');

class emailDomain {
	
	function __construct($domainName=EMAIL_DOMAIN) {
		$orderby = "domain, username";
		$accountsListRequest = "SELECT users.username, domain, forward_to, quota, active, bytes, messages FROM users, quota WHERE active = 1 AND quota.username = concat(users.username,'@',users.domain) AND domain = :domainName AND password IS NOT NULL ORDER BY $orderby";
		$accountsListRequestParameters= array('domainName' => $domainName);

		$aliasesListRequest = "SELECT users.username, domain, forward_to FROM users WHERE active = 1 AND domain = :domainName AND password is NULL ORDER BY $orderby";
		$aliasesListRequestParameters= array('domainName' => $domainName);

		$dbConnect = new Database();
		$this->accountsList = $dbConnect->getData($accountsListRequest, $accountsListRequestParameters);
		$this->aliasesList = $dbConnect->getData($aliasesListRequest, $aliasesListRequestParameters);
	}

	function get_accounts_list() {
		return json_encode($this->accountsList);
	}

	function get_aliases_list() {
		return json_encode($this->aliasesList);
	}

	function add_account($username,$password,$domainName,$aliases) {
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
				if (is_null($aliases)) {
					return json_encode(array('function' => 'create_account', 'success' => 'true'));
				} else {
					$request = "UPDATE `users` SET `forward_to` = :aliases WHERE `username` = :username AND `domain` = :domain";
					$parameters = array('username' => $username, 'domain' => $domainName, 'aliases' => $aliases);

					$dbConnect = new Database();
					$result = $dbConnect->setData($request, $parameters);

					if ($result === true) {
						return json_encode(array('function' => 'create_account', 'success' => 'true'));
					} else {
						return json_encode(array('function' => 'create_account', 'success' => 'false', 'error' => $result->errorInfo));		
					}
				}
			} else {
				return json_encode(array('function' => 'create_account', 'success' => 'false', 'error' => $result->errorInfo));
			}
		} else {
			return json_encode(array('function' => 'create_account', 'success' => 'false', 'error' => $result->errorInfo));
		}
	}

	function add_alias($username,$aliases,$domainName=EMAIL_DOMAIN) {
		$request = "INSERT INTO `users` (`username`, `domain`, `forward_to`,`alias`)  VALUES (:username, :domain, :aliases, 1)";
		$parameters = array('username' => $username, 'domain' => $domainName, 'aliases' => $aliases);

		$dbConnect = new Database();
		$result = $dbConnect->setData($request, $parameters);

		if ($result === true) {
			return json_encode(array('function' => 'create_alias', 'success' => 'true'));
		} else {
			return json_encode(array('function' => 'create_alias', 'success' => 'false', 'error' => $result->errorInfo));
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