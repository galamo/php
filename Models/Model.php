<?php

require_once 'DB/DBC.php';

class Model {

    public function __construct(){
        $this->db = DatabaseConnection::getDBCSingleInstance();        
    }
}

?>