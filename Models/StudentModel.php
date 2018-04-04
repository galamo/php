<?php

require_once 'Model.php';
require_once 'Student.php';

class StudentModel extends Model {

    public function getAllStudents() {
        return $this->db->Select("SELECT * FROM students", "Student", 'assoc');        
    }  

    public function countAllStudents() {        
        $count = $this->db->Select("SELECT COUNT(id) as studentCount FROM students")[0];
        return $count->studentCount;
    }
    
    public function getStudentById($id) {
        return $this->db->Select("SELECT * FROM students WHERE id = $id", "Student")[0];
        // $stmt = $this->db->Prepare("SELECT * FROM students WHERE id = ?");
        // $stmt->bind_param('i', $id);
        // $stmt->execute();
        // $result = $stmt->get_result();  <== *** Doesn't work on AwardSpace ***       
        // return $result->fetch_object('Student');
    }
    
    public function createStudent($student) {           
        $stmt = $this->db->Prepare("INSERT INTO students (first_name, last_name, phone, email, avatar) VALUES (? , ? , ? , ? , ?)");        
        $stmt->bind_param("sssss", $student['first_name'], $student['last_name'], $student['phone'], $student['email'], $student['avatar']);               
        $stmt->execute();        
        return $stmt->insert_id;        
    }
    
    public function updateStudent($id, $student) {             
        $stmt = $this->db->Prepare("UPDATE students SET first_name = ? , last_name = ? , phone = ? , email = ? , avatar = ? WHERE id = ?");        
        $stmt->bind_param("sssssi", $student['first_name'], $student['last_name'], $student['phone'], $student['email'], $student['avatar'], $id);               
        $stmt->execute();
        $stmt->close();        
    }

    public function deleteStudent($id) {
        $stmt = $this->db->Prepare("DELETE FROM students WHERE id = ?");
        $stmt->bind_param('i', $id);
        $stmt->execute();   
        $stmt->close();  
    }
}

?>