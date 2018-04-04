<?php

require_once 'Handlers/Logger.php';
require_once 'Models/Admin.php';

if (session_status() == PHP_SESSION_NONE) {    
    session_start();    
}

if (!isset($_SESSION['admin'])) {    
    if (!isset($_GET['route']) || $_GET['route'] != "login") {
        header("location: index.php?route=login");
        exit();
    }    
}

if (isset($_GET['api'])) {        
    logger::log('Incoming API request: '.$_GET['api'].'.');
    require_once 'API/API.php';    
    
    $API = new API;
    $data = $API->{$_GET['api']}();
    echo json_encode($data);
    logger::log('API response sent to client: '.$_GET['api'].'.');
} else {
    require_once 'Controllers/FrontController.php';
    
    $frontController = new FrontController(new Router, isset($_GET['route']) ? $_GET['route'] : null, isset($_GET['action']) ? $_GET['action'] : null);
    echo $frontController->output();
}

?>