<?php
require_once('conf/config.php');

// Customer management
require_once('src/controllers/customer/customer_exists.php');
require_once('src/controllers/customer/get_customer_infos.php');
require_once('src/controllers/customer/get_customer_ressources.php');
require_once('src/controllers/show_login_form.php');

// E-mail accounts management
require_once('src/controllers/add_account.php');
require_once('src/controllers/delete_account.php');
require_once('src/controllers/edit_account.php');
require_once('src/controllers/get_account_informations.php');
require_once('src/controllers/get_accounts_list.php');
require_once('src/controllers/set_account_password.php');
require_once('src/controllers/set_account_redirection.php');
require_once('src/controllers/show_accounts_list.php');

// Aliases management
require_once('src/controllers/add_alias.php');
require_once('src/controllers/edit_alias.php');
require_once('src/controllers/get_alias_informations.php');
require_once('src/controllers/get_aliases_list.php');
require_once('src/controllers/show_aliases_list.php');

//require_once('src/controllers/show_global_list.php');
require_once('src/controllers/show_header.php');

/*
 * CONSTANT definition
 */
define('CUSTOMER_RESSOURCES', json_decode(get_customer_ressources(CUSTOMER_ID)));
define('USER_LOGGED', true);



if (isset($_POST['aliases'])) {
	if (preg_match_all("/([a-zA-Z0-9._+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,},?)+/", $_POST['aliases'], $matches)) {
			$aliases = $_POST['aliases'];
	} else {
		throw new Exception ("Une des cibles est invalide");
	}
} else {
	$aliases=null;
}

if (isset($_POST['domainName'])) {
	if (filter_var($_POST['domainName'],FILTER_VALIDATE_DOMAIN)) {
		foreach (CUSTOMER_RESSOURCES as $ressource) {
			if ($_POST['domainName'] == $ressource->domain_name) {
				define('EMAIL_DOMAIN', $_POST['domainName']);
			}
		}
	} else {
		throw new Exception ("Nom de domaine invalide");
	}
} else {
	define('EMAIL_DOMAIN', CUSTOMER_RESSOURCES[0]->domain_name);
}

$domainName = EMAIL_DOMAIN;


if (isset($_POST['username'])) {
	if ( filter_var($_POST['username'],FILTER_VALIDATE_REGEXP,array( "options"=> array("regexp" => "/^[^_]+[\w\d]{1}[\w\d\-.]{2,32}$/"))) ) {
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

if (isset($_POST['user_login'])) {
	if (filter_var($_POST['user_login'],FILTER_VALIDATE_EMAIL) || $_POST['user_login'] == "null") {
		$user_login = $_POST['user_login'];
	} else {
		throw new Exception ("Identifiant invalide");
	}
}

if (isset($_POST['password'])) {
	if ( filter_var($_POST['password'],FILTER_VALIDATE_REGEXP,array( "options"=> array("regexp" => "/.{12,25}/"))) ) {
		$password = $_POST['password'];
	} else {
		throw new Exception ("Mot de passe invalide : ". $_POST['password']);
	}
}

$action_list = array('add_account','add_alias','change_domain','delete_account','edit_account','edit_alias','get_account_informations','get_account_list','get_alias_informations','get_aliases_list','set_account_password','set_account_redirection');

if (!customer_exists(CUSTOMER_ID)) {
	throw new Exception("Unknown customer", 1);
}

if (USER_LOGGED) {
	if (isset($_POST['action'])) {
		switch ($_POST['action']) {
			case 'add_account':
				add_account($username,$password,$domainName,$aliases);
				break;
			case 'add_alias':
				add_alias($username,$aliases,$domainName);
				break;
			case 'delete_account':
				delete_account($username,$domainName);
				break;
			case 'edit_account':
				if (!isset($password)) {
					$password = "";
				}
				if ($_POST['email_redirect'] == "true") {
					edit_account($username,$password,$domainName,$aliases);	
				} else {
					edit_account($username,$password,$domainName);
				}			
				break;
			case 'edit_alias':
				edit_alias($username,$aliases);
				break;
			case 'get_account_informations':
				get_account_informations($username);
				break;
			case 'get_accounts_list':
				get_accounts_list(EMAIL_DOMAIN);
				break;
			case 'get_alias_informations':
				get_alias_informations($username);
				break;
			case 'get_aliases_list':
				get_aliases_list(EMAIL_DOMAIN);
				break;
			case 'set_account_password':
				set_account_password($username,$password,$domainName);
				break;
			case 'set_account_redirection':
				set_account_redirection($username,$domainName,$aliases);
				break;
			default:
				echo "Availables actions : " . implode(", ", $action_list);
				break;
		}
	} else {
		require('templates/layout.php');
	}
} else {
	$customer_action_list = array("auth_user");

	if (isset($_POST['action'])) {
		switch ($_POST['action']) {
			case 'auth_user':
				if (customer_exists($user_login)) {

				} else {
					throw new Exception("Unknown customer", 1);
				};
				break;
			default:
				echo "Availables actions : " . implode(", ", $customer_action_list);
				break;
		}
	} else {
		require('templates/login.php');	
	}
}