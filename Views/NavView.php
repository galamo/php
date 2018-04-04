<?php

class NavView extends View {    

    public function output() {

        if (isset($_SESSION['admin'])) {
            $admin = $_SESSION['admin'];    
        }         
        
        $html = "<nav><img id='logo' src='src/images/logo.jpg' alt='School Logo'>";

        if (isset($admin) && !empty($admin)) {
            $adminLink = ($admin->role != "Sales") ? "<span id='adminLink'>Administration</span>" : "";
            $html .= "<span id='schoolLink' class='activeTab'>School</span>
            $adminLink
            <div id='currentAdmin'>
                <div id='adminInfo'>    
                    <p id='nameAndRole'>$admin->first_name $admin->last_name, $admin->role</p>
                    <p><a href='index.php?route=login&action=logout'>Logout</a></p>
                </div>
                <div id='adminAvatar'>
                    <img id='adminImg' src='$admin->avatar' alt='Admin Avatar'>
                </div>
            </div>";
        }

        $html .= "</nav>";

        return $html;       
    }        
} 

?>