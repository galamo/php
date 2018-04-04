<?php

class DatabaseConnection{

    private $connection;
    private static $_dbcSingleInstance; 
    private $isConnected = false; 

    // Locally Hosted
    private $dbServer = "localhost";
    private $dbUser = "root";
    private $dbPassword = "admin";
    private $dbName = "school";

    // Hosted On AwardSpace
    // private $dbServer = "fdb16.awardspace.net";
    // private $dbUser = "2423696_school";
    // private $dbPassword = "Israel@10";
    // private $dbName = "2423696_school";
        
    private function __construct(){
        $this->connection = new mysqli($this->dbServer,$this->dbUser,$this->dbPassword,$this->dbName);

        if($this->connection->connect_errno){
           $this->isConnected = false;           
           exit();
        }
        else{
            $this->isConnected = true;
        }
    }
    
    public static function getDBCSingleInstance() {

		if(!self::$_dbcSingleInstance) { // If no instance then make one
            self::$_dbcSingleInstance = new DatabaseConnection();            
        }
        return self::$_dbcSingleInstance;
    }

    public function Select($q, $class = 'stdClass', $array = 'index'){
        $result = $this->connection->query($q);
        if ($result->num_rows == 0) {
            return [];
        }
        while ($row = $result->fetch_object($class)) {
            if ($array == 'assoc') {
                $arr[$row->id]= $row;    
            }
            else {
                $arr[] = $row;  
            }            
        }
        return $arr;
    }   

    public function Prepare($q) {
        return $this->connection->prepare($q);
    }

    public function Insert($q){
        $this->connection->query($q);
        return $this->connection->insert_id;
    }

    public function Update($q){
        $this->connection->query($q);        
    }

    public function Delete($q){
        $this->connection->query($q);        
    }
    
    public function Disconnect(){
        $this->connection->close();
    }
    
}



?>