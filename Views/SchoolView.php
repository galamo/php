<?php

require_once 'Models/StudentModel.php';
require_once 'Models/CourseModel.php';
require_once 'StudentListView.php';
require_once 'CourseListView.php';

class SchoolView extends View { 

    public function __construct() {
        $this->studentModel = new StudentModel;
        $this->courseModel = new CourseModel;        
        $this->studentListView = new StudentListView($this->studentModel);
        $this->courseListView = new CourseListView($this->courseModel);
    }

    public function output() {
        $html = "<div id='mainWrapper' class='container-fluid'><div id='schoolWrapper' class='row'>";
        $html .= $this->courseListView->output();
        $html .= $this->studentListView->output();
        $html .= "<div class='col-md-6 col-sm-12'>
        <main class='row'>
            <h2>Overview</h2>
            <section class='col-md-12'>
                <p>Total Students: ".$this->studentModel->countAllStudents()."</p>
                <p>Total Courses: ".$this->courseModel->countAllCourses()."</p>
            </section>
        </main></div></div></div>";

        return $html;
    }

}

?>