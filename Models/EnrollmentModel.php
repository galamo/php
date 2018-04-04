<?php

require_once 'Model.php';
require_once 'Enrollment.php';

class EnrollmentModel extends Model {

    public function getAllEnrollments() {
        return $this->db->Select("SELECT student_id, course_id FROM enrollments", 'Enrollment');
    }

    public function resetStudentCourses($id){
        $stmt = $this->db->Prepare("DELETE FROM enrollments WHERE student_id = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();           
    }

    public function enroll($studentId, $coursesIds) {
        $stmt = $this->db->Prepare("INSERT INTO enrollments (student_id, course_id) VALUES (? , ?)");        
        foreach ($coursesIds as $courseId) {
            $stmt->bind_param("ii", $studentId, $courseId);               
            $stmt->execute();        
        }             
    }
}

?>