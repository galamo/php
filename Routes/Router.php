<?php

require 'Route.php';

class Router {
    
	private $table = [];
	
	public function __construct() {		
		$this->table['login'] = new Route('AdminModel', 'LoginView', 'LoginController');  				
		$this->table['admin'] = new Route('AdminModel', 'AdminView', 'Controller');
		$this->table['school'] = new Route('Model', 'SchoolView', 'Controller');
	}
	
	public function getRoute($route) {
		$route = strtolower($route);
		
		if (!isset($this->table[$route])) {
			return $this->table['login'];	
		}
		
		return $this->table[$route];		
	}
}

?>