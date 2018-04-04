<?php

class Logger {

    public static function log($event) {        

        $adminName = (isset($_SESSION['admin'])) ? $_SESSION['admin']->first_name.' '.$_SESSION['admin']->last_name : 'N/A';
        $date = new DateTime(null, new DateTimeZone('Asia/Jerusalem'));
        $date = $date->format('d-m-Y H:i:s');
        $logFile = fopen('logs/log.txt','a+');
        fwrite($logFile, $date." => ".$adminName.' => '.$event."\n");
    }
}


?>