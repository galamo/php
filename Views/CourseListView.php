<?php

class CourseListView extends View {    

    public function output() {      
        
        $coursePlus = ($_SESSION['admin']->role != "Sales") ? "<span id='course-plus' class='glyphicon glyphicon-plus'></span>" : "";

        $html = "
        <div id='courseList' class='col-md-3 col-sm-12'>
            <div class='row'>
                <h2><span data-type='Course' class='glyphicon glyphicon-search'></span>Courses$coursePlus</h2>
                <ul id='coursesUl' class='scroll col-md-12'>
                
                </ul>
            </div>
        </div>";

        return $html;
    }        
} 

?>