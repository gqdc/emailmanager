<?php
define('WEB_ROOT',str_replace('models/dovecotApiClient.php','',$_SERVER['SCRIPT_FILENAME']));

require_once(WEB_ROOT .'conf/config.php');
require_once(WEB_ROOT .'check_settings.php');
//require_once(WEB_ROOT .'manage.php');

class Database {
	function __construct() {
		$host = DB_HOST;
		$user = DB_USER;
		$pass = DB_PASSWORD;
		$database = DB_NAME;
		try {
			$this->dbh = new PDO('mysql:host=' . $host . ';dbname=' . $database, $user, $pass);
			$this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->dbh->setAttribute(PDO::ATTR_CURSOR, PDO::CURSOR_FWDONLY);	
		} catch (PDOException $e) {
 		   echo 'Échec lors de la connexion : ' . $e->getMessage();
		} 
		
	}

	function getData($request, $parameters=NULL) {
		$sth = $this->dbh->prepare($request, );
		$sth->execute($parameters);

		return $sth->fetchAll(PDO::FETCH_ASSOC);
	}

	function setData($request, $parameters=NULL) {
		try {
			$sth = $this->dbh->prepare($request);
			return $sth->execute($parameters);
		} catch (PDOException $e) {
			return $e;
		}
	}
}

class emailDomain {
	protected $domainName;
	function __construct($domainName) {
		$orderby = "domain, username";
		$request = "SELECT users.username, domain, forward_to, quota, active, bytes, messages FROM users, quota WHERE active = 1 AND quota.username = concat(users.username,'@',users.domain) AND domain = :domainName ORDER BY $orderby";
		$parameters= array('domainName' => $domainName);

		$dbConnect = new Database();
		$this->accountList = $dbConnect->getData($request, $parameters);
	}

	function get_account_list() {
		return json_encode($this->accountList);
	}
}

class emailAccount {  
	function __construct($domainName, $username) {
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


if (isset($_POST['domainName'])) {
	if (filter_var($_POST['domainName'],FILTER_VALIDATE_DOMAIN)) {
		$domainName = $_POST['domainName'];
	} else {
		throw new Exception ("Nom de domaine invalide");
	}
} else {
	$domainName = EMAIL_DOMAIN;
}


if (isset($_POST['username'])) {
	if ( filter_var($_POST['username'],FILTER_VALIDATE_REGEXP,array( "options"=> array("regexp" => "/^[^_][\w\d]{1}[\w\d\-.]{3,32}$/"))) ) {
		$username = $_POST['username'];
	} else {
		//throw new Exception ("local-part invalide : " . $_POST['username']);
		//throw new Exception ("local-part invalide : " . $_POST['username']);
		exit(json_encode(array('variable' => 'username', 'error' => 'wrong format')));
	}
}

if (isset($_POST['target'])) {
	if (filter_var($_POST['target'],FILTER_VALIDATE_EMAIL) || $_POST['target'] == "null") {
		$target = $_POST['target'];
	} else {
		throw new Exception ("e-mail cible invalide");
	}
}

if (isset($_POST['password'])) {
	
	if ( filter_var($_POST['password'],FILTER_VALIDATE_REGEXP,array( "options"=> array("regexp" => "/.{12,25}/"))) ) {
		$password = $_POST['password'];
	} else {
		throw new Exception ("Mot de passe invalide : ". $_POST['password']);
	}
}

$action_list = array('create_account','delete_account','get_account_informations','get_account_list','set_account_password','set_account_redirection');

if (isset($_POST['action'])) {
	switch ($_POST['action']) {
		case 'create_account':
			$emailAccount = new emailAccount($domainName, $username);
			if (empty(json_decode($emailAccount->get_account_informations()))) {
				echo create_account($username,$domainName,$password);
			} else {
				echo json_encode(array('function' => 'create_account', 'success' => 'false', 'error' => 'account already exists'));
			}
			
			break;
		case 'delete_account':
			echo delete_account($username,$domainName);
			break;
		case 'get_account_informations':
			$emailAccount = new emailAccount($domainName, $username);
			echo $emailAccount->get_account_informations();
			break;
		case 'get_account_list':
			$emailAccounts = new emailDomain($domainName);
			echo $emailAccounts->get_account_list();
			break;
		case 'set_account_password':
			$emailAccount = new emailAccount($domainName, $username);
			try {
				echo $emailAccount->set_account_password($password);
			} catch (PDOException $e) {
				echo $e->getMessage();
			}
			break;
		case 'set_account_redirection':
			$emailAccount = new emailAccount($domainName, $username);
			try {
				echo $emailAccount->set_account_redirection($target);
			} catch (PDOException $e) {
				echo $e->getMessage();
			}
			break;
		default:
			echo "Availables actions : " . implode(", ", $action_list);
			break;
	}
} else {
	$emailAccounts = new emailDomain($domainName);
	echo $emailAccounts->get_account_list();
}

function dovecot_api_send_request($command="") {
    $ch = curl_init(DOVECOT_API_URL);
    curl_setopt($ch, CURLOPT_USERAGENT, "emailmgr");
    curl_setopt($ch, CURLOPT_FRESH_CONNECT, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Authorization: X-Dovecot-API Q25IRjVURTdCQ2pIRHF3NExmWEVVRktET0FXYUR3Q01CVUZSTW03NkRKZz0='));
    curl_setopt($ch, CURLOPT_ENCODING, "UTF-8" );
    curl_setopt($ch, CURLOPT_TIMEOUT, '60L');

	if ($command != '') {
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($command));
	}
	
	$answer = json_decode(curl_exec($ch));
    curl_close($ch);
	//header('Content-Type: application/json');
	var_dump($answer);
	if ( is_array($answer) ) {
		if ( is_array($answer[0]) ) {
			if ( $answer[0][0] == 'doveadmResponse' ) {
				return json_encode($answer[0][1]);
			}
			elseif ($answer[0][0] == 'error') {
			   	switch ($answer[0][1]->{'exitCode'}) {
			       	case '67':
			           	throw new Exception('User does not exist', 1);
			           	break;
			       	default:
			           	return $answer[0][1]->{'exitCode'};
			           	break;
			   	}
			}
		}
		elseif ( is_object($answer[0]) ) {
			echo json_encode($answer);
		}
	}
}

function get_account_quota($username) {
	$command = array(array('quotaGet', array('user' => $username),''));
	$quota_request = json_decode(dovecot_api_send_request($command));

	if ($quota_request) {
		$quota_limit = $quota_request[0]->limit;
		$quota_used = $quota_request[0]->value;
		$quota_used_percent = $quota_request[0]->percent;
		$quota_message = $quota_request[1]->value;	
	}
	else {	
		echo "problem";
	}
}

function create_account($username,$domainName,$password) {
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

function delete_account($username,$domainName) {
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
// Show mailboxes of a specific user
//$command = array(array("mailboxList", array('user' => 'postmaster@yokay.fr'), 'yokay' ));

//Show home directory for a specific user
//$command = array(array('user', array('userMask' => 'postmaster@yokay.fr', 'field' => 'home'), 'toto'));

//Show all userDb / passDb info
//$command = array(array('user', array('userMask' => 'postmaster@yokay.fr'), 'toto'));

// Get all command
//$command = '';

// Do an AuthCacheFlush for a specific user
//$command = array(array('authCacheFlush', array('user' => 'postmaster@yokay.fr'), 'toto' ));

// Get the quota for a specific user
//$command = array(array('quotaGet', array('user' => 'postmaster@yokay.fr'), 'toto' ));

/*$adminCmd = array('kick','who','authCacheFlush','user','sieveActivate','sieveDeactivate');
$disabledCmd = array('mailboxCacheDecision','mailboxCacheRemove','mailboxCachePurge');
$userCmd = array('quotaGet','quotaRecalc','sieveList','sieveGet','sievePut','sieveDelete','sieveRename');
$systemCmd = array('serviceStop','serviceStatus','processStatus','stop','reload');

foreach ($legacyCmdlist as $cmdNumber) {
	if ( in_array($cmdNumber->{'command'}, $adminCmd) ) {
		echo $cmdNumber->{'command'} . "<br />";
		foreach ($cmdNumber->{'parameters'} as $parameters) {
			echo $parameters->{'name'} . " : " .  $parameters->{'type'} . "<br />";
		}
		echo "<br />";
	}
	if ( in_array($cmdNumber->{'command'}, $systemCmd) ) {
		echo $cmdNumber->{'command'} . "<br />";
		foreach ($cmdNumber->{'parameters'} as $parameters) {
			echo $parameters->{'name'} . " : " .  $parameters->{'type'} . "<br />";
		}
		echo "<br />";
	}
	if ( in_array($cmdNumber->{'command'}, $userCmd) ) {
		echo $cmdNumber->{'command'} . "<br />";
		foreach ($cmdNumber->{'parameters'} as $parameters) {
			echo $parameters->{'name'} . " : " .  $parameters->{'type'} . "<br />";
		}
		echo "<br />";
	}
}
curl_close($ch);*/