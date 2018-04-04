<?php

class Route {
    
    public $model;
    public $view;
    public $controller;    

    public function __construct($model, $view, $controller) {
        $this->model = $model;
        $this->view = $view;
        $this->controller = $controller;        
    }
}

?>