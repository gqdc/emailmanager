<?php
require_once('conf/config.php');

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

$action_list = array('add_account','delete_account','get_account_informations','get_account_list','set_account_password','set_account_redirection');

require_once('src/controllers/add_account.php');
require_once('src/controllers/delete_account.php');
require_once('src/controllers/get_account_informations.php');
require_once('src/controllers/get_accounts_list.php');
require_once('src/controllers/set_account_password.php');
require_once('src/controllers/set_account_redirection.php');
require_once('src/controllers/show_accounts_list.php');

if (isset($_POST['action'])) {
	switch ($_POST['action']) {
		case 'add_account':
			add_account($username,$password);			
			break;
		case 'delete_account':
			delete_account($username);
			break;
		case 'get_account_informations':
			get_account_informations($username);
			break;
		case 'get_accounts_list':
			get_accounts_list(EMAIL_DOMAIN);		
			break;
		case 'set_account_password':
			set_account_password($username,$password);
			break;
		case 'set_account_redirection':
			set_account_redirection($username,$target);
			break;
		default:
			echo "Availables actions : " . implode(", ", $action_list);
			break;
	}
} else {
	show_accounts_list(EMAIL_DOMAIN);
}