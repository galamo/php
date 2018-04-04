<?php

require_once 'Routes/Router.php';
require_once 'Controller.php';	
require_once 'DB/DBC.php';
require_once 'Models/AdminModel.php';
require_once 'Views/View.php';
require_once 'Views/NavView.php';

class FrontController {
	
	private $controller;
	private $view;
	
	public function __construct(Router $router, $routeName, $action) {

		$route = $router->getRoute($routeName);
		$modelName = $route->model;
		$controllerName = $route->controller;
		$viewName = $route->view;

		require_once 'Models/'.$modelName.'.php';
		require_once 'Views/'.$viewName.'.php';
		require_once $controllerName.'.php';
				
		$model = new $modelName;
		$this->view = new $viewName($model);		
		$this->controller = new $controllerName($model);		

		$this->navView = new NavView(new AdminModel);

		logger::log('Front controller created. '.$modelName.', '.$viewName.', '.$controllerName.', Action: '.$action.'.');
		
		if (!empty($action)) $this->controller->{$action}();
	}
	
	public function output() {		
		
		$header = file_get_contents("src/templates/header.php");
		$nav = $this->navView->output();
		$footer = file_get_contents("src/templates/footer.php");
		
		return $header.$nav.$this->view->output().$footer;
	}
}

?>