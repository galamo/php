<?php

class LoginController extends Controller {

    public function login() {
        if ($this->model->login($_POST)){
            header('location: index.php?route=school'); 
        }
    }

    public function logout() {
        $this->model->logout();
        header('location: index.php?route=login'); 
    }

}

?>