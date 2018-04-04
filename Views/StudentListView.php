<?php

class StudentListView extends View {    

    public function output() {  
              
        $html = "
        <div id='studentList' class='col-md-3 col-sm-12'>
            <div class='row'>
                <h2><span data-type='Student' class='glyphicon glyphicon-search'></span>Students<span id='student-plus' class='glyphicon glyphicon-plus'></span></h2>
                <ul id='studentsUl' class='scroll col-md-12'>                
                
                </ul>
            </div>
        </div>";

        return $html;
    }        
} 

?>