<?php
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