<?php
require_once(ROOT . 'src/model/emailDomain.php');

function get_aliases_list($domainName) {
	$emailDomain = new emailDomain($domainName);
	$aliasesList = $emailDomain->get_aliases_list();

	echo $aliasesList;
}
