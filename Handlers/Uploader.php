<?php

class Uploader {

    public static function upload($folder) {

        if (!isset($_FILES['avatar']) || empty($_FILES['avatar']['name']) ) {
            return;
        }
        $file = $_FILES['avatar'];
        $targetDir = "uploads/$folder/";
        $targetFile = $targetDir . $file["name"];

        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $fileContents = file_get_contents($file['tmp_name']);
        $mimeType = $finfo->buffer($fileContents);
        
        if (!$file['error'] && $file["size"] <= 500000 && strpos($mimeType, "image") !== false && strpos($file['type'], "image") !== false) {
            move_uploaded_file($file["tmp_name"], $targetFile);            
            return true;
        }
        else {
            return false;
        }
    }
}


?>