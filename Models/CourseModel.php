<?php

require_once 'Model.php';
require_once 'Course.php';

class CourseModel extends Model {

    public function getAllCourses() {
        return $this->db->Select("SELECT * FROM courses", "Course", 'assoc');
    }

    public function countAllCourses() {        
        $count = $this->db->Select("SELECT COUNT(id) as courseCount FROM courses")[0];
        return $count->courseCount;
    }

    public function getCourseById($id) {
        return $this->db->Select("SELECT * FROM courses WHERE id = $id", "Course")[0];
        // $stmt = $this->db->Prepare("SELECT * FROM courses WHERE id = ?");
        // $stmt->bind_param('i', $id);
        // $stmt->execute();
        // $result = $stmt->get_result();   <== *** Doesn't work on AwardSpace ***      
        // return $result->fetch_object('Course');
    }

    public function deleteCourse($id) {
        $stmt = $this->db->Prepare("DELETE FROM courses WHERE id = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();   
        $stmt->close();     
    }

    public function createCourse($course) {        
        $stmt = $this->db->Prepare("INSERT INTO courses (name, description, avatar) VALUES (? , ? , ?)");        
        $stmt->bind_param("sss", $course['name'], $course['description'], $course['avatar']);               
        $stmt->execute();        
        return $stmt->insert_id;        
    }

    public function updateCourse($id, $course){        
        $stmt = $this->db->Prepare("UPDATE courses SET name= ? , description= ?, avatar = ? WHERE id = ?");        
        $stmt->bind_param("sssi", $course['name'], $course['description'], $course['avatar'], $id);               
        $stmt->execute();
        $stmt->close();
    }

}

?>