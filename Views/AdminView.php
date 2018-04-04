<?php

require_once 'AdminListView.php';

class AdminView extends View { 

    public function __construct(Model $model) {
        parent::__construct($model);
        $this->adminListView = new AdminListView($model);
    }
      
    public function output() {        
        $html = "<div id='mainWrapper' class='container-fluid'><div id='adminWrapper' class='row'>";
        $html .= $this->adminListView->output();        
        $html .= "<div class='col-md-6'>
        <main class='row'>
            <h2>Overview</h2>
            <section class='col-md-12'>
                <p>Total Admins: ".$this->model->countAllAdmins()."</p>                
            </section>
        </main></div></div></div>";

        return $html;
    }
}

?>