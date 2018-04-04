<?php

class LoginView extends View {    

    public function output() {
        
        $html = "<form id='loginForm' action='index.php?route=login&action=login' method='POST'>
                    <label>Email: <input type='email' name='email' placeholder='Email'></label>
                    <label>Password: <input type='password' name='password' placeholder='Password'></label>
                    <button class='btn btn-primary'>Login</button>
                 </form>";
        return $html;
    }        
} 

?>