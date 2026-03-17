<?php
require_once(ROOT . 'src/model/emailAlias.php');

function get_alias_informations($username) {
	$emailAlias = new emailAlias($username);
	echo $emailAlias->get_alias_informations();
}