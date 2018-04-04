<?php

require_once 'Models/StudentModel.php';
require_once 'Models/CourseModel.php';
require_once 'Models/EnrollmentModel.php';
require_once 'Models/AdminModel.php';
require_once 'Handlers/Uploader.php';

class API {

    private $studentModel;
    private $courseModel;
    private $enrollmentModel;
    private $adminModel;

    public function __construct(){
        $this->activeAdmin = $_SESSION['admin'] or die('Not logged in.');
        $this->studentModel = new StudentModel;
        $this->courseModel = new CourseModel;
        $this->enrollmentModel = new EnrollmentModel;
        $this->adminModel = new AdminModel;
        logger::log('API created.');
    }

    public function getSchoolData() {        
        return ['students'=>self::getAllStudents(), 'courses'=>self::getAllCourses(),
        'enrollments'=>self::getAllEnrollments(), 'admins'=>self::getAllAdmins(),
        'activeAdmin'=>$this->activeAdmin];
    }
    
    public function getAllStudents() {        
        return $this->studentModel->getAllStudents();
    }

    public function getAllCourses() {        
        return $this->courseModel->getAllCourses();
    }

    public function getAllEnrollments() {        
        return $this->enrollmentModel->getAllEnrollments();
    }

    public function getAllAdmins() {
        return $this->adminModel->getAllAdmins();
    }

    public function deleteStudent() {
        $this->enrollmentModel->resetStudentCourses($_POST['id']);
        $this->studentModel->deleteStudent($_POST['id']);
    }

    public function deleteAdmin() {        
        $this->adminModel->deleteAdmin($_POST['id']);
    }

    public function deleteCourse() {        
        $this->courseModel->deleteCourse($_POST['id']);
    }

    public function saveStudent() {        
        Uploader::upload("students");        
        if ($_GET['id'] == "New Student") {
            $id = $this->studentModel->createStudent($_POST);
        }
        else {
            $id = $_GET['id'];
            $this->studentModel->updateStudent($id, $_POST);
            $this->enrollmentModel->resetStudentCourses($id);            
        }
        if (isset($_POST['courses'])){
            $this->enrollmentModel->enroll($id, $_POST['courses']);
        }                                
        return $this->studentModel->getStudentById($id);
    }

    public function saveCourse() {        
        Uploader::upload("courses");                    
        if ($_GET['id'] == "New Course") {
            $id = $this->courseModel->createCourse($_POST);
        }
        else {
            $id = $_GET['id'];
            $this->courseModel->updateCourse($id, $_POST);            
        }        
        return $this->courseModel->getCourseById($id);
    }    

    public function saveAdmin() {
        $_POST['password'] = hash('sha256', $_POST['password']);        
        Uploader::upload("admins");                    
        if ($_GET['id'] == "New Admin") {
            $id = $this->adminModel->createAdmin($_POST);
        }
        else {
            $id = $_GET['id'];
            $this->adminModel->updateAdmin($id, $_POST);            
        }                          
        return $this->adminModel->getAdminById($id);
    }        
}

?>