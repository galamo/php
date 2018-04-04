<?php

class AdminListView extends View {    

    public function output() {          
        
        $html = "
        <div id='adminList' class='col-md-6'>
            <div class='row'>
                <h2><span data-type='Admin' class='glyphicon glyphicon-search'></span>Admins<span id='admin-plus' class='glyphicon glyphicon-plus'></span></h2>
                <ul id='adminsUl' class='scroll col-md-12'>                
                
                </ul>
            </div>
        </div>";

        return $html;
    }        
} 

?>